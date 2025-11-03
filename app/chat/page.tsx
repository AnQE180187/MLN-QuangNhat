'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getGemini, buildRagPrompt } from '@/lib/geminiClient';

type Message = { role: 'user' | 'assistant'; content: string };
type GeminiModel = 'gemini-2.5-flash' | 'gemini-1.5-pro';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Tôi sẽ trả lời các câu hỏi dựa trên nội dung của file content.txt.' },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState<string>('');
  const [contentLoaded, setContentLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Gemini state
  const [useGemini, setUseGemini] = useState(true);
  const [model, setModel] = useState<GeminiModel>('gemini-2.5-flash');

  // Load content.txt
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const res = await fetch('/content.txt');
        if (!res.ok) {
          throw new Error('Không tìm thấy file nội dung ');
        }
        const text = await res.text();
        setContent(text);
        setContentLoaded(true);
        setMessages((m) => [...m, { role: 'assistant', content: 'Đã tải xong nội dung. Bạn có thể bắt đầu đặt câu hỏi.' }]);
      } catch (e: any) {
        const errorMsg = `Lỗi khi tải content.txt: ${e.message}`;
        setLoadError(errorMsg);
        setMessages((m) => [...m, { role: 'assistant', content: errorMsg }]);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const findSimilarParagraphs = (query: string, text: string, count = 3) => {
    const q = query.toLowerCase().trim();
    if (!q || !text) return [];

    const paragraphs = text.split(/\n{2,}|\r\n{2,}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);

    const scored = paragraphs
      .map((p) => {
        const pLower = p.toLowerCase();
        let score = 0;
        // Simple scoring: add points for each query word found
        q.split(/\s+/).forEach((w) => {
          if (pLower.includes(w)) {
            score++;
          }
        });
        // Boost score for exact phrase match
        if (pLower.includes(q)) {
          score += 5;
        }
        return { paragraph: p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count);

    return scored.map(x => x.paragraph);
  };

  const askGemini = async (q: string) => {
    if (!contentLoaded) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Nội dung chưa được tải. Vui lòng chờ hoặc kiểm tra lỗi.' }]);
      return;
    }
    const gemini = getGemini(model);
    if (!gemini) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Chưa định cấu hình Gemini API Key. Hãy thêm NEXT_PUBLIC_GEMINI_API_KEY vào file .env.local.' }]);
      return;
    }

    setLoading(true);
    try {
      const contextParagraphs = findSimilarParagraphs(q, content);
      let context = 'Không tìm thấy đoạn nào liên quan trực tiếp trong nội dung của bài. Hãy trả lời dựa trên kiến thức chung của bạn về chủ đề được hỏi.';
      if (contextParagraphs.length > 0) {
        context = `Dựa vào các trích đoạn sau từ tài liệu:\n\n---\n\n` + contextParagraphs.join('\n\n---\n\n');
      }

      const prompt = buildRagPrompt({ question: q, context });

      const result = await gemini.generateContent({ contents: prompt });
      const response = result.response;
      const text = response.text();

      const reply = `${text}\n\n*Nguồn: MLN122*`;
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);

    } catch (e: any) {
      setMessages((m) => [...m, { role: 'assistant', content: `Lỗi khi gọi Gemini: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const askLegacy = async (q: string) => {
    setLoading(true);
    try {
      const matches = findSimilarParagraphs(q, content);
      if (matches.length > 0) {
        const reply = `Mình tìm thấy trong content.txt (trích đoạn):\n\n` + matches.map(p => `• ${p.length > 250 ? p.slice(0, 250) + '…' : p}`).join('\n\n');
        setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: 'Mình chưa thấy nội dung này trong content.txt.' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const ask = async () => {
    const q = question.trim();
    if (!q) return;
    setQuestion('');
    setMessages((m) => [...m, { role: 'user', content: q }]);

    if (useGemini) {
      await askGemini(q);
    } else {
      await askLegacy(q);
    }
  };

  const isInputDisabled = loading || !contentLoaded;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-montserrat font-semibold text-slate-900 mb-4">Chatbot học tập</h1>

          <div className="mb-3 flex flex-wrap items-center gap-3">
            {/* <div className="flex items-center gap-2">
              <label className="text-sm text-slate-700 flex items-center gap-2">
                <input type="checkbox" checked={useGemini} onChange={(e) => setUseGemini(e.target.checked)} />
                Dùng Gemini
              </label>
              <select
                className="border rounded px-2 py-1 text-sm bg-white disabled:bg-slate-100"
                value={model}
                onChange={(e) => setModel(e.target.value as any)}
                disabled={!useGemini}
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash (nhanh)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (chất lượng)</option>
              </select>
            </div> */}
          </div>

          {loadError && <div className="mb-2 text-sm text-red-500">Lỗi: {loadError}</div>}

          <Card className="p-4 md:p-6 h-[60vh] overflow-y-auto space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'assistant' ? 'text-slate-800' : 'text-slate-900'}>
                <div className="text-xs text-slate-500 mb-1">{m.role === 'assistant' ? 'Trợ lý' : 'Bạn'}</div>
                <div className={
                  `whitespace-pre-wrap rounded px-3 py-2 ` +
                  (m.role === 'assistant' ? 'bg-white border' : 'bg-orange-50 border border-orange-200')
                }>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-slate-500">Đang tải và xử lý...</div>}
          </Card>
          <div className="mt-2 text-xs text-slate-500">
            {useGemini
              ? 'Trả lời bằng Gemini AI dựa trên file content.txt.'
              : 'Tìm kiếm trong file content.txt.'}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Nhập câu hỏi về bài học..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') ask(); }}
              disabled={isInputDisabled}
            />
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={ask}
              disabled={isInputDisabled}
            >
              Hỏi
            </Button>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Trợ lý AI trả lời dựa trên ngữ cảnh trích từ nội dung của web.
          </div>
        </div>
      </div>
    </div>
  );
}
