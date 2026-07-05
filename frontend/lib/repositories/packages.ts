import { type Package } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetPackages = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.package.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { order: "asc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-packages-list"],
  { tags: ["packages"], revalidate: CACHE_TTL }
);

const cachedGetPackage = unstable_cache(
  (id: string) =>
    prisma.package.findFirst({
      where: { id, deletedAt: null },
    }),
  ["storage-package-one"],
  { tags: ["packages"], revalidate: CACHE_TTL }
);

export const packageRepository = {
  async getPackages(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Package[]> {
    return cachedGetPackages(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Package[]>;
  },

  async getPackage(id: string): Promise<Package | undefined> {
    const result = await cachedGetPackage(id);
    return (result as Package | null) || undefined;
  },

  async createPackage(pkg: Omit<Package, "id" | "createdAt" | "updatedAt">): Promise<Package> {
    const result = await prisma.package.create({ data: pkg });
    revalidateTag("packages", "max");
    return result as Package;
  },

  async updatePackage(id: string, updates: Partial<Omit<Package, "id" | "createdAt" | "updatedAt">>): Promise<Package | undefined> {
    try {
      const result = await prisma.package.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("packages", "max");
      return result as Package;
    } catch {
      return undefined;
    }
  },

  async deletePackage(id: string): Promise<boolean> {
    try {
      await prisma.package.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("packages", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getPackageCount(published?: boolean): Promise<number> {
    return await prisma.package.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
