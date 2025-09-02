// components/ProfessionalHero.jsx
'use client';
import { motion } from 'framer-motion';
import QuoteCard from '@/components/QuoteCard';

export default function ProfessionalHero() {
  return (
    <div className="container-max grid md:grid-cols-2 gap-8 items-center">
      {/* Left: copy */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          ProAcedmicHelp — your partner for projects & assignments
        </h1>
        <p className="text-gray-600 md:text-lg">
          We build, write and deliver on time — with clear communication and quality you can trust.
        </p>
        <div className="flex gap-3">
          <a href="#services" className="btn-primary">What we do</a>
          <a href="/contact" className="btn-ghost">Contact us</a>
        </div>
      </div>

      {/* Right: quote card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="justify-self-end"
      >
        <QuoteCard />
      </motion.div>
    </div>
  );
}
