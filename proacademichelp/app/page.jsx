// // app/page.jsx
// import Link from "next/link";
// import { WHATSAPP_URL } from "@/lib/site-links";
// import BrandBackground from "@/components/BrandBackground";
// import BrandBackgroundControls from "@/components/BrandBackgroundControls";
// import TestimonialsHome from "@/components/TestimonialsHome";
// import AnimatedServiceCard from "@/components/AnimatedServiceCard";
// import AnimatedStepCard from "@/components/AnimatedStepCard";

// export const metadata = {
//   title: "ProAcademicHelp — Home",
//   description:
//     "Professional writing, editing, research support, and full-stack web development.",
// };

// export default function HomePage() {
//   // WHAT WE DO (01–06 images)
//   const services = [
//     {
//       number: "01",
//       imageSrc: "/services/01.avif",
//       title: "Full-stack Web Development",
//       copy:
//         "Next.js apps, APIs, auth, dashboards, uploads, and payments—responsive and fast.",
//     },
//     {
//       number: "02",
//       imageSrc: "/services/02.avif",
//       title: "Content & Report Writing",
//       copy:
//         "Coursework, lab reports, and case studies with proper structure and citations.",
//     },
//     {
//       number: "03",
//       imageSrc: "/services/03.avif",
//       title: "UI & UX Design",
//       copy:
//         "Wireframes, design systems, and hi-fi mockups that look great and convert.",
//     },
//     {
//       number: "04",
//       imageSrc: "/services/04.avif",
//       title: "Editing & Proofreading",
//       copy:
//         "Grammar, clarity, formatting, and citation cleanup—polished and Turnitin-safe.",
//     },
//     {
//       number: "05",
//       imageSrc: "/services/05.avif",
//       title: "Research & Literature Review",
//       copy:
//         "Credible sources, synthesis, and annotated bibliographies tailored to your brief.",
//     },
//     {
//       number: "06",
//       imageSrc: "/services/06.avif",
//       title: "Presentation & Formatting",
//       copy:
//         "Slides and one-pagers with consistent visual style and export-ready layouts.",
//     },
//   ];

//   // HOW IT WORKS (01–03 step images)
//   const steps = [
//     {
//       step: "1",
//       number: "01",
//       imageSrc: "/steps/001.avif",
//       title: "Tell us what you need",
//       copy: "Share your brief, rubric, references, and deadline—big or small.",
//     },
//     {
//       step: "2",
//       number: "02",
//       imageSrc: "/steps/002.avif",
//       title: "We craft your deliverable",
//       copy: "Research, write, design, or code—then refine with your feedback.",
//     },
//     {
//       step: "3",
//       number: "03",
//       imageSrc: "/steps/003.avif",
//       title: "Review & submit",
//       copy: "Receive final files, properly formatted and ready to submit.",
//     },
//   ];

//   return (
//     <section className="relative">
//       {/* ===== HERO (scrollable background behind transparent navbar) ===== */}
//       <section className="relative -mt-16 h-[100vh]">
//         <BrandBackground
//           id="home-bg"
//           position="absolute"
//           topOffsetClass="top-0"
//           heightClass="h-full"
//           /* ↓ make images softer / more transparent */
//           imageClass="opacity-65 saturate-[.85] contrast-[.9] brightness-[.9]"
//           /* subtle white veil over images to fade more */
//           overlayClass="pointer-events-none bg-white/0.1 md:bg-white/0.1"
//         />
//         <BrandBackgroundControls
//           targetId="home-bg"
//           topOffsetClass="top-0"
//           heightClass="h-full"
//         />

//         {/* HERO content */}
//         <div className="relative z-20 mx-auto max-w-7xl px-4 pt-24 md:pt-28 h-full flex items-end md:items-center">
//           <div className="pb-10 md:pb-0">
//             <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
//               <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
//                 Ace your assignments with ProAcademicHelp
//               </span>
//             </h1>

//             <p className="mt-4 max-w-2xl text-lg">
//               <span className="text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
//                 Professional writing, editing, research, and modern web builds—delivered on your timeline.
//               </span>
//             </p>

//             {/* Actions (WhatsApp uses shared constant) */}
//             <div className="mt-6 flex flex-wrap gap-3">
//               <Link
//                 href="/request"
//                 className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
//               >
//                 Get a Quote
//               </Link>

//               <Link
//                 href="/reviews"
//                 className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white/70"
//               >
//                 See Reviews
//               </Link>

//               <Link
//                 href="/services"
//                 className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white/70"
//               >
//                 Explore Services
//               </Link>

