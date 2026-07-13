import type { Metadata } from "next";

export const SITE_URL = "https://www.sehle.site";
export const DEFAULT_SITE_NAME_AR = "سهلة | شركة حلول برمجية وتطوير تقني في العراق";
export const DEFAULT_SITE_NAME_EN = "Sehle | Software Solutions & Tech Development in Iraq";

export interface BuildMetadataOptions {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  path: string;
  keywordsAr?: string[];
  keywordsEn?: string[];
  ogImage?: string;
  lang?: "ar" | "en";
  noIndex?: boolean;
}

const BASE_KEYWORDS_AR = [
  "حلول برمجية في العراق",
  "شركة برمجة وتطوير تقني",
  "أنظمة إدارة الشركات ERP",
  "تطوير برمجيات مخصصة",
  "التحول الرقمي في العراق",
  "سهلة للحلول البرمجية",
  "برمجة تطبيقات ومواقع",
  "أنظمة إدارة المستودعات والمبيعات",
  "حلول تقنية بغداد اربيل",
];

const BASE_KEYWORDS_EN = [
  "software solutions in Iraq",
  "custom software development Iraq",
  "enterprise ERP systems Iraq",
  "digital transformation Middle East",
  "Sehle software solutions",
  "business management software",
  "bilingual ERP system",
  "IT agency Baghdad Erbil",
];

export function buildMetadata({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  path,
  keywordsAr = [],
  keywordsEn = [],
  ogImage = `${SITE_URL}/og-image.png`,
  lang = "ar",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const isAr = lang === "ar";
  const rawTitle = isAr ? titleAr : titleEn;
  const title = path === "/" || path === "" ? rawTitle : `${rawTitle} | ${isAr ? "سهلة" : "Sehle"}`;
  const description = isAr ? descriptionAr : descriptionEn;
  const keywords = Array.from(
    new Set([...(isAr ? BASE_KEYWORDS_AR : BASE_KEYWORDS_EN), ...(isAr ? keywordsAr : keywordsEn)])
  );

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ar-IQ": canonicalUrl,
        "en-US": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_IQ" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_IQ",
      url: canonicalUrl,
      siteName: isAr ? DEFAULT_SITE_NAME_AR : DEFAULT_SITE_NAME_EN,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@sehle_it",
      site: "@sehle_it",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
