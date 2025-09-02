// components/HomeSection.jsx
'use client';

import { motion } from 'framer-motion';

// tiny helper to join class names without extra deps
const cx = (...a) => a.filter(Boolean).join(' ');

export default function HomeSection({
  id,
  title,
  subtitle,
  bg = 'bg-transparent',
  innerClassName = '',
  children,
  shadowTitle = false, // set true to add grey text shadow
}) {
  return (
    <section id={id} className={bg}>
      <div className={cx('container-max py-10 md:py-16', innerClassName)}>
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2
                className={cx(
                  'text-3xl md:text-4xl font-extrabold text-gray-900',
                  shadowTitle && 'heading-shadow' // requires globals.css util
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-gray-600 md:text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
