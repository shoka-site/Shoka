import { type User, type InsertUser, type Service, type Project, type Testimonial, type PlatformUpdate, type Industry, type Solution, type TeamMember, type Consultation, type InsertConsultation, type Package } from "@shared/schema";
import { PrismaClient } from "@prisma/client";
import { CacheFactory } from "./cache";

const prisma = new PrismaClient();

// Cache helper functions - uses MemoryCache from cache.ts
type MemoryCache<T> = {
  get(key: string): T | undefined;
  set(key: string, data: T): void;
};

function getCachedOrFetch<T>(cache: MemoryCache<T>, key: string, fetchFn: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) {
    return Promise.resolve(cached);
  }
  return fetchFn().then(data => {
    cache.set(key, data);
    return data;
  });
}

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Services
  getServices(published?: boolean): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service>;
  updateService(id: string, service: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  // Projects
  getProjects(published?: boolean, featured?: boolean): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  updateProject(id: string, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Testimonials
  getTestimonials(published?: boolean): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;


  // Platform Updates
  getPlatformUpdates(published?: boolean): Promise<PlatformUpdate[]>;
  getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined>;
  createPlatformUpdate(update: Omit<PlatformUpdate, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlatformUpdate>;
  updatePlatformUpdate(id: string, update: Partial<Omit<PlatformUpdate, 'id' | 'createdAt' | 'updatedAt'>>): Promise<PlatformUpdate | undefined>;
  deletePlatformUpdate(id: string): Promise<boolean>;

  // Industries
  getIndustries(published?: boolean): Promise<Industry[]>;
  getIndustry(id: string): Promise<Industry | undefined>;
  createIndustry(industry: Omit<Industry, 'id' | 'createdAt' | 'updatedAt'>): Promise<Industry>;
  updateIndustry(id: string, industry: Partial<Omit<Industry, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Industry | undefined>;
  deleteIndustry(id: string): Promise<boolean>;

  // Solutions
  getSolutions(published?: boolean): Promise<Solution[]>;
  getSolution(id: string): Promise<Solution | undefined>;
  createSolution(solution: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>): Promise<Solution>;
  updateSolution(id: string, solution: Partial<Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Solution | undefined>;
  deleteSolution(id: string): Promise<boolean>;

  // Team Members
  getTeamMembers(published?: boolean): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  // Consultations
  getConsultations(): Promise<Consultation[]>;
  getConsultation(id: string): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultation(id: string, consultation: Partial<Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Consultation | undefined>;
  deleteConsultation(id: string): Promise<boolean>;

  // Packages
  getPackages(published?: boolean): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package>;
  updatePackage(id: string, pkg: Partial<Omit<Package, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Package | undefined>;
  deletePackage(id: string): Promise<boolean>;

  // Count methods for dashboard
  getServiceCount(): Promise<number>;
  getProjectCount(): Promise<number>;
  getTestimonialCount(): Promise<number>;
  getPlatformUpdateCount(): Promise<number>;
  getIndustryCount(): Promise<number>;
  getSolutionCount(): Promise<number>;
  getTeamMemberCount(): Promise<number>;
  getPackageCount(): Promise<number>;
}

export class PrismaStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { id } }) || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { email } }) || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  // Services - with caching
  async getServices(published?: boolean): Promise<Service[]> {
    const cacheKey = `services_${published}`;
    return getCachedOrFetch(
      CacheFactory.services as unknown as MemoryCache<Service[]>,
      cacheKey,
      async () => await prisma.service.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { order: 'asc' }
      }) as Service[]
    );
  }

  async getService(id: string): Promise<Service | undefined> {
    const cacheKey = `service_${id}`;
    return getCachedOrFetch(
      CacheFactory.services as unknown as MemoryCache<Service | undefined>,
      cacheKey,
      async () => await prisma.service.findUnique({ 
        where: { id }
      }) as Service | undefined || undefined
    );
  }

  async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    CacheFactory.invalidate('services');
    return await prisma.service.create({ data: service });
  }

  async updateService(id: string, updates: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Service | undefined> {
    try {
      CacheFactory.invalidate('services');
      return await prisma.service.update({ where: { id }, data: updates });
    } catch (e) {
      console.error("Prisma update error:", e);
      return undefined;
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('services');
      await prisma.service.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Projects - with caching
  async getProjects(published?: boolean, featured?: boolean): Promise<Project[]> {
    const cacheKey = `projects_${published}_${featured}`;
    return getCachedOrFetch(
      CacheFactory.projects as unknown as MemoryCache<Project[]>,
      cacheKey,
      async () => await prisma.project.findMany({
        where: {
          ...(published !== undefined ? { published } : {}),
          ...(featured !== undefined ? { featured } : {}),
        },
        orderBy: { order: 'asc' },
      })
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    const cacheKey = `project_${id}`;
    return getCachedOrFetch(
      CacheFactory.projects as unknown as MemoryCache<Project | undefined>,
      cacheKey,
      async () => await prisma.project.findUnique({ where: { id } }) || undefined
    );
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    CacheFactory.invalidate('projects');
    return await prisma.project.create({ data: project });
  }

  async updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project | undefined> {
    try {
      CacheFactory.invalidate('projects');
      return await prisma.project.update({ where: { id }, data: updates });
    } catch (e) {
      console.error("Prisma update error:", e);
      return undefined;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('projects');
      await prisma.project.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Testimonials - with caching
  async getTestimonials(published?: boolean): Promise<Testimonial[]> {
    const cacheKey = `testimonials_${published}`;
    return getCachedOrFetch(
      CacheFactory.testimonials as unknown as MemoryCache<Testimonial[]>,
      cacheKey,
      async () => await prisma.testimonial.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { order: 'asc' },
      })
    );
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const cacheKey = `testimonial_${id}`;
    return getCachedOrFetch(
      CacheFactory.testimonials as unknown as MemoryCache<Testimonial | undefined>,
      cacheKey,
      async () => await prisma.testimonial.findUnique({ where: { id } }) || undefined
    );
  }

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> {
    CacheFactory.invalidate('testimonials');
    return await prisma.testimonial.create({ data: testimonial });
  }

  async updateTestimonial(id: string, updates: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Testimonial | undefined> {
    try {
      CacheFactory.invalidate('testimonials');
      return await prisma.testimonial.update({ where: { id }, data: updates });
    } catch {
      return undefined;
    }
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('testimonials');
      await prisma.testimonial.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }


  // Platform Updates - with caching
  async getPlatformUpdates(published?: boolean): Promise<PlatformUpdate[]> {
    const cacheKey = `platformUpdates_${published}`;
    return getCachedOrFetch(
      CacheFactory.platformUpdates as unknown as MemoryCache<PlatformUpdate[]>,
      cacheKey,
      async () => await prisma.platformUpdate.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { date: 'desc' },
      }) as PlatformUpdate[]
    );
  }

  async getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined> {
    const cacheKey = `platformUpdate_${id}`;
    return getCachedOrFetch(
      CacheFactory.platformUpdates as unknown as MemoryCache<PlatformUpdate | undefined>,
      cacheKey,
      async () => await prisma.platformUpdate.findUnique({ where: { id } }) as PlatformUpdate | undefined || undefined
    );
  }

  async createPlatformUpdate(update: Omit<PlatformUpdate, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlatformUpdate> {
    CacheFactory.invalidate('platformUpdates');
    return await prisma.platformUpdate.create({ data: update }) as PlatformUpdate;
  }

  async updatePlatformUpdate(id: string, updates: Partial<Omit<PlatformUpdate, 'id' | 'createdAt' | 'updatedAt'>>): Promise<PlatformUpdate | undefined> {
    try {
      CacheFactory.invalidate('platformUpdates');
      return await prisma.platformUpdate.update({ where: { id }, data: updates }) as PlatformUpdate;
    } catch {
      return undefined;
    }
  }

  async deletePlatformUpdate(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('platformUpdates');
      await prisma.platformUpdate.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Industries - with caching
  async getIndustries(published?: boolean): Promise<Industry[]> {
    const cacheKey = `industries_${published}`;
    return getCachedOrFetch(
      CacheFactory.industries as unknown as MemoryCache<Industry[]>,
      cacheKey,
      async () => await prisma.industry.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { order: 'asc' },
        include: { solutions: true },
      }) as Industry[]
    );
  }

  async getIndustry(id: string): Promise<Industry | undefined> {
    const cacheKey = `industry_${id}`;
    return getCachedOrFetch(
      CacheFactory.industries as unknown as MemoryCache<Industry | undefined>,
      cacheKey,
      async () => await prisma.industry.findUnique({ 
        where: { id },
        include: { solutions: true }
      }) as Industry | undefined || undefined
    );
  }

  async createIndustry(industry: Omit<Industry, 'id' | 'createdAt' | 'updatedAt'>): Promise<Industry> {
    CacheFactory.invalidate('industries');
    return await prisma.industry.create({ data: industry });
  }

  async updateIndustry(id: string, updates: Partial<Omit<Industry, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Industry | undefined> {
    try {
      CacheFactory.invalidate('industries');
      return await prisma.industry.update({ where: { id }, data: updates });
    } catch {
      return undefined;
    }
  }

  async deleteIndustry(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('industries');
      await prisma.industry.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Solutions - with caching
  async getSolutions(published?: boolean): Promise<Solution[]> {
    const cacheKey = `solutions_${published}`;
    return getCachedOrFetch(
      CacheFactory.solutions as unknown as MemoryCache<Solution[]>,
      cacheKey,
      async () => await prisma.solution.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { order: 'asc' },
      })
    );
  }

  async getSolution(id: string): Promise<Solution | undefined> {
    const cacheKey = `solution_${id}`;
    return getCachedOrFetch(
      CacheFactory.solutions as unknown as MemoryCache<Solution | undefined>,
      cacheKey,
      async () => await prisma.solution.findUnique({ where: { id } }) || undefined
    );
  }

  async createSolution(solution: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>): Promise<Solution> {
    CacheFactory.invalidate('solutions');
    return await prisma.solution.create({ data: solution });
  }

  async updateSolution(id: string, updates: Partial<Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Solution | undefined> {
    try {
      CacheFactory.invalidate('solutions');
      return await prisma.solution.update({ where: { id }, data: updates });
    } catch {
      return undefined;
    }
  }

  async deleteSolution(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('solutions');
      await prisma.solution.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Team Members - with caching
  async getTeamMembers(published?: boolean): Promise<TeamMember[]> {
    const cacheKey = `teamMembers_${published}`;
    return getCachedOrFetch(
      CacheFactory.teamMembers as unknown as MemoryCache<TeamMember[]>,
      cacheKey,
      async () => await prisma.teamMember.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { order: 'asc' },
      })
    );
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const cacheKey = `teamMember_${id}`;
    return getCachedOrFetch(
      CacheFactory.teamMembers as unknown as MemoryCache<TeamMember | undefined>,
      cacheKey,
      async () => await prisma.teamMember.findUnique({ where: { id } }) || undefined
    );
  }

  async createTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> {
    CacheFactory.invalidate('teamMembers');
    return await prisma.teamMember.create({ data: member });
  }

  async updateTeamMember(id: string, updates: Partial<Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>>): Promise<TeamMember | undefined> {
    try {
      CacheFactory.invalidate('teamMembers');
      return await prisma.teamMember.update({ where: { id }, data: updates });
    } catch {
      return undefined;
    }
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('teamMembers');
      await prisma.teamMember.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Consultations - with caching
  async getConsultations(): Promise<Consultation[]> {
    return getCachedOrFetch(
      CacheFactory.consultations as unknown as MemoryCache<Consultation[]>,
      'consultations_all',
      async () => {
        const consultations = await prisma.consultation.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return consultations as Consultation[];
      }
    );
  }

  async getConsultation(id: string): Promise<Consultation | undefined> {
    const cacheKey = `consultation_${id}`;
    return getCachedOrFetch(
      CacheFactory.consultations as unknown as MemoryCache<Consultation | undefined>,
      cacheKey,
      async () => {
        const consultation = await prisma.consultation.findUnique({ where: { id } });
        return consultation as Consultation | undefined;
      }
    );
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    CacheFactory.invalidate('consultations');
    const created = await prisma.consultation.create({ data: consultation });
    return created as Consultation;
  }

  async updateConsultation(id: string, updates: Partial<Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Consultation | undefined> {
    try {
      CacheFactory.invalidate('consultations');
      const updated = await prisma.consultation.update({ where: { id }, data: updates });
      return updated as Consultation;
    } catch {
      return undefined;
    }
  }

  async deleteConsultation(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('consultations');
      await prisma.consultation.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }



  // Count methods for dashboard
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

  // Packages - with caching
  async getPackages(published?: boolean): Promise<Package[]> {
    const cacheKey = `packages_${published}`;
    return getCachedOrFetch(
      CacheFactory.packages as unknown as MemoryCache<Package[]>,
      cacheKey,
      async () => await prisma.package.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { order: 'asc' }
      }) as Package[]
    );
  }

  async getPackage(id: string): Promise<Package | undefined> {
    const cacheKey = `package_${id}`;
    return getCachedOrFetch(
      CacheFactory.packages as unknown as MemoryCache<Package | undefined>,
      cacheKey,
      async () => await prisma.package.findUnique({
        where: { id }
      }) as Package | undefined || undefined
    );
  }

  async createPackage(pkg: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package> {
    CacheFactory.invalidate('packages');
    return await prisma.package.create({ data: pkg });
  }

  async updatePackage(id: string, updates: Partial<Omit<Package, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Package | undefined> {
    try {
      CacheFactory.invalidate('packages');
      return await prisma.package.update({ where: { id }, data: updates });
    } catch {
      return undefined;
    }
  }

  async deletePackage(id: string): Promise<boolean> {
    try {
      CacheFactory.invalidate('packages');
      await prisma.package.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async getPackageCount(): Promise<number> {
    return await prisma.package.count();
  }

}
export const storage = new PrismaStorage();
