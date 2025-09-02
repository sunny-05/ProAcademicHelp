// components/ServiceExamples.jsx
'use client';

import { motion } from 'framer-motion';

export default function ServiceExamples({ kind }) {
  return (
    <motion.div
      key={kind}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {kind === 'web' && <WebPreview />}
      {kind === 'assignments' && <AssignmentPreview />}
      {kind === 'design' && <DesignPreview />}
      {kind === 'dashboards' && <DashboardPreview />}
      {kind === 'upload' && <UploadPreview />}
      {kind === 'support' && <SupportPreview />}
    </motion.div>
  );
}

/* === Dummy previews === */

function WebPreview() {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 text-white px-4 py-2 text-xs font-mono">pages/index.jsx</div>
      <div className="p-4 bg-slate-50">
        <pre className="text-xs leading-5 font-mono text-slate-800">
{`export default function Home(){ 
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold">ProAcedmicHelp</h1>
      <p className="mt-2 text-slate-600">Fast assignment & web help.</p>
      <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg">Get Quote</button>
    </section>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

function AssignmentPreview() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h5 className="text-lg font-bold text-gray-900">Sample Assignment Report</h5>
      <p className="text-sm text-gray-600">Course: Web Engineering • Grade: A</p>
      <div className="mt-3 grid md:grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
          <p className="text-xs text-gray-500 uppercase">Abstract</p>
          <p className="text-sm text-gray-800 mt-1 line-clamp-3">This study evaluates Next.js SSR vs. CSR performance…</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
          <p className="text-xs text-gray-500 uppercase">Methodology</p>
          <ul className="text-sm text-gray-800 mt-1 list-disc list-inside">
            <li>Dataset collection</li><li>Benchmark suite</li><li>Analysis</li>
          </ul>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
          <p className="text-xs text-gray-500 uppercase">Conclusion</p>
          <p className="text-sm text-gray-800 mt-1">SSR yields better TTFB for content-heavy pages.</p>
        </div>
      </div>
    </div>
  );
}

function DesignPreview() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="rounded-lg border border-slate-200 overflow-hidden">
        {/* Browser-like chrome */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-100">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-gray-500">Design System — Components</span>
        </div>
        <div className="p-4 grid sm:grid-cols-2 gap-4 bg-white">
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-xs text-gray-500">Buttons</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button className="rounded-lg bg-teal-600 text-white px-3 py-1.5">Primary</button>
              <button className="rounded-lg bg-slate-100 text-gray-800 px-3 py-1.5 border">Secondary</button>
              <button className="rounded-lg text-teal-700 px-3 py-1.5 border border-teal-200">Ghost</button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-xs text-gray-500">Inputs</p>
            <input className="mt-2 w-full rounded-lg border px-3 py-2" placeholder="Your name" />
            <input className="mt-2 w-full rounded-lg border px-3 py-2" placeholder="Email" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  const bars = [72, 56, 88, 43, 65];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h5 className="text-sm font-semibold text-gray-900">KPI Overview</h5>
      <div className="grid md:grid-cols-5 gap-3 mt-3">
        {bars.map((v, i) => (
          <div key={i} className="flex flex-col-reverse h-32 rounded-lg bg-slate-50 border border-slate-200 p-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="w-full rounded-md bg-teal-500"
              aria-hidden
            />
            <p className="text-xs text-center text-gray-600 mt-1">{v}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadPreview() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <svg className="mx-auto h-10 w-10 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 16V7M8.5 10.5 12 7l3.5 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeWidth="2" />
        </svg>
        <p className="mt-2 text-sm text-gray-700">Drag & drop files here, or click to select</p>
        <button className="mt-3 rounded-lg bg-teal-600 text-white px-4 py-2">Choose file</button>
      </div>
      <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
        <li>PDF, DOCX, PPTX up to 25MB</li>
        <li>Secure, private uploads</li>
      </ul>
    </div>
  );
}

function SupportPreview() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="space-y-2">
        <div className="max-w-[80%] rounded-xl bg-slate-100 px-3 py-2 text-sm text-gray-900">
          Hi! Could you help with my Web Dev assignment due Friday?
        </div>
        <div className="ml-auto max-w-[80%] rounded-xl bg-teal-600 text-white px-3 py-2 text-sm">
          Absolutely! Share your brief, we’ll confirm timeline & a 40% off quote.
        </div>
        <div className="max-w-[80%] rounded-xl bg-slate-100 px-3 py-2 text-sm text-gray-900">
          Great — uploading files now.
        </div>
      </div>
    </div>
  );
}
