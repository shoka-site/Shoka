"use client";

import Section from "@/components/layout/Section";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  PackageOpen,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Calendar,
  Hash,
  Activity,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePackage, usePackages } from "@/hooks/use-content";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { InitialLoader } from "@/components/ui/InitialLoader";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PackageDetails() {
  const { id } = useParams() as { id: string };
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const { data: pkg, isLoading } = usePackage(id);
  const { data: allPackages = [] } = usePackages();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Show full-screen loading while data is being fetched
  if (isLoading) {
    return <InitialLoader />;
  }

  if (!pkg) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container relative z-10 mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-24 h-24 mx-auto mb-8 bg-black/50 border border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(194,164,92,0.15)] relative backdrop-blur-3xl"
            >
              <motion.div className="absolute inset-2 border border-dashed border-primary/50 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <PackageOpen className="w-10 h-10 text-primary relative z-10" />
            </motion.div>
            <h1 className="text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter mb-6">404</h1>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">{t("portfolio.projects.not_found", "Package not found")}</h2>
            <p className="text-white/50 text-base md:text-xl max-w-md mx-auto mb-12 font-light leading-relaxed">{t("portfolio.projects.not_found_desc", "The package you are looking for does not exist or has been removed.")}</p>
            <Link href="/packages">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="bg-primary text-black hover:bg-white font-black tracking-widest uppercase transition-all shadow-xl flex gap-3 items-center rounded-full h-14 px-10 mx-auto">
                  <ArrowLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
                  {t("packages.back", "Back to Packages")}
                </button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Other packages (excluding current)
  const otherPackages = allPackages.filter((p) => p.id !== id).slice(0, 3);

  // Parse description paragraphs
  const descriptionParagraphs = (pkg.description || "").split("\n").filter(Boolean);

  // Format date
  const formattedDate = pkg.createdAt
    ? new Date(pkg.createdAt).toLocaleDateString(i18n.language === "ar" ? "ar-IQ" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary" dir={isRtl ? "rtl" : "ltr"}>

      {/* ── HERO ────────────────────────────────────────── */}
      <div className="relative h-[70vh] min-h-[520px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.12)_0%,transparent_55%)] mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(194,164,92,0.06)_0%,transparent_50%)] mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </motion.div>

        {/* Back link */}
        <div className="absolute top-32 left-0 w-full z-20 pointer-events-none">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-auto"
            >
              <Link
                href="/packages"
                className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold"
              >
                <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? "rotate-180" : ""}`}>
                  <ArrowLeft className="w-4 h-4" />
                </div>
                {t("packages.back", "Back to Packages")}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
          >
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-8">
              <Badge variant="outline" className="text-accent border-accent/40 bg-accent/10 px-5 py-2 text-xs backdrop-blur-md flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                <PackageOpen className="w-3.5 h-3.5" />
                {t("navbar.packages", "Package")} · {String(pkg.order).padStart(2, "0")}
              </Badge>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
              {pkg.title}
            </h1>

            {pkg.description && (
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto line-clamp-2">
                {descriptionParagraphs[0]}
              </p>
            )}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t("common.scroll", "Scroll")}</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-accent/50" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── CONTENT SECTION ─────────────────────────────── */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <Section className="py-24 md:py-32 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 relative z-10">

            {/* ── LEFT: Main Content ── */}
            <div className="lg:col-span-8 space-y-16">

              {/* Overview */}
              {descriptionParagraphs.length > 0 && (
                <FadeIn>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-12 bg-primary/50" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                      {t("home.industries.overview", "Overview")}
                    </h2>
                  </div>
                  <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    {descriptionParagraphs.map((para, i) => (
                      <p key={i} className="mb-6">{para}</p>
                    ))}
                  </div>
                </FadeIn>
              )}

              {/* What's included highlights */}
              <FadeIn delay={0.1}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-primary/50" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    {t("packages.whats_included", "What's Included")}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    t("packages.features.consultation", "Expert Consultation"),
                    t("packages.features.custom_solution", "Custom Solution Design"),
                    t("packages.features.dedicated_support", "Dedicated Support Team"),
                    t("packages.features.delivery", "On-Time Delivery"),
                    t("packages.features.quality", "Quality Assurance"),
                    t("packages.features.followup", "Post-Launch Follow-Up"),
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-foreground/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>

              {/* Why choose this package */}
              <FadeIn delay={0.15}>
                <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-8 md:p-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-foreground">
                        {t("packages.why_choose", "Why Choose This Package?")}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg font-light">
                      {t("packages.why_choose_desc", "This package is carefully crafted to meet your business needs with a clear scope, transparent process, and measurable results. Our team brings expertise and commitment to every project — ensuring you receive maximum value from your investment.")}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ── RIGHT: Sticky Sidebar ── */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="sticky top-32 space-y-6"
              >
                {/* CTA Card */}
                <Card className="relative bg-background border-border/60 backdrop-blur-xl overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
                  <CardContent className="p-8 relative z-10 space-y-6">
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                        {t("packages.cta_sidebar.title", "Interested in this Package?")}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("packages.cta_sidebar.desc", "Contact us to start your journey and supercharge your business.")}
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className={`w-full group inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      {t("packages.cta.button", "Get in Touch")}
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isRtl ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                    </Link>

                    <Link
                      href="/packages"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm text-muted-foreground hover:text-foreground border border-border/50 hover:border-border rounded-xl transition-all duration-300"
                    >
                      {t("packages.view_all", "View All Packages")}
                    </Link>
                  </CardContent>
                </Card>

                {/* Package Details Card */}
                <Card className="bg-muted/20 border-border/40">
                  <CardContent className="p-6 space-y-5">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("home.industries.details", "Details")}
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Hash className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("packages.order", "Package Number")}</p>
                          <p className="text-sm font-semibold text-foreground">{String(pkg.order).padStart(2, "0")}</p>
                        </div>
                      </div>

                      <div className="w-full h-px bg-border/50" />

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("services.status_label", "Status")}</p>
                          <p className="text-sm font-semibold text-foreground capitalize">
                            {pkg.published ? t("services.status_active", "Active") : t("services.status_inactive", "Inactive")}
                          </p>
                        </div>
                      </div>

                      {formattedDate && (
                        <>
                          <div className="w-full h-px bg-border/50" />
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("packages.added", "Added")}</p>
                              <p className="text-sm font-semibold text-foreground">{formattedDate}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── OTHER PACKAGES ──────────────────────────────── */}
      {otherPackages.length > 0 && (
        <Section background="muted" className="py-24 border-t border-border">
          <div className="container mx-auto">
            <FadeIn className="mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {t("packages.other_packages", "Other Packages")}
              </h2>
              <p className="text-muted-foreground mt-2">{t("packages.other_packages_desc", "Explore more tailored solutions we offer.")}</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPackages.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <Link href={`/packages/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="group h-full flex flex-col bg-background border border-border/60 rounded-3xl p-7 hover:border-primary/40 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm mb-5 self-start">
                        {String(p.order).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">{p.description}</p>
                      )}
                      <span className={`mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:underline ${isRtl ? "flex-row-reverse" : ""}`}>
                        {t("home.packages.learn_more", "Learn more")}
                        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isRtl ? "rotate-180" : ""}`} />
                      </span>
                    </motion.div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <Section background="default" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto p-10 md:p-14 rounded-[2.5rem] bg-muted/20 border border-border relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
                  {t("services.cta.title", "Looking for tailored solutions?")}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light">
                  {t("services.cta.description", "Check out our pre-built packages or contact us for a custom approach.")}
                </p>
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-9 py-4 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-xl transition-all"
                  >
                    {t("services.cta.contact", "Contact Us")}
                  </Link>
                  <Link
                    href="/packages"
                    className="w-full sm:w-auto px-9 py-4 bg-transparent border border-border text-foreground font-black uppercase tracking-widest rounded-full hover:bg-muted/50 transition-all"
                  >
                    {t("navbar.packages", "All Packages")}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}
