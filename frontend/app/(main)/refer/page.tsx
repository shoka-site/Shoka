import { getServerTranslation } from "@/lib/server-i18n";
import { ReferralPageClient } from "./ReferralPageClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();
  const title = lang === "ar"
    ? "برنامج الإحالة | اكسب مكافآت مع سهلة"
    : "Referral Program | Earn Rewards with Sehle";
  const description = lang === "ar"
    ? "أحِل شركة صديقة إلى سهلة واحصل على خصم على مشروعك القادم. دعنا ننمو معاً."
    : "Refer a business to Sehle and earn a discount on your next project. Let's grow together.";
  return {
    title,
    description,
    alternates: { canonical: "https://www.sehle.site/refer" },
    openGraph: { title, description },
  };
}

export default async function ReferPage() {
  const { isRtl } = await getServerTranslation();
  return <ReferralPageClient isRtl={isRtl} />;
}
