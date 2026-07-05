// ---------------------------------------------------------------------------
// A/B Test client-side helper — §22 A/B Test Setup
//
// Reads variant assignments from the `ab_variants` cookie set by middleware.
// ---------------------------------------------------------------------------

"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "./analytics";

/** Returns the assigned variant for an experiment, or null before hydration. */
export function useABVariant(experiment: string): string | null {
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = document.cookie
        .split("; ")
        .find((c) => c.startsWith("ab_variants="))
        ?.split("=")[1];
      if (!raw) return;
      const assignments = JSON.parse(decodeURIComponent(raw));
      const v = assignments[experiment] ?? null;
      if (v) {
        setVariant(v);
        // Fire exposure event so GA4 can segment by variant
        trackEvent("ab_exposure", { experiment, variant: v });
      }
    } catch {
      /* cookie unreadable */
    }
  }, [experiment]);

  return variant;
}

/** Read variant synchronously (server-safe, returns null on server). */
export function getABVariant(experiment: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith("ab_variants="))
      ?.split("=")[1];
    if (!raw) return null;
    const assignments = JSON.parse(decodeURIComponent(raw));
    return assignments[experiment] ?? null;
  } catch {
    return null;
  }
}
