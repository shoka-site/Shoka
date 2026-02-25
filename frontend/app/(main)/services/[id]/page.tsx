"use client";

import { useParams } from "next/navigation";
import { useService } from "@/hooks/use-content";
import Section from "@/components/ui/section";
import Link from "next/link";
import { ArrowLeft, Tag, Activity, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export default function ServiceDetails() {
    const params = useParams();
    const id = params.id as string;
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const { data: service, isLoading } = useService(id);
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

    if (!service) {
        return (
            <div className="pt-32 pb-24 min-h-[80vh] flex flex-col items-center justify-center bg-background text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_100%)] pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-black mb-6 text-foreground/20">404</h1>
                    <h2 className="text-3xl font-display font-bold mb-4">{t("services.not_found", "Service not found")}</h2>
                    <p className="text-muted-foreground mb-10 max-w-md mx-auto">{t("services.not_found_desc", "The service you are looking for does not exist or has been removed.")}</p>
                    <Link href="/services" className="group relative flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors overflow-hidden">
                        <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isRtl ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                        <span className="relative z-10">{t("services.back", "Back to Services")}</span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            {/* Immersive Hero Section - Services (Solid color background instead of image) */}
            <div className="relative h-[75vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.15)_0%,transparent_50%)] mix-blend-screen" />
                </motion.div>

                <div className="container relative z-10 px-6 mx-auto pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto text-center flex flex-col items-center"
                    >
                        <Link href="/services" className="group inline-flex items-center gap-3 text-white/60 hover:text-white mb-10 transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                            <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? 'rotate-180' : ''}`}>
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            {t("services.back", "Back to Services")}
                        </Link>

                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Badge variant="outline" className="text-accent border-accent/30 bg-accent/10 px-5 py-2 text-sm backdrop-blur-md flex items-center justify-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {service.type || "Specialized Service"}
                                </Badge>
                            </motion.div>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-8 leading-[1.1] tracking-tight text-white">
                            {service.title}
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
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("services.overview", "Service Overview")}</h2>
                            </div>

                            <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                {service.description.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-6">{paragraph}</p>
                                ))}
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
                            <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-border/40 dark:bg-black/20 dark:border-white/5 shadow-2xl">
                                {/* Decorative Glow */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-display font-bold mb-8 text-foreground flex items-center gap-3">
                                        <div className="w-2 h-8 bg-primary rounded-full" />
                                        {t("services.details", "Service Details")}
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                <Tag className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                                                {t("services.type", "Type")}
                                            </span>
                                            <span className="text-lg font-medium text-foreground">{service.type || "Specialized Service"}</span>
                                        </div>

                                        <div className="w-full h-px bg-border/50" />

                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                <Activity className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                                                {t("services.status_label", "Status")}
                                            </span>
                                            <span className="text-lg font-medium capitalize text-foreground">
                                                {service.published ? t("services.status_active", "Active") : t("services.status_inactive", "Inactive")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <Link href="/contact" className="w-full inline-flex justify-center items-center py-4 rounded-full bg-foreground text-background font-bold tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/20">
                                            {t("services.inquire", "Inquire About Service")}
                                        </Link>
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
