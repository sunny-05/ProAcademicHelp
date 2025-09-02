// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/",         label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/request",  label: "Request" },
  { href: "/reviews",  label: "Reviews" },
  { href: "/contact",  label: "Contact" },
  { href: "/upload",   label: "Upload Files" },
  { href: "/dashboard",label: "Dashboard" },
];

function NavLink({ href, children, onClick }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors
        ${active ? "text-emerald-400" : "text-white hover:text-emerald-300"}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change or ESC
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Brand (logo + wordmark) */}
          <Link href="/" aria-label="Go to Home" className="flex items-center gap-2">
            {/* If /public/logo.jpg exists it will show; otherwise just the text */}
            <Image
              src="/logo.jpg"
              alt="ProAcademicHelp logo"
              width={40}
              height={40}
              className="hidden sm:block h-10 w-10 object-contain"
              priority
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="text-base md:text-lg font-bold tracking-wide">
              ProAcademicHelp
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {/* hamburger / close icon */}
            <svg className={`${open ? "hidden" : "block"} h-6 w-6`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className={`${open ? "block" : "hidden"} h-6 w-6`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out
            ${open ? "max-h-96" : "max-h-0"}`}
        >
          <div className="flex flex-col gap-1 border-t border-white/10 py-2">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
