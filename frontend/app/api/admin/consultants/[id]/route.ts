import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updateConsultant(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Consultant not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating consultant:", error);
        return NextResponse.json({ error: "Failed to update consultant" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteConsultant(id);
        if (!deleted) {
            return NextResponse.json({ error: "Consultant not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting consultant:", error);
        return NextResponse.json({ error: "Failed to delete consultant" }, { status: 500 });
    }
}
