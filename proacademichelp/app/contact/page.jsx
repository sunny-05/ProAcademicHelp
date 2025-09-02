// app/contact/page.jsx
import Link from "next/link";
import {
  WHATSAPP_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/site-links";

export const metadata = {
  title: "Contact — ProAcademicHelp",
  description: "Reach us on WhatsApp, phone, or email.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-3 text-slate-700">
        Have a question or need a quick quote? Reach us via WhatsApp, phone, or email.
      </p>

      {/* 3 cards: WhatsApp, Phone, Email */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white">
              <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M19.11 17.53c-.27-.13-1.58-.77-1.83-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.11-.55.11-.11.27-.29.4-.44.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.99-.21-.51-.43-.44-.6-.45-.16-.01-.33-.01-.51-.01s-.46.07-.7.33c-.24.27-.92.9-.92 2.2s.95 2.55 1.09 2.73c.13.18 1.87 2.86 4.52 4.01.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.11-.24-.18-.51-.31z" />
                <path d="M26.6 5.4C23.9 2.7 20.2 1.3 16.3 1.3 8 1.3 1.3 8 1.3 16.3c0 2.7.7 5.3 2.1 7.6L1 31l7.2-2.3c2.2 1.2 4.7 1.9 7.3 1.9 8.3 0 15-6.7 15-15 0-3.9-1.5-7.6-4.3-10.3zm-10.3 23c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.3 1.4 1.4-4.2-.3-.5c-1.3-2-1.9-4.3-1.9-6.6 0-7 5.7-12.7 12.7-12.7 3.4 0 6.6 1.3 9 3.8 2.4 2.4 3.8 5.6 3.8 9 0 7-5.7 12.7-12.7 12.7z" />
              </svg>
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">WhatsApp</h2>
              <p className="mt-1 text-sm text-slate-700">Quick replies for quotes and questions.</p>
            </div>
          </div>
        </a>

        {/* Phone */}
        <a
          href={CONTACT_PHONE_TEL}
          className="group rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition"
          aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
          title={`Call us at ${CONTACT_PHONE_DISPLAY}`}
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600/90 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.3 2.6 3.4 4.8 6 6l1.9-1.9c.3-.3.8-.4 1.2-.2 1 .4 2.1.6 3.3.6.7 0 1.2.6 1.2 1.2v3.2c0 .7-.6 1.2-1.2 1.2C10.4 22.1 1.9 13.6 1.9 2.9 1.9 2.2 2.5 1.7 3.2 1.7H6.4c.7 0 1.2.6 1.2 1.2 0 1.1.2 2.2.6 3.3.1.4 0 .9-.3 1.2l-1.3 1.3z" />
              </svg>
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">Phone</h2>
              <p className="mt-1 text-sm text-slate-700">{CONTACT_PHONE_DISPLAY}</p>
            </div>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Inquiry%20from%20ProAcademicHelp`}
          className="group rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/90 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4a2 2 0 00-2 2v.4l10 5.6 10-5.6V6a2 2 0 00-2-2zm0 4.1l-8.7 4.9a1 1 0 01-.98 0L2 8.1V18a2 2 0 002 2h16a2 2 0 002-2V8.1z" />
              </svg>
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">Email</h2>
              <p className="mt-1 text-sm text-slate-700">{CONTACT_EMAIL}</p>
            </div>
          </div>
        </a>
      </div>

      {/* Secondary actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/request" className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white">
          Request a Quote
        </Link>
        <Link href="/upload" className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white">
          Upload Files
        </Link>
      </div>
    </section>
  );
}
