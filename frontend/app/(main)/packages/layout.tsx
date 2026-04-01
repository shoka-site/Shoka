import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "الباقات البرمجية | حلول جاهزة بأسعار تنافسية | سهلة العراق",
  description:
    "اكتشف باقات سهلة البرمجية الجاهزة للشركات في العراق. حلول متكاملة لإدارة الأعمال، التجارة الإلكترونية، وإدارة العملاء بأسعار تنافسية. Software packages Iraq | Business solutions Iraq.",
  keywords: [
    "باقات برمجية عراق",
    "حلول برمجية جاهزة العراق",
    "باقات تطوير مواقع العراق",
    "نظام CRM العراق",
    "نظام تجارة إلكترونية العراق",
    "حلول أعمال العراق",
    "برامج إدارة الشركات العراق",
    "سهلة باقات",
    "software packages Iraq",
    "business software Iraq",
    "ready-made software Iraq",
    "CRM Iraq",
    "e-commerce package Iraq",
    "business management software Iraq",
    "affordable software Iraq",
    "Sehle packages",
  ],
  alternates: {
    canonical: `${SITE_URL}/packages`,
  },
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    alternateLocale: "en_US",
    url: `${SITE_URL}/packages`,
    title: "باقات سهلة البرمجية | حلول جاهزة للأعمال في العراق",
    description:
      "باقات برمجية متكاملة مصممة لاحتياجات الشركات العراقية — تجارة إلكترونية، CRM، إدارة أعمال، وأكثر.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "باقات سهلة البرمجية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "باقات سهلة | حلول برمجية جاهزة في العراق",
    description: "حلول برمجية جاهزة ومتكاملة للشركات العراقية.",
    images: [OG_IMAGE],
    creator: "@sehle_it",
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "باقات سهلة البرمجية",
    description: "حلول برمجية جاهزة ومتكاملة للشركات العراقية.",
    url: `${SITE_URL}/packages`,
    provider: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "الباقات", item: `${SITE_URL}/packages` },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ماذا تشمل باقات سهلة البرمجية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تشمل كل باقة مجموعة مخصصة من الخدمات كتطوير المواقع، تطبيقات الجوال، تصميم UI/UX، والدعم المستمر. تختلف المحتويات حسب مستوى الباقة.",
        },
      },
      {
        "@type": "Question",
        name: "What's included in Sehle's software packages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each Sehle package includes a tailored bundle of services such as web development, mobile apps, UI/UX design, and ongoing support. Exact inclusions vary by package tier.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكن تخصيص الباقة حسب احتياجات شركتي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم. جميع الباقات قابلة للتخصيص لتناسب احتياجات عملك. تواصل معنا لمناقشة متطلباتك وسنصمم لك الحل المثالي.",
        },
      },
      {
        "@type": "Question",
        name: "ما هو الوقت المعتاد لتسليم الباقة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تتراوح المدة بين 4–6 أسابيع للباقات البسيطة، و8–12 أسبوعاً للحلول المؤسسية. نقدم جدولاً زمنياً مفصلاً خلال جلسة الاستشارة.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started with a Sehle package?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book a free consultation through our contact page. We'll discuss your requirements, recommend the best package, and provide a detailed proposal within 48 hours.",
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
