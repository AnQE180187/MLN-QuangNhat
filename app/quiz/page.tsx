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
  { id: 'q150', question: 'Acceptance to an offer results in a ( )', options: ['Counteroffer','Contract','Counter acceptance','Invalid contract'], answerIndex: 1, explanation: 'Đáp án đúng: B' },
  { id: 'q151', question: "The offeree may make an inquiry about terms that differ from the offer's terms without rejecting the offer.", options: ['True','False'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q152', question: 'The duration of an offer is affected by (.)', options: ['Death or insanity of the offeror','Rejection of an offer by the offeree','The lapse of the time specified in the offer','All the choices'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q153', question: 'May sends a message offering to sell a laptop for $500. John offers $400, then accepts $500 after refusal. Which statement is correct?', options: ['An offer made by May and accepted by John','An offer made by John and accepted by May','May’s first statement is an invitation to treat','John’s second statement is an offer to buy for $500'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q154', question: 'No warranty of title arises when the seller makes the sale in ( )', options: ['A representative capacity','A meeting','A fair','Normal situations'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q155', question: 'Inferior Court ( )', options: ['Handles estates','Handles delinquent children','Handles divorce cases','Trial court hearing minor offenses and disputes'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q156', question: 'Personal property attached securely to real estate is called ( )', options: ['Cars','Fixture','All of the choices','Cups'], answerIndex: 1, explanation: 'Đáp án đúng: B' },
  { id: 'q157', question: 'Which of the following does NOT amount to a valid offer?', options: ['Offer must be definite','Offer must appear serious','Offer must be communicated','Offer must be accepted by offeree'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q158', question: 'The offer must be communicated to the offeree.', options: ['True','False'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q159', question: 'As a general rule, which party’s right under a contract may be assigned?', options: ['Only rights to negotiable instruments','Only rights to monetary damages','All rights','No rights, only duties'], answerIndex: 2, explanation: 'Đáp án đúng: C' },
  { id: 'q160', question: 'If your dad buys insurance that pays you $200,000 when he dies, you are:', options: ['Promisor','Promisee','Incidental third-party beneficiary','Intended third-party beneficiary'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q161', question: 'The party making the assignment is known as (...)', options: ['Assignor','Assignee','Promisor','Third-party beneficiary'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q162', question: 'A contract made by a person adjudicated incompetent will be treated:', options: ['Depending on the parties’ will','Void, regardless of fairness','Valid','Voidable'], answerIndex: 1, explanation: 'Đáp án đúng: B' },
  { id: 'q163', question: 'In Vietnam, offer and acceptance are governed by (...)', options: ['Civil Code 2005','Enterprise Law 2005','Constitution','Land Law'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q164', question: 'If no performance time stated, it must be performed (...)', options: ['Within a reasonable time','Within time agreed by parties','At any time','None of the choices'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q165', question: 'The U.S. Supreme Court (...)', options: ['Has no original jurisdiction','Has appellate jurisdiction in cases based on Constitution, federal law, or treaty','Does not hear direct appeals','Must take all appeals'], answerIndex: 1, explanation: 'Đáp án đúng: B' },
  { id: 'q166', question: 'Transferring contractual duties to another person is called (...)', options: ['Delegation','Novation','Assignment','Promise'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q167', question: 'Which of the following are NOT obligated to the contract terms?', options: ['Promisor','Promisee','Third-party beneficiary','Contractual party'], answerIndex: 2, explanation: 'Đáp án đúng: C' },
  { id: 'q168', question: 'Force Majeure Clause means (...)', options: ['Excuses performance when extraordinary event occurs','Announcing intention not to perform','Failure to perform obligation','Time limit for lawsuit'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q169', question: 'If stock is 7% nonparticipating, it means (...)', options: ['7% is the maximum preferred dividend regardless of profits','7% plus 7% of common stock','7% is the minimum return','7% plus profit share'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q170', question: 'In Vietnam, the Constitution is enacted by (...)', options: ['The Government','The Supreme People’s Court','The National Assembly','The People'], answerIndex: 2, explanation: 'Đáp án đúng: C' },
  { id: 'q171', question: 'If contract doesn’t specify time for performance, it must be completed (...)', options: ['Within a reasonable time','At any time','Before statute of limitations','Within 3 years'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q172', question: 'Which of the following is NOT a cause of discharge by impossibility?', options: ['Destruction of subject matter','New laws make contract illegal','Death of service performer','Alteration of written contract'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q173', question: 'According to Civil Code 2015, limitation period for contract disputes is (...)', options: ['Three years','Two years','Four years','Five years'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q174', question: 'A civil contract shall be terminated in any of the following EXCEPT:', options: ['Contract completed','Subject matter no longer exists','Parties agree','One party breached the contract'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q175', question: 'All sellers, by selling, make (...) that they have good titles.', options: ['A warranty','An offer','A private assurance','A registration'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q176', question: 'Under Vietnamese law, when one transfers rights, notice must be given in (...)', options: ['Oral','Written','Conduct','Any form'], answerIndex: 1, explanation: 'Đáp án đúng: B' },
  { id: 'q177', question: 'Corporate social responsibility ideally focuses ( ) on social good of products.', options: ['Managers','Stakeholders','Government','Owners'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q178', question: 'Written agreements to buy stock before incorporation are called (...)', options: ['Stock Agreement','Subscription Agreement','Promoter’s Agreement','Capital Agreement'], answerIndex: 1, explanation: 'Đáp án đúng: B' },
  { id: 'q179', question: 'Which statement is NOT true about sole proprietorships?', options: ['Personally liable for debts','Owns all assets and profits','Full control of operations','Financial risk limited to investment'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q180', question: 'Partnership is defined as (...)', options: ['Association of 2+ people to carry on business for profit','Association to conduct nonprofit profession','Association to form trade union','All choices'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q181', question: 'Which right is NOT an incidental power of a corporation?', options: ['Engage in legal actions','Have corporate seal','Have continuous existence','Mortgage or lease property'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q182', question: 'Which is NOT an advantage of corporate form?', options: ['Pool capital','Limited liability','Death doesn’t dissolve company','Majority shareholders have sole voice'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q183', question: 'If two Californians have a civil controversy, proper venue is (...)', options: ['California','New York','Outside California','Anywhere in US'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q184', question: 'Which is an intangible personal property?', options: ['Copyrights','Merchandise','Animals','Furniture'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q185', question: 'The supreme law defining government-citizen relations in the U.S. is (...)', options: ['Constitution','Statutes','Bylaws','Bill of Rights'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q186', question: 'Which is tangible personal property?', options: ['Savings account certificates','Copyrights','Checks','Furniture'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q187', question: 'In ___, the parties express intentions in writing.', options: ['Written contract','Oral contract','Implied contract','Oral and executory contract'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q188', question: '___ uses the common law system.', options: ['Vietnam','France','Laos','The U.S.'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q189', question: 'If property becomes part of real estate (like house bricks), it’s a fixture.', options: ['True','False'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q190', question: 'Laws enabling a state to have jurisdiction over nonresidents are called (...)', options: ['Long-arm Statutes','State Statutes','Criminal Law','Public Law'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q191', question: 'Improperly confining a person is (...)', options: ['Battery','Trespass','False imprisonment','Assault'], answerIndex: 2, explanation: 'Đáp án đúng: C' },
  { id: 'q192', question: 'In the U.S., commissions or boards regulating specific matters are (...)', options: ['Administrative agencies','Long-arm Statutes','Bylaws','Statutes'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q193', question: 'The authority of a court to hear cases is its (...)', options: ['Jurisdiction','Statutes','Criminal law','Constitution'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q194', question: 'Methods of acquiring personal property do NOT include (...)', options: ['Theft','Descent','Confusion','Accession'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q195', question: '___ involves putting a person in fear of wrongful touching.', options: ['Assault','Trespass','False imprisonment','Battery'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q196', question: 'Common law and equity law in the U.S. originated from (...)', options: ['France','Russia','England','Germany'], answerIndex: 2, explanation: 'Đáp án đúng: C' },
  { id: 'q197', question: 'Every seller makes a warranty that goods shall be delivered (...) security interest.', options: ['Free from any','Full of','Containing any','With any'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
  { id: 'q198', question: 'According to Vietnamese law, real property includes (...)', options: ['Motorbike','Chicken','Horse','Property attached securely to land'], answerIndex: 3, explanation: 'Đáp án đúng: D' },
  { id: 'q199', question: 'A party to a contract may assign rights or delegate duties or both.', options: ['True','False'], answerIndex: 0, explanation: 'Đáp án đúng: A' },
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
    if (gameFinished) {
      // Show confetti/fireworks whenever the quiz is finished
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
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
                Trò chơi trắc nghiệm pháp luật
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Kiểm tra kiến thức của bạn về luật doanh nghiệp, hợp đồng và quản trị công ty
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
                  {[...Array(80)].map((_, i) => (
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

              {/* Congratulation image: place your image at /public/congrats.jpg to show here */}
              <div className="mb-6">
                <img
                  src="/congrats.jpg"
                  alt="Chúc mừng"
                  className="mx-auto w-48 h-48 object-cover rounded-full mb-4 shadow-2xl"
                  onError={(e) => {
                    // Hide broken image if not present
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
              </div>
            
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
