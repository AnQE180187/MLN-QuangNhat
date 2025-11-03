'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchSections } from '@/lib/mlnContent';
import { getGemini, buildRagPrompt } from '@/lib/geminiClient';
import { extractPdfText, chunkPages } from '@/lib/pdfClient';
import { buildIndex, search as searchIndex, chunkText } from '@/lib/indexer';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatPage() {
  const extractJson = (raw: string): any | null => {
    try {
      const fenced = raw.match(/```json[\s\S]*?```/i);
      const body = fenced ? fenced[0].replace(/```json|```/gi, '') : raw;
      return JSON.parse(body);
    } catch {
      return null;
    }
  };

  const formatQnAFromJson = (obj: any): { question?: string; answer?: string; explain?: string; text: string } => {
    const q = obj?.question ?? obj?.Q ?? obj?.prompt;
    const a = obj?.answer ?? obj?.A ?? obj?.solution;
    const e = obj?.explain ?? obj?.explanation ?? obj?.why;
    const parts: string[] = [];
    if (q) parts.push(`Câu hỏi: ${q}`);
    if (a) parts.push(`Đáp án gợi ý: ${a}`);
    if (e) parts.push(`Giải thích: ${e}`);
    return { question: q, answer: a, explain: e, text: parts.join('\n') || String(obj) };
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Hãy hỏi tôi bất kỳ điều gì về nội dung môn MLN122.' },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const [model, setModel] = useState<'gemini-2.5-flash' | 'gemini-1.5-pro'>('gemini-2.5-flash');
  const [pdfReady, setPdfReady] = useState(false);
  const [building, setBuilding] = useState(false);
  const [pdfIndex, setPdfIndex] = useState<ReturnType<typeof buildIndex> | null>(null);
  const [txtIndex, setTxtIndex] = useState<ReturnType<typeof buildIndex> | null>(null);
  // Tutor mode removed per request

  const buildPdf = async () => {
    try {
      setBuilding(true);
      // Default PDF path in project root/public
      const url = '/mln.pdf';
      const res = await extractPdfText(url);
      const chunks = chunkPages(res.pages);
      const docs = chunks.map((c) => ({ id: c.id, text: c.text, meta: { page: c.page } }));
      const idx = buildIndex(docs);
      setPdfIndex(idx);
      setPdfReady(true);
      setMessages((m) => [...m, { role: 'assistant', content: `Đã xây chỉ mục PDF (${res.pages.length} trang, ${docs.length} đoạn). Bạn có thể đặt câu hỏi.` }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Không thể đọc PDF. Hãy đảm bảo file mln.pdf nằm trong thư mục public/.' }]);
    } finally {
      setBuilding(false);
    }
  };

  const buildTxt = async () => {
    try {
      setBuilding(true);
      const res = await fetch('/content.txt');
      if (!res.ok) throw new Error('Không tìm thấy content.txt');
      const text = await res.text();
      const docs = chunkText(text);
      const idx = buildIndex(docs);
      setTxtIndex(idx);
      // Silent success; avoid flooding chat on first load
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Không thể đọc content.txt. Hãy chắc chắn file nằm ở thư mục public/.' }]);
    } finally {
      setBuilding(false);
    }
  };

  useEffect(() => {
    // Auto-build TXT index on first visit
    if (!txtIndex) {
      buildTxt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Context helper (unused now) removed

  // askQuestion removed

  const ask = async () => {
    const q = question.trim();
    if (!q) return;
    setQuestion('');
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setLoading(true);
    try {
      // Tutor grading removed

      const topSeed = searchSections(q, 6);
      const topPdf = pdfIndex ? searchIndex(pdfIndex, q, 6) : [];
      const topTxt = txtIndex ? searchIndex(txtIndex, q, 6) : [];
      const top = topPdf.length
        ? topPdf.map(d => ({ title: `PDF trang ${d.meta?.page}`, bullets: [d.text] }))
        : (topTxt.length ? topTxt.map(d => ({ title: 'TXT', bullets: [d.text] })) : topSeed);
      if (!useGemini) {
        if (top.length === 0) {
          setMessages((m) => [...m, { role: 'assistant', content: 'Mình chưa tìm thấy thông tin phù hợp. Hãy thử diễn đạt khác hoặc cụ thể hơn nhé.' }]);
          return;
        }
        const answer = `Mình tìm được một số điểm chính liên quan:\n\n` +
          top.map((s) => `• ${s.title}${s.bullets && s.bullets.length ? `: ${s.bullets[0]}` : ''}`).join('\n') +
          `\n\n(Bạn có thể mở mục tương ứng ở phần Nội dung để xem chi tiết.)`;
        setMessages((m) => [...m, { role: 'assistant', content: answer }]);
        return;
      }

      const ctx = top.map((s) => {
        const bullets = (s.bullets ?? []).map((b) => `- ${b}`).join('\n');
        return `# ${s.title}\n${bullets}`;
      }).join('\n\n');
      const modelInst = getGemini(model);
      if (!modelInst) {
        setMessages((m) => [...m, { role: 'assistant', content: 'Chưa cấu hình khóa Gemini. Vui lòng thêm NEXT_PUBLIC_GEMINI_API_KEY trong .env.local.' }]);
        return;
      }
      const promptParts = buildRagPrompt({ question: q, context: ctx });
      const result = await modelInst.generateContent({ contents: [{ role: 'user', parts: promptParts }] });
      const text = (await result.response).text();
      setMessages((m) => [...m, { role: 'assistant', content: text }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-montserrat font-semibold text-slate-900 mb-4">Chatbot học tập</h1>
          {/* Tutor mode UI removed */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {/* <label className="text-sm text-slate-700 flex items-center gap-2">
              <input type="checkbox" checked={useGemini} onChange={(e) => setUseGemini(e.target.checked)} />
              Dùng Gemini
            </label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={model}
              onChange={(e) => setModel(e.target.value as any)}
              disabled={!useGemini}
            >
              <option value="gemini-1.5-flash">gemini-1.5-flash (nhanh)</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro (chất lượng)</option>
            </select> */}
          </div>

          {building && <div className="mb-2 text-sm text-slate-500">Đang chuẩn bị dữ liệu học (content.txt)...</div>}

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
            {loading && <div className="text-sm text-slate-500">Đang tìm trong tài liệu...</div>}
          </Card>
          {pdfReady && (
            <div className="mt-2 text-xs text-slate-500">Gợi ý: Câu trả lời sẽ tham chiếu các trang PDF liên quan (hiển thị trong nội dung trả lời).</div>
          )}
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Nhập câu hỏi về bài học..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') ask(); }}
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={ask} disabled={loading}>Hỏi</Button>
          </div>
          <div className="text-xs text-slate-500 mt-2">Bạn có thể bật/tắt Gemini. Khi bật, trợ lý sẽ trả lời dựa trên ngữ cảnh trích từ nội dung môn học.</div>
        </div>
      </div>
    </div>
  );
}



