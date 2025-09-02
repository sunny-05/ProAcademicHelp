// lib/mailer.js
import nodemailer from "nodemailer";

function haveEnv() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.MAIL_FROM &&
    process.env.MAIL_TO
  );
}

let transporter = null;

export async function getTransporter() {
  if (!haveEnv()) { console.warn("[mail] missing env"); return null; }
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = port === 465; // true for 465, false for 587

  try {
    console.log(`[mail] trying SMTP ${host} secure:${secure ? "465" : "587"}`);
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    // Verify connection once
    await transporter.verify().catch(() => {});
  } catch (err) {
    console.error("[mail] first SMTP attempt failed:", err?.message || err);
    // Fallback: try TLS:587 if first attempt was secure:465 (or vice-versa)
    try {
      const altSecure = !secure;
      const altPort = altSecure ? 465 : 587;
      console.log(`[mail] fallback SMTP ${host} TLS:${altPort}`);
      transporter = nodemailer.createTransport({
        host,
        port: altPort,
        secure: altSecure,
        auth: { user, pass },
      });
      await transporter.verify().catch(() => {});
    } catch (e2) {
      console.error("[mail] both SMTP attempts failed:", e2?.message || e2);
      transporter = null;
    }
  }

  return transporter;
}

export async function sendMail({ subject, text, html }) {
  const t = await getTransporter();
  if (!t) { console.warn("[mail] transporter unavailable; skipping send"); return false; }

  try {
    const info = await t.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: subject || "(no subject)",
      text: text || "",
      html: html || undefined,
    });
    console.log("[mail] sent:", info?.messageId || "(ok)");
    return true;
  } catch (err) {
    console.error("[mail] send error:", err);
    return false;
  }
}
