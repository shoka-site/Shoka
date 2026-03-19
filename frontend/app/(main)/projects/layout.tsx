import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "مشاريعنا | معرض أعمال شوكة البرمجية | Shoka Portfolio Iraq",
  description:
    "استعرض مشاريع شوكة البرمجية في العراق والمنطقة. مواقع، تطبيقات، وأنظمة رقمية أثّرت في أعمال عملائنا. Software portfolio Iraq | Shoka projects | Iraq tech portfolio.",
  keywords: [
    "مشاريع برمجية عراق",
    "معرض أعمال شوكة",
    "مشاريع تطوير مواقع عراق",
    "مشاريع تطبيقات عراق",
    "أعمال شركة برمجيات عراقية",
    "software portfolio Iraq",
    "Shoka projects",
    "Iraq web projects",
    "tech projects Iraq",
    "case studies Iraq software",
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/projects`,
    title: "مشاريع شوكة | معرض أعمال برمجية في العراق",
    description:
      "شاهد كيف ساعدنا شركات من مختلف القطاعات بحلول برمجية متميزة.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "مشاريع شوكة البرمجية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "مشاريع شوكة | Portfolio",
    description: "استعرض أعمالنا البرمجية في العراق والمنطقة.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "مشاريع شوكة البرمجية",
    description: "معرض مشاريع شوكة من مواقع وتطبيقات وأنظمة رقمية.",
    url: `${SITE_URL}/projects`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "المشاريع", item: `${SITE_URL}/projects` },
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
