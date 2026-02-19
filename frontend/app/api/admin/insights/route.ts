import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const topic = await storage.createInsightTopic(body);
        return NextResponse.json(topic, { status: 201 });
    } catch (error) {
        console.error("Error creating insight topic:", error);
        return NextResponse.json({ error: "Failed to create insight topic" }, { status: 500 });
    }
}
