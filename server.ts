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

      const prompt = `Eres el Motor de Diagnóstico y Cotización de Inteligencia Artificial para "QuickFix", una app argentina que conecta clientes con profesionales del hogar. Tu objetivo es analizar el problema reportado por el usuario a través de la imagen, diagnosticar la posible falla, identificar al profesional adecuado y emitir un presupuesto estimado basado en la tabla de tarifas oficiales de 2026.

### REGLAS DE NEGOCIO Y COTIZACIÓN:
1. COSTO DE GESTIÓN: A todos los presupuestos de mano de obra base se les debe sumar un 10% en concepto de "Costo de Gestión" de la app.
2. URGENCIAS: Si notas que es una emergencia inmediata (ej. cortocircuito grave, fuga de gas, caño roto inundando), aplica un recargo del 50% al valor de la mano de obra.
3. VISITA TÉCNICA: Si el problema es ambiguo, cotiza únicamente el valor de la "Visita técnica para diagnóstico".
4. MATERIALES: La IA solo cotiza "Mano de Obra". Debe aclarar que los materiales no están incluidos en el precio base.

### TABLA DE TARIFAS BASE (MANO DE OBRA NETO EN ARS - 2026):

[ELECTRICISTA]
- Visita técnica para diagnóstico: $25.000 - $46.000
- Reparación de cortocircuitos simples: $57.900 - $91.800
- Instalación de boca eléctrica: $28.000 - $47.000
- Instalación eléctrica dedicada (aire ac/térmica): $43.000 - $75.500
- Instalación termotanque eléctrico: $53.000 - $135.000
- Armado tablero monofásico principal: $150.000 - $314.000

[PLOMERO]
- Visita diagnóstico / Detección filtraciones: $19.000 - $84.000
- Cambio sifón bajo mesada: $20.000 - $30.000
- Reemplazo grifería completa: $30.000 - $50.000
- Instalación inodoro/bidet: $27.000 - $50.000
- Destapaciones estándar: $30.000 - $52.000
- Instalación bomba presurizadora: $54.000 - $109.000

[CLIMATIZACIÓN / AIRE ACONDICIONADO]
- Instalación Split (Hasta 3000 fg): $90.000 - $175.000
- Mantenimiento/Limpieza: $47.000 - $128.000
- Carga de gas (R410/R22): $48.000 - $91.000

[GASISTA MATRICULADO]
- Visita inspección visual/seguridad: $30.000 - $58.000
- Prueba hermeticidad (fugas): $64.000 - $123.000
- Instalación cocina a gas: $90.000 - $132.000
- Instalación calefón/termotanque a gas: $108.000 - $162.000

*(Si detectas Carpinteros, Herreros, Durleros o Vidrieros, indica "A convenir tras visita técnica").*

Formato de Respuesta de Salida: Debes generar obligatoriamente un JSON válido.
En el campo "description" EXACTAMENTE este texto en formato Markdown sin alteraciones estructurales:

**Profesional Requerido:** [Ej. Electricista]
**Diagnóstico con IA:** [Explicación técnica breve del problema reportado]
**Nivel de Urgencia:** [Estándar / Alta]
**Desglose Financiero Estimado:**
- Mano de Obra Base (Neto): $ [Valor Promedio de la tabla]
- Costo de Gestión (10%): $ [Calcula el 10% de la mano de obra]
- Recargo por Urgencia: $ [0 si es estándar, o el 50% si es Alta]
- **TOTAL FACTURADO ESTIMADO:** $ [Suma de los anteriores]

**Aclaración importante:** Este valor corresponde a la mano de obra. Los materiales necesarios serán informados por el profesional tras la revisión. Tu pago está protegido por QuickFix hasta que confirmes la finalización del trabajo.

El campo "numericBasePrice" debe tener el "Mano de Obra Base (Neto)" como número entero.`;

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
                description: "Oficio requerido basado en la tabla",
              },
              urgency: {
                type: Type.STRING,
                description: "Estándar o Alta",
              },
              description: {
                type: Type.STRING,
                description: "Formato de texto con toda la cotización y desglose como se indica en las instrucciones.",
              },
              slangDescription: {
                type: Type.STRING,
                description: "Slang argentino descriptivo",
              },
              numericBasePrice: {
                type: Type.INTEGER,
                description: "Mano de Obra Base (Neto) en formato numerico entero",
              },
            },
            required: ["category", "urgency", "description", "slangDescription", "numericBasePrice"],
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
      const fallbackPrice = 30000;
      const formattedFallbackPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(fallbackPrice);
      
      res.json({
        category: "Desconocido",
        urgency: "Media",
        slangDescription: "Falla no identificada",
        description: "**Profesional Requerido:** A presupuestar\n**Diagnóstico con IA:** No pudimos procesar la imagen debido a alta demanda. Describe tu problema manualmente o intenta nuevamente.\n**Nivel de Urgencia:** Media\n**Desglose Financiero Estimado:**\n- Mano de Obra Base: $30.000\n- Costo de Gestión: $3.000\n- Recargo por Urgencia: $0\n- **TOTAL FACTURADO EST.:** $33.000\n\n**Aclaración:** Materiales no incluidos.",
        estimatedPrice: formattedFallbackPrice,
        numericBasePrice: fallbackPrice,
        breakdowns: calculateBreakdowns(fallbackPrice)
      });
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
      console.warn("GEMINI_API_KEY is not defined.");
      const fallbackPrice = 35000;
      return res.json({
        category: category || "Plomero",
        urgency: "Media",
        slangDescription: keywords,
        description: `**Profesional Requerido:** ${category}\n**Diagnóstico con IA:** ${keywords}\n**Nivel de Urgencia:** Media\n**Desglose Financiero Estimado:**\n- Mano de Obra Base: $35.000\n- Costo de Gestión: $3.500\n- Recargo por Urgencia: $0\n- **TOTAL FACTURADO:** $38.500\n\n**Aclaración:** Materiales no incluidos.`,
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

      const prompt = `Eres el Motor de Diagnóstico y Cotización de Inteligencia Artificial para "QuickFix", una app argentina que conecta clientes con profesionales del hogar. Tu objetivo es analizar el problema reportado por el usuario usando descripción de texto, diagnosticar la posible falla, identificar al profesional adecuado y emitir un presupuesto estimado basado en la tabla de tarifas oficiales de 2026.

### REGLAS DE NEGOCIO Y COTIZACIÓN:
1. COSTO DE GESTIÓN: A todos los presupuestos de mano de obra base se les debe sumar un 10% en concepto de "Costo de Gestión" de la app.
2. URGENCIAS: Si notas que es una emergencia inmediata (ej. cortocircuito grave, fuga de gas, caño roto inundando), aplica un recargo del 50% al valor de la mano de obra.
3. VISITA TÉCNICA: Si el problema es ambiguo, cotiza únicamente el valor de la "Visita técnica para diagnóstico".
4. MATERIALES: La IA solo cotiza "Mano de Obra". Debe aclarar que los materiales no están incluidos en el precio base.

### TABLA DE TARIFAS BASE (MANO DE OBRA NETO EN ARS - 2026):

[ELECTRICISTA]
- Visita técnica para diagnóstico: $25.000 - $46.000
- Reparación de cortocircuitos simples: $57.900 - $91.800
- Instalación de boca eléctrica: $28.000 - $47.000
- Instalación eléctrica dedicada (aire ac/térmica): $43.000 - $75.500
- Instalación termotanque eléctrico: $53.000 - $135.000
- Armado tablero monofásico principal: $150.000 - $314.000

[PLOMERO]
- Visita diagnóstico / Detección filtraciones: $19.000 - $84.000
- Cambio sifón bajo mesada: $20.000 - $30.000
- Reemplazo grifería completa: $30.000 - $50.000
- Instalación inodoro/bidet: $27.000 - $50.000
- Destapaciones estándar: $30.000 - $52.000
- Instalación bomba presurizadora: $54.000 - $109.000

[CLIMATIZACIÓN / AIRE ACONDICIONADO]
- Instalación Split (Hasta 3000 fg): $90.000 - $175.000
- Mantenimiento/Limpieza: $47.000 - $128.000
- Carga de gas (R410/R22): $48.000 - $91.000

[GASISTA MATRICULADO]
- Visita inspección visual/seguridad: $30.000 - $58.000
- Prueba hermeticidad (fugas): $64.000 - $123.000
- Instalación cocina a gas: $90.000 - $132.000
- Instalación calefón/termotanque a gas: $108.000 - $162.000

*(Si detectas Carpinteros, Herreros, Durleros o Vidrieros, indica "A convenir tras visita técnica").*

### Solicitud de texto del usuario:
Palabras clave o descripción: "${keywords}"
Rubro del profesional preferido: "${category || 'General'}"

Formato de Respuesta de Salida: Debes generar obligatoriamente un JSON válido.
En el campo "description" EXACTAMENTE este texto en formato Markdown sin alteraciones estructurales:

**Profesional Requerido:** [Ej. Electricista]
**Diagnóstico con IA:** [Explicación técnica breve del problema reportado]
**Nivel de Urgencia:** [Estándar / Alta]
**Desglose Financiero Estimado:**
- Mano de Obra Base (Neto): $ [Valor Promedio de la tabla]
- Costo de Gestión (10%): $ [Calcula el 10% de la mano de obra]
- Recargo por Urgencia: $ [0 si es estándar, o el 50% si es Alta]
- **TOTAL FACTURADO ESTIMADO:** $ [Suma de los anteriores]

**Aclaración importante:** Este valor corresponde a la mano de obra. Los materiales necesarios serán informados por el profesional tras la revisión. Tu pago está protegido por QuickFix hasta que confirmes la finalización del trabajo.

El campo "numericBasePrice" debe tener el "Mano de Obra Base (Neto)" como número entero.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                description: "Oficio requerido basado en la tabla",
              },
              urgency: {
                type: Type.STRING,
                description: "Estándar o Alta",
              },
              description: {
                type: Type.STRING,
                description: "Formato de texto con toda la cotización y desglose como se indica en las instrucciones.",
              },
              slangDescription: {
                type: Type.STRING,
                description: "Breve frase descriptiva del trabajo.",
              },
              numericBasePrice: {
                type: Type.INTEGER,
                description: "Mano de Obra Base (Neto) en formato numerico entero",
              },
            },
            required: ["category", "urgency", "description", "slangDescription", "numericBasePrice"],
          },
        },
      });

      if (!response.text) {
        throw new Error("Respuesta vacía de Gemini.");
      }

      const result = JSON.parse(response.text.trim());
      const basePrice = result.numericBasePrice || 35000;
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
      console.error("Error in server-side text analysis:", err);
      const fallbackPrice = 30000;
      const formattedFallbackPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(fallbackPrice);
      
      res.json({
        category: "Desconocido",
        urgency: "Media",
        slangDescription: keywords || "Problema a revisar",
        description: "**Profesional Requerido:** A presupuestar\n**Diagnóstico con IA:** No pudimos analizar tu descripción debido a alta demanda. Continúa o intenta nuevamente.\n**Nivel de Urgencia:** Media\n**Desglose Financiero Estimado:**\n- Mano de Obra Base: $30.000\n- Costo de Gestión: $3.000\n- Recargo por Urgencia: $0\n- **TOTAL FACTURADO EST.:** $33.000\n\n**Aclaración:** Materiales no incluidos.",
        estimatedPrice: formattedFallbackPrice,
        numericBasePrice: fallbackPrice,
        breakdowns: calculateBreakdowns(fallbackPrice)
      });
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
