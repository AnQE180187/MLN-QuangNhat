"use client";

import { useState, useEffect } from 'react';
import { getGeminiFlashModel } from '../../lib/geminiClient';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { motion } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const ask = async () => {
    if (!question.trim() || loading) return;

    setLoading(true);
    const userMessage: Message = { role: 'user', content: question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setQuestion('');

    try {
      const fullPrompt = `Bạn là một trợ lý AI chuyên sâu về triết học Mác-Lênin. Chỉ trả lời các câu hỏi liên quan đến chủ đề 'lợi ích kinh tế' trong triết học Mác-Lênin. Nếu câu hỏi không liên quan, hãy lịch sự từ chối và yêu cầu người dùng hỏi về chủ đề chính. Câu hỏi của người dùng: ${question}`;

      const model = getGeminiFlashModel();
      const result = await model.generateContent(fullPrompt);
      const text = result.response.text();

      const assistantMessage: Message = { role: 'assistant', content: text };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error generating content:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
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