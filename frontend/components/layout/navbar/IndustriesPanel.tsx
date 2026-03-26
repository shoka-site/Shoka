"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useIndustries } from "@/hooks/use-content";

export default function IndustriesPanel({ isRtl }: { isRtl: boolean }) {
  const { data: industries = [] } = useIndustries();

  return (
    <ul className="grid grid-cols-2 gap-6">
      {industries.map((industry, idx) => (
        <motion.div
          key={industry.id}
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05, type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link href={`/industries/${industry.id}`} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{industry.title}</div>
              <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{industry.description}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </ul>
  );
}
