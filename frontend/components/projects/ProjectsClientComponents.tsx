"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ProjectsHero({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
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
                {t('portfolio.projects.subtitle')}
              </Badge>
            </motion.div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight text-white">
            {t('portfolio.projects.title')}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            {t('portfolio.projects.description')}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('portfolio.projects.timeline')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-accent/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProjectCard({ project, index, isRtl }: { project: any; index: number; isRtl: boolean }) {
  const { t } = useTranslation();
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
        className="group relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden bg-background border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-700"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/10">
          {project.images && project.images.some((img: any) => typeof img === 'string' && img.trim() !== "") && (
            <NextImage
              src={project.images.find((img: any) => typeof img === 'string' && img.trim() !== "") || ""}
              alt={project.title || ""}
              fill
              className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1 grayscale group-hover:grayscale-0"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
        </div>

        <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-end">
          <motion.div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-accent/60"></span>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">{project.category}</span>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-foreground mb-4 tracking-tight leading-[1.1] transition-transform duration-500 group-hover:-translate-y-2">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 lg:line-clamp-2 font-light leading-relaxed opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {project.description}
          </p>

          <div className="flex items-center gap-4 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <Button
              variant="default"
              size="lg"
              className="rounded-full bg-foreground text-background font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              {t('portfolio.view_case_study')}
              <ArrowRight className={`w-4 h-4 ${isRtl ? "mr-2 rotate-180" : "ml-2"}`} />
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Re-export FadeInSection for convenience
export { FadeInSection } from "@/components/home/HomeClientComponents";
