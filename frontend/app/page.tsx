import { getServerTranslation } from "@/lib/server-i18n";
import WelcomePageClient from "./WelcomePageClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "سهلة | منصة الأنظمة الرقمية والحلول البرمجية في العراق"
    : "Sehle | Digital Systems & Software Solutions Platform in Iraq";

  const description = lang === "ar"
    ? "مرحباً بكم في منصة سهلة، شريككم الموثوق لبناء التميز الرقمي وتطوير الأنظمة البرمجية المخصصة والتحول الرقمي للشركات في العراق."
    : "Welcome to Sehle, your trusted partner for digital excellence, custom software systems, and digital transformation for businesses in Iraq.";

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
    }
  };
}

export default function Page() {
  return <WelcomePageClient />;
}