//               <a
//                 href={WHATSAPP_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-white hover:brightness-110"
//                 aria-label="Chat with us on WhatsApp"
//                 title="Chat with us on WhatsApp"
//               >
//                 <svg
//                   viewBox="0 0 32 32"
//                   className="h-5 w-5"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path d="M19.11 17.53c-.27-.13-1.58-.77-1.83-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.11-.55.11-.11.27-.29.4-.44.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.99-.21-.51-.43-.44-.6-.45-.16-.01-.33-.01-.51-.01s-.46.07-.7.33c-.24.27-.92.9-.92 2.2s.95 2.55 1.09 2.73c.13.18 1.87 2.86 4.52 4.01.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.11-.24-.18-.51-.31z" />
//                   <path d="M26.6 5.4C23.9 2.7 20.2 1.3 16.3 1.3 8 1.3 1.3 8 1.3 16.3c0 2.7.7 5.3 2.1 7.6L1 31l7.2-2.3c2.2 1.2 4.7 1.9 7.3 1.9 8.3 0 15-6.7 15-15 0-3.9-1.5-7.6-4.3-10.3zm-10.3 23c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.3 1.4 1.4-4.2-.3-.5c-1.3-2-1.9-4.3-1.9-6.6 0-7 5.7-12.7 12.7-12.7 3.4 0 6.6 1.3 9 3.8 2.4 2.4 3.8 5.6 3.8 9 0 7-5.7 12.7-12.7 12.7z" />
//                 </svg>
//                 WhatsApp
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== SECTION 1: What we do ===== */}
//       <section
//         id="what-we-do"
//         className="scroll-mt-24 relative z-10 bg-gradient-to-b from-white/80 to-white/90"
//       >
//         <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
//           <div className="mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
//               What we do
//             </h2>
//             <p className="mt-2 text-slate-700 max-w-3xl">
//               From full-stack web apps to crisp, research-grounded documents—we
//               help you deliver quality work without the stress.
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {services.map((it, i) => (
//               <AnimatedServiceCard
//                 key={it.number}
//                 number={it.number}
//                 imageSrc={it.imageSrc}
//                 title={it.title}
//                 copy={it.copy}
//                 delay={i * 0.06}
//               />
//             ))}
//           </div>

//           <div className="mt-8">
//             <Link
//               href="/services"
//               className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
//             >
//               Explore all services
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ===== SECTION 2: How it works ===== */}
//       <section
//         id="how-it-works"
//         className="scroll-mt-24 relative z-10 bg-gradient-to-b from-white/90 to-teal-50/60"
//       >
//         <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
//           <div className="mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
//               How it works
//             </h2>
//             <p className="mt-2 text-slate-700 max-w-3xl">
//               Simple, transparent, and fast—so you can focus on results.
//             </p>
//           </div>

//           <ol className="grid gap-6 md:grid-cols-3">
//             {steps.map((s, i) => (
//               <AnimatedStepCard
//                 key={s.number}
//                 step={s.step}
//                 number={s.number}
//                 imageSrc={s.imageSrc}
//                 title={s.title}
//                 copy={s.copy}
//                 delay={i * 0.08}
//               />
//             ))}
//           </ol>

//           <div className="mt-8">
//             <Link
//               href="/request"
//               className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
//             >
//               Start a request
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ===== SECTION 3: Loved by clients ===== */}
//       <section
//         id="loved-by-clients"
//         className="scroll-mt-24 relative z-10 bg-gradient-to-b from-teal-50/60 to-cyan-100/60"
//       >
//         <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
//           <div className="mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
//               Loved by clients
//             </h2>
//             <p className="mt-2 text-slate-700 max-w-3xl">
//               A few recent notes from students and teams we’ve helped.
//             </p>
//           </div>

//           <TestimonialsHome />
//         </div>
//       </section>
//     </section>
//   );
// }


// New Comment
// app/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/site-links";
import BrandBackground from "@/components/BrandBackground";
import BrandBackgroundControls from "@/components/BrandBackgroundControls";
import TestimonialsHome from "@/components/TestimonialsHome";
import AnimatedServiceCard from "@/components/AnimatedServiceCard";
import AnimatedStepCard from "@/components/AnimatedStepCard";

export default function HomePage() {
  const HERO_IMAGES = ["/brand/1.jpg", "/brand/2.jpg", "/brand/3.jpg", "/brand/4.jpg"];

  const services = [
    { number: "01", imageSrc: "/services/01.avif", title: "Full-stack Web Development", copy: "Next.js apps, APIs, auth, dashboards, uploads, and payments—responsive and fast." },
    { number: "02", imageSrc: "/services/02.avif", title: "Content & Report Writing",   copy: "Coursework, lab reports, and case studies with proper structure and citations." },
    { number: "03", imageSrc: "/services/03.avif", title: "UI & UX Design",             copy: "Wireframes, design systems, and hi-fi mockups that look great and convert." },
    { number: "04", imageSrc: "/services/04.avif", title: "Editing & Proofreading",     copy: "Grammar, clarity, formatting, and citation cleanup—polished and Turnitin-safe." },
    { number: "05", imageSrc: "/services/05.avif", title: "Research & Literature Review", copy: "Credible sources, synthesis, and annotated bibliographies tailored to your brief." },
    { number: "06", imageSrc: "/services/06.avif", title: "Presentation & Formatting",  copy: "Slides and one-pagers with consistent visual style and export-ready layouts." },
  ];

  const steps = [
    { step: "1", number: "01", imageSrc: "/steps/001.avif", title: "Tell us what you need",      copy: "Share your brief, rubric, references, and deadline—big or small." },
    { step: "2", number: "02", imageSrc: "/steps/002.avif", title: "We craft your deliverable",  copy: "Research, write, design, or code—then refine with your feedback." },
    { step: "3", number: "03", imageSrc: "/steps/003.avif", title: "Review & submit",            copy: "Receive final files, properly formatted and ready to submit." },
  ];

  return (
    <section className="relative">
      {/* ===== HERO (desktop = BrandBackground, mobile = horizontal scroller) ===== */}
      <section className="relative -mt-16 h-[100vh]">
        {/* Mobile scroller (≤ md) */}
        <div className="absolute inset-0 md:hidden">
          <div
            id="home-bg-scroll"
            data-hero-scroll                 // ← controls use this as a fallback
            className="brand-scroll h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
          >
            <div className="flex h-full w-max">
              {HERO_IMAGES.map((src, i) => (
                <div key={i} className="relative w-screen h-full snap-center shrink-0">
                  <Image
                    src={src}
                    alt={`Hero ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover object-center opacity-70 saturate-[.9] contrast-[.95] brightness-[.95]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop background (≥ md) */}
        <div className="absolute inset-0 hidden md:block">
          <BrandBackground
            id="home-bg"
            position="absolute"
            topOffsetClass="top-0"
            heightClass="h-full"
            imageClass="opacity-65 saturate-[.85] contrast-[.9] brightness-[.9]"
            overlayClass="pointer-events-none"
          />
        </div>

        {/* Arrows target both: tries #home-bg-scroll first, otherwise #home-bg-scroll (fallback) */}
        <BrandBackgroundControls
          targetId="home-bg"
          topOffsetClass="top-0"
          heightClass="h-full"
        />

        {/* HERO content */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 pt-24 md:pt-28 h-full flex items-end md:items-center">
          <div className="pb-10 md:pb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
                Ace your assignments with ProAcademicHelp
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-lg">
              <span className="text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
                Professional writing, editing, research, and modern web builds—delivered on your timeline.
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/request" className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700">Get a Quote</Link>
              <Link href="/reviews" className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white/70">See Reviews</Link>
              <Link href="/services" className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white/70">Explore Services</Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-white hover:brightness-110"
                aria-label="Chat with us on WhatsApp"
                title="Chat with us on WhatsApp"
              >
                <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M19.11 17.53c-.27-.13-1.58-.77-1.83-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.11-.55.11-.11.27-.29.4-.44.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.99-.21-.51-.43-.44-.6-.45-.16-.01-.33-.01-.51-.01s-.46.07-.7.33c-.24.27-.92.9-.92 2.2s.95 2.55 1.09 2.73c.13.18 1.87 2.86 4.52 4.01.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.11-.24-.18-.51-.31z" />
                  <path d="M26.6 5.4C23.9 2.7 20.2 1.3 16.3 1.3 8 1.3 1.3 8 1.3 16.3c0 2.7.7 5.3 2.1 7.6L1 31l7.2-2.3c2.2 1.2 4.7 1.9 7.3 1.9 8.3 0 15-6.7 15-15 0-3.9-1.5-7.6-4.3-10.3zm-10.3 23c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.3 1.4 1.4-4.2-.3-.5c-1.3-2-1.9-4.3-1.9-6.6 0-7 5.7-12.7 12.7-12.7 3.4 0 6.6 1.3 9 3.8 2.4 2.4 3.8 5.6 3.8 9 0 7-5.7-12.7-12.7-12.7z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: What we do ===== */}
      <section id="what-we-do" className="scroll-mt-24 relative z-10 bg-gradient-to-b from-white/80 to-white/90">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">What we do</h2>
            <p className="mt-2 text-slate-700 max-w-3xl">
              From full-stack web apps to crisp, research-grounded documents—we help you deliver quality work without the stress.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((it, i) => (
              <AnimatedServiceCard key={it.number} number={it.number} imageSrc={it.imageSrc} title={it.title} copy={it.copy} delay={i * 0.06} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
              Explore all services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: How it works ===== */}
      <section id="how-it-works" className="scroll-mt-24 relative z-10 bg-gradient-to-b from-white/90 to-teal-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How it works</h2>
            <p className="mt-2 text-slate-700 max-w-3xl">Simple, transparent, and fast—so you can focus on results.</p>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <AnimatedStepCard key={s.number} step={s.step} number={s.number} imageSrc={s.imageSrc} title={s.title} copy={s.copy} delay={i * 0.08} />
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/request" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
              Start a request
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Loved by clients ===== */}
      <section id="loved-by-clients" className="scroll-mt-24 relative z-10 bg-gradient-to-b from-teal-50/60 to-cyan-100/60">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Loved by clients</h2>
            <p className="mt-2 text-slate-700 max-w-3xl">A few recent notes from students and teams we’ve helped.</p>
          </div>
          <TestimonialsHome />
        </div>
      </section>
    </section>
  );
}
