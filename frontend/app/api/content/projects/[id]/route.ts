import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const { searchParams } = new URL(req.url);
        const requestedLang = searchParams.get("lang") || "en";
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
