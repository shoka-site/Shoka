"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePackages } from "@/hooks/use-content";
import { slugify } from "@/lib/utils";

export default function PackagesPanel({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const { data: packages = [] } = usePackages();

  return (
    <>
      <ul className="grid grid-cols-2 gap-4">
        {packages.slice(0, 4).map((pkg, idx) => (
          <motion.li
            key={pkg.id}
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href={`/packages/${slugify(pkg.titleEn)}/`} className="focus-ring transition-ui group flex items-start gap-4 rounded-lg border border-transparent p-5 text-start hover:border-border hover:bg-muted">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Package aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{pkg.title}</div>
                {pkg.description && (
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{pkg.description}</div>
                )}
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
      {packages.length > 4 && (
        <div className="mt-6 pt-6 border-t border-border">
          <Link href="/packages/" className="focus-ring transition-ui inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-primary">
            {t("navbar.menu.packages.view_all", { count: packages.length })}
            <ArrowRight aria-hidden="true" className="ms-2 size-4 rtl:rotate-180" />
          </Link>
        </div>
      )}
    </>
  );
}
