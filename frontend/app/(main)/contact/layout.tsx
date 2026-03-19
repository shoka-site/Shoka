import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "تواصل معنا | احجز استشارة برمجية مجانية | شوكة العراق",
  description:
    "تواصل مع شوكة للحصول على استشارة برمجية مجانية. نساعدك في بناء موقعك، تطبيقك، أو نظامك الرقمي في العراق. Contact Shoka Iraq | Free software consultation Iraq.",
  keywords: [
    "تواصل مع شوكة",
    "استشارة برمجية مجانية العراق",
    "طلب خدمة برمجية العراق",
    "تواصل شركة برمجيات عراق",
    "احجز استشارة برمجة",
    "رقم شوكة",
    "ايميل شوكة",
    "contact Shoka Iraq",
    "free software consultation Iraq",
    "hire software developer Iraq",
    "get a quote software Iraq",
    "software inquiry Iraq",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/contact`,
    title: "تواصل مع شوكة | استشارة برمجية مجانية في العراق",
    description:
      "هل لديك فكرة أو مشروع؟ تواصل مع شوكة واحصل على استشارة برمجية مجانية.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "تواصل مع شوكة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل مع شوكة | استشارة مجانية",
    description: "تواصل معنا لبدء مشروعك البرمجي في العراق.",
    images: [OG_IMAGE],
    creator: "@shoka_it",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "تواصل مع شوكة",
    description: "صفحة التواصل مع شوكة للحصول على استشارة برمجية.",
    url: `${SITE_URL}/contact`,
    contactOption: "TollFree",
    availableLanguage: ["Arabic", "English"],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "تواصل معنا", item: `${SITE_URL}/contact` },
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
