"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Depend on i18n.language (the actual string), not the i18n object itself.
        // The i18n object is a singleton — its reference never changes — so [i18n]
        // would only fire on mount. [i18n.language] correctly re-fires on every
        // language switch, keeping dir/lang in sync with the active locale.
        document.dir = i18n.dir();
        document.documentElement.lang = i18n.language;
    }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </QueryClientProvider>
    );
}
