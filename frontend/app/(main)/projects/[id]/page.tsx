"use client";

import { useParams } from "next/navigation";
import { useProject } from "@/hooks/use-content";
import Section from "@/components/layout/Section";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Tag, Activity, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

export default function ProjectDetails() {
    const params = useParams();
    const id = params.id as string;
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const { data: project, isLoading } = useProject(id);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

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

    if (!project) {
        return (
            <div className="pt-32 pb-24 min-h-[80vh] flex flex-col items-center justify-center bg-background text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_100%)] pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-black mb-6 text-foreground/20">404</h1>
                    <h2 className="text-3xl font-display font-bold mb-4">{t("portfolio.projects.not_found", "Project not found")}</h2>
                    <p className="text-muted-foreground mb-10 max-w-md mx-auto">{t("portfolio.projects.not_found_desc", "The project you are looking for does not exist or has been removed.")}</p>
                    <Link href="/projects" className="group relative flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors overflow-hidden">
                        <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isRtl ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                        <span className="relative z-10">{t("portfolio.projects.back", "Back to Projects")}</span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const mapStatus = (status: string) => {
        if (status === 'past') return t("portfolio.projects.status.made", "Completed");
        if (status === 'current') return t("portfolio.projects.status.making", "In Progress");
        if (status === 'future') return t("portfolio.projects.status.will_make", "Planned");
        return status;
    };

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            {/* Immersive Hero Section - COMPACT & CENTERED BLACK ZONE */}
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
                        <Link href="/projects" className="group inline-flex items-center gap-3 text-white/40 hover:text-white mb-10 transition-colors text-[10px] uppercase tracking-[0.3em] font-black">
                            <div className={`p-2 rounded-full border border-white/10 group-hover:bg-white/10 transition-all ${isRtl ? 'rotate-180' : ''}`}>
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </div>
                            {t("portfolio.projects.back", "Project Library")}
                        </Link>

                        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Badge variant="outline" className="text-accent border-accent/40 bg-accent/10 px-6 py-2 text-xs backdrop-blur-md flex items-center gap-2 font-bold uppercase tracking-widest">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {project.category}
                                </Badge>
                            </motion.div>

                            {project.status && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center gap-2 text-white/60 text-[10px] tracking-[0.2em] uppercase font-black bg-white/5 border border-white/5 px-5 py-2 rounded-full backdrop-blur-md"
                                >
                                    <Activity className="w-3 h-3 text-primary" />
                                    {mapStatus(project.status)}
                                </motion.div>
                            )}
                        </div>

                        <h1 className="text-6xl md:text-8xl font-display font-black mb-0 leading-[1] tracking-tighter text-white">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Discover</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown className="w-5 h-5 text-accent/50" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Content Section */}
            <Section className="py-24 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Subtle background flair */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 text-primary">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">{t("portfolio.projects.overview", "Project Overview")}</h2>
                                    <div className="w-8 h-1 bg-primary/20 mt-1 rounded-full" />
                                </div>
                            </div>

                            <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground font-light leading-relaxed">
                                {project.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-8">{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>

                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <div className="relative aspect-[4/5] md:aspect-square group overflow-hidden rounded-[2.5rem] bg-muted border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-700">
                                <Image src={project.imageUrl} alt="Gallery 1" fill className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="relative aspect-[4/5] md:aspect-square group overflow-hidden rounded-[2.5rem] bg-muted border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-700 md:mt-20">
                                <Image src={project.imageUrl} alt="Gallery 2" fill className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Glassmorphism Sidebar */}
                    <div className="lg:col-span-4 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="sticky top-32"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden bg-background border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-700">
                                {/* Decorative Glow */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                                <div className="p-10 relative z-10">
                                    <h3 className="text-3xl font-display font-black mb-10 text-foreground flex items-center gap-4 tracking-tight">
                                        <div className="w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)]" />
                                        {t("portfolio.projects.details", "Details")}
                                    </h3>

                                    <div className="space-y-10">
                                        <div className="group">
                                            <span className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-3 font-black">
                                                <Tag className="w-3.5 h-3.5 group-hover:text-primary transition-colors text-primary/50" />
                                                {t("portfolio.projects.category", "Category")}
                                            </span>
                                            <span className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">{project.category}</span>
                                        </div>

                                        <div className="w-full h-px bg-gradient-to-r from-border/50 to-transparent" />

                                        <div className="group">
                                            <span className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-3 font-black">
                                                <Activity className="w-3.5 h-3.5 group-hover:text-primary transition-colors text-primary/50" />
                                                {t("portfolio.projects.status_label", "Status")}
                                            </span>
                                            <span className="text-xl font-bold capitalize text-foreground transition-colors group-hover:text-primary">{mapStatus(project.status)}</span>
                                        </div>

                                        <div className="w-full h-px bg-gradient-to-r from-border/50 to-transparent" />

                                        <div className="group">
                                            <span className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-3 font-black">
                                                <Calendar className="w-3.5 h-3.5 group-hover:text-primary transition-colors text-primary/50" />
                                                Deliverance
                                            </span>
                                            <span className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                                                {project.createdAt ? new Date(project.createdAt).getFullYear() : new Date().getFullYear()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <button className="w-full py-5 rounded-full bg-foreground text-background font-black uppercase tracking-widest hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3">
                                            Initiate Inquiry
                                            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
