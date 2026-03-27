import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { updateConsultationSchema } from '@shared/schema';

export const GET = withErrorHandler(async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const consultation = await storage.getConsultation(id);
  if (!consultation) return fail('NOT_FOUND', 'Consultation not found', undefined, 404);
  return ok(consultation);
});

export const PUT = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateConsultationSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid consultation data', parsed.error.issues);
  }

  const consultation = await storage.updateConsultation(id, parsed.data);
  if (!consultation) return fail('NOT_FOUND', 'Consultation not found', undefined, 404);
  return ok(consultation);
});

export const DELETE = withErrorHandler(async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const deleted = await storage.deleteConsultation(id);
  if (!deleted) return fail('NOT_FOUND', 'Consultation not found', undefined, 404);
  return ok({ deleted: true });
});
