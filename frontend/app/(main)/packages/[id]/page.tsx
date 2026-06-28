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

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
    }
  };
}

export default async function PackagePage() {
  return <PackageDetailsClient />;
}
