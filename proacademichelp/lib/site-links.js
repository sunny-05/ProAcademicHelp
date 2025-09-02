// lib/site-links.js

// WhatsApp
export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ??
  "https://wa.me/919341315700?text=Hi%20ProAcademicHelp%2C%20I%27d%20like%20a%20quote%20for%20my%20assignment.";

// Email
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "services.proacademichelp@gmail.com";



// Phone (display + tel link)
// You can override both via env vars; otherwise we use the requested number.
export const CONTACT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 82104 17806";

// Try to generate a tel: link from the display number if a specific one isn't provided.
export const CONTACT_PHONE_TEL =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL ??
  ("tel:" +
    CONTACT_PHONE_DISPLAY.replace(/[^\d+]/g, "").replace(/^(\+)?(\d.*)$/, "+$2").replace(/^\+/, "+"));
