import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { timingSafeEqual, createHash, createHmac } from 'crypto';
import { createRateLimiter } from './rate-limit';
import { logger } from './logger';

// ---------------------------------------------------------------------------
// Login rate limiter — in-memory, per IP.
// 5 failures within 1 minute → 15-minute lockout.
// Replace Map with Redis for multi-instance deployments.
// ---------------------------------------------------------------------------

interface LockoutRecord {
  count: number;
  resetAt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, LockoutRecord>();
const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record?.lockedUntil && now < record.lockedUntil) {
    return { allowed: false, retryAfterMs: record.lockedUntil - now };
  }

  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const lockedUntil = now + LOCKOUT_MS;
    loginAttempts.set(ip, { ...record, lockedUntil });
    logger.audit('login_blocked', 'auth', ip, { reason: 'rate_limit_exceeded' });
    return { allowed: false, retryAfterMs: LOCKOUT_MS };
  }

  loginAttempts.set(ip, { ...record, count: record.count + 1 });
  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (record && now <= record.resetAt) {
    loginAttempts.set(ip, { ...record, count: record.count + 1 });
  }
  logger.audit('login_failed', 'auth', ip);
}

// ---------------------------------------------------------------------------
// Credential verification — timing-safe via SHA-256 length normalisation.
// ---------------------------------------------------------------------------

function sha256(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const storedUsername = process.env.ADMIN_USERNAME ?? '';
  const storedPassword = process.env.ADMIN_PASSWORD ?? '';

  if (!storedUsername || !storedPassword) {
    logger.error('[auth] ADMIN_USERNAME or ADMIN_PASSWORD is not configured');
    return false;
  }

  const usernameMatch = timingSafeEqual(sha256(username), sha256(storedUsername));
  const passwordMatch = timingSafeEqual(sha256(password), sha256(storedPassword));
  return usernameMatch && passwordMatch;
}

// ---------------------------------------------------------------------------
// Session token — HMAC-SHA256 signed, stateless.
//
// Format: `${issuedAt}.${hmac}`
//   issuedAt  — Unix timestamp in ms (Date.now())
//   hmac      — hex-encoded HMAC-SHA256 of `admin.${issuedAt}` using ADMIN_SESSION_SECRET
//
// Security properties:
//   - Cryptographically unforgeable without the secret
//   - Contains an expiry (24 h) encoded in the token itself — no server state needed
//   - Verified with timingSafeEqual to resist timing attacks
// ---------------------------------------------------------------------------

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('[auth] ADMIN_SESSION_SECRET is not configured');
  return secret;
}

export function generateSessionToken(): string {
  const iat = Date.now();
  const sig = createHmac('sha256', getSessionSecret())
    .update(`admin.${iat}`)
    .digest('hex');
  return `${iat}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET ?? '';
  if (!secret) return false;

  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;

  const iatStr = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);

  const iat = parseInt(iatStr, 10);
  if (isNaN(iat) || Date.now() - iat > SESSION_MAX_AGE_MS) return false;

  const expected = createHmac('sha256', secret)
    .update(`admin.${iatStr}`)
    .digest('hex');

  // Both buffers must be the same length for timingSafeEqual.
  // An attacker providing a malformed sig of the wrong length would bypass
  // the timing safety — catch that explicitly.
  try {
    const sigBuf = Buffer.from(sig, 'hex');
    const expectedBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// assertAdmin — call at the top of every protected API route handler.
// The middleware.ts already blocks requests at the edge; this is a second,
// independent check that ensures protection even if middleware is bypassed.
// ---------------------------------------------------------------------------

export async function assertAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie || !verifySessionToken(authCookie.value)) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 }
    );
  }

  return null;
}

// Re-export for convenience — consultation route uses a separate limiter instance.
export { createRateLimiter };
