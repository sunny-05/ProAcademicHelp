// lib/reviews.js
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const file = path.join(dataDir, 'reviews.json');

export function readReviews() {
  try {
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export function writeReviews(list) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
}
