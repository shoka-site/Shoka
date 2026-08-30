"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MegaMenuSection from "./navbar/MegaMenuSection";
import { NAV_CATEGORIES } from "./navbar/nav-data";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  // Server-detected locale, passed from the server layout so both SSR and
  // client hydration use the same language. Without this, i18next-browser-
  // languagedetector fails to read cookies in Node.js and falls back to Arabic,
  // while the client correctly detects English — causing a hydration mismatch.
  lang: "en" | "ar";
}

export default function Navbar({ lang }: NavbarProps) {
  const { i18n } = useTranslation();
  // getFixedT returns a `t` function bound to the server-provided language.
  // This guarantees SSR and hydration both render the same text regardless of
  // what language the i18next singleton happens to have initialized with.
  const t = i18n.getFixedT(lang);
  const [scrolled, setScrolled] = useState(false);
  const [menuValue, setMenuValue] = useState("");
  const pathname = usePathname();
  const isRtl = lang === 'ar';

  const closeMenu = () => {
    setMenuValue("");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ar') ? 'en' : 'ar';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';

    // 1. Persist the choice — cookie (server) + localStorage (i18next detector)
    document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;

    // 2. Update document direction immediately so the visual flip is instant
    //    rather than waiting for the i18next change + useEffect cycle.
    document.documentElement.dir  = newDir;
    document.documentElement.lang = newLang;

    // 3. Change i18next language (loads English bundle lazily if needed)
    i18n.changeLanguage(newLang);

    // 4. Track the language switch before reloading
    trackEvent("language_toggle", { to: newLang, from: newLang === "ar" ? "en" : "ar" });

    // 5. Hard-reload so Server Components re-render with the new cookie.
    //    Without this, server-rendered isRtl props (flex-row-reverse, conditional
    //    padding, etc.) stay stale until the next navigation.
    window.location.reload();
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);



  useEffect(() => {
    const handleScroll = () => {
      // Only close the desktop dropdown on scroll — never the mobile overlay.
      // Mobile browsers fire scroll events from momentum / tap gestures, which
      // would immediately close the menu right after the user opens it.
      if (menuValue) {
        setMenuValue("");
      }
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuValue]);

  const triggerClassName = "group relative bg-transparent text-foreground/80 hover:text-foreground focus:text-foreground data-[state=open]:bg-primary/20 data-[state=open]:text-foreground h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-muted/50 rounded-full uppercase tracking-widest overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-3xl border-b border-primary/30 py-3 shadow-2xl"
            : "bg-transparent py-5"
        )}
      >
        {/* Subtle gradient line at bottom */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-500",
          scrolled
            ? "bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-100"
            : "bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0"
        )} />

        <div className="container mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-center justify-start">
            <Link href="/home/" className="group relative z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-lg">
              <motion.div
                className="relative w-24 h-8 xl:w-32 xl:h-10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/logoo.png"
                  alt="Sehle"
                  fill
                  sizes="(min-width: 1280px) 144px, 112px"
                  className="object-contain relative z-10 drop-shadow-[0_0_15px_rgba(194,164,92,0.5)] group-hover:opacity-80 transition-opacity duration-200 dark:invert-0"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-none items-center justify-center">
            <NavigationMenu value={menuValue} onValueChange={setMenuValue} className="static">
              <NavigationMenuList className="gap-1 xl:gap-2">

                {NAV_CATEGORIES.map((category) => {
                  const Panel = category.Panel;
                  return (
                    <NavigationMenuItem key={category.id}>
                      <NavigationMenuTrigger className={triggerClassName}>
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        {category.defaultTitle ? t(category.titleKey, category.defaultTitle) : t(category.titleKey)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <MegaMenuSection
                          title={category.defaultTitle ? t(category.titleKey, category.defaultTitle) : t(category.titleKey)}
                          description={t(category.descriptionKey)}
                          icon={category.icon}
                          href={category.href}
                          layout={category.layout}
                        >
                          <Panel isRtl={isRtl} />
                        </MegaMenuSection>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-2 xl:gap-3">
            <ThemeToggle />
            <button
              onClick={() => { toggleLanguage(); closeMenu(); }}
              className="w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-muted/80 rounded-full transition-all border border-border/40 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-90"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>
            <Link href="/contact/" onClick={closeMenu}>
              <span className="bg-primary text-primary-foreground px-4 xl:px-6 py-2.5 xl:py-3 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-[0.2em] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_10px_30px_rgba(194,164,92,0.25)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {t("navbar.book_consultation")}
              </span>
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <button
              onClick={() => { toggleLanguage(); }}
              className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-muted rounded-full transition-all border border-border/40 active:scale-90"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

    </>
  );
}

