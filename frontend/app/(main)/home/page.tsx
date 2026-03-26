import Link from "next/link";
import Image from "next/image";
import { Brain, Code, Database, Cloud, ArrowRight, Star, Target, Zap, Layers, Cpu, Lock, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "@/components/layout/Section";
import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { FadeInSection, HeroUpdatesClient, ScrollProgressBar, TestimonialCarousel } from "@/components/home/HomeClientComponents";
import { getServerTranslation } from "@/lib/server-i18n";
import { Suspense } from "react";
import { CountUp } from "@/components/ui/count-up";

// Icon mapping for server-side
const iconMap: Record<string, any> = {
  Brain, Code, Database, Cloud, Target, Zap, Layers, Cpu, Lock,
};

// Revalidation time for ISR
export const revalidate = 60;

export default async function Home() {
  const { t, isRtl, lang } = getServerTranslation("ar");

  // Fetch initial hero data on the server
  const rawUpdates = await storage.getPlatformUpdates(true);
  const platformUpdates = transformForLanguage(rawUpdates, lang);

  return (
    <div className="w-full">
      <ScrollProgressBar />

      {/* Hero Section - Pre-fetched on server but rendered as client component for interactivity */}
      <HeroUpdatesClient items={platformUpdates} isRtl={isRtl} />

      {/* Why Us Title Banner */}
      <div className="relative bg-background overflow-hidden">
        {/* Mesopotamian Assyrian chevron strip — top border */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-mesopot-chevron opacity-60" />
        {/* Subtle gold radial glow behind headline */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(194,164,92,0.05) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <FadeInSection>
            <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
              <span className="text-accent/40 text-[8px]">◆◆◆</span>
              <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
                {t("home.why_us.badge")}
              </p>
              <span className="text-accent/40 text-[8px]">◆◆◆</span>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <h2
              className="text-center font-display font-black text-foreground leading-[1.0] text-ur-glow"
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
        {/* Mesopotamian gold gradient bottom rule */}
        <div className="mesopot-divider mx-8 md:mx-24" />
      </div>

      {/* Progressive Loading with Suspense */}
      <Suspense fallback={<Section className="py-24 h-64 flex items-center justify-center">{t("common.loading_content")}</Section>}>
        <ServicesSection t={t} isRtl={isRtl} lang={lang} />
      </Suspense>

      <Suspense fallback={<Section background="muted" className="py-24 h-64 flex items-center justify-center">{t("common.loading_projects")}</Section>}>
        <ProjectsSection t={t} isRtl={isRtl} lang={lang} />
      </Suspense>

      <Suspense fallback={<Section className="py-24 h-64 flex items-center justify-center">{t("common.loading_content")}</Section>}>
        <PackagesSection t={t} isRtl={isRtl} lang={lang} />
      </Suspense>


      {/* Static Philosophy Section */}
      <PhilosophySection t={t} isRtl={isRtl} />

      {/* 7. Process (How We Work) - RESTORED */}
      <ProcessSection t={t} isRtl={isRtl} />

      <Suspense fallback={<Section className="py-24 h-64 flex items-center justify-center">{t("common.loading_testimonials")}</Section>}>
        <TestimonialsSection t={t} isRtl={isRtl} lang={lang} />
      </Suspense>

      {/* 8. Results (Our Impact) */}
      <ResultsSection t={t} isRtl={isRtl} />

      {/* Static Outcome Section */}
      <OutcomesSection t={t} isRtl={isRtl} />
    </div>
  );
}

// Sub-components as Server Components to utilize streaming

async function PackagesSection({ t, isRtl, lang }: any) {
  const packagesRaw = await storage.getPackages(true);
  const packages = transformForLanguage(packagesRaw, lang);

  if (packages.length === 0) return null;

  return (
    <Section background="default" className="py-24 md:py-32">
      <FadeInSection className="text-center mb-8 md:mb-10">
        <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 block">
          {t("home.packages.badge")}
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight">
          {t("home.packages.title")}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
          {t("home.packages.description")}
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {packages.slice(0, 3).map((pkg: any, index: number) => (
          <Link key={pkg.id} href={`/packages/${pkg.id}`}>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 active:scale-[0.98] transition-all duration-500 cursor-pointer h-full" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(194,164,92,0.05)" }}>
              <div
                className="h-px w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
              />
              <div className="flex flex-col flex-1 p-5 md:p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs mb-4 self-start" style={{ background: "rgba(194,164,92,0.1)", border: "1px solid rgba(194,164,92,0.25)", color: "#c2a45c" }}>
                  {String(pkg.order).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                  {pkg.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">
                  {pkg.description || t("home.packages.no_description")}
                </p>
                <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                  {t("home.packages.learn_more")}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/packages">
          <Button variant="ghost" size="lg" className="group text-base font-display font-bold tracking-wider hover:bg-transparent">
            <span className="mr-3 border-b-2 border-accent pb-1 group-hover:border-primary transition-colors">
              {t("home.packages.view_all")}
            </span>
            <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

async function ServicesSection({ t, isRtl, lang }: any) {
  const servicesRaw = await storage.getServices(true);
  const services = transformForLanguage(servicesRaw, lang);

  if (services.length === 0) return null;

  return (
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
        {services.slice(0, 3).map((service: any, index: number) => (
          <Link key={service.id} href={`/services/${service.id}`}>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 active:scale-[0.98] transition-all duration-500 cursor-pointer h-full" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(194,164,92,0.05)" }}>
              <div
                className="h-px w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
              />
              <div className="flex flex-col flex-1 p-5 md:p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs mb-4 self-start" style={{ background: "rgba(194,164,92,0.1)", border: "1px solid rgba(194,164,92,0.25)", color: "#c2a45c" }}>
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
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/services">
          <Button variant="ghost" size="lg" className="group text-base font-display font-bold tracking-wider hover:bg-transparent">
            <span className="mr-3 border-b-2 border-accent pb-1 group-hover:border-primary transition-colors">
              {t("view_all_services")}
            </span>
            <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

async function ProjectsSection({ t, isRtl, lang }: any) {
  const projectsRaw = await storage.getProjects(true, true);
  const projects = transformForLanguage(projectsRaw, lang);

  if (projects.length === 0) return null;

  return (
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
        {projects.slice(0, 3).map((project: any, index: number) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 active:scale-[0.98] transition-all duration-500 cursor-pointer h-full" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(194,164,92,0.05)" }}>
              <div
                className="h-px w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
              />
              <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0">
                {project.images && project.images.some((img: any) => typeof img === 'string' && img.trim() !== "") ? (
                  <Image
                    src={project.images.find((img: any) => typeof img === 'string' && img.trim() !== "") || ""}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                    <Layers className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-background/80 backdrop-blur-md rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 md:p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs mb-4 self-start" style={{ background: "rgba(194,164,92,0.1)", border: "1px solid rgba(194,164,92,0.25)", color: "#c2a45c" }}>
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
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/projects">
          <Button variant="ghost" size="lg" className="group text-base font-display font-bold tracking-wider hover:bg-transparent">
            <span className="mr-3 border-b-2 border-accent pb-1 group-hover:border-primary transition-colors">
              {t("view_all_projects")}
            </span>
            <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

async function TestimonialsSection({ t, isRtl, lang }: any) {
  const testimonialsRaw = await storage.getTestimonials(true);
  const testimonials = transformForLanguage(testimonialsRaw, lang);

  if (testimonials.length === 0) return null;

  return (
    <Section background="default" className="py-24 md:py-32">
      <FadeInSection className="text-center">
        <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 md:mb-3 block">{t("home.trust.badge")}</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">{t("home.trust.title")}</h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto">
          {t("home.trust.description")}
        </p>
      </FadeInSection>
      <TestimonialCarousel testimonials={testimonials} initialTestimonial={0} />
    </Section>
  );
}

function PhilosophySection({ t, isRtl }: any) {
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
            <div key={point.id} className="text-center">
              <FadeInSection delay={index * 0.1}>
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{
                    background: "radial-gradient(circle, rgba(194,164,92,0.12) 0%, transparent 70%)",
                    border: "1px solid rgba(194,164,92,0.25)",
                    boxShadow: "0 0 0 6px rgba(194,164,92,0.04), inset 0 1px 0 rgba(194,164,92,0.1)",
                  }}>
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

function ProcessSection({ t, isRtl }: any) {
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
        <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-2 block">{t("home.process.badge")}</span>
        <h2 className="text-3xl md:text-6xl font-display font-black tracking-tight">{t("home.process.title")}</h2>
        <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-xl mx-auto font-light leading-relaxed">
          {t("home.process.description")}
        </p>
      </FadeInSection>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Ziggurat connecting line — gold gradient */}
        <div className="absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] hidden lg:block"
          style={{ background: "linear-gradient(90deg, transparent, rgba(194,164,92,0.3) 20%, rgba(194,164,92,0.3) 80%, transparent)" }} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
          {processSteps.map((step, index) => (
            <FadeInSection key={step.id} delay={index * 0.1} className="relative group text-center">
              <div className="relative mb-8 inline-block">
                {/* Outer seal ring */}
                <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: "1px solid rgba(194,164,92,0.3)", boxShadow: "0 0 20px rgba(194,164,92,0.15)" }} />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full text-primary-foreground flex items-center justify-center text-xl md:text-2xl font-display font-bold relative z-10 mx-auto transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #c2a45c 0%, #8a6d2d 100%)",
                    boxShadow: "0 4px 20px rgba(194,164,92,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}>
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

function ResultsSection({ t, isRtl }: any) {
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
      {/* Mesopotamian diamond lattice overlay */}
      <div className="absolute inset-0 opacity-100 bg-mesopot-lattice" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-[#060606]/90 z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <FadeInSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-accent/40 text-[8px]">◆◆◆</span>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.4em]">
              {t("home.results.badge")}
            </p>
            <span className="text-accent/40 text-[8px]">◆◆◆</span>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {results.map((result, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] hover:border-accent/40 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 flex items-baseline gap-1">
                  {result.prefix && (
                    <span className="text-2xl md:text-3xl font-display font-medium text-accent/80">{result.prefix}</span>
                  )}
                  <div
                    className="font-display font-black leading-none text-white tracking-tighter"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                  >
                    <CountUp end={parseFloat(result.value)} />
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
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <p className="text-center text-sm mt-16 text-white/40 tracking-wide">
            {t("home.results.footnote")}
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

function OutcomesSection({ t, isRtl }: any) {
  return (
    <section className="relative py-32 bg-[#060606] text-white overflow-hidden">
        {/* Mesopotamian rosette / sun-disc pattern overlay */}
        <div className="absolute inset-0 bg-mesopot-rosette opacity-100" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              {/* Mesopotamian decorative crown mark */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(194,164,92,0.5))" }} />
                <span className="text-accent text-xs tracking-[0.5em]">◆</span>
                <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(to left, transparent, rgba(194,164,92,0.5))" }} />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black mb-10 leading-tight"
                style={{
                  background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                {t("home.outcomes.title")}
              </h2>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <Link href="/contact">
                  <Button size="lg" className="h-16 px-12 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #c2a45c 0%, #8a6d2d 100%)",
                      color: "#000",
                      boxShadow: "0 8px 30px rgba(194,164,92,0.3)",
                    }}>
                    {t("home.cta.primary")}
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg" className="h-16 px-12 rounded-full font-bold text-lg text-white transition-all duration-300 hover:border-accent/60 hover:bg-accent/10"
                    style={{
                      borderColor: "rgba(194,164,92,0.3)",
                      background: "rgba(194,164,92,0.05)",
                    }}>
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
