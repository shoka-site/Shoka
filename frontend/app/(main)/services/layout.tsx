import type { Metadata } from "next";
import { cookies } from "next/headers";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";
  const isRtl = lang === "ar";

  const title = isRtl 
    ? "خدماتنا | حلول برمجية وأنظمة إدارة ERP" 
    : "Our Services | Software & Management Solutions";

  const description = isRtl
    ? "تقدم سهلة خدمات تطوير برمجيات متكاملة لحل مشاكل الأعمال في مختلف القطاعات: تطوير مواقع، تطبيقات، أنظمة إدارة (ERP)، حلول الذكاء الاصطناعي، والتحول الرقمي."
    : "Sehle provides full-spectrum software development services to solve business problems across industries: web and mobile apps, ERP systems, AI solutions, and digital transformation.";

  return {
    title,
    description,
    keywords: [
      // Arabic
      "خدمات برمجية",
      "حل مشاكل الأعمال",
      "تطوير مواقع",
      "تطوير تطبيقات الجوال",
      "نظام ERP",
      "ذكاء اصطناعي",
      "برمجة مخصصة",
      "حلول سحابية",
      // English
      "software services",
      "business problem solving",
      "web development",
      "mobile app development",
      "ERP system",
      "AI solutions",
      "custom software development",
      "management solutions",
    ],
    alternates: {
      canonical: `${SITE_URL}/services`,
    },
    openGraph: {
      type: "website",
      locale: isRtl ? "ar_IQ" : "en_US",
      alternateLocale: isRtl ? "en_US" : "ar_IQ",
      url: `${SITE_URL}/services`,
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

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Iraq" },
      { "@type": "Country", name: "Turkey" },
    ],
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي خدمات سهلة البرمجية في العراق؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "سهلة تقدم طيفاً شاملاً من الخدمات البرمجية في العراق: تطوير المواقع الإلكترونية، تطبيقات الجوال (iOS وAndroid)، أنظمة ERP، حلول الذكاء الاصطناعي، التجارة الإلكترونية، وأنظمة إدارة المحتوى.",
        },
      },
      {
        "@type": "Question",
        name: "What software services does Sehle offer in Iraq?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sehle provides full-spectrum software services in Iraq: web development, mobile app development (iOS & Android), ERP systems, AI solutions, e-commerce platforms, and CMS development.",
        },
      },
      {
        "@type": "Question",
        name: "كم تستغرق مدة تطوير مشروع برمجي مع سهلة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تتراوح المدة بين 4–6 أسابيع للمشاريع البسيطة وتصل إلى 8–16 أسبوعاً للحلول المؤسسية المعقدة. نقدم جدولاً زمنياً مفصلاً خلال جلسة الاستشارة المجانية.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
