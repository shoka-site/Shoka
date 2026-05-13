"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
  imageUrl?: string | null;
  projectId?: string | null;
  serviceId?: string | null;
  project?: {
    images?: string[];
    [key: string]: any;
  } | null;
  service?: {
    imageUrl?: string | null;
    [key: string]: any;
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

export function HeroUpdatesClient({ items, isRtl }: { items: PlatformUpdate[]; isRtl: boolean }) {
  const { t, i18n } = useTranslation();

  // Localize items reactively based on current language
  const isArabic = i18n.language?.startsWith("ar") ?? true;
  const localizedItems = items.map((item) => ({
    ...item,
    title: (isArabic ? item.titleAr : item.titleEn) ?? item.title ?? "",
    summary: (isArabic ? item.summaryAr : item.summaryEn) ?? item.summary ?? "",
  }));

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacityProgress = useTransform(scrollY, [0, 400], [1, 0]);

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

  return (
    <section
      ref={heroRef}
      className="relative h-screen-dvh flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseMove={handleMouseMove}
    >
      {/* ── CINEMATIC BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Lattice & Grain */}
        <div className="absolute inset-0 bg-mesopot-lattice opacity-[0.12]" />
        <div className="absolute inset-0 bg-grain opacity-40" />

        {/* Scrolling Gold Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(194,164,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(194,164,92,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "20%", left: "15%", width: "35vw", height: "35vw",
            background: "radial-gradient(circle, rgba(194,164,92,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "15%", right: "10%", width: "40vw", height: "40vw",
            background: "radial-gradient(circle, rgba(194,164,92,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ x: [0, -50, 40, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Light Trails */}
        {([
          { left: "20%", dur: 9, delay: 0 },
          { left: "75%", dur: 7, delay: 3 },
          { left: "90%", dur: 11, delay: 1.5 },
        ]).map((trail, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px h-64"
            style={{
              left: trail.left,
              background: "linear-gradient(to bottom, transparent, rgba(194,164,92,0.5), transparent)",
              filter: "blur(0.5px)",
            }}
            animate={{ y: [-300, 1400], opacity: [0, 1, 0] }}
            transition={{ duration: trail.dur, repeat: Infinity, ease: "linear", delay: trail.delay }}
          />
        ))}

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-transparent via-transparent to-black/80" />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={item.id}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-full flex flex-col lg:flex-row items-center z-10"
        >
          {/* Content Side */}
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 pt-24 lg:pt-0 relative z-20 order-2 lg:order-1">
            <CornerBrackets className="lg:hidden opacity-40" />

            <motion.div
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-8"
            >
              <div className="px-5 py-2 border border-accent/40 bg-accent/10 backdrop-blur-md rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(194,164,92,0.15)]">
                <span className="text-xl animate-pulse">{style.emoji}</span>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-accent">
                  {t(style.label)}
                </span>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-x-4 mb-8">
              {item.title?.split(" ").map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] tracking-tighter"
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

            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-white/50 max-w-xl leading-relaxed font-light mb-12"
            >
              {item.summary}
            </motion.p>

            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <MagneticButton>
                <Link href={item.projectId ? `/projects/${item.projectId}` : item.serviceId ? `/services/${item.serviceId}` : "/contact"}>
                  <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-accent text-black px-12 h-16 font-black text-lg transition-all duration-500 shadow-[0_0_30px_rgba(194,164,92,0.4)]"
                  >
                    <span className="relative z-10">{item.projectId || item.serviceId ? t("hero.updates.cta_view") : t("hero.updates.cta_talk")}</span>
                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2 h-full relative order-1 lg:order-2 overflow-hidden lg:rounded-l-[4rem]">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-full h-full relative"
              style={{
                x: isMobile ? 0 : mousePosition.x * -0.6,
                y: isMobile ? 0 : mousePosition.y * -0.6,
              }}
            >
              {(() => {
                const projectImage = item.project?.images?.[0];
                const serviceImage = item.service?.imageUrl;
                const finalSrc = item.imageUrl || projectImage || serviceImage;

                if (finalSrc && finalSrc.trim() !== "") {
                  return (
                    <>
                      <Image
                        src={finalSrc}
                        alt={item.title || "Feature"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const type = item.type as string;
                          const placeholders: Record<string, string> = {
                            news: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070",
                            achievement: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2070",
                            project: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
                            service: "https://images.unsplash.com/photo-1454165833767-027508658d61?q=80&w=2070",
                          };
                          target.src = placeholders[type] || "https://images.unsplash.com/photo-1451187530220-a095f9737559?q=80&w=2070";
                          console.warn(`Hero image failed to load: ${finalSrc}. Falling back to placeholder.`);
                        }}
                      />
                      <div className="absolute inset-0 bg-mesopot-rosette opacity-[0.05] mix-blend-overlay" />
                    </>
                  );
                }

                return (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                     <div className="absolute inset-0 opacity-20 bg-mesopot-lattice" />
                     <Sparkles className="w-20 h-20 text-accent/20 animate-pulse" />
                  </div>
                );
              })()}
              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Content Frame */}
            <CornerBrackets className="hidden lg:block opacity-60" />

            {/* Glowing separator */}
            <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden lg:block shadow-[0_0_15px_rgba(194,164,92,0.3)]" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── NAVIGATION CONTROLS ── */}

      {/* Progress Ring (Replacing bar for "Better" look) */}
      <div className="absolute bottom-12 right-12 w-20 h-20 z-50 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="36" className="stroke-white/5 fill-none" strokeWidth="2" />
          <motion.circle
            key={activeIdx}
            cx="40" cy="40" r="36"
            className="stroke-accent fill-none"
            strokeWidth="2"
            strokeDasharray="226.2"
            initial={{ strokeDashoffset: 226.2 }}
            animate={{ strokeDashoffset: isPaused ? undefined : 0 }}
            transition={{ duration: 9, ease: "linear" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-display font-black text-white leading-none">{(activeIdx + 1)}</span>
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">/ {localizedItems.length}</span>
        </div>
      </div>

      {/* Control Arrows */}
      <div className="absolute bottom-12 left-12 flex gap-3 z-50">
        <button
          onClick={prev}
          className="w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 hover:bg-white/10 transition-all duration-500 group shadow-2xl"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-1.5 transition-transform" />
        </button>
        <button
          onClick={next}
          className="w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 hover:bg-white/10 transition-all duration-500 group shadow-2xl"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Gold horizontal accent (bottom edge) */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
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
