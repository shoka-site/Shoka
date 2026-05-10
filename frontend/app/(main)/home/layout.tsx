import type { Metadata } from "next";
import { cookies } from "next/headers";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";
  const isRtl = lang === "ar";

  const title = isRtl 
    ? "حلول برمجية وأنظمة إدارة تلبي احتياجات قطاعك" 
    : "Software & Management Solutions for Your Industry";

  const description = isRtl
    ? "سهلة هي شركة تقنية رائدة تقدم حلولاً برمجية مخصصة، أنظمة إدارة (ERP)، وتحولاً رقمياً لحل مشاكل الأعمال في مختلف القطاعات والصناعات."
    : "Sehle is a leading technology company providing custom software solutions, management systems (ERP), and digital transformation to solve complex business problems across various industries.";

  return {
    title,
    description,
    keywords: [
      // Arabic Iraq keywords
      "حلول برمجية",
      "حل مشاكل الأعمال",
      "أنظمة إدارة",
      "أنظمة ERP",
      "برمجيات للشركات",
      "تطوير برمجيات مخصصة",
      "التحول الرقمي",
      "شركة تقنية",
      // English Iraq keywords
      "software company Iraq",
      "web development Iraq",
      "software development Baghdad",
      "IT company Iraq",
      "digital transformation Iraq",
      "mobile app development Iraq",
      "custom software Iraq",
      "software solutions Iraq",
      "ERP system Iraq",
      "business problem solving",
      // General software search terms
      "management solutions",
      "software development company",
      "custom software solutions",
      "enterprise software Iraq",
    ],
    alternates: {
      canonical: `${SITE_URL}/home`,
    },
    openGraph: {
      type: "website",
      locale: isRtl ? "ar_IQ" : "en_US",
      alternateLocale: isRtl ? "en_US" : "ar_IQ",
      url: `${SITE_URL}/home`,
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

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "سهلة — شركة برمجيات عراقية",
    description:
      "الصفحة الرئيسية لسهلة، الشركة العراقية المتخصصة في تطوير البرمجيات والأنظمة الرقمية.",
    url: `${SITE_URL}/home`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
      ],
    },
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sehle - سهلة",
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "20",
      reviewCount: "20",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      {children}
    </>
  );
}
