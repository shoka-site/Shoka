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

  const title = lang === "ar" ? (industry.titleAr || industry.titleEn) : industry.titleEn;
  const desc = lang === "ar" ? (industry.descriptionAr || industry.descriptionEn) : industry.descriptionEn;

  return {
    title,
    description: desc ? desc.substring(0, 160) : "",
    openGraph: {
      title,
      description: desc ? desc.substring(0, 160) : "",
    }
  };
}

export default async function IndustryPage() {
  return <IndustryDetailsClient />;
}
