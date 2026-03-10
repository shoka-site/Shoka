"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative selection:bg-primary/30">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10 mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-24 mx-auto mb-8 bg-black/50 border border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(194,164,92,0.15)] relative backdrop-blur-3xl"
          >
             {/* Spinning inner dashed ring */}
             <motion.div 
               className="absolute inset-2 border border-dashed border-primary/50 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             />
             <AlertTriangle className="w-10 h-10 text-primary relative z-10" />
          </motion.div>

          {/* 404 Glitch-like effect */}
          <div className="relative inline-block mb-6">
            <h1 className="text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter">
              404
            </h1>
          </div>

          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">
             {t('not_found.title', 'Page Not Found')}
          </h2>

          <p className="text-white/50 text-base md:text-xl max-w-md mx-auto mb-12 font-light leading-relaxed">
             {t('not_found.desc', 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.')}
          </p>

          <Link href="/">
             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-white hover:text-black font-black tracking-widest uppercase transition-all shadow-xl flex gap-3 items-center rounded-full h-14 px-10 mx-auto"
              >
                <ArrowLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} /> 
                {isRtl ? "العودة للرئيسية" : "Return to Surface"}
              </Button>
             </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/10 opacity-50" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/10 opacity-50" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/10 opacity-50" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/10 opacity-50" />
    </div>
  );
}
