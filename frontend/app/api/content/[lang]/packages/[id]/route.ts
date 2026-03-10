export const revalidate = 60;
export function generateStaticParams() { return [{ lang: "en" }, { lang: "ar" }]; }
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

        const pkg = await storage.getPackage(id);

        if (!pkg) {
            return NextResponse.json({ error: "Package not found" }, { status: 404 });
        }

        const transformed = transformForLanguage(pkg, lang);

        return NextResponse.json(transformed);
    } catch (error) {
        console.error("Error fetching package:", error);
        return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
    }
}
