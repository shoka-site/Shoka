"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePackages } from "@/hooks/use-content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    Package, ChevronDown, ChevronUp, Sparkles, ArrowRight,
    Lightbulb, Layers, Cpu, Wrench, TrendingUp, Search
} from "lucide-react";

const SECTION_CONFIG = [
    { key: "problem", icon: Lightbulb, labelEn: "Problem Solved", labelAr: "المشكلة المحلولة", color: "text-amber-400" },
    { key: "solutions", icon: Layers, labelEn: "Possible Solutions", labelAr: "الحلول الممكنة", color: "text-blue-400" },
    { key: "techStack", icon: Cpu, labelEn: "Tech Stack", labelAr: "التقنيات المستخدمة", color: "text-violet-400" },
    { key: "servicesUsed", icon: Wrench, labelEn: "Services Used", labelAr: "الخدمات المضمّنة", color: "text-primary" },
    { key: "value", icon: TrendingUp, labelEn: "Value Provided", labelAr: "القيمة المضافة", color: "text-green-400" },
] as const;

export default function PackagesPage() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";
    const { data: packages = [], isLoading } = usePackages();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const filtered = packages.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.problem.toLowerCase().includes(search.toLowerCase()) ||
        p.servicesUsed.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <span className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em]">
                        {t("common.loading")}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[480px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.14)_0%,transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                <div className="container relative z-10 px-6 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto flex flex-col items-center text-center"
                    >
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                            <Badge variant="outline" className="text-accent border-accent/40 bg-accent/10 px-5 py-2 text-xs backdrop-blur-md flex items-center justify-center gap-2 font-bold uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                {t("navbar.packages")}
                            </Badge>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-[1.05] tracking-tight text-white">
                            {isRtl ? "باقاتنا" : "Our Packages"}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
                            {isRtl
                                ? "حلول مجمّعة ومصممة لحاجات أعمال محددة — كل باقة تحل مشكلة حقيقية."
                                : "Pre-built solution bundles designed around specific business needs — each package solves a real problem."}
                        </p>
                    </motion.div>
                </div>

                {/* Scroll cue */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                >
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <ChevronDown className="w-5 h-5 text-accent/50" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Search + Table */}
            <div className="container mx-auto px-6 py-16">
                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="relative max-w-lg mb-10"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={isRtl ? "ابحث عن باقة..." : "Search packages..."}
                        className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                        dir={isRtl ? "rtl" : "ltr"}
                    />
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-24 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">{isRtl ? "ما كو باقات بعد" : "No packages found"}</p>
                        <p className="text-sm mt-1">{isRtl ? "راجع لاحقاً أو جرّب بحث ثاني" : "Check back later or try a different search"}</p>
                    </div>
                )}

                {/* Package cards */}
                <div className="space-y-4">
                    {filtered.map((pkg, idx) => {
                        const isExpanded = expandedId === pkg.id;
                        return (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.06 }}
                                className="border border-border rounded-3xl overflow-hidden bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
                            >
                                {/* Row header — always visible */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                                    className={`w-full flex items-center gap-6 px-8 py-6 text-left hover:bg-muted/20 transition-colors ${isRtl ? "flex-row-reverse text-right" : ""}`}
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                                        <Package className="w-7 h-7" />
                                    </div>

                                    {/* Title + teaser */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{pkg.problem}</p>
                                    </div>

                                    {/* Services badge + expand */}
                                    <div className={`flex items-center gap-4 flex-shrink-0 ${isRtl ? "flex-row-reverse" : ""}`}>
                                        <span className="hidden md:block text-xs text-muted-foreground bg-muted/60 border border-border px-3 py-1.5 rounded-full line-clamp-1 max-w-[200px]">
                                            {pkg.servicesUsed}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all ${isExpanded ? "bg-primary border-primary text-primary-foreground rotate-180" : "hover:border-primary/40"}`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded detail */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-t border-border bg-muted/10 px-8 py-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {SECTION_CONFIG.map((section, sIdx) => {
                                                        const Icon = section.icon;
                                                        const label = isRtl ? section.labelAr : section.labelEn;
                                                        const content = pkg[section.key as keyof typeof pkg] as string;
                                                        return (
                                                            <motion.div
                                                                key={section.key}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: sIdx * 0.05 }}
                                                                className={`space-y-3 ${isRtl ? "text-right" : ""}`}
                                                            >
                                                                <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                                                                    <Icon className={`w-4 h-4 ${section.color}`} />
                                                                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</span>
                                                                </div>
                                                                <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                {filtered.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center p-12 rounded-[3rem] border border-border bg-muted/10 relative overflow-hidden"
                    >
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                        <h2 className="text-4xl font-display font-black mb-4 tracking-tight">
                            {isRtl ? "مو لاگيت الباقة المناسبة؟" : "Can't find the right package?"}
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg font-light">
                            {isRtl
                                ? "نبني حلول مخصصة تناسب احتياجات شغلك بالضبط."
                                : "We build custom solutions tailored exactly to your business needs."}
                        </p>
                        <Link href="/contact" className={`inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl ${isRtl ? "flex-row-reverse" : ""}`}>
                            {isRtl ? "تحدث وياي" : "Let's Talk"}
                            <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
