import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import ProjectDetailsClient from "./ProjectDetailsClient";
import { Metadata } from "next";
import { slugify } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await storage.getProjects(true);
  const project = projects.find(p => slugify(p.titleEn) === slug);
  const { lang } = await getServerTranslation();

  if (!project) {
    return {
      title: lang === "ar" ? "المشروع غير موجود" : "Project Not Found",
    };
  }

  const baseTitle = lang === "ar" ? (project.titleAr || project.titleEn) : project.titleEn;
  const title = lang === "ar" ? `دراسة حالة: ${baseTitle}` : `Case Study: ${baseTitle}`;
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

  const SITE_URL = "https://www.sehle.site";
  const OG_IMAGE = `${SITE_URL}/og-image.png`;
  const ogImage = project.images?.[0] || OG_IMAGE;
  const canonicalUrl = `${SITE_URL}/projects/${slug}/`;

  return {
    title,
    description: desc ? desc.substring(0, 160) : "",
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_IQ" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_IQ",
      url: canonicalUrl,
      title,
      description: desc ? desc.substring(0, 160) : "",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc ? desc.substring(0, 160) : "",
      images: [ogImage],
      creator: "@sehle_it",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await storage.getProjects(true);
  const project = projects.find(p => slugify(p.titleEn) === slug);
  const { lang } = await getServerTranslation();

  if (!project) return <ProjectDetailsClient id="" />;

  const title = lang === "ar" ? (project.titleAr || project.titleEn) : project.titleEn;
  const desc = lang === "ar" ? (project.descriptionAr || project.descriptionEn) : project.descriptionEn;
  const SITE_URL = "https://www.sehle.site";
  const OG_IMAGE = `${SITE_URL}/og-image.png`;
  const ogImage = project.images?.[0] || OG_IMAGE;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": title,
    "description": desc || undefined,
    "image": ogImage,
    "creator": {
      "@type": "Organization",
      "name": "سهلة | Sehle"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === "ar" ? "الرئيسية" : "Home",
        "item": "https://www.sehle.site/home/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === "ar" ? "المشاريع" : "Projects",
        "item": "https://www.sehle.site/projects/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `${SITE_URL}/projects/${slug}/`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectDetailsClient id={project.id} />
    </>
  );
}
