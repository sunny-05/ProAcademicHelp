// components/RequestFormAnimated.jsx
"use client";

import { useState } from "react";

export default function RequestFormAnimated() {
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");

  function onPickFiles(e) {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1) Create the quote first (no need to send files here)
      const qRes = await fetch("/api/quotes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          deadline,
          subject,
          details,
          // You can omit files or send metadata only; uploads happen in step 2
        }),
      });
      if (!qRes.ok) throw new Error("Quote creation failed");
      const { id: quoteId } = await qRes.json();

      // 2) If there are files, upload them with quoteId so Dashboard can link & Open
      if (files.length > 0) {
        const fd = new FormData();
        files.forEach((f) => fd.append("files", f));
        fd.append("note", `Uploaded from Request a Quote: ${subject || ""}`.trim());
        fd.append("quoteId", quoteId);

        const uRes = await fetch("/api/uploads", {
          method: "POST",
          body: fd,
        });
        if (!uRes.ok) {
          // Not fatal for quote creation, but tell the user
          console.warn("Upload failed for quote", quoteId);
          alert("Your request was saved, but file upload failed. You can re-upload from the Upload page.");
        }
      }

      // 3) success UI
      setSubmitted(true);
      setFiles([]);
      // (optional) mirror to local storage so dev refresh keeps context
      try {
        const localQ = JSON.parse(localStorage.getItem("pa_quotes") || "[]");
        localStorage.setItem(
          "pa_quotes",
          JSON.stringify([{ id: quoteId, name, email, service, deadline, subject, details, status: "new", createdAt: new Date().toISOString() }, ...localQ])
        );
      } catch {}
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong submitting your request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 text-center">
        <h3 className="text-xl font-semibold text-slate-900">Thanks! Your request was received.</h3>
        <p className="mt-2 text-slate-700">
          You can track it on the Dashboard and upload more files anytime.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/dashboard" className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700">
            View dashboard
          </a>
          <a href="/upload" className="rounded-xl border border-emerald-200 px-5 py-2.5 hover:bg-emerald-50">
            Upload more files
          </a>
          <a href="/" className="rounded-xl border border-slate-300 px-5 py-2.5 hover:bg-white">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border bg-white/80 backdrop-blur p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-slate-700">Your name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="Jane Doe"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm text-slate-700">Service</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          >
            <option value="">Select…</option>
            <option>Full-stack Web Development</option>
            <option>Content & Report Writing</option>
            <option>UI & UX Design</option>
            <option>Editing & Proofreading</option>
            <option>Research & Literature Review</option>
            <option>Presentation & Formatting</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-slate-700">Deadline</span>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </label>
        <label className="block md:col-span-1">
          <span className="text-sm text-slate-700">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="e.g., Lab report on optics"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-slate-700">Details</span>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded-xl border px-3 py-2"
          placeholder="Rubric, references, requirements…"
        />
      </label>

      <label className="block">
        <span className="text-sm text-slate-700">Attach files (optional)</span>
        <input
          type="file"
          multiple
          onChange={onPickFiles}
          className="mt-1 block w-full text-sm"
        />
        {files.length > 0 && (
          <p className="mt-1 text-xs text-slate-500">{files.length} file(s) selected</p>
        )}
      </label>

      <div className="mt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Request a Quote"}
        </button>
      </div>
    </form>
  );
}
