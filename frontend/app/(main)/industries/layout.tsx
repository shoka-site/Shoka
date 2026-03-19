import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "المجالات | حلول برمجية لكل قطاع في العراق | شوكة",
  description:
    "شوكة تقدم حلولاً برمجية مخصصة لجميع القطاعات في العراق: الرعاية الصحية، التعليم، التجزئة، العقارات، النفط والطاقة، والمزيد. Software solutions by industry Iraq.",
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
  ],
  alternates: {
    canonical: `${SITE_URL}/industries`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/industries`,
    title: "القطاعات التي نخدمها | حلول برمجية مخصصة | شوكة",
    description:
      "حلول برمجية مخصصة لكل قطاع عمل في العراق — من الصحة والتعليم إلى النفط والتجزئة.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "مجالات شوكة البرمجية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "المجالات | شوكة لكل قطاع",
    description: "حلول برمجية مخصصة لكل قطاع في العراق.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "المجالات التي تخدمها شوكة",
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
