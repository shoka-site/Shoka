import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "عن شوكة | شركة برمجيات عراقية تأسست في تركيا | Shoka",
  description:
    "تعرف على شوكة — شركة برمجيات عراقية تأسست في تركيا على يد مهندسَين عراقيَّين. نجمع بين التميز التقني والأصالة العراقية لبناء حلول برمجية مستدامة. About Shoka Iraq software company.",
  keywords: [
    "عن شوكة",
    "شركة برمجيات عراقية",
    "مؤسسي شوكة",
    "مهندسون عراقيون",
    "شركة تقنية عراقية تركيا",
    "تاريخ شوكة",
    "فريق شوكة",
    "about Shoka",
    "Iraqi software founders",
    "Iraq tech startup",
    "who is Shoka",
    "Shoka company",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/about`,
    title: "عن شوكة | شركة برمجيات عراقية",
    description:
      "شوكة — شركة تقنية عراقية تأسست لبناء المستقبل الرقمي. تعرف على قصتنا وفريقنا وقيمنا.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "عن شوكة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "عن شوكة | شركة برمجيات عراقية",
    description: "تعرف على شوكة — مهندسون عراقيون يبنون المستقبل الرقمي.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "عن شوكة",
    description: "صفحة التعريف بشركة شوكة للأنظمة الرقمية.",
    url: `${SITE_URL}/about`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "عن شوكة", item: `${SITE_URL}/about` },
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
