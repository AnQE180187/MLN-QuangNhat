'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ContentSidebar } from '@/components/ContentSidebar';
import { SlideSection } from '@/components/SlideSection';
import { flattenSections } from '@/lib/mlnContent';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Target,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

function ContentClient() {
  const params = useSearchParams();
  const router = useRouter();
  const sections = useMemo(() => flattenSections(), []);
  const currentId = params.get('s') ?? sections[0]?.id;
  const idx = sections.findIndex((s) => s.id === currentId);
  const section = sections[Math.max(0, idx)];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const go = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= sections.length) return;
    router.push(`?s=${sections[newIdx].id}`);
    // Mark as completed when navigating forward
    if (newIdx > idx && section) {
      setCompletedSections(prev => new Set([...prev, section.id]));
    }
  };

  const progress = Math.round(((idx + 1) / sections.length) * 100);
  const completedCount = completedSections.size;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden sticky top-20 z-40 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2"
          >
            <Menu className="w-5 h-5" />
            <span className="font-semibold">Mục lục</span>
          </Button>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{completedCount} đã học</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-20 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-4 flex items-center justify-between border-b">
                <h3 className="font-bold text-lg">Mục lục</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <ContentSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-lg">Mục lục</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>{completedCount} / {sections.length} đã học</span>
                  </div>
                </div>
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                  <ContentSidebar />
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header Stats */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Tiến độ</div>
                    <div className="text-2xl font-bold">{progress}%</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Đã hoàn thành</div>
                    <div className="text-2xl font-bold">{completedCount} / {sections.length}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Tổng số bài</div>
                    <div className="text-2xl font-bold">{sections.length}</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Progress Bar */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold text-slate-700">Tiến độ học tập</span>
                </div>
                <span className="text-sm font-bold text-orange-600">{idx + 1} / {sections.length}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 rounded-full shadow-lg relative overflow-hidden"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg"
              >
                <Link href="/content/slides" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Xem chế độ trình chiếu
                </Link>
              </Button>
            </div>

            {/* Content Section */}
            <AnimatePresence mode="wait">
              {section && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-3">
                            <BookOpen className="w-4 h-4" />
                            Bài {idx + 1}
                          </div>
                          {completedSections.has(section.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold ml-2"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Đã học
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <SlideSection section={section} />
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => go(idx - 1)}
                  disabled={idx <= 0}
                  className="flex items-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Bài trước</span>
                </Button>

                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-orange-600">
                    {idx + 1} / {sections.length}
                  </span>
                </div>

                <Button
                  onClick={() => {
                    if (section) {
                      setCompletedSections(prev => new Set([...prev, section.id]));
                    }
                    go(idx + 1);
                  }}
                  disabled={idx >= sections.length - 1}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Bài tiếp</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Đang tải nội dung...</p>
        </motion.div>
      </div>
    }>
      <ContentClient />
    </Suspense>
  );
}
