"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
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
        // Invalidate all public entity caches, then re-render server components
        // and clear the React Query cache so this page always reflects the latest
        // database state — not just on reload but on every navigation entry.
        //
        // Previously this only called router.refresh() on "reload" navigation type,
        // which meant soft client-side navigations would render stale ISR-cached HTML
        // even after revalidateTag() had already cleared the server-side data cache.
        // Now we always refresh when the server confirms revalidation occurred.
        fetch("/api/revalidate-all", { method: "POST" })
            .then((res) => res.json())
            .then((data: { revalidated: boolean }) => {
                if (data.revalidated) {
                    // Re-render all server components in the current page with
                    // the now-fresh server-side cache.
                    router.refresh();

                    // Discard any React Query cache that was populated before
                    // revalidation completed so client components also show fresh data.
                    queryClient.invalidateQueries();
                }
            })
            .catch(() => {
                // Best-effort — a failed revalidation is non-fatal; TTL-based
                // expiry will still refresh the cache within CACHE_TTL seconds.
            });
    }, [router]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}
