'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ContentSidebar } from '@/components/ContentSidebar';
import { SlideSection } from '@/components/SlideSection';
import { flattenSections } from '@/lib/mlnContent';

function ContentClient() {
  const params = useSearchParams();
  const router = useRouter();
  const sections = useMemo(() => flattenSections(), []);
  const currentId = params.get('s') ?? sections[0]?.id;
  const idx = sections.findIndex((s) => s.id === currentId);
  const section = sections[Math.max(0, idx)];

  const go = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= sections.length) return;
    router.push(`?s=${sections[newIdx].id}`);
  };

  const progress = Math.round(((idx + 1) / sections.length) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto px-4 flex gap-6">
        <ContentSidebar />
        <div className="flex-1 py-6 md:py-8 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/content/slides">Xem chế độ trình chiếu →</Link>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Tiến độ: {progress}%</div>
            <div className="h-2 bg-slate-200 rounded w-1/2 md:w-1/3 overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {section && <SlideSection section={section} />}

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => go(idx - 1)}
              disabled={idx <= 0}
            >
              ← Trước
            </Button>
            <div className="text-sm text-slate-500">
              {idx + 1} / {sections.length}
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => go(idx + 1)}
              disabled={idx >= sections.length - 1}
            >
              Tiếp →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-600">Đang tải nội dung...</div>}>
      <ContentClient />
    </Suspense>
  );
}
