import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const member = await prisma.teamMember.update({
            where: { id },
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
                portfolioUrl: body.portfolioUrl,
                published: body.published,
            },
        });
        return NextResponse.json(member);
    } catch (error) {
        console.error("Error updating team member:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.teamMember.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
