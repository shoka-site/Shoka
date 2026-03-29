// ---------------------------------------------------------------------------
// Sentry — Edge runtime initialisation (middleware + edge API routes).
// Imported by instrumentation.ts register() when NEXT_RUNTIME === 'edge'.
// ---------------------------------------------------------------------------

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
});
