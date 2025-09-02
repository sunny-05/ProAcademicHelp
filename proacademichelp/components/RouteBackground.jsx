// components/RouteBackground.jsx
"use client";

import { usePathname } from "next/navigation";
import BrandBackground from "./BrandBackground";

export default function RouteBackground() {
  const path = usePathname();
  if (path !== "/") return null;          // only on Home
  return (
    <BrandBackground
      id="site-bg"
      position="fixed"
      topOffsetClass="top-16"
      heightClass="h-[55vh] md:h-[65vh]"
      imageClass="opacity-90"
      overlayClass="bg-black/10"
    />
  );
}
