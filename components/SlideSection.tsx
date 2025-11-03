'use client';

import { motion } from 'framer-motion';
import { LessonSection } from '@/lib/mlnContent';

export function SlideSection({ section }: { section: LessonSection }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-xl shadow-sm border p-6 md:p-8"
    >
      <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-slate-900 mb-4">
        {section.title}
      </h2>
      {section.body && (
        <p className="text-slate-700 leading-7 mb-4">{section.body}</p>
      )}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          {section.bullets.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      )}
      {section.images && section.images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {section.images.map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-lg border bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="w-full h-48 object-cover" />
              {img.caption && (
                <figcaption className="text-sm text-slate-600 p-3">{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {section.examples && section.examples.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.examples.map((ex, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                {ex.icon && <span className="text-xl">{ex.icon}</span>}
                <div className="font-medium">{ex.title}</div>
              </div>
              <div className="text-slate-600 text-sm mb-2">{ex.description}</div>
              {ex.points?.length ? (
                <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                  {ex.points.map((p, idx) => (<li key={idx}>{p}</li>))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}
