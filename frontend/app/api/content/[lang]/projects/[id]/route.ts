export const revalidate = 60;
import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string, lang: string }> }
) {
    try {
        const { id, lang: requestedLang } = await params;
        const lang = requestedLang.split("-")[0] as "en" | "ar";

        const project = await storage.getProject(id);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        const transformed = transformForLanguage(project, lang);

        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}
