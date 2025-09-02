// app/demo/how-it-works/page.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 'step1',
    title: 'Submit request',
    desc: 'Fill the quick form or upload your brief. We review files for clarity within minutes.',
    image: '/process/submit.jpg',
  },
  {
    id: 'step2',
    title: 'Plan & quote',
    desc: 'You receive a clear timeline, milestones, and a 40% off first-order quote.',
    image: '/process/plan.jpg',
  },
  {
    id: 'step3',
    title: 'Build & review',
    desc: 'We share progress checkpoints. You comment; we refine fast until it’s perfect.',
    image: '/process/build.jpg',
  },
  {
    id: 'step4',
    title: 'Deliver & support',
    desc: 'Final files delivered securely. Post-delivery support included.',
    image: '/process/deliver.jpg',
  },
];

export default function HowItWorksDemo() {
  return (
    <section className="container-max py-10 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">How it works — Demo</h1>
        <p className="text-gray-700">A quick walkthrough of the ProAcedmicHelp flow.</p>
      </header>

      <ol className="space-y-6">
        {steps.map((s, i) => (
          <li key={s.id} id={s.id}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white"
            >
              <div
                className="h-52 md:h-64 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundColor: '#f6f8fa',
                }}
                aria-hidden
              />
              <div className="p-5 md:p-6">
                <div className="inline-flex items-center rounded-full bg-teal-600 text-white px-3 py-1 text-xs font-bold ring-1 ring-white/30">
                  {`Step ${i + 1}`}
                </div>
                <h2 className="mt-3 text-xl md:text-2xl font-extrabold text-gray-900">{s.title}</h2>
                <p className="text-gray-700 mt-1">{s.desc}</p>

                {/* Tiny dummy “action area” to illustrate */}
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <button className="rounded-xl bg-teal-600 text-white px-4 py-2 font-semibold hover:bg-teal-700 border border-teal-700/30">
                    Try sample action
                  </button>
                  <button className="rounded-xl bg-slate-100 text-gray-900 px-4 py-2 border border-slate-200">
                    See another example
                  </button>
                </div>
              </div>
            </motion.div>
          </li>
        ))}
      </ol>

      <div className="flex items-center justify-center gap-3">
        <Link
          href="/#hero"
          className="rounded-xl bg-teal-600 text-white px-5 py-2 font-semibold hover:bg-teal-700 border border-teal-700/30"
        >
          Start your request
        </Link>
        <Link
          href="/"
          className="rounded-xl bg-white text-gray-900 px-5 py-2 border border-slate-200"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
