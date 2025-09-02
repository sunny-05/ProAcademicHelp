// app/api/reviews/route.js
import { DEVDB } from "@/lib/devdb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// List all reviews (newest first)
export async function GET() {
  return Response.json({ reviews: DEVDB.reviews || [] });
}

// Create a review
export async function POST(req) {
  try {
    const body = await req.json();

    const id      = crypto.randomUUID?.() || String(Date.now() + Math.random());
    const now     = new Date().toISOString();
    const name    = (body.name || "").trim() || "Anonymous";
    const rating  = Math.max(1, Math.min(5, Number(body.rating) || 5));
    const comment = (body.comment || "").trim();
    const project = (body.project || "").trim(); // optional

    const review = { id, createdAt: now, name, rating, comment, project };

    DEVDB.reviews.unshift(review); // newest first
    return Response.json({ ok: true, review }, { status: 201 });
  } catch (e) {
    console.error("[POST /api/reviews] error:", e);
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
