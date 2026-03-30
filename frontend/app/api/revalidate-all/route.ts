import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createRateLimiter } from "@/lib/rate-limit";

const PUBLIC_TAGS = [
  "services",
  "projects",
  "testimonials",
  "platformUpdates",
  "industries",
  "solutions",
  "teamMembers",
  "packages",
] as const;

// Rate limit: 10 revalidations per minute per IP.
// This endpoint is called by all visitors on page load/reload, so we cannot
// require auth. The rate limit prevents cache-invalidation spam that would
// spike database load by forcing every request to bypass the ISR cache.
const revalidateLimiter = createRateLimiter({ windowMs: 60_000, max: 10 });

// Called by the client on every user entry to ensure subsequent server-side
// reads bypass stale cache entries and fetch fresh data from the database.
export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const result = revalidateLimiter(ip);
  if (!result.allowed) {
    const retryAfterSec = Math.ceil((result.retryAfterMs ?? 0) / 1000);
    return NextResponse.json(
      { revalidated: false, reason: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    );
  }

  for (const tag of PUBLIC_TAGS) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true });
}
