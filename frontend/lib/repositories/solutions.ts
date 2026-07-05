import { type Solution } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetSolutions = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.solution.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { order: "asc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-solutions-list"],
  { tags: ["solutions"], revalidate: CACHE_TTL }
);

const cachedGetSolution = unstable_cache(
  (id: string) =>
    prisma.solution.findFirst({
      where: { id, deletedAt: null },
    }),
  ["storage-solution-one"],
  { tags: ["solutions"], revalidate: CACHE_TTL }
);

export const solutionRepository = {
  async getSolutions(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Solution[]> {
    return cachedGetSolutions(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Solution[]>;
  },

  async getSolution(id: string): Promise<Solution | undefined> {
    const result = await cachedGetSolution(id);
    return (result as Solution | null) || undefined;
  },

  async createSolution(solution: Omit<Solution, "id" | "createdAt" | "updatedAt">): Promise<Solution> {
    const result = await prisma.solution.create({ data: solution });
    revalidateTag("solutions", "max");
    revalidateTag("industries", "max");
    return result as Solution;
  },

  async updateSolution(id: string, updates: Partial<Omit<Solution, "id" | "createdAt" | "updatedAt">>): Promise<Solution | undefined> {
    try {
      const result = await prisma.solution.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("solutions", "max");
      revalidateTag("industries", "max");
      return result as Solution;
    } catch {
      return undefined;
    }
  },

  async deleteSolution(id: string): Promise<boolean> {
    try {
      await prisma.solution.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("solutions", "max");
      revalidateTag("industries", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getSolutionCount(published?: boolean): Promise<number> {
    return await prisma.solution.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
