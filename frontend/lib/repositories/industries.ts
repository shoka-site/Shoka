import { type Industry } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetIndustries = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.industry.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { order: "asc" },
      include: {
        solutions: {
          where: { deletedAt: null },
        },
      },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-industries-list"],
  { tags: ["industries"], revalidate: CACHE_TTL }
);

const cachedGetIndustry = unstable_cache(
  (id: string) =>
    prisma.industry.findFirst({
      where: { id, deletedAt: null },
      include: {
        solutions: {
          where: { deletedAt: null },
        },
      },
    }),
  ["storage-industry-one"],
  { tags: ["industries"], revalidate: CACHE_TTL }
);

export const industryRepository = {
  async getIndustries(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Industry[]> {
    return cachedGetIndustries(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Industry[]>;
  },

  async getIndustry(id: string): Promise<Industry | undefined> {
    const result = await cachedGetIndustry(id);
    return (result as Industry | null) || undefined;
  },

  async createIndustry(industry: Omit<Industry, "id" | "createdAt" | "updatedAt">): Promise<Industry> {
    const result = await prisma.industry.create({ data: industry });
    revalidateTag("industries", "max");
    return result as Industry;
  },

  async updateIndustry(id: string, updates: Partial<Omit<Industry, "id" | "createdAt" | "updatedAt">>): Promise<Industry | undefined> {
    try {
      const result = await prisma.industry.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("industries", "max");
      return result as Industry;
    } catch {
      return undefined;
    }
  },

  async deleteIndustry(id: string): Promise<boolean> {
    try {
      await prisma.industry.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("industries", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getIndustryCount(published?: boolean): Promise<number> {
    return await prisma.industry.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
