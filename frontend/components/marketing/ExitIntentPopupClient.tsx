"use client";

import dynamic from "next/dynamic";

// ssr: false must live in a Client Component — Server Components don't support it.
// The popup only activates on mouseleave after 5s, so deferring it is safe and
// removes ~40KB of Framer Motion from the initial bundle of every public page.
const ExitIntentPopupDynamic = dynamic(
  () => import("./ExitIntentPopup"),
  { ssr: false }
);

export function ExitIntentPopupClient() {
  return <ExitIntentPopupDynamic />;
}
