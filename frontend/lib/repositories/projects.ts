import { type Project } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetProjects = unstable_cache(
  (published: boolean | null, featured: boolean | null, skip: number | null, take: number | null) =>
    prisma.project.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
        ...(featured !== null ? { featured } : {}),
      },
      orderBy: { order: "asc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-projects-list"],
  { tags: ["projects"], revalidate: CACHE_TTL }
);

const cachedGetProject = unstable_cache(
  (id: string) =>
    prisma.project.findFirst({
      where: { id, deletedAt: null },
    }),
  ["storage-project-one"],
  { tags: ["projects"], revalidate: CACHE_TTL }
);

export const projectRepository = {
  async getProjects(published?: boolean, featured?: boolean, pagination?: { skip?: number; take?: number }): Promise<Project[]> {
    return cachedGetProjects(
      published ?? null,
      featured ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<Project[]>;
  },

  async getProject(id: string): Promise<Project | undefined> {
    const result = await cachedGetProject(id);
    return (result as Project | null) || undefined;
  },

  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const result = await prisma.project.create({ data: project as any });
    revalidateTag("projects", "max");
    return result as Project;
  },

  async updateProject(id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Promise<Project | undefined> {
    try {
      const result = await prisma.project.update({
        where: { id, deletedAt: null },
        data: updates as any,
      });
      revalidateTag("projects", "max");
      return result as Project;
    } catch (e) {
      console.error("Prisma project update error:", e);
      return undefined;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    try {
      await prisma.project.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("projects", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getProjectCount(published?: boolean, featured?: boolean): Promise<number> {
    return await prisma.project.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
        ...(featured !== undefined ? { featured } : {}),
      },
    });
  },
};
