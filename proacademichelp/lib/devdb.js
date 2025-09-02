// lib/devdb.js
const g = globalThis;
if (!g.__PA_DEVDB__) {
  g.__PA_DEVDB__ = {
    quotes: [],
    uploads: [],
    reviews: [],   // ← add this line
    deliverables: [],  // developer uploads (final work)
  };
}
export const DEVDB = g.__PA_DEVDB__;
