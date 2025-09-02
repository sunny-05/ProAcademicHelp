// app/api/uploads/route.js
import { DEVDB } from "@/lib/devdb";
import { promises as fs } from "node:fs";
import path from "node:path";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Directory to store public files
const uploadDir = path.join(process.cwd(), "public", "user-uploads");

/** GET /api/uploads
 *  Optional filter: /api/uploads?quoteId=XYZ
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const quoteId = searchParams.get("quoteId");
  let list = DEVDB.uploads || [];
  if (quoteId) list = list.filter((u) => u.quoteId === quoteId);
  return Response.json({ uploads: list });
}

/** POST /api/uploads
 *  Accepts multipart/form-data:
 *   - files (one or many)
 *   - note (optional)
 *   - quoteId (optional)
 *  Saves to /public/user-uploads/<unique>
 *  Returns entries with public url (/user-uploads/<unique>)
 */
export async function POST(req) {
  try {
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    if (!ct.includes("multipart/form-data")) {
      return Response.json(
        { ok: false, error: "Use multipart/form-data with 'files' field" },
        { status: 415 }
      );
    }

    await fs.mkdir(uploadDir, { recursive: true });

    const form = await req.formData();
    const note = form.get("note") || "";
    const quoteId = form.get("quoteId") || "";
    const files = form.getAll("files");

    if (!files || files.length === 0) {
      return Response.json({ ok: false, error: "No files received" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const entries = [];

    for (const f of files) {
      if (!f || typeof f !== "object" || !("arrayBuffer" in f)) continue;

      const orig = String(f.name || "file").replace(/[^a-z0-9.\-_]/gi, "_");
      const uniq = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${orig}`;
      const diskPath = path.join(uploadDir, uniq);

      const buf = Buffer.from(await f.arrayBuffer());
      await fs.writeFile(diskPath, buf);

      const url = `/user-uploads/${uniq}`;

      entries.push({
        id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
        createdAt: now,
        name: f.name || orig,
        size: f.size || buf.length,
        type: f.type || "",
        url,       // ← critical for Dashboard "Open"
        note,
        quoteId,
      });
    }

    if (entries.length === 0) {
      return Response.json({ ok: false, error: "No valid files received" }, { status: 400 });
    }

    // Persist newest-first
    DEVDB.uploads.unshift(...entries);

    // -------------------------------
    // EMAIL NOTIFICATION (POST end)
    // -------------------------------
    const site = process.env.SITE_URL || "http://localhost:3000";
    const subject = `New Upload (${entries.length} file${entries.length > 1 ? "s" : ""})`;

    const listTxt = entries
      .map((e) => `• ${e.name} (${e.type || "file"}, ${e.size} bytes) → ${site}${e.url}`)
      .join("\n");

    const listHtml = entries
      .map(
        (e) =>
          `<li>${e.name} (${e.type || "file"}, ${e.size} bytes) — <a href="${site}${e.url}">Open</a></li>`
      )
      .join("");

    await sendMail({
      subject,
      text:
`New file(s) uploaded${quoteId ? ` for quote ${quoteId}` : ""}.

${listTxt}

Dashboard: ${site}/dashboard
${quoteId ? `Request: ${site}/requests/${quoteId}` : ""}`,
      html:
`<h2>New Upload${entries.length > 1 ? "s" : ""}</h2>
${quoteId ? `<p><b>Quote:</b> <a href="${site}/requests/${quoteId}">${quoteId}</a></p>` : ""}
<ul>${listHtml}</ul>
<p><a href="${site}/dashboard">Dashboard</a></p>`,
    });
    // -------------------------------

    return Response.json({ ok: true, entries }, { status: 201 });
  } catch (err) {
    console.error("[POST] /api/uploads error:", err);
    return Response.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}
