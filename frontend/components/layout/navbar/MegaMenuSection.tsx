"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function MegaMenuSection({ title, description, icon: Icon, href, children }: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  children: React.ReactNode;
  layout?: "columns" | "grid" | "list";
}) {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`w-screen bg-black/90 backdrop-blur-2xl border-y border-primary/10 shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(194,164,92,0.05)] overflow-hidden ${isRtl ? 'rtl' : 'ltr'}`}
    >
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className={`container mx-auto px-6 md:px-12 flex items-stretch relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Sidebar / Featured */}
        <div className={`w-1/3 bg-gradient-to-b from-white/[0.03] to-transparent p-12 flex flex-col relative overflow-hidden ${isRtl ? 'border-l' : 'border-r'} border-white/5`}>
          {/* Noise texture for sidebar */}
          <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />

          {/* Static gold orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
              className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(194,164,92,0.2)] border border-primary/20`}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
              className={`text-4xl font-display font-black text-white mb-4 tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              className={`text-lg text-white/50 leading-relaxed font-light mb-12 flex-grow ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link href={href} className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full text-white text-xs font-black uppercase tracking-[0.2em] hover:from-primary hover:to-primary/80 hover:text-black hover:border-primary/50 hover:scale-105 active:scale-95 transition-all group w-fit shadow-[0_10px_30px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse' : ''}`}>
                {t("common.explore_all")} <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'mr-3 rotate-180 group-hover:-translate-x-1' : 'ml-3 group-hover:translate-x-1'}`} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-2/3 p-12 bg-gradient-to-br from-transparent via-white/[0.01] to-white/[0.02] relative">
          {/* Static radial gold spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
