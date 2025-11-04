'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { courseChapters } from '@/lib/mlnContent';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

export function ContentSidebar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get('s');

  return (
    <nav className="p-4 space-y-6">
      {courseChapters.map((ch, chapterIdx) => (
        <motion.div
          key={ch.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: chapterIdx * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3 px-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <h4 className="text-sm font-bold text-slate-900">{ch.title}</h4>
          </div>
          <ul className="space-y-1">
            {ch.sections.map((s, sectionIdx) => {
              const active = current ? current === s.id : false;
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: chapterIdx * 0.1 + sectionIdx * 0.05 }}
                >
                  <Link
                    href={`${pathname}?s=${s.id}`}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all group",
                      active
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg font-semibold"
                        : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                    )}
                  >
                    {active ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100" />
                    )}
                    <span className="flex-1">{s.title}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </nav>
  );
}
