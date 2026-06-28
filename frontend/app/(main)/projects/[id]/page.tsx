import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import ProjectDetailsClient from "./ProjectDetailsClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await storage.getProject(id);
  const { lang } = await getServerTranslation();

  if (!project) {
    return {
      title: lang === "ar" ? "المشروع غير موجود" : "Project Not Found",
    };
  }

  const title = lang === "ar" ? (project.titleAr || project.titleEn) : project.titleEn;
  const desc = lang === "ar" ? (project.descriptionAr || project.descriptionEn) : project.descriptionEn;

  // Retrieve keywords from the database if available, otherwise fall back to title-based keywords
  let keywords: string[] = [];
  const dbKeywords = lang === "ar" ? project.keywordsAr : project.keywordsEn;
  if (dbKeywords) {
    keywords = dbKeywords.split(/[،,]+/).map(k => k.trim()).filter(Boolean);
  } else {
    const category = lang === "ar" ? (project.categoryAr || project.categoryEn) : project.categoryEn;
    keywords = [
      title,
      category,
      ...(lang === "ar" ? ["مشروع سهلة", "سهلة البرمجية"] : ["Sehle project", "Sehle software"])
    ].filter(Boolean);
  }

  return {
    title,
    description: desc ? desc.substring(0, 160) : "",
    keywords,
    openGraph: {
      title,
      description: desc ? desc.substring(0, 160) : "",
    }
  };
}

export default async function ProjectPage() {
  return <ProjectDetailsClient />;
}
