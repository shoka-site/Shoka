"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";

const aboutCategories = [
  {
    title: "navbar.menu.about.company_title",
    icon: Building2,
    items: [
      { name: "navbar.menu.about.story", href: "/about" },
      { name: "navbar.menu.about.team", href: "/about" },
      { name: "navbar.menu.about.careers", href: "/about" },
    ]
  },
  {
    title: "navbar.menu.about.connect_title",
    icon: Users,
    items: [
      { name: "navbar.menu.about.contact", href: "/contact" },
      { name: "navbar.menu.about.news", href: "/news" },
    ]
  }
];

export default function AboutPanel({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-x-12">
      {aboutCategories.map((cat, idx) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
          className="space-y-4"
        >
          <div className={`flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <cat.icon className="w-4 h-4" />
            </div>
            <span>{t(cat.title)}</span>
          </div>
          <ul className="space-y-1">
            {cat.items.map(item => (
              <li key={item.name}>
                <Link href={item.href} className={`block text-sm text-white/50 hover:text-primary transition-all py-1.5 ${isRtl ? 'pr-6 border-r text-right' : 'pl-6 border-l text-left'} border-white/5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`}>
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
