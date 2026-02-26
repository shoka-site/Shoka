"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, ChevronDown, ArrowRight, Sparkles, Activity, BarChart3, ShieldCheck, Zap, Server, Code2, Cpu, LayoutGrid, Smartphone, LifeBuoy, History, Rocket } from "lucide-react";
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

  const projectCategories = [
    { title_key: "portfolio.projects.categories.made", href: "/projects", desc_key: "portfolio.projects.status.made", icon: History },
    { title_key: "portfolio.projects.categories.making", href: "/projects", desc_key: "portfolio.projects.status.making", icon: Zap },
    { title_key: "portfolio.projects.categories.will_make", href: "/projects", desc_key: "portfolio.projects.status.will_make", icon: Rocket }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
        scrolled
          ? "bg-black/90 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="group relative z-50">
          <span className={`text-2xl font-display font-black text-white tracking-tighter group-hover:opacity-80 transition-all flex items-center gap-2 uppercase`}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: scrolled ? 360 : 0 }}
              transition={{ duration: 1 }}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            {t("navbar.brand")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu className="static">
            <NavigationMenuList className="gap-2">

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white h-10 px-5 text-sm font-bold transition-all hover:bg-white/5 rounded-full uppercase tracking-widest">
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
                    <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                      {serviceCategories.map((category, idx) => (
                        <motion.div
                          key={category.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="space-y-4"
                        >
                          <div className={`flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <category.icon className="w-4 h-4" />
                            </div>
                            <span>{t(category.title)}</span>
                          </div>
                          <ul className="space-y-1">
                            {category.items.map(item => (
                              <li key={item.name}>
                                <Link href={item.href} className={`block text-sm text-white/50 hover:text-primary transition-all py-1.5 ${isRtl ? 'pr-6 border-r text-right' : 'pl-6 border-l text-left'} border-white/5 hover:border-primary/40`}>
                                  {t(item.name)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white h-10 px-5 text-sm font-bold transition-all hover:bg-white/5 rounded-full uppercase tracking-widest">
                  {t("navbar.industries")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.industries")}
                    description={t("home.industries.description")}
                    icon={LayoutGrid}
                    href="/industries"
                    layout="grid"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {industryCategories.map((cat, idx) => (
                        <motion.div
                          key={cat.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link href={cat.items[0]?.href || "/industries"} className={`group block p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center gap-3 mb-2 group-hover:text-primary transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                                <cat.icon className="w-5 h-5" />
                              </div>
                              <span className="font-black text-sm uppercase tracking-tight">{t(cat.title)}</span>
                            </div>
                            <p className={`text-xs text-white/40 line-clamp-2 ${isRtl ? 'pr-12' : 'pl-12'}`}>
                              {cat.items.slice(0, 2).map(i => t(i.name)).join(", ")}...
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white h-10 px-5 text-sm font-bold transition-all hover:bg-white/5 rounded-full uppercase tracking-widest">
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
                    <ul className="grid grid-cols-2 gap-6">
                      {solutions.map((item, idx) => (
                        <motion.div
                          key={item.title_key}
                          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link href={item.href} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
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
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white h-10 px-5 text-sm font-bold transition-all hover:bg-white/5 rounded-full uppercase tracking-widest">
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
                    <ul className="grid grid-cols-3 gap-6">
                      {projectCategories.map((item, idx) => (
                        <motion.div
                          key={item.title_key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link href={item.href} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
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
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white h-10 px-5 text-sm font-bold transition-all hover:bg-white/5 rounded-full uppercase tracking-widest">
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
                    <ul className="grid grid-cols-2 gap-4">
                      {aboutLinks.map((item, idx) => (
                        <motion.div
                          key={item.title_key}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link href={item.href} className={`block p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group ${isRtl ? 'text-right' : ''}`}>
                            <div className="font-black text-sm mb-2 text-white group-hover:text-primary transition-colors uppercase tracking-tight">{t(item.title_key)}</div>
                            <div className="text-xs text-white/40 leading-relaxed italic">{t(item.desc_key)}</div>
                          </Link>
                        </motion.div>
                      ))}
                    </ul>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <Link href="/contact">
              <span className="bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black hover:scale-105 transition-all cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.25)]">
                {t("navbar.book_consultation")}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-3 hover:bg-white/10 rounded-2xl transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-[49] bg-black backdrop-blur-3xl flex flex-col pt-32 p-8"
          >
            {/* Subtle grid pattern for mobile menu */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <nav className="container mx-auto flex flex-col space-y-2 relative z-10">
              {[
                { name: t("navbar.services"), href: "/services" },
                { name: t("navbar.industries"), href: "/industries" },
                { name: t("navbar.recent_work"), href: "/solutions" },
                { name: t("navbar.projects"), href: "/projects" },
                { name: t("navbar.about"), href: "/about" },
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.2 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    <span className="text-4xl md:text-5xl font-display font-black text-white/90 hover:text-primary transition-all block py-4 lowercase tracking-tighter">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-12 flex flex-col gap-6"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <span className="block w-full bg-white text-black text-center py-5 rounded-[2rem] text-xl font-black uppercase tracking-widest shadow-2xl">
                    {t("navbar.book_consultation")}
                  </span>
                </Link>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => { toggleLanguage(); setIsOpen(false); }}
                    className="flex-grow flex items-center justify-center gap-3 py-5 rounded-[2rem] border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    <Globe className="w-5 h-5" />
                    <span>{i18n.language.startsWith('ar') ? 'English' : 'العربية'}</span>
                  </button>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40">
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-screen bg-black/95 backdrop-blur-[60px] border-y border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden ${isRtl ? 'rtl' : 'ltr'}`}
    >
      <div className={`container mx-auto px-6 md:px-12 flex items-stretch ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Sidebar / Featured */}
        <div className={`w-1/3 bg-white/[0.02] p-12 flex flex-col relative overflow-hidden ${isRtl ? 'border-l' : 'border-r'} border-white/5`}>
          {/* Noise texture for sidebar */}
          <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none" />

          {/* Subtle gold spotlight in sidebar */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-16 h-16 rounded-[1.5rem] bg-primary/10 text-primary flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(var(--primary),0.15)]`}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl font-display font-black text-white mb-4 tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-lg text-white/40 leading-relaxed font-light mb-12 flex-grow ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {description}
            </motion.p>
            <Link href={href} className={`inline-flex items-center px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all group w-fit ${isRtl ? 'flex-row-reverse' : ''}`}>
              {t("common.explore_all")} <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'mr-3 rotate-180 group-hover:-translate-x-1' : 'ml-3 group-hover:translate-x-1'}`} />
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-2/3 p-16 bg-gradient-to-br from-transparent to-white/[0.01] relative">
          {/* Radial gold spotlight for the content area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />
          {children}
        </div>
      </div>
    </motion.div>
  );
}