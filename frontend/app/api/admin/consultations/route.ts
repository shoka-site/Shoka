import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const consultation = await storage.createConsultation(body);
        return NextResponse.json(consultation, { status: 201 });
    } catch (error) {
        console.error("Error creating consultation:", error);
        return NextResponse.json({ error: "Failed to create consultation" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const consultations = await storage.getConsultations();
        return NextResponse.json(consultations);
    } catch (error) {
        console.error("Error fetching consultations:", error);
        return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 });
    }
}
