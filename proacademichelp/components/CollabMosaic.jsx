'use client';
import { motion } from 'framer-motion';

const URL_SUFFIX = '?auto=format&fit=crop&w=1200&q=70';
const FALLBACK   = 'https://source.unsplash.com/1200x800/?team,office,collaboration';

const IMAGES = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d'
];

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function CollabMosaic() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.06 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
    >
      {IMAGES.map((base, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl h-28 sm:h-36 md:h-40 lg:h-48 bg-gray-100"
        >
          <img
            src={`${base}${URL_SUFFIX}`}
            alt="Professionals collaborating"
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = FALLBACK; }}
          />
          {/* softer top highlight instead of dark overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
        </motion.div>
      ))}
    </motion.div>
  );
}
