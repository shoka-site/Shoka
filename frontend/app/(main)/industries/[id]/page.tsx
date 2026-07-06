import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import IndustryDetailsClient from "./IndustryDetailsClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const industry = await storage.getIndustry(id);
  const { lang } = await getServerTranslation();

  if (!industry) {
    return {
      title: lang === "ar" ? "القطاع غير موجود" : "Industry Not Found",
    };
  }

  const baseTitle = lang === "ar" ? (industry.titleAr || industry.titleEn) : industry.titleEn;
  const title = lang === "ar" ? `طوّر قطاع ${baseTitle} ببرمجيات مخصصة` : `Transform ${baseTitle} with Custom Software`;
  const desc = lang === "ar" ? (industry.descriptionAr || industry.descriptionEn) : industry.descriptionEn;

  // Retrieve keywords from the database if available, otherwise fall back to title-based keywords
  let keywords: string[] = [];
  const dbKeywords = lang === "ar" ? industry.keywordsAr : industry.keywordsEn;
  if (dbKeywords) {
    keywords = dbKeywords.split(/[،,]+/).map(k => k.trim()).filter(Boolean);
  } else {
    keywords = [
      title,
      ...(lang === "ar" ? ["حلول قطاعية", "أنظمة إدارة"] : ["industry solutions", "enterprise management systems"])
    ].filter(Boolean);
  }

  const SITE_URL = "https://www.sehle.site";
  const OG_IMAGE = `${SITE_URL}/og-image.png`;
  const ogImage = OG_IMAGE;
  const canonicalUrl = `${SITE_URL}/industries/${id}/`;

  return {
    title,
    description: desc ? desc.substring(0, 160) : "",
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_IQ" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_IQ",
      url: canonicalUrl,
      title,
      description: desc ? desc.substring(0, 160) : "",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc ? desc.substring(0, 160) : "",
      images: [ogImage],
      creator: "@sehle_it",
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { id } = await params;
  const industry = await storage.getIndustry(id);
  const { lang } = await getServerTranslation();

  if (!industry) return <IndustryDetailsClient />;

  const title = lang === "ar" ? (industry.titleAr || industry.titleEn) : industry.titleEn;
  const SITE_URL = "https://www.sehle.site";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === "ar" ? "الرئيسية" : "Home",
        "item": "https://www.sehle.site/home"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === "ar" ? "القطاعات" : "Industries",
        "item": "https://www.sehle.site/industries"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `${SITE_URL}/industries/${id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IndustryDetailsClient />
    </>
  );
}
