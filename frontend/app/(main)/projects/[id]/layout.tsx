import type { Metadata } from "next";
import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const project = await storage.getProject(id);
        if (!project) return {};

        // Force Arabic for SEO metadata
        const transformed = transformForLanguage(project, "ar");

        return {
            title: transformed.title,
            description: transformed.description,
            openGraph: {
                title: transformed.title,
                description: transformed.description,
            },
            twitter: {
                title: transformed.title,
                description: transformed.description,
            },
        };
    } catch (error) {
        console.error("Error generating metadata for project:", error);
        return {};
    }
}

export default function ProjectIdLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
