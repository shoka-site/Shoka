import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updateHeroSlide(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating hero slide:", error);
        return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteHeroSlide(id);
        if (!deleted) {
            return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting hero slide:", error);
        return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
    }
}
