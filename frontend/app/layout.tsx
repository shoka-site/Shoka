import type { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
// Client wrapper — holds the ssr:false dynamic import that can't live in a Server Component
import { SentryClientInit } from "@/components/SentryClientInit";
import { TranslationProvider } from "@/components/TranslationProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { cookies } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const lang = (cookieStore.get("NEXT_LOCALE")?.value as "ar" | "en") || "ar";
    const isRtl = lang === "ar";

    const SITE_NAME_LOC = isRtl 
        ? "سهلة | حلول برمجية وأنظمة إدارة متكاملة" 
        : "Sehle | Software Solutions & Management Systems";

    const description = isRtl
        ? "تقدم سهلة حلولاً برمجية مخصصة، أنظمة إدارة (ERP)، وتحولاً رقمياً لحل مشاكل الأعمال في مختلف القطاعات. نبني برمجيات الشركات التي تحتاجها."
        : "Sehle provides cutting-edge custom software solutions, management systems (ERP), and digital transformation to solve business problems across various industries.";

    const keywords = isRtl
        ? [
            "حلول برمجية", "حل مشاكل الأعمال", "أنظمة إدارة", "أنظمة ERP", "برمجيات للشركات", 
            "تطوير برمجيات مخصصة", "التحول الرقمي", "شركة تقنية", "برمجة تطبيقات", "حلول تقنية للقطاعات"
          ]
        : [
            "software solutions", "business problem solving", "management solutions", "ERP systems", 
            "industry software", "custom software development", "digital transformation", "IT company", "business software"
          ];

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: SITE_NAME_LOC,
            template: isRtl ? `%s | سهلة` : `%s | Sehle`,
        },
        description,
        keywords,
        alternates: {
            canonical: SITE_URL,
            languages: {
                "ar": SITE_URL,
                "x-default": SITE_URL,
            },
        },
        openGraph: {
            type: "website",
            locale: isRtl ? "ar_IQ" : "en_US",
            alternateLocale: isRtl ? "en_US" : "ar_IQ",
            url: SITE_URL,
            siteName: SITE_NAME_LOC,
            title: SITE_NAME_LOC,
            description,
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: isRtl ? "سهلة - حلول برمجية مبتكرة" : "Sehle - Innovative Software Solutions",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: SITE_NAME_LOC,
            description,
            images: [`${SITE_URL}/og-image.png`],
            creator: "@sehle_it",
            site: "@sehle_it",
        },
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
        icons: {
            icon: "/logoo.png",
            shortcut: "/logoo.png",
            apple: "/logoo.png",
        },
        verification: {
            google: "RLhA0Mu7GqzcdPnsd6PMxS9H_It6O9TfsSRIbeJAlWk",
        },
    };
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#000000',
};


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
            "https://www.facebook.com/profile.php?id=61575488387547",
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
