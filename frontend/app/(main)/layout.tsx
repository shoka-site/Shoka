import { Suspense } from "react";
import { cookies } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// Client wrapper — ssr:false dynamic imports can't live in Server Components
import { ExitIntentPopupClient } from "@/components/marketing/ExitIntentPopupClient";

function NavbarFallback() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-transparent py-5">
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <div className="w-14 h-14 rounded-full bg-white/5 animate-pulse" />
                <div className="hidden lg:flex gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-10 w-24 rounded-full bg-white/5 animate-pulse" />
                    ))}
                </div>
                <div className="h-10 w-40 rounded-full bg-white/5 animate-pulse" />
            </div>
        </header>
    );
}

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Read the locale on the server so we can pass it to Navbar as a prop.
    // This ensures the Navbar's initial render uses the same language on both
    // the server (SSR) and the client (hydration), preventing hydration mismatches
    // caused by i18next-browser-languagedetector being unable to read cookies in Node.js.
    const cookieStore = await cookies();
    const lang = (cookieStore.get("NEXT_LOCALE")?.value as "en" | "ar") || "ar";

    return (
        <>
            <div className="fixed inset-0 z-0 bg-grain opacity-50 pointer-events-none mix-blend-multiply"></div>
            <Suspense fallback={<NavbarFallback />}>
                <Navbar lang={lang} />
            </Suspense>
            <main className="relative z-10 w-full">
                {children}
            </main>
            <Footer lang={lang} />
            <ExitIntentPopupClient />
        </>
    );
}
