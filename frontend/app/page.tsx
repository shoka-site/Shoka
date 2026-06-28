import { getServerTranslation } from "@/lib/server-i18n";
import WelcomePageClient from "./WelcomePageClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "سهلة | حلول رقمية متكاملة في العراق"
    : "Sehla | Leading Digital Solutions & Software in Iraq";

  const description = lang === "ar"
    ? "شركة سهلة للأنظمة الرقمية والحلول البرمجية في العراق. نقدم خدمات تطوير برمجيات مخصصة، تطبيقات ويب وموبايل، وحلولاً رقمية متكاملة للشركات والمؤسسات لتحقيق التميز الرقمي."
    : "Sehle is a leading digital systems and software solutions company in Iraq. We offer custom software development, web and mobile applications, and comprehensive digital solutions to help businesses and organizations achieve digital excellence.";

  const keywords = lang === "ar"
    ? [
        "سهلة",
        "شركة برمجيات عراقية",
        "حلول برمجية في العراق",
        "تطوير برمجيات مخصصة",
        "التحول الرقمي في العراق",
        "أنظمة رقمية متكاملة",
        "تطوير تطبيقات ويب وموبايل"
      ]
    : [
        "Sehla",
        "Sehle",
        "Iraq software company",
        "custom software development",
        "digital solutions Iraq",
        "integrated digital systems",
        "web and mobile applications"
      ];

  return {
    title: { absolute: title },
    description,
    keywords,
    openGraph: {
      title,
      description,
    }
  };
}

export default function Page() {
  return <WelcomePageClient />;
}
