"use client";

import dynamic from "next/dynamic";

// ssr: false must live in a Client Component — Server Components don't support it.
// This wrapper is the client boundary; the actual loader (with Framer Motion)
// is loaded asynchronously, keeping it out of the critical render path.
const InitialLoaderDynamic = dynamic(
  () => import("./InitialLoader").then((m) => ({ default: m.InitialLoader })),
  { ssr: false }
);

export function InitialLoaderClient() {
  return <InitialLoaderDynamic />;
}
