"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import "@/lib/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        // Depend on i18n.language (the actual string), not the i18n object itself.
        // The i18n object is a singleton — its reference never changes — so [i18n]
        // would only fire on mount. [i18n.language] correctly re-fires on every
        // language switch, keeping dir/lang in sync with the active locale.
        document.dir = i18n.dir();
        document.documentElement.lang = i18n.language;
    }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // Detect whether this mount was triggered by a browser reload (F5 /
        // Ctrl+R) rather than a soft client-side navigation.
        const nav = performance.getEntriesByType(
            "navigation"
        )[0] as PerformanceNavigationTiming | undefined;
        const isReload = nav?.type === "reload";

        // Invalidate all public entity caches so that subsequent server-side
        // reads bypass stale entries and fetch fresh data from the database.
        fetch("/api/revalidate-all", { method: "POST" })
            .then(() => {
                if (isReload) {
                    // Re-render all server components in the current page with
                    // the now-fresh server-side cache. Without this call the
                    // current HTML was already built from stale data; router.refresh()
                    // triggers a new server render that returns up-to-date content.
                    router.refresh();

                    // Discard any React Query cache that was populated from
                    // API routes before revalidation completed. This forces every
                    // active query to re-fetch, guaranteeing client components also
                    // display fresh data rather than the pre-revalidation snapshot.
                    queryClient.invalidateQueries();
                }
            })
            .catch(() => {
                // Best-effort — a failed revalidation is non-fatal; TTL-based
                // expiry will still refresh the cache within CACHE_TTL seconds.
            });
    }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </QueryClientProvider>
    );
}
