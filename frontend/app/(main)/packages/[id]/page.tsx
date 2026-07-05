import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import PackageDetailsClient from "./PackageDetailsClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pkg = await storage.getPackage(id);
  const { lang } = await getServerTranslation();

  if (!pkg) {
    return {
      title: lang === "ar" ? "الباقة غير موجودة" : "Package Not Found",
    };
  }

  const title = lang === "ar" ? (pkg.titleAr || pkg.titleEn) : pkg.titleEn;
  const desc = lang === "ar"
    ? `اكتشف تفاصيل ومميزات باقة ${title} من شركة سهلة للحلول البرمجية والأنظمة الرقمية في العراق.`
    : `Discover the details and features of ${title} package from Sehle for software solutions and digital systems in Iraq.`;

  // Retrieve keywords from the database if available, otherwise fall back to title-based keywords
  let keywords: string[] = [];
  const dbKeywords = lang === "ar" ? pkg.keywordsAr : pkg.keywordsEn;
  if (dbKeywords) {
    keywords = dbKeywords.split(/[،,]+/).map(k => k.trim()).filter(Boolean);
  } else {
    keywords = [
      title,
      ...(lang === "ar" ? ["باقات سهلة", "حلول برمجية جاهزة"] : ["Sehle packages", "pre-built software solutions"])
    ].filter(Boolean);
  }

  const SITE_URL = "https://www.sehle.site";
  const OG_IMAGE = `${SITE_URL}/og-image.png`;
  const ogImage = OG_IMAGE;
  const canonicalUrl = `${SITE_URL}/packages/${id}`;

  return {
    title,
    description: desc,
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
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
      creator: "@sehle_it",
    },
  };
}

export default async function PackagePage({ params }: Props) {
  const { id } = await params;
  const pkg = await storage.getPackage(id);
  const { lang } = await getServerTranslation();

  if (!pkg) return <PackageDetailsClient />;

  const SITE_URL = "https://www.sehle.site";
  const title = lang === "ar" ? (pkg.titleAr || pkg.titleEn) : pkg.titleEn;
  const desc = lang === "ar" ? (pkg.descriptionAr || pkg.descriptionEn) : pkg.descriptionEn;

  // 1. Product/Offer schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": desc || undefined,
    "image": `${SITE_URL}/og-image.png`,
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/packages/${id}`,
      "priceCurrency": "USD",
      "price": pkg.order === 1 ? "1500" : pkg.order === 2 ? "3500" : "7500", // Representative base pricing
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
    },
    "brand": {
      "@type": "Brand",
      "name": "سهلة | Sehle"
    }
  };

  // 2. FAQ schema for package
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": lang === "ar" 
          ? "هل باقة البرمجيات هذه قابلة للتخصيص؟" 
          : "Is this software package customizable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "ar"
            ? "نعم، جميع الباقات قابلة للتعديل والتخصيص بالكامل لتناسب احتياجات عملك المحددة."
            : "Yes, all packages can be fully modified and customized to match your specific business requirements."
        }
      },
      {
        "@type": "Question",
        "name": lang === "ar" 
          ? "هل توفرون الدعم والصيانة بعد التسليم؟" 
          : "Do you provide support and maintenance after delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "ar"
            ? "نعم، نحن نقدم صيانة ودعماً فنياً محلياً مستمراً لضمان استقرار الأنظمة وتحديثها بشكل دوري."
            : "Yes, we provide ongoing local technical support and maintenance to ensure system stability and regular updates."
        }
      }
    ]
  };

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
        "name": lang === "ar" ? "الباقات" : "Packages",
        "item": "https://www.sehle.site/packages"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://www.sehle.site/packages/${id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PackageDetailsClient />
    </>
  );
}
