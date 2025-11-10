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
    question: 'The power or authority of a court to hear cases is called its (...).',
    options: ['Jurisdiction', 'Illegal right', 'None of all', 'Liberty right'],
    answerIndex: 0,
    explanation: 'Jurisdiction is the legal authority granted to a court to hear and decide cases.',
  },
  {
    id: 'q2',
    question: 'The common shareholder is an owner of (...).',
    options: ['Common share(s)', 'Voting preference share(s)', 'Dividend preference share(s)', 'Redeemable preference share(s)'],
    answerIndex: 0,
    explanation: 'Common shareholders hold common shares, giving them ownership interests and voting rights.',
  },
  {
    id: 'q3',
    question: 'In all cases of delegation, the delegating party is (...) under the contract.',
    options: ['Not liable', 'Partially liable', 'Fully liable', 'All answers are wrong'],
    answerIndex: 2,
    explanation: 'Delegating duties does not discharge the delegator; they remain fully liable unless a novation occurs.',
  },
  {
    id: 'q4',
    question: 'The basic relationship between government and citizen is defined by (...).',
    options: ['Judicial decisions', 'Constitutions', 'Administrative agency orders', 'Ordinances'],
    answerIndex: 1,
    explanation: 'Constitutions establish the fundamental relationship between a government and its citizens.',
  },
  {
    id: 'q5',
    question: 'Tangible personal property is property that can be seen, touched, and possessed.',
    options: ['True', 'False'],
    answerIndex: 0,
    explanation: 'By definition, tangible personal property has physical form and is perceptible by the senses.',
  },
  {
    id: 'q6',
    question: 'Contracts made by persons between 6–18 years old must always have consent of their representatives.',
    options: ['False', 'True'],
    answerIndex: 0,
    explanation: 'Minors often may enter some contracts that are voidable, so representative consent is not always required.',
  },
  {
    id: 'q7',
    question: 'A merchant seller makes an implied ___ that the goods provided are fit for ordinary purposes.',
    options: ['Warranty against infringement', 'Warranty of fitness', 'Warranty against encumbrances', 'Warranty of merchantability'],
    answerIndex: 3,
    explanation: 'The implied warranty of merchantability assures goods are fit for ordinary use when sold by merchants.',
  },
  {
    id: 'q8',
    question: 'In which case must the transferring party notify the other?',
    options: ['Delegation', 'Assignment of business contract', 'Assignment of civil contract', 'Delegation and assignment of business contract'],
    answerIndex: 3,
    explanation: 'Both delegations and business contract assignments generally require notice to the other party.',
  },
  {
    id: 'q9',
    question: 'Number of board of management members (...).',
    options: ['At least three', 'At least eleven', 'At least three but not more than eleven', 'At least three but not more than eleven unless otherwise provided by charter'],
    answerIndex: 3,
    explanation: 'Corporate charters may override the default range, so the board size follows the charter when allowed.',
  },
  {
    id: 'q10',
    question: 'Precedent applies if (...).',
    options: ['Similarities found', 'Differences found', 'No law available', 'No rules good enough'],
    answerIndex: 0,
    explanation: 'Courts apply precedent when a prior decision involves materially similar facts and legal issues.',
  },
  {
    id: 'q11',
    question: 'When a contract does not state time, it must be carried out within (...).',
    options: ['3 months', 'Unlimited time', 'A reasonable time', 'Obligated party decision'],
    answerIndex: 2,
    explanation: 'Where no time is specified, the law implies performance within a reasonable time.',
  },
  {
    id: 'q12',
    question: 'Who can call a special shareholders’ meeting?',
    options: ['A specified number of stockholders', 'The police', 'The government', 'Anyone'],
    answerIndex: 0,
    explanation: 'Corporate statutes allow a defined portion of shareholders to demand a special meeting.',
  },
  {
    id: 'q13',
    question: 'A trademark gives the owner the (...).',
    options: ['Exclusive duty', 'Exclusive right', 'Inclusive duty', 'Inclusive right'],
    answerIndex: 1,
    explanation: 'Trademarks confer exclusive rights to use the mark in commerce for the covered goods or services.',
  },
  {
    id: 'q14',
    question: 'To determine if personal property becomes real estate:',
    options: ['(i) How securely attached', '(ii) Intention of installer', 'Both (i) and (ii)', 'Irrelevant'],
    answerIndex: 2,
    explanation: 'Both the method of annexation and the installer’s intent indicate whether an item becomes a fixture.',
  },
  {
    id: 'q15',
    question: 'Sale of goods ≥ $500 must be (...).',
    options: ['In writing', 'Oral evidence allowed', 'Under seal', 'Under signature'],
    answerIndex: 0,
    explanation: 'The UCC Statute of Frauds requires a writing for sales of goods priced at $500 or more.',
  },
  {
    id: 'q16',
    question: 'The Supreme Court has original jurisdiction over cases involving (...).',
    options: ['Any kind', 'Ambassadors, public ministers, consuls, and states as parties', 'Special matters only', 'Ambassadors only'],
    answerIndex: 1,
    explanation: 'The U.S. Constitution grants original jurisdiction in disputes involving diplomats and states.',
  },
  {
    id: 'q17',
    question: 'A director is held personally liable when (...).',
    options: ['Loss caused by negligence or breach of good faith', 'Loss caused by external factors', 'Loss caused by best-interest action', 'Exercised due diligence'],
    answerIndex: 0,
    explanation: 'Directors face personal liability if their negligence or bad faith causes corporate losses.',
  },
  {
    id: 'q18',
    question: 'Ethical responsibilities often (...) legal requirements.',
    options: ['Extend beyond', 'Restricted by', 'Equal to', 'Wrong'],
    answerIndex: 0,
    explanation: 'Ethical duties typically go beyond the minimum standards set by law.',
  },
  {
    id: 'q19',
    question: 'If an organization is aware of a problem and the public is not, it should (...).',
    options: ['Delete it', 'Communicate and guide the public', 'Both right', 'Both wrong'],
    answerIndex: 1,
    explanation: 'Ethical crisis management calls for transparent communication and guidance for stakeholders.',
  },
  {
    id: 'q20',
    question: 'A person who initially forms a corporation is (...).',
    options: ['Stockholder', 'Promoter', 'Incorporator', 'Director'],
    answerIndex: 2,
    explanation: 'Incorporators sign and file the charter documents that create the corporation.',
  },
  {
    id: 'q21',
    question: 'A description or sample made part of the sales contract creates (...).',
    options: ['Implied warranty', 'Personal assurance', 'Express warranty', 'Full warranty'],
    answerIndex: 2,
    explanation: 'Descriptions or samples incorporated into the bargain form an express warranty.',
  },
  {
    id: 'q22',
    question: 'If contract time is not stated, performance must occur within (...).',
    options: ['Reasonable time', 'Time fixed by party', 'Anytime', 'Time fixed by court'],
    answerIndex: 0,
    explanation: 'Courts infer a reasonable time for performance when none is specified by the parties.',
  },
  {
    id: 'q23',
    question: 'Until an offeror makes an offer known to an offeree, it cannot create (...).',
    options: ['Binding offer', 'Terminated contract', 'Binding contract', 'Acceptance'],
    answerIndex: 2,
    explanation: 'Communication of the offer is necessary before a binding contract can form.',
  },
  {
    id: 'q24',
    question: 'Corporate existence is ignored when (...).',
    options: ['Minor defect', 'Organized in another state', 'Filing not required', 'Serious defects invalidate formation'],
    answerIndex: 3,
    explanation: 'Courts pierce the corporate veil when serious formation defects justify disregarding the entity.',
  },
  {
    id: 'q25',
    question: 'Connecting stakeholder management and outcomes is the (...) approach.',
    options: ['Descriptive', 'Normative', 'Instrumental', 'Strict'],
    answerIndex: 2,
    explanation: 'The instrumental approach examines how stakeholder management affects organizational outcomes.',
  },
  {
    id: 'q26',
    question: 'Courts expanded doctrine called (...).',
    options: ['Fault', 'Strict liability', 'Duty of care', 'Interception'],
    answerIndex: 1,
    explanation: 'Modern tort law has broadened strict liability for defective or abnormally dangerous products.',
  },
  {
    id: 'q27',
    question: 'A founding shareholder signs the first charter.',
    options: ['True', 'False'],
    answerIndex: 0,
    explanation: 'Initial or founding shareholders sign the charter to establish the corporation.',
  },
  {
    id: 'q28',
    question: 'Latest timeframe for annual general meeting of shareholders (GMS)?',
    options: ['6 months', '1 month', '4 months', '5 months'],
    answerIndex: 2,
    explanation: 'Corporate law typically requires the annual GMS within four months after fiscal year end.',
  },
  {
    id: 'q29',
    question: 'Carbon footprint belongs to ___ impacts in the triple bottom line (TBL).',
    options: ['Economic', 'Social', 'None', 'Environmental'],
    answerIndex: 3,
    explanation: 'Carbon footprint measures environmental impact within the TBL framework.',
  },
  {
    id: 'q30',
    question: 'A tort is (...).',
    options: ['Always negligent', 'Prosecuted by district attorney', 'Civil wrong for which damages may be recovered', 'Failure to exercise reasonable care'],
    answerIndex: 2,
    explanation: 'A tort is a civil wrong remediable by damages, encompassing negligence and other wrongs.',
  },
  {
    id: 'q31',
    question: 'The offer must be (...).',
    options: ['Stable', 'Bought', 'Definite', 'High'],
    answerIndex: 2,
    explanation: 'Contract offers must be definite enough that the parties’ obligations are clear.',
  },
  {
    id: 'q32',
    question: '“This is a good engine” is (...).',
    options: ['Seller’s opinion', 'Express warranty', 'Implied warranty', 'Full warranty'],
    answerIndex: 0,
    explanation: 'Statements of puffery like “good engine” are opinions that do not create warranties.',
  },
  {
    id: 'q33',
    question: 'People forming a corporation are called (...).',
    options: ['Incorporators', 'Judge', 'Prosecutor', 'Policeman'],
    answerIndex: 0,
    explanation: 'Those who execute and file incorporation documents are known as incorporators.',
  },
  {
    id: 'q34',
    question: 'Common stockholders have the right to (...).',
    options: ['Control operations', 'Vote for board of directors', 'Control appointments', 'Control asset distribution'],
    answerIndex: 1,
    explanation: 'Common stockholders typically exercise governance through voting for directors.',
  },
  {
    id: 'q35',
    question: 'Dividend distribution is decided by (...).',
    options: ['Board of management', 'Inspection committee', 'General meeting of shareholders', 'Legal representative'],
    answerIndex: 2,
    explanation: 'The general meeting of shareholders approves dividend declarations.',
  },
  {
    id: 'q36',
    question: 'A contract written not orally is a (...).',
    options: ['Executed', 'Executory', 'Written contract', 'Oral contract'],
    answerIndex: 2,
    explanation: 'Contracts memorialized in writing are classified simply as written contracts.',
  },
  {
    id: 'q37',
    question: 'If price is fixed later by a third party, is the contract binding?',
    options: ['Yes', 'No'],
    answerIndex: 0,
    explanation: 'Parties may agree to let a third party set price later, and such contracts remain binding.',
  },
  {
    id: 'q38',
    question: 'Powers to do acts reasonably necessary are called (...).',
    options: ['Implied powers', 'Normal powers', 'Restricted powers', 'Limited powers'],
    answerIndex: 0,
    explanation: 'Implied powers allow agents or corporations to act in ways reasonably necessary to carry out express powers.',
  },
  {
    id: 'q39',
    question: 'A certificate is written evidence of (...) of stock.',
    options: ['Ownership', 'Offer', 'Acceptance', 'Option'],
    answerIndex: 0,
    explanation: 'A stock certificate documents ownership of shares in a corporation.',
  },
  {
    id: 'q40',
    question: 'Common stock entitles the owner (...).',
    options: ['To vote', 'To have special preference', 'To have no rights'],
    answerIndex: 0,
    explanation: 'Common stockholders usually possess voting rights on corporate governance matters.',
  },
  {
    id: 'q41',
    question: 'A business where members buy stocks and still are unlimitedly liable is (...).',
    options: ['Joint-stock company', 'Joint venture', 'LLC', 'General partnership'],
    answerIndex: 0,
    explanation: 'In joint-stock companies, owners hold shares but may retain partnership-style liability.',
  },
  {
    id: 'q42',
    question: 'A seller is liable to compensate a buyer if (...).',
    options: ['Damage occurs anytime', 'There’s a defect', 'Damage from defect during warranty period', 'Damage from defect anytime'],
    answerIndex: 2,
    explanation: 'Warranty law obligates sellers when defects cause loss during the promised warranty period.',
  },
  {
    id: 'q43',
    question: '“You’ll not be sorry if you buy this car” means (...).',
    options: ['No warranty exists', 'Two warranties exist', 'One warranty exists'],
    answerIndex: 0,
    explanation: 'This puffery is opinion, so no express warranty arises.',
  },
  {
    id: 'q44',
    question: '“Pizza contains one pound of cheese” is (...) warranty.',
    options: ['Express', 'Normal', 'Implied', 'Special'],
    answerIndex: 0,
    explanation: 'Specific factual statements about a product create express warranties.',
  },
  {
    id: 'q45',
    question: 'Can an offer be definite without price?',
    options: ['Yes – market or third-party determines', 'No, must include price'],
    answerIndex: 0,
    explanation: 'If the parties reference market rates or third-party determinations, price need not be fixed initially.',
  },
  {
    id: 'q46',
    question: 'Which statement is NOT correct?',
    options: ['Advertisement can be offer if clear', 'All ads and displays are invitations', 'Invitation to treat invites offer', 'Invitation to treat not binding'],
    answerIndex: 1,
    explanation: 'Not all advertisements are mere invitations; some can be offers, so saying all are invitations is incorrect.',
  },
  {
    id: 'q47',
    question: 'A contract where all parties promise entire performance is (...).',
    options: ['Joint contract', 'Several contract', 'Joint and several', 'All choices'],
    answerIndex: 0,
    explanation: 'In a joint contract the parties jointly promise the entire performance obligation.',
  },
  {
    id: 'q48',
    question: 'A legal entity is liable if a member causes damage (...).',
    options: ['During employment', 'During assigned work', 'To customer'],
    answerIndex: 1,
    explanation: 'Entities face vicarious liability for acts performed within the scope of assigned work.',
  },
  {
    id: 'q49',
    question: 'If Dad buys insurance paying you when he dies, you are (...).',
    options: ['Creditor beneficiary', 'Donee beneficiary', 'Donor beneficiary', 'Incidental beneficiary'],
    answerIndex: 1,
    explanation: 'The named person receiving life insurance proceeds as a gift is a donee beneficiary.',
  },
  {
    id: 'q50',
    question: 'Novation means (...).',
    options: ['Substituting a new party by mutual agreement', 'Transfer of rights only', 'Transfer of duties only', 'Original obligor remains liable'],
    answerIndex: 0,
    explanation: 'A novation substitutes a new obligor and releases the original party by agreement.',
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
