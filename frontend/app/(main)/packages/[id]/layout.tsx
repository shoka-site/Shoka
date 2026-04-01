import type { Metadata } from "next";

const SITE_URL = "https://www.sehle.site";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let title = "باقة برمجية | حلول جاهزة من سهلة العراق";
  let description =
    "تفاصيل الباقة البرمجية من سهلة — حلول متكاملة ومصممة لاحتياجات الشركات في العراق.";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/content/ar/packages`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const packages = await res.json();
      const pkg = Array.isArray(packages)
        ? packages.find((p: { id: string }) => p.id === id)
        : null;
      if (pkg?.title) {
        title = `${pkg.title} | باقات سهلة البرمجية في العراق`;
        description = pkg.description
          ? `${pkg.description.slice(0, 155)}... | سهلة — شركة برمجيات عراقية`
          : `${pkg.title} — باقة برمجية متكاملة من سهلة مصممة لشركتك.`;
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
      "Sehle package",
      "business solution Iraq",
      "سهلة",
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
      creator: "@sehle_it",
    },
  };
}

export default function PackageDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
