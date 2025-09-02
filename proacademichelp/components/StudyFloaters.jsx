'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Minimal inline icons (currentColor)
function BookIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" d="M4 5a2 2 0 0 1 2-2h10.5a1.5 1.5 0 0 1 1.5 1.5V19a1 1 0 0 1-1.2.98L6 18.2A2 2 0 0 0 4 20V5Z"/>
    <path strokeWidth="2" strokeLinecap="round" d="M6 4.5h11"/>
  </svg>
);}
function PencilIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" d="M12 20H5l1.5-6.5L15 5a2.1 2.1 0 0 1 3 3l-8.5 8.5L5 20"/>
    <path strokeWidth="2" strokeLinecap="round" d="M14 6l4 4"/>
  </svg>
);}
function CapIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" d="M12 4 3 8l9 4 9-4-9-4Z"/>
    <path strokeWidth="2" d="M7 10v3c0 1.657 2.239 3 5 3s5-1.343 5-3v-3"/>
  </svg>
);}
function PaperIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>
    <path strokeWidth="2" d="M14 3v5h5"/>
    <path strokeWidth="2" d="M9 13h6M9 17h6M9 9h2"/>
  </svg>
);}

const items = [
  { Icon: BookIcon,   top: '12%', left: '6%',   delay: 0.1,  tint: 'text-brand-600' },
  { Icon: PencilIcon, top: '22%', left: '78%',  delay: 0.3,  tint: 'text-amber-600' },
  { Icon: CapIcon,    top: '65%', left: '8%',   delay: 0.2,  tint: 'text-blue-600' },
  { Icon: PaperIcon,  top: '68%', left: '82%',  delay: 0.45, tint: 'text-emerald-600' },
  { Icon: PaperIcon,  top: '8%',  left: '50%',  delay: 0.25, tint: 'text-fuchsia-600' },
];

export default function StudyFloaters() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      {items.map(({ Icon, top, left, delay, tint }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top, left }}
          initial={{ y: 0, opacity: 0 }}
          animate={reduce ? { opacity: 0.6 } : { y: [-8, 8, -8], opacity: 0.8 }}
          transition={{
            duration: 8 + i, repeat: Infinity, repeatType: 'mirror',
            ease: 'easeInOut', delay
          }}
        >
          <div className="rounded-2xl backdrop-blur-md bg-white/50 dark:bg-gray-900/30 shadow-sm ring-1 ring-black/5 p-2">
            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${tint}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
