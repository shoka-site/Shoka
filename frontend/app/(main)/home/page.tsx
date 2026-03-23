"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Brain, Code, Database, Cloud, ArrowRight, Star, Target, Zap, Layers, Cpu, Lock, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Section from "@/components/layout/Section";
import {
  useServices,
  useProjects,
  useTestimonials,
  usePlatformUpdates,
  usePackages,
} from "@/hooks/use-content";
import { useAllDataReady } from "@/hooks/useDataReady";
import { CountUp } from "@/components/ui/count-up";
import { InitialLoader } from "@/components/ui/InitialLoader";

const iconMap: Record<string, any> = {
  Brain, Code, Database, Cloud, Target, Zap, Layers, Cpu, Lock,
};

// ─── Update type config — warm brand palette ──────────────────────────────────
type UpdateType = "news" | "achievement" | "event" | "new";

// Uses the site's brand: Bronze, Gold, Sand, Clay tones
function useUpdateStyle() {
  return {
    news: {
      label: "hero.updates.news",
      emoji: "📰",
      accentHex: "#C2A45C",
      accentLight: "rgba(194,164,92,0.14)",
      textClass: "text-amber-300",
      bgFrom: "from-[#1e1505]",
      bgVia: "via-[#2a1f08]",
    },
    achievement: {
      label: "hero.updates.achievement",
      emoji: "🏆",
      accentHex: "#8C6239",
      accentLight: "rgba(140,98,57,0.18)",
      textClass: "text-[#D6C6A5]",
      bgFrom: "from-[#1a0f08]",
      bgVia: "via-[#221508]",
    },
    event: {
      label: "hero.updates.event",
      emoji: "📅",
      accentHex: "#D6C6A5",
      accentLight: "rgba(214,198,165,0.12)",
      textClass: "text-[#e8ddcc]",
      bgFrom: "from-[#17110a]",
      bgVia: "via-[#22190e]",
    },
    new: {
      label: "hero.updates.new",
      emoji: "✨",
      accentHex: "#C2A45C",
      accentLight: "rgba(194,164,92,0.16)",
      textClass: "text-amber-200",
      bgFrom: "from-[#1c1408]",
      bgVia: "via-[#251c0c]",
    },
  };
}

const UPDATE_STYLE_FALLBACK: Record<UpdateType, {
  label: string;
  emoji: string;
  accentHex: string;
  accentLight: string;
  textClass: string;
  bgFrom: string;
  bgVia: string;
}> = {
  news: {
    label: "hero.updates.news",
    emoji: "📰",
    accentHex: "#C2A45C",
    accentLight: "rgba(194,164,92,0.14)",
    textClass: "text-amber-300",
    bgFrom: "from-[#1e1505]",
    bgVia: "via-[#2a1f08]",
  },
  achievement: {
    label: "hero.updates.achievement",
    emoji: "🏆",
    accentHex: "#8C6239",
    accentLight: "rgba(140,98,57,0.18)",
    textClass: "text-[#D6C6A5]",
    bgFrom: "from-[#1a0f08]",
    bgVia: "via-[#221508]",
  },
  event: {
    label: "hero.updates.event",
    emoji: "📅",
    accentHex: "#D6C6A5",
    accentLight: "rgba(214,198,165,0.12)",
    textClass: "text-[#e8ddcc]",
    bgFrom: "from-[#17110a]",
    bgVia: "via-[#22190e]",
  },
  new: {
    label: "hero.updates.new",
    emoji: "✨",
    accentHex: "#C2A45C",
    accentLight: "rgba(194,164,92,0.16)",
    textClass: "text-amber-200",
    bgFrom: "from-[#1c1408]",
    bgVia: "via-[#251c0c]",
  },
};

