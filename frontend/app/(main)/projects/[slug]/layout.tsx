import { storage } from "@/lib/storage";

const SITE_URL = "https://www.sehle.site";

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
    const project = await storage.getProject(id);
    const title = project ? (project.titleAr || project.titleEn) : "";
    const description = project ? (project.descriptionAr || project.descriptionEn) : "";
    
    if (project && title) {
      projectSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: title,
        description: description,
        url: `${SITE_URL}/projects/${id}`,
        ...(project.images && (project.images as string[]).length > 0 && { image: project.images }),
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
            { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/projects/${id}` },
          ],
        },
      };
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
