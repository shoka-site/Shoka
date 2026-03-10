export const revalidate = 60;
export function generateStaticParams() { return [{ lang: "en" }, { lang: "ar" }]; }
import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
    try {
        const { lang: requestedLang } = await params;
        const lang = requestedLang.split("-")[0] as "en" | "ar";
        const published = true;
        const updates = await storage.getPlatformUpdates(published);
        const transformed = transformForLanguage(updates, lang);
        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching platform updates:", error);
        return NextResponse.json({ error: "Failed to fetch platform updates" }, { status: 500 });
    }
}
