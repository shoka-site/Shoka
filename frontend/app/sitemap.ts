import { MetadataRoute } from "next";
import { storage } from "@/lib/storage";

const SITE_URL = "https://www.sehle.site";

function entry(
  url: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap[number] {
  // No hreflang alternates — the site uses cookie-based language switching so
  // Arabic and English share the same URL. Declaring both as separate alternates
  // would misrepresent the URL structure to Google.
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    entry(`${SITE_URL}/`, now, "daily", 1.0),
    entry(`${SITE_URL}/home/`, now, "daily", 1.0),
    entry(`${SITE_URL}/services/`, now, "weekly", 0.9),
    entry(`${SITE_URL}/packages/`, now, "weekly", 0.9),
    entry(`${SITE_URL}/projects/`, now, "weekly", 0.85),
    entry(`${SITE_URL}/industries/`, now, "weekly", 0.85),
    entry(`${SITE_URL}/about/`, now, "monthly", 0.8),
    entry(`${SITE_URL}/news/`, now, "weekly", 0.75),
    entry(`${SITE_URL}/contact/`, now, "monthly", 0.7),
    entry(`${SITE_URL}/compare/`, now, "weekly", 0.8),
    entry(`${SITE_URL}/glossary/`, now, "weekly", 0.8),
    entry(`${SITE_URL}/blog/`, now, "weekly", 0.85),
    entry(`${SITE_URL}/refer/`, now, "weekly", 0.75),
    entry(`${SITE_URL}/social-kit/`, now, "weekly", 0.75),
    entry(`${SITE_URL}/solutions-in-baghdad/`, now, "weekly", 0.8),
    entry(`${SITE_URL}/solutions-in-basra/`, now, "weekly", 0.8),
    entry(`${SITE_URL}/solutions-in-erbil/`, now, "weekly", 0.8),
    entry(`${SITE_URL}/solutions-in-sulaymaniyah/`, now, "weekly", 0.8),
    entry(`${SITE_URL}/solutions-in-najaf/`, now, "weekly", 0.8),
  ];

  // Fetch entity data directly from storage — faster than HTTP calls and avoids
  // a dependency on the API server being up during build/revalidation.
  const [services, projects, packages, industries] = await Promise.all([
    storage.getServices(true).catch(() => []),
    storage.getProjects(true).catch(() => []),
    storage.getPackages(true).catch(() => []),
    storage.getIndustries(true).catch(() => []),
  ]);

  const servicePages = services.map((s) =>
    entry(`${SITE_URL}/services/${s.id}/`, s.updatedAt ?? now, "monthly", 0.8)
  );

  const projectPages = projects.map((p) =>
    entry(`${SITE_URL}/projects/${p.id}/`, p.updatedAt ?? now, "monthly", 0.75)
  );

  const packagePages = packages.map((p) =>
    entry(`${SITE_URL}/packages/${p.id}/`, p.updatedAt ?? now, "monthly", 0.8)
  );

  const industryPages = industries.map((i) =>
    entry(`${SITE_URL}/industries/${i.id}/`, i.updatedAt ?? now, "monthly", 0.75)
  );

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const serviceForIndustryPages = services.flatMap((s) =>
    industries.map((i) => {
      const sDate = s.updatedAt ? new Date(s.updatedAt) : now;
      const iDate = i.updatedAt ? new Date(i.updatedAt) : now;
      const lastMod = sDate > iDate ? sDate : iDate;
      return entry(`${SITE_URL}/${slugify(s.titleEn)}-for-${slugify(i.titleEn)}/`, lastMod, "monthly", 0.75);
    })
  );

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...packagePages,
    ...industryPages,
    ...serviceForIndustryPages,
  ];
}
