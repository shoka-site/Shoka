import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "مشروع برمجي | معرض أعمال سهلة العراق";
  let description =
    "تفاصيل مشروع برمجي من سهلة — الشركة العراقية في تطوير البرمجيات والأنظمة الرقمية.";
  let ogImage = OG_IMAGE;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/content/ar/projects`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const projects = await res.json();
      const project = Array.isArray(projects)
        ? projects.find((p: { id: string }) => p.id === id)
        : null;
      if (project?.title) {
        title = `${project.title} | مشاريع سهلة البرمجية`;
        description = project.description
          ? `${project.description.slice(0, 155)}... | سهلة — شركة برمجيات عراقية`
          : `${project.title} — مشروع برمجي ناجح من سهلة في العراق.`;
        if (project.images && project.images.length > 0) {
          ogImage = project.images[0];
        }
      }
    }
  } catch {
    // fallback to default
  }

  return {
    title,
    description,
    keywords: [
      "مشروع برمجي عراق",
      "أعمال سهلة",
      "portfolio Iraq software",
      "Sehle project",
      "Iraq software case study",
      "سهلة",
    ],
    alternates: {
      canonical: `${SITE_URL}/projects/${id}`,
    },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      alternateLocale: "en_US",
      url: `${SITE_URL}/projects/${id}`,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@sehle_it",
    },
  };
}

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let projectSchema = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/content/ar/projects`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const projects = await res.json();
      const project = Array.isArray(projects)
        ? projects.find((p: { id: string }) => p.id === id)
        : null;
      if (project?.title) {
        projectSchema = {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description || "",
          url: `${SITE_URL}/projects/${id}`,
          ...(project.images?.length > 0 && { image: project.images }),
          ...(project.createdAt && { dateCreated: project.createdAt }),
          creator: {
            "@type": "Organization",
            name: "سهلة | Sehle",
            url: SITE_URL,
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/home` },
              { "@type": "ListItem", position: 2, name: "المشاريع", item: `${SITE_URL}/projects` },
              { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${id}` },
            ],
          },
        };
      }
    }
  } catch {
    // fallback — no schema
  }

  return (
    <>
      {projectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}
      {children}
    </>
  );
}
