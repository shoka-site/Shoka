"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, Sparkles, LayoutGrid, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import dynamic from "next/dynamic";
import MegaMenuSection from "./navbar/MegaMenuSection";

const IndustriesPanel = dynamic(() => import("./navbar/IndustriesPanel"), {
  loading: () => <PanelSkeleton />,
});
const ServicesPanel = dynamic(() => import("./navbar/ServicesPanel"), {
  loading: () => <PanelSkeleton />,
});
const PackagesPanel = dynamic(() => import("./navbar/PackagesPanel"), {
  loading: () => <PanelSkeleton />,
});
const ProjectsPanel = dynamic(() => import("./navbar/ProjectsPanel"), {
  loading: () => <PanelSkeleton />,
});
const AboutPanel = dynamic(() => import("./navbar/AboutPanel"), {
  loading: () => <PanelSkeleton />,
});

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuValue, setMenuValue] = useState("");
  const pathname = usePathname();
  const isRtl = i18n.dir() === 'rtl';

  const closeMenu = () => {
    setIsOpen(false);
    setMenuValue("");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen || menuValue) {
        closeMenu();
      }
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, menuValue]);

  const triggerClassName = "group relative bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-primary/20 data-[state=open]:text-white h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-white/10 rounded-full uppercase tracking-widest overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-primary/20 py-3 shadow-2xl"
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

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/home" className="group relative z-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-lg">
            <span className="text-2xl font-display font-black text-white tracking-tighter group-hover:opacity-80 transition-all flex items-center gap-2 uppercase">
              <motion.div
                className="w-14 h-14 xl:w-16 xl:h-16 flex items-center justify-center relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image src="/logo.png" alt="Logo" width={64} height={64} className="object-contain relative z-10 drop-shadow-[0_0_15px_rgba(194,164,92,0.5)]" />
              </motion.div>
              {t("navbar.brand")}
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-none items-center justify-center">
          <NavigationMenu value={menuValue} onValueChange={setMenuValue} className="static">
            <NavigationMenuList className="gap-1 xl:gap-2">

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerClassName}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.industries")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.industries")}
                    description={t("home.industries.description")}
                    icon={LayoutGrid}
                    href="/industries"
                    layout="list"
                  >
                    <IndustriesPanel isRtl={isRtl} />
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerClassName}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.services", "Services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.services", "Services")}
                    description={t("navbar.menu.services.description")}
                    icon={LayoutGrid}
                    href="/services"
                    layout="list"
                  >
                    <ServicesPanel isRtl={isRtl} />
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerClassName}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.packages")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.packages")}
                    description={t("navbar.menu.packages.description")}
                    icon={Package}
                    href="/packages"
                    layout="grid"
                  >
                    <PackagesPanel isRtl={isRtl} />
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerClassName}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.projects")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.projects")}
                    description={t("portfolio.projects.description")}
                    icon={LayoutGrid}
                    href="/projects"
                    layout="list"
                  >
                    <ProjectsPanel isRtl={isRtl} />
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerClassName}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.about")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.about")}
                    description={t("footer.desc")}
                    icon={Globe}
                    href="/about"
                    layout="columns"
                  >
                    <AboutPanel isRtl={isRtl} />
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-2 xl:gap-4">
          <button
            onClick={() => { toggleLanguage(); closeMenu(); }}
            className="w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-90"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
          </button>
          <Link href="/contact" onClick={closeMenu}>
            <span className="bg-primary text-black px-4 xl:px-6 py-2.5 xl:py-3 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-[0.2em] hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_10px_30px_rgba(194,164,92,0.25)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              {t("navbar.book_consultation")}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex flex-1 lg:hidden items-center justify-end">
          <button
            className="text-white p-3 hover:bg-white/10 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-0 z-[49] bg-black flex flex-col pt-28 px-6 pb-8 md:pt-32 md:p-8 overflow-y-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-black pointer-events-none" />

            {/* Static gradient orbs */}
            <div className="absolute top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-40 -left-20 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <nav className="container mx-auto flex flex-col space-y-2 relative z-10">
              {[
                { name: t("navbar.industries"), href: "/industries" },
                { name: t("navbar.services", "Services"), href: "/services" },
                { name: t("navbar.packages"), href: "/packages" },
                { name: t("navbar.projects"), href: "/projects" },
                { name: t("navbar.about"), href: "/about" },
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.2, type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white/90 hover:text-primary active:text-primary/70 transition-all block py-3 md:py-4 lowercase tracking-tighter">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                className="pt-12 flex flex-col gap-6"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <span className="block w-full bg-primary text-black text-center py-4 md:py-5 rounded-full text-base md:text-xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(194,164,92,0.3)] hover:bg-primary/80 active:scale-95 transition-all">
                    {t("navbar.book_consultation")}
                  </span>
                </Link>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => { toggleLanguage(); setIsOpen(false); }}
                    className="flex-grow flex items-center justify-center gap-3 py-5 rounded-[2rem] border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/10 hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
                  >
                    <Globe className="w-5 h-5" />
                    <span>{i18n.language.startsWith('ar') ? 'English' : 'العربية'}</span>
                  </button>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 bg-white/5">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            </nav>

            <div className="mt-auto pb-12 text-center relative z-10">
              <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">Powered by Iraqi Platform</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PanelSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-5 p-5">
          <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/5 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
