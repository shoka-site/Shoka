import { type Service } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

// Cached reader for public/admin services with pagination & soft-delete support
const cachedGetServices = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.service.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { order: "asc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-services-list"],
  { tags: ["services"], revalidate: CACHE_TTL }
);

const cachedGetService = unstable_cache(
  (id: string) =>
    prisma.service.findFirst({
      where: { id, deletedAt: null },
    }),
  ["storage-service-one"],
  { tags: ["services"], revalidate: CACHE_TTL }
);

export const serviceRepository = {
  async getServices(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Service[]> {
    return cachedGetServices(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Service[]>;
  },

  async getService(id: string): Promise<Service | undefined> {
    const result = await cachedGetService(id);
    return (result as Service | null) || undefined;
  },

  async createService(service: Omit<Service, "id" | "createdAt" | "updatedAt">): Promise<Service> {
    const result = await prisma.service.create({ data: service });
    revalidateTag("services", "max");
    return result as Service;
  },

  async updateService(id: string, updates: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>): Promise<Service | undefined> {
    try {
      const result = await prisma.service.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("services", "max");
      return result as Service;
    } catch (e) {
      console.error("Prisma service update error:", e);
      return undefined;
    }
  },

  async deleteService(id: string): Promise<boolean> {
    try {
      await prisma.service.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("services", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getServiceCount(published?: boolean): Promise<number> {
    return await prisma.service.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
