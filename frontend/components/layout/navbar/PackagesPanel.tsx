"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePackages } from "@/hooks/use-content";

export default function PackagesPanel({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const { data: packages = [] } = usePackages();

  return (
    <>
      <ul className="grid grid-cols-2 gap-4">
        {packages.slice(0, 4).map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href={`/packages/${pkg.id}`} className={`group flex items-start gap-4 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{pkg.title}</div>
                {pkg.description && (
                  <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{pkg.description}</div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </ul>
      {packages.length > 4 && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <Link href="/packages" className={`inline-flex items-center text-sm text-white/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse' : ''}`}>
            {t("navbar.menu.packages.view_all", { count: packages.length })}
            <ArrowRight className={`w-4 h-4 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Link>
        </div>
      )}
    </>
  );
}
