import { NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Standard response envelope helpers
// All API routes must use these to return consistent shapes:
//   Success: { success: true, data: T, meta?: M }
//   Failure: { success: false, error: { code, message, details? } }
// ---------------------------------------------------------------------------

export function ok<T>(data: T, meta?: Record<string, unknown>, status = 200): NextResponse {
  return NextResponse.json(
    { success: true, data, ...(meta ? { meta } : {}) },
    { status }
  );
}

export function fail(
  code: string,
  message: string,
  details?: unknown,
  status = 400
): NextResponse {
  return NextResponse.json(
    { success: false, error: { code, message, ...(details !== undefined ? { details } : {}) } },
    { status }
  );
}

// Wraps a route handler in a try/catch so unhandled errors return a safe 500
// instead of leaking stack traces.
type RouteHandler<A extends unknown[] = []> = (...args: A) => Promise<NextResponse>;

export function withErrorHandler<A extends unknown[]>(
  handler: RouteHandler<A>
): RouteHandler<A> {
  return async (...args: A): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (err) {
      console.error('[API Error]', err);
      return fail('INTERNAL_ERROR', 'An unexpected error occurred', undefined, 500);
    }
  };
}
