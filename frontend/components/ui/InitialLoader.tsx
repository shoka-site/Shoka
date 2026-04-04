"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll via CSS class on <html> — avoids scrollbar-shift CLS caused by body overflow/position hacks.
    document.documentElement.classList.add("overflow-locked");

    const unlock = () => document.documentElement.classList.remove("overflow-locked");

    const handleLoad = () => {
      // Small artificial delay for aesthetics to let animations play out slightly
      setTimeout(() => {
        setIsLoading(false);
        unlock();
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        unlock();
      };
    }

    // Fallback: If "load" never fires or takes too long, hide it anyway after 5 seconds to prevent being stuck forever.
    const timeout = setTimeout(() => {
      setIsLoading(false);
      unlock();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative flex flex-col items-center z-10">
            {/* Logo */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-48 h-16 md:w-64 md:h-20">
                <Image
                  src="/logoo.png"
                  alt="Sehle"
                  fill
                  sizes="(min-width: 768px) 256px, 192px"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Animated Rings */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-t border-l border-primary/60"
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-6 rounded-full border border-primary"
                animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>

            {/* Loading Text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-white/80 text-[11px] font-black uppercase tracking-[0.4em]">
                Loading
              </span>
              <motion.div
                className="flex gap-1 justify-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-12 text-[10px] text-white/20 uppercase tracking-[0.4em] font-black z-10">
            Powered by Iraqi Platform
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
