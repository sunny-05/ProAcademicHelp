// components/TopHeroBackground.jsx
"use client";
import { usePathname } from "next/navigation";
import BrandBackground from "./BrandBackground";

/**
 * Shows the full-bleed background ONLY on the homepage (/).
 * Nothing is rendered on other routes like /services.
 */
export default function TopHeroBackground() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <BrandBackground
      id="top-hero-bg"
      position="fixed"                 // covers navbar + first viewport on Home
      heightClass="h-screen"
      overlayClass="bg-white/75 backdrop-blur-[1px]"
    />
  );
}
