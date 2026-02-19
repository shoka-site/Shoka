import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const stat = await storage.createStat(body);
        return NextResponse.json(stat, { status: 201 });
    } catch (error) {
        console.error("Error creating stat:", error);
        return NextResponse.json({ error: "Failed to create stat" }, { status: 500 });
    }
}
