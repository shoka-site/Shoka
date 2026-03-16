import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "أعمالنا | مشاريع شوكة المتميزة",
    description: "معرض المشاريع التي نفذتها شوكة لمختلف القطاعات، تجسيداً لالتزامنا بالجودة والابتكار الرقمي.",
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
