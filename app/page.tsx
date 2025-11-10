'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BookOpen, 
  FileText, 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Target,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const chapters = [
    { 
      icon: BookOpen, 
      title: 'Khái niệm và vai trò', 
      description: 'Tìm hiểu về lợi ích kinh tế và vai trò động lực của nó trong nền kinh tế thị trường' 
    },
    { 
      icon: TrendingUp, 
      title: 'Quan hệ lợi ích', 
      description: 'Phân tích các quan hệ lợi ích cơ bản giữa người lao động, doanh nghiệp và Nhà nước' 
    },
    { 
      icon: Target, 
      title: 'Vai trò Nhà nước', 
      description: 'Tìm hiểu cách Nhà nước điều tiết và hài hòa các quan hệ lợi ích kinh tế' 
    },
    { 
      icon: Brain, 
      title: 'Liên hệ thực tiễn', 
      description: 'Ví dụ từ các doanh nghiệp Việt Nam và các giải pháp phát triển bền vững' 
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Lý thuyết',
      description: 'Tài liệu học tập được trình bày dưới dạng slide tương tác, giúp dễ hiểu và ghi nhớ kiến thức một cách hiệu quả.',
      href: '/content',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: 'Trắc nghiệm',
      description: 'Kiểm tra kiến thức với bộ câu hỏi trắc nghiệm được thiết kế theo chuẩn đề thi, giúp bạn chuẩn bị tốt nhất.',
      href: '/quiz',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: MessageSquare,
      title: 'Chatbot học tập',
      description: 'Đặt câu hỏi và nhận câu trả lời ngay lập tức từ trợ lý AI thông minh, hỗ trợ 24/7 cho việc học tập của bạn.',
      href: '/chat',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const benefits = [
    { icon: Zap, text: 'Học tập nhanh chóng và hiệu quả' },
    { icon: Target, text: 'Nội dung được biên soạn theo chuẩn' },
    { icon: Lightbulb, text: 'Giải thích dễ hiểu, dễ nhớ' },
    { icon: Star, text: 'Tương tác và thú vị' },
    { icon: TrendingUp, text: 'Theo dõi tiến độ học tập' },
    { icon: GraduationCap, text: 'Chuẩn bị tốt cho kỳ thi' },
  ];

  const courseTopics = [
    'Khái niệm và bản chất của lợi ích kinh tế',
    'Vai trò của lợi ích kinh tế trong nền kinh tế thị trường',
    'Các loại lợi ích kinh tế ở Việt Nam',
    'Cơ chế điều tiết hài hòa lợi ích của Nhà nước',
    'Mối quan hệ giữa lợi ích cá nhân và lợi ích xã hội',
    'Giải pháp phát triển bền vững trong điều tiết lợi ích',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-orange-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-200 rounded-full text-orange-600 font-medium text-sm">
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                Khóa học Law102 - Đại học FPT Quy Nhơn
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight"
            >
              Các Quan Hệ Lợi Ích<br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Kinh Tế Ở Việt Nam
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed"
            >
              Khám phá vai trò của lợi ích kinh tế và cách Nhà nước điều tiết hài hòa
              lợi ích trong nền kinh tế thị trường định hướng XHCN
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="text-lg text-slate-500 mb-10 max-w-xl mx-auto"
            >
              Học tập thông minh với công nghệ AI, tài liệu tương tác và hệ thống kiểm tra tiên tiến
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                >
                  <Link href="/content" className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Bắt đầu học
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                {/* Pulse glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-orange-500 rounded-lg blur-lg -z-10"
                />
                <Button
                  asChild
                  size="lg"
                  className="relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-2 border-orange-400/50 px-10 py-6 text-lg font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 z-10"
                >
                  <Link href="/quiz" className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FileText className="w-5 h-5" />
                    </motion.div>
                    Làm trắc nghiệm
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Chapters Overview */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
            >
              {chapters.map((chapter, index) => {
                const Icon = chapter.icon;
                return (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 hover:border-orange-300 transition-all group cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-4 w-fit group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hệ thống học tập toàn diện với công nghệ tiên tiến
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-200 group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                    <Button
                      asChild
                      variant="ghost"
                      className="text-orange-500 hover:text-orange-600 p-0 group"
                    >
                      <Link href={feature.href} className="flex items-center gap-2">
                        Khám phá ngay
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 font-medium text-sm">
                  Nội dung khóa học
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Nội dung học tập
                <span className="block text-orange-400">toàn diện</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Khóa học cung cấp kiến thức đầy đủ về các quan hệ lợi ích kinh tế ở Việt Nam, 
                từ lý thuyết cơ bản đến các ứng dụng thực tế trong nền kinh tế thị trường định hướng XHCN.
              </p>
              <ul className="space-y-4">
                {courseTopics.map((topic, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg">{topic}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-3xl p-8 backdrop-blur-sm border border-orange-500/30">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Tài liệu đa dạng</div>
                      <div className="text-slate-300">Slide, PDF, Video</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">AI hỗ trợ học tập</div>
                      <div className="text-slate-300">Chatbot thông minh 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Luyện tập hiệu quả</div>
                      <div className="text-slate-300">Câu hỏi trắc nghiệm chuẩn</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Lợi ích khi học tập
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tại sao nên chọn phương pháp học tập này?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex items-start gap-4 group hover:border-orange-300 transition-all"
                >
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-700 text-lg font-medium pt-2">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn sàng bắt đầu học tập?
            </h2>
            <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
              Khám phá ngay các tính năng học tập thông minh và bắt đầu hành trình chinh phục kiến thức của bạn
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  <Link href="/content" className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Bắt đầu học ngay
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 20px 40px rgba(255, 255, 255, 0.2)",
                    "0 25px 50px rgba(255, 255, 255, 0.4)",
                    "0 20px 40px rgba(255, 255, 255, 0.2)",
                  ],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                {/* Glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-white rounded-lg blur-xl -z-10"
                />
                <Button
                  asChild
                  size="lg"
                  className="relative bg-gradient-to-r from-white via-white to-orange-50 text-orange-600 hover:from-orange-50 hover:via-white hover:to-white border-2 border-white/50 px-10 py-7 text-xl font-bold shadow-2xl shadow-white/50 hover:shadow-white/70 transition-all duration-300 z-10"
                >
                  <Link href="/quiz" className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FileText className="w-6 h-6" />
                    </motion.div>
                    <span className="font-extrabold">Làm trắc nghiệm</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
