"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, LayoutGrid, Layers, Info, Phone, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { name: t("navbar.home", "Home"), href: "/home", icon: Home },
    { name: t("navbar.services", "Services"), href: "/services", icon: Briefcase },
    { name: t("navbar.projects", "Projects"), href: "/projects", icon: LayoutGrid },
    { name: t("navbar.about", "About"), href: "/about", icon: Info },
    { name: t("navbar.contact", "Contact"), href: "/contact", icon: Phone },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/home" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative",
                isActive ? "text-primary" : "text-white/40 hover:text-white/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavAccent"
                  className="absolute -top-[1px] left-1/4 right-1/4 h-[2px] bg-primary shadow-[0_0_10px_rgba(194,164,92,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
              <span className="text-[9px] font-bold uppercase tracking-wider truncate px-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
