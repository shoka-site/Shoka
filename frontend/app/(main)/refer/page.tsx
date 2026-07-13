import { getServerTranslation } from "@/lib/server-i18n";
import { ReferralPageClient } from "./ReferralPageClient";
import { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  return buildMetadata({
    titleAr: "برنامج الإحالة والشراكة | اكسب مكافآت مع سهلة",
    titleEn: "Referral & Partnership Program | Earn Rewards with Sehle",
    descriptionAr: "أحِل شركاءك وأصدقاءك إلى منصة سهلة للأنظمة الرقمية والبرمجية واحصل على مكافآت وخصومات مميزة لشركتك.",
    descriptionEn: "Refer a client or business partner to Sehle software solutions and earn exclusive rewards and credits on your future tech deployments.",
    path: "/refer",
    keywordsAr: ["برنامج الإحالة سهلة", "مكافآت الإحالة البرمجية", "شراكة تقنية العراق"],
    keywordsEn: ["Sehle referral program", "software affiliate Iraq", "tech partnership Middle East"],
    lang,
  });
}

export default async function ReferPage() {
  const { isRtl } = await getServerTranslation();
  return <ReferralPageClient isRtl={isRtl} />;
}
