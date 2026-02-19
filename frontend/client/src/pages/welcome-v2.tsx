import { motion, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import portal from "@/assets/meso-portal.png";
import { HeroNewsTicker } from "@/components/layout/HeroNewsTicker";


// ─────────────────────────────────────────────
// Welcome Page
// ─────────────────────────────────────────────

export default function WelcomeV2() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const bgX = useTransform(springX, (v) => v * 20);
    const bgY = useTransform(springY, (v) => v * 20);

    const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const spotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, transparent 10%, rgba(0,0,0,0.4) 40%)`;

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white relative overflow-hidden">

            {/* Parallax portal background */}
            <motion.div className="absolute inset-0 z-0" style={{ scale: 1.1, x: bgX, y: bgY }}>
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img src={portal} alt="Mesopotamian Portal" className="w-full h-full object-cover opacity-80" />
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply"
                    style={{ background: spotlight }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-30" />
            </motion.div>

            {/* Floating runes */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: [0, 0.4, 0], y: -100, x: Math.random() * 40 - 20 }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                        className="absolute text-accent/20 text-xs font-mono select-none"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${Math.random() * 20 + 10}px` }}
                    >
                        {["ⴰ", "ⴱ", "ⴳ", "ⴷ", "ⴹ", "ⴻ", "ⴼ", "ⴽ", "ⵀ", "ⵃ", "ⵄ", "ⵅ", "ⵇ", "ⵉ", "ⵊ", "ⵍ", "ⵎ", "ⵏ", "ⵯ", "ⵓ", "ⵔ", "ⵕ", "ⵖ", "ⵙ", "ⵚ", "ⵛ", "ⵜ", "ⵟ", "ⵡ", "ⵢ", "ⵣ", "ⵥ"][Math.floor(Math.random() * 32)]}
                    </motion.div>
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-30 flex flex-col items-center text-center px-4 w-full max-w-4xl">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-accent/50 to-transparent">
                        <div className="px-6 py-2 bg-black/50 backdrop-blur-md rounded-full border border-accent/10">
                            <span className={`text-accent text-xs uppercase ${isRtl ? "tracking-normal" : "tracking-[0.3em]"}`}>
                                {t("welcome.badge")}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Brand title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
                    className={`relative text-[12vw] leading-none font-display font-bold mb-4 select-none ${isRtl ? "tracking-normal" : "tracking-tighter"}`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                        {t("navbar.brand")}
                    </span>
                    <motion.span
                        className="absolute inset-0 text-accent/20 mix-blend-overlay blur-[2px]"
                        animate={{ x: [0, -2, 2, 0], opacity: [0, 0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 5, repeatDelay: 2 }}
                    >
                        {t("navbar.brand")}
                    </motion.span>
                </motion.h1>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mb-8"
                >
                    <span className={`text-xl md:text-2xl text-accent font-light uppercase border-y border-accent/20 py-2 ${isRtl ? "tracking-normal" : "tracking-[0.5em]"}`}>
                        {t("welcome.cradle")} {t("welcome.innovation")}
                    </span>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl font-light tracking-wide leading-relaxed mb-8"
                >
                    {t("welcome.subtitle")}
                    <br />
                    {t("welcome.subtitle_2")}
                </motion.p>

                {/* ── News Ticker ── */}
                <HeroNewsTicker isRtl={isRtl} />

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    {/* Primary: Enter Platform */}
                    <Link
                        href="/home"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent transition-all duration-500 rounded-sm overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-accent/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                        <span className={`relative z-10 text-accent font-display font-bold text-lg uppercase group-hover:text-white transition-colors duration-300 ${isRtl ? "tracking-normal" : "tracking-[0.2em]"}`}>
                            {t("welcome.enter")}
                        </span>
                        <ChevronRight className="relative z-10 w-5 h-5 text-accent group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Secondary: Let's Talk */}
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 px-8 py-5 border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all duration-400 rounded-sm"
                    >
                        <span className="text-white/70 group-hover:text-white font-semibold text-base transition-colors duration-300">
                            Let's Talk
                        </span>
                    </Link>

                    {/* Tertiary: Our Expertise */}
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 px-8 py-5 border border-white/10 hover:border-white/30 bg-transparent hover:bg-white/5 transition-all duration-400 rounded-sm"
                    >
                        <span className="text-white/40 group-hover:text-white/70 text-base transition-colors duration-300">
                            Our Expertise
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Footer details */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-white/20 font-mono"
            >
                <div className="flex gap-4">
                    <span>{t("welcome.system_ready")}</span>
                    <span className="text-accent/40">{t("welcome.connected")}</span>
                </div>
                <div>{t("welcome.est")}</div>
            </motion.div>
        </div>
    );
}
