'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Zap, Target, CheckCircle2, XCircle, Sparkles, Flame, Award } from 'lucide-react';

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQ = quiz[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.length) * 100;
  const isLastQuestion = currentQuestion === quiz.length - 1;

  useEffect(() => {
    if (gameFinished && score === quiz.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [gameFinished, score]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setAnswers({ ...answers, [currentQ.id]: index });
    
    const isCorrect = index === currentQ.answerIndex;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setGameFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
    setScore(0);
    setStreak(0);
    setGameStarted(false);
    setGameFinished(false);
    setShowResult(false);
  };

  const getScoreEmoji = () => {
    const percentage = (score / quiz.length) * 100;
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '⭐';
    if (percentage >= 60) return '👍';
    return '📚';
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.length) * 100;
    if (percentage === 100) return 'Xuất sắc! Bạn đã hoàn thành hoàn hảo!';
    if (percentage >= 80) return 'Tuyệt vời! Kiến thức của bạn rất tốt!';
    if (percentage >= 60) return 'Khá tốt! Hãy ôn lại để cải thiện!';
    return 'Cần cố gắng thêm! Hãy xem lại nội dung!';
  };

  if (!gameStarted) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 md:p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-2xl">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Trò chơi trắc nghiệm
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Kiểm tra kiến thức của bạn về các quan hệ lợi ích kinh tế ở Việt Nam
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Target className="w-5 h-5 text-orange-500" />
                  <span>{quiz.length} câu hỏi</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Điểm số và streak</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span>Phản hồi tức thì</span>
                </div>
              </div>
              <Button
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-bold shadow-lg shadow-orange-500/30"
                size="lg"
              >
                Bắt đầu chơi
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = (score / quiz.length) * 100;
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 md:p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-2xl">
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-50">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                    animate={{ y: window.innerHeight + 100, opacity: 0 }}
                    transition={{ duration: 3, delay: Math.random() * 2 }}
                    className="absolute"
                  >
                    <Sparkles className="w-6 h-6 text-orange-500" />
                  </motion.div>
                ))}
              </div>
            )}
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-6xl mb-4"
            >
              {getScoreEmoji()}
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Hoàn thành!
            </h2>
            
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-6xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
              >
                {score} / {quiz.length}
              </motion.div>
              <div className="text-xl text-slate-600 mb-4">{getScoreMessage()}</div>
              
              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-4 mb-6 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${
                    percentage === 100 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    percentage >= 80 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleRestart}
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3"
              >
                Chơi lại
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3"
              >
                <a href="/content">Ôn lại nội dung</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header với Score và Streak */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Điểm số</div>
                    <div className="text-2xl font-bold text-orange-600">{score}</div>
                  </div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Streak</div>
                      <div className="text-2xl font-bold text-yellow-600">{streak}</div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600 mb-1">Câu hỏi</div>
                <div className="text-xl font-bold text-slate-900">
                  {currentQuestion + 1} / {quiz.length}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="mb-6"
        >
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 md:p-8 bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                <Target className="w-4 h-4" />
                Câu {currentQuestion + 1}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.answerIndex;
                const isWrong = isSelected && !isCorrect;
                const showResult = selectedAnswer !== null;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-4 rounded-xl transition-all relative overflow-hidden ${
                      showResult && isCorrect
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                        : showResult && isWrong
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                        : isSelected
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      {showResult && isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                      )}
                      {showResult && isWrong && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <XCircle className="w-6 h-6" />
                        </motion.div>
                      )}
                      <span className="font-semibold text-lg flex-1">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
                >
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-blue-900 mb-1">Giải thích:</div>
                      <div className="text-blue-800">{currentQ.explanation}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold shadow-lg shadow-orange-500/30"
                  size="lg"
                >
                  {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo →'}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
