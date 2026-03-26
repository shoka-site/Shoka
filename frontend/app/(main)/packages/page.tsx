"use client";

import Section from "@/components/layout/Section";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PackageOpen, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePackages } from "@/hooks/use-content";
import { useDataReady } from "@/hooks/useDataReady";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InitialLoader } from "@/components/ui/InitialLoader";

export default function Packages() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: packages = [], isLoading } = usePackages();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Wait for data to be ready before showing the page
  const isReady = useDataReady(isLoading);

  // Show full-screen loading while data is being fetched
  if (!isReady) {
    return <InitialLoader />;
  }

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Immersive Hero Section - EXCLUSIVE BLACK ZONE */}
      <div className="relative h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.12)_0%,transparent_50%)] mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        <div className="absolute top-32 left-0 w-full z-20 pointer-events-none">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-auto"
            >
              <Link href="/home" className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? 'rotate-180' : ''}`}>
                  <ArrowLeft className="w-4 h-4" />
                </div>
                {t("common.back_to_home")}
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
                <Badge variant="outline" className="text-accent border-accent/40 bg-accent/10 px-5 py-2 text-xs backdrop-blur-md flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('navbar.packages', 'Packages')}
                </Badge>
              </motion.div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
              {t('packages.title', 'Our Packages')}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
              {t('packages.description', 'Comprehensive solutions tailored to meet your business needs.')}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('common.explore')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-accent/50" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <Section className="py-24 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="space-y-24">
              {packages.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  {t('packages.empty', 'No packages found.')}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg, index) => {
                    const isPopular = index === 1 && packages.length >= 3;
                    return (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8, transition: { duration: 0.25 } }}
                        className={`group relative flex flex-col bg-background/50 border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 backdrop-blur-xl ${isPopular ? "border-primary/50 shadow-[0_0_40px_rgba(194,164,92,0.1)]" : "border-border/60 hover:border-accent/40"}`}
                      >
                        {/* Most Popular badge */}
                        {isPopular && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_5px_15px_rgba(194,164,92,0.3)]">
                              <Sparkles className="w-3 h-3" />
                              {t("packages.most_popular", "Most Popular")}
                            </span>
                          </div>
                        )}

                        {/* Top accent line */}
                        <div
                          className={`h-1 w-full transition-opacity duration-500 ${isPopular ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                          style={{ background: "linear-gradient(90deg, transparent, #C2A45C, transparent)" }}
                        />

                        <div className="flex flex-col flex-1 p-8 md:p-10">
                          {/* Order badge */}
                          <div className="flex items-center justify-between mb-8">
                            <span className="inline-flex items-center justify-center w-12 h-12 rounded-[1.25rem] bg-primary/10 text-primary font-bold text-lg">
                              {String(pkg.order).padStart(2, "0")}
                            </span>
                            <PackageOpen className="w-8 h-8 text-white/10 group-hover:text-primary/40 transition-colors duration-500" />
                          </div>

                          <h3 className="text-2xl font-display font-black mb-4 group-hover:text-accent transition-colors duration-300">
                            {pkg.title}
                          </h3>

                          {pkg.description ? (
                            <p className="text-muted-foreground leading-relaxed text-base flex-1">
                              {pkg.description}
                            </p>
                          ) : (
                            <p className="text-muted-foreground/40 leading-relaxed text-base italic flex-1">
                              {t('home.packages.no_description', "A tailored bundle of services designed to help you succeed.")}
                            </p>
                          )}

                          <Link href={`/packages/${pkg.id}`} className="mt-8 inline-flex items-center text-primary text-sm font-semibold hover:underline border-t border-border/50 pt-6">
                            {t('common.view_details', 'View Details')}
                            <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform duration-300`} />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>

      {/* FAQ Section */}
      <Section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-black mb-4">
                {t("packages.faq.title", "Frequently Asked Questions")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t("packages.faq.subtitle", "Everything you need to know about our packages.")}
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { q: t("packages.faq.q1", "What's included in each package?"), a: t("packages.faq.a1", "Each package includes a tailored bundle of services such as web development, mobile apps, UI/UX design, and ongoing support. The exact inclusions vary by package tier.") },
                { q: t("packages.faq.q2", "Can I customize a package?"), a: t("packages.faq.a2", "Yes. All packages can be customized to fit your specific business requirements. Contact us to discuss your needs and we'll tailor the perfect solution.") },
                { q: t("packages.faq.q3", "What's the typical project timeline?"), a: t("packages.faq.a3", "Timelines vary by package complexity. Simple packages can be delivered in 4-6 weeks, while enterprise solutions may take 8-12 weeks. We provide a detailed timeline during consultation.") },
                { q: t("packages.faq.q4", "How do I get started?"), a: t("packages.faq.a4", "Book a free consultation through our contact page. We'll discuss your requirements, recommend the best package, and provide a detailed proposal within 48 hours.") },
              ].map((faq, idx) => (
                <motion.details
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group border border-border/60 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-xl"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-base font-bold hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-white/30 group-open:rotate-180 transition-transform duration-300 shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="default" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-muted/20 border border-border relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
              {t('packages.cta.title', 'Ready to Get Started?')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light">
              {t('packages.cta.description', 'Contact us to learn more about our packages and how we can help your business.')}
            </p>
            <Link href="/contact" className={`inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {t('packages.cta.button', 'Get in Touch')}
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}