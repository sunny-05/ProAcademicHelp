// app/reviews/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";

/* ---------- tiny helpers ---------- */
function Star({ filled }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={filled ? "text-amber-400 drop-shadow-[0_0_2px_rgba(255,255,255,.5)]" : "text-amber-400"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.6"}
    >
      <path d="M12 17.27l-5.4 3.25 1.64-6.14L3 9.75l6.2-.52L12 3.5l2.8 5.73 6.2.52-5.24 4.63 1.64 6.14z" />
    </svg>
  );
}
function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const isFull = i < full;
        const isHalf = i === full && half;
        if (isHalf) {
          return (
            <span key={i} className="relative inline-block" style={{ width: 18, height: 18 }}>
              <svg width={18} height={18} viewBox="0 0 24 24" className="absolute inset-0 text-amber-400" fill="currentColor">
                <defs><clipPath id={`half-${i}`}><rect x="0" y="0" width="12" height="24" /></clipPath></defs>
                <path clipPath={`url(#half-${i})`} d="M12 17.27l-5.4 3.25 1.64-6.14L3 9.75l6.2-.52L12 3.5l2.8 5.73 6.2.52-5.24 4.63 1.64 6.14z" />
              </svg>
              <svg width={18} height={18} viewBox="0 0 24 24" className="absolute inset-0 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 17.27l-5.4 3.25 1.64-6.14L3 9.75l6.2-.52L12 3.5l2.8 5.73 6.2.52-5.24 4.63 1.64 6.14z" />
              </svg>
            </span>
          );
        }
        return <Star key={i} filled={isFull} />;
      })}
    </div>
  );
}
function GlassCard({ className = "", children }) {
  return (
    <div className={["rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-sm", className].join(" ")}>
      {children}
    </div>
  );
}

