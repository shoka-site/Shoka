import { z } from "zod";

// ========== USERS TABLE ==========
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: string;
  username: string;
  password: string;
};

// ========== HERO SLIDES ==========
export const insertHeroSlideSchema = z.object({
  order: z.coerce.number(), // Coerce in case it comes as string from form
  imageUrl: z.string().min(1, "Image URL is required"),
  badgeEn: z.string(),
  badgeAr: z.string(),
  titleEn: z.string().min(1, "English Title is required"),
  titleAr: z.string().min(1, "Arabic Title is required"),
  descriptionEn: z.string().min(1, "English Description is required"),
  descriptionAr: z.string().min(1, "Arabic Description is required"),
  published: z.boolean().default(true),
});

export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type HeroSlide = InsertHeroSlide & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== STATS ==========
export const insertStatSchema = z.object({
  key: z.string().min(1, "Key is required"),
  numberEn: z.string().min(1, "English Number is required"),
  numberAr: z.string().min(1, "Arabic Number is required"),
  labelEn: z.string().min(1, "English Label is required"),
  labelAr: z.string().min(1, "Arabic Label is required"),
  order: z.coerce.number(),
});

export type InsertStat = z.infer<typeof insertStatSchema>;
export type Stat = InsertStat & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== SERVICES ==========
export const insertServiceSchema = z.object({
  order: z.coerce.number(),
  iconName: z.string().min(1, "Icon Name is required"),
  titleEn: z.string().min(1, "English Title is required"),
  titleAr: z.string().min(1, "Arabic Title is required"),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  published: z.boolean().default(true),
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = InsertService & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== PROJECTS ==========
export const insertProjectSchema = z.object({
  order: z.coerce.number(),
  imageUrl: z.string().min(1, "Image URL is required"),
  categoryEn: z.string().min(1, "English Category is required"),
  categoryAr: z.string().min(1, "Arabic Category is required"),
  titleEn: z.string().min(1, "English Title is required"),
  titleAr: z.string().min(1, "Arabic Title is required"),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = InsertProject & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== TESTIMONIALS ==========
export const insertTestimonialSchema = z.object({
  order: z.coerce.number(),
  quoteEn: z.string().min(1, "English Quote is required"),
  quoteAr: z.string().min(1, "Arabic Quote is required"),
  authorEn: z.string().min(1, "English Author Name is required"),
  authorAr: z.string().min(1, "Arabic Author Name is required"),
  roleEn: z.string().min(1, "English Role is required"),
  roleAr: z.string().min(1, "Arabic Role is required"),
  rating: z.coerce.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = InsertTestimonial & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== WHY SHOKA POINTS ==========
export const insertWhyShokaPointSchema = z.object({
  order: z.coerce.number(),
  iconName: z.string().min(1, "Icon Name is required"),
  titleEn: z.string().min(1, "English Title is required"),
  titleAr: z.string().min(1, "Arabic Title is required"),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  published: z.boolean().default(true),
});

export type InsertWhyShokaPoint = z.infer<typeof insertWhyShokaPointSchema>;
export type WhyShokaPoint = InsertWhyShokaPoint & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== PROCESS STEPS ==========
export const insertProcessStepSchema = z.object({
  order: z.coerce.number(),
  stepNumber: z.string().min(1, "Step Number is required"),
  titleEn: z.string().min(1, "English Title is required"),
  titleAr: z.string().min(1, "Arabic Title is required"),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
});

export type InsertProcessStep = z.infer<typeof insertProcessStepSchema>;
export type ProcessStep = InsertProcessStep & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// ========== INSIGHT TOPICS ==========
export const insertInsightTopicSchema = z.object({
  order: z.coerce.number(),
  titleEn: z.string().min(1, "English Title is required"),
  titleAr: z.string().min(1, "Arabic Title is required"),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  readTimeEn: z.string().min(1, "English Read Time is required"),
  readTimeAr: z.string().min(1, "Arabic Read Time is required"),
  published: z.boolean().default(true),
});

export type InsertInsightTopic = z.infer<typeof insertInsightTopicSchema>;
export type InsightTopic = InsertInsightTopic & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
