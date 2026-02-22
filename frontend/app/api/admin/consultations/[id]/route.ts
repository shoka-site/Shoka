import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const consultation = await storage.getConsultation(id);
        if (!consultation) {
            return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
        }
        return NextResponse.json(consultation);
    } catch (error) {
        console.error("Error fetching consultation:", error);
        return NextResponse.json({ error: "Failed to fetch consultation" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const consultation = await storage.updateConsultation(id, body);
        if (!consultation) {
            return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
        }
        return NextResponse.json(consultation);
    } catch (error) {
        console.error("Error updating consultation:", error);
        return NextResponse.json({ error: "Failed to update consultation" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await storage.deleteConsultation(id);
        if (!deleted) {
            return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting consultation:", error);
        return NextResponse.json({ error: "Failed to delete consultation" }, { status: 500 });
    }
}
