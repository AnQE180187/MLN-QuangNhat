'use client';

import { motion } from 'framer-motion';
import { LessonSection } from '@/lib/mlnContent';
import { CheckCircle2, Lightbulb, Image as ImageIcon, Star } from 'lucide-react';

export function SlideSection({ section }: { section: LessonSection }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
      >
        {section.title}
      </motion.h2>

      {section.body && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-slate-700 leading-7 mb-0">{section.body}</p>
          </div>
        </motion.div>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-lg text-slate-900">Các điểm chính:</h3>
          </div>
          <ul className="space-y-2">
            {section.bullets.map((b, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-lg flex-1">{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {section.images && section.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-lg text-slate-900">Hình ảnh minh họa:</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.images.map((img, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 shadow-lg hover:shadow-xl transition-shadow group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                {img.caption && (
                  <figcaption className="text-sm text-slate-600 p-3 bg-white">
                    {img.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </motion.div>
      )}

      {section.examples && section.examples.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-lg text-slate-900">Ví dụ thực tế:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.examples.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border-2 border-orange-200 p-5 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {ex.icon && (
                    <div className="text-3xl bg-white p-2 rounded-lg shadow-sm">
                      {ex.icon}
                    </div>
                  )}
                  <div className="font-bold text-lg text-slate-900">{ex.title}</div>
                </div>
                <div className="text-slate-600 mb-3 leading-relaxed">{ex.description}</div>
                {ex.points?.length ? (
                  <ul className="space-y-2">
                    {ex.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}
