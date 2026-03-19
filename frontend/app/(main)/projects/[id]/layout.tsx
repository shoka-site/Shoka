import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "مشروع برمجي | معرض أعمال شوكة العراق";
  let description =
    "تفاصيل مشروع برمجي من شوكة — الشركة العراقية الرائدة في تطوير البرمجيات والأنظمة الرقمية.";
  let ogImage = OG_IMAGE;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${baseUrl}/api/projects/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const project = await res.json();
      if (project?.title) {
        title = `${project.title} | مشاريع شوكة البرمجية`;
        description = project.description
          ? `${project.description.slice(0, 155)}... | شوكة — شركة برمجيات عراقية`
          : `${project.title} — مشروع برمجي ناجح من شوكة في العراق.`;
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
      "أعمال شوكة",
      "portfolio Iraq software",
      "Shoka project",
      "Iraq software case study",
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
      creator: "@shoka_it",
    },
  };
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
