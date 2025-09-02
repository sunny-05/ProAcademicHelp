// Consistent dd/mm/yyyy, 24h clock, IST (Asia/Kolkata)
export const DATE_FMT = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Kolkata',
};

export function formatIn(ts) {
  const d = typeof ts === 'number' || typeof ts === 'string' ? new Date(ts) : ts;
  return new Intl.DateTimeFormat('en-GB', DATE_FMT).format(d);
}
