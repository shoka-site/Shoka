import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const industries = await storage.getIndustries();
        return NextResponse.json(industries);
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
