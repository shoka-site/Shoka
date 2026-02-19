import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Brain, Code, Database, Cloud, ArrowRight, Star, Target, Zap, Layers, Cpu, Lock, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Section from "@/components/layout/Section";
import {
  useHeroSlides,
  useStats,
  useServices,
  useProjects,
  useTestimonials,
  useWhyShokaPoints,
  useProcessSteps,
  useInsightTopics,
  usePlatformUpdates,
} from "@/hooks/use-content";

const iconMap: Record<string, any> = {
  Brain, Code, Database, Cloud, Target, Zap, Layers, Cpu, Lock,
};

// ─── Update type config — warm brand palette ──────────────────────────────────
type UpdateType = "news" | "achievement" | "event" | "new";

// Uses the site's brand: Bronze, Gold, Sand, Clay tones
const UPDATE_STYLE: Record<UpdateType, {
  label: string;
  emoji: string;
  // CSS color values
  accentHex: string;       // e.g. badge border / button bg
  accentLight: string;     // translucent tint for badge bg / glow
  textClass: string;       // Tailwind text class for label
  // hero background: dark but on-brand
  bgFrom: string;          // Tailwind bg-gradient-to-br from class
  bgVia: string;
}> = {
  news: {
    label: "Latest News",
    emoji: "📰",
    accentHex: "#C2A45C",        // Accent Gold
    accentLight: "rgba(194,164,92,0.14)",
    textClass: "text-amber-300",
    bgFrom: "from-[#1e1505]",
    bgVia: "via-[#2a1f08]",
  },
  achievement: {
    label: "Achievement",
    emoji: "🏆",
    accentHex: "#8C6239",        // Deep Clay/Bronze
    accentLight: "rgba(140,98,57,0.18)",
    textClass: "text-[#D6C6A5]",
    bgFrom: "from-[#1a0f08]",
    bgVia: "via-[#221508]",
  },
  event: {
    label: "Upcoming Event",
    emoji: "📅",
    accentHex: "#D6C6A5",        // Heritage Sand
    accentLight: "rgba(214,198,165,0.12)",
    textClass: "text-[#e8ddcc]",
    bgFrom: "from-[#17110a]",
    bgVia: "via-[#22190e]",
  },
  new: {
    label: "What's New",
    emoji: "✨",
    accentHex: "#C2A45C",        // Accent Gold (same warmth)
    accentLight: "rgba(194,164,92,0.16)",
    textClass: "text-amber-200",
    bgFrom: "from-[#1c1408]",
    bgVia: "via-[#251c0c]",
  },
};

