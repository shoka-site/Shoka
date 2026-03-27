import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { updatePackageSchema } from '@shared/schema';

export const PUT = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updatePackageSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid package data', parsed.error.issues);
  }

  const pkg = await storage.updatePackage(id, parsed.data);
  if (!pkg) return fail('NOT_FOUND', 'Package not found', undefined, 404);
  return ok(pkg);
});

export const DELETE = withErrorHandler(async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const success = await storage.deletePackage(id);
  if (!success) return fail('NOT_FOUND', 'Package not found', undefined, 404);
  return ok({ deleted: true });
});
