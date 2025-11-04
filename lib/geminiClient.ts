'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';

let cachedModel: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

export function getGemini(model = 'gemini-2.5-flash') {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return null;
  // Avoid re-initializing the model on every call
  if (cachedModel) return cachedModel;
  const genAI = new GoogleGenerativeAI(apiKey);
  cachedModel = genAI.getGenerativeModel({ model });
  return cachedModel;
}

export function buildRagPrompt(parts: { question: string; instructions?: string }) {
  const system = parts.instructions ?? 'Bạn là một trợ lý AI hữu ích. Hãy trả lời câu hỏi của người dùng.';

  const userPrompt = `${system}\n\nCÂU HỎI:\n${parts.question}`;

  return [{ role: 'user', parts: [{ text: userPrompt }] }];
}
