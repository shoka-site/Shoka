import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updatePlatformUpdate(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Platform update not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating platform update:", error);
        return NextResponse.json({ error: "Failed to update platform update" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deletePlatformUpdate(id);
        if (!deleted) {
            return NextResponse.json({ error: "Platform update not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting platform update:", error);
        return NextResponse.json({ error: "Failed to delete platform update" }, { status: 500 });
    }
}