/* ---------- page ---------- */
export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest"); // newest | highest | lowest
  const [visible, setVisible] = useState(9);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const json = await res.json();
        const arr = Array.isArray(json) ? json : (json?.reviews ?? []);
        if (!alive) return;
        const normalized = arr.map((r) => ({
          name: r.name ?? r.author ?? "Anonymous",
          rating: Number(r.rating ?? r.stars ?? 0),
          text: r.comment ?? r.review ?? r.message ?? "",
          subject: r.subject ?? r.title ?? "",
          date: r.createdAt ?? r.date ?? r.time ?? null,
        }));
        setAllReviews(normalized);
      } catch {
        // no-op
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const summary = useMemo(() => {
    if (!allReviews.length) return { avg: 0, total: 0, counts: [0,0,0,0,0] };
    const counts = [0,0,0,0,0];
    let sum = 0;
    allReviews.forEach((r) => {
      const s = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 0)));
      counts[s - 1] += 1;
      sum += Number(r.rating) || 0;
    });
    const total = allReviews.length;
    return { avg: +(sum / total).toFixed(1), total, counts };
  }, [allReviews]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = allReviews.filter((r) => {
      const matchesQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q);
      const matchesRating = (Number(r.rating) || 0) >= (minRating || 0);
      return matchesQ && matchesRating;
    });
    arr.sort((a, b) => {
      if (sortBy === "highest") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "lowest") return (a.rating || 0) - (b.rating || 0);
      const da = a.date ? +new Date(a.date) : 0;
      const db = b.date ? +new Date(b.date) : 0;
      return db - da;
    });
    return arr;
  }, [allReviews, query, minRating, sortBy]);

  const percent = (n) => {
    const t = summary.total || 1;
    return Math.round((n / t) * 100);
  };

  return (
    <section className="relative px-4 py-10 bg-gradient-to-br from-teal-50 via-teal-100 to-cyan-100 min-h-[calc(100vh-4rem)]">
      <div className="pointer-events-none absolute -top-24 -left-16 h-80 w-80 rounded-full bg-white/60 blur-3xl opacity-70" />

      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Student Reviews</h1>
            <p className="mt-1 text-slate-700">Real feedback on quality, clarity, and turnaround.</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/request"
              className="rounded-xl border border-white/60 bg-white/80 px-4 py-2 text-slate-900 hover:bg-white"
            >
              Request a Quote
            </Link>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              {showForm ? "Close" : "Write a Review"}
            </button>
          </div>
        </div>

        {/* Toggleable Review Form */}
        {showForm && (
          <GlassCard className="p-5 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Share your experience</h2>
            <ReviewForm
              onSubmitted={(newReview) => {
                setShowForm(false);
                // Normalize and prepend
                const normalized = {
                  name: newReview.name ?? "Anonymous",
                  rating: Number(newReview.rating ?? 0),
                  text: newReview.comment ?? newReview.text ?? "",
                  subject: newReview.subject ?? "",
                  date: newReview.createdAt ?? newReview.date ?? new Date().toISOString(),
                };
                // Add to top
                // eslint-disable-next-line no-unused-vars
                setAllReviews((prev) => [normalized, ...prev]);
              }}
            />
          </GlassCard>
        )}

        {/* Summary Bar */}
        <GlassCard className="p-5">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Average */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/90 text-white shadow">
                <span className="text-2xl font-bold">{summary.avg.toFixed(1)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Stars value={summary.avg} />
                  <span className="text-sm text-slate-700">({summary.total} reviews)</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">Average rating</p>
              </div>
            </div>

            {/* Rating distribution */}
            <div className="md:col-span-2 grid gap-2">
              {[5,4,3,2,1].map((s) => {
                const n = summary.counts[s - 1] || 0;
                return (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-8 text-sm text-slate-700">{s}★</span>
                    <div className="h-3 flex-1 rounded-full bg-white/60 overflow-hidden">
                      <div className="h-full bg-teal-500" style={{ width: `${percent(n)}%` }} />
                    </div>
                    <span className="w-12 text-right text-sm text-slate-700">{n}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>

        {/* Controls */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search name, subject, or words…"
                className="w-72 max-w-[70vw] rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="pointer-events-none absolute right-3 top-2.5 text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3-3" />
                </svg>
              </span>
            </div>

            <select
              className="rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              title="Minimum rating"
            >
              <option value={0}>All ratings</option>
              <option value={5}>5★ only</option>
              <option value={4}>4★ & up</option>
              <option value={3}>3★ & up</option>
              <option value={2}>2★ & up</option>
              <option value={1}>1★ & up</option>
            </select>
          </div>

          <div>
            <select
              className="rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              title="Sort reviews"
            >
              <option value="newest">Newest first</option>
              <option value="highest">Highest rating</option>
              <option value="lowest">Lowest rating</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <GlassCard key={i} className="p-5 animate-pulse">
                  <div className="h-4 w-24 bg-teal-200/80 rounded" />
                  <div className="mt-1 h-5 w-40 bg-teal-200/80 rounded" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full bg-teal-200/70 rounded" />
                    <div className="h-3 w-11/12 bg-teal-200/70 rounded" />
                    <div className="h-3 w-10/12 bg-teal-200/70 rounded" />
                  </div>
                </GlassCard>
              ))
            : filtered.slice(0, visible).map((r, idx) => (
                <GlassCard key={idx} className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stars value={r.rating} />
                      <span className="text-sm font-medium text-slate-800">
                        {r.rating?.toFixed ? r.rating.toFixed(1) : r.rating} / 5
                      </span>
                    </div>
                    {r.date ? (
                      <span className="text-xs text-slate-600">{new Date(r.date).toLocaleDateString()}</span>
                    ) : null}
                  </div>

                  {r.subject ? (
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{r.subject}</h3>
                  ) : null}

                  <p className="mt-2 text-slate-700 leading-relaxed">
                    {r.text || "No comment provided."}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <div className="h-7 w-7 rounded-full bg-emerald-500/90 text-white flex items-center justify-center text-xs">
                        {String(r.name).trim().slice(0, 1).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[180px]">{r.name}</span>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-emerald-500/90" fill="currentColor">
                      <path d="M7 11h4v6H5v-4c0-1.1.9-2 2-2zm10 0h4v6h-6v-4c0-1.1.9-2 2-2z" />
                    </svg>
                  </div>
                </GlassCard>
              ))}
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <GlassCard className="p-8 mt-6 text-center">
            <p className="text-slate-700">No reviews match your filters.</p>
            <div className="mt-4">
              <button
                className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                onClick={() => {
                  setQuery("");
                  setMinRating(0);
                  setSortBy("newest");
                }}
              >
                Clear filters
              </button>
            </div>
          </GlassCard>
        )}

        {/* Load more */}
        {!loading && filtered.length > visible && (
          <div className="mt-6 flex justify-center">
            <button
              className="rounded-xl border border-white/60 bg-white/80 px-5 py-2 text-slate-900 hover:bg-white"
              onClick={() => setVisible((v) => v + 9)}
            >
              Load more reviews
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/request"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/60 bg-white/80 px-5 py-3 text-slate-900 hover:bg-white"
          >
            Share Your Feedback
          </Link>
        </div>
      </div>
    </section>
  );
}
