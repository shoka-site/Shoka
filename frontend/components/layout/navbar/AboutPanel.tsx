"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE_LINKS } from "@/lib/site-navigation";

const aboutCategories = [
  {
    title: "navbar.menu.about.company_title",
    icon: Building2,
    items: [
      { name: "navbar.menu.about.story", ...SITE_LINKS.about },
      { name: "navbar.menu.about.compare", ...SITE_LINKS.compare },
    ],
  },
  {
    title: "navbar.menu.about.connect_title",
    icon: Users,
    items: [
      { name: "navbar.menu.about.contact", ...SITE_LINKS.contact },
      { name: "navbar.menu.about.news", ...SITE_LINKS.news },
      { name: "navbar.blog", ...SITE_LINKS.blog },
    ],
  },
];

export default function AboutPanel({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-x-12">
      {aboutCategories.map((cat, idx) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, x: isRtl ? 12 : -12, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          className="space-y-4"
        >
          <div className="type-label flex items-center gap-3 text-foreground">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <cat.icon aria-hidden="true" className="size-4" />
            </div>
            <span>{t(cat.title)}</span>
          </div>
          <ul className="space-y-1">
            {cat.items.map((item) => (
              <li key={`${cat.title}-${item.href}`}>
                <Link
                  href={item.href}
                  className="focus-ring transition-ui block min-h-9 border-s border-border/60 py-1.5 ps-4 text-start text-sm text-muted-foreground hover:border-primary/40 hover:text-primary"
                >
                  {t(item.name, item.defaultTitle)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
