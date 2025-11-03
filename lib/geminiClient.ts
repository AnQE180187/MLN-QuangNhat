'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';

let cachedModel: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

export function getGemini(model = 'gemini-2.5-flash') {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return null;
  if (cachedModel) return cachedModel;
  const genAI = new GoogleGenerativeAI(apiKey);
  cachedModel = genAI.getGenerativeModel({ model });
  return cachedModel;
}

export function buildRagPrompt(parts: { question: string; context: string; instructions?: string }) {
  const system = parts.instructions ?? (
    'Bạn là trợ lý học tập cho môn MLN122. Trả lời ngắn gọn, chính xác, dựa trên NGỮ CẢNH cho trước. ' +
    'Nếu thông tin không có trong NGỮ CẢNH, hãy nói không chắc và gợi ý mục liên quan.'
  );
  return [
    { text: system },
    { text: '\n\nNGỮ CẢNH:' },
    { text: parts.context.slice(0, 8000) },
    { text: '\n\nCÂU HỎI:' },
    { text: parts.question }
  ];
}


