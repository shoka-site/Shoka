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
        const items = await storage.getIndustries(published);
        const transformed = transformForLanguage(items, lang);
        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching industries:", error);
        return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const industry = await storage.createIndustry(body);
        return NextResponse.json(industry, { status: 201 });
    } catch (error) {
        console.error("Error creating industry:", error);
        return NextResponse.json({ error: "Failed to create industry" }, { status: 500 });
    }
}
