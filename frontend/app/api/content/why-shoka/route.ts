import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const requestedLang = searchParams.get("lang") || "en";
        const lang = requestedLang.split("-")[0] as "en" | "ar";
        const published = searchParams.get("published") !== "false";
        const points = await storage.getWhyShokaPoints(published);
        const transformed = transformForLanguage(points, lang);
        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching Why Shoka points:", error);
        return NextResponse.json({ error: "Failed to fetch Why Shoka points" }, { status: 500 });
    }
}
