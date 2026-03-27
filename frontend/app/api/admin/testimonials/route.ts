import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { insertTestimonialSchema } from '@shared/schema';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 50)));

  const testimonials = await storage.getTestimonials();
  const total = testimonials.length;
  const paginated = testimonials.slice((page - 1) * limit, page * limit);

  return ok(paginated, { page, limit, total });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const body = await req.json().catch(() => null);
  const parsed = insertTestimonialSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid testimonial data', parsed.error.issues);
  }

  const testimonial = await storage.createTestimonial(parsed.data);
  return ok(testimonial, undefined, 201);
});
