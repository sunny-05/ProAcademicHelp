// components/BrandBackground.jsx
"use client";

import Image from "next/image";

// Update paths if yours differ
const IMAGES = ["/brand/1.jpg", "/brand/2.jpg", "/brand/3.jpg", "/brand/4.jpg"];

export default function BrandBackground({
  id = "site-bg",
  position = "fixed",                 // "fixed" for site-wide, "absolute" for local
  topOffsetClass = "top-16",          // match your fixed navbar height
  heightClass = "h-[55vh] md:h-[65vh]",
  imageClass = "opacity-90",          // tweak fade (e.g., opacity-95/85/80)
  overlayClass = "bg-black/10",       // set "" to remove any dim overlay
  fit = "cover",                      // "cover" (fill band) or "contain" (no crop)
}) {
  return (
    <div
      id={id}
      className={[
        "pointer-events-none",
        position, "inset-x-0", topOffsetClass, heightClass, "z-0",
      ].join(" ")}
    >
      {/* Horizontal scroller */}
      <div
        id={`${id}-scroll`}
        className={[
          "absolute inset-0 pointer-events-auto",
          "overflow-x-auto overscroll-x-contain brand-scroll",
          "snap-x snap-mandatory snap-always [scroll-behavior:smooth]",
        ].join(" ")}
      >
        {/* Use flex so each slide is EXACTLY the viewport width */}
        <div className="flex h-full">
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative h-full min-w-full flex-none snap-start align-top"
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={[
                  "select-none",
                  fit === "cover" ? "object-cover" : "object-contain bg-black",
                  imageClass,
                ].join(" ")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Optional dim overlay */}
      {overlayClass ? (
        <div className={`pointer-events-none absolute inset-0 ${overlayClass}`} />
      ) : null}
    </div>
  );
}
