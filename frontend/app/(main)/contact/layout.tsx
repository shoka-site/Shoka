import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "تواصل معنا | احجز استشارة برمجية مجانية | سهلة العراق",
  description:
    "تواصل مع سهلة للحصول على استشارة برمجية مجانية. نساعدك في بناء موقعك، تطبيقك، أو نظامك الرقمي في العراق. Contact Sehle Iraq | Free software consultation Iraq.",
  keywords: [
    "تواصل مع سهلة",
    "استشارة برمجية مجانية العراق",
    "طلب خدمة برمجية العراق",
    "تواصل شركة برمجيات عراق",
    "احجز استشارة برمجة",
    "رقم سهلة",
    "ايميل سهلة",
    "contact Sehle Iraq",
    "free software consultation Iraq",
    "hire software developer Iraq",
    "get a quote software Iraq",
    "software inquiry Iraq",
    "Sehle contact",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/contact`,
    title: "تواصل مع سهلة | استشارة برمجية مجانية في العراق",
    description:
      "هل لديك فكرة أو مشروع؟ تواصل مع سهلة واحصل على استشارة برمجية مجانية.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "تواصل مع سهلة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل مع سهلة | استشارة مجانية",
    description: "تواصل معنا لبدء مشروعك البرمجي في العراق.",
    images: [OG_IMAGE],
    creator: "@sehle_it",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "تواصل مع سهلة | Contact Sehle",
    description: "صفحة التواصل مع سهلة للحصول على استشارة برمجية مجانية.",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف أتواصل مع سهلة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يمكنك التواصل مع سهلة عبر نموذج الاتصال في هذه الصفحة، أو عبر البريد الإلكتروني أو وسائل التواصل الاجتماعي. يرد فريقنا في غضون 24 ساعة.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact Sehle for a software project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fill out the contact form on this page or reach us via email or social media. Our team responds within 24 hours with a free consultation offer.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
