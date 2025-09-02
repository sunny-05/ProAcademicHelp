// components/AnimatedStepCard.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedStepCard({
  step = "1",
  number = "01",
  title,
  copy,
  imageSrc = "/steps/001.avif",
  delay = 0,
  className = "",
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
      whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,.08)" }}
      className={[
        "rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md overflow-hidden",
        "transition will-change-transform",
        className,
      ].join(" ")}
    >
      {/* Top image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={number === "01"}
        />
        {/* Number badge */}
        <div className="absolute left-3 top-3 rounded-xl bg-black/60 px-2.5 py-1 text-white text-xs font-semibold tracking-wider">
          {number}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/90 text-white font-semibold">
            {step}
          </span>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="mt-2 text-slate-700 text-sm leading-relaxed">{copy}</p>
      </div>
    </motion.li>
  );
}
