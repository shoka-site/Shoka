export const revalidate = 60;
export function generateStaticParams() { return [{ lang: "en" }, { lang: "ar" }]; }
import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
    try {
        const { lang: requestedLang } = await params;
        const lang = requestedLang.split("-")[0] as "en" | "ar";
        const published = true;
        const items = await storage.getSolutions(published);
        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching solutions:", error);
        return NextResponse.json({ error: "Failed to fetch solutions" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const solution = await storage.createSolution(body);
        return NextResponse.json(solution, { status: 201 });
    } catch (error) {
        console.error("Error creating solution:", error);
        return NextResponse.json({ error: "Failed to create solution" }, { status: 500 });
    }
}
