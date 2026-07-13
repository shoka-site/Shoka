import { getServerTranslation } from "@/lib/server-i18n";
import WelcomePageClient from "./WelcomePageClient";
import { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  return buildMetadata({
    titleAr: "سهلة | منصة الأنظمة الرقمية والحلول البرمجية في العراق",
    titleEn: "Sehle | Leading Custom Software & ERP Systems in Iraq",
    descriptionAr: "منصة سهلة للأنظمة الرقمية والحلول البرمجية في العراق. نقدم خدمات تطوير برمجيات مخصصة، أنظمة ERP، تطبيقات هاتف، وحلول التحول الرقمي.",
    descriptionEn: "Sehle is a leading custom software development company in Iraq. We engineer bespoke ERP systems, mobile apps, and digital transformation architectures.",
    path: "/",
    keywordsAr: ["سهلة", "شركة برمجيات عراقية", "حلول برمجية في العراق", "تطوير برمجيات مخصصة", "التحول الرقمي في العراق"],
    keywordsEn: ["Sehle", "Iraq software company", "custom software development Iraq", "enterprise ERP systems"],
    lang,
  });
}

export default function Page() {
  return <WelcomePageClient />;
}
