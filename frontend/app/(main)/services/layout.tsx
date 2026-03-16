import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "خدماتنا | حلول رقمية متكاملة من شوكة",
    description: "استكشف خدماتنا التي تشمل تطوير البرمجيات، التحول الرقمي، والأنظمة الذكية المصممة خصيصاً لنمو أعمالك في العراق.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
