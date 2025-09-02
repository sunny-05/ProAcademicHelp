// app/api/requests/route.js
import { NextResponse } from 'next/server';
import { readRequests, writeRequests, removeRequest } from '@/lib/requests';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// List requests (Dashboard uses server read, but this helps client actions)
export async function GET() {
  const list = readRequests();
  return NextResponse.json(list, { status: 200 });
}

// Create a request
export async function POST(request) {
  const ctype = request.headers.get('content-type') || '';
  let payload = {};
  if (ctype.includes('application/json')) payload = await request.json();
  else payload = Object.fromEntries((await request.formData()).entries());

  const now = new Date().toISOString();
  const id =
    globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const item = {
    id,
    createdAt: now,
    name: (payload.name || '').toString().trim(),
    email: (payload.email || '').toString().trim(),
    phone: (payload.phone || '').toString().trim(),
    service: (payload.service || '').toString(),
    deadline: (payload.deadline || '').toString(),
    details: (payload.details || '').toString(),
    agree: String(payload.agree || '') === 'on' || String(payload.agree || '') === 'true',
    source: (payload.source || 'home').toString(), // optional
    estimatedOffPercent: Number(payload.estimatedOffPercent || 40),
  };

  const list = readRequests();
  list.push(item);
  writeRequests(list);

  return NextResponse.json({ ok: true, item }, { status: 201 });
}

// Delete by id
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  removeRequest(id);
  return NextResponse.json({ ok: true }, { status: 200 });
}
