import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "مشاريعنا | معرض أعمال سهلة البرمجية وحالات النجاح",
    titleEn: "Our Portfolio | Client Case Studies & Software Projects",
    descriptionAr: "استعرض مشاريع سهلة البرمجية في العراق والمنطقة: أنظمة شركات، تطبيقات هاتف، ومواقع إلكترونية أثّرت بحجم أعمال عملائنا.",
    descriptionEn: "Explore Sehle's software development portfolio and case studies across enterprise ERP, mobile apps, and digital transformation.",
    path: "/projects",
    keywordsAr: ["مشاريع برمجية عراق", "معرض أعمال سهلة", "مشاريع تطوير مواقع عراق", "مشاريع تطبيقات عراق", "حالات نجاح تقنية"],
    keywordsEn: ["software portfolio Iraq", "Sehle case studies", "Iraq web projects", "enterprise software showcase"],
    lang,
  });
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "مشاريع سهلة البرمجية",
    description: "معرض مشاريع سهلة من مواقع وتطبيقات وأنظمة رقمية في العراق والمنطقة.",
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
