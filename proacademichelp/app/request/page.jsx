// app/request/page.jsx
import RequestFormAnimated from "@/components/RequestFormAnimated";

export const metadata = {
  title: "Request a Quote — ProAcademicHelp",
  description:
    "Tell us about your assignment or project. We’ll estimate scope, timeline, and price.",
};

export default function RequestPage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Request a Quote
          </h1>
          <p className="mt-3 text-slate-700">
            Share a few details and we’ll get back with a clear plan and timeline.
          </p>
        </div>

        {/* Animated client-side form */}
        <RequestFormAnimated />
      </div>
    </section>
  );
}