const FALLBACK_UPDATES = [
  { id: "f1", type: "new" as UpdateType, title: "Platform Officially Launched", summary: "Shoka Platform is now live. Experience next-generation digital solutions built for Iraq's future." },
  { id: "f2", type: "achievement" as UpdateType, title: "500+ Projects Delivered", summary: "We celebrate crossing the milestone of 500 successfully delivered projects across industries in Iraq." },
  { id: "f3", type: "event" as UpdateType, title: "Baghdad Tech Summit 2026", summary: "Join us at the Baghdad Tech Summit on March 15–17, 2026. Register now to secure your spot." },
  { id: "f4", type: "news" as UpdateType, title: "AI Analytics Module in Beta", summary: "Our AI-powered analytics module is open for early access — unlock deeper business intelligence today." },
];

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
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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

  const { data: raw = [] } = usePlatformUpdates();
  const items = raw.length > 0
    ? raw.map(u => ({ id: u.id, type: u.type as UpdateType, title: u.title, summary: u.summary }))
    : FALLBACK_UPDATES;

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIdx(p => (p + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const goTo = (i: number) => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); };
  const prev = () => goTo((activeIdx - 1 + items.length) % items.length);
  const next = () => goTo((activeIdx + 1) % items.length);

  const item = items[activeIdx];
  const style = UPDATE_STYLE[item?.type] ?? UPDATE_STYLE.news;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: ({ opacity: 1, x: 0 }),
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0f0a04" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Brand-toned gradient bg per type */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${style.bgFrom} ${style.bgVia} to-[#0f0a04]`}
        />
      </AnimatePresence>

      {/* Warm radial glow — brand gold accent */}
      <motion.div
        key={item.id + "-glow"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 65% 50%, ${style.accentLight} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      {/* Decorative horizontal rule lines — Mesopotamian geometry */}
      <div className="absolute left-0 right-0 top-[30%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-[30%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Large ghost emoji — faint brand echo */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[28vw] leading-none select-none pointer-events-none opacity-[0.035]"
        style={{ color: style.accentHex, right: "-3vw" }}
      >
        {style.emoji}
      </div>

      {/* Top progress bar in brand gold */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 z-20">
        <motion.div
          key={activeIdx}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isPaused ? undefined : 1 }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full origin-left"
          style={{ backgroundColor: style.accentHex }}
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
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`max-w-4xl ${isRtl ? "mr-0 ml-auto text-right" : ""}`}
          >
            {/* Type badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`mb-6 flex items-center gap-3 ${isRtl ? "justify-end" : ""}`}
            >
              <span className="text-3xl">{style.emoji}</span>
              <span
                className={`text-xs font-bold uppercase tracking-[0.25em] ${style.textClass} border px-4 py-1.5 rounded-full`}
                style={{ borderColor: style.accentHex + "50", backgroundColor: style.accentLight }}
              >
                {style.label}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] mb-6"
              style={{ textShadow: `0 0 80px ${style.accentHex}25` }}
            >
              {item.title}
            </motion.h1>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/55 max-w-2xl leading-relaxed font-light mb-10"
            >
              {item.summary}
            </motion.p>

            {/* CTA — brand-colored */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`flex flex-col sm:flex-row gap-4 ${isRtl ? "justify-end" : ""}`}
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full text-base h-12 px-8 font-semibold border-0"
                  style={{ backgroundColor: style.accentHex, color: "#1a1005" }}
                >
                  Let's Talk
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base h-12 px-8 bg-transparent font-semibold text-white/80 hover:text-white"
                  style={{ borderColor: style.accentHex + "55" }}
                >
                  Our Expertise
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom navigation */}
      <div className="absolute bottom-10 left-0 right-0 px-8 md:px-16 lg:px-24 z-20 flex items-center justify-between">
        {/* Counter */}
        <div className="text-sm font-mono text-white/25">
          <span className="font-bold text-base" style={{ color: style.accentHex }}>
            {String(activeIdx + 1).padStart(2, "0")}
          </span>
          <span className="mx-1">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>

        {/* Arrows + dots */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border flex items-center justify-center text-white/40 hover:text-white transition-all"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 h-2" : "w-2 h-2 hover:opacity-60"}`}
                style={i === activeIdx
                  ? { backgroundColor: style.accentHex }
                  : { backgroundColor: "rgba(255,255,255,0.2)" }}
                aria-label={`Go to update ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border flex items-center justify-center text-white/40 hover:text-white transition-all"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/20"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${style.accentHex}60, transparent)` }} />
      </motion.div>
    </section>
  );
}

// ─── Main Home page ───────────────────────────────────────────────────────────
export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const { data: stats = [], isLoading: loadingStats } = useStats();
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: projects = [], isLoading: loadingProjects } = useProjects(true);
  const { data: testimonials = [], isLoading: loadingTestimonials } = useTestimonials();
  const { data: whyShokaPoints = [], isLoading: loadingWhyShoka } = useWhyShokaPoints();
  const { data: processSteps = [], isLoading: loadingProcess } = useProcessSteps();
  const { data: insightTopics = [], isLoading: loadingInsights } = useInsightTopics();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="w-full">

      {/* Sticky scroll progress bar */}
      <ScrollProgressBar />

      {/* ── FULL-SCREEN PLATFORM UPDATES HERO ───────────────────── */}
      <HeroUpdates isRtl={isRtl} />

      {/* ── WHY US — title banner ─────────────────────────────────── */}
      <div className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <FadeInSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.35em] mb-4 text-center">
              The Shoka Difference
            </p>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <h2
              className="text-center font-display font-black text-foreground leading-[1.0]"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              Why Us?
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.14}>
            <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed font-light">
              Everything below is our answer. Numbers, services, real projects, and the people who made them happen.
            </p>
          </FadeInSection>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      {!loadingStats && stats.length > 0 && (
        <Section background="default" className="py-16 border-y border-border/30">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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
      )}

      {/* ── VALUE PROP ────────────────────────────────────────────── */}
      <Section background="muted" className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />
        </div>
        <FadeInSection className="text-center max-w-4xl mx-auto relative z-10">
          <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
            We are a global software engineering firm that takes a uniquely human approach to solving problems.
            We help our clients build the future by combining deep industry expertise with world-class engineering.
          </p>
        </FadeInSection>
      </Section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      {!loadingServices && services.length > 0 && (
        <Section background="default">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Expertise</h2>
              </div>
              <Link href="/services">
                <span className="group flex items-center text-primary font-medium mt-6 md:mt-0 hover:underline cursor-pointer">
                  {t("view_all_services")}
                  <ArrowRight className={`mx-2 w-4 h-4 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </span>
              </Link>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Brain;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-muted/50 p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-2xl hover:bg-muted/70 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <Link href="/services">
                    <span className="text-primary text-sm font-medium hover:underline inline-flex items-center cursor-pointer">
                      {t("home.services.learn_more")}
                      <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"}`} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      {!loadingTestimonials && testimonials.length > 0 && (
        <Section background="muted">
          <FadeInSection className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">{t("home.trust.title")}</h2>
          </FadeInSection>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial]?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-background/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-border"
              >
                {testimonials[currentTestimonial] && (
                  <>
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-foreground/80 mb-8 italic leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
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

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      {!loadingProjects && projects.length > 0 && (
        <Section background="default">
          <FadeInSection className="text-center mb-16">
            <span className="text-accent tracking-widest uppercase text-sm font-medium">{t("home.projects.subtitle")}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t("home.projects.title")}</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-accent text-sm font-medium mb-2 block">{project.category}</span>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* ── WHY SHOKA ────────────────────────────────────────────── */}
      {!loadingWhyShoka && whyShokaPoints.length > 0 && (
        <Section background="muted">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Our Philosophy</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      )}

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      {!loadingProcess && processSteps.length > 0 && (
        <Section background="default">
          <FadeInSection className="text-center mb-16">
            <span className="text-accent tracking-widest uppercase text-sm font-medium">{t("home.process.subtitle")}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t("home.process.title")}</h2>
          </FadeInSection>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
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
      )}

      {/* ── INSIGHTS ─────────────────────────────────────────────── */}
      {!loadingInsights && insightTopics.length > 0 && (
        <Section background="muted">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-accent tracking-widest uppercase text-sm font-medium">{t("home.insights.subtitle")}</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t("home.insights.title")}</h2>
              </div>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-background/50 p-8 rounded-2xl border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-display font-bold mb-3 line-clamp-2">{topic.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{topic.description}</p>
                <span className="text-sm text-accent">{topic.readTime}</span>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <Section background="default">
        <FadeInSection>
          <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-12 md:p-20 rounded-3xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Innovate?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Let's discuss how we can help you build your digital future.</p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-lg shadow-primary/30">
                Contact Us
              </Button>
            </Link>
          </div>
        </FadeInSection>
      </Section>

    </div>
  );
}