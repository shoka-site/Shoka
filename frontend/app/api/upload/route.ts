import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Basic file validation
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file name
        const filename = file.name.replace(/\s+/g, '-').toLowerCase();
        const uniqueFilename = `${Date.now()}-${filename}`;

        const uploadDir = join(process.cwd(), "public/uploads");

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Directory might already exist
        }

        const path = join(uploadDir, uniqueFilename);
        await writeFile(path, buffer);

        return NextResponse.json({ url: `/uploads/${uniqueFilename}` });
    } catch (e) {
        console.error("Error uploading file:", e);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
