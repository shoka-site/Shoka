"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, ChevronDown, ArrowRight, Sparkles, Activity, BarChart3, ShieldCheck, Zap, Server, Code2, Cpu, LayoutGrid, Smartphone, LifeBuoy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { serviceCategories } from "@/lib/data/services";
import { industryCategories } from "@/lib/data/industries";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isRtl = i18n.dir() === 'rtl';

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutions = [
    { title_key: "navbar.menu.solutions.efficiency.title", href: "/solutions", desc_key: "navbar.menu.solutions.efficiency.desc", icon: Zap },
    { title_key: "navbar.menu.solutions.growth.title", href: "/solutions", desc_key: "navbar.menu.solutions.growth.desc", icon: BarChart3 },
    { title_key: "navbar.menu.solutions.experience.title", href: "/solutions", desc_key: "navbar.menu.solutions.experience.desc", icon: Activity },
    { title_key: "navbar.menu.solutions.risk.title", href: "/solutions", desc_key: "navbar.menu.solutions.risk.desc", icon: ShieldCheck }
  ];

  const aboutLinks = [
    { title_key: "navbar.menu.about.story", href: "/about", desc_key: "navbar.menu.about.story_desc" },
    { title_key: "navbar.menu.about.team", href: "/about", desc_key: "navbar.menu.about.team_desc" },
    { title_key: "navbar.menu.about.careers", href: "/about", desc_key: "navbar.menu.about.careers_desc" },
    { title_key: "navbar.menu.about.contact", href: "/contact", desc_key: "navbar.menu.about.contact_desc" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] border-b",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-white/5 py-3 shadow-lg"
          : "bg-black/20 backdrop-blur-sm border-white/5 py-4"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="group relative z-50">
          <span className={`text-2xl font-display font-bold text-white tracking-tight group-hover:opacity-90 transition-opacity flex items-center gap-2`}>
            {/* Optional: Add a small logo icon here if available */}
            {t("navbar.brand")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu className="static">
            <NavigationMenuList className="gap-2">

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white focus:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white h-9 px-4 text-sm font-medium transition-colors hover:bg-white/5 rounded-full">
                  {t("navbar.services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.services")}
                    description={t("navbar.recent_work_desc")}
                    icon={Cpu}
                    href="/services"
                    layout="columns"
                  >
                    <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                      {serviceCategories.map((category) => (
                        <div key={category.title} className="space-y-3">
                          <div className={`flex items-center gap-2 text-foreground font-semibold ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                            <category.icon className="w-4 h-4 text-primary" />
                            <span>{t(category.title)}</span>
                          </div>
                          <ul className="space-y-1">
                            {category.items.map(item => (
                              <li key={item.name}>
                                <Link href={item.href} className={`block text-sm text-muted-foreground hover:text-primary transition-colors py-1 ${isRtl ? 'pr-6 border-r text-right' : 'pl-6 border-l text-left'} border-transparent hover:border-primary/20`}>
                                  {t(item.name)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white focus:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white h-9 px-4 text-sm font-medium transition-colors hover:bg-white/5 rounded-full">
                  {t("navbar.industries")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.brand")}
                    description={t("hero.static.description")}
                    icon={LayoutGrid}
                    href="/industries"
                    layout="grid"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {industryCategories.map((cat) => (
                        <Link key={cat.title} href={cat.items[0]?.href || "/industries"} className={`group block p-3 rounded-lg hover:bg-muted/50 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                          <div className={`flex items-center gap-2 mb-1 group-hover:text-primary transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <cat.icon className="w-4 h-4" />
                            <span className="font-semibold text-sm">{t(cat.title)}</span>
                          </div>
                          <p className={`text-xs text-muted-foreground line-clamp-2 ${isRtl ? 'pr-6' : 'pl-6'}`}>
                            {cat.items.slice(0, 2).map(i => t(i.name)).join(", ")}...
                          </p>
                        </Link>
                      ))}
                    </div>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white focus:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white h-9 px-4 text-sm font-medium transition-colors hover:bg-white/5 rounded-full">
                  {t("navbar.recent_work")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.menu.solutions.risk.title")}
                    description={t("navbar.menu.solutions.risk.desc")}
                    icon={Sparkles}
                    href="/solutions"
                    layout="list"
                  >
                    <ul className="grid grid-cols-2 gap-4">
                      {solutions.map((item) => (
                        <Link key={item.title_key} href={item.href} className={`group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                          <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t(item.title_key)}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{t(item.desc_key)}</div>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className="bg-transparent text-white/80 hover:text-white focus:text-white h-9 px-4 text-sm font-medium transition-colors hover:bg-white/5 rounded-full flex items-center">
                    {t("navbar.projects")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white focus:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white h-9 px-4 text-sm font-medium transition-colors hover:bg-white/5 rounded-full">
                  {t("navbar.about")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.about")}
                    description={t("footer.desc")}
                    icon={Globe}
                    href="/about"
                    layout="list"
                  >
                    <ul className="grid grid-cols-2 gap-2">
                      {aboutLinks.map((item) => (
                        <Link key={item.title_key} href={item.href} className={`block p-4 rounded-lg hover:bg-muted/50 transition-colors group ${isRtl ? 'text-right' : ''}`}>
                          <div className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{t(item.title_key)}</div>
                          <div className="text-xs text-muted-foreground">{t(item.desc_key)}</div>
                        </Link>
                      ))}
                    </ul>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <button
              onClick={toggleLanguage}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <Link href="/contact">
              <span className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-white/90 hover:scale-105 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                {t("navbar.book_consultation")}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[60px] z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-auto"
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {[
                { name: t("navbar.services"), href: "/services" },
                { name: t("navbar.industries"), href: "/industries" },
                { name: t("navbar.recent_work"), href: "/solutions" },
                { name: t("navbar.projects"), href: "/projects" },
                { name: t("navbar.about"), href: "/about" },
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    <span className="text-2xl font-display font-medium text-white/90 hover:text-primary transition-colors block py-2 border-b border-white/5">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8 flex flex-col gap-4"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <span className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-xl text-lg font-bold">
                    {t("navbar.book_consultation")}
                  </span>
                </Link>
                <button
                  onClick={() => { toggleLanguage(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 text-white/80 hover:bg-white/5"
                >
                  <Globe className="w-5 h-5" />
                  <span>{i18n.language.startsWith('ar') ? 'English' : 'العربية'}</span>
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Mega Menu Content Helper ─────────────────────────────────────────────────
function MegaMenuSection({ title, description, icon: Icon, href, children, layout = "columns" }: {
  title: string;
  description: string;
  icon: any;
  href: string;
  children: React.ReactNode;
  layout?: "columns" | "grid" | "list";
}) {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className={`w-screen bg-popover/95 backdrop-blur-xl border-y border-white/10 shadow-2xl ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className={`container mx-auto px-6 md:px-12 flex items-stretch ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Sidebar / Featured */}
        <div className={`w-1/4 bg-muted/30 p-8 flex flex-col relative overflow-hidden ${isRtl ? 'border-l' : 'border-r'} border-white/5`}>
          {/* Noise texture for sidebar */}
          <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <div className={`w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-display font-bold text-foreground mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>{title}</h3>
            <p className={`text-sm text-muted-foreground leading-relaxed mb-8 flex-grow ${isRtl ? 'text-right' : 'text-left'}`}>{description}</p>
            <Link href={href} className={`inline-flex items-center text-primary text-sm font-semibold hover:gap-2 transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}>
              {t("common.explore_all")} <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'mr-1 rotate-180 group-hover:-translate-x-1' : 'ml-1 group-hover:translate-x-1'}`} />
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-10 bg-background/20">
          {children}
        </div>
      </div>
    </div>
  );
}