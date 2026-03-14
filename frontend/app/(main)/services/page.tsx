"use client";

import Section from "@/components/layout/Section";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useServices } from "@/hooks/use-content";
import { useDataReady } from "@/hooks/useDataReady";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InitialLoader } from "@/components/ui/InitialLoader";

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: services = [], isLoading } = useServices();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Wait for data to be ready before showing the page
  const isReady = useDataReady(isLoading);

  // Show full-screen loading while data is being fetched
  if (!isReady) {
    return <InitialLoader />;
  }

  // Group services by their `type` or explicitly put them in an "Other" category if none exist
  const groupedServices = services.reduce((acc, s) => {
    const type = s.type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(s);
    return acc;
  }, {} as Record<string, typeof services>);

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
                  {t('navbar.services', 'Services')}
                </Badge>
              </motion.div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
              {t('services.title', 'Our Services')}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
              {t('services.description', 'Explore our comprehensive expertise designed specifically to elevate your business.')}
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
              {Object.keys(groupedServices).length === 0 ? (
                <div className="text-center text-muted-foreground">
                  {t('services.empty', 'No services found.')}
                </div>
              ) : (
                Object.entries(groupedServices).map(([type, svcs], index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <LayoutGrid className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                          {type}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {svcs.map((service, sIdx) => (
                        <Link href={`/services/${service.id}`} key={service.id}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: sIdx * 0.05, duration: 0.3 }}
                          >
                            <Card className="h-full border-border/40 hover:border-primary/30 transition-all duration-300 flex flex-col overflow-hidden bg-background/50 backdrop-blur-xl relative shadow-sm hover:shadow-md group cursor-pointer">
                              <CardHeader className="relative z-10 pb-2 pt-6 px-6">
                                <CardTitle className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                  {service.title || (service as any).titleEn}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="flex-grow relative z-10 px-6 pb-6 mt-2 flex flex-col">
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                                  {service.description || (service as any).descriptionEn}
                                </p>
                                <div className="mt-auto inline-flex items-center text-primary text-sm font-semibold group-hover:underline">
                                  {t('home.packages.learn_more', "Learn more")}
                                  <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-1 rotate-180" : "ml-1"} group-hover:translate-x-1 transition-transform duration-300`} />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </Section>
      </div>

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
              {t('services.cta.title', 'Looking for tailored solutions?')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light">
              {t('services.cta.description', 'Check out our pre-built packages or contact us for a custom approach.')}
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/packages" className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20">
                {t('navbar.packages', 'Packages')}
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border text-foreground font-black uppercase tracking-widest rounded-full hover:bg-muted/50 transition-all">
                {t('services.cta.contact', 'Contact Us')}
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
