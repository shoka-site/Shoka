import { storage } from '@/lib/storage';
import { NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/auth';
import { ok, fail, withErrorHandler } from '@/lib/api-response';
import { insertPackageSchema } from '@shared/schema';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const published = searchParams.has('published')
    ? searchParams.get('published') === 'true'
    : undefined;
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 50)));

  const packages = await storage.getPackages(published);
  const total = packages.length;
  const paginated = packages.slice((page - 1) * limit, page * limit);

  return ok(paginated, { page, limit, total });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;

  const body = await req.json().catch(() => null);
  const parsed = insertPackageSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 'Invalid package data', parsed.error.issues);
  }

  const pkg = await storage.createPackage(parsed.data);
  return ok(pkg, undefined, 201);
});
