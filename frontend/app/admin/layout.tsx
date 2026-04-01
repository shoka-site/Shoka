"use client";

import { AuthProvider } from "@/contexts/AuthContext";

// Scope AuthProvider to /admin/* only — keeps the session check (GET /api/admin/me)
// off every public page, eliminating the 401 console error for unauthenticated visitors.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
