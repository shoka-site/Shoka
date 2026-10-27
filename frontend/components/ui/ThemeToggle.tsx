"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-11 w-11 rounded-full border border-transparent bg-muted/40 animate-pulse ${className}`}
      />
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`focus-ring transition-ui relative flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/50 shadow-sm hover:border-primary/50 hover:bg-muted active:scale-90 ${className}`}
      aria-label={isDark ? t("theme.switch_light") : t("theme.switch_dark")}
      title={isDark ? t("theme.switch_light") : t("theme.switch_dark")}
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
            <Sun className="size-4 text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="size-4 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
