import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "أخبار وإنجازات سهلة | شركة برمجيات عراقية | Sehle News",
  description:
    "تابع آخر أخبار وإنجازات سهلة — الشركة العراقية في تطوير البرمجيات. إطلاقات جديدة، شراكات، وإنجازات تقنية. Sehle news | Iraq tech news.",
  keywords: [
    "أخبار سهلة",
    "إنجازات سهلة",
    "أخبار تقنية عراق",
    "مستجدات برمجيات عراق",
    "شركة برمجيات عراقية أخبار",
    "Sehle news",
    "Iraq tech news",
    "software company Iraq achievements",
    "Sehle achievements",
    "Sehle updates",
  ],
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/news`,
    title: "أخبار سهلة وإنجازاتها | Iraq Tech News",
    description: "تابع آخر إنجازات وأخبار سهلة — شركة البرمجيات العراقية.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "أخبار سهلة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "أخبار سهلة | Sehle News",
    description: "آخر أخبار وإنجازات سهلة البرمجية.",
    images: [OG_IMAGE],
    creator: "@sehle_it",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "أخبار سهلة وإنجازاتها | Sehle News",
    description: "أخبار، إنجازات، وفعاليات سهلة للأنظمة الرقمية.",
    url: `${SITE_URL}/news`,
    publisher: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-updated.png`,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "الأخبار", item: `${SITE_URL}/news` },
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
