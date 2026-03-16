import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { InitialLoader } from "@/components/ui/InitialLoader";
import "./globals.css";

const SITE_NAME = "شوكة | أنظمة رقمية ذكية وحلول برمجية عراقية";
const SITE_URL = "https://www.shoka.site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | شوكة`,
    },
    description: "شوكة هي المنصة العراقية الرائدة للأنظمة الرقمية الذكية وتطوير البرمجيات. نحن متخصصون في التحول الرقمي، حيث نجمع بين الأصالة العراقية والتميز التكنولوجي الحديث لبناء المستقبل.",
    keywords: ["شوكة", "منصة شوكة", "منصة عراقية", "تحول رقمي في العراق", "تطوير برمجيات في العراق", "أنظمة ذكية", "حلول تقنية", "تكنولوجيا بغداد", "شركة برمجيات عراقية"],
    
    // Canonical and alternate languages
    alternates: {
        canonical: SITE_URL,
        languages: {
            "ar": SITE_URL,
            "en": `${SITE_URL}/en`,
        },
    },
    
    // Open Graph
    openGraph: {
        type: "website",
        locale: "ar_AR",
        alternateLocale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: "شوكة | أنظمة رقمية ذكية وحلول برمجية عراقية",
        description: "شوكة هي المنصة العراقية الرائدة للأنظمة الرقمية الذكية وتطوير البرمجيات. نحن متخصصون في التحول الرقمي.",
        images: [
            {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "شوكة - تصميم مستقبل التكنولوجيا العراقية",
            },
        ],
    },
    
    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        title: "شوكة | تميز برمجاني ورقمي عراقي",
        description: "قيادة التحول الرقمي في العراق من خلال الأنظمة الذكية والحلول البرمجية الحديثة.",
        images: [`${SITE_URL}/og-image.png`],
        creator: "@shoka_iq",
        site: "@shoka_iq",
    },
    
    // Robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    
    // Icons
    icons: {
        icon: "/og-image.png",
        shortcut: "/og-image.png",
        apple: "/og-image.png",
    },
    
    // Verification
    verification: {
        google: "google-site-verification-code",
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSON-LD structured data for Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "شوكة - منصة الأنظمة الرقمية العراقية",
        "alternateName": ["Shoka", "شوكة"],
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`,
        "description": "المنصة العراقية الرائدة للأنظمة الرقمية الذكية وتطوير البرمجيات والتحول الرقمي.",
        "foundingDate": "2024",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ankara",
            "addressCountry": "Turkey",
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English", "Turkish"],
        },
        "sameAs": [
            "https://linkedin.com/company/shoka",
            "https://twitter.com/shoka_iq",
            "https://instagram.com/shoka_iq",
        ],
    };

    // JSON-LD for WebSite with search capability
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": SITE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <html lang="ar" dir="rtl">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, userScalable=yes" />
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
            </head>
            <body className="min-h-screen bg-background text-foreground relative font-sans antialiased">
                <InitialLoader />
                <Providers>
                    {children}
                </Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
