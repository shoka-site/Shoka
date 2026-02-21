import { type User, type InsertUser, type Service, type Project, type Testimonial, type InsightTopic, type PlatformUpdate, type Industry, type Solution, type Consultant } from "@shared/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
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

  // Insight Topics
  getInsightTopics(published?: boolean): Promise<InsightTopic[]>;
  getInsightTopic(id: string): Promise<InsightTopic | undefined>;
  createInsightTopic(topic: Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>): Promise<InsightTopic>;
  updateInsightTopic(id: string, topic: Partial<Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>>): Promise<InsightTopic | undefined>;
  deleteInsightTopic(id: string): Promise<boolean>;

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

  // Consultants
  getConsultants(published?: boolean): Promise<Consultant[]>;
  getConsultant(id: string): Promise<Consultant | undefined>;
  createConsultant(consultant: Omit<Consultant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Consultant>;
  updateConsultant(id: string, consultant: Partial<Omit<Consultant, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Consultant | undefined>;
  deleteConsultant(id: string): Promise<boolean>;



  // Count methods for dashboard
  getServiceCount(): Promise<number>;
  getProjectCount(): Promise<number>;
  getTestimonialCount(): Promise<number>;
  getInsightTopicCount(): Promise<number>;
  getPlatformUpdateCount(): Promise<number>;
  getIndustryCount(): Promise<number>;
  getSolutionCount(): Promise<number>;
  getConsultantCount(): Promise<number>;
}

export class PrismaStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { id } }) || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { username } }) || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  // Services
  async getServices(published?: boolean): Promise<Service[]> {
    return await prisma.service.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getService(id: string): Promise<Service | undefined> {
    return await prisma.service.findUnique({ where: { id } }) || undefined;
  }

  async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    return await prisma.service.create({ data: service });
  }

  async updateService(id: string, updates: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Service | undefined> {
    try {
      return await prisma.service.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      await prisma.service.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Projects
  async getProjects(published?: boolean, featured?: boolean): Promise<Project[]> {
    return await prisma.project.findMany({
      where: {
        ...(published !== undefined ? { published } : {}),
        ...(featured !== undefined ? { featured } : {}),
      },
      orderBy: { order: 'asc' },
    });
  }

  async getProject(id: string): Promise<Project | undefined> {
    return await prisma.project.findUnique({ where: { id } }) || undefined;
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return await prisma.project.create({ data: project });
  }

  async updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project | undefined> {
    try {
      return await prisma.project.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      await prisma.project.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Testimonials
  async getTestimonials(published?: boolean): Promise<Testimonial[]> {
    return await prisma.testimonial.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return await prisma.testimonial.findUnique({ where: { id } }) || undefined;
  }

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> {
    return await prisma.testimonial.create({ data: testimonial });
  }

  async updateTestimonial(id: string, updates: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Testimonial | undefined> {
    try {
      return await prisma.testimonial.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      await prisma.testimonial.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Insight Topics
  async getInsightTopics(published?: boolean): Promise<InsightTopic[]> {
    return await prisma.insightTopic.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getInsightTopic(id: string): Promise<InsightTopic | undefined> {
    return await prisma.insightTopic.findUnique({ where: { id } }) || undefined;
  }

  async createInsightTopic(topic: Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>): Promise<InsightTopic> {
    return await prisma.insightTopic.create({ data: topic });
  }

  async updateInsightTopic(id: string, updates: Partial<Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>>): Promise<InsightTopic | undefined> {
    try {
      return await prisma.insightTopic.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteInsightTopic(id: string): Promise<boolean> {
    try {
      await prisma.insightTopic.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Platform Updates
  async getPlatformUpdates(published?: boolean): Promise<PlatformUpdate[]> {
    return await prisma.platformUpdate.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { date: 'desc' },
    }) as PlatformUpdate[];
  }

  async getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined> {
    return await prisma.platformUpdate.findUnique({ where: { id } }) as PlatformUpdate | undefined || undefined;
  }

  async createPlatformUpdate(update: Omit<PlatformUpdate, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlatformUpdate> {
    return await prisma.platformUpdate.create({ data: update }) as PlatformUpdate;
  }

  async updatePlatformUpdate(id: string, updates: Partial<Omit<PlatformUpdate, 'id' | 'createdAt' | 'updatedAt'>>): Promise<PlatformUpdate | undefined> {
    try {
      return await prisma.platformUpdate.update({ where: { id }, data: updates }) as PlatformUpdate;
    } catch (e) {
      return undefined;
    }
  }

  async deletePlatformUpdate(id: string): Promise<boolean> {
    try {
      await prisma.platformUpdate.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Industries
  async getIndustries(published?: boolean): Promise<Industry[]> {
    return await prisma.industry.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getIndustry(id: string): Promise<Industry | undefined> {
    return await prisma.industry.findUnique({ where: { id } }) || undefined;
  }

  async createIndustry(industry: Omit<Industry, 'id' | 'createdAt' | 'updatedAt'>): Promise<Industry> {
    return await prisma.industry.create({ data: industry });
  }

  async updateIndustry(id: string, updates: Partial<Omit<Industry, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Industry | undefined> {
    try {
      return await prisma.industry.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteIndustry(id: string): Promise<boolean> {
    try {
      await prisma.industry.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Solutions
  async getSolutions(published?: boolean): Promise<Solution[]> {
    return await prisma.solution.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getSolution(id: string): Promise<Solution | undefined> {
    return await prisma.solution.findUnique({ where: { id } }) || undefined;
  }

  async createSolution(solution: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>): Promise<Solution> {
    return await prisma.solution.create({ data: solution });
  }

  async updateSolution(id: string, updates: Partial<Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Solution | undefined> {
    try {
      return await prisma.solution.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteSolution(id: string): Promise<boolean> {
    try {
      await prisma.solution.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Consultants
  async getConsultants(published?: boolean): Promise<Consultant[]> {
    return await prisma.consultant.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getConsultant(id: string): Promise<Consultant | undefined> {
    return await prisma.consultant.findUnique({ where: { id } }) || undefined;
  }

  async createConsultant(consultant: Omit<Consultant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Consultant> {
    return await prisma.consultant.create({ data: consultant });
  }

  async updateConsultant(id: string, updates: Partial<Omit<Consultant, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Consultant | undefined> {
    try {
      return await prisma.consultant.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteConsultant(id: string): Promise<boolean> {
    try {
      await prisma.consultant.delete({ where: { id } });
      return true;
    } catch (e) {
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

  async getInsightTopicCount(): Promise<number> {
    return await prisma.insightTopic.count();
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

  async getConsultantCount(): Promise<number> {
    return await prisma.consultant.count();
  }

}

export const storage = new PrismaStorage();
