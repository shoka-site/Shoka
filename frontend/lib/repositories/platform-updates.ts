import { type PlatformUpdate } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetPlatformUpdates = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.platformUpdate.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { date: "desc" },
      include: { project: true, service: true },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-platform-updates-list"],
  { tags: ["platformUpdates"], revalidate: CACHE_TTL }
);

const cachedGetPlatformUpdate = unstable_cache(
  (id: string) =>
    prisma.platformUpdate.findFirst({
      where: { id, deletedAt: null },
      include: { project: true, service: true },
    }),
  ["storage-platform-update-one"],
  { tags: ["platformUpdates"], revalidate: CACHE_TTL }
);

export const platformUpdateRepository = {
  async getPlatformUpdates(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<PlatformUpdate[]> {
    return cachedGetPlatformUpdates(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<PlatformUpdate[]>;
  },

  async getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined> {
    const result = await cachedGetPlatformUpdate(id);
    return (result as PlatformUpdate | null) || undefined;
  },

  async createPlatformUpdate(update: Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">): Promise<PlatformUpdate> {
    const result = await prisma.platformUpdate.create({ data: update });
    revalidateTag("platformUpdates", "max");
    return result as PlatformUpdate;
  },

  async updatePlatformUpdate(id: string, updates: Partial<Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">>): Promise<PlatformUpdate | undefined> {
    try {
      const result = await prisma.platformUpdate.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("platformUpdates", "max");
      return result as PlatformUpdate;
    } catch {
      return undefined;
    }
  },

  async deletePlatformUpdate(id: string): Promise<boolean> {
    try {
      await prisma.platformUpdate.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("platformUpdates", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getPlatformUpdateCount(published?: boolean): Promise<number> {
    return await prisma.platformUpdate.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
