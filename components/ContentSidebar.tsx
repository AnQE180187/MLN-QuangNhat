'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { courseChapters } from '@/lib/mlnContent';
import { cn } from '@/lib/utils';

export function ContentSidebar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get('s');

  return (
    <aside className="w-full md:w-64 shrink-0 border-r bg-white/80 backdrop-blur sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <div className="text-xs uppercase text-slate-500 mb-2">Mục lục</div>
        <nav className="space-y-4">
          {courseChapters.map((ch) => (
            <div key={ch.id}>
              <div className="text-sm font-semibold text-slate-700 mb-2">{ch.title}</div>
              <ul className="space-y-1">
                {ch.sections.map((s) => {
                  const active = current ? current === s.id : false;
                  return (
                    <li key={s.id}>
                      <Link
                        href={`${pathname}?s=${s.id}`}
                        className={cn(
                          "block rounded px-2 py-1 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-600",
                          active && "bg-orange-100 text-orange-700 font-medium"
                        )}
                      >
                        {s.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
