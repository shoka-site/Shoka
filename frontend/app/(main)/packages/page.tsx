import { storage } from "@/lib/storage";
import { PackagesPageContent } from "@/components/packages/PackagesPageContent";
import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "باقاتنا البرمجية | حلول جاهزة ومخصصة لأعمالك"
    : "Our Packages | Pre-built & Custom Business Solutions";

  const description = lang === "ar"
    ? "تصفح باقات سهلة البرمجية المتكاملة والمصممة خصيصاً لتلبية احتياجات شركتك بمرونة وموثوقية عالية وبأسعار تنافسية."
    : "Browse Sehle's integrated software packages, specially designed to meet your business needs with high flexibility, reliability, and competitive pricing.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
  };
}

export const revalidate = 60;

export default async function PackagesPage() {
  const packages = await storage.getPackages(true);
  // Cast to include descriptionEn/Ar which are in the DB but not the Zod schema
  return <PackagesPageContent packages={packages as Parameters<typeof PackagesPageContent>[0]["packages"]} />;
}
