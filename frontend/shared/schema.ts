import { z } from "zod";

// User schema
export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    surname: z.string().nullable(),
    email: z.string().email(),
});
export type User = z.infer<typeof userSchema>;
export const insertUserSchema = userSchema.omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;



// Service schema
export const serviceSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    type: z.string().default("Other"),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
    packageId: z.string().uuid().nullable().optional(),
});
export type Service = z.infer<typeof serviceSchema>;

// Project schema
export const projectSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    images: z.array(z.string()).default([]),
    categoryEn: z.string(),
    categoryAr: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    status: z.string().default("past"),
    liveUrl: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Project = z.infer<typeof projectSchema>;

// Testimonial schema
export const testimonialSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    quoteEn: z.string(),
    quoteAr: z.string(),
    authorEn: z.string(),
    authorAr: z.string(),
    roleEn: z.string(),
    roleAr: z.string(),
    rating: z.number().default(5),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;




// PlatformUpdate schema
export const platformUpdateSchema = z.object({
    id: z.string().uuid(),
    order: z.number().default(0),
    type: z.enum(["news", "achievement", "event", "new"]).default("news"),
    titleEn: z.string(),
    titleAr: z.string(),
    summaryEn: z.string(),
    summaryAr: z.string(),
    date: z.date(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type PlatformUpdate = z.infer<typeof platformUpdateSchema>;

// Industry schema
export const industrySchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Industry = z.infer<typeof industrySchema>;

// Solution schema
export const solutionSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
    industryId: z.string().uuid().nullable().optional(),
});
export type Solution = z.infer<typeof solutionSchema>;

// TeamMember schema
export const teamMemberSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    nameEn: z.string(),
    nameAr: z.string(),
    roleEn: z.string(),
    roleAr: z.string(),
    bioEn: z.string(),
    bioAr: z.string(),
    descriptionEn: z.string().optional().nullable(),
    descriptionAr: z.string().optional().nullable(),
    imageUrl: z.string(),
    resumeUrl: z.string().optional().nullable(),
    portfolioUrl: z.string().optional().nullable(),
    linkedinUrl: z.string().optional().nullable(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

// Consultation schema
export const consultationSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    company: z.string().optional(),
    message: z.string(),
    status: z.enum(["pending", "responded", "closed"]).default("pending"),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Consultation = z.infer<typeof consultationSchema>;
export const insertConsultationSchema = consultationSchema.omit({ id: true, status: true, createdAt: true, updatedAt: true });
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;

// Package schema
export const packageSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    titleEn: z.string(),
    titleAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Package = z.infer<typeof packageSchema>;
export const insertPackageSchema = packageSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export const updatePackageSchema = insertPackageSchema.partial();
export type UpdatePackage = z.infer<typeof updatePackageSchema>;

// ---------------------------------------------------------------------------
// Insert / Update schemas for all remaining entities
// ---------------------------------------------------------------------------

export const insertServiceSchema = serviceSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export const updateServiceSchema = insertServiceSchema.partial();
export type UpdateService = z.infer<typeof updateServiceSchema>;

export const insertProjectSchema = projectSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export const updateProjectSchema = insertProjectSchema.partial();
export type UpdateProject = z.infer<typeof updateProjectSchema>;

export const insertTestimonialSchema = testimonialSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export const updateTestimonialSchema = insertTestimonialSchema.partial();
export type UpdateTestimonial = z.infer<typeof updateTestimonialSchema>;

export const insertPlatformUpdateSchema = platformUpdateSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPlatformUpdate = z.infer<typeof insertPlatformUpdateSchema>;
export const updatePlatformUpdateSchema = insertPlatformUpdateSchema.partial();
export type UpdatePlatformUpdate = z.infer<typeof updatePlatformUpdateSchema>;

export const insertIndustrySchema = industrySchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertIndustry = z.infer<typeof insertIndustrySchema>;
export const updateIndustrySchema = insertIndustrySchema.partial();
export type UpdateIndustry = z.infer<typeof updateIndustrySchema>;

export const insertSolutionSchema = solutionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export const updateSolutionSchema = insertSolutionSchema.partial();
export type UpdateSolution = z.infer<typeof updateSolutionSchema>;

export const insertTeamMemberSchema = teamMemberSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export const updateTeamMemberSchema = insertTeamMemberSchema.partial();
export type UpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;

export const updateConsultationSchema = z.object({
  status: z.enum(['pending', 'responded', 'closed']),
});
export type UpdateConsultation = z.infer<typeof updateConsultationSchema>;
