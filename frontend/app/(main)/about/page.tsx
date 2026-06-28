import { storage } from "@/lib/storage";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "من نحن | قصتنا ورسالتنا"
    : "About Us | Our Story & Mission";

  const description = lang === "ar"
    ? "تعرف على شركة سهلة، قصتنا، فريق عملنا من المهندسين والخبراء، ورسالتنا لتمكين الشركات العراقية من خلال الابتكار والحلول البرمجية المتطورة."
    : "Learn about Sehle, our story, our team of experts and engineers, and our mission to empower Iraqi businesses through innovation and cutting-edge software.";

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

export default async function AboutPage() {
  const [teamMembers, updates] = await Promise.all([
    storage.getTeamMembers(true),
    storage.getPlatformUpdates(true),
  ]);
  return <AboutPageContent teamMembers={teamMembers} updates={updates} />;
}
