import {
  type User,
  type InsertUser,
  type Service,
  type Project,
  type Testimonial,
  type PlatformUpdate,
  type Industry,
  type Solution,
  type TeamMember,
  type Consultation,
  type InsertConsultation,
  type Package,
} from "@shared/schema";

import { userRepository } from "./repositories/users";
import { serviceRepository } from "./repositories/services";
import { projectRepository } from "./repositories/projects";
import { testimonialRepository } from "./repositories/testimonials";
import { platformUpdateRepository } from "./repositories/platform-updates";
import { industryRepository } from "./repositories/industries";
import { solutionRepository } from "./repositories/solutions";
import { teamRepository } from "./repositories/team";
import { consultationRepository } from "./repositories/consultations";
import { packageRepository } from "./repositories/packages";

import { prisma } from "./prisma";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getServices(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: Omit<Service, "id" | "createdAt" | "updatedAt">): Promise<Service>;
  updateService(id: string, service: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getProjects(published?: boolean, featured?: boolean, pagination?: { skip?: number; take?: number }): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project>;
  updateProject(id: string, project: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getTestimonials(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt" | "updatedAt">): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  getPlatformUpdates(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<PlatformUpdate[]>;
  getPlatformUpdate(id: string): Promise<PlatformUpdate | undefined>;
  createPlatformUpdate(update: Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">): Promise<PlatformUpdate>;
  updatePlatformUpdate(id: string, update: Partial<Omit<PlatformUpdate, "id" | "createdAt" | "updatedAt">>): Promise<PlatformUpdate | undefined>;
  deletePlatformUpdate(id: string): Promise<boolean>;

  getIndustries(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Industry[]>;
  getIndustry(id: string): Promise<Industry | undefined>;
  createIndustry(industry: Omit<Industry, "id" | "createdAt" | "updatedAt">): Promise<Industry>;
  updateIndustry(id: string, industry: Partial<Omit<Industry, "id" | "createdAt" | "updatedAt">>): Promise<Industry | undefined>;
  deleteIndustry(id: string): Promise<boolean>;

  getSolutions(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Solution[]>;
  getSolution(id: string): Promise<Solution | undefined>;
  createSolution(solution: Omit<Solution, "id" | "createdAt" | "updatedAt">): Promise<Solution>;
  updateSolution(id: string, solution: Partial<Omit<Solution, "id" | "createdAt" | "updatedAt">>): Promise<Solution | undefined>;
  deleteSolution(id: string): Promise<boolean>;

  getTeamMembers(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<Omit<TeamMember, "id" | "createdAt" | "updatedAt">>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  getConsultations(pagination?: { skip?: number; take?: number }): Promise<Consultation[]>;
  getConsultation(id: string): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultation(id: string, consultation: Partial<Omit<Consultation, "id" | "createdAt" | "updatedAt">>): Promise<Consultation | undefined>;
  deleteConsultation(id: string): Promise<boolean>;

  getPackages(published?: boolean, pagination?: { skip?: number; take?: number }): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: Omit<Package, "id" | "createdAt" | "updatedAt">): Promise<Package>;
  updatePackage(id: string, pkg: Partial<Omit<Package, "id" | "createdAt" | "updatedAt">>): Promise<Package | undefined>;
  deletePackage(id: string): Promise<boolean>;

  getServiceCount(published?: boolean): Promise<number>;
  getProjectCount(published?: boolean, featured?: boolean): Promise<number>;
  getTestimonialCount(published?: boolean): Promise<number>;
  getPlatformUpdateCount(published?: boolean): Promise<number>;
  getIndustryCount(published?: boolean): Promise<number>;
  getSolutionCount(published?: boolean): Promise<number>;
  getTeamMemberCount(published?: boolean): Promise<number>;
  getPackageCount(published?: boolean): Promise<number>;
  getConsultationCount(status?: string, seen?: boolean): Promise<number>;
  ping(): Promise<boolean>;
}

export class PrismaStorage implements IStorage {
  // Users
  getUser = userRepository.getUser;
  getUserByEmail = userRepository.getUserByEmail;
  createUser = userRepository.createUser;

  // Services
  getServices = serviceRepository.getServices;
  getService = serviceRepository.getService;
  createService = serviceRepository.createService;
  updateService = serviceRepository.updateService;
  deleteService = serviceRepository.deleteService;
  getServiceCount = serviceRepository.getServiceCount;

  // Projects
  getProjects = projectRepository.getProjects;
  getProject = projectRepository.getProject;
  createProject = projectRepository.createProject;
  updateProject = projectRepository.updateProject;
  deleteProject = projectRepository.deleteProject;
  getProjectCount = projectRepository.getProjectCount;

  // Testimonials
  getTestimonials = testimonialRepository.getTestimonials;
  getTestimonial = testimonialRepository.getTestimonial;
  createTestimonial = testimonialRepository.createTestimonial;
  updateTestimonial = testimonialRepository.updateTestimonial;
  deleteTestimonial = testimonialRepository.deleteTestimonial;
  getTestimonialCount = testimonialRepository.getTestimonialCount;

  // Platform Updates
  getPlatformUpdates = platformUpdateRepository.getPlatformUpdates;
  getPlatformUpdate = platformUpdateRepository.getPlatformUpdate;
  createPlatformUpdate = platformUpdateRepository.createPlatformUpdate;
  updatePlatformUpdate = platformUpdateRepository.updatePlatformUpdate;
  deletePlatformUpdate = platformUpdateRepository.deletePlatformUpdate;
  getPlatformUpdateCount = platformUpdateRepository.getPlatformUpdateCount;

  // Industries
  getIndustries = industryRepository.getIndustries;
  getIndustry = industryRepository.getIndustry;
  createIndustry = industryRepository.createIndustry;
  updateIndustry = industryRepository.updateIndustry;
  deleteIndustry = industryRepository.deleteIndustry;
  getIndustryCount = industryRepository.getIndustryCount;

  // Solutions
  getSolutions = solutionRepository.getSolutions;
  getSolution = solutionRepository.getSolution;
  createSolution = solutionRepository.createSolution;
  updateSolution = solutionRepository.updateSolution;
  deleteSolution = solutionRepository.deleteSolution;
  getSolutionCount = solutionRepository.getSolutionCount;

  // Team
  getTeamMembers = teamRepository.getTeamMembers;
  getTeamMember = teamRepository.getTeamMember;
  createTeamMember = teamRepository.createTeamMember;
  updateTeamMember = teamRepository.updateTeamMember;
  deleteTeamMember = teamRepository.deleteTeamMember;
  getTeamMemberCount = teamRepository.getTeamMemberCount;

  // Consultations
  getConsultations = consultationRepository.getConsultations;
  getConsultation = consultationRepository.getConsultation;
  createConsultation = consultationRepository.createConsultation;
  updateConsultation = consultationRepository.updateConsultation;
  deleteConsultation = consultationRepository.deleteConsultation;
  getConsultationCount = consultationRepository.getConsultationCount;

  // Packages
  getPackages = packageRepository.getPackages;
  getPackage = packageRepository.getPackage;
  createPackage = packageRepository.createPackage;
  updatePackage = packageRepository.updatePackage;
  deletePackage = packageRepository.deletePackage;
  getPackageCount = packageRepository.getPackageCount;

  async ping(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}

export const storage = new PrismaStorage();
