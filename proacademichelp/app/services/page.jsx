// app/services/page.jsx
import Link from "next/link";
import AnimatedServiceCard from "@/components/AnimatedServiceCard";

export const metadata = {
  title: "Services — ProAcademicHelp",
  description:
    "Full-stack web development, content & report writing, UI/UX design, editing & proofreading, and research & literature review.",
};

export default function ServicesPage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 py-10 bg-gradient-to-br from-teal-50 via-teal-100 to-cyan-100">
      <div className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-white/60 blur-3xl opacity-70" />

      <div className="mx-auto max-w-7xl relative">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Our Services</h1>
          <p className="mt-2 max-w-2xl text-slate-700">
            From modern web apps to crisp, research-backed writing—pick what you need and we’ll take it from there.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedServiceCard
            title="Full-Stack Web Development"
            delayMs={0}
            imageSrc="/services/4.jpg"
            imageAlt="Coding on a laptop and UI on screen"
            points={[
              "React/Next.js front-ends with accessible UI",
              "Node/Express & API integration (REST/GraphQL)",
              "Auth, dashboards, uploads, payments",
              "Responsive, SEO-friendly, performant builds",
            ]}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h18v14H3z" />
              <path d="M9 5v14M15 5v14" />
              <path d="M7 8h2M7 12h2M7 16h2" />
            </svg>
          </AnimatedServiceCard>

          <AnimatedServiceCard
            title="Content & Report Writing"
            delayMs={80}
            imageSrc="/services/1.avif"
            imageAlt="Open binder with highlighted report and pens"
            points={[
              "Coursework, lab reports, summaries, case studies",
              "Clear structure, tone match, source integration",
              "APA / MLA / Chicago / Harvard formatting",
            ]}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16v16H4z" />
              <path d="M8 8h8M8 12h8M8 16h6" />
            </svg>
          </AnimatedServiceCard>

          <AnimatedServiceCard
            title="UI & UX Design"
            delayMs={160}
            imageSrc="/services/6.avif"
            imageAlt="Interface layout and design elements"
            points={[
              "Wireframes, flows, and component libraries",
              "Responsive layouts & design systems",
              "Hi-fi mockups and clickable prototypes",
            ]}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="14" rx="2" />
              <path d="M7 7h6M7 11h10" />
              <path d="M8 21h8" />
            </svg>
          </AnimatedServiceCard>

          <AnimatedServiceCard
            title="Editing & Proofreading"
            delayMs={240}
            imageSrc="/services/5.jpg"
            imageAlt="Notebook and proofreading marks"
            points={[
              "Grammar, clarity, structure, and flow",
              "Citation cleanup & reference formatting",
              "Plagiarism-safe revisions with change notes",
            ]}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5l4 4L7 21l-4 1 1-4 12.5-14.5z" />
            </svg>
          </AnimatedServiceCard>

          <AnimatedServiceCard
            title="Research & Literature Review"
            delayMs={320}
            imageSrc="/services/2.avif"
            imageAlt="Library shelves filled with journals and books"
            points={[
              "Source discovery (journals, books, credible web)",
              "Annotated bibliographies & synthesis matrices",
              "Evidence-based summaries with proper citations",
            ]}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-3.5-3.5" />
            </svg>
          </AnimatedServiceCard>

          <AnimatedServiceCard
            title="Presentation & Formatting"
            delayMs={400}
            imageSrc="/services/3.avif"
            imageAlt="Presentation slides and visual assets"
            points={[
              "Slides, posters, one-pagers",
              "Consistent style & typography",
              "Turnitin-ready formatting & export",
            ]}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4h18v12H3z" />
              <path d="M12 16v4M8 20h8" />
            </svg>
          </AnimatedServiceCard>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/request" className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
            Get a Custom Quote
          </Link>
          <Link href="/contact" className="rounded-xl border border-white/60 bg-white/80 px-5 py-3 text-slate-900 hover:bg-white">
            Talk to Us
          </Link>
        </div>

        <p className="mt-4 text-sm text-slate-700">
          Need something not listed? Tell us your requirements—we’ll tailor the scope to your deadline and rubric.
        </p>
      </div>
    </section>
  );
}
