import { storage } from "@/lib/storage";

const SITE_URL = "https://www.sehle.site";

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let serviceSchema = null;
  try {
    const service = await storage.getService(id);
    const title = service ? (service.titleAr || service.titleEn) : "";
    const description = service ? (service.descriptionAr || service.descriptionEn) : "";

    if (service && title) {
      serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description: description,
        url: `${SITE_URL}/services/${id}`,
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
            { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
            { "@type": "ListItem", position: 2, name: "الخدمات", item: `${SITE_URL}/services` },
            { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/services/${id}` },
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
