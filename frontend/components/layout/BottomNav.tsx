"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Home, Info, LayoutGrid, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SITE_LINKS, isActivePath } from "@/lib/site-navigation";

interface BottomNavProps {
  lang: "en" | "ar";
}

export default function BottomNav({ lang }: BottomNavProps) {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);

  const navItems = [
    { link: SITE_LINKS.home, icon: Home },
    { link: SITE_LINKS.services, icon: Briefcase },
    { link: SITE_LINKS.projects, icon: LayoutGrid },
    { link: SITE_LINKS.about, icon: Info },
    { link: SITE_LINKS.contact, icon: Phone },
  ];

  return (
    <nav
      aria-label={t("navbar.primary_nav")}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur-xl xl:hidden"
    >
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.link.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.link.href}
              href={item.link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring transition-ui relative flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-md",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-5 top-0 h-0.5 rounded-pill bg-primary"
                />
              )}
              <Icon
                aria-hidden="true"
                className={cn(
                  "size-5 transition-transform",
                  active && "scale-110"
                )}
              />
              <span className="max-w-full truncate px-1 text-[0.6875rem] font-semibold leading-none">
                {t(item.link.titleKey, item.link.defaultTitle)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
