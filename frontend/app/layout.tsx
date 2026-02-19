import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "Iraqi Platform",
    description: "Iraqi Platform Description",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-background text-foreground relative font-sans">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
