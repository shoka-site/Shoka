import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "تواصل معنا | احجز استشارة برمجية وحول فكرتك إلى نظام رقمي",
    titleEn: "Contact Us | Book a Free Software Consultation",
    descriptionAr: "تواصل مع فريق سهلة للحصول على استشارة برمجية مجانية وتقييم تقني لبناء موقعك، تطبيقك، أو نظامك المؤسسي.",
    descriptionEn: "Contact Sehle to get a free software consultation and engineering audit for your web, mobile app, or enterprise system.",
    path: "/contact",
    keywordsAr: ["تواصل مع سهلة", "استشارة برمجية مجانية العراق", "طلب خدمة برمجية", "احجز استشارة برمجة"],
    keywordsEn: ["contact Sehle Iraq", "free software consultation", "hire software agency", "get software quote"],
    lang,
  });
}

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
