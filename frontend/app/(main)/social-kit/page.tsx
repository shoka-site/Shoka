import { getServerTranslation } from "@/lib/server-i18n";
import { SocialKitClient } from "./SocialKitClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();
  const title = lang === "ar"
    ? "حقيبة المحتوى الاجتماعي | سهلة"
    : "Social Content Kit | Sehle";
  const description = lang === "ar"
    ? "قوالب منشورات وحقيبة الترويج الاجتماعي المخصصة لشركاء ومنشئي محتوى سهلة."
    : "Social content templates, scheduling strategy, and brand assets for Sehle creators.";
  return {
    title,
    description,
    alternates: { canonical: "https://www.sehle.site/social-kit/" },
    openGraph: { title, description },
  };
}

export default async function SocialKitPage() {
  const { isRtl } = await getServerTranslation();
  return <SocialKitClient isRtl={isRtl} />;
}
