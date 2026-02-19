import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updateStat(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Stat not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating stat:", error);
        return NextResponse.json({ error: "Failed to update stat" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteStat(id);
        if (!deleted) {
            return NextResponse.json({ error: "Stat not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting stat:", error);
        return NextResponse.json({ error: "Failed to delete stat" }, { status: 500 });
    }
}
