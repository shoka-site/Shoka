"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import { Star } from "lucide-react";

type UpdateType = "news" | "achievement" | "event" | "new";

export interface PlatformUpdate {
    id: string;
    type: UpdateType;
    title: string;
    summary: string;
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
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroUpdatesClient({ items, isRtl }: { items: PlatformUpdate[]; isRtl: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

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

  if (items.length === 0) {
    return (
      <section 
        className="relative h-[100dvh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#0f0a04" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1505] via-[#2a1f08] to-[#0f0a04]" />
      </section>
    );
  }

  const goTo = (i: number) => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); };
  const prev = () => goTo((activeIdx - 1 + items.length) % items.length);
  const next = () => goTo((activeIdx + 1) % items.length);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  const item = items[activeIdx];
  const style = (updateStyle as any)[item?.type] ?? updateStyle.news;

  const slideVariants: any = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40, filter: "blur(8px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, filter: "blur(8px)" }),
  };

  const textVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }
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

      <div className="absolute inset-0 bg-grain opacity-[0.07] pointer-events-none mix-blend-overlay" />
      <div className="absolute left-0 right-0 top-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

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

      <div
        className="absolute bottom-8 md:bottom-12 left-0 right-0 px-6 md:px-16 lg:px-24 z-20 flex items-center justify-between"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="text-sm font-mono text-white/30 tracking-widest">
          <span className="font-bold text-lg" style={{ color: style.accentHex }}>
            {String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 opacity-50">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>

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
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as any }}
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
  );
}
