// app/api/uploads/route.js
import { DEVDB } from "@/lib/devdb";
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Prefer env; fall back to the explicit token you shared (OK for local testing)
function getBlobToken() {
  const fromEnv = process.env.BLOB_READ_WRITE_TOKEN;
  if (fromEnv && fromEnv.trim()) return fromEnv.trim();
  console.warn(
    "[uploads] Using hardcoded BLOB token fallback. Move this to .env.local as BLOB_READ_WRITE_TOKEN for security."
  );
  return "vercel_blob_rw_tkEyupn404yoIHLn_k4wALS6mh1usYTwX1kEVkpdL0usz6Y";
}

function sanitizeName(name = "") {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function GET() {
  // Return newest first
  const uploads = (DEVDB.uploads || []).slice().reverse();
  return Response.json({ uploads });
}

export async function POST(req) {
  try {
    const token = getBlobToken();
    if (!token) {
      return Response.json(
        { ok: false, error: "Blob token missing" },
        { status: 500 }
      );
    }

    // Optional ?quoteId=... for linking deliverables
    const { searchParams } = new URL(req.url);
    const quoteId = searchParams.get("quoteId") || null;

    const form = await req.formData();
    const fileFields = [];

    for (const [, val] of form.entries()) {
      if (val && typeof val === "object" && "arrayBuffer" in val) {
        // It's a File
        fileFields.push(val);
      }
    }

    if (!fileFields.length) {
      return Response.json(
        { ok: false, error: "No files found" },
        { status: 400 }
      );
    }

    const uploaded = [];

    for (const file of fileFields) {
      const safeName = sanitizeName(file.name || "file");
      const pathname = `user-uploads/${Date.now()}-${safeName}`;

      const { url, pathname: blobPath } = await put(pathname, file, {
        access: "public",
        token, // <-- FIX: ensure comma after this line
        addRandomSuffix: true, // avoid collisions
        contentType: file.type || "application/octet-stream",
      });

      uploaded.push({
        id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
        name: file.name,
        size: file.size,
        type: file.type || "",
        url,            // public URL (use for "Open" buttons)
        path: blobPath, // optional internal path
        quoteId,
        createdAt: new Date().toISOString(),
      });
    }

    DEVDB.uploads = DEVDB.uploads || [];
    DEVDB.uploads.push(...uploaded);

    return Response.json({ ok: true, uploads: uploaded }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/uploads] error:", err);
    return Response.json(
      { ok: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
