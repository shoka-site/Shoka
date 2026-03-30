"use client";

import { useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

export function TranslationProvider({ 
    children, 
    lang 
}: { 
    children: React.ReactNode; 
    lang: "en" | "ar"; 
}) {
    // Clone the global i18n instance for this specific render tree
    // and lock it to the server-provided lang. This ensures SSR and Client
    // perfectly match without relying on the global singleton state, safely
    // eliminating Hydration Mismatch errors permanently.
    const i18nInstance = useMemo(() => {
        const cloned = i18n.cloneInstance({ lng: lang });
        return cloned;
    }, [lang]);

    return (
        <I18nextProvider i18n={i18nInstance}>
            {children}
        </I18nextProvider>
    );
}
