"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePlatformUpdates } from "@/hooks/use-content";

// ─────────────────────────────────────────────
// Shared Hero News Ticker Component
// ─────────────────────────────────────────────

type UpdateType = "news" | "achievement" | "event" | "new";

interface TickerItem {
    id: string;
    type: UpdateType;
    title: string;
    summary: string;
}

const TYPE_CONFIG: Record<
    UpdateType,
    { label: string; icon: string; color: string; bg: string; dotColor: string }
> = {
    news: { label: "hero.updates.news", icon: "📰", color: "text-sky-300", bg: "bg-sky-500/15", dotColor: "bg-sky-400" },
    achievement: { label: "hero.updates.achievement", icon: "🏆", color: "text-amber-300", bg: "bg-amber-500/15", dotColor: "bg-amber-400" },
    event: { label: "hero.updates.event", icon: "📅", color: "text-violet-300", bg: "bg-violet-500/15", dotColor: "bg-violet-400" },
    new: { label: "hero.updates.new", icon: "✨", color: "text-emerald-300", bg: "bg-emerald-500/15", dotColor: "bg-emerald-400" },
};

interface HeroNewsTickerProps {
    isRtl?: boolean;
    /** 'dark' for the welcome page overlay, 'light' for the home page themed bg */
    variant?: "dark" | "light";
    className?: string;
}

export function HeroNewsTicker({ isRtl = false, variant = "dark", className = "" }: HeroNewsTickerProps) {
    const { t } = useTranslation();
    const { data: updates = [] } = usePlatformUpdates();

    const FALLBACK_ITEMS: TickerItem[] = [
        { id: "f1", type: "new", title: t("hero.updates.fallback.f1_title"), summary: t("hero.updates.fallback.f1_summary") },
        { id: "f2", type: "achievement", title: t("hero.updates.fallback.f2_title"), summary: t("hero.updates.fallback.f2_summary") },
        { id: "f3", type: "event", title: t("hero.updates.fallback.f3_title"), summary: t("hero.updates.fallback.f3_summary") },
        { id: "f4", type: "news", title: t("hero.updates.fallback.f4_title"), summary: t("hero.updates.fallback.f4_summary") },
    ];
    const items: TickerItem[] =
        updates.length > 0
            ? updates.map((u) => ({ id: u.id, type: u.type, title: u.title, summary: u.summary }))
            : FALLBACK_ITEMS;

    const [activeIdx, setActiveIdx] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (items.length <= 1) return;
        const timer = setInterval(() => {
            setDirection(1);
            setActiveIdx((prev) => (prev + 1) % items.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [items.length]);

    const item = items[activeIdx] ?? FALLBACK_ITEMS[0];
    const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.news;

    const containerClass =
        variant === "dark"
            ? "bg-black/50 backdrop-blur-md border-white/10"
            : "bg-background/80 backdrop-blur-sm border-border";

    const variants = {
        enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 10 : -10 }),
        center: { opacity: 1, y: 0 },
        exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -10 : 10 }),
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className={`w-full max-w-xl ${className}`}
            dir={isRtl ? "rtl" : "ltr"}
        >
            <div className={`relative flex items-stretch rounded-sm border ${containerClass} overflow-hidden`}>
                {/* Type badge */}
                <div className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 border-r border-current/10 ${cfg.bg}`}>
                    <span className="text-base leading-none">{cfg.icon}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${cfg.color} hidden sm:inline`}>
                        {t(cfg.label)}
                    </span>
                </div>

                {/* Animated text */}
                <div className="flex-1 relative overflow-hidden flex items-center px-5 py-3" style={{ minHeight: 56 }}>
                    <motion.div
                        key={item.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className={`w-full ${isRtl ? "text-right" : "text-left"}`}
                    >
                        <p className="text-sm font-semibold leading-tight text-foreground">{item.title}</p>
                        <p className="text-xs mt-0.5 leading-relaxed truncate text-muted-foreground">{item.summary}</p>
                    </motion.div>
                </div>

                {/* Dot navigation */}
                <div className="flex-shrink-0 flex items-center gap-1.5 px-4 border-l border-current/10">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > activeIdx ? 1 : -1);
                                setActiveIdx(i);
                            }}
                            className={`rounded-full transition-all duration-300 ${i === activeIdx ? `w-4 h-1.5 ${cfg.dotColor}` : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                                }`}
                            aria-label={`Update ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
