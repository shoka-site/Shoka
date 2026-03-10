"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RotateCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative selection:bg-red-500/30">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10 mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle error accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative">
             <motion.div 
               animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
               transition={{ duration: 0.5, delay: 0.5 }}
             >
                <AlertCircle className="w-10 h-10 text-red-500" />
             </motion.div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
            Something went wrong.
          </h1>
          
          <p className="text-white/50 text-base md:text-lg mb-10 font-light leading-relaxed">
            We apologize. The page encountered an unexpected error and failed to load.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => reset()}
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 hover:scale-105 font-bold tracking-widest uppercase transition-all shadow-xl flex gap-2 items-center rounded-full h-14 px-8"
            >
              <RotateCw className="w-4 h-4" /> Try Again
            </Button>
            
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/5 hover:text-white font-bold tracking-widest uppercase transition-all flex gap-2 items-center rounded-full h-14 px-8"
              >
                <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} /> Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 text-[10px] text-white/20 uppercase tracking-[0.4em] font-black z-10">
        Powered by Iraqi Platform
      </div>
    </div>
  );
}
