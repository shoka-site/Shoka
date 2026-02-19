import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const update = await storage.createPlatformUpdate(body);
        return NextResponse.json(update, { status: 201 });
    } catch (error) {
        console.error("Error creating platform update:", error);
        return NextResponse.json({ error: "Failed to create platform update" }, { status: 500 });
    }
}
