import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { InitialLoader } from "@/components/ui/InitialLoader";
import "./globals.css";

const SITE_NAME = "Shoka - Iraqi Platform";
const SITE_URL = "https://www.shoka.site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: "Designing Intelligent Digital Systems. Blending heritage with modern digital excellence to build the future of technology.",
    keywords: ["Iraqi Platform", "technology", "software development", "digital transformation", "Iraq", "Turkey", "software company", "web development", "app development"],
    
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
        title: SITE_NAME,
        description: "Designing Intelligent Digital Systems. Blending heritage with modern digital excellence to build the future of technology.",
        images: [
            {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    
    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: "Designing Intelligent Digital Systems. Blending heritage with modern digital excellence to build the future of technology.",
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
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
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
    return (
        <html lang="ar" dir="rtl">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, userScalable=yes" />
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
