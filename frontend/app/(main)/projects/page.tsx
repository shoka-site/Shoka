"use client";

import Section from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, History, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/use-content";

export default function Projects() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    const { data: projects = [], isLoading } = useProjects();

    const categories = [
        { key: "past", label: t("portfolio.projects.categories.made"), icon: History, color: "text-green-500", badge: t("portfolio.projects.status.made") },
        { key: "current", label: t("portfolio.projects.categories.making"), icon: Zap, color: "text-yellow-500", badge: t("portfolio.projects.status.making") },
        { key: "future", label: t("portfolio.projects.categories.will_make"), icon: Rocket, color: "text-blue-500", badge: t("portfolio.projects.status.will_make") },
    ];

    if (isLoading) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen">
            <Section background="pattern" className="pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('portfolio.projects.subtitle')}</span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('portfolio.projects.title')}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {t('portfolio.projects.description')}
                    </p>
                </motion.div>
            </Section>

            {categories.map((category, catIndex) => {
                const categoryProjects = projects?.filter(p => p.status === category.key) || [];
                if (categoryProjects.length === 0) return null;

                return (
                    <Section key={category.key} className={catIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <div className="flex items-center gap-4 mb-12">
                            <div className={`p-3 rounded-2xl bg-white shadow-sm border border-border/40 ${category.color}`}>
                                <category.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-display font-bold">{category.label}</h2>
                                <Badge variant="outline" className={`${category.color} border-current border-opacity-20 mt-1`}>
                                    {category.badge}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {categoryProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer bg-white rounded-2xl border border-border/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="overflow-hidden relative aspect-video">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-accent text-sm font-medium tracking-wide uppercase">
                                                {project.category}
                                            </span>
                                            <div className="h-px w-8 bg-border" />
                                        </div>

                                        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className={`flex items-center text-primary font-medium transition-transform ${isRtl ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                                            {t('portfolio.view_case_study')} <ArrowRight className={`mx-2 w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Section>
                );
            })}
        </div>
    );
}
