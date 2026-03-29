// ---------------------------------------------------------------------------
// Generic in-memory rate limiter factory.
// Works in Node.js runtime only (API route handlers).
// For multi-instance deployments, swap the Map for a Redis-backed store.
//
// Usage:
//   const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });
//   const result = limiter(ip);
//   if (!result.allowed) return 429;
// ---------------------------------------------------------------------------

interface Record {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  // Milliseconds until the window resets. Only set when allowed === false.
  retryAfterMs?: number;
}

export interface RateLimiterOptions {
  // Length of the sliding window in milliseconds.
  windowMs: number;
  // Maximum number of requests allowed within the window.
  max: number;
}

/**
 * Returns a function that accepts a string key (typically an IP address) and
 * returns whether the request is within the allowed rate.
 */
export function createRateLimiter(options: RateLimiterOptions): (key: string) => RateLimitResult {
  const store = new Map<string, Record>();
  const { windowMs, max } = options;

  return function check(key: string): RateLimitResult {
    const now = Date.now();
    const record = store.get(key);

    // No record, or window expired — start fresh.
    if (!record || now > record.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }

    if (record.count >= max) {
      return { allowed: false, retryAfterMs: record.resetAt - now };
    }

    store.set(key, { ...record, count: record.count + 1 });
    return { allowed: true };
  };
}
