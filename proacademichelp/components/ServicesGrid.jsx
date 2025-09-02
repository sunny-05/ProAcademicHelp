// components/ServicesGrid.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceExamples from '@/components/ServiceExamples';

const services = [
  { id: 'web',         title: 'Web Development',        desc: 'Next.js apps, APIs, dashboards, payments.', image: '/services/web.jpg' },
  { id: 'assignments', title: 'Assignments & Reports',  desc: 'Structured, cited, and well-formatted deliverables.', image: '/services/assignments.jpg' },
  { id: 'design',      title: 'Design & UX',            desc: 'Clean UI kits, components, and responsive layouts.', image: '/services/design.jpg' },
  { id: 'dashboards',  title: 'Dashboards',             desc: 'Data + visuals with auth, roles, exports.', image: '/services/dashboards.jpg' },
  { id: 'upload',      title: 'File Upload & Handover', desc: 'Secure uploads and organized delivery.', image: '/services/upload.jpg' },
  { id: 'support',     title: 'Fast Support',           desc: 'Clear comms, quick iterations, A+ outcomes.', image: '/services/support.jpg' },
];

export default function ServicesGrid() {
  const [openId, setOpenId] = useState(null);

  return (
    <>
      {/* FULL-WIDTH, NO-HORIZONTAL-SCROLL WRAPPER */}
      <div className="w-full max-w-7xl mx-auto px-4 overflow-x-hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setOpenId(s.id)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 18px 40px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-white group text-left focus:outline-none focus:ring-2 focus:ring-teal-500/70 isolate"
              aria-haspopup="dialog"
              aria-controls="service-examples-modal"
            >
              {/* Background image (clipped by overflow-hidden on the button) */}
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundColor: '#f5f7f9',
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
              {/* Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
                Explore
              </div>
              {/* Text */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
                <h3 className="text-lg font-extrabold leading-tight">{s.title}</h3>
                <p className="text-sm text-white/90">{s.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/95">
                  View example
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openId && (
          <motion.div
            id="service-examples-modal"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ y: 24, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 p-4 md:p-5 border-b border-slate-200">
                <div>
                  <h4 className="text-lg font-extrabold text-gray-900">
                    {services.find((x) => x.id === openId)?.title || 'Example'}
                  </h4>
                  <p className="text-sm text-gray-600">Here’s a quick dummy preview of the kind of work you’ll get.</p>
                </div>
                <button
                  onClick={() => setOpenId(null)}
                  className="rounded-lg p-2 hover:bg-slate-100 text-slate-600"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="p-4 md:p-6">
                <ServiceExamples kind={openId} />
              </div>

              <div className="flex items-center justify-between gap-3 p-4 md:p-5 border-t border-slate-200">
                <p className="text-xs text-gray-500">
                  Like what you see? Start with a quick quote — first order{' '}
                  <span className="font-semibold text-teal-700">-40%</span>.
                </p>
                <a
                  href="/#hero"
                  className="inline-flex items-center rounded-xl bg-teal-600 text-white hover:bg-teal-700 border border-teal-700/30 font-semibold px-4 py-2"
                >
                  Get Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
