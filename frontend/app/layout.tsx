import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { InitialLoader } from "@/components/ui/InitialLoader";
import "./globals.css";

export const metadata: Metadata = {
    title: "Iraqi Platform",
    description: "Iraqi Platform Description",
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
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
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
