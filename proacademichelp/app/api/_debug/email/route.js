// app/api/_debug/email/route.js
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const ok = await sendMail({
    subject: "ProAcademicHelp — SMTP test",
    text: "This is a test email from the _debug endpoint.",
    html: "<p>This is a <b>test</b> email from the _debug endpoint.</p>",
  });

  return Response.json({ ok });
}
