import { type TeamMember } from "@shared/schema";
import { prisma } from "../prisma";
import { unstable_cache, revalidateTag } from "next/cache";

const CACHE_TTL = 30;

const cachedGetTeamMembers = unstable_cache(
  (published: boolean | null, skip: number | null, take: number | null) =>
    prisma.teamMember.findMany({
      where: {
        deletedAt: null,
        ...(published !== null ? { published } : {}),
      },
      orderBy: { order: "asc" },
      ...(skip !== null ? { skip } : {}),
      ...(take !== null ? { take } : {}),
    }),
  ["storage-team-list"],
  { tags: ["teamMembers"], revalidate: CACHE_TTL }
);

const cachedGetTeamMember = unstable_cache(
  (id: string) =>
    prisma.teamMember.findFirst({
      where: { id, deletedAt: null },
    }),
  ["storage-team-one"],
  { tags: ["teamMembers"], revalidate: CACHE_TTL }
);

export const teamRepository = {
  async getTeamMembers(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<TeamMember[]> {
    return cachedGetTeamMembers(
      published ?? null,
      pagination?.skip ?? null,
      pagination?.take ?? null
    ) as Promise<TeamMember[]>;
  },

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const result = await cachedGetTeamMember(id);
    return (result as TeamMember | null) || undefined;
  },

  async createTeamMember(member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">): Promise<TeamMember> {
    const result = await prisma.teamMember.create({ data: member });
    revalidateTag("teamMembers", "max");
    return result as TeamMember;
  },

  async updateTeamMember(id: string, updates: Partial<Omit<TeamMember, "id" | "createdAt" | "updatedAt">>): Promise<TeamMember | undefined> {
    try {
      const result = await prisma.teamMember.update({
        where: { id, deletedAt: null },
        data: updates,
      });
      revalidateTag("teamMembers", "max");
      return result as TeamMember;
    } catch {
      return undefined;
    }
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    try {
      await prisma.teamMember.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      revalidateTag("teamMembers", "max");
      return true;
    } catch {
      return false;
    }
  },

  async getTeamMemberCount(published?: boolean): Promise<number> {
    return await prisma.teamMember.count({
      where: {
        deletedAt: null,
        ...(published !== undefined ? { published } : {}),
      },
    });
  },
};
