'use client';

import { useState } from 'react';
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
  const [tutorMode, setTutorMode] = useState(false);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'dễ' | 'trung bình' | 'khó'>('trung bình');
  const [currentQuestion, setCurrentQuestion] = useState<{ text: string; answer?: string; context?: string } | null>(null);

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
      setMessages((m) => [...m, { role: 'assistant', content: `Đã xây chỉ mục từ content.txt (${docs.length} đoạn). Bạn có thể đặt câu hỏi.` }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Không thể đọc content.txt. Hãy chắc chắn file nằm ở thư mục gốc/public.' }]);
    } finally {
      setBuilding(false);
    }
  };

  const getContextChunks = (hint: string) => {
    const topSeed = searchSections(hint || 'MLN122', 6);
    const topPdf = pdfIndex ? searchIndex(pdfIndex, hint || 'MLN122', 6) : [];
    const topTxt = txtIndex ? searchIndex(txtIndex, hint || 'MLN122', 6) : [];
    if (topPdf.length) return topPdf.map((d) => d.text).join('\n');
    if (topTxt.length) return topTxt.map((d) => d.text).join('\n');
    return topSeed.map((s) => `${s.title}: ${(s.bullets ?? []).join('; ')}`).join('\n');
  };

  const askQuestion = async () => {
    setCurrentQuestion(null);
    const hint = topic.trim();
    const ctx = getContextChunks(hint);
    if (!useGemini) {
      const fallback = `Hãy giải thích: ${hint || 'Trình bày lợi ích kinh tế và vai trò điều tiết của Nhà nước.'}`;
      setMessages((m) => [...m, { role: 'assistant', content: `Câu hỏi: ${fallback}` }]);
      setCurrentQuestion({ text: fallback, context: ctx });
      return;
    }
    const modelInst = getGemini(model);
    if (!modelInst) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Chưa cấu hình khóa Gemini. Không thể tạo câu hỏi.' }]);
      return;
    }
    const instr = `Bạn là trợ lý luyện tập. Tạo 1 câu hỏi ${difficulty} về môn MLN122 dựa trên NGỮ CẢNH. Trả về JSON với các field: question, answer, explain. Không thêm văn bản ngoài JSON.`;
    const parts = buildRagPrompt({ question: `Chủ đề: ${hint || 'tổng quan MLN122'}`, context: ctx, instructions: instr });
    const res = await modelInst.generateContent({ contents: [{ role: 'user', parts }] });
    const text = (await res.response).text();
    const maybe = extractJson(text);
    if (maybe) {
      const fmt = formatQnAFromJson(maybe);
      setMessages((m) => [...m, { role: 'assistant', content: fmt.text }]);
      setCurrentQuestion({ text: fmt.question ?? 'Câu hỏi', answer: fmt.answer, context: ctx });
    } else {
      setMessages((m) => [...m, { role: 'assistant', content: `Câu hỏi: ${text.replace(/```json|```/gi, '').trim()}` }]);
      setCurrentQuestion({ text: text.replace(/```json|```/gi, '').trim(), context: ctx });
    }
  };

  const ask = async () => {
    const q = question.trim();
    if (!q) return;
    setQuestion('');
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setLoading(true);
    try {
      // If in tutor mode and we have a pending question, treat user's message as an answer to grade
      if (tutorMode && currentQuestion) {
        if (!useGemini) {
          setMessages((m) => [...m, { role: 'assistant', content: 'Đã ghi nhận câu trả lời. Hãy bật Gemini để nhận chấm điểm và giải thích chi tiết.' }]);
          setCurrentQuestion(null);
          return;
        }
        const modelInst = getGemini(model);
        if (!modelInst) {
          setMessages((m) => [...m, { role: 'assistant', content: 'Chưa cấu hình khóa Gemini.' }]);
          return;
        }
        const gradeInstr = 'Bạn là giám khảo. Dựa trên NGỮ CẢNH và ĐÁP ÁN CHUẨN (nếu có), hãy chấm câu trả lời của học viên ngắn gọn (Đúng/Sai + vì sao) và giải thích dễ hiểu. Trả lời ngắn gọn.';
        const ctx = `${currentQuestion.context ?? ''}\n\nCÂU HỎI: ${currentQuestion.text}\nĐÁP ÁN CHUẨN: ${currentQuestion.answer ?? '(không có)'}\nCÂU TRẢ LỜI CỦA HỌC VIÊN: ${q}`;
        const parts = buildRagPrompt({ question: 'Chấm điểm và giải thích', context: ctx, instructions: gradeInstr });
        const res = await modelInst.generateContent({ contents: [{ role: 'user', parts }] });
        const text = (await res.response).text();
        setMessages((m) => [...m, { role: 'assistant', content: text }]);
        setCurrentQuestion(null);
        return;
      }

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
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <label className="text-sm text-slate-700 flex items-center gap-2">
              <input type="checkbox" checked={tutorMode} onChange={(e) => setTutorMode(e.target.checked)} />
              Chế độ luyện tập (AI đặt câu hỏi)
            </label>
            {tutorMode && (
              <>
                <input
                  className="border rounded px-2 py-1 text-sm flex-1 min-w-[160px]"
                  placeholder="Chủ đề mong muốn (ví dụ: quan hệ lợi ích)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                >
                  <option value="dễ">Dễ</option>
                  <option value="trung bình">Trung bình</option>
                  <option value="khó">Khó</option>
                </select>
                <Button size="sm" onClick={askQuestion} className="bg-orange-500 hover:bg-orange-600 text-white">Đặt câu hỏi</Button>
              </>
            )}
          </div>
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

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={buildPdf} disabled={building}>
              {pdfReady ? 'Xây lại chỉ mục PDF' : 'Xây chỉ mục PDF'}
            </Button>
            <Button variant="outline" size="sm" onClick={buildTxt} disabled={building}>
              Xây chỉ mục TXT
            </Button>
            {building && <span className="text-sm text-slate-500">Đang xử lý...</span>}
            {pdfReady && <span className="text-sm text-green-600">PDF sẵn sàng</span>}
            {txtIndex && <span className="text-sm text-green-600">TXT sẵn sàng</span>}
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



