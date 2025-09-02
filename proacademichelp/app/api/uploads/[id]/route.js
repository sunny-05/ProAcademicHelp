// app/api/uploads/[id]/route.js
import { DEVDB } from "@/lib/devdb";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Delete a single upload (and try to remove the saved file if present) */
export async function DELETE(_req, { params }) {
  const { id } = params;

  // find in memory
  const idx = DEVDB.uploads.findIndex((u) => u.id === id);
  if (idx === -1) return Response.json({ ok: false, error: "Not found" }, { status: 404 });

  const [removed] = DEVDB.uploads.splice(idx, 1);

  // best-effort disk cleanup if you saved files under /public/user-uploads/...
  try {
    if (removed?.url?.startsWith("/user-uploads/")) {
      const diskPath = path.join(process.cwd(), "public", removed.url.replace(/^\/+/, ""));
      await fs.unlink(diskPath);
    }
  } catch {
    // ignore in dev
  }

  return Response.json({ ok: true, removed: removed?.id || null });
}
