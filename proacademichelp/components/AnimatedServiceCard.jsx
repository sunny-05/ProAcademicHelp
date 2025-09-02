// components/AnimatedServiceCard.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AnimatedServiceCard({
  title,
  points = [],
  delayMs = 0,          // stagger enter
  imageSrc,            // NEW: /services/*.*
  imageAlt = "",       // NEW
  children,            // icon chip
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        "group rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-sm",
        "transition-all duration-700 ease-out will-change-transform",
        show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[.98]",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 focus-within:-translate-y-1",
      ].join(" ")}
      tabIndex={0}
      aria-label={title}
    >
      {/* image banner */}
      {imageSrc && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="relative aspect-[16/9]">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={false}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-3">
          {children && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/90 text-white shadow transition-transform duration-500 group-hover:rotate-6">
              {children}
            </div>
          )}
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>

        {!!points.length && (
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {points.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/90" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
