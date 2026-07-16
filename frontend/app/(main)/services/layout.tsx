import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "خدماتنا | حلول برمجية وأنظمة إدارة ERP",
    titleEn: "Our Services | Custom Software & ERP Systems",
    descriptionAr: "تقدم سهلة خدمات تطوير برمجيات متكاملة لحل مشاكل الأعمال في مختلف القطاعات: تطوير مواقع، تطبيقات، أنظمة إدارة (ERP)، حلول الذكاء الاصطناعي، والتحول الرقمي.",
    descriptionEn: "Sehle provides full-spectrum software development services to solve business problems: web and mobile apps, ERP systems, AI solutions, and digital transformation.",
    path: "/services",
    keywordsAr: ["خدمات برمجية", "حل مشاكل الأعمال", "تطوير مواقع", "تطوير تطبيقات الجوال", "نظام ERP", "ذكاء اصطناعي", "برمجة مخصصة", "حلول سحابية"],
    keywordsEn: ["software services", "business problem solving", "web development", "mobile app development", "ERP system", "AI solutions", "custom software development", "management solutions"],
    lang,
  });
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Iraq" },
      { "@type": "Country", name: "Turkey" },
    ],
    description:
      "خدمات تطوير البرمجيات الشاملة بما تشمل: مواقع إلكترونية، تطبيقات جوال، أنظمة ERP، وحلول ذكاء اصطناعي.",
    url: `${SITE_URL}/services/`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home/` },
        { "@type": "ListItem", position: 2, name: "الخدمات", item: `${SITE_URL}/services/` },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي خدمات سهلة البرمجية في العراق؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "سهلة تقدم طيفاً شاملاً من الخدمات البرمجية في العراق: تطوير المواقع الإلكترونية، تطبيقات الجوال (iOS وAndroid)، أنظمة ERP، حلول الذكاء الاصطناعي، التجارة الإلكترونية، وأنظمة إدارة المحتوى.",
        },
      },
      {
        "@type": "Question",
        name: "What software services does Sehle offer in Iraq?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sehle provides full-spectrum software services in Iraq: web development, mobile app development (iOS & Android), ERP systems, AI solutions, e-commerce platforms, and CMS development.",
        },
      },
      {
        "@type": "Question",
        name: "كم تستغرق مدة تطوير مشروع برمجي مع سهلة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تتراوح المدة بين 4–6 أسابيع للمشاريع البسيطة وتصل إلى 8–16 أسبوعاً للحلول المؤسسية المعقدة. نقدم جدولاً زمنياً مفصلاً خلال جلسة الاستشارة المجانية.",
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
