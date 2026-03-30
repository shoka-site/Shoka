import { type User, type InsertUser, type Service, type Project, type Testimonial, type PlatformUpdate, type Industry, type Solution, type TeamMember, type Consultation, type InsertConsultation, type Package } from "@shared/schema";
import { PrismaClient } from "@prisma/client";
import { unstable_cache, revalidateTag as _revalidateTag } from "next/cache";

// Next.js 16 requires a second `profile` argument. "max" tells the cache to
// keep revalidated data cached as long as possible (until the next mutation).
const revalidateTag = (tag: string) => _revalidateTag(tag, "max");

const prisma = new PrismaClient();

// Cache TTL: 30 seconds. Tags allow instant invalidation via revalidateTag() when admin mutates content.
// Kept short so stale data is never served for more than 30s even if tag invalidation is missed.
const CACHE_TTL = 30;

// ---------------------------------------------------------------------------
// Module-level cached Prisma reads — unstable_cache persists across requests
// and across server restarts (Next.js Data Cache). Each entity has its own tag
// so mutations can surgically invalidate only the affected entity.
// ---------------------------------------------------------------------------

const cachedGetServices = unstable_cache(
  (published: boolean | null) =>
    prisma.service.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { order: "asc" },
    }),
  ["storage-services-list"],
  { tags: ["services"], revalidate: CACHE_TTL }
);

const cachedGetService = unstable_cache(
  (id: string) => prisma.service.findUnique({ where: { id } }),
  ["storage-service-one"],
  { tags: ["services"], revalidate: CACHE_TTL }
);

const cachedGetProjects = unstable_cache(
  (published: boolean | null, featured: boolean | null) =>
    prisma.project.findMany({
      where: {
        ...(published !== null ? { published } : {}),
        ...(featured !== null ? { featured } : {}),
      },
      orderBy: { order: "asc" },
    }),
  ["storage-projects-list"],
  { tags: ["projects"], revalidate: CACHE_TTL }
);

const cachedGetProject = unstable_cache(
  (id: string) => prisma.project.findUnique({ where: { id } }),
  ["storage-project-one"],
  { tags: ["projects"], revalidate: CACHE_TTL }
);

const cachedGetTestimonials = unstable_cache(
  (published: boolean | null) =>
    prisma.testimonial.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { order: "asc" },
    }),
  ["storage-testimonials-list"],
  { tags: ["testimonials"], revalidate: CACHE_TTL }
);

const cachedGetTestimonial = unstable_cache(
  (id: string) => prisma.testimonial.findUnique({ where: { id } }),
  ["storage-testimonial-one"],
  { tags: ["testimonials"], revalidate: CACHE_TTL }
);

const cachedGetPlatformUpdates = unstable_cache(
  (published: boolean | null) =>
    prisma.platformUpdate.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { date: "desc" },
    }),
  ["storage-platform-updates-list"],
  { tags: ["platformUpdates"], revalidate: CACHE_TTL }
);

const cachedGetPlatformUpdate = unstable_cache(
  (id: string) => prisma.platformUpdate.findUnique({ where: { id } }),
  ["storage-platform-update-one"],
  { tags: ["platformUpdates"], revalidate: CACHE_TTL }
);

const cachedGetIndustries = unstable_cache(
  (published: boolean | null) =>
    prisma.industry.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { order: "asc" },
      include: { solutions: true },
    }),
  ["storage-industries-list"],
  { tags: ["industries"], revalidate: CACHE_TTL }
);

const cachedGetIndustry = unstable_cache(
  (id: string) =>
    prisma.industry.findUnique({ where: { id }, include: { solutions: true } }),
  ["storage-industry-one"],
  { tags: ["industries"], revalidate: CACHE_TTL }
);

const cachedGetSolutions = unstable_cache(
  (published: boolean | null) =>
    prisma.solution.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { order: "asc" },
    }),
  ["storage-solutions-list"],
  { tags: ["solutions"], revalidate: CACHE_TTL }
);

const cachedGetSolution = unstable_cache(
  (id: string) => prisma.solution.findUnique({ where: { id } }),
  ["storage-solution-one"],
  { tags: ["solutions"], revalidate: CACHE_TTL }
);

const cachedGetTeamMembers = unstable_cache(
  (published: boolean | null) =>
    prisma.teamMember.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { order: "asc" },
    }),
  ["storage-team-list"],
  { tags: ["teamMembers"], revalidate: CACHE_TTL }
);

