// components/Footer.jsx
"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // Transparent so the site-wide background image shows through
    <footer className="relative z-20 bg-transparent text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col items-center gap-3">
        <nav className="flex gap-4 text-sm">
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
        <p className="text-xs">
          © {year} ProAcademicHelp — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
