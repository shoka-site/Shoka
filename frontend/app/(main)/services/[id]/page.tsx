import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import ServiceDetailsClient from "./ServiceDetailsClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = await storage.getService(id);
  const { lang } = await getServerTranslation();

  if (!service) {
    return {
      title: lang === "ar" ? "الخدمة غير موجودة" : "Service Not Found",
    };
  }

  const title = lang === "ar" ? (service.titleAr || service.titleEn) : service.titleEn;
  const desc = lang === "ar" ? (service.descriptionAr || service.descriptionEn) : service.descriptionEn;

  // Retrieve keywords from the database if available, otherwise fall back to title-based keywords
  let keywords: string[] = [];
  const dbKeywords = lang === "ar" ? service.keywordsAr : service.keywordsEn;
  if (dbKeywords) {
    keywords = dbKeywords.split(/[،,]+/).map(k => k.trim()).filter(Boolean);
  } else {
    keywords = [
      title,
      service.type,
      ...(lang === "ar" ? ["خدمات سهلة", "حلول سهلة البرمجية"] : ["Sehle services", "Sehle software solutions"])
    ].filter(Boolean);
  }

  const SITE_URL = "https://www.sehle.site";
  const OG_IMAGE = `${SITE_URL}/og-image.png`;
  const ogImage = OG_IMAGE;
  const canonicalUrl = `${SITE_URL}/services/${id}`;

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

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = await storage.getService(id);
  const { lang } = await getServerTranslation();

  if (!service) return <ServiceDetailsClient params={params} />;

  const title = lang === "ar" ? (service.titleAr || service.titleEn) : service.titleEn;

  // Generate dynamic FAQ for the specific service
  const serviceFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": lang === "ar" 
          ? `ما هي مدة تسليم خدمة ${title}؟` 
          : `What is the delivery timeline for ${title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "ar"
            ? `تختلف المدة حسب متطلبات المشروع ونطاق العمل، وعادة ما تستغرق بين 4 إلى 12 أسبوعاً للتطوير والاختبار والتشغيل.`
            : `Timeline varies based on specific project requirements and scope, usually taking between 4 to 12 weeks for development, QA, and deployment.`
        }
      },
      {
        "@type": "Question",
        "name": lang === "ar" 
          ? `كيف نبدأ العمل على مشروع ${title}؟` 
          : `How do we initiate a project for ${title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === "ar"
            ? `نبدأ بجلسة استشارية مجانية لتحليل متطلبات عملك، يتبعها تقديم مقترح فني ومالي مفصل قبل البدء في مرحلة التصميم والتطوير.`
            : `We begin with a free discovery call to analyze your operational requirements, followed by a detailed technical and financial proposal before starting design and development.`
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
        "name": lang === "ar" ? "الخدمات" : "Services",
        "item": "https://www.sehle.site/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://www.sehle.site/services/${id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetailsClient params={params} />
    </>
  );
}
