import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "من نحن | قصة شوكة والتميز البرمجي العراقي",
    description: "تعرف على فريق شوكة ورؤيتنا لتطوير الأنظمة الرقمية في العراق. نجمع بين التاريخ العريق والتكنولوجيا الحديثة.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
