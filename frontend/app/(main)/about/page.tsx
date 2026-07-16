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

  const keywords = lang === "ar"
    ? [
        "عن سهلة",
        "شركة برمجيات عراقية",
        "مؤسسو سهلة",
        "مهندسون عراقيون",
        "شركة تقنية عراقية",
        "تاريخ سهلة",
        "فريق سهلة"
      ]
    : [
        "about Sehle",
        "Iraqi software founders",
        "Iraq tech startup",
        "who is Sehle",
        "Sehle company",
        "Sehle Iraq"
      ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "https://www.sehle.site/about/",
    }
  };
}

export const revalidate = 60;

export default async function AboutPage() {
  const { lang } = await getServerTranslation();
  const [teamMembers, updates] = await Promise.all([
    storage.getTeamMembers(true),
    storage.getPlatformUpdates(true),
  ]);

  const SITE_URL = "https://www.sehle.site";
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": lang === "ar" ? "من نحن | سهلة" : "About Us | Sehle",
    "description": lang === "ar"
      ? "تعرف على شركة سهلة، قصتنا، فريق عملنا من المهندسين والخبراء، ورسالتنا لتمكين الشركات العراقية من خلال الابتكار والحلول البرمجية المتطورة."
      : "Learn about Sehle, our story, our team of experts and engineers, and our mission to empower Iraqi businesses through innovation and cutting-edge software.",
    "url": `${SITE_URL}/about/`,
    "publisher": {
      "@type": "Organization",
      "name": "سهلة | Sehle",
      "url": SITE_URL
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": lang === "ar" ? "فريق عمل سهلة" : "Sehle Team Members",
      "itemListElement": teamMembers.map((member, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Person",
          "name": lang === "ar" ? (member.nameAr || member.nameEn) : member.nameEn,
          "jobTitle": lang === "ar" ? (member.roleAr || member.roleEn) : member.roleEn,
          "image": member.imageUrl || undefined,
          "sameAs": member.linkedinUrl || undefined,
          "affiliation": {
            "@type": "Organization",
            "name": "سهلة | Sehle",
            "url": SITE_URL
          }
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutPageContent teamMembers={teamMembers} updates={updates} />
    </>
  );
}
