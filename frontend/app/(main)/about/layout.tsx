import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "عن سهلة | شركة برمجيات عراقية | Sehle",
  description:
    "تعرف على سهلة — شركة برمجيات عراقية تأسست على يد مهندسين عراقيين. نجمع بين التميز التقني والأصالة العراقية لبناء حلول برمجية مستدامة. About Sehle Iraq software company.",
  keywords: [
    "عن سهلة",
    "شركة برمجيات عراقية",
    "مؤسسو سهلة",
    "مهندسون عراقيون",
    "شركة تقنية عراقية",
    "تاريخ سهلة",
    "فريق سهلة",
    "about Sehle",
    "Iraqi software founders",
    "Iraq tech startup",
    "who is Sehle",
    "Sehle company",
    "Sehle Iraq",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/about`,
    title: "عن سهلة | شركة برمجيات عراقية",
    description:
      "سهلة — شركة تقنية عراقية تأسست لبناء المستقبل الرقمي. تعرف على قصتنا وفريقنا وقيمنا.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "عن سهلة — شركة برمجيات عراقية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "عن سهلة | شركة برمجيات عراقية",
    description: "تعرف على سهلة — مهندسون عراقيون يبنون المستقبل الرقمي.",
    images: [OG_IMAGE],
    creator: "@sehle_it",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "عن سهلة | About Sehle",
    description: "صفحة التعريف بشركة سهلة للأنظمة الرقمية والبرمجيات.",
    url: `${SITE_URL}/about`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "عن سهلة", item: `${SITE_URL}/about` },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
      foundingDate: "2024",
      description:
        "شركة برمجيات عراقية متخصصة في تطوير المواقع، التطبيقات، أنظمة ERP، والذكاء الاصطناعي.",
      knowsLanguage: ["Arabic", "English", "Turkish"],
      areaServed: ["Iraq", "Turkey", "Middle East"],
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
