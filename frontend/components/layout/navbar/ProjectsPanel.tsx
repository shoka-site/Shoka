"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { History, Zap, Rocket, LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/use-content";

const projectCategories = [
  { title_key: "portfolio.projects.categories.made", href: "/projects", desc_key: "portfolio.projects.status.made", icon: History },
  { title_key: "portfolio.projects.categories.making", href: "/projects", desc_key: "portfolio.projects.status.making", icon: Zap },
  { title_key: "portfolio.projects.categories.will_make", href: "/projects", desc_key: "portfolio.projects.status.will_make", icon: Rocket }
];

export default function ProjectsPanel({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const { data: projects = [] } = useProjects(true);

  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-3 gap-6">
        {projectCategories.map((item, idx) => (
          <motion.div
            key={item.title_key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href={item.href} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{t(item.title_key)}</div>
                <div className="text-xs text-white/50 mt-1 leading-relaxed">{t(item.desc_key)}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </ul>

      {projects.length > 0 && (
        <ul className="grid grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx + 3) * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link href={`/projects/${project.id}`} className={`group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 overflow-hidden relative group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                  {project.images?.[0] ? (
                    <Image src={project.images[0]} alt={project.title} fill sizes="48px" className="object-cover" />
                  ) : (
                    <LayoutGrid className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight line-clamp-1">{project.title}</div>
                  <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{project.description}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </ul>
      )}
    </div>
  );
}
