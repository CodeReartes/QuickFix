export interface AnalysisResult {
  category: string;
  description: string;
  estimatedPrice: string;
  urgency?: string;
  slangDescription?: string;
  numericBasePrice?: number;
  breakdowns?: Record<string, {
    totalFacturado: number;
    totalNeto: number;
    costoGestion: number;
    manoObra: number;
    ivaAmt: number;
  }>;
}

export async function analyzeProblemImage(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  try {
    const response = await fetch("/api/gemini/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64Image, mimeType }),
    });

    if (!response.ok) {
      throw new Error(`Encountered error status code ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in analyzeProblemImage client-side proxy helper:", error);
    return {
      category: "Desconocido",
      description: "No se pudo analizar la imagen automáticamente. Por favor descríbela manualmente.",
      estimatedPrice: "A presupuestar",
      urgency: "Media",
      slangDescription: "",
      numericBasePrice: 20000
    };
  }
}

export async function enhanceDescription(keywords: string, category: string): Promise<string> {
  try {
    const response = await fetch("/api/gemini/enhance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords, category }),
    });

    if (!response.ok) {
      throw new Error(`Encountered error status code ${response.status}`);
    }

    const data = await response.json();
    return data.enhancedText || "";
  } catch (error) {
    console.error("Error in enhanceDescription proxy helper:", error);
    return `Problema de ${category}: ${keywords}`;
  }
}


