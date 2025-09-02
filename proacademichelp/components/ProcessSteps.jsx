// components/ProcessSteps.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 'step1',
    title: 'Submit request',
    desc: 'Share scope, files, and deadline.',
    image: '/process/submit.jpg',
    href: '/demo/how-it-works#step1',
  },
  {
    id: 'step2',
    title: 'Plan & quote',
    desc: 'We confirm timeline & pricing clearly.',
    image: '/process/plan.jpg',
    href: '/demo/how-it-works#step2',
  },
  {
    id: 'step3',
    title: 'Build & review',
    desc: 'Iterate fast with checkpoints.',
    image: '/process/build.jpg',
    href: '/demo/how-it-works#step3',
  },
  {
    id: 'step4',
    title: 'Deliver & support',
    desc: 'Final handover + aftercare.',
    image: '/process/deliver.jpg',
    href: '/demo/how-it-works#step4',
  },
];

export default function ProcessSteps() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {steps.map((s, i) => (
        <Link key={s.id} href={s.href} aria-label={`${s.title} — view demo`}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
            className="relative h-56 md:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-white group"
          >
            {/* Background image with gentle zoom on hover */}
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundColor: '#f6f8fa', // soft fallback if image missing
              }}
            />
            {/* Darken overlay for text legibility */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/25 transition-colors" />
            {/* Step chip */}
            <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
              {s.id.replace('step','Step ')}
            </div>
            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
              <h3 className="text-lg font-extrabold leading-tight">{s.title}</h3>
              <p className="text-sm text-white/90">{s.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/95">
                View demo
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
