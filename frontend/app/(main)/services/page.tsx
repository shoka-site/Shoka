import { storage } from "@/lib/storage";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "خدماتنا | خبراتنا وحلولنا البرمجية"
    : "Our Services | Expertise & Software Solutions";

  const description = lang === "ar"
    ? "اكتشف خدمات شركة سهلة المتخصصة في بناء وتطوير المواقع، تطبيقات الهاتف، الأنظمة السحابية والتحول الرقمي الشامل."
    : "Discover Sehle's specialized services in building and developing websites, mobile apps, cloud systems, and comprehensive digital transformation.";

  const keywords = lang === "ar"
    ? [
        "خدمات برمجية",
        "حل مشاكل الأعمال",
        "تطوير مواقع",
        "تطوير تطبيقات الجوال",
        "نظام ERP",
        "ذكاء اصطناعي",
        "برمجة مخصصة",
        "حلول سحابية"
      ]
    : [
        "software services",
        "business problem solving",
        "web development",
        "mobile app development",
        "ERP system",
        "AI solutions",
        "custom software development",
        "management solutions"
      ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    }
  };
}

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await storage.getServices(true);
  return <ServicesPageContent services={services} />;
}
