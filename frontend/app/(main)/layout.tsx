import { Suspense } from "react";
import { cookies } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
// Client wrapper — ssr:false dynamic imports can't live in Server Components
import { ExitIntentPopupClient } from "@/components/marketing/ExitIntentPopupClient";

function NavbarFallback() {
    return (
        <header className="fixed inset-x-0 top-0 z-[100] bg-transparent py-4">
            <div className="container-page flex items-center justify-between gap-3">
                <div className="h-11 w-28 animate-pulse rounded-md bg-muted/60" />
                <div className="hidden gap-4 xl:flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-10 w-20 animate-pulse rounded-pill bg-muted/60" />
                    ))}
                </div>
                <div className="h-11 w-40 animate-pulse rounded-pill bg-muted/60" />
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
            <main id="main-content" tabIndex={-1} className="relative z-10 w-full outline-none">
                {children}
            </main>
            <BottomNav lang={lang} />
            <Footer lang={lang} />
            <ExitIntentPopupClient />
        </>
    );
}
