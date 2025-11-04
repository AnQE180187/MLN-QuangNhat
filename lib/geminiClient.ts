import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

let model: GenerativeModel;

export function getGeminiFlashModel(): GenerativeModel {
  if (!model) {
    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  }
  return model;
}
