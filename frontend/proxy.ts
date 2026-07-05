// ---------------------------------------------------------------------------
// Next.js 16 Proxy (replaces middleware.ts)
//
// 1. First line of defence for all admin routes.
//    Protects /admin/* and /api/admin/* (except login/logout).
// 2. A/B Test Variant Assignment.
//    Assigns visitors to experiment variants for testing.
// ---------------------------------------------------------------------------

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // must match lib/auth.ts

// A/B testing config
const EXPERIMENTS: Record<string, string[]> = {
  hero_headline: ["A", "B"],   // A = control, B = benefit-led
  cta_color: ["A", "B"],       // A = gold CTA, B = white high-contrast CTA
};
const AB_COOKIE_NAME = "ab_variants";
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function assignVariant(variants: string[]): string {
  return variants[Math.floor(Math.random() * variants.length)];
}

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

  // 1. Admin Access Protection
  const isExempt =
    pathname === '/admin/login' ||
    pathname === '/admin/login/' ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/logout');

  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if ((isAdminPage || isAdminApi) && !isExempt) {
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
  }

  // 2. A/B Testing Variant Assignment
  const response = NextResponse.next();

  const isPublicPage =
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/admin") &&
    !pathname.match(/\.(ico|png|jpg|svg|webp|woff2?)$/);

  if (isPublicPage) {
    let assignments: Record<string, string> = {};
    try {
      const raw = request.cookies.get(AB_COOKIE_NAME)?.value;
      if (raw) assignments = JSON.parse(decodeURIComponent(raw));
    } catch {
      // start fresh
    }

    let changed = false;
    for (const [experiment, variants] of Object.entries(EXPERIMENTS)) {
      if (!assignments[experiment]) {
        assignments[experiment] = assignVariant(variants);
        changed = true;
      }
    }

    if (changed) {
      response.cookies.set(AB_COOKIE_NAME, encodeURIComponent(JSON.stringify(assignments)), {
        path: "/",
        maxAge: AB_COOKIE_MAX_AGE,
        sameSite: "lax",
        httpOnly: false, // must be readable by client JS for analytics
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
