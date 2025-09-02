export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mask(v, keep = 2) {
  if (!v) return "";
  if (v.length <= keep * 2) return "*".repeat(v.length);
  return v.slice(0, keep) + "*".repeat(v.length - keep * 2) + v.slice(-keep);
}

export async function GET() {
  const env = {
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: process.env.SMTP_PORT || "",
    SMTP_SECURE: process.env.SMTP_SECURE || "",
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: mask(process.env.SMTP_PASS || "", 2),
    MAIL_FROM: process.env.MAIL_FROM || "",
    MAIL_TO: process.env.MAIL_TO || "",
  };
  return Response.json({ env });
}
