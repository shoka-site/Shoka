import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { updateTeamMemberSchema } from '@shared/schema';

export const PUT = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateTeamMemberSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid team member data', parsed.error.issues);
  }

  const updated = await storage.updateTeamMember(id, parsed.data);
  if (!updated) return fail('NOT_FOUND', 'Team member not found', undefined, 404);
  return ok(updated);
});

export const DELETE = withErrorHandler(async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { id } = await params;
  const deleted = await storage.deleteTeamMember(id);
  if (!deleted) return fail('NOT_FOUND', 'Team member not found', undefined, 404);
  return ok({ deleted: true });
});
