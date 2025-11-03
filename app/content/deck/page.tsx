'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { slides as baseSlides, Slide, ContentBlock } from '@/lib/mlnContent';
import { Button } from '@/components/ui/button';

function SlideBlock({ block }: { block: ContentBlock }) {
  if (block.type === 'image') {
    const img = block.content;
    return (
      <figure className="rounded-xl overflow-hidden border bg-white/70">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.alt} className="w-full max-h-[48vh] object-cover" />
        {img.caption && <figcaption className="text-sm text-slate-600 p-3">{img.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === 'text') {
    return <p className="text-lg md:text-xl text-slate-700 leading-8">{block.content}</p>;
  }
  if (block.type === 'list') {
    return (
      <ul className="list-disc pl-6 space-y-2 text-lg text-slate-700">
        {(block.content as string[]).map((it, i) => (<li key={i}>{it}</li>))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="border-l-4 border-orange-500 pl-4 text-xl italic text-slate-800">
        {block.content}
      </blockquote>
    );
  }
  if (block.type === 'feature') {
    return (
      <div className="rounded-xl border p-4 bg-white/70">
        <div className="text-3xl mb-2">{block.icon}</div>
        <div className="font-semibold mb-1">{block.title}</div>
        <div className="text-slate-600">{block.description}</div>
      </div>
    );
  }
  return null;
}

export default function DeckPage() {
  const slides = useMemo<Slide[]>(() => baseSlides, []);
  const [idx, setIdx] = useState(0);
  const cur = slides[idx];

  const next = useCallback(() => setIdx((i) => Math.min(i + 1, slides.length - 1)), [slides.length]);
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-slate-600">Slide {idx + 1} / {slides.length}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={prev} disabled={idx === 0}>← Trước</Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={next} disabled={idx === slides.length - 1}>Tiếp →</Button>
          </div>
        </div>

        <section className="h-[78vh] md:h-[80vh] rounded-2xl border bg-white shadow-sm overflow-hidden flex">
          <div className="flex-1 p-6 md:p-10 overflow-y-auto">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 mb-3">{cur.title}</h1>
            {cur.description && (
              <p className="text-slate-600 text-lg mb-6">{cur.description}</p>
            )}

            {cur.blocks && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {cur.blocks.map((b, i) => (<SlideBlock key={i} block={b} />))}
              </div>
            )}

            {cur.content?.mainPoints && (
              <ul className="list-disc pl-6 space-y-2 text-slate-800 text-lg">
                {cur.content.mainPoints.map((p, i) => (<li key={i}>{p}</li>))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}


