export const COMPANY = {
  name: 'ProAcedmicHelp',
  email: 'services.proacademichelp@gmail.com',     // <— change me
  phone: '+91 8210417806',             // <— change me (display)
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

// Helper for clickable tel: links
export const telHref = 'tel:' + COMPANY.phone.replace(/[^+\d]/g, '');
export const mailHref = `mailto:${COMPANY.email}`;
