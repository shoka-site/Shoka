import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const step = await storage.createProcessStep(body);
        return NextResponse.json(step, { status: 201 });
    } catch (error) {
        console.error("Error creating process step:", error);
        return NextResponse.json({ error: "Failed to create process step" }, { status: 500 });
    }
}
