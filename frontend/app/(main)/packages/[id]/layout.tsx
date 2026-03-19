import type { Metadata } from "next";

const SITE_URL = "https://www.shoka.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "باقة برمجية | حلول جاهزة من شوكة العراق";
  let description =
    "تفاصيل الباقة البرمجية من شوكة — حلول متكاملة ومصممة لاحتياجات الشركات في العراق.";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${baseUrl}/api/packages/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const pkg = await res.json();
      if (pkg?.title) {
        title = `${pkg.title} | باقات شوكة البرمجية في العراق`;
        description = pkg.description
          ? `${pkg.description.slice(0, 155)}... | شوكة — شركة برمجيات عراقية`
          : `${pkg.title} — باقة برمجية متكاملة من شوكة مصممة لشركتك.`;
      }
    }
  } catch {
    // fallback to default
  }

  return {
    title,
    description,
    keywords: [
      "باقة برمجية عراق",
      "حلول جاهزة العراق",
      "software package Iraq",
      "Shoka package",
      "business solution Iraq",
    ],
    alternates: {
      canonical: `${SITE_URL}/packages/${id}`,
    },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      alternateLocale: "en_US",
      url: `${SITE_URL}/packages/${id}`,
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

export default function PackageDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
