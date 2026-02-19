import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { adminSchema } from "@shared/schema";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const success = await storage.deleteAdmin(params.id);
        if (!success) {
            return NextResponse.json({ error: "Admin not found or failed to delete" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting admin:", error);
        return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        // Validate partial update
        const parseResult = adminSchema.omit({ id: true }).partial().safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: "Invalid admin data", details: parseResult.error }, { status: 400 });
        }

        const updatedAdmin = await storage.updateAdmin(params.id, parseResult.data as any);
        // Casting to any to avoid strict type checks on update method if not fully aligned yet,
        // strictly speaking storage.updateAdmin expects Partial<Omit<Admin, 'id'>> which matches.
        // However, existing storage pattern might need verification.
        // Let's verify storage 'updateAdmin' existence? I added it in storage.ts step.
        // Wait, I missed adding updateAdmin in storage.ts implementation step!
        // I only added getAdmins, getAdmin, getAdminByUsername, createAdmin, deleteAdmin.
        // I need to add updateAdmin to storage.ts first!
        // Discarding this file creation until storage is fixed?
        // No, I will create this file, then fix storage.ts immediately.

        if (!updatedAdmin) {
            return NextResponse.json({ error: "Admin not found or failed to update" }, { status: 404 });
        }

        return NextResponse.json(updatedAdmin);
    } catch (error) {
        console.error("Error updating admin:", error);
        return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
    }
}
