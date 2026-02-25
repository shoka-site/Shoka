import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const industry = await storage.getIndustry(id);
        if (!industry) {
            return NextResponse.json({ error: "Industry not found" }, { status: 404 });
        }
        return NextResponse.json(industry);
    } catch (error) {
        console.error("Error fetching industry:", error);
        return NextResponse.json({ error: "Failed to fetch industry" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await storage.updateIndustry(id, body);
        if (!updated) {
            return NextResponse.json({ error: "Industry not found" }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating industry:", error);
        return NextResponse.json({ error: "Failed to update industry" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteIndustry(id);
        if (!deleted) {
            return NextResponse.json({ error: "Industry not found" }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting industry:", error);
        return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
    }
}
