'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Quiz = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

const quiz: Quiz[] = [
  {
    id: 'q1',
    question: 'Lợi ích kinh tế là gì?',
    options: [
      'Khoản thuế phải nộp cho Nhà nước',
      'Cái mà chủ thể nhận được từ hoạt động kinh tế',
      'Chỉ là lợi ích vật chất',
      'Tài sản của doanh nghiệp',
    ],
    answerIndex: 1,
    explanation: 'Lợi ích kinh tế là cái chủ thể nhận được từ hoạt động kinh tế (vật chất/tinh thần).',
  },
  {
    id: 'q2',
    question: 'Phân loại lợi ích nào sau đây là đầy đủ hơn?',
    options: [
      'Cá nhân và xã hội',
      'Ngắn hạn và dài hạn',
      'Cá nhân, tập thể, xã hội; ngắn hạn/dài hạn; vật chất/tinh thần',
      'Vật chất và tinh thần',
    ],
    answerIndex: 2,
    explanation: 'Các chiều phân loại: chủ thể, thời hạn, tính chất.',
  },
  {
    id: 'q3',
    question: 'Quan hệ lợi ích trong KTTT định hướng XHCN có đặc điểm:',
    options: [
      'Chỉ cạnh tranh',
      'Vừa hợp tác vừa cạnh tranh',
      'Không có mâu thuẫn',
      'Hoàn toàn do thị trường quyết định',
    ],
    answerIndex: 1,
    explanation: 'Tồn tại đa dạng chủ thể, có hợp tác và cạnh tranh.',
  },
  {
    id: 'q4',
    question: 'Vai trò chính của Nhà nước trong điều tiết lợi ích là:',
    options: [
      'Loại bỏ động cơ lợi nhuận',
      'Hoàn thiện thể chế, chính sách để hài hòa lợi ích',
      'Quyết định mọi mức giá',
      'Cấm cạnh tranh',
    ],
    answerIndex: 1,
    explanation: 'Nhà nước dùng công cụ thể chế, chính sách để hài hòa lợi ích.',
  },
  {
    id: 'q5',
    question: 'Công cụ điều tiết KHÔNG thuộc nhóm sau:',
    options: [
      'Thuế, phí',
      'An sinh xã hội',
      'Pháp luật, chính sách',
      'Tăng mọi giá bán của doanh nghiệp',
    ],
    answerIndex: 3,
    explanation: 'Nhà nước không trực tiếp tăng giá bán của DN như một công cụ thường xuyên.',
  },
  {
    id: 'q6',
    question: 'Nguyên tắc hài hòa lợi ích KHÔNG bao gồm:',
    options: [
      'Tôn trọng thị trường đi đôi với quản lý Nhà nước',
      'Minh bạch, trách nhiệm giải trình',
      'Đảm bảo lợi ích hợp pháp',
      'Bảo hộ nhóm lợi ích bất kể hiệu quả',
    ],
    answerIndex: 3,
    explanation: 'Không bảo hộ nhóm lợi ích nếu đi ngược hiệu quả/công bằng.',
  },
  {
    id: 'q7',
    question: 'Lợi ích cá nhân và xã hội cần được:',
    options: [
      'Hi sinh lợi ích cá nhân hoàn toàn',
      'Đặt lợi ích xã hội thấp hơn',
      'Hài hòa trên cơ sở pháp luật và khuyến khích đúng',
      'Tách rời không liên quan',
    ],
    answerIndex: 2,
    explanation: 'Hài hòa hợp pháp, khuyến khích phù hợp.',
  },
  {
    id: 'q8',
    question: 'Một ví dụ về công cụ kinh tế để điều tiết lợi ích là:',
    options: [
      'Tuyên truyền không đi kèm chính sách',
      'Thuế suất luỹ tiến',
      'Cấm mọi hoạt động xuất nhập khẩu',
      'Tổ chức lễ hội',
    ],
    answerIndex: 1,
    explanation: 'Thuế suất là công cụ kinh tế điển hình.',
  },
  {
    id: 'q9',
    question: 'Trong mâu thuẫn lợi ích, giải pháp quan trọng là:',
    options: [
      'Đối thoại xã hội, thương lượng tập thể',
      'Phớt lờ mâu thuẫn',
      'Ưu tiên tuyệt đối một bên',
      'Không cần cơ chế gì',
    ],
    answerIndex: 0,
    explanation: 'Đối thoại xã hội giúp tìm điểm cân bằng.',
  },
  {
    id: 'q10',
    question: 'Mục tiêu vĩ mô của điều tiết lợi ích KHÔNG phải là:',
    options: [
      'Ổn định vĩ mô',
      'Công bằng xã hội',
      'Tăng trưởng bền vững',
      'Độc quyền hoá thị trường',
    ],
    answerIndex: 3,
    explanation: 'Độc quyền hoá không phải mục tiêu.',
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return quiz.reduce((acc, q) => acc + (answers[q.id] === q.answerIndex ? 1 : 0), 0);
  }, [answers, submitted]);

  const select = (qid: string, idx: number) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-montserrat font-semibold text-slate-900">Bài trắc nghiệm (10 câu)</h1>

          {quiz.map((q, i) => {
            const selected = answers[q.id];
            const correct = submitted ? q.answerIndex : undefined;
            return (
              <Card key={q.id} className="p-4 md:p-6">
                <div className="text-sm text-slate-500 mb-2">Câu {i + 1}</div>
                <div className="font-medium mb-3">{q.question}</div>
                <div className="space-y-2">
                  {q.options.map((op, idx) => {
                    const isSel = selected === idx;
                    const isCorrect = submitted && idx === correct;
                    const isWrong = submitted && isSel && idx !== correct;
                    return (
                      <button
                        key={idx}
                        onClick={() => select(q.id, idx)}
                        className={
                          `w-full text-left rounded border px-3 py-2 transition ` +
                          (isSel ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:bg-slate-50') +
                          (isCorrect ? ' border-green-500 bg-green-50' : '') +
                          (isWrong ? ' border-red-500 bg-red-50' : '')
                        }
                      >
                        {op}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div className="mt-3 text-sm text-slate-600">
                    Đáp án đúng: <span className="font-medium">{q.options[q.answerIndex]}</span>. {q.explanation}
                  </div>
                )}
              </Card>
            );
          })}

          {!submitted ? (
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < quiz.length}
            >
              Nộp bài
            </Button>
          ) : (
            <Card className="p-4 md:p-6">
              <div className="text-xl font-semibold">Kết quả: {score} / {quiz.length}</div>
              <div className="text-slate-600 mt-1">Bạn có thể xem lại giải thích ở mỗi câu.</div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); }}>Làm lại</Button>
                <Button asChild>
                  <a href="/content" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">Ôn lại nội dung</a>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}



