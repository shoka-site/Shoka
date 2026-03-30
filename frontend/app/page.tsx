"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";


const SOCIALS = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/sehle/about/?viewAsMember=true",
        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
        label: "X",
        href: "https://x.com/sehle_iq",
        d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/sehle_iq/",
        d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@sehle_iq",
        d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1-.06z",
    },
];

export default function WelcomePage() {
    const { t, i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);
    // Until mounted, default to Arabic (matches server-rendered HTML and avoids hydration mismatch).
    // The LanguageDetector reads localStorage only in the browser, so SSR always produces Arabic.
    const isRtl = mounted ? i18n.dir() === "rtl" : true;
    const resolvedLanguage = mounted ? i18n.language : "ar";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setMounted(true); }, []);

    // Mouse spotlight — zero re-renders via direct DOM mutation
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            el.style.setProperty("--mx", `${e.clientX}px`);
            el.style.setProperty("--my", `${e.clientY}px`);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const toggleLanguage = () => {
        const newLang = resolvedLanguage === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
        document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;
    };

    const heading = isRtl ? "نبني التميّز الرقمي" : "Building Digital Excellence";

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-black"
            style={{ "--mx": "50vw", "--my": "50vh" } as React.CSSProperties}
        >
            {/* ════════════════ BACKGROUND ════════════════ */}

            {/* Mouse spotlight */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle 650px at var(--mx) var(--my), rgba(194,164,92,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Film grain */}
            <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

            {/* Lattice */}
            <div className="absolute inset-0 bg-mesopot-lattice opacity-20 pointer-events-none" />

            {/* Top golden bloom */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse 160% 50% at 50% -8%, rgba(194,164,92,0.16) 0%, transparent 60%)",
                }}
            />

            {/* Animated orbs */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    top: "15%", left: "10%",
                    width: "40vw", height: "40vw",
                    background: "radial-gradient(circle, rgba(194,164,92,0.11) 0%, transparent 70%)",
                    filter: "blur(90px)",
                }}
                animate={{ x: [0, 80, -20, 0], y: [0, -50, 30, 0], opacity: [0.5, 0.9, 0.6, 0.5] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    bottom: "10%", right: "8%",
                    width: "35vw", height: "35vw",
                    background: "radial-gradient(circle, rgba(194,164,92,0.08) 0%, transparent 70%)",
                    filter: "blur(110px)",
                }}
                animate={{ x: [0, -60, 20, 0], y: [0, 40, -25, 0], opacity: [0.4, 0.8, 0.5, 0.4] }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            {/* Scrolling gold grid */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(194,164,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(194,164,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "90px 90px",
                    opacity: 0.025,
                }}
                animate={{ backgroundPosition: ["0px 0px", "90px 90px"] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />

            {/* Falling light trails */}
            {([
                { left: "20%", h: 220, dur: 9, delay: 0, gold: true },
                { left: "65%", h: 160, dur: 7, delay: 3, gold: false },
                { left: "82%", h: 190, dur: 8, delay: 1.5, gold: true },
            ] as const).map(({ left, h, dur, delay, gold }, i) => (
                <motion.div key={i}
                    className="absolute top-0 w-px pointer-events-none"
                    style={{
                        left,
                        height: h,
                        background: gold
                            ? "linear-gradient(to bottom, rgba(194,164,92,0.6), rgba(194,164,92,0.15), transparent)"
                            : "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)",
                        filter: "blur(0.5px)",
                    }}
                    animate={{ y: [-h, 1600], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: dur, repeat: Infinity, ease: "linear", delay, repeatDelay: 3 }}
                />
            ))}

            {/* Edge vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(0,0,0,0.88) 100%)",
                }}
            />

            {/* Corner brackets */}
            {(["tl", "tr", "bl", "br"] as const).map((c, i) => (
                <motion.div
                    key={c}
                    className="absolute pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.7 }}
                    style={{
                        top: c[0] === "t" ? "1.25rem" : "auto",
                        bottom: c[0] === "b" ? "1.25rem" : "auto",
                        left: c[1] === "l" ? "1.25rem" : "auto",
                        right: c[1] === "r" ? "1.25rem" : "auto",
                        width: 28, height: 28,
                    }}
                >
                    <span style={{
                        position: "absolute",
                        top: c[0] === "b" ? "auto" : 0,
                        bottom: c[0] === "t" ? "auto" : 0,
                        left: c[1] === "r" ? "auto" : 0,
                        right: c[1] === "l" ? "auto" : 0,
                        width: "100%", height: 1,
                        background: "rgba(194,164,92,0.50)",
                        display: "block",
                    }} />
                    <span style={{
                        position: "absolute",
                        top: c[0] === "b" ? "auto" : 0,
                        bottom: c[0] === "t" ? "auto" : 0,
                        left: c[1] === "r" ? "auto" : 0,
                        right: c[1] === "l" ? "auto" : 0,
                        width: 1, height: "100%",
                        background: "rgba(194,164,92,0.50)",
                        display: "block",
                    }} />
                </motion.div>
            ))}

            {/* One-shot load scan line */}
            <motion.div
                className="absolute left-0 w-full h-px pointer-events-none z-30"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(194,164,92,0.85), transparent)",
                    filter: "blur(1px)",
                }}
                initial={{ top: "0%" }}
                animate={{ top: "108%" }}
                transition={{ duration: 1.0, delay: 0.05, ease: [0.4, 0, 0.8, 1] }}
            />

            {/* ════════════════ CONTENT ════════════════ */}
            <div className="relative z-10 min-h-screen flex flex-col">

                {/* ── TOP NAV ── */}
                <div className="relative flex justify-between items-center px-8 md:px-12 pt-8 md:pt-10">

                    {/* Social icons */}
                    <div className="flex gap-2.5 items-center">
                        {SOCIALS.map(({ label, href, d }, i) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                                whileHover={{ scale: 1.15, y: -2 }}
                                whileTap={{ scale: 0.92 }}
                                className="w-9 h-9 rounded-full border border-[#c2a45c]/22 flex items-center justify-center text-white/38 hover:text-[#c2a45c] hover:border-[#c2a45c]/60 transition-all duration-300"
                            >
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                                    <path d={d} />
                                </svg>
                            </motion.a>
                        ))}
                    </div>

                    {/* Brand — centered absolute */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="absolute left-1/2 -translate-x-1/2"
                    >
                        <Image
                            src="/logo-updated.png"
                            alt="Sehle"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain opacity-60 drop-shadow-[0_0_8px_rgba(194,164,92,0.5)]"
                            priority
                        />
                    </motion.div>

                    {/* Language toggle */}
                    <motion.button
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 border border-[#c2a45c]/25 bg-[#c2a45c]/5 backdrop-blur-xl rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#c2a45c]/10 hover:border-[#c2a45c]/55 transition-all text-white/50 hover:text-white/90"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        {resolvedLanguage === "en" ? "العربية" : "English"}
                    </motion.button>
                </div>

                {/* ── HERO ── */}
                <div className="flex-1 flex items-center justify-center relative px-6">

                    {/* Expanding rings */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                            style={{
                                border: "1px solid rgba(194,164,92,0.13)",
                                width: "clamp(140px, 38vmin, 440px)",
                                height: "clamp(140px, 38vmin, 440px)",
                            }}
                            animate={{ scale: [0.75, 3.5], opacity: [0.5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
                        />
                    ))}

                    {/* Rotating conic orb */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "75vw", height: "50vh",
                            background:
                                "conic-gradient(from 0deg, transparent 0%, rgba(194,164,92,0.06) 20%, transparent 40%, rgba(194,164,92,0.04) 60%, transparent 80%)",
                            borderRadius: "50%",
                            filter: "blur(65px)",
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="relative w-full max-w-4xl flex flex-col items-center gap-5 md:gap-7">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-2 px-4 py-1.5 border border-[#c2a45c]/28 bg-[#c2a45c]/8 rounded-full"
                        >
                            <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-[#c2a45c] inline-block"
                                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[#c2a45c]/80 text-[10px] tracking-[0.35em] font-light uppercase" suppressHydrationWarning>
                                {t("welcome.badge")}
                            </span>
                        </motion.div>

                        {/* ── Logo ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.95, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Image
                                src="/logo-updated.png"
                                alt="Sehle"
                                width={320}
                                height={320}
                                sizes="(min-width: 1024px) 512px, (min-width: 768px) 416px, (min-width: 640px) 320px, 256px"
                                className="w-64 h-64 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] lg:w-[32rem] lg:h-[32rem] object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Gold divider */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-32 h-px"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(194,164,92,0.70), transparent)",
                                transformOrigin: "center",
                            }}
                        />

                        {/* Heading — word by word */}
                        <div className="flex flex-wrap justify-center gap-x-3">
                            {heading.split(" ").map((word, i) => (
                                <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                                    <motion.span
                                        initial={{ y: "110%" }}
                                        animate={{ y: "0%" }}
                                        transition={{
                                            duration: 0.75,
                                            delay: 1.75 + i * 0.13,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="inline-block text-xl md:text-2xl lg:text-3xl font-light text-white/80 tracking-wide leading-relaxed"
                                    >
                                        {word}
                                    </motion.span>
                                </div>
                            ))}
                        </div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 2.2 }}
                            className="text-white/50 text-xs md:text-sm max-w-xs md:max-w-sm text-center leading-relaxed font-light tracking-wide"
                            suppressHydrationWarning
                        >
                            {t("welcome.tagline")}
                        </motion.p>

                        {/* ── CTA Button — sliding gold fill on hover ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 2.5 }}
                        >
                            <Link
                                href="/home"
                                className="group relative overflow-hidden inline-flex items-center gap-4 px-10 py-4 border border-[#c2a45c]/45 text-[11px] tracking-[0.3em] uppercase font-medium text-white/80 hover:text-black transition-colors duration-500"
                            >
                                {/* Gold fill slides in from left on hover */}
                                <span
                                    className="absolute inset-0 bg-[#c2a45c] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                                    aria-hidden="true"
                                />
                                <span className="relative" suppressHydrationWarning>{t("welcome.enter")}</span>
                                <motion.span
                                    className="relative text-[#c2a45c]/70 group-hover:text-black transition-colors duration-500"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* ── BOTTOM BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 2.8 }}
                    className="flex justify-between items-center px-8 md:px-12 pb-8 md:pb-10"
                >
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-white/22">
                        <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-[#c2a45c] inline-block"
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.5, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span suppressHydrationWarning>{t("welcome.system_ready")}</span>
                    </div>

                    <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-5 h-5 text-[#c2a45c]/28" />
                    </motion.div>

                    <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/22" suppressHydrationWarning>
                        {t("welcome.est")}
                    </span>
                </motion.div>
            </div>

            {/* ── Gold horizontal accent line ── */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px z-20 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c2a45c]/32 to-transparent" />
                <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-[#c2a45c]/16 to-transparent" />
            </motion.div>
        </div>
    );
}
