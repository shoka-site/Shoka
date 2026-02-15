import { type User, type InsertUser, type HeroSlide, type Stat, type Service, type Project, type Testimonial, type WhyShokaPoint, type ProcessStep, type InsightTopic } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface with all CRUD methods
export interface IStorage {
  // User methods (existing)
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

// In-memory storage implementation (for development without DATABASE_URL)
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private heroSlides: Map<string, HeroSlide>;
  private stats: Map<string, Stat>;
  private services: Map<string, Service>;
  private projects: Map<string, Project>;
  private testimonials: Map<string, Testimonial>;
  private whyShokaPoints: Map<string, WhyShokaPoint>;
  private processSteps: Map<string, ProcessStep>;
  private insightTopics: Map<string, InsightTopic>;

  constructor() {
    this.users = new Map();
    this.heroSlides = new Map();
    this.stats = new Map();
    this.services = new Map();
    this.projects = new Map();
    this.testimonials = new Map();
    this.whyShokaPoints = new Map();
    this.processSteps = new Map();
    this.insightTopics = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Hero Slides
  async getHeroSlides(published?: boolean): Promise<HeroSlide[]> {
    let slides = Array.from(this.heroSlides.values());
    if (published !== undefined) {
      slides = slides.filter(s => s.published === published);
    }
    return slides.sort((a, b) => a.order - b.order);
  }

  async getHeroSlide(id: string): Promise<HeroSlide | undefined> {
    return this.heroSlides.get(id);
  }

  async createHeroSlide(slide: Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>): Promise<HeroSlide> {
    const id = randomUUID();
    const now = new Date();
    const newSlide: HeroSlide = { ...slide, id, createdAt: now, updatedAt: now };
    this.heroSlides.set(id, newSlide);
    return newSlide;
  }

  async updateHeroSlide(id: string, updates: Partial<Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>>): Promise<HeroSlide | undefined> {
    const slide = this.heroSlides.get(id);
    if (!slide) return undefined;
    const updated = { ...slide, ...updates, updatedAt: new Date() };
    this.heroSlides.set(id, updated);
    return updated;
  }

  async deleteHeroSlide(id: string): Promise<boolean> {
    return this.heroSlides.delete(id);
  }

  // Stats
  async getStats(): Promise<Stat[]> {
    return Array.from(this.stats.values()).sort((a, b) => a.order - b.order);
  }

  async getStat(id: string): Promise<Stat | undefined> {
    return this.stats.get(id);
  }

  async createStat(stat: Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>): Promise<Stat> {
    const id = randomUUID();
    const now = new Date();
    const newStat: Stat = { ...stat, id, createdAt: now, updatedAt: now };
    this.stats.set(id, newStat);
    return newStat;
  }

  async updateStat(id: string, updates: Partial<Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Stat | undefined> {
    const stat = this.stats.get(id);
    if (!stat) return undefined;
    const updated = { ...stat, ...updates, updatedAt: new Date() };
    this.stats.set(id, updated);
    return updated;
  }

  async deleteStat(id: string): Promise<boolean> {
    return this.stats.delete(id);
  }

  // Services
  async getServices(published?: boolean): Promise<Service[]> {
    let services = Array.from(this.services.values());
    if (published !== undefined) {
      services = services.filter(s => s.published === published);
    }
    return services.sort((a, b) => a.order - b.order);
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const id = randomUUID();
    const now = new Date();
    const newService: Service = { ...service, id, createdAt: now, updatedAt: now };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: string, updates: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    const updated = { ...service, ...updates, updatedAt: new Date() };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  // Projects
  async getProjects(published?: boolean, featured?: boolean): Promise<Project[]> {
    let projects = Array.from(this.projects.values());
    if (published !== undefined) {
      projects = projects.filter(p => p.published === published);
    }
    if (featured !== undefined) {
      projects = projects.filter(p => p.featured === featured);
    }
    return projects.sort((a, b) => a.order - b.order);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const id = randomUUID();
    const now = new Date();
    const newProject: Project = { ...project, id, createdAt: now, updatedAt: now };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...updates, updatedAt: new Date() };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Testimonials
  async getTestimonials(published?: boolean): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values());
    if (published !== undefined) {
      testimonials = testimonials.filter(t => t.published === published);
    }
    return testimonials.sort((a, b) => a.order - b.order);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> {
    const id = randomUUID();
    const now = new Date();
    const newTestimonial: Testimonial = { ...testimonial, id, createdAt: now, updatedAt: now };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, updates: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;
    const updated = { ...testimonial, ...updates, updatedAt: new Date() };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Why Shoka Points
  async getWhyShokaPoints(published?: boolean): Promise<WhyShokaPoint[]> {
    let points = Array.from(this.whyShokaPoints.values());
    if (published !== undefined) {
      points = points.filter(p => p.published === published);
    }
    return points.sort((a, b) => a.order - b.order);
  }

  async getWhyShokaPoint(id: string): Promise<WhyShokaPoint | undefined> {
    return this.whyShokaPoints.get(id);
  }

  async createWhyShokaPoint(point: Omit<WhyShokaPoint, 'id' | 'createdAt' | 'updatedAt'>): Promise<WhyShokaPoint> {
    const id = randomUUID();
    const now = new Date();
    const newPoint: WhyShokaPoint = { ...point, id, createdAt: now, updatedAt: now };
    this.whyShokaPoints.set(id, newPoint);
    return newPoint;
  }

  async updateWhyShokaPoint(id: string, updates: Partial<Omit<WhyShokaPoint, 'id' | 'createdAt' | 'updatedAt'>>): Promise<WhyShokaPoint | undefined> {
    const point = this.whyShokaPoints.get(id);
    if (!point) return undefined;
    const updated = { ...point, ...updates, updatedAt: new Date() };
    this.whyShokaPoints.set(id, updated);
    return updated;
  }

  async deleteWhyShokaPoint(id: string): Promise<boolean> {
    return this.whyShokaPoints.delete(id);
  }

  // Process Steps
  async getProcessSteps(): Promise<ProcessStep[]> {
    return Array.from(this.processSteps.values()).sort((a, b) => a.order - b.order);
  }

  async getProcessStep(id: string): Promise<ProcessStep | undefined> {
    return this.processSteps.get(id);
  }

  async createProcessStep(step: Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProcessStep> {
    const id = randomUUID();
    const now = new Date();
    const newStep: ProcessStep = { ...step, id, createdAt: now, updatedAt: now };
    this.processSteps.set(id, newStep);
    return newStep;
  }

  async updateProcessStep(id: string, updates: Partial<Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProcessStep | undefined> {
    const step = this.processSteps.get(id);
    if (!step) return undefined;
    const updated = { ...step, ...updates, updatedAt: new Date() };
    this.processSteps.set(id, updated);
    return updated;
  }

  async deleteProcessStep(id: string): Promise<boolean> {
    return this.processSteps.delete(id);
  }

  // Insight Topics
  async getInsightTopics(published?: boolean): Promise<InsightTopic[]> {
    let topics = Array.from(this.insightTopics.values());
    if (published !== undefined) {
      topics = topics.filter(t => t.published === published);
    }
    return topics.sort((a, b) => a.order - b.order);
  }

  async getInsightTopic(id: string): Promise<InsightTopic | undefined> {
    return this.insightTopics.get(id);
  }

  async createInsightTopic(topic: Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>): Promise<InsightTopic> {
    const id = randomUUID();
    const now = new Date();
    const newTopic: InsightTopic = { ...topic, id, createdAt: now, updatedAt: now };
    this.insightTopics.set(id, newTopic);
    return newTopic;
  }

  async updateInsightTopic(id: string, updates: Partial<Omit<InsightTopic, 'id' | 'createdAt' | 'updatedAt'>>): Promise<InsightTopic | undefined> {
    const topic = this.insightTopics.get(id);
    if (!topic) return undefined;
    const updated = { ...topic, ...updates, updatedAt: new Date() };
    this.insightTopics.set(id, updated);
    return updated;
  }

  async deleteInsightTopic(id: string): Promise<boolean> {
    return this.insightTopics.delete(id);
  }
}

export const storage = new MemStorage();
