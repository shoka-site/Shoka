"use client";

import Section from "@/components/layout/Section";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Cloud, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useServices } from "@/hooks/use-content";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { serviceCategories } from "@/lib/data/services";

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: services = [], isLoading } = useServices();
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
          <span className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em]">{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  // Group services dynamically
  const groupedServices = services.reduce((acc, service) => {
    const category = service.type || "Other Services";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
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
          {/* Subtle grid pattern for texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

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
                  {t('navbar.services')}
                </Badge>
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight text-white">
              {t('services.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
              {t('services.description')}
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
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-accent/50" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        {/* Horizontal separator */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {Object.entries(groupedServices).map(([categoryName, categoryServices], catIndex) => {
          const matchedStaticCategory = serviceCategories.find(c =>
            c.title === categoryName ||
            t(c.title).toLowerCase() === categoryName.toLowerCase() ||
            categoryName.toLowerCase().includes(t(c.title).toLowerCase())
          );

          const CategoryIcon = matchedStaticCategory ? matchedStaticCategory.icon : Cloud;

          return (
            <Section
              key={categoryName}
              background={catIndex % 2 === 1 ? "muted" : "default"}
              className={`py-24 relative overflow-hidden`}
            >
              {/* Decorative accent for each section */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_bottom_right,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />

              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 mb-16"
                >
                  <div className={`p-4 rounded-2xl bg-background border border-border shadow-xl text-primary flex items-center justify-center`}>
                    <CategoryIcon className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-display font-bold text-foreground tracking-tight">
                      {categoryName.includes('.') ? t(categoryName) : categoryName}
                    </h2>
                    <div className="w-16 h-1 bg-primary mt-4 rounded-full" />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link href={`/services/${service.id}`} className="block h-full group">
                        <Card className="h-full border-border/40 group-hover:border-primary/30 transition-all duration-700 flex flex-col overflow-hidden bg-background/50 backdrop-blur-xl relative rounded-[2.5rem] shadow-sm hover:shadow-2xl">
                          {/* Glow Overlay on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                          <CardHeader className="relative z-10 pb-4 pt-10 px-8">
                            <CardTitle className="text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors flex items-start justify-between leading-tight tracking-tight">
                              {service.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex-grow flex flex-col relative z-10 px-8 pb-10">
                            <CardDescription className="text-lg text-muted-foreground mb-8 line-clamp-3 flex-grow font-light leading-relaxed">
                              {service.description}
                            </CardDescription>

                            <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/50 group-hover:border-primary/20 transition-colors">
                              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70 group-hover:text-primary transition-all">
                                {t('services.learn_more')}
                              </span>
                              <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary ${isRtl ? 'rotate-180' : ''}`}>
                                <ArrowRight className="w-5 h-5" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      {/* CTA Section */}
      <Section background="default" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-12 rounded-[3.5rem] bg-muted/20 border border-border relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
              Ready to innovate?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 font-light">
              Let's discuss how we can help you build your digital future.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20">
              Get in Touch
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}