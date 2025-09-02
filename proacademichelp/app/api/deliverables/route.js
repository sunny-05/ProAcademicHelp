// app/api/deliverables/route.js
import { DEVDB } from "@/lib/devdb";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// make sure store exists
DEVDB.deliverables = DEVDB.deliverables || [];

export async function GET() {
  return Response.json({ deliverables: DEVDB.deliverables });
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const files = form.getAll("files");
    const quoteId = (form.get("quoteId") || "").toString();
    const note = (form.get("note") || "").toString();

    if (!quoteId) return Response.json({ ok:false, error:"Missing quoteId" }, { status:400 });
    if (!files || files.length === 0) return Response.json({ ok:false, error:"No files" }, { status:400 });

    const dir = path.join(process.cwd(), "public", "deliverables");
    await fs.mkdir(dir, { recursive: true });

    const now = new Date().toISOString();
    const entries = [];

    for (const f of files) {
      // f is a Blob/File from FormData
      const ext = (f.name || "").split(".").pop() || "bin";
      const id = (crypto.randomUUID?.() || String(Date.now() + Math.random()));
      const filename = `${id}.${ext}`;
      const filePath = path.join(dir, filename);

      const buf = Buffer.from(await f.arrayBuffer());
      await fs.writeFile(filePath, buf);

      entries.push({
        id,
        quoteId,
        name: f.name || filename,
        size: buf.length,
        type: f.type || "",
        createdAt: now,
        note,
        url: `/deliverables/${filename}`,
      });
    }

    // newest first
    DEVDB.deliverables.unshift(...entries);
    return Response.json({ ok: true, entries }, { status: 201 });
  } catch (e) {
    console.error("[POST /api/deliverables] error:", e);
    return Response.json({ ok:false, error:"Upload failed" }, { status:500 });
  }
}
