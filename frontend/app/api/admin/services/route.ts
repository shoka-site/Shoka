import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { insertServiceSchema } from '@shared/schema';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const published = searchParams.has('published')
    ? searchParams.get('published') === 'true'
    : undefined;

  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 50)));

  const services = await storage.getServices(published);
  const total = services.length;
  const paginated = services.slice((page - 1) * limit, page * limit);

  return ok(paginated, { page, limit, total });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const body = await req.json().catch(() => null);
  const parsed = insertServiceSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid service data', parsed.error.issues);
  }

  const service = await storage.createService(parsed.data);
  return ok(service, undefined, 201);
});
