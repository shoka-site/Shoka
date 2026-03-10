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
        const testimonials = await storage.getTestimonials(published);
        const transformed = transformForLanguage(testimonials, lang);
        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
    }
}
