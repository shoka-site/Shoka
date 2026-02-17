import { type User, type InsertUser, type HeroSlide, type Stat, type Service, type Project, type Testimonial, type WhyShokaPoint, type ProcessStep, type InsightTopic } from "@shared/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Hero Slides
  getHeroSlides(published?: boolean): Promise<HeroSlide[]>;
  getHeroSlide(id: string): Promise<HeroSlide | undefined>;
  createHeroSlide(slide: Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>): Promise<HeroSlide>;
  updateHeroSlide(id: string, slide: Partial<Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>>): Promise<HeroSlide | undefined>;
  deleteHeroSlide(id: string): Promise<boolean>;

  // Stats
  getStats(): Promise<Stat[]>;
  getStat(id: string): Promise<Stat | undefined>;
  createStat(stat: Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>): Promise<Stat>;
  updateStat(id: string, stat: Partial<Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Stat | undefined>;
  deleteStat(id: string): Promise<boolean>;

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

  // Why Shoka Points
  getWhyShokaPoints(published?: boolean): Promise<WhyShokaPoint[]>;
  getWhyShokaPoint(id: string): Promise<WhyShokaPoint | undefined>;
  createWhyShokaPoint(point: Omit<WhyShokaPoint, 'id' | 'createdAt' | 'updatedAt'>): Promise<WhyShokaPoint>;
  updateWhyShokaPoint(id: string, point: Partial<Omit<WhyShokaPoint, 'id' | 'createdAt' | 'updatedAt'>>): Promise<WhyShokaPoint | undefined>;
  deleteWhyShokaPoint(id: string): Promise<boolean>;

  // Process Steps
  getProcessSteps(): Promise<ProcessStep[]>;
  getProcessStep(id: string): Promise<ProcessStep | undefined>;
  createProcessStep(step: Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProcessStep>;
  updateProcessStep(id: string, step: Partial<Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProcessStep | undefined>;
  deleteProcessStep(id: string): Promise<boolean>;

  // Insight Topics
  getInsightTopics(published?: boolean): Promise<InsightTopic[]>;
  getInsightTopic(id: string): Promise<InsightTopic | undefined>;
  createInsightTopic(topic: Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>): Promise<InsightTopic>;
  updateInsightTopic(id: string, topic: Partial<Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>>): Promise<InsightTopic | undefined>;
  deleteInsightTopic(id: string): Promise<boolean>;
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

  // Hero Slides
  async getHeroSlides(published?: boolean): Promise<HeroSlide[]> {
    return await prisma.heroSlide.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getHeroSlide(id: string): Promise<HeroSlide | undefined> {
    return await prisma.heroSlide.findUnique({ where: { id } }) || undefined;
  }

  async createHeroSlide(slide: Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>): Promise<HeroSlide> {
    return await prisma.heroSlide.create({ data: slide });
  }

  async updateHeroSlide(id: string, updates: Partial<Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>>): Promise<HeroSlide | undefined> {
    try {
      return await prisma.heroSlide.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteHeroSlide(id: string): Promise<boolean> {
    try {
      await prisma.heroSlide.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Stats
  async getStats(): Promise<Stat[]> {
    return await prisma.stat.findMany({ orderBy: { order: 'asc' } });
  }

  async getStat(id: string): Promise<Stat | undefined> {
    return await prisma.stat.findUnique({ where: { id } }) || undefined;
  }

  async createStat(stat: Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>): Promise<Stat> {
    return await prisma.stat.create({ data: stat });
  }

  async updateStat(id: string, updates: Partial<Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Stat | undefined> {
    try {
      return await prisma.stat.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteStat(id: string): Promise<boolean> {
    try {
      await prisma.stat.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
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

  // Why Shoka Points
  async getWhyShokaPoints(published?: boolean): Promise<WhyShokaPoint[]> {
    return await prisma.whyShokaPoint.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getWhyShokaPoint(id: string): Promise<WhyShokaPoint | undefined> {
    return await prisma.whyShokaPoint.findUnique({ where: { id } }) || undefined;
  }

  async createWhyShokaPoint(point: Omit<WhyShokaPoint, 'id' | 'createdAt' | 'updatedAt'>): Promise<WhyShokaPoint> {
    return await prisma.whyShokaPoint.create({ data: point });
  }

  async updateWhyShokaPoint(id: string, updates: Partial<Omit<WhyShokaPoint, 'id' | 'createdAt' | 'updatedAt'>>): Promise<WhyShokaPoint | undefined> {
    try {
      return await prisma.whyShokaPoint.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteWhyShokaPoint(id: string): Promise<boolean> {
    try {
      await prisma.whyShokaPoint.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  // Process Steps
  async getProcessSteps(): Promise<ProcessStep[]> {
    return await prisma.processStep.findMany({ orderBy: { order: 'asc' } });
  }

  async getProcessStep(id: string): Promise<ProcessStep | undefined> {
    return await prisma.processStep.findUnique({ where: { id } }) || undefined;
  }

  async createProcessStep(step: Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProcessStep> {
    return await prisma.processStep.create({ data: step });
  }

  async updateProcessStep(id: string, updates: Partial<Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProcessStep | undefined> {
    try {
      return await prisma.processStep.update({ where: { id }, data: updates });
    } catch (e) {
      return undefined;
    }
  }

  async deleteProcessStep(id: string): Promise<boolean> {
    try {
      await prisma.processStep.delete({ where: { id } });
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
}

export const storage = new PrismaStorage();
