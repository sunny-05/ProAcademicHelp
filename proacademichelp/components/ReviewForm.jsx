// components/ReviewForm.jsx
"use client";

import { useState } from "react";

export default function ReviewForm({ onSubmitted }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Honeypot to block bots
  const [website, setWebsite] = useState("");

  const reset = () => {
    setName(""); setEmail(""); setRating(5); setSubject(""); setText("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (website) return; // bot

    if (!name.trim() || !text.trim() || rating < 1) {
      setMsg({ type: "error", text: "Please fill name, rating and your review." });
      return;
    }
    if (text.trim().length < 10) {
      setMsg({ type: "error", text: "Your review is a bit short—add a few more words." });
      return;
    }

    setLoading(true);
    const payload = {
      name: name.trim(),
      email: email.trim() || undefined,
      rating: Number(rating),
      subject: subject.trim() || undefined,
      comment: text.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text().catch(() => "");
        throw new Error(err || "Failed to submit review");
      }

      const json = await res.json().catch(() => ({}));
      const saved = json?.review || json || payload;

      setMsg({ type: "success", text: "Thanks! Your review has been submitted." });
      reset();
      onSubmitted?.(saved);
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success/Error */}
      {msg && (
        <div
          className={`rounded-xl px-4 py-2 text-sm ${
            msg.type === "success"
              ? "bg-emerald-500/10 text-emerald-800 border border-emerald-500/30"
              : "bg-red-500/10 text-red-800 border border-red-500/30"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Name *</label>
          <input
            className="w-full rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Rating *</label>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                aria-label={`${n} star`}
                className={`p-1 rounded hover:scale-105 transition ${
                  rating >= n ? "text-amber-400" : "text-slate-400"
                }`}
                title={`${n} star`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={rating >= n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 17.27l-5.4 3.25 1.64-6.14L3 9.75l6.2-.52L12 3.5l2.8 5.73 6.2.52-5.24 4.63 1.64 6.14z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Subject</label>
          <input
            className="w-full rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="(optional) e.g., Economics essay"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-700 mb-1">Your Review *</label>
        <textarea
          className="w-full min-h-[120px] rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience…"
          required
        />
      </div>

      {/* Honeypot (hidden) */}
      <div className="hidden">
        <label>
          Website
          <input value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-white/60 bg-white/80 px-4 py-2 text-slate-900 hover:bg-white"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
