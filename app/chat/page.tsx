'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { getGemini, buildRagPrompt } from '@/lib/geminiClient';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Tôi là trợ lý AI chuyên về chủ đề "Lợi ích kinh tế – động lực phát triển hay nguồn gốc của mâu thuẫn xã hội?". Hãy đặt câu hỏi cho tôi.' },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const askGemini = async (q: string) => {
    const gemini = getGemini(); // Uses the default 'gemini-2.5-flash'
    if (!gemini) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Chưa định cấu hình Gemini API Key. Hãy thêm NEXT_PUBLIC_GEMINI_API_KEY vào file .env.local.' }]);
      return;
    }

    setLoading(true);
    try {
      const instructions = 'Bạn là một trợ lý AI chuyên về triết học Mác-Lênin. Hãy trả lời câu hỏi của người dùng một cách chi tiết, chính xác và sư phạm. Câu trả lời của bạn phải tập trung hoàn toàn vào chủ đề "Lợi ích kinh tế – động lực phát triển hay nguồn gốc của mâu thuẫn xã hội?". Tuyệt đối không sử dụng thông tin bên ngoài, chỉ dựa vào kiến thức đã được huấn luyện của bạn.';

      const prompt = buildRagPrompt({ question: q, instructions });

      const result = await gemini.generateContent({ contents: prompt });
      const response = result.response;
      const text = response.text();

      setMessages((m) => [...m, { role: 'assistant', content: text }]);

    } catch (e: any) {
      setMessages((m) => [...m, { role: 'assistant', content: `Lỗi khi gọi Gemini: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const ask = async () => {
    const q = question.trim();
    if (!q) return;
    setQuestion('');
    setMessages((m) => [...m, { role: 'user', content: q }]);
    await askGemini(q);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Chatbot AI
                </h1>
                <p className="text-slate-600 mt-1">
                  Trợ lý AI chuyên sâu về triết học Mác-Lênin (không tìm kiếm web)
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Chat Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl mb-4">
            <div className="h-[60vh] overflow-y-auto space-y-4 pr-2">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`text-xs mb-2 font-semibold ${m.role === 'assistant' ? 'text-orange-600' : 'text-slate-600'
                      }`}>
                      {m.role === 'assistant' ? 'Trợ lý' : 'Bạn'}
                    </div>
                    <div
                      className={`whitespace-pre-wrap rounded-xl px-4 py-3 shadow-md ${m.role === 'assistant'
                        ? 'bg-white border-2 border-orange-200 text-slate-800'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                        }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-slate-500"
                >
                  <Sparkles className="w-4 h-4 animate-pulse text-orange-500" />
                  <span className="text-sm">Đang xử lý...</span>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
            <div className="flex gap-3">
              <Input
                placeholder="Nhập câu hỏi của bạn..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') ask(); }}
                disabled={loading}
                className="flex-1 border-2 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
              />
              <Button
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 shadow-lg shadow-orange-500/30"
                onClick={ask}
                disabled={loading}
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Gửi
              </Button>
            </div>
            <div className="text-xs text-slate-500 mt-3 text-center">
              Trợ lý AI có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}