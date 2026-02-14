
import { GoogleGenAI, Type } from "@google/genai";
import { Department, Priority } from "../types";

const apiUrl = import.meta.env.VITE_API_KEY;
console.log(apiUrl)

const ai = new GoogleGenAI({ apiKey: apiUrl });

export async function classifyComplaint(description: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following citizen complaint for validation and routing. It may be in English, Hindi, or any local language.
    Complaint Text: "${description}"`,
    config: {
      systemInstruction: `You are the AI Validation & Routing Layer for JANVAANI.
      
      RULES:
      1. VALIDATION: Determine if the text is a legitimate civic grievance. (e.g., potholes, power cut, water leak, garbage).
      2. If it is gibberish, just greetings, or unrelated to public services, mark isValid: false.
      3. CLASSIFICATION: Assign to ${Object.values(Department).join(', ')}.
      4. PRIORITY: ${Object.values(Priority).join(', ')}.
      5. TRANSLATION: If input is not in English, translate the 'summary' to clear English.
      6. SLA: 
         - Critical/Health/Police: 4 hours
         - Electricity: 12 hours
         - Water/Waste: 24 hours
         - General/Corporation: 168 hours.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isValid: { type: Type.BOOLEAN },
          rejectionReason: { type: Type.STRING, description: 'Reason if isValid is false' },
          department: { type: Type.STRING },
          priority: { type: Type.STRING },
          slaHours: { type: Type.NUMBER },
          summary: { type: Type.STRING, description: 'A concise summary in English' },
        },
        required: ["isValid", "department", "priority", "slaHours", "summary"],
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    return {
      isValid: true,
      department: Department.OTHERS,
      priority: Priority.MEDIUM,
      slaHours: 48,
      summary: "Manual Review Required"
    };
  }
}
