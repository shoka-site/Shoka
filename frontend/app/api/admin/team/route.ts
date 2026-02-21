import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const member = await prisma.teamMember.create({
            data: {
                order: body.order,
                nameEn: body.nameEn,
                nameAr: body.nameAr,
                roleEn: body.roleEn,
                roleAr: body.roleAr,
                bioEn: body.bioEn,
                bioAr: body.bioAr,
                descriptionEn: body.descriptionEn,
                descriptionAr: body.descriptionAr,
                imageUrl: body.imageUrl,
                resumeUrl: body.resumeUrl,
                published: body.published ?? true,
            },
        });
        return NextResponse.json(member);
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
