// app/api/quotes/route.js
import { DEVDB } from "@/lib/devdb";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** List quotes (newest first) */
export async function GET() {
  return Response.json({ quotes: DEVDB.quotes || [] });
}

/** Create quote + email notification */
export async function POST(req) {
  try {
    const body = await req.json();

    const id  = (crypto.randomUUID?.() || String(Date.now() + Math.random())); // ← fixed
    const now = new Date().toISOString();

    const quote = {
      id,
      createdAt: now,
      status: "new",
      name: body.name || "",
      email: body.email || "",
      service: body.service || "",
      deadline: body.deadline || "",
      subject: body.subject || "",
      details: body.details || "",
      files: Array.isArray(body.files) ? body.files : [],
    };

    // newest first in dev memory
    DEVDB.quotes = DEVDB.quotes || [];
    DEVDB.quotes.unshift(quote);

    // Email (safe; logs if SMTP not configured)
    const site = process.env.SITE_URL || "http://localhost:3000";
    const detailsUrl = `${site}/requests/${id}`;

    await sendMail({
      subject: `New Quote Request — ${quote.name || "Unknown"} — ${quote.service || "Service"}`,
      text:
`New quote request.

Name: ${quote.name}
Email: ${quote.email}
Service: ${quote.service}
Subject: ${quote.subject}
Deadline: ${quote.deadline}
Created: ${quote.createdAt}

Details:
${quote.details || "-"}

Open: ${detailsUrl}
Dashboard: ${site}/dashboard`,
      html:
`<h2>New Quote Request</h2>
<p><b>Name:</b> ${quote.name || "-"}<br/>
<b>Email:</b> ${quote.email || "-"}<br/>
<b>Service:</b> ${quote.service || "-"}<br/>
<b>Subject:</b> ${quote.subject || "-"}<br/>
<b>Deadline:</b> ${quote.deadline || "-"}</p>
<p><b>Created:</b> ${quote.createdAt}</p>
<p><b>Details:</b><br/>${(quote.details || "-").replace(/\n/g, "<br/>")}</p>
<p><a href="${detailsUrl}">Open details</a> · <a href="${site}/dashboard">Dashboard</a></p>`,
    });

    return Response.json({ ok: true, id, quote }, { status: 201 });
  } catch (e) {
    console.error("[POST /api/quotes] error:", e);
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
