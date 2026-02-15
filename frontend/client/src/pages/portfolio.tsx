import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import project1 from "@/assets/project-1.png";

const projects = [
  {
    title: "National Data Archive",
    category: "Government / Data",
    image: project1,
    description: "Digitizing 50 years of historical records into a secure, searchable cloud database powered by AI-driven optical character recognition.",
    tags: ["Cloud Migration", "AI/OCR", "Security"]
  },
  {
    title: "FinTech Core Banking",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    description: "A next-generation core banking system built for high-frequency trading and real-time transaction processing.",
    tags: ["Blockchain", "Node.js", "Real-time"]
  },
  {
    title: "Smart City Grid",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
    description: "IoT network managing energy distribution across 3 major districts, reducing waste by 24%.",
    tags: ["IoT", "Big Data", "Analytics"]
  },
  {
    title: "EduTech Learning Platform",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
    description: "Adaptive learning system serving 50,000+ students with personalized AI-driven curriculum paths.",
    tags: ["React", "AI", "Mobile App"]
  }
];

export default function Portfolio() {
  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern" className="pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">Our Work</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real-world challenges solved with intelligent engineering. 
            Explore how we've helped organizations transform their digital landscape.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent text-sm font-medium tracking-wide uppercase">{project.category}</span>
                <div className="h-px w-8 bg-border" />
              </div>
              
              <h3 className="text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="rounded-full bg-secondary/30 hover:bg-secondary/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                View Case Study <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}