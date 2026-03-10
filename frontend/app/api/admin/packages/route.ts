import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const published = searchParams.has("published") ? searchParams.get("published") === "true" : undefined;
        const packages = await storage.getPackages(published);
        return NextResponse.json(packages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const pkg = await storage.createPackage(body);
        return NextResponse.json(pkg, { status: 201 });
    } catch (error) {
        console.error("Error creating package:", error);
        return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
    }
}
