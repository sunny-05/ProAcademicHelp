// // app/dashboard/page.jsx
// "use client";



// import { useEffect, useState } from "react";

// // --- safe JSON helper (won’t crash UI) ---
// async function safeJSON(res) {
//   try {
//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       console.error("API error", res.status, res.url, text);
//       return null;
//     }
//     const text = await res.text();
//     if (!text) return null;
//     return JSON.parse(text);
//   } catch (e) {
//     console.error("Failed to parse JSON from", res.url, e);
//     return null;
//   }
// }

// // pretty size helper
// function prettyBytes(n) {
//   if (!Number.isFinite(n)) return "—";
//   const u = ["B", "KB", "MB", "GB", "TB"];
//   let i = 0;
//   while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
//   return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
// }

// export default function DashboardPage() {
//   const [quotes, setQuotes]   = useState([]);
//   const [uploads, setUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState("");

//   async function load() {
//     setLoading(true);
//     setError("");
//     try {
//       const [qRes, uRes] = await Promise.all([
//         fetch("/api/quotes",  { cache: "no-store" }),
//         fetch("/api/uploads", { cache: "no-store" }),
//       ]);
//       const q = await safeJSON(qRes);
//       const u = await safeJSON(uRes);
//       setQuotes(q?.quotes || []);
//       setUploads(u?.uploads || []);
//     } catch (e) {
//       console.error("Dashboard load failed:", e);
//       setError("Could not load data.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { load(); }, []);

//   async function setStatus(id, status) {
//     const res = await fetch(`/api/quotes/${id}`, {
//       method: "PATCH",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ status }),
//     });
//     if (!res.ok) { alert("Failed to update status"); return; }
//     await load();
//   }

//   async function deleteQuote(id) {
//     if (!confirm("Delete this request?")) return;
//     const res = await fetch(`/api/quotes/${id}`, { method: "DELETE" });
//     if (!res.ok) { alert("Failed to delete"); return; }
//     await load();
//   }

//   async function deleteUpload(id) {
//     if (!confirm("Delete this file?")) return;
//     const res = await fetch(`/api/uploads/${id}`, { method: "DELETE" });
//     if (!res.ok) { alert("Failed to delete"); return; }
//     await load();
//   }

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
//       <div className="flex items-center justify-between gap-3">
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
//         <button
//           type="button"
//           onClick={load}
//           className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-white"
//         >
//           {loading ? "Refreshing…" : "Refresh"}
//         </button>
//       </div>

//       {error && (
//         <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-rose-700 border border-rose-200">
//           {error}
//         </p>
//       )}

//       {/* --- New Requests --- */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold">New requests</h2>
//         {quotes.filter(q => q.status !== "completed").length === 0 ? (
//           <p className="text-slate-600 mt-2">No new requests.</p>
//         ) : (
//           <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {quotes.filter(q => q.status !== "completed").map((q) => (
//               <li key={q.id} className="rounded-xl border bg-white p-4 shadow-sm">
//                 <h3 className="font-medium text-slate-900">{q.subject || "Untitled"}</h3>
//                 <p className="text-sm text-slate-600 mt-1">{q.name} • {q.email}</p>
//                 <div className="mt-3 flex gap-2 flex-wrap">
//                   <button
//                     type="button"
//                     onClick={() => setStatus(q.id, "completed")}
//                     className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700"
//                   >
//                     Mark completed
//                   </button>
//                   {/* 🔗 Updated View link */}
//                   <a
//                     href={`/requests/${q.id}`}
//                     className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-white"
//                   >
//                     View
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => deleteQuote(q.id)}
//                     className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* --- Completed Work --- */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold">Completed work</h2>
//         {quotes.filter(q => q.status === "completed").length === 0 ? (
//           <p className="text-slate-600 mt-2">No completed work yet.</p>
//         ) : (
//           <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {quotes.filter(q => q.status === "completed").map((q) => (
//               <li key={q.id} className="rounded-xl border bg-white p-4 shadow-sm">
//                 <h3 className="font-medium text-slate-900">{q.subject || "Untitled"}</h3>
//                 <p className="text-sm text-slate-600 mt-1">{q.name} • {q.email}</p>
//                 <div className="mt-3 flex gap-2 flex-wrap">
//                   <button
//                     type="button"
//                     onClick={() => setStatus(q.id, "new")}
//                     className="rounded-xl bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900"
//                   >
//                     Mark as new
//                   </button>
//                   {/* 🔗 Updated View link */}
//                   <a
//                     href={`/requests/${q.id}`}
//                     className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-white"
//                   >
//                     View
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => deleteQuote(q.id)}
//                     className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* --- Recent Uploads --- */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold">Recent uploads</h2>
//         {uploads.length === 0 ? (
//           <p className="text-slate-600 mt-2">No uploads yet.</p>
//         ) : (
//           <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {uploads.map((u) => (
//               <li key={u.id} className="rounded-xl border bg-white p-4 shadow-sm">
//                 <h3 className="font-medium truncate">{u.name}</h3>
//                 <p className="text-xs text-slate-600">{prettyBytes(u.size)} • {u.type}</p>
//                 <div className="mt-3 flex gap-2 flex-wrap">
//                   <a
//                     href={u.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-white"
//                   >
//                     Open
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => deleteUpload(u.id)}
//                     className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </section>
//   );
// }

