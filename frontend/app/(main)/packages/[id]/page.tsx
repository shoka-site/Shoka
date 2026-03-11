"use client";

import Section from "@/components/layout/Section";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PackageOpen, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePackage } from "@/hooks/use-content";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function PackageDetails() {
  const { id } = useParams() as { id: string };
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const { data: pkg, isLoading } = usePackage(id);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em]">
            {t("common.loading", "Loading...")}
          </span>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('portfolio.projects.not_found', 'Not Found')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('portfolio.projects.not_found_desc', 'The item you are looking for does not exist or has been removed.')}
          </p>
          <Link href="/packages" className="inline-flex items-center text-primary font-bold">
            <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180 ml-2" : "mr-2"}`} />
            {t('packages.back', 'Back to Packages')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Immersive Hero Section - EXCLUSIVE BLACK ZONE */}
      <div className="relative h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.12)_0%,transparent_50%)] mix-blend-screen" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>

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
                <div
                  className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${
                    isRtl ? "rotate-180" : ""
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </div>
                {t('packages.back', 'Back to Packages')}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge
                  variant="outline"
                  className="text-accent border-accent/40 bg-accent/10 px-5 py-2 text-xs backdrop-blur-md flex items-center justify-center gap-2 font-bold uppercase tracking-widest"
                >
                  <PackageOpen className="w-3.5 h-3.5" />
                  {t("navbar.packages", "Packages")}
                </Badge>
              </motion.div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
              {pkg.title}
            </h1>

            {pkg.description && (
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
                {pkg.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <Section className="py-24 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 relative z-10">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-16">

              </div>

              {/* Right Column: Floating Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="sticky top-32"
                >
                  <Card className="bg-muted/30 border-border/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    <CardContent className="p-8 space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{t("packages.cta_sidebar.title", "Interested in this Package?")}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t("packages.cta_sidebar.desc", "Contact us to start your journey and supercharge your business.")}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <Link
                          href="/contact"
                          className={`w-full group inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all ${
                            isRtl ? "flex-row-reverse" : ""
                          }`}
                        >
                          {t("packages.cta.button", "Get in Touch")}
                          <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
