import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "خدمة برمجية متخصصة | شوكة العراق";
  let description =
    "تفاصيل الخدمة البرمجية من شوكة — الشركة العراقية الرائدة في تطوير البرمجيات والتحول الرقمي.";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${baseUrl}/api/services/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const service = await res.json();
      if (service?.title) {
        title = `${service.title} | خدمات شوكة البرمجية في العراق`;
        description = service.description
          ? `${service.description.slice(0, 155)}... | شوكة — شركة برمجيات عراقية`
          : `${service.title} — خدمة برمجية متخصصة من شوكة، الشركة العراقية الرائدة في تطوير البرمجيات.`;
      }
    }
  } catch {
    // fallback to default
  }

  return {
    title,
    description,
    keywords: [
      "خدمة برمجية العراق",
      "تطوير برمجيات العراق",
      "software service Iraq",
      "Shoka service",
      "Iraq software solution",
    ],
    alternates: {
      canonical: `${SITE_URL}/services/${id}`,
    },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      alternateLocale: "en_US",
      url: `${SITE_URL}/services/${id}`,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
      creator: "@shoka_it",
    },
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
