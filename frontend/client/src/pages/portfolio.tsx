import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import project1 from "@/assets/project-1.png";



export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const projects = [
    {
      title: t('portfolio.projects.archive.title'),
      category: t('portfolio.projects.archive.category'),
      image: project1,
      description: t('portfolio.projects.archive.desc'),
      tags: [t("tags.cloud_migration"), t("tags.ai_ocr"), t("tags.security")]
    },
    {
      title: t('portfolio.projects.banking.title'),
      category: t('portfolio.projects.banking.category'),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      description: t('portfolio.projects.banking.desc'),
      tags: [t("tags.blockchain"), t("tags.nodejs"), t("tags.realtime")]
    },
    {
      title: t('portfolio.projects.smart_city.title'),
      category: t('portfolio.projects.smart_city.category'),
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
      description: t('portfolio.projects.smart_city.desc'),
      tags: [t("tags.iot"), t("tags.big_data"), t("tags.analytics")]
    },
    {
      title: t('portfolio.projects.edutech.title'),
      category: t('portfolio.projects.edutech.category'),
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
      description: t('portfolio.projects.edutech.desc'),
      tags: [t("tags.react"), t("tags.ai"), t("tags.mobile_app")]
    }
  ];
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