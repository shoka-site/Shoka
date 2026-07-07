"use client";

import { motion, AnimatePresence, useScroll, useSpring, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type UpdateType = "news" | "achievement" | "event" | "new" | "project" | "service";

export interface PlatformUpdate {
  id: string;
  type: UpdateType;
  title?: string;
  summary?: string;
  titleEn?: string;
  titleAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  images?: string[];
  projectId?: string | null;
  serviceId?: string | null;
  project?: {
    images?: string[];
    [key: string]: unknown;
  } | null;
  service?: {
    imageUrl?: string | null;
    [key: string]: unknown;
  } | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

function useUpdateStyle() {
  return {
    news: {
      label: "hero.updates.news",
      emoji: "📰",
      accentHex: "#c2a45c",
      accentLight: "rgba(194, 164, 92, 0.1)",
      textClass: "text-[#c2a45c]/80",
      bgFrom: "from-black",
      bgVia: "via-black",
    },
    achievement: {
      label: "hero.updates.achievement",
      emoji: "🏆",
      accentHex: "#c2a45c",
      accentLight: "rgba(194, 164, 92, 0.1)",
      textClass: "text-[#c2a45c]/80",
      bgFrom: "from-black",
      bgVia: "via-black",
    },
    event: {
      label: "hero.updates.event",
      emoji: "📅",
      accentHex: "#c2a45c",
      accentLight: "rgba(194, 164, 92, 0.1)",
      textClass: "text-[#c2a45c]/80",
      bgFrom: "from-black",
      bgVia: "via-black",
    },
    new: {
      label: "hero.updates.new",
      emoji: "✨",
      accentHex: "#c2a45c",
      accentLight: "rgba(194, 164, 92, 0.1)",
      textClass: "text-[#c2a45c]/80",
      bgFrom: "from-black",
      bgVia: "via-black",
    },
    project: {
      label: "hero.updates.type_project",
      emoji: "🚀",
      accentHex: "#c2a45c",
      accentLight: "rgba(194, 164, 92, 0.1)",
      textClass: "text-[#c2a45c]/80",
      bgFrom: "from-black",
      bgVia: "via-black",
    },
    service: {
      label: "hero.updates.type_service",
      emoji: "🛠️",
      accentHex: "#c2a45c",
      accentLight: "rgba(194, 164, 92, 0.1)",
      textClass: "text-[#c2a45c]/80",
      bgFrom: "from-black",
      bgVia: "via-black",
    },
  };
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[999] origin-left"
      style={{ scaleX, backgroundColor: "#C2A45C" }}
    />
  );
}

export function FadeInSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((c, i) => (
         <motion.div
          key={c}
          className={`absolute pointer-events-none z-10 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.7 }}
          style={{
            top: c[0] === "t" ? "1.5rem" : "auto",
            bottom: c[0] === "b" ? "1.5rem" : "auto",
            left: c[1] === "l" ? "1.5rem" : "auto",
            right: c[1] === "r" ? "1.5rem" : "auto",
            width: 24, height: 24,
          }}
        >
          <span className="absolute w-full h-[1px] bg-accent/40" style={{ top: c[0] === "b" ? "auto" : 0, bottom: c[0] === "t" ? "auto" : 0 }} />
          <span className="absolute w-[1px] h-full bg-accent/40" style={{ left: c[1] === "r" ? "auto" : 0, right: c[1] === "l" ? "auto" : 0 }} />
        </motion.div>
      ))}
    </>
  );
}

export function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * 0.4;
    const y = (clientY - centerY) * 0.4;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroUpdatesClient({ items }: { items: PlatformUpdate[]; isRtl: boolean }) {
  const { t, i18n } = useTranslation();

  // Localize items reactively based on current language
  const isArabic = i18n.language?.startsWith("ar") ?? true;
  const localizedItems = items.map((item) => ({
    ...item,
    title: (isArabic ? item.titleAr : item.titleEn) ?? item.title ?? "",
    summary: (isArabic ? item.summaryAr : item.summaryEn) ?? item.summary ?? "",
  }));

  const heroRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const lastMouseMoveTs = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
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
    }, 9000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const updateStyle = useUpdateStyle();

  if (localizedItems.length === 0) {
    return (
      <section className="relative h-screen-dvh flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1505] via-[#000000] to-[#000000]" />
      </section>
    );
  }

  const goTo = (i: number) => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); };
  const prev = () => goTo((activeIdx - 1 + localizedItems.length) % localizedItems.length);
  const next = () => goTo((activeIdx + 1) % localizedItems.length);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const now = Date.now();
    if (now - lastMouseMoveTs.current < 40) return;
    lastMouseMoveTs.current = now;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40
    });
  };

  const item = localizedItems[activeIdx];
  const style = (updateStyle as Record<string, typeof updateStyle.news>)[item?.type] ?? updateStyle.news;

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + custom * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
  };

  // Resolve Image
  const projectImage = item.project?.images?.find(img => img && img.trim() !== "");
  const serviceImage = item.service?.imageUrl;
  const updateImage = item.images?.find((img: string) => img && img.trim() !== "");
  const finalSrc = (updateImage || projectImage || serviceImage || "").trim();

  return (
    <section
      ref={heroRef}
      className="relative h-screen-dvh flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseMove={handleMouseMove}
    >
      {/* ── FULL SCREEN IMMERSIVE BACKGROUND ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={item.id + "-bg"}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          {finalSrc ? (
            <SafeImage
              src={finalSrc}
              alt={item.title || "Feature"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              fallbackType={item.type}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1e1505] via-[#000000] to-[#000000]" />
          )}

          {/* Cinematic Overlays to Ensure Readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-transparent via-transparent to-black/90' : 'from-black/90 via-transparent to-transparent'}`} />
          <div className="absolute inset-0 bg-mesopot-lattice opacity-[0.08]" />
          <div className="absolute inset-0 bg-grain opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* ── FOREGROUND CONTENT ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={item.id + "-content"}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? (isArabic ? -50 : 50) : (isArabic ? 50 : -50) }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? (isArabic ? 50 : -50) : (isArabic ? -50 : 50) }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className={`relative w-full h-full max-w-[1600px] mx-auto flex items-center px-6 sm:px-12 md:px-20 lg:px-24 z-20 ${isArabic ? 'justify-end' : 'justify-start'}`}
        >
          {/* Glassmorphism Content Card */}
          <div className="w-full max-w-2xl relative">
            <CornerBrackets className="opacity-40" />
            <div className="relative z-10 p-8 sm:p-10 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              
              {/* Type Badge */}
              <motion.div
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 mb-6 inline-flex"
              >
                <div className="px-5 py-2 border border-accent/40 bg-accent/10 backdrop-blur-md rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(194,164,92,0.15)]">
                  <span className="text-xl animate-pulse">{style.emoji}</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
                    {t(style.label)}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <div className="flex flex-wrap gap-x-3 gap-y-2 mb-6">
                {item.title?.split(" ").map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h1
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.1] tracking-tighter drop-shadow-lg"
                      style={{
                        background: "linear-gradient(180deg, #ffffff 45%, #c2a45c 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {word}
                    </motion.h1>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <motion.p
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-lg sm:text-xl text-white/80 leading-relaxed font-light mb-8 line-clamp-3 drop-shadow-md"
              >
                {item.summary}
              </motion.p>

              {/* CTA */}
              <motion.div
                custom={4}
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <MagneticButton className="inline-block">
                  <Link href={item.projectId ? `/projects/${item.projectId}` : item.serviceId ? `/services/${item.serviceId}` : "/contact"}>
                    <Button
                      size="lg"
                      className="group relative overflow-hidden rounded-full bg-accent text-black px-10 h-14 font-black text-lg transition-all duration-500 shadow-[0_0_30px_rgba(194,164,92,0.4)] hover:scale-105 hover:shadow-[0_0_40px_rgba(194,164,92,0.6)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {item.projectId || item.serviceId ? t("hero.updates.cta_view") : t("hero.updates.cta_talk")}
                        {isArabic ? <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                      </span>
                      <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── NAVIGATION CONTROLS ── */}
      <div className={`absolute bottom-8 lg:bottom-12 z-50 flex items-center gap-6 ${isArabic ? 'left-6 sm:left-12' : 'right-6 sm:right-12'}`}>
        
        {/* Control Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-14 h-14 rounded-full border border-white/20 bg-black/30 backdrop-blur-2xl flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/50 hover:bg-black/50 transition-all duration-300 shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="w-14 h-14 rounded-full border border-white/20 bg-black/30 backdrop-blur-2xl flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/50 hover:bg-black/50 transition-all duration-300 shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Ring */}
        <div className="w-16 h-16 relative flex items-center justify-center bg-black/20 rounded-full backdrop-blur-md border border-white/10">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="28" className="stroke-white/10 fill-none" strokeWidth="2" />
            <motion.circle
              key={activeIdx}
              cx="32" cy="32" r="28"
              className="stroke-accent fill-none"
              strokeWidth="2"
              strokeDasharray="175.93"
              initial={{ strokeDashoffset: 175.93 }}
              animate={{ strokeDashoffset: isPaused ? undefined : 0 }}
              transition={{ duration: 9, ease: "linear" }}
            />
          </svg>
          <div className="flex flex-col items-center z-10">
            <span className="text-lg font-display font-black text-white leading-none">{(activeIdx + 1)}</span>
            <span className="text-[9px] text-white/60 uppercase font-bold tracking-tighter mt-0.5">/ {localizedItems.length}</span>
          </div>
        </div>
      </div>

      {/* Gold horizontal accent (bottom edge) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent z-50" />
    </section>
  );
}

export function TestimonialCarousel({ testimonials, initialTestimonial }: { testimonials: Testimonial[]; initialTestimonial: number }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(initialTestimonial);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[currentTestimonial]?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="relative p-5 sm:p-8 md:p-12 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(194,164,92,0.06) 0%, rgba(0,0,0,0) 60%)",
            border: "1px solid rgba(194,164,92,0.2)",
            boxShadow: "0 4px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(194,164,92,0.1)",
          }}
        >
          {testimonials[currentTestimonial] && (
            <>
              {/* Gold gradient top stripe */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(194,164,92,0.6) 50%, transparent)" }} />
              {/* Decorative quote glyph */}
              <div className="text-[80px] leading-none font-serif text-center mb-2 select-none"
                style={{ color: "rgba(194,164,92,0.15)", lineHeight: "0.7" }}>
                ❝
              </div>
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed text-center">
                {testimonials[currentTestimonial].quote}
              </p>
              {/* Author separator */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, rgba(194,164,92,0.4))" }} />
                <span className="text-accent text-[8px]">◆</span>
                <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, rgba(194,164,92,0.4))" }} />
              </div>
              <div className="text-center">
                <div className="font-bold text-white">{testimonials[currentTestimonial].author}</div>
                <div className="text-sm text-accent/70 mt-1">{testimonials[currentTestimonial].role}</div>
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
  );
}
