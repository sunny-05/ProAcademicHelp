// // app/requests/[id]/page.jsx
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// async function safeJSON(res) {
//   try {
//     if (!res.ok) {
//       const t = await res.text().catch(() => "");
//       console.error("API error", res.status, res.url, t);
//       return null;
//     }
//     const t = await res.text();
//     if (!t) return null;
//     return JSON.parse(t);
//   } catch (e) {
//     console.error("Failed to parse JSON for", res?.url, e);
//     return null;
//   }
// }

// function prettyBytes(n) {
//   if (!Number.isFinite(n)) return "—";
//   const u = ["B","KB","MB","GB","TB"]; let i = 0;
//   while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
//   return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
// }

// export default function RequestDetailsPage({ params }) {
//   const { id } = params;
//   const [quote, setQuote] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   async function load() {
//     setLoading(true);
//     try {
//       const [qRes, uRes] = await Promise.all([
//         fetch(`/api/quotes/${id}`, { cache: "no-store" }),
//         fetch(`/api/uploads?quoteId=${id}`, { cache: "no-store" }),
//       ]);
//       const q = await safeJSON(qRes);
//       const u = await safeJSON(uRes);
//       setQuote(q?.quote || null);
//       setUploads(u?.uploads || []);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { load(); }, [id]);

//   async function setStatus(status) {
//     const res = await fetch(`/api/quotes/${id}`, {
//       method: "PATCH",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ status }),
//     });
//     if (!res.ok) { alert("Failed to update status"); return; }
//     await load();
//   }

//   if (loading) {
//     return (
//       <section className="mx-auto max-w-5xl px-4 py-12">
//         <p>Loading…</p>
//       </section>
//     );
//   }

//   if (!quote) {
//     return (
//       <section className="mx-auto max-w-5xl px-4 py-12">
//         <p className="text-rose-600">Request not found.</p>
//         <Link href="/dashboard" className="mt-4 inline-block rounded-xl border px-4 py-2 hover:bg-white">
//           Back to Dashboard
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
//       <div className="flex items-start justify-between gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
//           Request details
//         </h1>
//         <Link href="/dashboard" className="rounded-xl border px-4 py-2 hover:bg-white">Back</Link>
//       </div>

//       <div className="mt-6 grid gap-6 md:grid-cols-2">
//         <div className="rounded-2xl border bg-white p-5 shadow-sm">
//           <h2 className="font-semibold text-slate-900">Overview</h2>
//           <dl className="mt-3 space-y-2 text-sm">
//             <div className="flex justify-between gap-4">
//               <dt className="text-slate-600">Status</dt>
//               <dd className="font-medium">{quote.status}</dd>
//             </div>
//             <div className="flex justify-between gap-4">
//               <dt className="text-slate-600">Created</dt>
//               <dd className="font-medium">{new Date(quote.createdAt).toLocaleString()}</dd>
//             </div>
//             <div className="flex justify-between gap-4">
//               <dt className="text-slate-600">Deadline</dt>
//               <dd className="font-medium">{quote.deadline || "—"}</dd>
//             </div>
//           </dl>

//           <div className="mt-4 flex flex-wrap gap-2">
//             <button
//               type="button"
//               onClick={() => setStatus("new")}
//               className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900"
//             >
//               Mark as new
//             </button>
//             <button
//               type="button"
//               onClick={() => setStatus("in-progress")}
//               className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
//             >
//               Mark in-progress
//             </button>
//             <button
//               type="button"
//               onClick={() => setStatus("completed")}
//               className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700"
//             >
//               Mark completed
//             </button>
//           </div>
//         </div>

//         <div className="rounded-2xl border bg-white p-5 shadow-sm">
//           <h2 className="font-semibold text-slate-900">Client</h2>
//           <dl className="mt-3 space-y-2 text-sm">
//             <div className="flex justify-between gap-4">
//               <dt className="text-slate-600">Name</dt>
//               <dd className="font-medium">{quote.name || "—"}</dd>
//             </div>
//             <div className="flex justify-between gap-4">
//               <dt className="text-slate-600">Email</dt>
//               <dd className="font-medium">{quote.email || "—"}</dd>
//             </div>
//             <div className="flex justify-between gap-4">
//               <dt className="text-slate-600">Service</dt>
//               <dd className="font-medium">{quote.service || "—"}</dd>
//             </div>
//             <div className="mt-3">
//               <dt className="text-slate-600">Subject</dt>
//               <dd className="font-medium break-words">{quote.subject || "—"}</dd>
//             </div>
//             <div className="mt-3">
//               <dt className="text-slate-600">Details</dt>
//               <dd className="text-slate-800 whitespace-pre-wrap">{quote.details || "—"}</dd>
//             </div>
//           </dl>
//         </div>
//       </div>

