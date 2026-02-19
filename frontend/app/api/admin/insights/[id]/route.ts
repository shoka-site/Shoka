import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updateInsightTopic(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Insight topic not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating insight topic:", error);
        return NextResponse.json({ error: "Failed to update insight topic" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteInsightTopic(id);
        if (!deleted) {
            return NextResponse.json({ error: "Insight topic not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting insight topic:", error);
        return NextResponse.json({ error: "Failed to delete insight topic" }, { status: 500 });
    }
}
