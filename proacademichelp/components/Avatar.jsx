'use client';
import { useState } from 'react';

export default function Avatar({ name = '', src = '', size = 40 }) {
  const [broken, setBroken] = useState(false);

  // Derive initials
  const initials = name
    ? name.trim().split(/\s+/).slice(0, 2).map(s => s[0].toUpperCase()).join('')
    : 'U';

  // Stable gradient palette from name
  const palettes = [
    'from-rose-400 to-pink-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
    'from-sky-400 to-blue-500',
    'from-violet-400 to-purple-500',
    'from-fuchsia-400 to-pink-500',
  ];
  const idx = name ? (name.charCodeAt(0) + name.charCodeAt(name.length - 1)) % palettes.length : 0;
  const palette = palettes[idx];

  const dim = typeof size === 'number' ? `${size}px` : size;

  // If we have an image and it isn't broken, show it
  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name || 'User'}
        width={typeof size === 'number' ? size : undefined}
        height={typeof size === 'number' ? size : undefined}
        className="rounded-full object-cover border border-white/60 shadow-sm"
        style={{ width: dim, height: dim }}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)} // fallback to initials if the image 404s
      />
    );
  }

  // Fallback: initials avatar
  return (
    <div
      className={`rounded-full bg-gradient-to-br ${palette} text-white font-bold flex items-center justify-center border border-white/60 shadow-sm`}
      style={{ width: dim, height: dim }}
      aria-label={name || 'User'}
      title={name}
    >
      {initials}
    </div>
  );
}
