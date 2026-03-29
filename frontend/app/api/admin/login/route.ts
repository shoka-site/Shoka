import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkLoginRateLimit,
  recordFailedLogin,
  verifyAdminCredentials,
  generateSessionToken,
} from '@/lib/auth';
import { logger } from '@/lib/logger';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  // Rate limiting — keyed by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    const retryAfterSec = Math.ceil((rateLimit.retryAfterMs ?? 0) / 1000);
    return NextResponse.json(
      { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many login attempts. Try again later.' } },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    );
  }

  // Input validation
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON' } },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid credentials format' } },
      { status: 400 }
    );
  }

  const { username, password } = parsed.data;

  // Credential verification (timing-safe)
  if (!verifyAdminCredentials(username, password)) {
    recordFailedLogin(ip);
    // Uniform delay to resist timing attacks on the response
    await new Promise((r) => setTimeout(r, 200));
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid username or password' } },
      { status: 401 }
    );
  }

  // Generate a cryptographically signed session token — much stronger than 'true'
  const token = generateSessionToken();

  logger.audit('login', 'auth', ip, { username });

  const response = NextResponse.json({ success: true, message: 'Login successful' });

  response.cookies.set('admin_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return response;
}
