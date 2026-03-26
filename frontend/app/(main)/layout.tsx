import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExitIntentPopup from "@/components/marketing/ExitIntentPopup";

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

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="fixed inset-0 z-0 bg-grain opacity-50 pointer-events-none mix-blend-multiply"></div>
            <Suspense fallback={<NavbarFallback />}>
                <Navbar />
            </Suspense>
            <main className="relative z-10 w-full">
                {children}
            </main>
            <Footer />
            <ExitIntentPopup />
        </>
    );
}
