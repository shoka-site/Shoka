"use client";

import Section from "@/components/layout/Section";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, History, Zap, Rocket, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";

export default function Projects() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const { data: projects = [], isLoading } = useProjects();
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const categories = [
        { key: "past", label: t("portfolio.projects.categories.made"), icon: History, color: "text-emerald-500", badge: t("portfolio.projects.status.made") },
        { key: "current", label: t("portfolio.projects.categories.making"), icon: Zap, color: "text-amber-500", badge: t("portfolio.projects.status.making") },
        { key: "future", label: t("portfolio.projects.categories.will_make"), icon: Rocket, color: "text-sky-500", badge: t("portfolio.projects.status.will_make") },
    ];

    if (isLoading) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            {/* Immersive Hero Section - EXCLUSIVE BLACK ZONE */}
            <div className="relative h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.12)_0%,transparent_50%)] mix-blend-screen" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </motion.div>

                <div className="container relative z-10 px-6 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto flex flex-col items-center text-center"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Badge variant="outline" className="text-accent border-accent/40 bg-accent/10 px-5 py-2 text-xs backdrop-blur-md flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {t('portfolio.projects.subtitle')}
                                </Badge>
                            </motion.div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight text-white">
                            {t('portfolio.projects.title')}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
                            {t('portfolio.projects.description')}
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('portfolio.projects.timeline')}</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown className="w-5 h-5 text-accent/50" />
                    </motion.div>
                </motion.div>
            </div>

            <div className="relative">
                {/* Horizontal separator */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {categories.map((category, catIndex) => {
                    const categoryProjects = projects?.filter(p => p.status === category.key) || [];
                    if (categoryProjects.length === 0) return null;

                    return (
                        <Section
                            key={category.key}
                            background={catIndex % 2 === 1 ? "muted" : "default"}
                            className="py-24 relative overflow-hidden"
                        >
                            <div className="container mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 mb-16"
                                >
                                    <div className={`p-4 rounded-2xl bg-background border border-border shadow-xl ${category.color} flex items-center justify-center`}>
                                        <category.icon className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-display font-bold text-foreground tracking-tight">
                                            {category.label}
                                        </h2>
                                        <Badge variant="outline" className={`${category.color} border-current border-opacity-20 mt-2 font-bold uppercase tracking-wider px-3`}>
                                            {category.badge}
                                        </Badge>
                                    </div>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {categoryProjects.map((project, index) => (
                                        <Link key={project.id} href={`/projects/${project.id}`}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 40 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                className="group relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden bg-background border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-700"
                                            >
                                                <div className="absolute inset-0 z-0">
                                                    <Image
                                                        src={project.imageUrl || ""}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1 grayscale group-hover:grayscale-0"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
                                                </div>

                                                <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
                                                    <motion.div className="flex items-center gap-3 mb-4">
                                                        <span className="w-8 h-[1px] bg-accent/60"></span>
                                                        <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">{project.category}</span>
                                                    </motion.div>

                                                    <h3 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4 tracking-tight leading-[1.1] transition-transform duration-500 group-hover:-translate-y-2">
                                                        {project.title}
                                                    </h3>

                                                    <p className="text-muted-foreground text-lg max-w-lg mb-8 line-clamp-2 font-light leading-relaxed opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                                        {project.description}
                                                    </p>

                                                    <div className="flex items-center gap-4 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                                        <Button
                                                            variant="default"
                                                            size="lg"
                                                            className="rounded-full bg-foreground text-background font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                                                        >
                                                            {t('portfolio.view_case_study')}
                                                            <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-2 rotate-180" : "ml-2"}`} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Section>
                    );
                })}
            </div>

            {/* CTA Section */}
            <Section background="default" className="py-24 border-t border-border">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto p-12 rounded-[3.5rem] bg-muted/20 border border-border relative overflow-hidden"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
                            {t('portfolio.projects.cta.title')}
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 font-light">
                            {t('portfolio.projects.cta.description')}
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20">
                            {t('portfolio.projects.cta.button')}
                            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
