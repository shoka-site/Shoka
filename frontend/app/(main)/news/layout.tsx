import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "أخبار وإنجازات شوكة | شركة برمجيات عراقية | Shoka News",
  description:
    "تابع آخر أخبار وإنجازات شوكة — الشركة العراقية الرائدة في تطوير البرمجيات. إطلاقات جديدة، شراكات، وإنجازات تقنية. Shoka news | Iraq tech news.",
  keywords: [
    "أخبار شوكة",
    "إنجازات شوكة",
    "أخبار تقنية عراق",
    "مستجدات برمجيات عراق",
    "شركة برمجيات عراقية أخبار",
    "Shoka news",
    "Iraq tech news",
    "software company Iraq achievements",
    "Shoka achievements",
  ],
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/news`,
    title: "أخبار شوكة وإنجازاتها | Iraq Tech News",
    description: "تابع آخر إنجازات وأخبار شوكة — شركة البرمجيات العراقية.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "أخبار شوكة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "أخبار شوكة | Shoka News",
    description: "آخر أخبار وإنجازات شوكة البرمجية.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "أخبار شوكة وإنجازاتها",
    description: "أخبار، إنجازات، وفعاليات شوكة للأنظمة الرقمية.",
    url: `${SITE_URL}/news`,
    publisher: {
      "@type": "Organization",
      name: "شوكة",
      url: SITE_URL,
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
