"use client";

import { use } from "react";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useService } from "@/hooks/use-content";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export default function ServiceDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: service, isLoading, error } = useService(unwrappedParams.id);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);



  if (error || !service) {
    return notFound();
  }

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Immersive Hero Section */}
      <div className="relative h-[70vh] min-h-[550px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
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
              <Link href="/services" className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? 'rotate-180' : ''}`}>
                  <ArrowLeft className="w-4 h-4" />
                </div>
                {isRtl ? "العودة إلى الخدمات" : "Back to Services"}
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
                  <LayoutGrid className="w-3.5 h-3.5" />
                  {service.type || t('navbar.services', 'Services')}
                </Badge>
              </motion.div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
              {service.title || (service as any).titleEn}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-8"></div>
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

        <Section className="py-24 relative overflow-hidden bg-background">
          <div className="container mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:text-foreground prose-headings:font-display">
                <p className="whitespace-pre-wrap">{service.description || (service as any).descriptionEn}</p>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      <Section background="muted" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-background/50 border border-border relative overflow-hidden shadow-sm"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
              {t('services.cta.title', 'Looking for tailored solutions?')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light">
              {isRtl 
                ? 'جاهزون لمناقشة كيفية مساعدة هذه الخدمة في نمو أعمالك وتحقيق أهدافك.'
                : 'Ready to discuss how this service can help grow your business and achieve your goals?'}
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
