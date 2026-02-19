import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const point = await storage.createWhyShokaPoint(body);
        return NextResponse.json(point, { status: 201 });
    } catch (error) {
        console.error("Error creating Why Shoka point:", error);
        return NextResponse.json({ error: "Failed to create Why Shoka point" }, { status: 500 });
    }
}
