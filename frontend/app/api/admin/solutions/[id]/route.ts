import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updateSolution(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Solution not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating solution:", error);
        return NextResponse.json({ error: "Failed to update solution" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteSolution(id);
        if (!deleted) {
            return NextResponse.json({ error: "Solution not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting solution:", error);
        return NextResponse.json({ error: "Failed to delete solution" }, { status: 500 });
    }
}
