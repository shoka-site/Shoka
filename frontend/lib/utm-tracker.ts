"use client";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function initUtmTracker() {
  if (typeof window === "undefined") return;

  try {
    const searchParams = new URLSearchParams(window.location.search);
    let hasUtm = false;
    const utmData: Record<string, string> = {};

    UTM_PARAMS.forEach((param) => {
      const val = searchParams.get(param);
      if (val) {
        utmData[param] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem("utm_data", JSON.stringify(utmData));
    }
  } catch (e) {
    console.warn("Failed to initialize UTM tracker", e);
  }
}

export function getUtmData(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem("utm_data");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