// can be changed

// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import DeliverableUpload from "@/components/DeliverableUpload";

/* utils */
async function safeJSON(res){try{if(!res.ok){const t=await res.text().catch(()=> "");console.error("API",res.status,res.url,t);return null;}const t=await res.text();if(!t)return null;return JSON.parse(t);}catch(e){console.error("parse",res.url,e);return null;}}
function prettyBytes(n){if(!Number.isFinite(n))return"—";const u=["B","KB","MB","GB","TB"];let i=0;while(n>=1024&&i<u.length-1){n/=1024;i++;}return`${n.toFixed(n<10&&i>0?1:0)} ${u[i]}`;}
function prettyDate(iso){try{return new Date(iso).toLocaleString();}catch{return iso||"—";}}

export default function DashboardPage(){
  const [quotes,setQuotes]=useState([]);
  const [uploads,setUploads]=useState([]);
  const [deliverables,setDeliverables]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [openDeliverableFor, setOpenDeliverableFor] = useState(null);

  async function load(){
    setLoading(true); setError("");
    try{
      const [qRes,uRes,dRes]=await Promise.all([
        fetch("/api/quotes",{cache:"no-store"}),
        fetch("/api/uploads",{cache:"no-store"}),
        fetch("/api/deliverables",{cache:"no-store"}),
      ]);
      const q=await safeJSON(qRes);
      const u=await safeJSON(uRes);
      const d=await safeJSON(dRes);

      setQuotes(q?.quotes||[]);
      setUploads(u?.uploads||[]);
      setDeliverables(d?.deliverables||[]);
    }catch(e){console.error(e); setError("Could not load data.");}
    finally{setLoading(false);}
  }
  useEffect(()=>{load();},[]);

  async function setStatus(id,status){
    try{
      const res=await fetch(`/api/quotes/${id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({status})});
      if(!res.ok) throw 0;
      await load();
    }catch{alert("Failed to update status");}
  }
  async function deleteQuote(id){
    if(!confirm("Delete this request?"))return;
    const res=await fetch(`/api/quotes/${id}`,{method:"DELETE"});
    if(!res.ok){alert("Failed to delete");return;}
    await load();
  }
  async function deleteUpload(id){
    if(!confirm("Delete this uploaded file?"))return;
    const res=await fetch(`/api/uploads/${id}`,{method:"DELETE"});
    if(!res.ok){alert("Failed to delete");return;}
    await load();
  }

  const newQuotes = quotes.filter(q => (q.status||"new")!=="completed");
  const completedQuotes = quotes.filter(q => q.status==="completed");
  const deliverablesByQuote = deliverables.reduce((m, d)=>{
    (m[d.quoteId]=m[d.quoteId]||[]).push(d); return m;
  }, {});

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
        <button type="button" onClick={load} className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-white">
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-rose-700 border border-rose-200">{error}</p>}

      {/* New requests */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">New requests</h2>
        {newQuotes.length===0 ? <p className="mt-2 text-slate-600">No new requests.</p> : (
          <ul className="mt-4 grid gap-4">
            {newQuotes.map(q=>(
              <li key={q.id} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-[240px]">
                    <p className="font-medium text-slate-900">{q.subject || "(no subject)"}</p>
                    <p className="text-sm text-slate-600">{q.name} • {q.email}</p>
                    <p className="text-sm text-slate-600">Service: {q.service || "—"}</p>
                    <p className="text-xs text-slate-500">Created: {prettyDate(q.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button onClick={()=>setStatus(q.id,"completed")} className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700">Mark completed</button>
                    <a href={`/requests/${q.id}`} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-white">View</a>
                    <button
                      onClick={()=>setOpenDeliverableFor(openDeliverableFor===q.id?null:q.id)}
                      className="rounded-xl border border-emerald-300 px-3 py-1.5 text-sm hover:bg-emerald-50"
                    >
                      {openDeliverableFor===q.id?"Close deliverable upload":"Upload deliverable"}
                    </button>
                    <button onClick={()=>deleteQuote(q.id)} className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700">Delete</button>
                  </div>
                </div>

                {/* Inline deliverables list (if any) */}
                {deliverablesByQuote[q.id]?.length ? (
                  <ul className="mt-3 grid gap-2">
                    {deliverablesByQuote[q.id].map(d=>(
                      <li key={d.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{d.name}</p>
                          <p className="text-xs text-slate-600">{prettyBytes(d.size)} • {prettyDate(d.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={d.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white hover:bg-slate-900">Open</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ): null}

                {/* Inline uploader */}
                {openDeliverableFor===q.id && (
                  <div className="mt-3">
                    <DeliverableUpload quoteId={q.id} onDone={()=>{ setOpenDeliverableFor(null); load(); }} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Completed work */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Completed work</h2>
        {completedQuotes.length===0 ? <p className="mt-2 text-slate-600">Nothing marked completed yet.</p> : (
          <ul className="mt-4 grid gap-4">
            {completedQuotes.map(q=>(
              <li key={q.id} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-[240px]">
                    <p className="font-medium text-slate-900">{q.subject || "(no subject)"}</p>
                    <p className="text-sm text-slate-600">{q.name} • {q.email}</p>
                    <p className="text-sm text-slate-600">Service: {q.service || "—"}</p>
                    <p className="text-xs text-slate-500">Created: {prettyDate(q.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button onClick={()=>setStatus(q.id,"new")} className="rounded-xl bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900">Mark as new</button>
                    <a href={`/requests/${q.id}`} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-white">View</a>
                    <button
                      onClick={()=>setOpenDeliverableFor(openDeliverableFor===q.id?null:q.id)}
                      className="rounded-xl border border-emerald-300 px-3 py-1.5 text-sm hover:bg-emerald-50"
                    >
                      {openDeliverableFor===q.id?"Close deliverable upload":"Upload deliverable"}
                    </button>
                    <button onClick={()=>deleteQuote(q.id)} className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700">Delete</button>
                  </div>
                </div>

                {/* Show deliverables already uploaded for this quote */}
                {deliverablesByQuote[q.id]?.length ? (
                  <ul className="mt-3 grid gap-2">
                    {deliverablesByQuote[q.id].map(d=>(
                      <li key={d.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{d.name}</p>
                          <p className="text-xs text-slate-600">{prettyBytes(d.size)} • {prettyDate(d.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={d.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white hover:bg-slate-900">Open</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ): null}

                {openDeliverableFor===q.id && (
                  <div className="mt-3">
                    <DeliverableUpload quoteId={q.id} onDone={()=>{ setOpenDeliverableFor(null); load(); }} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Client uploads (unchanged) */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Recent client uploads</h2>
        {uploads.length === 0 ? (
          <p className="mt-2 text-slate-600">No files uploaded yet.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {uploads.map((u) => (
              <li key={u.id} className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{u.name}</p>
                    <p className="text-sm text-slate-600">
                      {u.type || "file"} • {prettyBytes(u.size)} • {prettyDate(u.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {u.url ? (
                      <a href={u.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900">Open</a>
                    ) : null}
                    <button onClick={()=>deleteUpload(u.id)} className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
