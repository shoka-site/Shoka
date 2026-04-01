import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "المجالات | حلول برمجية لكل قطاع في العراق | سهلة",
  description:
    "سهلة تقدم حلولاً برمجية مخصصة لجميع القطاعات في العراق: الرعاية الصحية، التعليم، التجزئة، العقارات، النفط والطاقة، والمزيد. Software solutions by industry Iraq.",
  keywords: [
    // Arabic
    "حلول برمجية قطاعات العراق",
    "برمجة قطاع الصحة العراق",
    "برمجة قطاع التعليم العراق",
    "برمجة قطاع التجزئة العراق",
    "برمجة قطاع العقارات العراق",
    "برمجة قطاع النفط العراق",
    "تحول رقمي قطاعات العراق",
    "نظام إدارة مستشفيات العراق",
    "نظام إدارة مدارس العراق",
    "نظام POS عراق",
    "سهلة قطاعات",
    // English
    "industry software solutions Iraq",
    "healthcare software Iraq",
    "education software Iraq",
    "retail software Iraq",
    "real estate software Iraq",
    "oil sector software Iraq",
    "hospitality software Iraq",
    "logistics software Iraq",
    "fintech Iraq",
    "hospital management system Iraq",
    "school management system Iraq",
    "POS system Iraq",
    "Sehle industries",
  ],
  alternates: {
    canonical: `${SITE_URL}/industries`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/industries`,
    title: "القطاعات التي نخدمها | حلول برمجية مخصصة | سهلة",
    description:
      "حلول برمجية مخصصة لكل قطاع عمل في العراق — من الصحة والتعليم إلى النفط والتجزئة.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "مجالات سهلة البرمجية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "المجالات | سهلة لكل قطاع",
    description: "حلول برمجية مخصصة لكل قطاع في العراق.",
    images: [OG_IMAGE],
    creator: "@sehle_it",
  },
};

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
