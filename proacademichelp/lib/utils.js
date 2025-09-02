import fs from 'fs';
import path from 'path';

export const ROOT = process.cwd();
export const DATA_DIR = path.join(ROOT, 'data');
export const UPLOADS_DIR = path.join(ROOT, 'uploads');
export const UPLOADS_ARCHIVE_DIR = path.join(ROOT, 'uploads_archive');
export const REQUESTS_JSON = path.join(DATA_DIR, 'requests.json');
export const CONTACTS_JSON = path.join(DATA_DIR, 'contacts.json');
export const REVIEWS_JSON = path.join(DATA_DIR, 'reviews.json'); // ← NEW

export function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_ARCHIVE_DIR)) fs.mkdirSync(UPLOADS_ARCHIVE_DIR, { recursive: true });
  if (!fs.existsSync(REQUESTS_JSON)) fs.writeFileSync(REQUESTS_JSON, '[]');
  if (!fs.existsSync(CONTACTS_JSON)) fs.writeFileSync(CONTACTS_JSON, '[]');
  if (!fs.existsSync(REVIEWS_JSON)) fs.writeFileSync(REVIEWS_JSON, '[]'); // ← NEW
}

export function readJSONSafe(file, fallback = []) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8') || '[]'); }
  catch { return fallback; }
}

export function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function listFiles(dir) {
  ensureDirs();
  return fs.readdirSync(dir).map(name => ({
    name,
    size: fs.statSync(path.join(dir, name)).size,
    mtime: fs.statSync(path.join(dir, name)).mtimeMs
  })).sort((a,b)=>b.mtime-a.mtime);
}
