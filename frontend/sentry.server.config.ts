// ---------------------------------------------------------------------------
// Sentry — Node.js server-side initialisation.
// Imported by instrumentation.ts register() when NEXT_RUNTIME === 'nodejs'.
// ---------------------------------------------------------------------------

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Capture 10% of transactions for performance monitoring.
  // Increase to 1.0 temporarily when diagnosing latency issues.
  tracesSampleRate: 0.1,

  // Set to true to see Sentry SDK debug output in development.
  debug: false,

  // Ignore noise from health-check and bot traffic.
  ignoreErrors: [
    // Browser extensions injecting scripts
    'Non-Error promise rejection captured',
  ],

  beforeSend(event) {
    // Strip PII from server-side events before they reach Sentry.
    // Admin passwords and session tokens must never appear in error reports.
    if (event.request?.cookies) {
      event.request.cookies = { admin_auth: '[REDACTED]' };
    }
    return event;
  },
});
