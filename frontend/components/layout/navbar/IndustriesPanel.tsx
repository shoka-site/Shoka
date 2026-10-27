"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { useIndustries } from "@/hooks/use-content";

export default function IndustriesPanel({ isRtl }: { isRtl: boolean }) {
  const { data: industries = [] } = useIndustries();

  return (
    <ul className="grid grid-cols-2 gap-6">
      {industries.map((industry, idx) => (
        <motion.li
          key={industry.id}
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05, type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link href={`/industries/${slugify(industry.titleEn)}/`} className="focus-ring transition-ui group flex items-start gap-5 rounded-lg border border-transparent p-5 text-start hover:border-border hover:bg-muted">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
              <Building2 aria-hidden="true" className="size-6" />
            </div>
            <div>
              <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{industry.title}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{industry.description}</div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
