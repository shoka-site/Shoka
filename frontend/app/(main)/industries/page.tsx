import { storage } from "@/lib/storage";
import { IndustriesPageContent } from "@/components/industries/IndustriesPageContent";
import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "القطاعات | القطاعات التي نخدمها"
    : "Industries | Industries We Serve";

  const description = lang === "ar"
    ? "نقدم حلولاً برمجية متخصصة ومصممة لتناسب مختلف القطاعات كالتجارة، الصحة، التعليم، المقاولات وغيرها في السوق العراقي."
    : "We provide specialized software solutions tailored to suit various industries such as retail, healthcare, education, construction, and more in Iraq.";

  const keywords = lang === "ar"
    ? [
        "حلول قطاعية",
        "برمجيات للقطاعات العراقية",
        "حلول برمجية متخصصة",
        "أنظمة إدارة الصناعات"
      ]
    : [
        "industry solutions",
        "Iraq industry software",
        "tailored business solutions",
        "industry management systems"
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

export default async function IndustriesPage() {
  const industries = await storage.getIndustries(true);
  return <IndustriesPageContent industries={industries} />;
}
