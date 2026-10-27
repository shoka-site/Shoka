"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MegaMenuSection({
  title,
  description,
  icon: Icon,
  href,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  children: React.ReactNode;
  layout?: "columns" | "grid" | "list";
}) {
  const { i18n, t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const isRtl = i18n.dir() === "rtl";
  const transition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 400, damping: 30 };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="relative w-screen overflow-hidden border-y border-border bg-background/95 text-foreground shadow-xl backdrop-blur-2xl"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="container-page relative z-10 flex items-stretch">
        <div className="relative flex w-1/3 flex-col overflow-hidden border-e border-border/60 bg-muted/40 p-10">
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04]" />
          <div className="pointer-events-none absolute -start-32 -top-32 size-80 rounded-full bg-primary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-12 -end-12 size-48 rounded-full bg-primary/10 blur-[80px]" />

          <div className="relative z-10 flex h-full flex-col">
            <motion.div
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.1 }}
              className="mb-6 flex size-14 items-center justify-center rounded-panel border border-primary/20 bg-primary/10 text-primary shadow-sm"
            >
              <Icon aria-hidden="true" className="size-7" />
            </motion.div>

            <motion.h3
              initial={reducedMotion ? false : { opacity: 0, x: isRtl ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.15 }}
              className="type-section-title mb-3 text-start"
            >
              {title}
            </motion.h3>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.2 }}
              className="type-support mb-8 flex-grow text-start text-muted-foreground"
            >
              {description}
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.25 }}
            >
              <Button asChild variant="outline" size="lg" className="rounded-pill">
                <Link href={href}>
                  <span className="type-label">{t("common.explore_all")}</span>
                  <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="relative w-2/3 bg-gradient-to-br from-transparent via-muted/20 to-transparent p-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[120px]" />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
