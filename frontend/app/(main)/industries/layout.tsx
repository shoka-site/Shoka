import type { Metadata } from "next";
import { cookies } from "next/headers";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";
  const isRtl = lang === "ar";

  const title = isRtl 
    ? "المجالات التي نخدمها | حلول برمجية وحل مشاكل الأعمال" 
    : "Industries We Serve | Software & Business Problem Solutions";

  const description = isRtl
    ? "نقدم حلولاً برمجية مخصصة وأنظمة إدارة مبتكرة لحل مشاكل الأعمال في القطاعات المختلفة: الرعاية الصحية، التعليم، التجزئة، العقارات والمزيد."
    : "We provide custom software solutions and innovative management systems to solve business problems across industries: Healthcare, Education, Retail, Real Estate, and more.";

  return {
    title,
    description,
    keywords: [
      // Arabic
      "حلول برمجية قطاعات",
      "حل مشاكل الأعمال",
      "برمجة قطاع الصحة",
      "برمجة قطاع التعليم",
      "برمجة قطاع التجزئة",
      "برمجة قطاع العقارات",
      "تحول رقمي قطاعات",
      "أنظمة إدارة قطاعية",
      "سهلة قطاعات",
      // English
      "industry software solutions",
      "business problem solving industries",
      "healthcare software",
      "education software",
      "retail software",
      "real estate software",
      "hospitality software",
      "logistics software",
      "management systems by industry",
      "Sehle industries",
    ],
    alternates: {
      canonical: `${SITE_URL}/industries`,
    },
    openGraph: {
      type: "website",
      locale: isRtl ? "ar_IQ" : "en_US",
      alternateLocale: isRtl ? "en_US" : "ar_IQ",
      url: `${SITE_URL}/industries`,
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

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "المجالات التي تخدمها سهلة | Sehle Industries",
    description: "حلول برمجية مخصصة لكل قطاع أعمال في العراق.",
    url: `${SITE_URL}/industries`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "المجالات", item: `${SITE_URL}/industries` },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي القطاعات التي تخدمها سهلة في العراق؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "سهلة تقدم حلولاً برمجية مخصصة لقطاعات: الرعاية الصحية، التعليم، التجزئة والتجارة الإلكترونية، العقارات، النفط والطاقة، الضيافة والسياحة، واللوجستيات.",
        },
      },
      {
        "@type": "Question",
        name: "Which industries does Sehle serve in Iraq?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sehle provides custom software solutions for healthcare, education, retail & e-commerce, real estate, oil & energy, hospitality, logistics, and fintech sectors across Iraq and the Middle East.",
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
