import { MetadataRoute } from "next";

const SITE_URL = "https://www.shoka.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/home`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/packages`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  return [...staticPages];
}
