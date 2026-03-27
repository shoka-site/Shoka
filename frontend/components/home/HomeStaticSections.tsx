"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Brain, Code, Database, Cloud, Target, Zap, Layers, Cpu, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "@/components/layout/Section";
import { FadeInSection } from "@/components/home/HomeClientComponents";
import { CountUp } from "@/components/ui/count-up";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Code, Database, Cloud, Target, Zap, Layers, Cpu, Lock,
};

// ─── Why Us Title Banner ─────────────────────────────────────────────────────
export function WhyUsBanner() {
  const { t } = useTranslation();
  return (
    <div className="relative bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-6 bg-mesopot-chevron opacity-60" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(194,164,92,0.05) 0%, transparent 70%)" }} />
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-28">
        <FadeInSection>
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <span className="text-accent/40 text-[8px]">◆◆◆</span>
            <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">
              {t("home.why_us.badge")}
            </p>
            <span className="text-accent/40 text-[8px]">◆◆◆</span>
          </div>
        </FadeInSection>
        <FadeInSection delay={0.08}>
          <h2
            className="text-center font-display font-black text-foreground leading-[1.2]"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7.5rem)",
              background: "linear-gradient(180deg, #ffffff 40%, #c2a45c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
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
      <div className="mesopot-divider mx-8 md:mx-24" />
    </div>
  );
}

