"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Sparkles, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HeroNewsTicker } from "@/components/layout/HeroNewsTicker";


export default function WelcomeV3() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
    };

    // Mouse tracking for the "Golden Aura"
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Aura spotlight effect
    const spotlight = useMotionTemplate`radial-gradient(1000px circle at ${springX}px ${springY}px, rgba(194,164,92,0.07), transparent 80%)`;

    // Generate particles only on the client to avoid hydration mismatch
    const [particles, setParticles] = useState<Array<{
        x: number; y: number; scale: number; duration: number; delay: number; xOffset: number;
    }>>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 20 }, () => ({
                x: Math.random() * 2000,
                y: Math.random() * 1000,
                scale: Math.random() * 0.5,
                duration: 5 + Math.random() * 10,
                delay: Math.random() * 5,
                xOffset: (Math.random() - 0.5) * 100,
            }))
        );
    }, []);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden font-display" dir={isRtl ? "rtl" : "ltr"}>

            {/* Language Switcher Overlay */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`absolute top-10 ${isRtl ? "left-10" : "right-10"} z-50`}
            >
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-xl rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-white/50 hover:text-white"
                >
                    <Globe className="w-3.5 h-3.5" />
                    {i18n.language === "en" ? "العربية" : "English"}
                </button>
            </motion.div>

            {/* 0. Video Background Layer */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
            >
                <source src="/Evolution_of_Writing_Mediums.mp4" type="video/mp4" />
            </video>

            {/* 1. Background Layers */}
            {/* Interactive Spotlight Aura */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: spotlight }}
            />

            {/* Subtle Gradient Fog/Overlay to ensure readability */}
            <div className="absolute inset-0 z-10 opacity-70"
                style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(15,10,4,0.4) 50%, rgba(0,0,0,0.9) 100%)" }}
            />

            {/* Floating Golden Dust Particles - Rendered client-side only */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent rounded-full opacity-20"
                        initial={{ x: p.x, y: p.y, scale: p.scale }}
                        animate={{
                            y: [p.y, p.y - 200],
                            opacity: [0, 0.3, 0],
                            x: [p.x, p.x + p.xOffset]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                    />
                ))}
            </div>

            {/* 2. Main Narrative Content */}
            <div className="relative z-30 flex flex-col items-center text-center px-6 w-full max-w-5xl">

                {/* Minimalist Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 px-4 py-1.5 border border-accent/20 bg-accent/5 backdrop-blur-xl rounded-full">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span className={`text-accent text-[10px] uppercase font-bold tracking-[0.4em] ${isRtl ? "tracking-normal" : ""}`}>
                            {t("welcome.badge")}
                        </span>
                    </div>
                </motion.div>

                {/* Shimmering Brand Title */}
                <div className="relative mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`text-[clamp(4rem,15vw,10rem)] leading-none font-black select-none ${isRtl ? "" : "tracking-tighter"}`}
                        style={{
                            background: "linear-gradient(to bottom, #fff 30%, #C2A45C 70%, #8A6D2D 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {t("navbar.brand")}
                    </motion.h1>

                    {/* Ghost Glow */}
                    <motion.div
                        className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        style={{ background: "#C2A45C" }}
                    >
                        {t("navbar.brand")}
                    </motion.div>
                </div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    className="mb-12 flex flex-col items-center gap-4"
                >
                    {/* Decorative separator */}
                    <div className="flex items-center gap-4 w-full max-w-xs">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/40" />
                        <div className="w-1 h-1 rounded-full bg-accent/60" />
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/40" />
                    </div>

                    <p className={`text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed text-center ${isRtl ? "" : "tracking-wide"}`}>
                        {i18n.language === "en" ? (
                            <>
                                Where the{" "}
                                <em className="not-italic font-semibold"
                                    style={{ background: "linear-gradient(90deg, #C2A45C, #e8d49a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    wisdom of the ancients
                                </em>
                                {" "}meets the{" "}
                                <em className="not-italic font-semibold"
                                    style={{ background: "linear-gradient(90deg, #C2A45C, #e8d49a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    technology of tomorrow
                                </em>
                                .
                            </>
                        ) : (
                            <>
                                حيث تلتقي{" "}
                                <em className="not-italic font-semibold"
                                    style={{ background: "linear-gradient(90deg, #C2A45C, #e8d49a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    حكمة القدماء
                                </em>
                                {" "}بـ
                                <em className="not-italic font-semibold"
                                    style={{ background: "linear-gradient(90deg, #C2A45C, #e8d49a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    تكنولوجيا الغد
                                </em>
                                .
                            </>
                        )}
                    </p>
                </motion.div>


                {/* Discovery CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col items-center gap-8 mb-20"
                >
                    <Link
                        href="/home"
                        className="group relative flex items-center gap-6 pl-12 pr-10 py-6 bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-all duration-700 rounded-full group overflow-hidden"
                    >
                        {/* Glow on hover */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <span className="relative z-10 text-white font-bold text-xl uppercase tracking-[0.2em]">
                            {t("welcome.enter")}
                        </span>

                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-black group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:scale-110 ${isRtl ? "rotate-180" : ""}`}>
                            <ChevronRight className="w-6 h-6" />
                        </div>
                    </Link>

                    {/* Quick Navigation Links */}
                    <div className="flex gap-12 text-xs uppercase tracking-[0.3em] font-bold text-white/30">
                        <Link href="/services" className="hover:text-accent transition-colors">{t("welcome.nav.expertise")}</Link>
                        <Link href="/projects" className="hover:text-accent transition-colors">{t("welcome.nav.portfolio")}</Link>
                        <Link href="/contact" className="hover:text-accent transition-colors">{t("welcome.nav.discuss")}</Link>
                    </div>
                </motion.div>

                {/* News Ticker Integration */}
                <div className="w-full max-w-md border-t border-white/5 pt-8">
                    <HeroNewsTicker isRtl={isRtl} />
                </div>
            </div>

            {/* 3. Global Status Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-10 flex justify-center w-full"
            >
                <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.5em] uppercase text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {t("welcome.system_ready")}
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div>{t("welcome.est")}</div>
                </div>
            </motion.div>
        </div>
    );
}
