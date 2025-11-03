'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getGemini, buildRagPrompt } from '@/lib/geminiClient';
import { courseContent } from '@/lib/courseContent'; // Import content directly

type Message = { role: 'user' | 'assistant'; content: string };
type GeminiModel = 'gemini-2.5-flash' | 'gemini-1.5-pro';

// The content is now part of the bundle, no need to fetch.
const content = courseContent;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Hãy đặt câu hỏi cho tôi. Nếu không có trong tài liệu, tôi sẽ tìm kiếm trên web.' },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Gemini state
  const [useGemini, setUseGemini] = useState(true);
  const [model, setModel] = useState<GeminiModel>('gemini-2.5-flash');

  const findSimilarParagraphs = (query: string, text: string, count = 3) => {
    const q = query.toLowerCase().trim();
    if (!q || !text) return [];

    const paragraphs = text.split(/\n{2,}|\r\n{2,}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);

    const scored = paragraphs
      .map((p) => {
        const pLower = p.toLowerCase();
        let score = 0;
        q.split(/\s+/).forEach((w) => {
          if (pLower.includes(w)) {
            score++;
          }
        });
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

  const webSearch = async (q: string) => {
    setMessages((m) => [...m, { role: 'assistant', content: 'Không tìm thấy trong tài liệu, đang tìm kiếm trên web...' }]);
    try {
      // Using a CORS proxy to bypass browser restrictions on DuckDuckGo API
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_redirect=1&no_html=1`;
      const res = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      if (!res.ok) return [];
      const data = await res.json();
      const contents = JSON.parse(data.contents);

      const out: { title: string; url: string; body: string }[] = [];
      const pushItem = (t: any) => {
        if (t && t.Result) {
          const url = t.FirstURL;
          const body = t.Text;
          const titleMatch = t.Result.match(/<a.*?>(.*?)<\/a>/);
          const title = titleMatch ? titleMatch[1].replace(/<\/?b>/g, '') : 'Không có tiêu đề';
          if (url && body) {
            out.push({ title, url, body });
          }
        }
      };
      if (Array.isArray(contents.RelatedTopics)) {
        contents.RelatedTopics.forEach(pushItem);
      }
      return out.slice(0, 5);
    } catch (e) {
      console.error("Web search failed", e);
      return [];
    }
  };

  const askGemini = async (q: string) => {
    const gemini = getGemini(model);
    if (!gemini) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Chưa định cấu hình Gemini API Key. Hãy thêm NEXT_PUBLIC_GEMINI_API_KEY vào file .env.local.' }]);
      return;
    }

    setLoading(true);
    try {
      const contextParagraphs = findSimilarParagraphs(q, content);
      let context: string;
      let source = 'Tài liệu môn học';
      let instructions = 'Bạn là trợ lý học tập cho môn MLN122. Trả lời ngắn gọn, chính xác, dựa trên NGỮ CẢNH cho trước. Nếu thông tin không có trong NGỮ CẢNH, hãy nói không chắc và gợi ý mục liên quan.';

      if (contextParagraphs.length > 0) {
        context = `Dựa vào các trích đoạn sau từ tài liệu:\n\n---\n\n` + contextParagraphs.join('\n\n---\n\n');
      } else {
        const webResults = await webSearch(q);
        if (webResults.length > 0) {
          source = 'Web';
          instructions = 'Bạn là một trợ lý AI. Thông tin không có trong tài liệu, vì vậy hãy trả lời câu hỏi của người dùng dựa trên các kết quả tìm kiếm trên web sau đây. Hãy tóm tắt câu trả lời và luôn luôn trích dẫn nguồn bằng cách ghi kèm (Nguồn: URL) ở cuối mỗi luận điểm.';
          context = webResults.map(r => `Tiêu đề: ${r.title}\nURL: ${r.url}\nNội dung: ${r.body}`).join('\n\n---\n\n');
        } else {
          setMessages((m) => [...m, { role: 'assistant', content: 'Mình đã tìm cả trong tài liệu và trên web nhưng không thấy thông tin phù hợp.' }]);
          return;
        }
      }

      const prompt = buildRagPrompt({ question: q, context, instructions });

      const result = await gemini.generateContent({ contents: prompt });
      const response = result.response;
      const text = response.text();

      const reply = source === 'Web' ? text : `${text}\n\n*Nguồn: ${source}*`;
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
        const reply = `Mình tìm thấy trong tài liệu (trích đoạn):\n\n` + matches.map(p => `• ${p.length > 250 ? p.slice(0, 250) + '…' : p}`).join('\n\n');
        setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      } else {
        const web = await webSearch(q);
        if (web.length > 0) {
          const reply = `Không có trong tài liệu. Kết quả tham khảo trên web:\n` + web.map(r => `• ${r.title} (${r.url})`).join('\n');
          setMessages((m) => [...m, { role: 'assistant', content: reply }]);
        } else {
          setMessages((m) => [...m, { role: 'assistant', content: 'Mình đã tìm cả trong tài liệu và trên web nhưng không thấy thông tin phù hợp.' }]);
        }
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-montserrat font-semibold text-slate-900 mb-4">Chatbot học tập</h1>

          <div className="mb-3 flex flex-wrap items-center gap-3">

          </div>

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
            {loading && <div className="text-sm text-slate-500">Đang xử lý...</div>}
          </Card>
          <div className="mt-2 text-xs text-slate-500">
            {useGemini
              ? 'Trả lời bằng Gemini AI, có tìm kiếm trên web nếu cần.'
              : 'Tìm kiếm từ khóa trong tài liệu hoặc trên web.'}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Nhập câu hỏi về bài học..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') ask(); }}
              disabled={loading}
            />
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={ask}
              disabled={loading}
            >
              Hỏi
            </Button>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Trợ lý AI trả lời dựa trên tài liệu môn học hoặc kết quả tìm kiếm trên web.
          </div>
        </div>
      </div>
    </div>
  );
}
