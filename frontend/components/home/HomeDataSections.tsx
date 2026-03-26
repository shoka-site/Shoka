"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Star } from "lucide-react";
import Section from "@/components/layout/Section";
import { FadeInSection, TestimonialCarousel } from "@/components/home/HomeClientComponents";
import type { PlatformUpdate, Testimonial } from "@/components/home/HomeClientComponents";

// ─── Services Section ─────────────────────────────────────────────────────────
export function ServicesSectionClient({ services }: { services: any[] }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  if (!services || services.length === 0) return null;

  // Pick the right language field at runtime
  const lang = i18n.language?.startsWith("en") ? "en" : "ar";
  const localizedServices = services.map((s) => ({
    ...s,
    title: s[`title${lang === "en" ? "En" : "Ar"}`] ?? s.titleAr ?? s.title,
    description: s[`description${lang === "en" ? "En" : "Ar"}`] ?? s.descriptionAr ?? s.description,
  }));

  return (
    <Section background="default" className="py-24 md:py-32">
      <FadeInSection className="text-center mb-8 md:mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">{t("home.services.badge")}</span>
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight"
          style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t("home.services.title")}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
          {t("home.services.description")}
        </p>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {localizedServices.slice(0, 3).map((service, index) => (
          <Link key={service.id} href={`/services/${service.id}`}>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 active:scale-[0.98] transition-all duration-500 cursor-pointer h-full"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(194,164,92,0.05)" }}>
              <div className="h-px w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }} />
              <div className="flex flex-col flex-1 p-5 md:p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs mb-4 self-start"
                  style={{ background: "rgba(194,164,92,0.1)", border: "1px solid rgba(194,164,92,0.25)", color: "#c2a45c" }}>
                  {String(service.order ?? index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">{service.description}</p>
                <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                  {t("view_service")}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/services" className="btn-view-all">
          {t("view_all_services")}
          <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </Section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export function ProjectsSectionClient({ projects }: { projects: any[] }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  if (!projects || projects.length === 0) return null;

  const lang = i18n.language?.startsWith("en") ? "en" : "ar";
  const localizedProjects = projects.map((p) => ({
    ...p,
    title: p[`title${lang === "en" ? "En" : "Ar"}`] ?? p.titleAr ?? p.title,
    description: p[`description${lang === "en" ? "En" : "Ar"}`] ?? p.descriptionAr ?? p.description,
  }));

  return (
    <Section background="muted" className="py-24 md:py-32">
      <FadeInSection className="text-center mb-8 md:mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">{t("home.projects.badge")}</span>
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight"
          style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t("home.projects.title")}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
          {t("home.projects.description")}
        </p>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {localizedProjects.slice(0, 3).map((project, index) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 active:scale-[0.98] transition-all duration-500 cursor-pointer h-full"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(194,164,92,0.05)" }}>
              <div className="h-px w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }} />
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
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs mb-4 self-start"
                  style={{ background: "rgba(194,164,92,0.1)", border: "1px solid rgba(194,164,92,0.25)", color: "#c2a45c" }}>
                  {String(index + 1).padStart(2, "00")}
                </span>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">{project.description}</p>
                <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                  {t("view_project")}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/projects" className="btn-view-all">
          {t("view_all_projects")}
          <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </Section>
  );
}

// ─── Packages Section ─────────────────────────────────────────────────────────
export function PackagesSectionClient({ packages }: { packages: any[] }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  if (!packages || packages.length === 0) return null;

  const lang = i18n.language?.startsWith("en") ? "en" : "ar";
  const localizedPackages = packages.map((p) => ({
    ...p,
    title: p[`title${lang === "en" ? "En" : "Ar"}`] ?? p.titleAr ?? p.title,
    description: p[`description${lang === "en" ? "En" : "Ar"}`] ?? p.descriptionAr ?? p.description,
  }));

  return (
    <Section background="default" className="py-24 md:py-32">
      <FadeInSection className="text-center mb-8 md:mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">{t("home.packages.badge")}</span>
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mt-2 tracking-tight"
          style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t("home.packages.title")}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mt-3 md:mt-4 max-w-xl mx-auto font-light leading-relaxed">
          {t("home.packages.description")}
        </p>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {localizedPackages.slice(0, 3).map((pkg, index) => (
          <Link key={pkg.id} href={`/packages/${pkg.id}`}>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 active:scale-[0.98] transition-all duration-500 cursor-pointer h-full"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(194,164,92,0.05)" }}>
              <div className="h-px w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }} />
              <div className="flex flex-col flex-1 p-5 md:p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs mb-4 self-start"
                  style={{ background: "rgba(194,164,92,0.1)", border: "1px solid rgba(194,164,92,0.25)", color: "#c2a45c" }}>
                  {String(pkg.order).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-300">{pkg.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 line-clamp-3 break-words">{pkg.description || t("home.packages.no_description")}</p>
                <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold">
                  {t("home.packages.learn_more")}
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/packages" className="btn-view-all">
          {t("home.packages.view_all")}
          <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </Section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
export function TestimonialsSectionClient({ testimonials }: { testimonials: any[] }) {
  const { t, i18n } = useTranslation();

  if (!testimonials || testimonials.length === 0) return null;

  const lang = i18n.language?.startsWith("en") ? "en" : "ar";
  const localizedTestimonials: Testimonial[] = testimonials.map((item) => ({
    ...item,
    quote: item[`quote${lang === "en" ? "En" : "Ar"}`] ?? item.quoteAr ?? item.quote,
  }));

  return (
    <Section background="default" className="py-24 md:py-32">
      <FadeInSection className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.05em]">{t("home.trust.badge")}</span>
          <span className="text-accent/40 text-[8px]">◆◆◆</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-black mb-2"
          style={{ background: "linear-gradient(180deg, #ffffff 30%, #c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t("home.trust.title")}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto">
          {t("home.trust.description")}
        </p>
      </FadeInSection>
      <TestimonialCarousel testimonials={localizedTestimonials} initialTestimonial={0} />
    </Section>
  );
}
