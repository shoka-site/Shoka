"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 xl:w-10 xl:h-10 rounded-full border border-transparent bg-muted/40 animate-pulse ${className}`}
      />
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center rounded-full transition-all border border-border/40 hover:border-primary/50 bg-background/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-90 shadow-sm ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 xl:w-5 xl:h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 xl:w-5 xl:h-5 text-amber-700 dark:text-primary drop-shadow-[0_0_8px_rgba(181,140,43,0.3)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
