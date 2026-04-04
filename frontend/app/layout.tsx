import type { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
// Client wrapper — holds the ssr:false dynamic import that can't live in a Server Component
import { InitialLoaderClient } from "@/components/ui/InitialLoaderClient";
import { SentryClientInit } from "@/components/SentryClientInit";
import { TranslationProvider } from "@/components/TranslationProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
    subsets: ["arabic", "latin"],
    // 4 weights cover all UI states (light body, regular, semibold UI, bold headings).
    // Dropping 500 and 900 removes 2 font files (~60KB) from the critical path.
    weight: ["300", "400", "600", "700"],
    variable: "--font-cairo",
    display: "swap",
    preload: true,
});

const SITE_NAME = "سهلة | شركة برمجيات وتطوير تقني في العراق";
const SITE_URL = "https://www.sehle.site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | سهلة`,
    },
    description: "سهلة — شركة برمجيات عراقية متخصصة في تطوير المواقع، التطبيقات، أنظمة ERP، والذكاء الاصطناعي. هل تبحث عن حل برمجي في العراق؟ نحن نبنيه. Software company Iraq | Web development | Mobile apps | AI.",
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
        "سهلة",
        "منصة سهلة",
        "software company Iraq",
        "web development Iraq",
        "software development Baghdad",
        "IT company Iraq",
        "digital transformation Iraq",
        "mobile app development Iraq",
        "custom software Iraq",
        "ERP system Iraq",
        "Iraq tech company",
        "Sehle",
        "Sehle software Iraq",
    ],

    // Canonical — Arabic is the primary language served to Google.
    // The site uses cookie-based language switching (same URL for both ar/en),
    // so there is no separate /en URL to reference. Using x-default to signal
    // that this canonical URL is the definitive version of the page.
    alternates: {
        canonical: SITE_URL,
        languages: {
            "ar": SITE_URL,
            "x-default": SITE_URL,
        },
    },

    // Open Graph
    openGraph: {
        type: "website",
        locale: "ar_IQ",
        alternateLocale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: "سهلة | أنظمة رقمية ذكية وحلول برمجية عراقية",
        description: "سهلة هي المنصة العراقية الرائدة للأنظمة الرقمية الذكية وتطوير البرمجيات. نحن متخصصون في التحول الرقمي.",
        images: [
            {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "سهلة - تصميم مستقبل التكنولوجيا العراقية",
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        title: "سهلة | شركة برمجيات عراقية | Iraq Software Company",
        description: "هل تبحث عن شركة برمجيات في العراق؟ سهلة تطور مواقع، تطبيقات، وأنظمة ذكية. Software company Iraq.",
        images: [`${SITE_URL}/og-image.png`],
        creator: "@sehle_it",
        site: "@sehle_it",
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
        google: "RLhA0Mu7GqzcdPnsd6PMxS9H_It6O9TfsSRIbeJAlWk",
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
    const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";
    const isRtl = lang === "ar";

    // JSON-LD structured data for Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": isRtl ? "سهلة - منصة الأنظمة الرقمية العراقية" : "Sehle - Iraqi Digital Systems Platform",
        "alternateName": ["Sehle", "سهلة"],
        "url": SITE_URL,
        "logo": `${SITE_URL}/logoo.png`,
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
            "https://www.linkedin.com/company/sehle/",
            "https://x.com/sehle_it",
            "https://www.instagram.com/sehle.it/",
            "https://www.tiktok.com/@sehle.it",
            "https://www.facebook.com/profile.php?id=61578501381386",
        ],
    };

    // JSON-LD for WebSite with search capability
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": isRtl ? SITE_NAME : "Sehle | Software & Tech Development in Iraq",
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
        "name": "sehle - سهلة",
        "image": `${SITE_URL}/logoo.png`,
        "url": SITE_URL,
        "telephone": "+90-543-106-1211",
        "email": "[EMAIL_ADDRESS]",
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
        <html lang={lang} dir={isRtl ? "rtl" : "ltr"} className={`${cairo.variable}`} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var c=document.cookie.match(/NEXT_LOCALE=([^;]+)/),l=c?c[1].split('-')[0]:'ar',e=document.documentElement;e.dir=l==='en'?'ltr':'rtl';e.lang=l;e.style.setProperty('--scrollbar-width',(window.innerWidth-e.clientWidth)+'px')})()`,
                    }}
                />
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
                <SentryClientInit />
                <InitialLoaderClient />
                <TranslationProvider lang={lang}>
                    <Providers>
                        {children}
                    </Providers>
                </TranslationProvider>
                <GoogleAnalytics />
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
