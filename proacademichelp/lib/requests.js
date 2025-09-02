// lib/requests.js
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const file = path.join(dataDir, 'requests.json');

export function readRequests() {
  try {
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export function writeRequests(list) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

export function removeRequest(id) {
  const list = readRequests();
  const next = list.filter((r) => r.id !== id);
  writeRequests(next);
}
