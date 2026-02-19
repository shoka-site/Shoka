import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const requestedLang = searchParams.get("lang") || "en";
        const lang = requestedLang.split("-")[0] as "en" | "ar";
        const steps = await storage.getProcessSteps();
        const transformed = transformForLanguage(steps, lang);
        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching process steps:", error);
        return NextResponse.json({ error: "Failed to fetch process steps" }, { status: 500 });
    }
}
