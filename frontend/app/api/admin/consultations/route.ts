import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { insertConsultationSchema } from '@shared/schema';
import { createRateLimiter } from '@/lib/rate-limit';
import { sanitizeText, sanitizeOptionalText } from '@/lib/sanitize';
import { sendConsultationNotification } from '@/lib/notifications';
import { logger } from '@/lib/logger';

// Rate limit public consultation submissions: 5 per 10 minutes per IP.
// Prevents contact form spam and automated abuse without affecting real users.
const consultationLimiter = createRateLimiter({ windowMs: 10 * 60_000, max: 5 });

export const GET = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 50)));

  const consultations = await storage.getConsultations();
  const total = consultations.length;
  const paginated = consultations.slice((page - 1) * limit, page * limit);

  return ok(paginated, { page, limit, total });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  // Public endpoint — no admin auth required (contact form submissions).
  // Rate-limit by IP to prevent spam.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = consultationLimiter(ip);
  if (!rateLimit.allowed) {
    return fail(
      'TOO_MANY_REQUESTS',
      'You have submitted too many requests. Please try again later.',
      undefined,
      429
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = insertConsultationSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid consultation data', parsed.error.issues);
  }

  // Sanitize all free-text fields from public input before persisting.
  // Protects against stored XSS in email templates and any future rendering paths.
  const sanitizedData = {
    ...parsed.data,
    name: sanitizeText(parsed.data.name),
    email: parsed.data.email.trim().toLowerCase(),
    company: sanitizeOptionalText(parsed.data.company),
    message: sanitizeText(parsed.data.message),
  };

  const consultation = await storage.createConsultation(sanitizedData);

  logger.info('New consultation submitted', {
    id: consultation.id,
    fromEmail: sanitizedData.email,
    ip,
  });

  // Fire-and-forget — notification failure must not affect the 201 response.
  sendConsultationNotification({
    name: sanitizedData.name,
    email: sanitizedData.email,
    company: sanitizedData.company,
    message: sanitizedData.message,
  });

  return ok(consultation, undefined, 201);
});
