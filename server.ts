import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Helper to calculate financial breakdowns based on tax (IVA) and commission (Sub Tiers) logic
function calculateBreakdowns(totalNum: number) {
  const calculateFor = (isConIva: boolean, feePct: number) => {
    let costoGestion = 0;
    let manoObra = 0;
    let ivaAmt = 0;
    let totalFacturado = totalNum;
    let totalNeto = totalNum;

    if (isConIva) {
      totalNeto = totalNum / 1.21;
      costoGestion = totalNeto * feePct;
      manoObra = totalNeto - costoGestion;
      ivaAmt = totalNum - totalNeto;
    } else {
      costoGestion = totalNum * feePct;
      manoObra = totalNum - costoGestion;
      ivaAmt = 0; // Exento
    }

    return {
      totalFacturado: Math.round(totalFacturado),
      totalNeto: Math.round(totalNeto),
      costoGestion: Math.round(costoGestion),
      manoObra: Math.round(manoObra),
      ivaAmt: Math.round(ivaAmt)
    };
  };

  return {
    sin_iva_basic: calculateFor(false, 0.17),
    sin_iva_premium: calculateFor(false, 0.10),
    con_iva_basic: calculateFor(true, 0.17),
    con_iva_premium: calculateFor(true, 0.10)
  };
}

// Global in-memory store for verification codes
// Key: uid, Value: { code, expires, email }
interface VerificationEntry {
  code: string;
  expires: number;
  email: string;
}

