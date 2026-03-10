export const revalidate = 60;
export function generateStaticParams() { return [{ lang: "en" }, { lang: "ar" }]; }
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ lang: string }> }) {
    const { lang: requestedLang } = await params;
    const lang = requestedLang.split("-")[0] as "en" | "ar";

    try {
        const members = await prisma.teamMember.findMany({
            where: { published: true },
            orderBy: { order: "asc" },
        });

        const localizedMembers = members.map((member) => ({
            id: member.id,
            name: lang === "ar" ? member.nameAr : member.nameEn,
            role: lang === "ar" ? member.roleAr : member.roleEn,
            bio: lang === "ar" ? member.bioAr : member.bioEn,
            description: lang === "ar" ? member.descriptionAr : member.descriptionEn,
            imageUrl: member.imageUrl,
            resumeUrl: member.resumeUrl,
            portfolioUrl: member.portfolioUrl,
            order: member.order,
        }));

        return NextResponse.json(localizedMembers);
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
