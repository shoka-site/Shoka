import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "خدمة برمجية متخصصة | سهلة العراق";
  let description =
    "تفاصيل الخدمة البرمجية من سهلة — الشركة العراقية في تطوير البرمجيات والتحول الرقمي.";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/content/ar/services`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const services = await res.json();
      const service = Array.isArray(services)
        ? services.find((s: { id: string }) => s.id === id)
        : null;
      if (service?.title) {
        title = `${service.title} | خدمات سهلة البرمجية في العراق`;
        description = service.description
          ? `${service.description.slice(0, 155)}... | سهلة — شركة برمجيات عراقية`
          : `${service.title} — خدمة برمجية متخصصة من سهلة، الشركة العراقية في تطوير البرمجيات.`;
      }
    }
  } catch {
    // fallback to default
  }

  return {
    title,
    description,
    keywords: [
      "خدمة برمجية العراق",
      "تطوير برمجيات العراق",
      "software service Iraq",
      "Sehle service",
      "Iraq software solution",
      "سهلة",
    ],
    alternates: {
      canonical: `${SITE_URL}/services/${id}`,
    },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      alternateLocale: "en_US",
      url: `${SITE_URL}/services/${id}`,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
      creator: "@sehle_it",
    },
  };
}

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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/content/ar/services`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const services = await res.json();
      const service = Array.isArray(services)
        ? services.find((s: { id: string }) => s.id === id)
        : null;
      if (service?.title) {
        serviceSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description || "",
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
              { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${id}` },
            ],
          },
        };
      }
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
