import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "حلول برمجية لقطاع متخصص | شوكة العراق";
  let description =
    "تفاصيل الحلول البرمجية التي تقدمها شوكة لهذا القطاع في العراق — تحول رقمي مخصص لاحتياجات كل مجال.";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${baseUrl}/api/industries/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const industry = await res.json();
      if (industry?.title) {
        title = `حلول برمجية لقطاع ${industry.title} في العراق | شوكة`;
        description = industry.description
          ? `${industry.description.slice(0, 155)}... | شوكة — شركة برمجيات عراقية`
          : `شوكة تقدم حلولاً برمجية مخصصة لقطاع ${industry.title} في العراق.`;
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
      "Shoka industry",
      "sector software Iraq",
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
      creator: "@shoka_it",
    },
  };
}

export default function IndustryDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
