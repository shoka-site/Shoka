import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ========== USERS TABLE (existing) ==========
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ========== HERO SLIDES ==========
export const heroSlides = pgTable("hero_slides", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  imageUrl: text("image_url").notNull(),
  badgeEn: text("badge_en").notNull(),
  badgeAr: text("badge_ar").notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({ id: true, createdAt: true, updatedAt: true });
export const selectHeroSlideSchema = createSelectSchema(heroSlides);
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type HeroSlide = typeof heroSlides.$inferSelect;

// ========== STATS ==========
export const stats = pgTable("stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  numberEn: varchar("number_en", { length: 20 }).notNull(),
  numberAr: varchar("number_ar", { length: 20 }).notNull(),
  labelEn: text("label_en").notNull(),
  labelAr: text("label_ar").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertStatSchema = createInsertSchema(stats).omit({ id: true, createdAt: true, updatedAt: true });
export const selectStatSchema = createSelectSchema(stats);
export type InsertStat = z.infer<typeof insertStatSchema>;
export type Stat = typeof stats.$inferSelect;

// ========== SERVICES ==========
export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  iconName: varchar("icon_name", { length: 50 }).notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true, createdAt: true, updatedAt: true });
export const selectServiceSchema = createSelectSchema(services);
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// ========== PROJECTS ==========
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  imageUrl: text("image_url").notNull(),
  categoryEn: varchar("category_en", { length: 100 }).notNull(),
  categoryAr: varchar("category_ar", { length: 100 }).notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true, updatedAt: true });
export const selectProjectSchema = createSelectSchema(projects);
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// ========== TESTIMONIALS ==========
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  quoteEn: text("quote_en").notNull(),
  quoteAr: text("quote_ar").notNull(),
  authorEn: varchar("author_en", { length: 100 }).notNull(),
  authorAr: varchar("author_ar", { length: 100 }).notNull(),
  roleEn: text("role_en").notNull(),
  roleAr: text("role_ar").notNull(),
  rating: integer("rating").notNull().default(5),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, createdAt: true, updatedAt: true });
export const selectTestimonialSchema = createSelectSchema(testimonials);
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// ========== WHY SHOKA POINTS ==========
export const whyShokaPoints = pgTable("why_shoka_points", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  iconName: varchar("icon_name", { length: 50 }).notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWhyShokaPointSchema = createInsertSchema(whyShokaPoints).omit({ id: true, createdAt: true, updatedAt: true });
export const selectWhyShokaPointSchema = createSelectSchema(whyShokaPoints);
export type InsertWhyShokaPoint = z.infer<typeof insertWhyShokaPointSchema>;
export type WhyShokaPoint = typeof whyShokaPoints.$inferSelect;

// ========== PROCESS STEPS ==========
export const processSteps = pgTable("process_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  stepNumber: varchar("step_number", { length: 10 }).notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProcessStepSchema = createInsertSchema(processSteps).omit({ id: true, createdAt: true, updatedAt: true });
export const selectProcessStepSchema = createSelectSchema(processSteps);
export type InsertProcessStep = z.infer<typeof insertProcessStepSchema>;
export type ProcessStep = typeof processSteps.$inferSelect;

// ========== INSIGHT TOPICS ==========
export const insightTopics = pgTable("insight_topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  order: integer("order").notNull(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  readTimeEn: varchar("read_time_en", { length: 20 }).notNull(),
  readTimeAr: varchar("read_time_ar", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertInsightTopicSchema = createInsertSchema(insightTopics).omit({ id: true, createdAt: true, updatedAt: true });
export const selectInsightTopicSchema = createSelectSchema(insightTopics);
export type InsertInsightTopic = z.infer<typeof insertInsightTopicSchema>;
export type InsightTopic = typeof insightTopics.$inferSelect;
