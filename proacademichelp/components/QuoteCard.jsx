// components/QuoteCard.jsx
'use client';
import { useState } from 'react';

export default function QuoteCard() {
  const [state, setState] = useState({ loading: false, ok: false, error: '' });

  async function onSubmit(e) {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      formData.set('source', 'home-hero');
      formData.set('estimatedOffPercent', '40');

      const res = await fetch('/api/requests', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed to submit request');
      await res.json();
      setState({ loading: false, ok: true, error: '' });
      form?.reset();
    } catch (err) {
      setState({ loading: false, ok: false, error: err.message || 'Error' });
    }
  }

  return (
    <aside className="w-full max-w-md rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-xl p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">40% Off</p>
      <h3 className="mt-1 text-xl font-extrabold">Get instant Assignment Help — consult with expert</h3>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input name="name" placeholder="Name" required className="input" />
        <input type="tel" name="phone" placeholder="Phone Number" className="input" />
        <input type="email" name="email" placeholder="Email" required className="input" />

        <select name="service" className="input">
          <option>Web Development</option>
          <option>Assignment/Report</option>
          <option>Design/UX</option>
          <option>Other</option>
        </select>

        <input type="date" name="deadline" className="input" />
        <textarea name="details" rows={3} placeholder="Tell us briefly..." className="input" />

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="agree" className="mt-1" />
          <span>I agree to the terms & conditions</span>
        </label>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estimated price: <b>−40%</b></span>
          <button disabled={state.loading} className="btn-primary">
            {state.loading ? 'Submitting…' : 'Get Quote'}
          </button>
        </div>

        {state.ok && <p className="text-green-600 text-sm">Thanks! We’ll reach out shortly.</p>}
        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
      </form>
    </aside>
  );
}
