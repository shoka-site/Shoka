import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const consultants = await storage.getConsultants();
        return NextResponse.json(consultants);
    } catch (error) {
        console.error("Error fetching consultants:", error);
        return NextResponse.json({ error: "Failed to fetch consultants" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const consultant = await storage.createConsultant(body);
        return NextResponse.json(consultant, { status: 201 });
    } catch (error) {
        console.error("Error creating consultant:", error);
        return NextResponse.json({ error: "Failed to create consultant" }, { status: 500 });
    }
}
