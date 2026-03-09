"use client";

import Section from "@/components/layout/Section";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Newspaper, Trophy, Calendar, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePlatformUpdates } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function News() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const { data: updates = [], isLoading } = usePlatformUpdates();
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'achievement': return Trophy;
            case 'event': return Calendar;
            case 'new': return Sparkles;
            case 'news':
            default: return Newspaper;
        }
    };

    const getColorForType = (type: string) => {
        switch (type) {
            case 'achievement': return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case 'event': return "text-sky-500 bg-sky-500/10 border-sky-500/20";
            case 'new': return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
            case 'news':
            default: return "text-primary bg-primary/10 border-primary/20";
        }
    };

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            {/* Immersive Hero Section */}
            <div className="relative h-[55vh] min-h-[450px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
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
                                    <Newspaper className="w-3.5 h-3.5" />
                                    {t('news.subtitle')}
                                </Badge>
                            </motion.div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
                            {t('news.title')}
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
                            {t('news.description')}
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
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('common.scroll')}</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown className="w-5 h-5 text-accent/50" />
                    </motion.div>
                </motion.div>
            </div>

            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <Section className="py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {updates.length > 0 ? updates.map((update, idx) => {
                            const Icon = getIconForType(update.type);
                            const colorClass = getColorForType(update.type);

                            return (
                                <motion.div
                                    key={update.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                                >
                                    <Card className="h-full border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden hover:shadow-xl group bg-background relative flex flex-col">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        <CardContent className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${colorClass}`}>
                                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                                </div>
                                                <Badge variant="outline" className={`font-medium tracking-wide border px-3 py-1 ${colorClass} bg-transparent`}>
                                                    {t(`hero.updates.${update.type}`)}
                                                </Badge>
                                            </div>

                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                                                {formatDate(update.date)}
                                            </p>

                                            <h3 className="text-2xl font-display font-black tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                                                {update.title}
                                            </h3>

                                            <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                                                {update.summary}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        }) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="inline-flex p-6 rounded-full bg-muted text-muted-foreground mb-6">
                                    <Newspaper className="w-12 h-12 opacity-50" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                                    {t('news.no_articles_title', 'No updates yet')}
                                </h3>
                                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                    {t('news.no_articles_desc', 'Check back later for exciting announcements, achievements, and events from Shoka.')}
                                </p>
                            </div>
                        )}
                    </div>
                </Section>
            </div>

            {/* CTA Section */}
            <Section background="muted" className="py-24 border-t border-border">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-background border border-border relative overflow-hidden shadow-sm"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
                            {t('news.cta.title', 'Stay Connected')}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light">
                            {t('news.cta.description', 'Get in touch to learn more about our innovations and how we can elevate your systems.')}
                        </p>
                        <Link href="/contact" className={`inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            {t('news.cta.button', 'Contact Us')}
                            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
