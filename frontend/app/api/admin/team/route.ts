import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { insertTeamMemberSchema } from '@shared/schema';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 50)));

  const members = await storage.getTeamMembers();
  const total = members.length;
  const paginated = members.slice((page - 1) * limit, page * limit);

  return ok(paginated, { page, limit, total });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const body = await req.json().catch(() => null);
  const parsed = insertTeamMemberSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid team member data', parsed.error.issues);
  }

  const member = await storage.createTeamMember(parsed.data);
  return ok(member, undefined, 201);
});
