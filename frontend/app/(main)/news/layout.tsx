import type { Metadata } from "next";
import { cookies } from "next/headers";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";

  return buildMetadata({
    titleAr: "أخبار وإنجازات سهلة | التطورات البرمجية والتحول الرقمي",
    titleEn: "Company News & Achievements | Tech Industry Updates",
    descriptionAr: "تابع آخر أخبار وإنجازات سهلة: إطلاقات البرمجيات الجديدة، الشراكات التقنية، ومشاريع التحول الرقمي في العراق والمنطقة.",
    descriptionEn: "Follow Sehle's latest company updates, platform feature releases, partnership announcements, and digital transformation milestones.",
    path: "/news",
    keywordsAr: ["أخبار سهلة", "إنجازات سهلة", "أخبار تقنية عراق", "مستجدات برمجيات عراق"],
    keywordsEn: ["Sehle news", "Iraq tech announcements", "software updates Iraq", "digital transformation news"],
    lang,
  });
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "أخبار سهلة وإنجازاتها | Sehle News",
    description: "أخبار، إنجازات، وفعاليات سهلة للأنظمة الرقمية.",
    url: `${SITE_URL}/news/`,
    publisher: {
      "@type": "Organization",
      name: "سهلة | Sehle",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logoo.png`,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home/` },
        { "@type": "ListItem", position: 2, name: "الأخبار", item: `${SITE_URL}/news/` },
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
