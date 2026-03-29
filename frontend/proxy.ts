// ---------------------------------------------------------------------------
// Next.js 16 Proxy (replaces middleware.ts) — first line of defence for all
// admin routes.
//
// Protects:
//   /admin/*           Browser pages (except /admin/login)
//   /api/admin/*       API routes (except /api/admin/login and /api/admin/logout)
//
// Uses Web Crypto API (available in Edge Runtime) to verify the HMAC-signed
// session token stored in the `admin_auth` httpOnly cookie.
//
// NOTE: Every /api/admin/* handler also calls assertAdmin() as a second,
// independent check — never rely on the proxy alone.
// ---------------------------------------------------------------------------

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // must match lib/auth.ts

async function verifyToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false;

  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;

  const iatStr = token.slice(0, dotIndex);
  const sigHex = token.slice(dotIndex + 1);

  const iat = parseInt(iatStr, 10);
  if (isNaN(iat) || Date.now() - iat > SESSION_MAX_AGE_MS) return false;

  const encoder = new TextEncoder();

  let key: CryptoKey;
  try {
    key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
  } catch {
    return false;
  }

  const expectedBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`admin.${iatStr}`)
  );

  const expectedHex = Array.from(new Uint8Array(expectedBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Constant-time comparison
  if (sigHex.length !== expectedHex.length) return false;
  let diff = 0;
  for (let i = 0; i < sigHex.length; i++) {
    diff |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
  }
  return diff === 0;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Always allow login/logout — they handle their own auth logic and must
  // remain accessible for users with expired sessions.
  const isExempt =
    pathname === '/admin/login' ||
    pathname === '/admin/login/' ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/logout');

  if (isExempt) return NextResponse.next();

  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const secret = process.env.ADMIN_SESSION_SECRET ?? '';
  const token = request.cookies.get('admin_auth')?.value ?? '';
  const valid = token ? await verifyToken(token, secret) : false;

  if (!valid) {
    if (isAdminApi) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
