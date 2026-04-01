import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "سهلة | شركة برمجيات وتطوير تقني في العراق",
  description:
    "سهلة — الشركة العراقية الرائدة في تطوير البرمجيات، تطبيقات الجوال، المواقع الإلكترونية، والتحول الرقمي. هل تبحث عن حل برمجي؟ نحن نبنيه. Software company Iraq | Web development Iraq | Digital transformation.",
  keywords: [
    // Arabic Iraq keywords
    "شركة برمجيات عراقية",
    "تطوير برمجيات في العراق",
    "برمجة مواقع في العراق",
    "تطوير تطبيقات العراق",
    "تحول رقمي العراق",
    "حلول برمجية بغداد",
    "شركة تقنية عراقية",
    "برمجة بغداد",
    "تطوير مواقع بغداد",
    "نظام إدارة عراقي",
    "ERP العراق",
    "تطبيقات الجوال العراق",
    "سهلة",
    "منصة سهلة",
    // English Iraq keywords
    "software company Iraq",
    "web development Iraq",
    "software development Baghdad",
    "IT company Iraq",
    "digital transformation Iraq",
    "mobile app development Iraq",
    "custom software Iraq",
    "Iraq tech company",
    "software solutions Iraq",
    "ERP system Iraq",
    "e-commerce Iraq",
    "Iraq software agency",
    "Sehle",
    "Sehle software",
    // General software search terms
    "software development company",
    "custom software solutions",
    "enterprise software Iraq",
    "SaaS Iraq",
  ],
  alternates: {
    canonical: `${SITE_URL}/home`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/home`,
    title: "سهلة | شركة برمجيات وتطوير تقني في العراق",
    description:
      "نبني البرمجيات والأنظمة الرقمية التي تحتاجها شركتك. تطبيقات، مواقع، أنظمة ERP، وحلول AI — سهلة هي شريكك التقني في العراق.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "سهلة — شركة برمجيات عراقية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "سهلة | أفضل شركة برمجيات في العراق",
    description:
      "هل تبحث عن شركة برمجيات في العراق؟ سهلة تطور مواقع، تطبيقات، وأنظمة ذكية لشركتك.",
    images: [OG_IMAGE],
    creator: "@sehle_it",
  },
};

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
