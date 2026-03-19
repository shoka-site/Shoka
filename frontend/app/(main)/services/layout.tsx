import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "خدماتنا | تطوير مواقع، تطبيقات، أنظمة ERP، AI | شوكة العراق",
  description:
    "شوكة تقدم خدمات تطوير البرمجيات الشاملة في العراق: مواقع إلكترونية، تطبيقات الجوال، أنظمة ERP، حلول الذكاء الاصطناعي، وأكثر. Software services Iraq | Web development | Mobile apps | AI solutions.",
  keywords: [
    // Arabic
    "خدمات برمجية العراق",
    "تطوير مواقع العراق",
    "تطوير تطبيقات الجوال العراق",
    "نظام ERP العراق",
    "ذكاء اصطناعي العراق",
    "برمجة مخصصة العراق",
    "حلول سحابية العراق",
    "برمجة متجر إلكتروني العراق",
    "نظام إدارة محتوى العراق",
    "تطوير API العراق",
    "تصميم مواقع احترافي العراق",
    "برمجة تطبيق iOS العراق",
    "برمجة تطبيق Android العراق",
    // English
    "software services Iraq",
    "web development Iraq",
    "mobile app development Iraq",
    "ERP system Iraq",
    "AI solutions Iraq",
    "custom software development Iraq",
    "cloud solutions Iraq",
    "e-commerce development Iraq",
    "CMS development Iraq",
    "API development Iraq",
    "iOS app Iraq",
    "Android app Iraq",
    "React development Iraq",
    "Next.js development Iraq",
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/services`,
    title: "خدمات شوكة البرمجية | تطوير مواقع وتطبيقات في العراق",
    description:
      "من تطوير المواقع وتطبيقات الجوال إلى أنظمة ERP وحلول AI — شوكة لديها الحل البرمجي الذي تحتاجه.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "خدمات شوكة البرمجية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "خدمات شوكة | تطوير برمجيات في العراق",
    description:
      "مواقع، تطبيقات، ERP، AI — شوكة تبني كل ما تحتاجه شركتك.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@type": "Organization",
      name: "شوكة",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Iraq",
    },
    description:
      "خدمات تطوير البرمجيات الشاملة بما تشمل: مواقع إلكترونية، تطبيقات جوال، أنظمة ERP، وحلول ذكاء اصطناعي.",
    url: `${SITE_URL}/services`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "الخدمات", item: `${SITE_URL}/services` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
