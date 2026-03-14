"use client";

import { useParams } from "next/navigation";
import { useIndustry } from "@/hooks/use-content";
import { useDataReady } from "@/hooks/useDataReady";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { ArrowLeft, Tag, Activity, Sparkles, ChevronDown, Building2, TrendingUp, Zap, Users, ShieldCheck, Database, Globe, Cloud, Smartphone, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InitialLoader } from "@/components/ui/InitialLoader";

const iconMap: Record<string, any> = {
    TrendingUp, Zap, Users, ShieldCheck, Database, Globe, Cloud, Smartphone
};

export default function IndustryDetails() {
    const params = useParams();
    const id = params.id as string;
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const { data: industry, isLoading } = useIndustry(id);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    // Wait for data to be ready before showing the page
    const isReady = useDataReady(isLoading);

    // Show full-screen loading while data is being fetched
    if (!isReady) {
        return <InitialLoader />;
    }

    // Only show the 404 UI after loading completes and industry is truly not found
    if (!industry) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container relative z-10 mx-auto px-6 max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="w-24 h-24 mx-auto mb-8 bg-black/50 border border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(194,164,92,0.15)] relative backdrop-blur-3xl"
                        >
                            <motion.div className="absolute inset-2 border border-dashed border-primary/50 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                            <Tag className="w-10 h-10 text-primary relative z-10" />
                        </motion.div>
                        <h1 className="text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter mb-6">404</h1>
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">{t("home.industries.not_found", "Industry not found")}</h2>
                        <p className="text-white/50 text-base md:text-xl max-w-md mx-auto mb-12 font-light leading-relaxed">{t("home.industries.not_found_desc", "The industry you are looking for does not exist or has been removed.")}</p>
                        <Link href="/industries">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button className="bg-primary text-black hover:bg-white font-black tracking-widest uppercase transition-all shadow-xl flex gap-3 items-center rounded-full h-14 px-10 mx-auto">
                                    <ArrowLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                                    {t("home.industries.back_to_industries", "Back to Industries")}
                                </button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            {/* Immersive Hero Section - Industries (Solid color background) */}
            <div className="relative h-[75vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--secondary),0.15)_0%,transparent_50%)] mix-blend-screen" />
                </motion.div>

                <div className="absolute top-32 left-0 w-full z-20 pointer-events-none">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="pointer-events-auto"
                        >
                            <Link href="/industries" className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                                <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? 'rotate-180' : ''}`}>
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                {t("home.industries.back_to_industries")}
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="container relative z-10 px-6 mx-auto pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto text-center flex flex-col items-center"
                    >

                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Badge variant="outline" className="text-secondary border-secondary/30 bg-secondary/10 px-5 py-2 text-sm backdrop-blur-md flex items-center justify-center gap-2">
                                    <Building2 className="w-3.5 h-3.5" />
                                    {industry.type || t("home.industries.industry")}
                                </Badge>
                            </motion.div>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-8 leading-[1.1] tracking-tight text-white">
                            {industry.title}
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
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t("common.scroll")}</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-5 h-5 text-secondary" />
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
                                <div className="h-px w-12 bg-secondary/50" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{t("home.industries.overview")}</h2>
                            </div>

                            <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                {(industry.description || '').split('\n').map((paragraph, idx) => (
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
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-display font-bold mb-8 text-foreground flex items-center gap-3">
                                        <div className="w-2 h-8 bg-secondary rounded-full" />
                                        {t("home.industries.details")}
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                {t("services.type")}
                                            </span>
                                            <span className="text-lg font-medium text-foreground">{industry.type || t("home.industries.industry")}</span>
                                        </div>

                                        <div className="w-full h-px bg-border/50" />

                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-semibold">
                                                <Activity className="w-3.5 h-3.5 group-hover:text-secondary transition-colors" />
                                                {t("services.status_label", "Status")}
                                            </span>
                                            <span className="text-lg font-medium capitalize text-foreground">
                                                {industry.published ? t("services.status_active", "Active") : t("services.status_inactive", "Inactive")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <Link href="/contact" className="w-full inline-flex justify-center items-center py-4 rounded-full bg-foreground text-background font-bold tracking-wide hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-secondary/20">
                                            {t("services.inquire", "Inquire About Service")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Industry Solutions / Use Cases Section */}
            {industry.solutions && industry.solutions.length > 0 && (
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <Section className="py-24 relative overflow-hidden bg-muted/10">
                        <div className="container mx-auto">
                            <div className="flex flex-col items-center justify-center text-center mb-16">
                                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-5 py-2 text-sm backdrop-blur-md flex items-center gap-2 mb-6">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {t("navbar.recent_work", "Use Cases")}
                                </Badge>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                                    {t("home.solutions.title", "Strategic Solutions")}
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    {t("home.solutions.description", "Explore how we solve specialized problems in this industry.")}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {industry.solutions.map((solution: any, index: number) => {
                                    return (
                                        <motion.div
                                            key={solution.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                        >
                                            <Card className="h-full border-border/40 hover:border-primary/30 transition-all duration-700 flex flex-col overflow-hidden bg-background/50 backdrop-blur-xl relative rounded-[2.5rem] shadow-sm hover:shadow-2xl p-4">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                                <CardHeader className={`relative z-10 pb-4 pt-6 md:pt-8 px-6 md:px-8 flex items-start sm:items-center gap-4 md:gap-6 ${isRtl ? 'flex-col sm:flex-row-reverse text-right' : 'flex-col sm:flex-row text-left'}`}>
                                                    <div className="text-primary p-4 bg-primary/5 rounded-2xl shadow-sm border border-primary/10">
                                                        <Zap className="w-8 h-8 md:w-10 md:h-10" />
                                                    </div>
                                                    <CardTitle className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight tracking-tight">
                                                        {solution.title}
                                                    </CardTitle>
                                                </CardHeader>

                                                <CardContent className="flex-grow flex flex-col relative z-10 px-6 md:px-8 pb-6 md:pb-8">
                                                    <CardDescription className="text-base md:text-lg text-muted-foreground mb-10 font-light leading-relaxed">
                                                        {solution.description}
                                                    </CardDescription>

                                                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/50">
                                                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
                                                            {t('home.solutions.strategic_impact', 'Strategic Impact')}
                                                        </span>
                                                        <Link href="/contact" className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:border-primary ${isRtl ? 'rotate-180' : ''}`}>
                                                            <ArrowRight className="w-5 h-5 opacity-40 hover:opacity-100" />
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </Section>
                </div>
            )}
        </div>
    );
}
