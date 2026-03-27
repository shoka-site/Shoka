import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { updateProjectSchema } from '@shared/schema';

export const PUT = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateProjectSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid project data', parsed.error.issues);
  }

  const updated = await storage.updateProject(id, parsed.data);
  if (!updated) return fail('NOT_FOUND', 'Project not found', undefined, 404);
  return ok(updated);
});

export const DELETE = withErrorHandler(async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const deleted = await storage.deleteProject(id);
  if (!deleted) return fail('NOT_FOUND', 'Project not found', undefined, 404);
  return ok({ deleted: true });
});
