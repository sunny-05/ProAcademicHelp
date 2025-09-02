'use client';
import { motion, useReducedMotion } from 'framer-motion';

const THEMES = {
  // Fresh & techy (default)
  ocean: {
    overlayFrom: 'rgba(255,255,255,0.55)',
    overlayVia:  'rgba(255,255,255,0.35)',
    blobs: [
      'rgba(34,211,238,0.55)',  // cyan-400
      'rgba(99,102,241,0.55)',  // indigo-500
      'rgba(56,189,248,0.50)',  // sky-400
      'rgba(16,185,129,0.50)',  // emerald-500
    ],
  },
  // Premium & creative
  royal: {
    overlayFrom: 'rgba(255,255,255,0.55)',
    overlayVia:  'rgba(255,255,255,0.3)',
    blobs: [
      'rgba(168,85,247,0.55)',  // violet-500
      'rgba(99,102,241,0.55)',  // indigo-500
      'rgba(244,63,94,0.45)',   // rose-500
      'rgba(59,130,246,0.45)',  // blue-500
    ],
  },
  // Friendly & high-converting
  sunset: {
    overlayFrom: 'rgba(255,255,255,0.55)',
    overlayVia:  'rgba(255,255,255,0.35)',
    blobs: [
      'rgba(254,176,123,0.55)', // peach
      'rgba(253,164,175,0.55)', // rose-300
      'rgba(251,191,36,0.45)',  // amber-400
      'rgba(147,197,253,0.45)', // sky-300
    ],
  },
  // Ultra-clean pastel
  mint: {
    overlayFrom: 'rgba(255,255,255,0.6)',
    overlayVia:  'rgba(255,255,255,0.4)',
    blobs: [
      'rgba(134,239,172,0.5)',  // emerald-300
      'rgba(103,232,249,0.5)',  // cyan-300
      'rgba(196,181,253,0.45)', // violet-300
      'rgba(125,211,252,0.45)', // sky-300
    ],
  },
};

function Blob({ className = '', color = 'rgba(0,0,0,0.5)', delay = 0, dur = 18 }) {
  const reduce = useReducedMotion();
  const animate = reduce
    ? { opacity: 0.55 }
    : {
        opacity: [0.45, 0.7, 0.55],
        scale:   [1, 1.1, 1],
        x:       [0, 35, -25, 0],
        y:       [0, -22, 18, 0],
      };
  return (
    <motion.div
      initial={{ opacity: 0.45 }}
      animate={animate}
      transition={{ duration: dur, delay, ease: 'easeInOut', repeat: Infinity }}
      className={`absolute rounded-full blur-3xl mix-blend-multiply ${className}`}
      style={{ backgroundImage: `radial-gradient(closest-side, ${color}, transparent)` }}
      aria-hidden
    />
  );
}

/**
 * AuroraBackground
 * @param {'ocean'|'royal'|'sunset'|'mint'} theme
 */
export default function AuroraBackground({ theme = 'ocean' }) {
  const t = THEMES[theme] ?? THEMES.ocean;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft color blobs (positions/sizes tuned for desktop & mobile) */}
      <Blob color={t.blobs[0]} className="w-[58vw] h-[58vw] -top-[18%] -left-[14%]" delay={0} />
      <Blob color={t.blobs[1]} className="w-[46vw] h-[46vw] top-[8%] right-[14%]" delay={2} dur={21} />
      <Blob color={t.blobs[2]} className="w-[44vw] h-[44vw] -bottom-[18%] -right-[8%]" delay={4} dur={23} />
      <Blob color={t.blobs[3]} className="w-[38vw] h-[38vw] bottom-[6%] left-[12%]" delay={6} dur={25} />

      {/* Gentle softening + light wash so content stays readable */}
      <div className="absolute inset-0 backdrop-blur-[18px]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, ${t.overlayFrom}, ${t.overlayVia}, transparent)`,
        }}
      />
    </div>
  );
}
