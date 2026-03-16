import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "الباقات | عروض شوكة المخصصة للأعمال",
    description: "اختر الباقة التي تناسب حجم أعمالك، من الشركات الناشئة إلى المؤسسات الكبرى، مع حلول تقنية مرنة ومتطورة.",
};

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
