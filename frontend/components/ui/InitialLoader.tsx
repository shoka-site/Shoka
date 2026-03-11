"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide scrolling while loading
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      // Small artificial delay for aesthetics to let animations play out slightly
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        document.body.style.overflow = "";
      };
    }
    
    // Fallback: If "load" never fires or takes too long, hide it anyway after 5 seconds to prevent being stuck forever.
    const timeout = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
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
          
          <div className="relative flex flex-col items-center z-10">
            {/* Animated Rings */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-6 rounded-full border-t-2 border-l-2 border-primary/60"
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-14 rounded-full border-2 border-primary"
                animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="flex items-center justify-center w-full h-full drop-shadow-[0_0_20px_rgba(194,164,92,0.8)]">
                <Image src="/logo.png" alt="Loading Logo" width={140} height={140} className="object-contain scale-[1.75]" priority />
              </div>
            </div>

            {/* Loading Text */}
            <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-white/80 text-[11px] font-black uppercase tracking-[0.4em]">
                Initializing System
              </span>
              <motion.div 
                className="flex gap-1 justify-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce relative" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
