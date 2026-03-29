// ---------------------------------------------------------------------------
// Sentry — Browser (client-side) initialisation.
// Imported by components/SentryClientInit.tsx which is rendered in the root layout.
// ---------------------------------------------------------------------------

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 0.1,

  // Capture unhandled promise rejections in the browser.
  integrations: [],

  debug: false,

  // Do not send errors caused by browser extensions or bots.
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    /^chrome-extension:/,
    /^moz-extension:/,
  ],

  beforeSend(event) {
    // Strip the session cookie from client-side error reports.
    if (event.request?.cookies) {
      delete event.request.cookies['admin_auth'];
    }
    return event;
  },
});
