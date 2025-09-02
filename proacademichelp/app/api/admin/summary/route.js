import { NextResponse } from 'next/server';
import { ensureDirs, listFiles, readJSONSafe, REQUESTS_JSON, UPLOADS_DIR } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  ensureDirs();

  const allReqs = readJSONSafe(REQUESTS_JSON, []);
  const activeReqs = allReqs.filter(r => (r.status ?? 'active') === 'active');

  const recentFiles = listFiles(UPLOADS_DIR).slice(0, 8);

  return NextResponse.json({
    counts: { files: recentFiles.length, requests: activeReqs.length },
    recentFiles,
    recentRequests: [...activeReqs].reverse().slice(0, 8),
    now: Date.now()
  });
}
