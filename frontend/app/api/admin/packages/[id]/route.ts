import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const pkg = await storage.updatePackage(id, body);
        if (!pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 });
        return NextResponse.json(pkg);
    } catch (error) {
        console.error("Error updating package:", error);
        return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const success = await storage.deletePackage(id);
        if (!success) return NextResponse.json({ error: "Package not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting package:", error);
        return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
    }
}
