// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // In dev, swallow GETs to /api/reviews so logs stay quiet if anything still calls it
  if (
    process.env.NODE_ENV !== 'production' &&
    req.method === 'GET' &&
    pathname === '/api/reviews'
  ) {
    return new NextResponse('[]', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Also swallow HEAD/OPTIONS for extra silence
  if (
    process.env.NODE_ENV !== 'production' &&
    (req.method === 'HEAD' || req.method === 'OPTIONS') &&
    pathname === '/api/reviews'
  ) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/reviews'],
};