// ─── Philosophy (Why Shoka) Section ──────────────────────────────────────────
export function PhilosophySection() {
  const { t } = useTranslation();

  const whyShokaPoints = [
    { id: "why-1", iconName: "Target", title: t("home.why_us.points.business_first.title"), description: t("home.why_us.points.business_first.desc") },
    { id: "why-2", iconName: "Zap", title: t("home.why_us.points.rapid_prototyping.title"), description: t("home.why_us.points.rapid_prototyping.desc") },
    { id: "why-3", iconName: "Layers", title: t("home.why_us.points.modern_stack.title"), description: t("home.why_us.points.modern_stack.desc") },
    { id: "why-4", iconName: "Cpu", title: t("home.why_us.points.ai_driven.title"), description: t("home.why_us.points.ai_driven.desc") },
    { id: "why-5", iconName: "Lock", title: t("home.why_us.points.engineering_precision.title"), description: t("home.why_us.points.engineering_precision.desc") },
  ];

  return (
    <Section background="muted" className="py-24 md:py-32">
      <FadeInSection className="text-center mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">{t("home.philosophy.badge")}</span>
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-black"
          style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t("home.philosophy.title")}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mt-3 md:mt-4 max-w-xl mx-auto">
          {t("home.philosophy.description")}
        </p>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {whyShokaPoints.map((point, index) => {
          const Icon = iconMap[point.iconName] || Target;
          return (
            <div key={point.id} className="text-center">
              <FadeInSection delay={index * 0.1}>
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ background: "radial-gradient(circle, rgba(194,164,92,0.12) 0%, transparent 70%)", border: "1px solid rgba(194,164,92,0.25)", boxShadow: "0 0 0 6px rgba(194,164,92,0.04), inset 0 1px 0 rgba(194,164,92,0.1)" }}>
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </FadeInSection>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Process (How We Work) Section ───────────────────────────────────────────
export function ProcessSection() {
  const { t } = useTranslation();

  const processSteps = [
    { id: "proc-1", stepNumber: "01", title: t("home.process.steps.discover.title"), description: t("home.process.steps.discover.desc") },
    { id: "proc-2", stepNumber: "02", title: t("home.process.steps.design.title"), description: t("home.process.steps.design.desc") },
    { id: "proc-3", stepNumber: "03", title: t("home.process.steps.build.title"), description: t("home.process.steps.build.desc") },
    { id: "proc-4", stepNumber: "04", title: t("home.process.steps.launch.title"), description: t("home.process.steps.launch.desc") },
    { id: "proc-5", stepNumber: "05", title: t("home.process.steps.scale.title"), description: t("home.process.steps.scale.desc") },
  ];

  return (
    <Section background="muted" className="py-24 md:py-32 overflow-hidden">
      <FadeInSection className="text-center mb-16 md:mb-24">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">{t("home.process.badge")}</span>
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
        </div>
        <h2 className="text-3xl md:text-6xl font-display font-black tracking-tight"
          style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t("home.process.title")}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-xl mx-auto font-light leading-relaxed">
          {t("home.process.description")}
        </p>
      </FadeInSection>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] hidden lg:block"
          style={{ background: "linear-gradient(90deg, transparent, rgba(194,164,92,0.3) 20%, rgba(194,164,92,0.3) 80%, transparent)" }} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
          {processSteps.map((step, index) => (
            <FadeInSection key={step.id} delay={index * 0.1} className="relative group text-center">
              <div className="relative mb-8 inline-block">
                <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: "1px solid rgba(194,164,92,0.3)", boxShadow: "0 0 20px rgba(194,164,92,0.15)" }} />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full text-primary-foreground flex items-center justify-center text-xl md:text-2xl font-display font-bold relative z-10 mx-auto transition-all duration-500"
                  style={{ background: "linear-gradient(135deg, #c2a45c 0%, #8a6d2d 100%)", boxShadow: "0 4px 20px rgba(194,164,92,0.25), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
                  {step.stepNumber}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{step.description}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Results (Our Impact) Section ────────────────────────────────────────────
export function ResultsSection() {
  const { t } = useTranslation();

  const results = [
    { value: "3", suffix: "×", label: t("home.results.items.market_time"), sub: t("home.results.items.market_time_sub") },
    { value: "62", suffix: "%", label: t("home.results.items.cost_reduction"), sub: t("home.results.items.cost_reduction_sub") },
    { value: "99", suffix: ".9%", label: t("home.results.items.uptime"), sub: t("home.results.items.uptime_sub") },
    { value: "4", suffix: ".9★", label: t("home.results.items.satisfaction"), sub: t("home.results.items.satisfaction_sub") },
    { value: "200", prefix: "+", suffix: "%", label: t("home.results.items.revenue"), sub: t("home.results.items.revenue_sub") },
    { value: "40", suffix: "%", label: t("home.results.items.onboarding"), sub: t("home.results.items.onboarding_sub") },
    { value: "20", suffix: "+", label: t("home.results.items.delivered"), sub: t("home.results.items.delivered_sub") },
    { value: "24", prefix: "<", suffix: "h", label: t("home.results.items.sla"), sub: t("home.results.items.sla_sub") },
  ];

  return (
    <section className="relative py-32 bg-[#060606] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-100 bg-mesopot-lattice" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-[#060606]/90 z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <FadeInSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-accent/40 text-[8px]">◆◆◆</span>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.05em]">{t("home.results.badge")}</p>
            <span className="text-accent/40 text-[8px]">◆◆◆</span>
          </div>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <h2 className="text-center font-display font-black leading-[1.0] mb-6 tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t("home.results.title")}
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <p className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-20 leading-relaxed text-white/60 font-light">
            {t("home.results.description")}
          </p>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {results.map((result, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="mesopot-metric-card group relative flex flex-col justify-between p-8 rounded-[2rem] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 flex items-baseline gap-1">
                  {result.prefix && <span className="text-2xl md:text-3xl font-display font-medium text-accent/80">{result.prefix}</span>}
                  <div className="font-display font-black leading-none text-white tracking-tighter" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                    <CountUp end={parseFloat(result.value)} />
                  </div>
                  {result.suffix && <span className="text-2xl md:text-3xl font-display font-medium text-accent">{result.suffix}</span>}
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-snug mb-2 tracking-wide group-hover:text-accent transition-colors duration-300">{result.label}</div>
                  <div className="text-sm text-white/50 leading-relaxed font-light">{result.sub}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection delay={0.4}>
          <p className="text-center text-sm mt-16 text-white/40 tracking-wide">{t("home.results.footnote")}</p>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─── Outcomes (CTA) Section ───────────────────────────────────────────────────
export function OutcomesSection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-32 bg-[#060606] text-white overflow-hidden">
      <div className="absolute inset-0 bg-mesopot-rosette opacity-100" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(194,164,92,0.5))" }} />
              <span className="text-accent text-xs tracking-[0.5em]">◆</span>
              <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(to left, transparent, rgba(194,164,92,0.5))" }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-10 leading-tight"
              style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t("home.outcomes.title")}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link href="/contact">
                <Button size="lg" className="h-16 px-12 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #c2a45c 0%, #8a6d2d 100%)", color: "#000", boxShadow: "0 8px 30px rgba(194,164,92,0.3)" }}>
                  {t("home.cta.primary")}
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="h-16 px-12 rounded-full font-bold text-lg text-white transition-all duration-300 hover:border-accent/60 hover:bg-accent/10"
                  style={{ borderColor: "rgba(194,164,92,0.3)", background: "rgba(194,164,92,0.05)" }}>
                  {t("view_all_projects")}
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
