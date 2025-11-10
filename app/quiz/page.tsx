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

const defaultQuiz: Quiz[] = [
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
  const [quiz, setQuiz] = useState<Quiz[]>(defaultQuiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHelloKitty, setShowHelloKitty] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('replace');
  const [revealScoreAtEnd, setRevealScoreAtEnd] = useState(true);
  const [otherSets, setOtherSets] = useState<Array<{id: string; name: string; questions: Quiz[]}>>([]);
  const [showOtherSets, setShowOtherSets] = useState(false);

  // Load other question sets from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mln_other_question_sets');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setOtherSets(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const currentQ = quiz[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.length) * 100;
  const isLastQuestion = currentQuestion === quiz.length - 1;

  useEffect(() => {
    if (gameFinished) {
      // Show confetti/fireworks whenever the quiz is finished
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      setShowFireworks(true);
      setShowHelloKitty(true);
      const fwTimer = setTimeout(() => setShowFireworks(false), 6000);
      const hkTimer = setTimeout(() => setShowHelloKitty(false), 6000);
      return () => {
        clearTimeout(fwTimer);
        clearTimeout(hkTimer);
      };
    }
  }, [gameFinished, score]);

  // Load custom quiz from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mln_custom_quiz');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= 1 && parsed.length <= 50) {
          setQuiz(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const letterToIndex = (letter: string) => {
    const upper = letter.trim().toUpperCase();
    const code = upper.charCodeAt(0);
    // Support A-Z → 0-25
    if (code >= 65 && code <= 90) return code - 65;
    return -1;
  };

  const parseImportedQuestions = (text: string): Quiz[] => {
    const blocks = text
      .split(/\n{2,}/)
      .map(b => b.trim())
      .filter(Boolean);

    const results: Quiz[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const lines = blocks[i].split('\n').map(l => l.trim()).filter(Boolean);

      // Question line like: (198) According to ...
      const qMatch = lines[0].match(/^\(\d+\)\s*(.+)$/);
      const question = (qMatch ? qMatch[1] : lines[0]).trim();

      // Options start with A./B./C./... (support A-Z)
      const optionRegex = /^[A-Za-z]\.\s*(.+)$/;
      const options: string[] = [];
      let answerLineIndex = -1;

      for (let li = 1; li < lines.length; li++) {
        const ln = lines[li];
        const opt = ln.match(optionRegex);
        if (opt && opt[1]) {
          options.push(opt[1].trim());
        } else {
          answerLineIndex = li;
          break;
        }
      }

      // Allow any number of options >= 1
      if (options.length < 1) {
        throw new Error(`Khối ${i + 1} thiếu lựa chọn (ít nhất 1).`);
      }

      const answerTail = lines.slice(answerLineIndex >= 0 ? answerLineIndex : lines.length - 1).join(' ');
      const ansMatch = answerTail.match(/(?:Đáp\s*án|Answer)\s*:\s*([A-Za-z])/);
      const ansIdx = ansMatch ? letterToIndex(ansMatch[1]) : -1;
      if (ansIdx < 0 || ansIdx >= options.length) {
        throw new Error(`Khối ${i + 1} thiếu hoặc sai định dạng đáp án (A-Z) hoặc vượt quá số lựa chọn.`);
      }

      results.push({
        id: `q_custom_${Date.now()}_${i}`,
        question,
        options,
        answerIndex: ansIdx,
        explanation: '',
      });
    }

    if (results.length > 50) {
      throw new Error('Tối đa 50 câu hỏi mỗi lần.');
    }

    return results;
  };

  const handleImport = () => {
    try {
      setImportError(null);
      const parsed = parseImportedQuestions(importText);
      
      // Save to other question sets storage
      try {
        const existingSets = JSON.parse(localStorage.getItem('mln_other_question_sets') || '[]');
        const newSet = {
          id: `set_${Date.now()}`,
          name: `Bộ câu hỏi ${existingSets.length + 1}`,
          questions: parsed
        };
        existingSets.push(newSet);
        localStorage.setItem('mln_other_question_sets', JSON.stringify(existingSets));
      } catch (e) {
        console.error('Failed to save to other sets:', e);
      }

      let next: Quiz[];
      if (importMode === 'append') {
        next = [...quiz, ...parsed].slice(0, 50);
      } else {
        next = parsed;
      }
      setQuiz(next);
      localStorage.setItem('mln_custom_quiz', JSON.stringify(next));
      setImportOpen(false);
      setImportText('');
      // reset session
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswers({});
      setScore(0);
      setStreak(0);
      setGameFinished(false);
      setShowResult(false);
    } catch (e: any) {
      setImportError(e?.message || 'Không thể phân tích dữ liệu. Vui lòng kiểm tra định dạng.');
    }
  };

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

  // Function to load a question set
  const handleLoadQuestionSet = (questions: Quiz[]) => {
    setQuiz(questions);
    setShowOtherSets(false);
    setGameStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
    setScore(0);
    setStreak(0);
  };

  // Function to delete a question set
  const handleDeleteQuestionSet = (setId: string) => {
    const newSets = otherSets.filter(set => set.id !== setId);
    setOtherSets(newSets);
    localStorage.setItem('mln_other_question_sets', JSON.stringify(newSets));
  };

  if (!gameStarted) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-4">
        {showOtherSets && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-pink-600">Bộ câu hỏi đã lưu</h2>
              {otherSets.length === 0 ? (
                <p className="text-slate-600">Chưa có bộ câu hỏi nào được lưu.</p>
              ) : (
                <div className="space-y-4">
                  {otherSets.map((set) => (
                    <div key={set.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{set.name}</h3>
                        <p className="text-slate-600">{set.questions.length} câu hỏi</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
                          onClick={() => handleLoadQuestionSet(set.questions)}
                        >
                          Chọn
                        </Button>
                        <Button
                          variant="outline"
                          className="border-2 border-red-500 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteQuestionSet(set.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  className="border-2 border-slate-300"
                  onClick={() => setShowOtherSets(false)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 md:p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-2xl">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                Trò chơi trắc nghiệm pháp luật
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Kiểm tra kiến thức của bạn về luật doanh nghiệp, hợp đồng và quản trị công ty
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Target className="w-5 h-5 text-pink-500" />
                  <span>{quiz.length} câu hỏi</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span>Điểm số và streak</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Zap className="w-5 h-5 text-pink-500" />
                  <span>Phản hồi tức thì</span>
                </div>
              </div>
              <Button
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-6 text-lg font-bold shadow-lg shadow-pink-500/30"
                size="lg"
              >
                Bắt đầu chơi
              </Button>
              <div className="mt-4 flex flex-col items-center gap-3">
                <label className="flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-pink-500"
                    checked={revealScoreAtEnd}
                    onChange={(e) => setRevealScoreAtEnd(e.target.checked)}
                  />
                  <span>Chỉ hiện điểm khi hoàn thành toàn bộ</span>
                </label>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
                    onClick={() => setImportOpen(true)}
                  >
                    Thêm câu hỏi (tối đa 50/lần)
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
                    onClick={() => setShowOtherSets(true)}
                  >
                    Bộ câu hỏi khác ({otherSets.length})
                  </Button>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
        <CuteBackground />
      </div>
    );
  }

  if (gameFinished) {
    const percentage = (score / quiz.length) * 100;
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 md:p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-2xl">
              {/* Pink theme fullscreen background on finish */}
              <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200" />
              {/* Fireworks Canvas Overlay */}
              {showFireworks && <FireworksCanvas />}

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-[9999]">
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

              {/* Hello Kitty overlay: floating kitty and hearts */}
              {showHelloKitty && (
                <div className="fixed inset-0 pointer-events-none z-[9999]">
                  {[...Array(24)].map((_, i) => {
                    const left = Math.random() * 100;
                    const delay = Math.random() * 1.5;
                    const duration = 3 + Math.random() * 2;
                    const size = 28 + Math.random() * 16;
                    const emoji = i % 3 === 0 ? '😺' : i % 3 === 1 ? '💖' : '🎀';
                    return (
                      <motion.div
                        key={`kitty-${i}`}
                        initial={{ y: window.innerHeight + 40, x: `${left}vw`, opacity: 0 }}
                        animate={{ y: -60, opacity: 1 }}
                        transition={{ duration, delay }}
                        className="absolute text-center"
                        style={{ fontSize: size }}
                      >
                        {emoji}
                      </motion.div>
                    );
                  })}
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
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
              Hoàn thành!
            </h2>
            
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-6xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent"
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
                percentage >= 80 ? 'bg-gradient-to-r from-pink-500 to-pink-600' :
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
                className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 px-6 py-3"
              >
                Chơi lại
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3"
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
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header với Score và Streak */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                {revealScoreAtEnd ? (
                  <div className="text-sm text-slate-600">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                      <span>Ẩn điểm tới cuối bài</span>
                    </div>
                  </div>
                ) : (
                  <>
                <div className="flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Điểm số</div>
                        <div className="text-2xl font-bold text-pink-600">{score}</div>
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
                  </>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600 mb-1">Câu hỏi</div>
                <div className="text-xl font-bold text-slate-900">
                  {currentQuestion + 1} / {quiz.length}
                </div>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 px-3 py-1 text-sm"
                    onClick={() => setImportOpen(true)}
                  >
                    Thêm câu hỏi
                  </Button>
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
              className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg"
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
          <Card className="p-6 md:p-8 bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-4">
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
                const showFeedback = selectedAnswer !== null && !revealScoreAtEnd;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-4 rounded-xl transition-all relative overflow-hidden ${
                      showFeedback && isCorrect
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                        : showFeedback && isWrong
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                        : isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      {showFeedback && isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                      )}
                      {showFeedback && isWrong && (
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
              {selectedAnswer !== null && !revealScoreAtEnd && (
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
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-6 text-lg font-bold shadow-lg shadow-pink-500/30"
                  size="lg"
                >
                  {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo →'}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
      <CuteBackground />
      {/* Import Overlay (simple dialog) */}
      <div className={`${importOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setImportOpen(false)} />
          <Card className="relative z-10 w-full max-w-3xl p-6 bg-white border-2 border-pink-200">
            <h3 className="text-xl font-bold mb-2">Thêm câu hỏi theo mẫu</h3>
            <p className="text-sm text-slate-600 mb-4">
              Dán tối đa 50 câu/lần. Mẫu (số đáp án tùy ý: A., B., C., D., E., ...):
              <br />
              (198) According to Vietnamese law, real property includes (...)
              <br />
              A. Motorbike
              <br />
              B. Chicken
              <br />
              C. Horse
              <br />
              D. Property attached securely to land
              <br />
              ✅ Đáp án: D
            </p>
            <div className="mb-3">
              <label className="text-sm font-semibold text-slate-700 mb-1 block">Chế độ</label>
              <div className="flex gap-3">
                <button
                  className={`px-3 py-1 rounded border ${importMode === 'replace' ? 'bg-orange-500 text-white border-orange-600' : 'border-slate-300'}`}
                  onClick={() => setImportMode('replace')}
                >
                  Thay thế toàn bộ
                </button>
                <button
                  className={`px-3 py-1 rounded border ${importMode === 'append' ? 'bg-orange-500 text-white border-orange-600' : 'border-slate-300'}`}
                  onClick={() => setImportMode('append')}
                >
                  Thêm vào danh sách
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-56 p-3 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-sm"
              placeholder="(198) According to Vietnamese law, real property includes (...)\nA. Motorbike\nB. Chicken\nC. Horse\nD. Property attached securely to land\n✅ Đáp án: D"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            {importError && <div className="text-red-600 text-sm mt-2">{importError}</div>}
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="outline" className="border-2" onClick={() => setImportOpen(false)}>Hủy</Button>
              <Button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white" onClick={handleImport}>Phân tích & Lưu</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Fireworks canvas overlay component
function FireworksCanvas() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    };

    const particles: Particle[] = [];
    const colors = ['#FF6B6B', '#FFA726', '#FFD54F', '#81C784', '#4FC3F7', '#BA68C8'];

    const burst = (bx: number, by: number, count = 60) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60 + Math.random() * 20,
          color: colors[(Math.random() * colors.length) | 0],
        });
      }
    };

    // Initial bursts
    const initialBursts = 5;
    for (let i = 0; i < initialBursts; i++) {
      setTimeout(() => {
        burst(Math.random() * w, Math.random() * h * 0.6 + h * 0.2, 70);
      }, i * 400);
    }

    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.life -= 1;
        const alpha = Math.max(p.life / 80, 0);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      canvas.remove();
    };
  }, []);

  return null;
}

// Cute floating hearts background overlay
function CuteBackground() {
  const [viewportHeight, setViewportHeight] = useState<number>(900);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {[...Array(18)].map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 6 + Math.random() * 5;
        const size = 18 + Math.random() * 12;
        const opacity = 0.15 + Math.random() * 0.15;
        const emoji = i % 2 === 0 ? '💖' : '💕';
        return (
          <motion.div
            key={`bg-heart-${i}`}
            initial={{ y: viewportHeight + 40, x: `${left}vw`, opacity: 0 }}
            animate={{ y: -80, opacity }}
            transition={{ duration, delay, repeat: Infinity, repeatDelay: 2 }}
            className="absolute"
            style={{ fontSize: size as number }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
