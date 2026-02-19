import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Helper function to transform content based on language
function transformForLanguage<T extends Record<string, any>>(content: T | T[], lang: 'en' | 'ar'): any {
  if (!content) return content;

  // If it's an array, transform each item
  if (Array.isArray(content)) {
    return content.map(item => transformForLanguage(item, lang));
  }

  // Extract language-specific fields
  const transformed: Record<string, any> = {};
  Object.keys(content).forEach(key => {
    if (key.endsWith('En') && lang === 'en') {
      transformed[key.replace('En', '')] = content[key];
    } else if (key.endsWith('Ar') && lang === 'ar') {
      transformed[key.replace('Ar', '')] = content[key];
    } else if (!key.endsWith('En') && !key.endsWith('Ar')) {
      // Include non-language-specific fields (id, order, published, etc.)
      transformed[key] = content[key];
    }
  });

  return transformed;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ========== PUBLIC CONTENT API ==========

  // Hero Slides
  app.get("/api/content/hero-slides", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const slides = await storage.getHeroSlides(published);
      const transformed = transformForLanguage(slides, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      res.status(500).json({ error: 'Failed to fetch hero slides' });
    }
  });

  // Stats
  app.get("/api/content/stats", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const stats = await storage.getStats();
      const transformed = transformForLanguage(stats, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // Services
  app.get("/api/content/services", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const services = await storage.getServices(published);
      const transformed = transformForLanguage(services, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  // Projects
  app.get("/api/content/projects", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const featured = req.query.featured === 'true' ? true : undefined;
      const projects = await storage.getProjects(published, featured);
      const transformed = transformForLanguage(projects, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Testimonials
  app.get("/api/content/testimonials", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const testimonials = await storage.getTestimonials(published);
      const transformed = transformForLanguage(testimonials, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  // Why Shoka Points
  app.get("/api/content/why-shoka", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const points = await storage.getWhyShokaPoints(published);
      const transformed = transformForLanguage(points, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching Why Shoka points:', error);
      res.status(500).json({ error: 'Failed to fetch Why Shoka points' });
    }
  });

  // Process Steps
  app.get("/api/content/process-steps", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const steps = await storage.getProcessSteps();
      const transformed = transformForLanguage(steps, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching process steps:', error);
      res.status(500).json({ error: 'Failed to fetch process steps' });
    }
  });

  // Insight Topics
  app.get("/api/content/insights", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const topics = await storage.getInsightTopics(published);
      const transformed = transformForLanguage(topics, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching insight topics:', error);
      res.status(500).json({ error: 'Failed to fetch insight topics' });
    }
  });

  // ========== ADMIN API (Protected - TODO: Add auth middleware) ==========

  // Hero Slides Admin
  app.post("/api/admin/hero-slides", async (req: Request, res: Response) => {
    try {
      const slide = await storage.createHeroSlide(req.body);
      res.status(201).json(slide);
    } catch (error) {
      console.error('Error creating hero slide:', error);
      res.status(500).json({ error: 'Failed to create hero slide' });
    }
  });

  app.put("/api/admin/hero-slides/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateHeroSlide(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Hero slide not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating hero slide:', error);
      res.status(500).json({ error: 'Failed to update hero slide' });
    }
  });

  app.delete("/api/admin/hero-slides/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteHeroSlide(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Hero slide not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting hero slide:', error);
      res.status(500).json({ error: 'Failed to delete hero slide' });
    }
  });

  // Stats Admin
  app.post("/api/admin/stats", async (req: Request, res: Response) => {
    try {
      const stat = await storage.createStat(req.body);
      res.status(201).json(stat);
    } catch (error) {
      console.error('Error creating stat:', error);
      res.status(500).json({ error: 'Failed to create stat' });
    }
  });

  app.put("/api/admin/stats/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateStat(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Stat not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating stat:', error);
      res.status(500).json({ error: 'Failed to update stat' });
    }
  });

  app.delete("/api/admin/stats/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteStat(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Stat not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting stat:', error);
      res.status(500).json({ error: 'Failed to delete stat' });
    }
  });

  // Services Admin
  app.post("/api/admin/services", async (req: Request, res: Response) => {
    try {
      const service = await storage.createService(req.body);
      res.status(201).json(service);
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ error: 'Failed to create service' });
    }
  });

  app.put("/api/admin/services/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateService(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  });

  app.delete("/api/admin/services/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteService(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // Projects Admin
  app.post("/api/admin/projects", async (req: Request, res: Response) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  app.put("/api/admin/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateProject(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  app.delete("/api/admin/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // Testimonials Admin
  app.post("/api/admin/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonial = await storage.createTestimonial(req.body);
      res.status(201).json(testimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Failed to create testimonial' });
    }
  });

  app.put("/api/admin/testimonials/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateTestimonial(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      res.status(500).json({ error: 'Failed to update testimonial' });
    }
  });

  app.delete("/api/admin/testimonials/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteTestimonial(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  });

  // Why Shoka Admin
  app.post("/api/admin/why-shoka", async (req: Request, res: Response) => {
    try {
      const point = await storage.createWhyShokaPoint(req.body);
      res.status(201).json(point);
    } catch (error) {
      console.error('Error creating Why Shoka point:', error);
      res.status(500).json({ error: 'Failed to create Why Shoka point' });
    }
  });

  app.put("/api/admin/why-shoka/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateWhyShokaPoint(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Why Shoka point not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating Why Shoka point:', error);
      res.status(500).json({ error: 'Failed to update Why Shoka point' });
    }
  });

  app.delete("/api/admin/why-shoka/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteWhyShokaPoint(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Why Shoka point not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting Why Shoka point:', error);
      res.status(500).json({ error: 'Failed to delete Why Shoka point' });
    }
  });

  // Process Steps Admin
  app.post("/api/admin/process-steps", async (req: Request, res: Response) => {
    try {
      const step = await storage.createProcessStep(req.body);
      res.status(201).json(step);
    } catch (error) {
      console.error('Error creating process step:', error);
      res.status(500).json({ error: 'Failed to create process step' });
    }
  });

  app.put("/api/admin/process-steps/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateProcessStep(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Process step not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating process step:', error);
      res.status(500).json({ error: 'Failed to update process step' });
    }
  });

  app.delete("/api/admin/process-steps/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteProcessStep(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Process step not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting process step:', error);
      res.status(500).json({ error: 'Failed to delete process step' });
    }
  });

  // Insights Admin
  app.post("/api/admin/insights", async (req: Request, res: Response) => {
    try {
      const topic = await storage.createInsightTopic(req.body);
      res.status(201).json(topic);
    } catch (error) {
      console.error('Error creating insight topic:', error);
      res.status(500).json({ error: 'Failed to create insight topic' });
    }
  });

  app.put("/api/admin/insights/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updateInsightTopic(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Insight topic not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating insight topic:', error);
      res.status(500).json({ error: 'Failed to update insight topic' });
    }
  });

  app.delete("/api/admin/insights/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deleteInsightTopic(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Insight topic not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting insight topic:', error);
      res.status(500).json({ error: 'Failed to delete insight topic' });
    }
  });

  // Platform Updates - Public
  app.get("/api/content/platform-updates", async (req: Request, res: Response) => {
    try {
      const requestedLang = req.query.lang as string || 'en';
      const lang = requestedLang.split('-')[0] as 'en' | 'ar';
      const published = req.query.published !== 'false';
      const updates = await storage.getPlatformUpdates(published);
      const transformed = transformForLanguage(updates, lang);
      res.json(transformed);
    } catch (error) {
      console.error('Error fetching platform updates:', error);
      res.status(500).json({ error: 'Failed to fetch platform updates' });
    }
  });

  // Platform Updates - Admin CRUD
  app.post("/api/admin/platform-updates", async (req: Request, res: Response) => {
    try {
      const update = await storage.createPlatformUpdate(req.body);
      res.status(201).json(update);
    } catch (error) {
      console.error('Error creating platform update:', error);
      res.status(500).json({ error: 'Failed to create platform update' });
    }
  });

  app.put("/api/admin/platform-updates/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await storage.updatePlatformUpdate(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Platform update not found' });
      res.json(updated);
    } catch (error) {
      console.error('Error updating platform update:', error);
      res.status(500).json({ error: 'Failed to update platform update' });
    }
  });

  app.delete("/api/admin/platform-updates/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await storage.deletePlatformUpdate(id);
      if (!deleted) return res.status(404).json({ error: 'Platform update not found' });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting platform update:', error);
      res.status(500).json({ error: 'Failed to delete platform update' });
    }
  });

  return httpServer;
}
