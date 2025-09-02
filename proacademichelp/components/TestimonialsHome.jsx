// components/TestimonialsHome.jsx
"use client";

import { useEffect, useState } from "react";
import ReviewForm from "@/components/ReviewForm";

/* tiny star icon */
function Star({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24"
      className={filled ? "text-amber-400" : "text-amber-300"}
      fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.6}>
      <path d="M12 17.27l-5.4 3.25 1.64-6.14L3 9.75l6.2-.52L12 3.5l2.8 5.73 6.2.52-5.24 4.63 1.64 6.14z" />
    </svg>
  );
}

export default function TestimonialsHome() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // popup + toast
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const data = await res.json();
        const arr = Array.isArray(data) ? data : (data?.reviews ?? []);
        const normalized = arr.map((r) => ({
          name: r.name ?? r.author ?? "Anonymous",
          rating: Number(r.rating ?? r.stars ?? 0),
          text: r.comment ?? r.review ?? r.message ?? "",
          date: r.createdAt ?? r.date ?? r.time ?? null,
          subject: r.subject ?? r.title ?? "",
        }));
        if (alive) setItems(normalized.slice(0, 6));
      } catch {
        // ignore
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  function handleSubmitted(newReview) {
    const normalized = {
      name: newReview.name ?? "Anonymous",
      rating: Number(newReview.rating ?? 0),
      text: newReview.comment ?? newReview.text ?? "",
      subject: newReview.subject ?? "",
      date: newReview.createdAt ?? newReview.date ?? new Date().toISOString(),
    };
    setItems((prev) => [normalized, ...prev].slice(0, 6));
    setOpen(false);
    setToast("Thanks! Your review was added.");
    setTimeout(() => setToast(null), 3500);
  }

  /* --- UI blocks --- */

  const SkeletonGrid = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-sm p-5 animate-pulse">
          <div className="h-4 w-28 bg-teal-200/70 rounded" />
          <div className="mt-2 h-3 w-full bg-teal-200/60 rounded" />
          <div className="mt-1 h-3 w-5/6 bg-teal-200/60 rounded" />
          <div className="mt-1 h-3 w-4/6 bg-teal-200/60 rounded" />
        </div>
      ))}
    </div>
  );

  const EmptyState = (
    <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-sm p-8 text-center">
      <p className="text-slate-700">No reviews here yet.</p>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
      >
        Be the first to review
      </button>
    </div>
  );

  const Grid = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, idx) => (
        <div key={idx} className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-lg transition">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < Math.round(r.rating)} />)}
            <span className="ml-1 text-sm text-slate-700">
              {r.rating?.toFixed ? r.rating.toFixed(1) : r.rating}/5
            </span>
          </div>
          {r.subject && <h3 className="mt-2 font-semibold text-slate-900">{r.subject}</h3>}
          <p className="mt-2 text-slate-700 text-sm leading-relaxed line-clamp-4">{r.text}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/90 text-white text-xs">
              {String(r.name).slice(0,1).toUpperCase()}
            </span>
            <span className="truncate">{r.name}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* header row button */}
      <div className="mb-3 flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/60 bg-white/80 px-4 py-2 text-slate-900 hover:bg-white"
        >
          Write a review
        </button>
      </div>

      {loading ? SkeletonGrid : items.length ? Grid : EmptyState}

      {/* modal popup with the form */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog" aria-modal="true" aria-label="Write a review"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-xl rounded-2xl border border-white/60 bg-white/90 backdrop-blur-md shadow-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Write a review</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <ReviewForm onSubmitted={handleSubmitted} />
            </div>
          </div>
        </div>
      )}

      {/* tiny toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-emerald-600 text-white px-4 py-2 shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