// ─── Scroll progress bar (top of page) ───────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[999] origin-left"
      style={{ scaleX, backgroundColor: "#C2A45C" }}
    />
  );
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function FadeInSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Full-screen hero updates ─────────────────────────────────────────────────
function HeroUpdates({ isRtl }: { isRtl: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  // Parallax: the hero content drifts up as user scrolls into the page
  const yOffset = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const { t } = useTranslation();
  const { data: raw = [] } = usePlatformUpdates();
  const items = raw.map(u => ({ id: u.id, type: u.type as UpdateType, title: u.title, summary: u.summary }));

  // ALL hooks must be called unconditionally - before any early returns
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIdx(p => (p + 1) % items.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const updateStyle = useUpdateStyle();

  // Now we can safely return early after all hooks
  if (items.length === 0) {
    return (
      <section 
        className="relative h-[100dvh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0f0a04" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1505] via-[#2a1f08] to-[#0f0a04]" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 40%, rgba(194,164,92,0.1) 0%, transparent 60%)' }} />
      </section>
    );
  }

  const goTo = (i: number) => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); };
  const prev = () => goTo((activeIdx - 1 + items.length) % items.length);
  const next = () => goTo((activeIdx + 1) % items.length);

  // Handle both mouse and touch for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // Skip parallax on mobile
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  const handleTouchMove = () => {
    // Disable parallax on touch devices but keep carousel working
  };

  const item = items[activeIdx];
  const style = updateStyle[item?.type] ?? updateStyle.news;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40, filter: "blur(8px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, filter: "blur(8px)" }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] as any }
    })
  };

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#0f0a04" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Brand-toned gradient bg per type */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute inset-0 bg-gradient-to-br ${style.bgFrom} ${style.bgVia} to-[#0f0a04]`}
        />
      </AnimatePresence>

      {/* Warm radial glow — brand gold accent */}
      <motion.div
        key={item.id + "-glow"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 40%, ${style.accentLight} 0%, transparent 60%)`,
        }}
      />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 bg-grain opacity-[0.07] pointer-events-none mix-blend-overlay" />

      {/* Decorative horizontal rule lines — Mesopotamian geometry */}
      <div className="absolute left-0 right-0 top-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Large ghost emoji — faint brand echo */}
      <motion.div
        key={item.id + "-emoji"}
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className={`absolute ${isRtl ? "left-[-5vw]" : "right-[-5vw]"} top-1/2 -translate-y-1/2 text-[25vw] md:text-[35vw] leading-none select-none pointer-events-none`}
        style={{ color: style.accentHex }}
      >
        {style.emoji}
      </motion.div>

      {/* Top progress bar in brand gold */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-20">
        <motion.div
          key={activeIdx}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isPaused ? undefined : 1 }}
          transition={{ duration: 8, ease: "linear" }}
          className="h-full origin-left box-shadow-glow"
          style={{ backgroundColor: style.accentHex, boxShadow: `0 0 10px ${style.accentHex}` }}
        />
      </div>

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y: yOffset, opacity }}
        className={`relative z-10 w-full px-8 md:px-16 lg:px-24 pt-20`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className={`max-w-5xl ${isRtl ? "mr-0 ml-auto text-right" : ""}`}
          >
            {/* Type badge */}
            <motion.div
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className={`mb-8 flex items-center gap-4 ${isRtl ? "justify-start" : ""}`}
            >
              <span className="text-4xl drop-shadow-md">{style.emoji}</span>
              <span
                className={`text-xs font-bold uppercase tracking-[0.3em] ${style.textClass} border px-5 py-2 rounded-full backdrop-blur-sm shadow-sm`}
                style={{ borderColor: style.accentHex + "60", backgroundColor: style.accentLight }}
              >
                {t(style.label)}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className={`text-4xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] mb-8 tracking-tight ${isRtl ? "md:text-5xl lg:text-7xl" : ""}`}
              style={{
                textShadow: `0 0 40px ${style.accentHex}30`,
                x: mousePosition.x * -1,
                y: mousePosition.y * -1
              }}
            >
              {item.title}
            </motion.h1>

            {/* Summary */}
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className={`text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed font-light mb-12 ${isRtl ? "lg:text-xl max-w-xl" : ""}`}
              style={{
                x: mousePosition.x * -0.5,
                y: mousePosition.y * -0.5
              }}
            >
              {item.summary}
            </motion.p>

            {/* CTA — brand-colored */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className={`flex flex-col sm:flex-row gap-5 ${isRtl ? "justify-start" : ""}`}
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full text-sm md:text-base h-12 md:h-14 px-6 md:px-10 font-bold border-0 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: style.accentHex, color: "#1a1005", boxShadow: `0 8px 30px ${style.accentHex}40` }}
                >
                  {t("hero.updates.cta_talk")}
                </Button>
              </Link>
              <Link href="/packages">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-sm md:text-base h-12 md:h-14 px-6 md:px-10 bg-white/5 backdrop-blur-sm font-semibold text-white border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300"
                >
                  {t("hero.updates.cta_expertise")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom navigation */}
      <div
        className="absolute bottom-8 md:bottom-12 left-0 right-0 px-6 md:px-16 lg:px-24 z-20 flex items-center justify-between"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Counter */}
        <div className="text-sm font-mono text-white/30 tracking-widest">
          <span className="font-bold text-lg" style={{ color: style.accentHex }}>
            {String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 opacity-50">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>

        {/* Arrows + dots */}
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
              aria-label="Previous"
            >
              {isRtl ? (
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              ) : (
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              )}
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
              aria-label="Next"
            >
              {isRtl ? (
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>

          <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>

          <div className="flex gap-2.5 hidden md:flex">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-500 ease-out ${i === activeIdx ? "w-8 h-1.5 opacity-100" : "w-1.5 h-1.5 opacity-30 hover:opacity-100"}`}
                style={{ backgroundColor: i === activeIdx ? style.accentHex : "white" }}
                aria-label={`Go to update ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pb-8 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className={`text-[10px] uppercase tracking-[0.2em] font-medium text-white/30 mb-3 ${isRtl ? 'mr-1' : 'ml-1'}`}>{t("hero.updates.scroll")}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white/80"
            animate={{ y: [-50, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Main Home page ───────────────────────────────────────────────────────────
export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  // ALL hooks must be called unconditionally - before any early returns
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: projects = [], isLoading: loadingProjects } = useProjects();
  const { data: testimonials = [], isLoading: loadingTestimonials } = useTestimonials();
  const { data: packages = [], isLoading: loadingPackages } = usePackages();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // useAllDataReady hook
  const isReady = useAllDataReady([loadingServices, loadingProjects, loadingTestimonials, loadingPackages]);

  // Testimonials carousel effect - must be called unconditionally
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Show loading screen until all data is fetched
  if (!isReady) {
    return <InitialLoader />;
  }

  // Static Data for Stats
  const stats = [
    { id: "stat-exp", number: t("stats.experience.number"), label: t("stats.experience.label") },
    { id: "stat-proj", number: t("stats.projects.number"), label: t("stats.projects.label") },
    { id: "stat-clients", number: t("stats.clients.number"), label: t("stats.clients.label") },
    { id: "stat-sat", number: t("stats.satisfaction.number"), label: t("stats.satisfaction.label") },
  ];

  // Static Data for Why Us / Philosophy
  const whyShokaPoints = [
    { id: "why-1", iconName: "Target", title: t("home.why_us.points.business_first.title"), description: t("home.why_us.points.business_first.desc") },
    { id: "why-2", iconName: "Zap", title: t("home.why_us.points.rapid_prototyping.title"), description: t("home.why_us.points.rapid_prototyping.desc") },
    { id: "why-3", iconName: "Layers", title: t("home.why_us.points.modern_stack.title"), description: t("home.why_us.points.modern_stack.desc") },
    { id: "why-4", iconName: "Cpu", title: t("home.why_us.points.ai_driven.title"), description: t("home.why_us.points.ai_driven.desc") },
    { id: "why-5", iconName: "Lock", title: t("home.why_us.points.engineering_precision.title"), description: t("home.why_us.points.engineering_precision.desc") },
  ];

  // Static Data for Process Steps
  const processSteps = [
    { id: "step-1", stepNumber: "01", title: t("home.process.steps.discover.title"), description: t("home.process.steps.discover.desc") },
    { id: "step-2", stepNumber: "02", title: t("home.process.steps.design.title"), description: t("home.process.steps.design.desc") },
    { id: "step-3", stepNumber: "03", title: t("home.process.steps.build.title"), description: t("home.process.steps.build.desc") },
    { id: "step-4", stepNumber: "04", title: t("home.process.steps.launch.title"), description: t("home.process.steps.launch.desc") },
    { id: "step-5", stepNumber: "05", title: t("home.process.steps.scale.title"), description: t("home.process.steps.scale.desc") },
  ];
  return (
    <div className="w-full">

      {/* Sticky scroll progress bar */}
      <ScrollProgressBar />

      {/* ── FULL-SCREEN PLATFORM UPDATES HERO ───────────────────── */}
      <HeroUpdates isRtl={isRtl} />

      {/* ── WHY US — title banner ─────────────────────────────────── */}
      <div className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <FadeInSection>
            <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-3 md:mb-4 text-center">
              {t("home.why_us.badge")}
            </p>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <h2
              className="text-center font-display font-black text-foreground leading-[1.0]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7.5rem)" }}
            >
              {t("home.why_us.title")}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.14}>
            <p className="text-center text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed font-light">
              {t("home.why_us.description")}
            </p>
          </FadeInSection>
        </div>
      </div>

      {/* ── 1. STATS — instant credibility ────────────────────────── */}
      <Section background="default" className="py-24 border-y border-border/30">
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeInSection>
      </Section>

      {/* ── 2. OUR PACKAGES ────────────────────────────────────────── */}
      {!loadingPackages && packages.length > 0 && (
        <Section background="default" className="py-24 md:py-32">
          <FadeInSection className="text-center mb-8 md:mb-10">
            <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 block">
              {t("home.packages.badge", "What We Offer")}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight">
              {t("home.packages.title", "Our Packages")}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
              {t("home.packages.description", "Tailored service bundles designed to match your business needs and scale with your ambitions.")}
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {packages.slice(0, 3).map((pkg, index) => (
              <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden hover:border-accent/40 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Top accent line */}
                  <div
                    className="h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
                  />

                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    {/* Order badge */}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4 self-start">
                      {String(pkg.order).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {pkg.title}
                    </h3>

                    {pkg.description ? (
                      <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">
                        {pkg.description}
                      </p>
                    ) : (
                      <p className="text-muted-foreground/40 leading-relaxed text-sm italic flex-1">
                        {t("home.packages.no_description", "A tailored bundle of services designed to help you succeed.")}
                      </p>
                    )}

                    <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                      {t("home.packages.learn_more", "Learn more")}
                      <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* View all packages CTA */}
          <div className="mt-8 text-center">
            <Link href="/packages">
              <Button
                variant="ghost"
                size="lg"
                className="group text-base font-display font-bold tracking-wider hover:bg-transparent"
              >
                <span className="mr-3 border-b-2 border-accent pb-1 group-hover:border-primary transition-colors">
                  {t("home.packages.view_all", "View All Packages")}
                </span>
                <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
              </Button>
            </Link>
          </div>
        </Section>
      )}

      {/* ── 3. SERVICES — what we offer ───────────────────────────── */}
      {!loadingServices && services.length > 0 && (
        <Section background="default" className="py-24 md:py-32">
          <FadeInSection className="text-center mb-8 md:mb-10">
            <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 block">
              {t("home.services.badge")}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight">
              {t("home.services.title")}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
              {t("home.services.description")}
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.slice(0, 3).map((service, index) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden hover:border-accent/40 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Top accent line */}
                  <div
                    className="h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
                  />
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    {/* Order badge */}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4 self-start">
                      {String(service.order ?? index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">
                      {service.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                      {t("view_service")}
                      <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* View all services CTA */}
          <div className="mt-8 text-center">
            <Link href="/services">
              <Button
                variant="ghost"
                size="lg"
                className="group text-base font-display font-bold tracking-wider hover:bg-transparent"
              >
                <span className="mr-3 border-b-2 border-accent pb-1 group-hover:border-primary transition-colors">
                  {t("view_all_services")}
                </span>
                <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
              </Button>
            </Link>
          </div>
        </Section>
      )}

      {/* ── 4. PROJECTS — proof of work ───────────────────────────── */}
      {!loadingProjects && projects.length > 0 && (
        <Section background="muted" className="py-24 md:py-32">
          <FadeInSection className="text-center mb-8 md:mb-10">
            <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 block">
              {t("home.projects.badge")}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight">
              {t("home.projects.title")}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
              {t("home.projects.description")}
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.slice(0, 3).map((project, index) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden hover:border-accent/40 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Top accent line */}
                  <div
                    className="h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
                  />

                  {/* Project Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0">
                    {project.images && project.images.some((img: any) => typeof img === 'string' && img.trim() !== "") ? (
                      <Image
                        src={project.images.find((img: any) => typeof img === 'string' && img.trim() !== "") || ""}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                        <Layers className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-background/80 backdrop-blur-md rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    {/* Index badge */}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4 self-start">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">
                      {project.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                      {t("view_project")}
                      <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* View all projects CTA */}
          <div className="mt-8 text-center">
            <Link href="/projects">
              <Button
                variant="ghost"
                size="lg"
                className="group text-base font-display font-bold tracking-wider hover:bg-transparent"
              >
                <span className="mr-3 border-b-2 border-accent pb-1 group-hover:border-primary transition-colors">
                  {t("view_all_projects")}
                </span>
                <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
              </Button>
            </Link>
          </div>
        </Section>
      )}



      {/* ── 4. PROCESS — how easy it is to work with us ───────────── */}

      <Section background="muted">
        <FadeInSection className="text-center mb-12 md:mb-16">
          <span className="text-accent tracking-widest uppercase text-xs md:text-sm font-medium">{t("home.process.badge")}</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 md:mt-4">{t("home.process.title")}</h2>
          <p className="text-muted-foreground text-base md:text-lg mt-3 md:mt-4 max-w-xl mx-auto">
            {t("home.process.description")}
          </p>
        </FadeInSection>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-6 relative z-10">
                  {step.stepNumber}
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 5. TESTIMONIALS — don't take our word for it ──────────── */}
      {!loadingTestimonials && testimonials.length > 0 && (
        <Section background="default" className="py-24 md:py-32">
          <FadeInSection className="text-center">
            <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 md:mb-3 block">{t("home.trust.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">{t("home.trust.title")}</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto">
              {t("home.trust.description")}
            </p>
          </FadeInSection>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial]?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="bg-background border-[0.5px] border-border/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-md"
              >
                {testimonials[currentTestimonial] && (
                  <>
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-foreground/80 mb-8 italic leading-relaxed">
                      &quot;{testimonials[currentTestimonial].quote}&quot;
                    </p>
                    <div className="text-center">
                      <div className="font-bold text-foreground">{testimonials[currentTestimonial].author}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? "w-8 bg-primary" : "w-2 bg-primary/20"}`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. PHILOSOPHY — our values & what we stand for ────────── */}
      <Section background="muted" className="py-24 md:py-32">
        <FadeInSection className="text-center mb-12 md:mb-16">
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 md:mb-3 block">{t("home.philosophy.badge")}</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">{t("home.philosophy.title")}</h2>
          <p className="text-muted-foreground text-base md:text-lg mt-3 md:mt-4 max-w-xl mx-auto">
            {t("home.philosophy.description")}
          </p>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {whyShokaPoints.map((point, index) => {
            const Icon = iconMap[point.iconName] || Target;
            return (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>


      {/* ── 8. RESULTS — outcomes delivered to clients ────────────── */}
      <section className="relative py-32 bg-foreground text-background overflow-hidden">
        {/* Deep background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="results-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#results-pattern)" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-transparent to-foreground/90 z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <FadeInSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 text-center">
              {t("home.results.badge")}
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h2
              className="text-center font-display font-black text-white leading-[1.0] mb-6 tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {t("home.results.title")}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-20 leading-relaxed text-white/60 font-light">
              {t("home.results.description")}
            </p>
          </FadeInSection>

          {/* Results grid - Glassmorphism cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
            {[
              { value: "3", suffix: "×", label: t("home.results.items.market_time"), sub: t("home.results.items.market_time_sub") },
              { value: "62", suffix: "%", label: t("home.results.items.cost_reduction"), sub: t("home.results.items.cost_reduction_sub") },
              { value: "99", suffix: ".9%", label: t("home.results.items.uptime"), sub: t("home.results.items.uptime_sub") },
              { value: "4", suffix: ".9★", label: t("home.results.items.satisfaction"), sub: t("home.results.items.satisfaction_sub") },
              { value: "200", prefix: "+", suffix: "%", label: t("home.results.items.revenue"), sub: t("home.results.items.revenue_sub") },
              { value: "40", suffix: "%", label: t("home.results.items.onboarding"), sub: t("home.results.items.onboarding_sub") },
              { value: "20", suffix: "+", label: t("home.results.items.delivered"), sub: t("home.results.items.delivered_sub") },
              { value: "24", prefix: "<", suffix: "h", label: t("home.results.items.sla"), sub: t("home.results.items.sla_sub") },
            ].map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-white/[0.03] border-[0.5px] border-white/20 backdrop-blur-xl hover:bg-white/[0.06] hover:border-accent/40 active:scale-[0.98] transition-all duration-500 overflow-hidden"
              >
                {/* Subtle hover glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="mb-6 flex items-baseline gap-1">
                  {result.prefix && (
                    <span className="text-2xl md:text-3xl font-display font-medium text-accent/80">{result.prefix}</span>
                  )}
                  <div
                    className="font-display font-black leading-none text-white tracking-tighter"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                  >
                    <CountUp end={Number(result.value)} duration={2.5} />
                  </div>
                  {result.suffix && (
                    <span className="text-2xl md:text-3xl font-display font-medium text-accent">{result.suffix}</span>
                  )}
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-snug mb-2 tracking-wide group-hover:text-accent transition-colors duration-300">
                    {result.label}
                  </div>
                  <div className="text-sm text-white/50 leading-relaxed font-light">
                    {result.sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          <FadeInSection delay={0.4}>
            <p className="text-center text-sm mt-16 text-white/40 tracking-wide">
              {t("home.results.footnote")}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ── 9. CTA — close the deal ───────────────────────────────── */}
      <Section background="muted">
        <FadeInSection>
          <div className="text-center bg-foreground text-background p-12 md:p-20 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="relative z-10">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.35em] mb-4">{t("home.cta.badge")}</p>
              <h2 className="text-3xl md:text-5xl font-display font-black mb-6">{t("home.cta.title")}</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(247,243,235,0.6)" }}>
                {t("home.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="rounded-full text-lg h-14 px-10 font-semibold border-0"
                    style={{ backgroundColor: "#C2A45C", color: "#1a1005" }}
                  >
                    {t("home.cta.primary")}
                  </Button>
                </Link>
                <Link href="/packages">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full text-lg h-14 px-10 font-semibold bg-transparent text-white/80 hover:text-white"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    {t("home.cta.secondary")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </Section>


    </div>
  );
}
