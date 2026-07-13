import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "الباقات البرمجية | حلول جاهزة بأسعار تنافسية",
    titleEn: "Software Packages | Ready-Made Enterprise Solutions",
    descriptionAr: "اكتشف باقات سهلة البرمجية الجاهزة للشركات في العراق. حلول متكاملة لإدارة الأعمال، التجارة الإلكترونية، وإدارة العملاء بأسعار تنافسية.",
    descriptionEn: "Explore Sehle's software packages for enterprise management, e-commerce, and CRM built for Middle East and Iraqi businesses.",
    path: "/packages",
    keywordsAr: ["باقات برمجية عراق", "حلول برمجية جاهزة العراق", "باقات تطوير مواقع العراق", "نظام CRM العراق", "نظام تجارة إلكترونية العراق"],
    keywordsEn: ["software packages Iraq", "ready-made software Iraq", "CRM package Iraq", "e-commerce software package"],
    lang,
  });
}

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
