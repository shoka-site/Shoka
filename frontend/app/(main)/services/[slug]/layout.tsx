import { storage } from "@/lib/storage";
import { slugify } from "@/lib/utils";

const SITE_URL = "https://www.sehle.site";

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let serviceSchema = null;
  try {
    const services = await storage.getServices(true);
    const service = services.find(s => slugify(s.titleEn) === slug);
    const id = service?.id;
    const title = service ? (service.titleAr || service.titleEn) : "";
    const description = service ? (service.descriptionAr || service.descriptionEn) : "";

    if (service && title) {
      serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description: description,
        url: `${SITE_URL}/services/${slug}/`,
        provider: {
          "@type": "Organization",
          name: "سهلة | Sehle",
          url: SITE_URL,
        },
        areaServed: ["Iraq", "Turkey", "Middle East"],
        serviceType: service.type || "Software Development",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home/` },
            { "@type": "ListItem", position: 2, name: "الخدمات", item: `${SITE_URL}/services/` },
            { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/services/${slug}/` },
          ],
        },
      };
    }
  } catch {
    // fallback — no schema
  }

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {children}
    </>
  );
}
