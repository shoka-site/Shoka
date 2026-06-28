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

  return {
    title,
    description: desc ? desc.substring(0, 160) : "",
    keywords,
    openGraph: {
      title,
      description: desc ? desc.substring(0, 160) : "",
    }
  };
}

export default async function ServicePage({ params }: Props) {
  return <ServiceDetailsClient params={params} />;
}