//       <div className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
//         <div className="mb-3 flex items-center justify-between">
//           <h2 className="font-semibold text-slate-900">Attached files</h2>
//           <Link
//             href={`/upload?quoteId=${id}`}
//             className="rounded-lg border px-3 py-1.5 text-sm hover:bg-white"
//           >
//             Add files
//           </Link>
//         </div>

//         {uploads.length === 0 ? (
//           <p className="text-slate-600 text-sm">No files uploaded for this request.</p>
//         ) : (
//           <ul className="grid gap-3 sm:grid-cols-2">
//             {uploads.map((u) => {
//               const isImage = (u.type || "").startsWith("image/");
//               return (
//                 <li key={u.id} className="rounded-xl border p-3">
//                   <div className="flex gap-3">
//                     {isImage && u.url ? (
//                       <img src={u.url} alt={u.name} className="h-16 w-16 rounded object-cover" />
//                     ) : (
//                       <div className="h-16 w-16 rounded bg-slate-100 flex items-center justify-center text-slate-500">
//                         {u.type || "file"}
//                       </div>
//                     )}
//                     <div className="min-w-0">
//                       <a
//                         href={u.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block truncate font-medium hover:underline"
//                         title={u.name}
//                       >
//                         {u.name}
//                       </a>
//                       <p className="text-xs text-slate-600">
//                         {prettyBytes(u.size)} • {u.type || "file"} • {new Date(u.createdAt).toLocaleString()}
//                       </p>
//                       {u.note && <p className="mt-1 text-sm text-slate-800 line-clamp-2">{u.note}</p>}
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </section>
//   );
// }

//  can be deleted

// app/requests/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function prettyDate(iso) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

export default function RequestDetailsPage({ params }) {
  const { id } = params;
  const [quote, setQuote] = useState(null);
  const [deliverables, setDeliverables] = useState([]);

  async function load() {
    try {
      // You may already have a quote details endpoint; if not, pull from the list and find it:
      const qRes = await fetch("/api/quotes", { cache: "no-store" });
      const q = await qRes.json().catch(() => null);
      const found = q?.quotes?.find((x) => x.id === id) || null;
      setQuote(found);

      const dRes = await fetch(`/api/deliverables?quoteId=${id}`, { cache: "no-store" });
      const d = await dRes.json().catch(() => null);
      setDeliverables(d?.deliverables || []);
    } catch (e) {
      console.error("load failed", e);
    }
  }

  useEffect(() => { load(); }, [id]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Request details</h1>
        <Link href="/dashboard" className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-white">
          Back to Dashboard
        </Link>
      </div>

      {quote ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="grid gap-2 sm:grid-cols-2">
            <p><b>ID:</b> {quote.id}</p>
            <p><b>Status:</b> {quote.status}</p>
            <p><b>Name:</b> {quote.name}</p>
            <p><b>Email:</b> {quote.email}</p>
            <p><b>Service:</b> {quote.service}</p>
            <p><b>Deadline:</b> {quote.deadline}</p>
            <p className="sm:col-span-2"><b>Subject:</b> {quote.subject}</p>
            <p className="sm:col-span-2"><b>Details:</b> {quote.details}</p>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-slate-600">Loading request…</p>
      )}

      <h2 className="mt-10 text-2xl font-semibold">Deliverables</h2>
      {deliverables.length === 0 ? (
        <p className="mt-2 text-slate-600">No deliverables uploaded yet.</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {deliverables.map((d) => (
            <li key={d.id} className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{d.name}</p>
                  <p className="text-sm text-slate-600">Uploaded: {prettyDate(d.createdAt)}</p>
                  {d.note ? <p className="mt-1 text-sm text-slate-700">Note: {d.note}</p> : null}
                </div>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700"
                >
                  Open
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
