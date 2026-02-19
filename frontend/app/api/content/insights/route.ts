import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const requestedLang = searchParams.get("lang") || "en";
        const lang = requestedLang.split("-")[0] as "en" | "ar";
        const published = searchParams.get("published") !== "false";
        const topics = await storage.getInsightTopics(published);
        const transformed = transformForLanguage(topics, lang);
        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching insight topics:", error);
        return NextResponse.json({ error: "Failed to fetch insight topics" }, { status: 500 });
    }
}
