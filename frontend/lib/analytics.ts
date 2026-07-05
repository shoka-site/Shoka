"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}

export function initAutoTracking() {
  if (typeof window === "undefined") return;

  // 1. Scroll Depth Tracking
  const thresholds = [25, 50, 75, 100];
  const triggered: Record<number, boolean> = {};

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const percentage = Math.round((scrollTop / scrollHeight) * 100);

    thresholds.forEach((threshold) => {
      if (percentage >= threshold && !triggered[threshold]) {
        triggered[threshold] = true;
        trackEvent("scroll_depth", { depth_percentage: threshold });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // 2. CTA / Click Event Tracking
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest("a, button, [role='button']");
    if (!clickable) return;

    const text = clickable.textContent?.trim() || "";
    const href = clickable.getAttribute("href") || "";
    const id = clickable.getAttribute("id") || "";

    trackEvent("cta_click", {
      element_text: text.slice(0, 50),
      element_href: href,
      element_id: id,
    });
  };

  document.addEventListener("click", handleClick);
}
