"use client";

// Initialise Sentry in the browser as early as possible.
// This is a zero-render component — it exists purely for its module-load side effect.
// Placed in the root layout so it runs before any user interaction can trigger an error.
import "@/sentry.client.config";

export function SentryClientInit() {
  return null;
}
