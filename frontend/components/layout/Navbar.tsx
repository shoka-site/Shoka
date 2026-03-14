"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, ArrowRight, Sparkles, Activity, BarChart3, ShieldCheck, Zap, LayoutGrid, History, Rocket, Building2, Users, Package, Code2, Database, Cloud, Brain, Smartphone, Shield, Workflow, Server, Newspaper, TrendingUp } from "lucide-react";
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
} from "@/components/ui/navigation-menu";
import React from "react";
import { useProjects, useIndustries, useServices, usePackages, usePlatformUpdates, useTeamMembers } from "@/hooks/use-content";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuValue, setMenuValue] = useState("");
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const isRtl = i18n.dir() === 'rtl';
  const { data: projects = [] } = useProjects(true);
  const { data: industries = [] } = useIndustries();
  const { data: services = [] } = useServices();
  const { data: packages = [] } = usePackages();
  const { data: platformUpdates = [] } = usePlatformUpdates();
  const { data: teamMembers = [] } = useTeamMembers();

  // Close navbar functions
  const closeMenu = () => {
    setIsOpen(false);
    setMenuValue("");
  };

  const serviceTypeIcons: Record<string, React.ElementType> = {
    software_development: Code2,
    web_development: Code2,
    mobile_apps: Smartphone,
    data_analytics: Database,
    cloud_solutions: Cloud,
    ai_ml: Brain,
    digital_transformation: Workflow,
    enterprise_solutions: Building2,
    security: Shield,
    infrastructure: Server,
    analytics: BarChart3,
    default: Zap,
  };

  const getServiceIcon = (type?: string): React.ElementType => {
    if (!type) return Zap;
    const key = type.toLowerCase().replace(/[^a-z_]/g, '_');
    return serviceTypeIcons[key] ?? serviceTypeIcons['default'];
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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
      // Close navbar on any scroll (up or down)
      if (isOpen || menuValue) {
        closeMenu();
      }
      setScrolled(window.scrollY > 20);
      setLastScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, menuValue]);

  const solutions = [
    { title_key: "navbar.menu.solutions.efficiency.title", href: "/solutions", desc_key: "navbar.menu.solutions.efficiency.desc", icon: Zap },
    { title_key: "navbar.menu.solutions.growth.title", href: "/solutions", desc_key: "navbar.menu.solutions.growth.desc", icon: BarChart3 },
    { title_key: "navbar.menu.solutions.experience.title", href: "/solutions", desc_key: "navbar.menu.solutions.experience.desc", icon: Activity },
    { title_key: "navbar.menu.solutions.risk.title", href: "/solutions", desc_key: "navbar.menu.solutions.risk.desc", icon: ShieldCheck }
  ];

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

  const projectCategories = [
    { title_key: "portfolio.projects.categories.made", href: "/projects", desc_key: "portfolio.projects.status.made", icon: History },
    { title_key: "portfolio.projects.categories.making", href: "/projects", desc_key: "portfolio.projects.status.making", icon: Zap },
    { title_key: "portfolio.projects.categories.will_make", href: "/projects", desc_key: "portfolio.projects.status.will_make", icon: Rocket }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
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
          <Link href="/home" className="group relative z-50">
            <span className={`text-2xl font-display font-black text-white tracking-tighter group-hover:opacity-80 transition-all flex items-center gap-2 uppercase`}>
              <motion.div
                className="w-14 h-14 xl:w-16 xl:h-16 flex items-center justify-center relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Glow effect behind logo */}
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
                <NavigationMenuTrigger className="group relative bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-primary/20 data-[state=open]:text-white h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-white/10 rounded-full uppercase tracking-widest overflow-hidden">
                  {/* Hover shine effect */}
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
                    <ul className="grid grid-cols-2 gap-6">
                      {industries.map((industry, idx) => (
                        <motion.div
                          key={industry.id}
                          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link href={`/industries/${industry.id}`} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                              <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{industry.title}</div>
                              <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{industry.description}</div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </ul>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="group relative bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-primary/20 data-[state=open]:text-white h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-white/10 rounded-full uppercase tracking-widest overflow-hidden">
                  {/* Hover shine effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.services", "Services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.services", "Services")}
                    description={isRtl 
                      ? "برمجة وبناء وتطوير واجهات ونظم مخصصة بجودة وأداء عالي"
                      : "Custom software architecture, full-stack development, and performance optimization."}
                    icon={LayoutGrid}
                    href="/services"
                    layout="list"
                  >
                    <ul className="grid grid-cols-2 gap-6">
                      {services.slice(0, 6).map((service, idx) => {
                        const ServiceIcon = getServiceIcon(service.type);
                        return (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link href={`/services/${service.id}`} className={`group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                                <ServiceIcon className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{service.title}</div>
                                <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{service.description}</div>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </ul>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="group relative bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-primary/20 data-[state=open]:text-white h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-white/10 rounded-full uppercase tracking-widest overflow-hidden">
                  {/* Hover shine effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {t("navbar.packages")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuSection
                    title={t("navbar.packages")}
                    description={isRtl
                      ? "باقات مجمّعة مصممة لاحتياجات أعمال محددة — كل باقة تحل مشكلة حقيقية."
                      : "Pre-built solution bundles designed around specific business needs."}
                    icon={Package}
                    href="/packages"
                    layout="grid"
                  >
                    <ul className="grid grid-cols-2 gap-4">
                      {packages.slice(0, 4).map((pkg, idx) => (
                        <motion.div
                          key={pkg.id}
                          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link href={`/packages/${pkg.id}`} className={`group flex items-start gap-4 p-5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              <Package className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{pkg.title}</div>
                              {pkg.description && (
                                <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{pkg.description}</div>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </ul>
                    {packages.length > 4 && (
                      <div className="mt-6 pt-6 border-t border-white/5">
                        <Link href="/packages" className={`inline-flex items-center text-sm text-white/60 hover:text-primary transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                          {isRtl ? `عرض جميع الباقات (${packages.length})` : `View all packages (${packages.length})`}
                          <ArrowRight className={`w-4 h-4 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </Link>
                      </div>
                    )}
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>



              <NavigationMenuItem>
                <NavigationMenuTrigger className="group relative bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-primary/20 data-[state=open]:text-white h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-white/10 rounded-full uppercase tracking-widest overflow-hidden">
                  {/* Hover shine effect */}
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
                    <div className="space-y-8">
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

                      {projects.length > 0 && (
                        <>
                          <ul className="grid grid-cols-3 gap-6">
                            {projects.slice(0, 3).map((project, idx) => (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx + 3) * 0.1 }}
                              >
                                <Link href={`/projects/${project.id}`} className={`group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 overflow-hidden relative group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                                      {project.images && project.images.length > 0 ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                                      ) : (
                                        <LayoutGrid className="w-6 h-6" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight line-clamp-1">{project.title}</div>
                                    <div className="text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">{project.description}</div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </MegaMenuSection>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="group relative bg-transparent text-white/70 hover:text-white focus:text-white data-[state=open]:bg-primary/20 data-[state=open]:text-white h-10 px-4 xl:px-6 text-xs xl:text-sm font-bold transition-all hover:bg-white/10 rounded-full uppercase tracking-widest overflow-hidden">
                  {/* Hover shine effect */}
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
                    <div className="grid grid-cols-2 gap-x-12">
                      {aboutCategories.map((cat, idx) => (
                        <motion.div
                          key={cat.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
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

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-2 xl:gap-4">
          <button
            onClick={() => { toggleLanguage(); closeMenu(); }}
            className="w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
          </button>
          <Link href="/contact" onClick={closeMenu}>
            <span className="bg-white text-black px-4 xl:px-6 py-2.5 xl:py-3 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black hover:scale-105 transition-all cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.25)] whitespace-nowrap">
              {t("navbar.book_consultation")}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex flex-1 lg:hidden items-center justify-end">
          <button
            className="text-white p-3 hover:bg-white/10 rounded-2xl transition-all"
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-0 z-[49] bg-black flex flex-col pt-28 px-6 pb-8 md:pt-32 md:p-8 overflow-y-auto"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-black pointer-events-none" />
            
            {/* Animated orbs */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
              className="absolute bottom-40 -left-20 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" 
            />
            
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
                  transition={{ delay: idx * 0.05 + 0.2 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white/90 hover:text-primary transition-all block py-3 md:py-4 lowercase tracking-tighter">
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
                  <span className="block w-full bg-white text-black text-center py-4 md:py-5 rounded-full text-base md:text-xl font-black uppercase tracking-widest shadow-2xl hover:bg-primary hover:text-black transition-all">
                    {t("navbar.book_consultation")}
                  </span>
                </Link>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => { toggleLanguage(); setIsOpen(false); }}
                    className="flex-grow flex items-center justify-center gap-3 py-5 rounded-[2rem] border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/10 hover:border-primary/50 transition-all"
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`w-screen bg-black/90 backdrop-blur-2xl border-y border-primary/10 shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(194,164,92,0.05)] overflow-hidden ${isRtl ? 'rtl' : 'ltr'}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className={`container mx-auto px-6 md:px-12 flex items-stretch relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Sidebar / Featured */}
        <div className={`w-1/3 bg-gradient-to-b from-white/[0.03] to-transparent p-12 flex flex-col relative overflow-hidden ${isRtl ? 'border-l' : 'border-r'} border-white/5`}>
          {/* Noise texture for sidebar */}
          <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />

          {/* Animated gold orbs in sidebar */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
              className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(194,164,92,0.2)] border border-primary/20`}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className={`text-4xl font-display font-black text-white mb-4 tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-lg text-white/50 leading-relaxed font-light mb-12 flex-grow ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link href={href} className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full text-white text-xs font-black uppercase tracking-[0.2em] hover:from-primary hover:to-primary/80 hover:text-black hover:border-primary/50 hover:scale-105 transition-all group w-fit shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${isRtl ? 'flex-row-reverse' : ''}`}>
                {t("common.explore_all")} <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'mr-3 rotate-180 group-hover:-translate-x-1' : 'ml-3 group-hover:translate-x-1'}`} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-2/3 p-12 bg-gradient-to-br from-transparent via-white/[0.01] to-white/[0.02] relative">
          {/* Animated radial gold spotlight for the content area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
