// components/DeliverableUpload.jsx
"use client";

import { useState } from "react";

export default function DeliverableUpload({ quoteId, onDone }) {
  const [files, setFiles] = useState([]);
  const [note, setNote]   = useState("");
  const [busy, setBusy]   = useState(false);

  async function handleUpload() {
    if (!quoteId) { alert("Missing request id."); return; }
    if (files.length === 0) { alert("Please choose a file."); return; }
    setBusy(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      fd.append("note", note);
      fd.append("quoteId", quoteId);

      const res = await fetch("/api/deliverables", { method: "POST", body: fd });
      if (!res.ok) throw new Error("upload failed");
      const data = await res.json();

      // optional: local fallback
      try {
        const local = JSON.parse(localStorage.getItem("pa_deliverables") || "[]");
        localStorage.setItem("pa_deliverables", JSON.stringify([...(data.entries||[]), ...local]));
      } catch {}

      setFiles([]); setNote("");
      onDone?.();
    } catch {
      alert("Sorry, failed to upload deliverable.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
      <p className="font-medium text-slate-900">Upload deliverable</p>
      <p className="text-sm text-slate-600">Attach finished files for this request (ID: {quoteId}).</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] items-center">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.currentTarget.files || []))}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        />
        <button
          type="button"
          disabled={busy}
          onClick={handleUpload}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note for the client…"
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        rows={2}
      />
    </div>
  );
}
