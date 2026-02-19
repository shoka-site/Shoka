import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const solutions = await storage.getSolutions();
        return NextResponse.json(solutions);
    } catch (error) {
        console.error("Error fetching solutions:", error);
        return NextResponse.json({ error: "Failed to fetch solutions" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const solution = await storage.createSolution(body);
        return NextResponse.json(solution, { status: 201 });
    } catch (error) {
        console.error("Error creating solution:", error);
        return NextResponse.json({ error: "Failed to create solution" }, { status: 500 });
    }
}
