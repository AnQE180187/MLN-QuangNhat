'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl font-montserrat font-bold text-slate-900 mb-6"
            >
              Các Quan Hệ Lợi Ích Kinh Tế Ở Việt Nam
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-slate-600 mb-8"
            >
              Khám phá vai trò của lợi ích kinh tế và cách Nhà nước điều tiết hài hòa
              lợi ích trong nền kinh tế thị trường định hướng XHCN.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
              >
                <Link href="/content">Bắt đầu học</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6 text-lg"
              >
                <Link href="/quiz">Làm trắc nghiệm</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute right-0 top-0 h-full w-full transform opacity-10"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="500" cy="500" r="450" stroke="#F97316" strokeWidth="100" />
            <circle cx="500" cy="500" r="300" stroke="#F97316" strokeWidth="100" />
            <circle cx="500" cy="500" r="150" stroke="#F97316" strokeWidth="100" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Lý thuyết Card */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Lý thuyết</h3>
                <p className="text-slate-600 mb-4">
                  Tài liệu học tập được trình bày dưới dạng slide tương tác, giúp dễ
                  hiểu và ghi nhớ.
                </p>
                <Button asChild variant="ghost" className="text-orange-500">
                  <Link href="/content">Xem nội dung →</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Trắc nghiệm Card */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold mb-2">Trắc nghiệm</h3>
                <p className="text-slate-600 mb-4">
                  Kiểm tra kiến thức với bộ câu hỏi trắc nghiệm được thiết kế theo
                  chuẩn đề thi.
                </p>
                <Button asChild variant="ghost" className="text-orange-500">
                  <Link href="/quiz">Làm bài test →</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Chatbot Card */}
            <motion.div variants={fadeIn}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">Chatbot học tập</h3>
                <p className="text-slate-600 mb-4">
                  Đặt câu hỏi và nhận câu trả lời ngay lập tức từ trợ lý AI thông
                  minh.
                </p>
                <Button asChild variant="ghost" className="text-orange-500">
                  <Link href="/chat">Trò chuyện →</Link>
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
