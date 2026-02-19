import { z } from "zod";

// User schema
export const userSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1),
    password: z.string().min(1),
});
export type User = z.infer<typeof userSchema>;
export const insertUserSchema = userSchema.omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;

// HeroSlide schema
export const heroSlideSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    imageUrl: z.string(),
    badgeEn: z.string(),
    badgeAr: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type HeroSlide = z.infer<typeof heroSlideSchema>;

// Stat schema
export const statSchema = z.object({
    id: z.string().uuid(),
    key: z.string(),
    numberEn: z.string(),
    numberAr: z.string(),
    labelEn: z.string(),
    labelAr: z.string(),
    order: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Stat = z.infer<typeof statSchema>;

// Service schema
export const serviceSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    iconName: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Service = z.infer<typeof serviceSchema>;

// Project schema
export const projectSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    imageUrl: z.string(),
    categoryEn: z.string(),
    categoryAr: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    status: z.string().default("past"),
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

// WhyShokaPoint schema
export const whyShokaPointSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    iconName: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type WhyShokaPoint = z.infer<typeof whyShokaPointSchema>;

// ProcessStep schema
export const processStepSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    stepNumber: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type ProcessStep = z.infer<typeof processStepSchema>;

// InsightTopic schema
export const insightTopicSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    readTimeEn: z.string(),
    readTimeAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type InsightTopic = z.infer<typeof insightTopicSchema>;

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
    iconName: z.string(),
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
    iconName: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Solution = z.infer<typeof solutionSchema>;

// Consultant schema
export const consultantSchema = z.object({
    id: z.string().uuid(),
    order: z.number(),
    nameEn: z.string(),
    nameAr: z.string(),
    roleEn: z.string(),
    roleAr: z.string(),
    bioEn: z.string(),
    bioAr: z.string(),
    imageUrl: z.string(),
    socialButtons: z.string(), // JSON string
    published: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type Consultant = z.infer<typeof consultantSchema>;

// Admin schema
export const adminSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1),
    password: z.string().min(1),
});
export type Admin = z.infer<typeof adminSchema>;
