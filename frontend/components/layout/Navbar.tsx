"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import MegaMenuSection from "./navbar/MegaMenuSection";
import { NAV_CATEGORIES } from "./navbar/nav-data";
import { isActivePath } from "@/lib/site-navigation";

interface NavbarProps {
  lang: "en" | "ar";
}

export default function Navbar({ lang }: NavbarProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuValue, setMenuValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuValue("");
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!mobileOpen && menuValue) {
        setMenuValue("");
      }
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuValue, mobileOpen]);

  const triggerClassName =
    "group relative h-10 overflow-hidden rounded-pill bg-transparent px-3 text-foreground/80 transition-ui hover:bg-muted/60 hover:text-foreground focus-visible:text-foreground data-[state=open]:bg-primary/15 data-[state=open]:text-foreground xl:px-4";

  return (
    <>
      {/*
        Sticky header decision: fixed/sticky header chosen for persistent navigation
        and primary CTA access. Viewport cost is mitigated by transparent background
        at top, backdrop-blur only when scrolled, and no heavy re-renders on scroll.
      */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[padding,background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-base)] [transition-timing-function:var(--motion-ease-standard)]",
          scrolled
            ? "border-b border-border bg-background/90 py-2 shadow-md backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-3 lg:py-4"
        )}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent transition-opacity duration-300" />

        <div className="container-page flex items-center justify-between gap-3">
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/home/"
              onClick={() => setMenuValue("")}
              className="focus-ring group flex h-11 shrink-0 items-center rounded-md"
              aria-label={t("navbar.brand")}
            >
              <Image
                src="/logoo.png"
                alt={t("navbar.brand")}
                width={112}
                height={40}
                sizes="112px"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] xl:h-9"
                priority
              />
            </Link>
          </div>

          <nav
            aria-label={t("navbar.primary_nav")}
            className="hidden flex-none items-center justify-center xl:flex"
          >
            <NavigationMenu
              value={menuValue}
              onValueChange={setMenuValue}
              className="static"
            >
              <NavigationMenuList className="gap-0.5 xl:gap-1">
                {NAV_CATEGORIES.map((category) => {
                  const Panel = category.Panel;
                  const active = isActivePath(pathname, category.href);
                  const title = t(category.titleKey, category.defaultTitle);

                  return (
                    <NavigationMenuItem key={category.id}>
                      <NavigationMenuTrigger
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          triggerClassName,
                          "type-label",
                          active && "bg-primary/10 text-foreground"
                        )}
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="relative">{title}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <MegaMenuSection
                          title={title}
                          description={t(category.descriptionKey)}
                          icon={category.icon}
                          href={category.href}
                          layout={category.layout}
                        >
                          <Panel isRtl={lang === "ar"} />
                        </MegaMenuSection>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-2 xl:flex xl:gap-3">
            <ThemeToggle />
            <LanguageSwitcher lang={lang} />
            <Button asChild size="lg" className="rounded-pill px-5">
              <Link
                href="/contact/"
                onClick={() => {
                  setMenuValue("");
                  trackEvent("nav_cta_click", { destination: "contact" });
                }}
              >
                <span className="type-label">
                  {t("navbar.book_consultation")}
                </span>
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-end gap-1.5 xl:hidden">
            <ThemeToggle />
            <LanguageSwitcher lang={lang} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              ref={mobileMenuTriggerRef}
              onClick={() => setMobileOpen(true)}
              aria-label={t("navbar.open_menu")}
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="h-11 w-11 rounded-pill border border-border/40 bg-background/50"
            >
              <Menu aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        lang={lang}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        triggerRef={mobileMenuTriggerRef}
      />
    </>
  );
}
