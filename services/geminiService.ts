import { GoogleGenAI } from "@google/genai";

export const generateContestDescription = async (title: string, category: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a catchy and professional description (max 150 words) for a contest titled "${title}" in the category "${category}". Include a brief motivational hook for participants.`,
    });
    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};