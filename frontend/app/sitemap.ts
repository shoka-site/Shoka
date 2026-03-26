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

function withAlternates(url: string, lastModified: Date, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number): MetadataRoute.Sitemap[number] {
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ar: url,
        en: url,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    withAlternates(SITE_URL, now, "daily", 1.0),
    withAlternates(`${SITE_URL}/home`, now, "daily", 1.0),
    withAlternates(`${SITE_URL}/services`, now, "weekly", 0.9),
    withAlternates(`${SITE_URL}/packages`, now, "weekly", 0.9),
    withAlternates(`${SITE_URL}/projects`, now, "weekly", 0.85),
    withAlternates(`${SITE_URL}/industries`, now, "weekly", 0.85),
    withAlternates(`${SITE_URL}/about`, now, "monthly", 0.8),
    withAlternates(`${SITE_URL}/news`, now, "weekly", 0.75),
    withAlternates(`${SITE_URL}/contact`, now, "monthly", 0.7),
  ];

  const [serviceIds, projectIds, packageIds, industryIds] = await Promise.all([
    fetchIds("services"),
    fetchIds("projects"),
    fetchIds("packages"),
    fetchIds("industries"),
  ]);

  const servicePages = serviceIds.map((id) =>
    withAlternates(`${SITE_URL}/services/${id}`, now, "monthly", 0.8)
  );

  const projectPages = projectIds.map((id) =>
    withAlternates(`${SITE_URL}/projects/${id}`, now, "monthly", 0.75)
  );

  const packagePages = packageIds.map((id) =>
    withAlternates(`${SITE_URL}/packages/${id}`, now, "monthly", 0.8)
  );

  const industryPages = industryIds.map((id) =>
    withAlternates(`${SITE_URL}/industries/${id}`, now, "monthly", 0.75)
  );

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...packagePages,
    ...industryPages,
  ];
}