const verificationCodes: Record<string, VerificationEntry> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set higher limits for large diagnostic images uploaded via the AI Assist button
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ limit: "15mb", extended: true }));

  // === API ROUTES ===
  
  // Analyze Problem Image using @google/genai (Server-side to protect keys and compute localization rules)
  app.post("/api/gemini/analyze", async (req, res) => {
    const { base64Image, mimeType } = req.body;
    if (!base64Image) {
      return res.status(400).json({ error: "Faltan parámetros requeridos (base64Image)" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in process.env. Returning fallback diagnostic.");
      const fallbackPrice = 35000;
      return res.json({
        category: "Plomero",
        urgency: "Media",
        slangDescription: "Pérdida en el cuerito de la grifería",
        description: "Se gotea continuamente debido al desgaste del cuerito sellador interno, requiere cambio.",
        estimatedPrice: "$35.000 ARS",
        numericBasePrice: fallbackPrice,
        breakdowns: calculateBreakdowns(fallbackPrice)
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Actúa como el motor de inteligencia artificial y localización para "Servicios Pro", una plataforma argentina que conecta clientes con profesionales de oficios (gasistas, plomeros, electricistas, cerrajeros, albañiles, pintores).
Analiza la imagen enviada que muestra una avería doméstica. Extrae la información técnica con mucha precisión y tradúcela a términos familiares del lunfardo y slang hogareño argentino.

Instrucciones:
1. Categoría Asignada: Mapea la falla exactamente a una de estas seis categorías válidas en español: "Electricista", "Plomero", "Gasista", "Albañil", "Pintor", "Cerrajero".
2. Nivel de Urgencia: Elige entre "Baja", "Media", o "Alta - Urgente" según corresponda.
3. Detalle de la Solicitud (Slang): Escribe la falla con un término típico que diría un cliente en un hogar en Argentina (ej. canilla perdiendo -> "Pérdida en el cuerito", llave térmica quemada -> "Llave térmica saltada", revoque caído -> "Pared descascarada para revoque", cerradura trabada -> "Cerradura trabada" o "Pomo roto").
4. Descripción Técnica: Describe el problema detallado que ves de forma objetiva y profesional.
5. Precio Base: Estima un precio de referencia base realista en pesos argentinos (ARS) para el año 2026. Debe ser un número entero (ej. entre 20000 y 90000 ARS).

Formato de Respuesta de Salida: Debes generar obligatoriamente un JSON válido con esta estructura:
{
  "category": "Electricista" | "Plomero" | "Gasista" | "Albañil" | "Pintor" | "Cerrajero",
  "urgency": "Baja" | "Media" | "Alta - Urgente",
  "slangDescription": string (lunfardo o terminología doméstica argentina),
  "description": string (explicación técnica del daño),
  "numericBasePrice": number (número entero sin signos ni puntos, ej. 45000)
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || "image/webp",
                data: base64Image,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                description: "Oficio requerido: 'Electricista', 'Plomero', 'Gasista', 'Albañil', 'Pintor', 'Cerrajero'",
              },
              urgency: {
                type: Type.STRING,
                description: "Nivel de urgencia: 'Baja', 'Media', 'Alta - Urgente'",
              },
              slangDescription: {
                type: Type.STRING,
                description: "Slang o frase típica argentina que describe el desperfecto doméstico",
              },
              description: {
                type: Type.STRING,
                description: "Explicación breve del desperfecto",
              },
              numericBasePrice: {
                type: Type.INTEGER,
                description: "Estimated base total price in ARS for the job as a clean plain integer (e.g. 45000)",
              },
            },
            required: ["category", "urgency", "slangDescription", "description", "numericBasePrice"],
          },
        },
      });

      if (!response.text) {
        throw new Error("Empty response returned from Gemini GenAI model.");
      }

      const result = JSON.parse(response.text.trim());
      const basePrice = result.numericBasePrice || 30000;
      const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(basePrice);

      res.json({
        category: result.category,
        urgency: result.urgency,
        slangDescription: result.slangDescription,
        description: result.description,
        estimatedPrice: formattedPrice,
        numericBasePrice: basePrice,
        breakdowns: calculateBreakdowns(basePrice)
      });
    } catch (err: any) {
      console.error("Error in server-side image analysis:", err);
      res.status(500).json({ error: "Fallo en el servidor al evaluar la imagen", details: err?.message || "" });
    }
  });

  // Enhance or write descriptions using Gemini API
  app.post("/api/gemini/enhance", async (req, res) => {
    const { keywords, category } = req.body;
    if (!keywords) {
      return res.status(400).json({ error: "Faltan parámetros requeridos (keywords)" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Returning offline placeholder.");
      return res.json({
        enhancedText: `Solicitud de servicio de ${category || 'oficios'}: ${keywords}. (Modo simulación sin API Key)`
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Actúas como un asistente de redacción inteligente para la aplicación "Servicios Pro" en Argentina. El usuario necesita ayuda para describirle a un profesional de oficios su problema a partir de pocas palabras clave.
Escribe un texto claro, conciso, descriptivo y amigable en español argentino de nivel doméstico/lunfardo y técnico básico combinados, para que el plomero, electricista, gasista, etc. entienda perfectamente qué debe resolver en la casa del cliente.

Palabras clave del usuario: "${keywords}"
Rubro del profesional: "${category || 'General'}"

Genera únicamente un texto redactado en un párrafo directo de no más de 120 palabras, listo para pegarse en el formulario. No agregues saludos, explicaciones externas ni introducciones, sé directo y ve al grano con la avería concreta como la redactaría un cliente.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

      if (!response.text) {
        throw new Error("Respuesta vacía de Gemini.");
      }

      res.json({ enhancedText: response.text.trim() });
    } catch (err: any) {
      console.error("Error in server-side text enhancement:", err);
      res.status(500).json({ error: "Error de servidor al enriquecer texto" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Send verification code
  app.post("/api/send-code", async (req, res) => {
    const { email, uid } = req.body;
    if (!email || !uid) {
      return res.status(400).json({ error: "Faltan parámetros requeridos (email, uid)" });
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 10 minutes from now
    const expires = Date.now() + 10 * 60 * 1000;
    verificationCodes[uid] = { code, expires, email };

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.log(`[Email Verification - DEV FALLBACK] Code generated for ${email} (${uid}): ${code}`);
      return res.json({ 
        success: true, 
        dev_fallback_code: code,
        message: "Código generado en modo offline/desarrollo (SMTP no configurado)." 
      });
    }

    try {
      // Configuration for SMTP transporter
      const host = process.env.SMTP_HOST || "smtp.gmail.com";
      const port = parseInt(process.env.SMTP_PORT || "465");
      const secure = process.env.SMTP_SECURE === "true" || port === 465;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"Servicios Pro" <${smtpUser}>`,
        to: email,
        subject: `${code} es tu código de verificación de Servicios Pro`,
        text: `Hola, tu código de verificación para Servicios Pro es: ${code}. Expira en 10 minutos.`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; background-color: #F8FAFC; border-radius: 20px; color: #0F172A; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #0284C7; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Servicios Pro</h1>
              <p style="text-align: center; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Verificación de Seguridad</p>
            </div>
            <div style="background-color: #FFFFFF; padding: 40px 30px; border-radius: 16px; border: 1px solid #E2E8F0; text-align: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
              <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px; color: #1E293B;">Tu código de verificación</h2>
              <p style="font-size: 14px; text-align: center; color: #475569; margin-bottom: 32px;">Ingresa este código de seguridad de 6 dígitos en la aplicación para verificar tu cuenta:</p>
              <div style="font-size: 36px; font-weight: 800; letter-spacing: 5px; color: #0284C7; text-align: center; background-color: #F0F9FF; padding: 16px 24px; border-radius: 12px; display: inline-block; border: 1px dashed #0284C7; font-family: monospace;">
                ${code}
              </div>
              <p style="font-size: 11px; text-align: center; color: #94A3B8; margin-top: 36px; margin-bottom: 0;">Este código es de un solo uso y expirará en 10 minutos por razones de seguridad.</p>
            </div>
            <p style="font-size: 12px; text-align: center; color: #94A3B8; margin-top: 30px;">© 2026 Servicios Pro. Todos los derechos reservados.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Email Verification - SMTP SENT] Verification code sent to ${email}`);
      return res.json({ success: true, email });
    } catch (error: any) {
      console.error("Error sending verification email via SMTP:", error);
      return res.status(500).json({ 
        error: "No se pudo enviar el correo de verificación. Conexión SMTP fallida.", 
        details: error.message 
      });
    }
  });

  // Verify verification code
  app.post("/api/verify-code", (req, res) => {
    const { uid, code } = req.body;
    if (!uid || !code) {
      return res.status(400).json({ error: "Faltan parámetros requeridos (uid, code)" });
    }

    const entry = verificationCodes[uid];
    if (!entry) {
      return res.status(400).json({ error: "No se ha solicitado ningún código de verificación para esta cuenta." });
    }

    if (Date.now() > entry.expires) {
      delete verificationCodes[uid]; // Clean expired entry
      return res.status(400).json({ error: "El código de verificación ha expirado. Por favor solicita uno nuevo." });
    }

    if (entry.code !== code.trim()) {
      return res.status(400).json({ error: "El código ingresado es incorrecto. Verifica el correo e inténtalo nuevamente." });
    }

    // Success! Clean code and return success
    delete verificationCodes[uid];
    return res.json({ success: true });
  });

  // === VITE ASSET / SPA SERVING ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
