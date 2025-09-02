"use client";

import { useRef, useState } from "react";

export default function UploadForm() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);

  function onChoose(e) {
    setFiles(Array.from(e.target.files || []));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (files.length === 0) { alert("Please choose at least one file."); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));      // multiple files under key "files"
      fd.append("note", note);
      fd.append("email", email);

      // IMPORTANT: plural endpoint
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());

      // Go see them on the dashboard
      window.location.assign("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Upload failed. See console for details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 h-11"
      />

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Short context for the file…"
        className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2"
      />

      <input
        ref={fileRef}
        type="file"
        multiple
        onChange={onChoose}
        className="block"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,image/*,.zip,.rar"
      />

      <button
        type="submit"
        disabled={submitting || files.length === 0}
        className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {submitting ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
