import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "اتصل بنا | تواصل مع فريق شوكة التقني",
    description: "نحن هنا لمساعدتك في رحلة تحولك الرقمي. تواصل معنا اليوم لمناقشة مشروعك القادم.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
