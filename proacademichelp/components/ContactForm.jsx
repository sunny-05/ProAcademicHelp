// components/ContactForm.jsx
'use client';
import { useRef, useState, useTransition } from 'react';

export default function ContactForm() {
  const formRef = useRef(null);
  const [state, setState] = useState({ loading: false, ok: false, error: '' });
  const [isPending] = useTransition();

  async function onSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const fd = new FormData(form);

    const name = (fd.get('name') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const subject = (fd.get('subject') || '').toString().trim();
    const message = (fd.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      setState({ loading: false, ok: false, error: 'Name, email, and message are required.' });
      return;
    }

    // Send via your existing /api/request to avoid 405s
    const body = new FormData();
    body.set('name', name);
    body.set('email', email);
    body.set('service', 'Contact');
    body.set('details', `Subject: ${subject}\n\n${message}`);

    try {
      setState({ loading: true, ok: false, error: '' });
      const res = await fetch('/api/request', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to send message');

      form?.reset();
      setState({ loading: false, ok: true, error: '' });
    } catch (err) {
      setState({ loading: false, ok: false, error: err.message || 'Something went wrong' });
    }
  }

  return (
    <div>
      <header className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Send us a message</h2>
        <p className="text-sm text-gray-600">Tell us a bit about your project or question.</p>
      </header>

      <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-700">Name *</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-gray-900 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-gray-900 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Subject</label>
          <input
            name="subject"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-gray-900 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
            placeholder="What is this about?"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Message *</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-gray-900 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/70"
            placeholder="Share a short brief…"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={state.loading || isPending}
            className="rounded-xl bg-teal-600 text-white hover:bg-teal-700 border border-teal-700/30 font-semibold px-4 py-2"
          >
            {state.loading ? 'Sending…' : 'Send message'}
          </button>
          {state.ok && <span className="text-teal-700 text-sm">Thanks! We’ll get back to you soon.</span>}
          {state.error && <span className="text-red-600 text-sm">{state.error}</span>}
        </div>
      </form>
    </div>
  );
}
