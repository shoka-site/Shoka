import { MetadataRoute } from "next";

const SITE_URL = "https://www.shoka.site";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchIds(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data.map((item: { id: string }) => item.id);
    return [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/home`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/industries`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic pages — fetch IDs from the API
  const [serviceIds, projectIds, packageIds, industryIds] = await Promise.all([
    fetchIds("services"),
    fetchIds("projects"),
    fetchIds("packages"),
    fetchIds("industries"),
  ]);

  const servicePages: MetadataRoute.Sitemap = serviceIds.map((id) => ({
    url: `${SITE_URL}/services/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projectIds.map((id) => ({
    url: `${SITE_URL}/projects/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const packagePages: MetadataRoute.Sitemap = packageIds.map((id) => ({
    url: `${SITE_URL}/packages/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industryIds.map((id) => ({
    url: `${SITE_URL}/industries/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...packagePages,
    ...industryPages,
  ];
}
