import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "حلول برمجية لقطاع متخصص | سهلة العراق";
  let description =
    "تفاصيل الحلول البرمجية التي تقدمها سهلة لهذا القطاع في العراق — تحول رقمي مخصص لاحتياجات كل مجال.";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/content/ar/industries`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const industries = await res.json();
      const industry = Array.isArray(industries)
        ? industries.find((i: { id: string }) => i.id === id)
        : null;
      if (industry?.title) {
        title = `حلول برمجية لقطاع ${industry.title} في العراق | سهلة`;
        description = industry.description
          ? `${industry.description.slice(0, 155)}... | سهلة — شركة برمجيات عراقية`
          : `سهلة تقدم حلولاً برمجية مخصصة لقطاع ${industry.title} في العراق.`;
      }
    }
  } catch {
    // fallback to default
  }

  return {
    title,
    description,
    keywords: [
      "حلول برمجية قطاع العراق",
      "برمجة قطاع متخصص العراق",
      "industry software solution Iraq",
      "Sehle industry",
      "sector software Iraq",
      "سهلة",
    ],
    alternates: {
      canonical: `${SITE_URL}/industries/${id}`,
    },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      alternateLocale: "en_US",
      url: `${SITE_URL}/industries/${id}`,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
      creator: "@sehle_it",
    },
  };
}

export default function IndustryDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
