// ---------------------------------------------------------------------------
// Next.js Instrumentation Hook — runs once when the server process starts.
//
// Responsibilities:
//   1. Fail fast if required environment variables are missing.
//   2. Initialise Sentry for the current runtime environment.
//
// This file must stay at the project root (next to next.config.mjs).
// Next.js 15+ enables the instrumentation hook by default.
// ---------------------------------------------------------------------------

export async function register() {
  // 1. Validate required environment variables before any request is served.
  //    Importing env.ts here ensures the server crashes loudly with a clear
  //    message rather than silently serving broken responses.
  const { validateEnv } = await import('./lib/env');
  validateEnv();

  // 2. Initialise the appropriate Sentry SDK for the current runtime.
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
