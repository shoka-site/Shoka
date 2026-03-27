import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { updateServiceSchema } from '@shared/schema';

export const PUT = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateServiceSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid service data', parsed.error.issues);
  }

  const updated = await storage.updateService(id, parsed.data);
  if (!updated) return fail('NOT_FOUND', 'Service not found', undefined, 404);
  return ok(updated);
});

export const DELETE = withErrorHandler(async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const deleted = await storage.deleteService(id);
  if (!deleted) return fail('NOT_FOUND', 'Service not found', undefined, 404);
  return ok({ deleted: true });
});
