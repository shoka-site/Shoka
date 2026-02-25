"use client";

import { useParams } from "next/navigation";
import { useProject } from "@/hooks/use-content";
import Section from "@/components/ui/section";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Activity, Sparkles, ChevronDown } from "lucide-react";
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
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

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
            {/* Immersive Hero Section */}
            <div className="relative h-[85vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-black text-white">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0 origin-top"
                >
                    <Image
                        src={project.imageUrl || "/placeholder.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60 mix-blend-overlay scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                </motion.div>

                <div className="container relative z-10 px-6 mx-auto pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl"
                    >
                        <Link href="/projects" className="group inline-flex items-center gap-3 text-white/60 hover:text-white mb-10 transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                            <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? 'rotate-180' : ''}`}>
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            {t("portfolio.projects.back", "Back to Projects")}
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Badge variant="outline" className="text-accent border-accent/30 bg-accent/10 px-5 py-2 text-sm backdrop-blur-md flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {project.category}
                                </Badge>
                            </motion.div>

                            {project.status && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="flex items-center gap-2 text-white/70 text-sm tracking-[0.1em] uppercase font-semibold bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
                                >
                                    <Activity className="w-3.5 h-3.5 text-primary" />
                                    {mapStatus(project.status)}
                                </motion.div>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-8 leading-[1.1] tracking-tight">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-5 h-5 text-accent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Content Section */}
            <Section className="py-24 md:py-32 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px w-12 bg-accent/50" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("portfolio.projects.overview", "Project Overview")}</h2>
                            </div>

                            <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                {project.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-6">{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>

                        {/* Example Image Gallery Placeholder (if multiple images existed, this is how it would look) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-16 grid grid-cols-2 gap-4 md:gap-8 rounded-3xl overflow-hidden"
                        >
                            {/* Duplicating the main image to simulate a gallery with visual flair */}
                            <div className="relative aspect-square group overflow-hidden rounded-2xl">
                                <Image src={project.imageUrl} alt="Gallery 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110 filter hover:brightness-110" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                            <div className="relative aspect-square group overflow-hidden rounded-2xl md:mt-12">
                                <Image src={project.imageUrl} alt="Gallery 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110 filter hover:brightness-110" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Sticky Glassmorphism Sidebar */}
                    <div className="lg:col-span-4 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="sticky top-32"
                        >
                            <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 dark:bg-black/20 dark:border-white/5 shadow-2xl">
                                {/* Decorative Glow */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-display font-bold mb-8 text-foreground flex items-center gap-3">
                                        <div className="w-2 h-8 bg-accent rounded-full" />
                                        {t("portfolio.projects.details", "Project Details")}
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                <Tag className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
                                                {t("portfolio.projects.category", "Category")}
                                            </span>
                                            <span className="text-lg font-medium text-foreground">{project.category}</span>
                                        </div>

                                        <div className="w-full h-px bg-border/50" />

                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                <Activity className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
                                                {t("portfolio.projects.status_label", "Status")}
                                            </span>
                                            <span className="text-lg font-medium capitalize text-foreground">{mapStatus(project.status)}</span>
                                        </div>

                                        <div className="w-full h-px bg-border/50" />

                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                <Calendar className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
                                                Year
                                            </span>
                                            <span className="text-lg font-medium text-foreground">
                                                {project.createdAt ? new Date(project.createdAt).getFullYear() : new Date().getFullYear()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <button className="w-full py-4 rounded-full bg-foreground text-background font-bold tracking-wide hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-accent/20">
                                            Discuss Similar Project
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
