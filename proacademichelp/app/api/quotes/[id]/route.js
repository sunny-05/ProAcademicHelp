// app/api/quotes/[id]/route.js
import { DEVDB } from "@/lib/devdb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Get a single quote */
export async function GET(_req, { params }) {
  const { id } = params;
  const q = DEVDB.quotes.find((x) => x.id === id);
  if (!q) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, quote: q });
}

/** Update status of a single quote */
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const status = String(body?.status || "").toLowerCase();
    const allowed = new Set(["new", "in-progress", "completed"]);
    if (!allowed.has(status)) {
      return Response.json({ ok: false, error: "Invalid status" }, { status: 400 });
    }
    const q = DEVDB.quotes.find((x) => x.id === id);
    if (!q) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    q.status = status;
    return Response.json({ ok: true, quote: q });
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}

/** Delete a single quote */
export async function DELETE(_req, { params }) {
  const { id } = params;
  const before = DEVDB.quotes.length;
  DEVDB.quotes = DEVDB.quotes.filter((q) => q.id !== id);
  const removed = before - DEVDB.quotes.length;
  return Response.json({ ok: true, removed });
}
