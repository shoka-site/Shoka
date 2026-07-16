import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "من نحن | رؤية سهلة للهندسة البرمجية والتحول الرقمي",
    titleEn: "About Us | Sehle Engineering & Digital Transformation Vision",
    descriptionAr: "تعرف على سهلة — شركة برمجيات عراقية وإقليمية تجمع بين معايير الهندسة الأوروبية وفهم متطلبات السوق المحلي لبناء أنظمة سحابية وتطبيقات مخصصة.",
    descriptionEn: "Learn about Sehle — enterprise custom software provider pairing European engineering standards with local market understanding.",
    path: "/about",
    keywordsAr: ["عن سهلة", "شركة برمجيات عراقية", "مؤسسو سهلة", "هندسة البرمجيات بالعراق", "التحول الرقمي بالعراق"],
    keywordsEn: ["about Sehle", "Iraqi software company", "Sehle engineering team", "software startup Iraq"],
    lang,
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "عن سهلة | About Sehle",
    description: "صفحة التعريف بشركة سهلة للأنظمة الرقمية والبرمجيات.",
    url: `${SITE_URL}/about/`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home/` },
        { "@type": "ListItem", position: 2, name: "عن سهلة", item: `${SITE_URL}/about/` },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
      foundingDate: "2024",
      description:
        "شركة برمجيات عراقية متخصصة في تطوير المواقع، التطبيقات، أنظمة ERP، والذكاء الاصطناعي.",
      knowsLanguage: ["Arabic", "English", "Turkish"],
      areaServed: ["Iraq", "Turkey", "Middle East"],
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
