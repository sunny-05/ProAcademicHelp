// components/BrandBackgroundControls.jsx
"use client";

import { useEffect, useRef } from "react";

export default function BrandBackgroundControls({
  targetId = "site-bg",
  heightClass = "h-[55vh] md:h-[65vh]",
  topOffsetClass = "top-16",
}) {
  const scrollerRef = useRef(null);

  const isVisible = (el) => !!el && el.offsetParent !== null;

  const resolveScroller = () => {
    // 1) mobile hero scroller (if you added data-hero-scroll in Home)
    let el = document.querySelector("[data-hero-scroll]");
    if (!isVisible(el)) el = null;

    // 2) scroller by id: ${targetId}-scroll (desktop BrandBackground)
    if (!el) {
      const byId = document.getElementById(`${targetId}-scroll`);
      if (isVisible(byId)) el = byId;
    }

    // 3) any .brand-scroll inside target wrapper
    if (!el) {
      const inWrapper = document.querySelector(`#${targetId} .brand-scroll`);
      if (isVisible(inWrapper)) el = inWrapper;
    }

    // 4) first visible .brand-scroll as a fallback
    if (!el) {
      const any = Array.from(document.querySelectorAll(".brand-scroll")).find(isVisible);
      if (any) el = any;
    }

    scrollerRef.current = el || null;
  };

  useEffect(() => {
    resolveScroller();

    const onResize = () => resolveScroller();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const mo = new MutationObserver(() => resolveScroller());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      mo.disconnect();
    };
  }, [targetId]);

  // Helper to wrap around
  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const x = el.scrollLeft;
    const step = Math.max(280, Math.floor(el.clientWidth * 0.9));
    const edge = 16; // threshold for considering "at the edge"

    // NEXT (→): if we’re at / near the end, wrap to start
    if (dir > 0 && x >= max - edge) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    // PREV (←): if we’re at / near the start, wrap to end
    if (dir < 0 && x <= edge) {
      el.scrollTo({ left: max, behavior: "smooth" });
      return;
    }

    // Normal step
    try {
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    } catch {
      el.scrollLeft = x + dir * step;
    }
  };

  const Btn = ({ onClick, label, icon }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      {icon}
    </button>
  );

  return (
    <div
      className={[
        "absolute inset-x-0",
        topOffsetClass,
        heightClass,
        "z-30 flex items-center justify-between px-2 pointer-events-none",
      ].join(" ")}
    >
      <Btn
        label="Previous background"
        onClick={() => nudge(-1)}
        icon={<span className="text-xl leading-none select-none">‹</span>}
      />
      <Btn
        label="Next background"
        onClick={() => nudge(1)}
        icon={<span className="text-xl leading-none select-none">›</span>}
      />
    </div>
  );
}
