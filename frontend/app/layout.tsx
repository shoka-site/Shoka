import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { InitialLoader } from "@/components/ui/InitialLoader";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readexPro = Readex_Pro({
    subsets: ["arabic", "latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-readex-pro",
    display: "swap",
});

const SITE_NAME = "شوكة | شركة برمجيات وتطوير تقني في العراق";
const SITE_URL = "https://www.shoka.site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | شوكة`,
    },
    description: "شوكة — شركة برمجيات عراقية متخصصة في تطوير المواقع، التطبيقات، أنظمة ERP، والذكاء الاصطناعي. هل تبحث عن حل برمجي في العراق؟ نحن نبنيه. Software company Iraq | Web development | Mobile apps | AI.",
    keywords: [
        "شركة برمجيات عراقية",
        "تطوير برمجيات في العراق",
        "برمجة مواقع العراق",
        "تطوير تطبيقات العراق",
        "تحول رقمي العراق",
        "حلول برمجية بغداد",
        "شركة تقنية عراقية",
        "نظام ERP العراق",
        "ذكاء اصطناعي العراق",
        "برمجة تطبيقات الجوال العراق",
        "شوكة",
        "منصة شوكة",
        "software company Iraq",
        "web development Iraq",
        "software development Baghdad",
        "IT company Iraq",
        "digital transformation Iraq",
        "mobile app development Iraq",
        "custom software Iraq",
        "ERP system Iraq",
        "Iraq tech company",
        "Shoka",
        "Shoka software Iraq",
    ],

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
        title: "شوكة | شركة برمجيات عراقية | Iraq Software Company",
        description: "هل تبحث عن شركة برمجيات في العراق؟ شوكة تطور مواقع، تطبيقات، وأنظمة ذكية. Software company Iraq.",
        images: [`${SITE_URL}/og-image.png`],
        creator: "@shoka_it",
        site: "@shoka_it",
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

import { cookies } from "next/headers";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const lang = cookieStore.get("NEXT_LOCALE")?.value || "ar";
    const isRtl = lang === "ar";

    // JSON-LD structured data for Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": isRtl ? "شوكة - منصة الأنظمة الرقمية العراقية" : "Shoka - Iraqi Digital Systems Platform",
        "alternateName": ["Shoka", "شوكة"],
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`,
        "description": isRtl
            ? "المنصة العراقية الرائدة للأنظمة الرقمية الذكية وتطوير البرمجيات والتحول الرقمي."
            : "The leading Iraqi platform for intelligent digital systems, software development, and digital transformation.",
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
            "https://www.linkedin.com/company/shoka-global/",
            "https://x.com/shoka_it",
            "https://www.instagram.com/shoka.it/",
            "https://www.tiktok.com/@shoka.it",
            "https://www.facebook.com/profile.php?id=61578501381386",
        ],
    };

    // JSON-LD for WebSite with search capability
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": isRtl ? SITE_NAME : "SHOKA | Software & Tech Development in Iraq",
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

    // JSON-LD for LocalBusiness
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Shoka - شوكة",
        "image": `${SITE_URL}/logo.png`,
        "url": SITE_URL,
        "telephone": "+90-000-000-0000",
        "email": "global@shoka.site",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kızılay",
            "addressLocality": "Ankara",
            "addressCountry": "TR",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.9208,
            "longitude": 32.8541,
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00",
        },
        "priceRange": "$$",
        "areaServed": ["Iraq", "Turkey", "Middle East"],
        "knowsLanguage": ["Arabic", "English", "Turkish"],
    };

    return (
        <html lang={lang} dir={isRtl ? "rtl" : "ltr"} className={readexPro.variable}>
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body className="min-h-screen bg-background text-foreground relative font-sans antialiased overflow-x-hidden">
                <InitialLoader />
                <Providers>
                    {children}
                </Providers>
                <GoogleAnalytics />
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
