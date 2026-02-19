"use client";

import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/use-content";

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: projects = [], isLoading } = useProjects();

  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern" className="pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('portfolio.subtitle')}</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('portfolio.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('portfolio.description')}
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {!isLoading && projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <img
                  src={project.imageUrl}
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

              <div className={`flex items-center text-primary font-medium transition-transform ${isRtl ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                {t('portfolio.view_case_study')} <ArrowRight className={`mx-2 w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}