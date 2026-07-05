import { type Consultation, type InsertConsultation } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

// Cache for admin performance
const cachedGetConsultations = unstable_cache(
  (skip: number | null, take: number | null) =>
    prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-consultations-list"],
  { tags: ["consultations"], revalidate: 60 }
);

const cachedGetConsultation = unstable_cache(
  (id: string) => prisma.consultation.findUnique({ where: { id } }),
  ["storage-consultation-one"],
  { tags: ["consultations"], revalidate: 60 }
);

export const consultationRepository = {
  async getConsultations(pagination?: { skip?: number; take?: number }): Promise<Consultation[]> {
    return cachedGetConsultations(
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Consultation[]>;
  },

  async getConsultation(id: string): Promise<Consultation | undefined> {
    const result = await cachedGetConsultation(id);
    return (result as Consultation | null) || undefined;
  },

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const result = await prisma.consultation.create({ data: consultation });
    revalidateTag("consultations", "max");
    return result as Consultation;
  },

  async updateConsultation(id: string, updates: Partial<Omit<Consultation, "id" | "createdAt" | "updatedAt">>): Promise<Consultation | undefined> {
    try {
      const result = await prisma.consultation.update({
        where: { id },
        data: updates,
      });
      revalidateTag("consultations", "max");
      return result as Consultation;
    } catch {
      return undefined;
    }
  },

  async deleteConsultation(id: string): Promise<boolean> {
    try {
      await prisma.consultation.delete({ where: { id } });
      revalidateTag("consultations", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getConsultationCount(status?: string, seen?: boolean): Promise<number> {
    return await prisma.consultation.count({
      where: {
        ...(status ? { status } : {}),
        ...(seen !== undefined ? { seen } : {}),
      },
    });
  },
};
