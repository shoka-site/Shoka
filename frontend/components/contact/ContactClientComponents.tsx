"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ContactHero({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], ["0%", "40%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="relative h-[60vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24 border-b border-border/10">
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
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {t('contact.subtitle', 'Get in Touch')}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
            {t('contact.title', 'Let\'s create something extraordinary together.')}
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-8"></div>
        </motion.div>
      </div>
    </div>
  );
}

export function InfoCard({ children, delay = 0, x = 0 }: { children: React.ReactNode; delay?: number; x?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col gap-6"
    >
      {children}
    </motion.div>
  );
}
