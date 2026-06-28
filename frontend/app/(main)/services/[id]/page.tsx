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

  return {
    title,
    description: desc ? desc.substring(0, 160) : "",
    openGraph: {
      title,
      description: desc ? desc.substring(0, 160) : "",
    }
  };
}

export default async function ServicePage({ params }: Props) {
  return <ServiceDetailsClient params={params} />;
}
