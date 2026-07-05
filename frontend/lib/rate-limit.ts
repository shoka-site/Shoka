// ---------------------------------------------------------------------------
// Rate Limiter supporting both local memory and horizontal Upstash Redis.
// ---------------------------------------------------------------------------

interface Record {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

export interface RateLimiterOptions {
  windowMs: number;
  max: number;
}

/**
 * Returns a rate limiter function. When Redis env vars are configured, it uses
 * atomic Lua scripts over REST. Otherwise, it falls back to an in-memory Map.
 */
export function createRateLimiter(options: RateLimiterOptions): (key: string) => Promise<RateLimitResult> {
  const store = new Map<string, Record>();
  const { windowMs, max } = options;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  return async function check(key: string): Promise<RateLimitResult> {
    if (redisUrl && redisToken) {
      try {
        const url = `${redisUrl.replace(/\/$/, "")}/eval`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${redisToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            script: `
              local current = redis.call('get', KEYS[1])
              if current and tonumber(current) >= tonumber(ARGV[2]) then
                  return {0, redis.call('ttl', KEYS[1])}
              else
                  local val = redis.call('incr', KEYS[1])
                  if tonumber(val) == 1 then
                      redis.call('expire', KEYS[1], tonumber(ARGV[1]))
                  end
                  return {1, redis.call('ttl', KEYS[1])}
              end
            `,
            keys: [key],
            args: [String(Math.ceil(windowMs / 1000)), String(max)],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const [allowedVal, ttlSec] = data.result ?? [1, 0];
          if (allowedVal === 0) {
            return { allowed: false, retryAfterMs: ttlSec * 1000 };
          }
          return { allowed: true };
        }
      } catch (err) {
        console.error("[RateLimiter] Redis call failed, falling back to memory:", err);
      }
    }

    // Local Map Fallback
    const now = Date.now();
    const record = store.get(key);

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
