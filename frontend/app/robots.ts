import { MetadataRoute } from "next";

const SITE_URL = "https://www.sehle.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: all crawlers can access public content, blocked from admin/api
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Googlebot — full public access, explicit for clarity
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // AI search bots — allow public pages so Sehle can be cited in AI answers.
      // These bots power ChatGPT search, Perplexity, Google AI Overviews, and Claude.
      // Blocking them prevents citation entirely, which is worse than AI training risk.
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // CCBot (Common Crawl) — used for training datasets only, no search citation benefit.
      // Blocked to reduce unnecessary crawl load without losing any search visibility.
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
