import { type Testimonial } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetTestimonials = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.testimonial.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { order: "asc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-testimonials-list"],
  { tags: ["testimonials"], revalidate: CACHE_TTL }
);

const cachedGetTestimonial = unstable_cache(
  (id: string) =>
    prisma.testimonial.findFirst({
      where: { id, deletedAt: null },
    }),
  ["storage-testimonial-one"],
  { tags: ["testimonials"], revalidate: CACHE_TTL }
);

export const testimonialRepository = {
  async getTestimonials(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Testimonial[]> {
    return cachedGetTestimonials(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Testimonial[]>;
  },

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const result = await cachedGetTestimonial(id);
    return (result as Testimonial | null) || undefined;
  },

  async createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt" | "updatedAt">): Promise<Testimonial> {
    const result = await prisma.testimonial.create({ data: testimonial });
    revalidateTag("testimonials", "max");
    return result as Testimonial;
  },

  async updateTestimonial(id: string, updates: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>): Promise<Testimonial | undefined> {
    try {
      const result = await prisma.testimonial.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("testimonials", "max");
      return result as Testimonial;
    } catch {
      return undefined;
    }
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      await prisma.testimonial.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("testimonials", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getTestimonialCount(published?: boolean): Promise<number> {
    return await prisma.testimonial.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
