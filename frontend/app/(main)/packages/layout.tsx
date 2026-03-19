import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "الباقات البرمجية | حلول جاهزة بأسعار تنافسية | شوكة العراق",
  description:
    "اكتشف باقات شوكة البرمجية الجاهزة للشركات في العراق. حلول متكاملة لإدارة الأعمال، التجارة الإلكترونية، وإدارة العملاء بأسعار تنافسية. Software packages Iraq | Business solutions Iraq.",
  keywords: [
    "باقات برمجية عراق",
    "حلول برمجية جاهزة العراق",
    "باقات تطوير مواقع العراق",
    "نظام CRM العراق",
    "نظام تجارة إلكترونية العراق",
    "حلول أعمال العراق",
    "برامج إدارة الشركات العراق",
    "software packages Iraq",
    "business software Iraq",
    "ready-made software Iraq",
    "CRM Iraq",
    "e-commerce package Iraq",
    "business management software Iraq",
    "affordable software Iraq",
  ],
  alternates: {
    canonical: `${SITE_URL}/packages`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/packages`,
    title: "باقات شوكة البرمجية | حلول جاهزة للأعمال في العراق",
    description:
      "باقات برمجية متكاملة مصممة لاحتياجات الشركات العراقية — تجارة إلكترونية، CRM، إدارة أعمال، وأكثر.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "باقات شوكة البرمجية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "باقات شوكة | حلول برمجية جاهزة في العراق",
    description: "حلول برمجية جاهزة ومتكاملة للشركات العراقية.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "باقات شوكة البرمجية",
    description: "حلول برمجية جاهزة ومتكاملة للشركات.",
    url: `${SITE_URL}/packages`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "الباقات", item: `${SITE_URL}/packages` },
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
