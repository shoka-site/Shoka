"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { motion } from "framer-motion";
import { History, Zap, Rocket, LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";
import { slugify } from "@/lib/utils";
import { useProjects } from "@/hooks/use-content";

const projectCategories = [
  { title_key: "portfolio.projects.categories.made", href: "/projects/", desc_key: "portfolio.projects.status.made", icon: History },
  { title_key: "portfolio.projects.categories.making", href: "/projects/", desc_key: "portfolio.projects.status.making", icon: Zap },
  { title_key: "portfolio.projects.categories.will_make", href: "/projects/", desc_key: "portfolio.projects.status.will_make", icon: Rocket }
];

export default function ProjectsPanel({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const { data: projects = [] } = useProjects(true);

  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-3 gap-6">
        {projectCategories.map((item, idx) => (
          <motion.li
            key={item.title_key}
            initial={{ opacity: 0, x: isRtl ? 12 : -12, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href={item.href} className="focus-ring transition-ui group flex items-start gap-5 rounded-lg border border-transparent p-5 text-start hover:border-border hover:bg-muted">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <item.icon aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{t(item.title_key)}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{t(item.desc_key)}</div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {projects.length > 0 && (
        <ul className="grid grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, idx) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, x: isRtl ? 12 : -12, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx + 3) * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link href={`/projects/${slugify(project.titleEn)}/`} className="focus-ring transition-ui group flex items-start gap-4 rounded-lg border border-transparent p-4 text-start hover:border-border hover:bg-muted">
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  {project.images?.[0] ? (
                    <SafeImage src={project.images[0]} alt={project.title} fill sizes="48px" className="object-cover" fallbackType="project" />
                  ) : (
                    <LayoutGrid aria-hidden="true" className="size-6" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight line-clamp-1">{project.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{project.description}</div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
