'use client';

import { ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function FullSlideSection({ id, children, className }: Props) {
  return (
    <section
      id={id}
      className={`h-[calc(100vh-4rem)] w-full flex items-center justify-center snap-start ${className ?? ''}`}
    >
      <div className="w-full max-w-7xl px-6 md:px-10">{children}</div>
    </section>
  );
}


