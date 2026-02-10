import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Lumi, the encouraging guide for "CS5008 Learning Space". 
Your job is to help students learn Computer Systems, Data Structures, and Algorithms in a warm, relatable, and calm manner. 
You love metaphors about "weaving logic," "building a sturdy foundation," and "crafting clean, beautiful code like a handmade textile."

Technical context:
- The course covers C programming, x86-64 assembly, CPU architecture (ALU, registers, pipelining), and building a compiler for the 'Jive' language.
- Use code examples where appropriate, wrapped in easy-to-read explanations.
- Be supportive, slightly artistic, and very approachable. 
- Avoid the gothic/Frankenstein metaphors; instead, think of code as a craft.
`;

export class GeminiService {
  private modelName = 'gemini-3-pro-preview';

  async getResponse(prompt: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      return response.text || "I'm just tidying up my thoughts... could you ask me again?";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "The studio is feeling a bit cluttered right now. Let's try again in a moment.";
    }
  }

  async getChatStream(history: any[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: this.modelName,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chat;
  }
}

export const gemini = new GeminiService();