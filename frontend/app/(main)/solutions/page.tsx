"use client";

import Section from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TrendingUp, Zap, Users, ShieldCheck, Database, Globe, Cloud, Smartphone, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { useSolutions } from "@/hooks/use-content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const iconMap: Record<string, any> = {
    TrendingUp, Zap, Users, ShieldCheck, Database, Globe, Cloud, Smartphone
};

export default function Solutions() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const { data: solutions = [], isLoading } = useSolutions();
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
                                    {t("home.solutions.badge", "Strategic Solutions")}
                                </Badge>
                            </motion.div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight text-white">
                            {t("home.solutions.title")}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
                            {t("home.solutions.description")}
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
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('common.explore_content')}</span>
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

                <Section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {solutions.map((solution, index) => {
                                const Icon = iconMap[solution.iconName] || Zap;
                                return (
                                    <motion.div
                                        key={solution.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                    >
                                        <Card className="h-full border-border/40 hover:border-primary/30 transition-all duration-700 flex flex-col overflow-hidden bg-background/50 backdrop-blur-xl relative rounded-[2.5rem] shadow-sm hover:shadow-2xl p-4">
                                            {/* Glow Overlay on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                            <CardHeader className="relative z-10 pb-4 pt-8 px-8 flex flex-row items-center gap-6">
                                                <div className="text-primary p-4 bg-primary/5 rounded-2xl shadow-sm border border-primary/10">
                                                    <Icon className="w-10 h-10" />
                                                </div>
                                                <CardTitle className="text-3xl font-display font-bold text-foreground leading-tight tracking-tight">
                                                    {solution.title}
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent className="flex-grow flex flex-col relative z-10 px-8 pb-8">
                                                <CardDescription className="text-lg text-muted-foreground mb-10 font-light leading-relaxed">
                                                    {solution.description}
                                                </CardDescription>

                                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/50">
                                                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
                                                        {t('home.solutions.strategic_impact')}
                                                    </span>
                                                    <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary ${isRtl ? 'rotate-180' : ''}`}>
                                                        <ArrowRight className="w-5 h-5 opacity-40" />
                                                    </div>
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
                            {t('home.solutions.cta.title')}
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 font-light">
                            {t('home.solutions.cta.description')}
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20">
                            {t('home.solutions.cta.button')}
                            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
