import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { timingSafeEqual, createHash } from 'crypto';

// ---------------------------------------------------------------------------
// Rate limiter (in-memory — replace with Redis for multi-instance deployments)
// ---------------------------------------------------------------------------

interface RateLimitRecord {
  count: number;
  resetAt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const WINDOW_MS = 60 * 1000;        // 1-minute sliding window
const MAX_ATTEMPTS = 5;              // max failures before lockout
const LOCKOUT_MS = 15 * 60 * 1000;  // 15-minute lockout

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
}

// ---------------------------------------------------------------------------
// Credential verification (timing-safe via SHA-256 digest normalization)
// ---------------------------------------------------------------------------

function sha256(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const storedUsername = process.env.ADMIN_USERNAME ?? '';
  const storedPassword = process.env.ADMIN_PASSWORD ?? '';

  if (!storedUsername || !storedPassword) {
    console.error('[auth] ADMIN_USERNAME or ADMIN_PASSWORD is not configured');
    return false;
  }

  // Hash both sides to normalize length before timingSafeEqual
  const usernameMatch = timingSafeEqual(sha256(username), sha256(storedUsername));
  const passwordMatch = timingSafeEqual(sha256(password), sha256(storedPassword));

  return usernameMatch && passwordMatch;
}

// ---------------------------------------------------------------------------
// assertAdmin — call at the top of every protected API route handler
// ---------------------------------------------------------------------------

export async function assertAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 }
    );
  }

  return null;
}