const cachedGetTeamMember = unstable_cache(
  (id: string) => prisma.teamMember.findUnique({ where: { id } }),
  ["storage-team-one"],
  { tags: ["teamMembers"], revalidate: CACHE_TTL }
);

const cachedGetPackages = unstable_cache(
  (published: boolean | null) =>
    prisma.package.findMany({
      where: published !== null ? { published } : undefined,
      orderBy: { order: "asc" },
    }),
  ["storage-packages-list"],
  { tags: ["packages"], revalidate: CACHE_TTL }
);

const cachedGetPackage = unstable_cache(
  (id: string) => prisma.package.findUnique({ where: { id } }),
  ["storage-package-one"],
  { tags: ["packages"], revalidate: CACHE_TTL }
);

// Consultations are admin-only — no public caching needed, but cache for admin list performance
const cachedGetConsultations = unstable_cache(
  () =>
    prisma.consultation.findMany({ orderBy: { createdAt: "desc" } }),
  ["storage-consultations-list"],
  { tags: ["consultations"], revalidate: 60 }
);

const cachedGetConsultation = unstable_cache(
  (id: string) => prisma.consultation.findUnique({ where: { id } }),
  ["storage-consultation-one"],
  { tags: ["consultations"], revalidate: 60 }
);

// ---------------------------------------------------------------------------
// Storage interfaces
// ---------------------------------------------------------------------------

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getServices(published?: boolean): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: Omit<Service, "id" | "createdAt" | "updatedAt">): Promise<Service>;
  updateService(id: string, service: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getProjects(published?: boolean, featured?: boolean): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project>;
  updateProject(id: string, project: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getTestimonials(published?: boolean): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt" | "updatedAt">): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  getPlatformUpdates(published?: boolean): Promise<PlatformUpdate[]>;
  getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined>;
  createPlatformUpdate(update: Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">): Promise<PlatformUpdate>;
  updatePlatformUpdate(id: string, update: Partial<Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">>): Promise<PlatformUpdate | undefined>;
  deletePlatformUpdate(id: string): Promise<boolean>;

  getIndustries(published?: boolean): Promise<Industry[]>;
  getIndustry(id: string): Promise<Industry | undefined>;
  createIndustry(industry: Omit<Industry, "id" | "createdAt" | "updatedAt">): Promise<Industry>;
  updateIndustry(id: string, industry: Partial<Omit<Industry, "id" | "createdAt" | "updatedAt">>): Promise<Industry | undefined>;
  deleteIndustry(id: string): Promise<boolean>;

  getSolutions(published?: boolean): Promise<Solution[]>;
  getSolution(id: string): Promise<Solution | undefined>;
  createSolution(solution: Omit<Solution, "id" | "createdAt" | "updatedAt">): Promise<Solution>;
  updateSolution(id: string, solution: Partial<Omit<Solution, "id" | "createdAt" | "updatedAt">>): Promise<Solution | undefined>;
  deleteSolution(id: string): Promise<boolean>;

  getTeamMembers(published?: boolean): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<Omit<TeamMember, "id" | "createdAt" | "updatedAt">>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  getConsultations(): Promise<Consultation[]>;
  getConsultation(id: string): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultation(id: string, consultation: Partial<Omit<Consultation, "id" | "createdAt" | "updatedAt">>): Promise<Consultation | undefined>;
  deleteConsultation(id: string): Promise<boolean>;

  getPackages(published?: boolean): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: Omit<Package, "id" | "createdAt" | "updatedAt">): Promise<Package>;
  updatePackage(id: string, pkg: Partial<Omit<Package, "id" | "createdAt" | "updatedAt">>): Promise<Package | undefined>;
  deletePackage(id: string): Promise<boolean>;

  getServiceCount(): Promise<number>;
  getProjectCount(): Promise<number>;
  getTestimonialCount(): Promise<number>;
  getPlatformUpdateCount(): Promise<number>;
  getIndustryCount(): Promise<number>;
  getSolutionCount(): Promise<number>;
  getTeamMemberCount(): Promise<number>;
  getPackageCount(): Promise<number>;
}

// ---------------------------------------------------------------------------
// PrismaStorage implementation
// ---------------------------------------------------------------------------

export class PrismaStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return (await prisma.user.findUnique({ where: { id } })) || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return (await prisma.user.findUnique({ where: { email } })) || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  // ----- Services -----

  async getServices(published?: boolean): Promise<Service[]> {
    return cachedGetServices(published ?? null) as Promise<Service[]>;
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await cachedGetService(id);
    return (result as Service | null) || undefined;
  }

  async createService(service: Omit<Service, "id" | "createdAt" | "updatedAt">): Promise<Service> {
    const result = await prisma.service.create({ data: service });
    revalidateTag("services");
    return result as Service;
  }

  async updateService(id: string, updates: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>): Promise<Service | undefined> {
    try {
      const result = await prisma.service.update({ where: { id }, data: updates });
      revalidateTag("services");
      return result as Service;
    } catch (e) {
      console.error("Prisma update error:", e);
      return undefined;
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      await prisma.service.delete({ where: { id } });
      revalidateTag("services");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Projects -----

  async getProjects(published?: boolean, featured?: boolean): Promise<Project[]> {
    return cachedGetProjects(published ?? null, featured ?? null) as Promise<Project[]>;
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await cachedGetProject(id);
    return (result as Project | null) || undefined;
  }

  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const result = await prisma.project.create({ data: project });
    revalidateTag("projects");
    return result as Project;
  }

  async updateProject(id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Promise<Project | undefined> {
    try {
      const result = await prisma.project.update({ where: { id }, data: updates });
      revalidateTag("projects");
      return result as Project;
    } catch (e) {
      console.error("Prisma update error:", e);
      return undefined;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      await prisma.project.delete({ where: { id } });
      revalidateTag("projects");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Testimonials -----

  async getTestimonials(published?: boolean): Promise<Testimonial[]> {
    return cachedGetTestimonials(published ?? null) as Promise<Testimonial[]>;
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const result = await cachedGetTestimonial(id);
    return (result as Testimonial | null) || undefined;
  }

  async createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt" | "updatedAt">): Promise<Testimonial> {
    const result = await prisma.testimonial.create({ data: testimonial });
    revalidateTag("testimonials");
    return result as Testimonial;
  }

  async updateTestimonial(id: string, updates: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>): Promise<Testimonial | undefined> {
    try {
      const result = await prisma.testimonial.update({ where: { id }, data: updates });
      revalidateTag("testimonials");
      return result as Testimonial;
    } catch {
      return undefined;
    }
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      await prisma.testimonial.delete({ where: { id } });
      revalidateTag("testimonials");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Platform Updates -----

  async getPlatformUpdates(published?: boolean): Promise<PlatformUpdate[]> {
    return cachedGetPlatformUpdates(published ?? null) as Promise<PlatformUpdate[]>;
  }

  async getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined> {
    const result = await cachedGetPlatformUpdate(id);
    return (result as PlatformUpdate | null) || undefined;
  }

  async createPlatformUpdate(update: Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">): Promise<PlatformUpdate> {
    const result = await prisma.platformUpdate.create({ data: update });
    revalidateTag("platformUpdates");
    return result as PlatformUpdate;
  }

  async updatePlatformUpdate(id: string, updates: Partial<Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">>): Promise<PlatformUpdate | undefined> {
    try {
      const result = await prisma.platformUpdate.update({ where: { id }, data: updates });
      revalidateTag("platformUpdates");
      return result as PlatformUpdate;
    } catch {
      return undefined;
    }
  }

  async deletePlatformUpdate(id: string): Promise<boolean> {
    try {
      await prisma.platformUpdate.delete({ where: { id } });
      revalidateTag("platformUpdates");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Industries -----

  async getIndustries(published?: boolean): Promise<Industry[]> {
    return cachedGetIndustries(published ?? null) as Promise<Industry[]>;
  }

  async getIndustry(id: string): Promise<Industry | undefined> {
    const result = await cachedGetIndustry(id);
    return (result as Industry | null) || undefined;
  }

  async createIndustry(industry: Omit<Industry, "id" | "createdAt" | "updatedAt">): Promise<Industry> {
    const result = await prisma.industry.create({ data: industry });
    revalidateTag("industries");
    return result as Industry;
  }

  async updateIndustry(id: string, updates: Partial<Omit<Industry, "id" | "createdAt" | "updatedAt">>): Promise<Industry | undefined> {
    try {
      const result = await prisma.industry.update({ where: { id }, data: updates });
      revalidateTag("industries");
      return result as Industry;
    } catch {
      return undefined;
    }
  }

  async deleteIndustry(id: string): Promise<boolean> {
    try {
      await prisma.industry.delete({ where: { id } });
      revalidateTag("industries");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Solutions -----

  async getSolutions(published?: boolean): Promise<Solution[]> {
    return cachedGetSolutions(published ?? null) as Promise<Solution[]>;
  }

  async getSolution(id: string): Promise<Solution | undefined> {
    const result = await cachedGetSolution(id);
    return (result as Solution | null) || undefined;
  }

  async createSolution(solution: Omit<Solution, "id" | "createdAt" | "updatedAt">): Promise<Solution> {
    const result = await prisma.solution.create({ data: solution });
    revalidateTag("solutions");
    revalidateTag("industries"); // Industries include their solutions
    return result as Solution;
  }

  async updateSolution(id: string, updates: Partial<Omit<Solution, "id" | "createdAt" | "updatedAt">>): Promise<Solution | undefined> {
    try {
      const result = await prisma.solution.update({ where: { id }, data: updates });
      revalidateTag("solutions");
      revalidateTag("industries");
      return result as Solution;
    } catch {
      return undefined;
    }
  }

  async deleteSolution(id: string): Promise<boolean> {
    try {
      await prisma.solution.delete({ where: { id } });
      revalidateTag("solutions");
      revalidateTag("industries");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Team Members -----

  async getTeamMembers(published?: boolean): Promise<TeamMember[]> {
    return cachedGetTeamMembers(published ?? null) as Promise<TeamMember[]>;
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const result = await cachedGetTeamMember(id);
    return (result as TeamMember | null) || undefined;
  }

  async createTeamMember(member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">): Promise<TeamMember> {
    const result = await prisma.teamMember.create({ data: member });
    revalidateTag("teamMembers");
    return result as TeamMember;
  }

  async updateTeamMember(id: string, updates: Partial<Omit<TeamMember, "id" | "createdAt" | "updatedAt">>): Promise<TeamMember | undefined> {
    try {
      const result = await prisma.teamMember.update({ where: { id }, data: updates });
      revalidateTag("teamMembers");
      return result as TeamMember;
    } catch {
      return undefined;
    }
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    try {
      await prisma.teamMember.delete({ where: { id } });
      revalidateTag("teamMembers");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Consultations -----

  async getConsultations(): Promise<Consultation[]> {
    return cachedGetConsultations() as Promise<Consultation[]>;
  }

  async getConsultation(id: string): Promise<Consultation | undefined> {
    const result = await cachedGetConsultation(id);
    return (result as Consultation | null) || undefined;
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const result = await prisma.consultation.create({ data: consultation });
    revalidateTag("consultations");
    return result as Consultation;
  }

  async updateConsultation(id: string, updates: Partial<Omit<Consultation, "id" | "createdAt" | "updatedAt">>): Promise<Consultation | undefined> {
    try {
      const result = await prisma.consultation.update({ where: { id }, data: updates });
      revalidateTag("consultations");
      return result as Consultation;
    } catch {
      return undefined;
    }
  }

  async deleteConsultation(id: string): Promise<boolean> {
    try {
      await prisma.consultation.delete({ where: { id } });
      revalidateTag("consultations");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Packages -----

  async getPackages(published?: boolean): Promise<Package[]> {
    return cachedGetPackages(published ?? null) as Promise<Package[]>;
  }

  async getPackage(id: string): Promise<Package | undefined> {
    const result = await cachedGetPackage(id);
    return (result as Package | null) || undefined;
  }

  async createPackage(pkg: Omit<Package, "id" | "createdAt" | "updatedAt">): Promise<Package> {
    const result = await prisma.package.create({ data: pkg });
    revalidateTag("packages");
    return result as Package;
  }

  async updatePackage(id: string, updates: Partial<Omit<Package, "id" | "createdAt" | "updatedAt">>): Promise<Package | undefined> {
    try {
      const result = await prisma.package.update({ where: { id }, data: updates });
      revalidateTag("packages");
      return result as Package;
    } catch {
      return undefined;
    }
  }

  async deletePackage(id: string): Promise<boolean> {
    try {
      await prisma.package.delete({ where: { id } });
      revalidateTag("packages");
      return true;
    } catch {
      return false;
    }
  }

  // ----- Dashboard counts (not cached — always live for admin) -----

  async getServiceCount(): Promise<number> {
    return await prisma.service.count();
  }

  async getProjectCount(): Promise<number> {
    return await prisma.project.count();
  }

  async getTestimonialCount(): Promise<number> {
    return await prisma.testimonial.count();
  }

  async getPlatformUpdateCount(): Promise<number> {
    return await prisma.platformUpdate.count();
  }

  async getIndustryCount(): Promise<number> {
    return await prisma.industry.count();
  }

  async getSolutionCount(): Promise<number> {
    return await prisma.solution.count();
  }

  async getTeamMemberCount(): Promise<number> {
    return await prisma.teamMember.count();
  }

  async getPackageCount(): Promise<number> {
    return await prisma.package.count();
  }
}

export const storage = new PrismaStorage();
