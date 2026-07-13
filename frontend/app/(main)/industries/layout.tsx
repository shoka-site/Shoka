import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "المجالات والقطاعات | حلول برمجية وحل مشاكل الأعمال",
    titleEn: "Industries We Serve | Enterprise Software Solutions",
    descriptionAr: "نقدم حلولاً برمجية مخصصة وأنظمة إدارة مبتكرة لحل مشاكل الأعمال في قطاعات الرعاية الصحية، التعليم، التجزئة، العقارات، النفط والغاز، اللوجستيات.",
    descriptionEn: "We provide custom software solutions and ERP management systems across Healthcare, Education, Retail, Real Estate, Logistics, Oil & Energy.",
    path: "/industries",
    keywordsAr: ["حلول برمجية قطاعات", "حل مشاكل الأعمال", "برمجة قطاع الصحة", "برمجة قطاع التجزئة", "أنظمة إدارة قطاعية"],
    keywordsEn: ["industry software solutions", "healthcare software", "retail ERP", "real estate management software"],
    lang,
  });
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "المجالات التي تخدمها سهلة | Sehle Industries",
    description: "حلول برمجية مخصصة لكل قطاع أعمال في العراق.",
    url: `${SITE_URL}/industries`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
        { "@type": "ListItem", position: 2, name: "المجالات", item: `${SITE_URL}/industries` },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي القطاعات التي تخدمها سهلة في العراق؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "سهلة تقدم حلولاً برمجية مخصصة لقطاعات: الرعاية الصحية، التعليم، التجزئة والتجارة الإلكترونية، العقارات، النفط والطاقة، الضيافة والسياحة، واللوجستيات.",
        },
      },
      {
        "@type": "Question",
        name: "Which industries does Sehle serve in Iraq?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sehle provides custom software solutions for healthcare, education, retail & e-commerce, real estate, oil & energy, hospitality, logistics, and fintech sectors across Iraq and the Middle East.",
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
