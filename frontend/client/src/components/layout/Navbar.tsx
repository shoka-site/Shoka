import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Brain, Database, Cloud, Lock, Building2, Globe } from "lucide-react";
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
export default function Navbar() {


  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isRtl = i18n.dir() === 'rtl';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const services = [
    {
      title: t("navbar.menu_services.ai.title"),
      href: "/services",
      description: t("navbar.menu_services.ai.desc"),
      icon: <Brain className="w-5 h-5 mb-2 text-primary" />
    },
    {
      title: t("navbar.menu_services.data.title"),
      href: "/services",
      description: t("navbar.menu_services.data.desc"),
      icon: <Database className="w-5 h-5 mb-2 text-primary" />
    },
    {
      title: t("navbar.menu_services.cloud.title"),
      href: "/services",
      description: t("navbar.menu_services.cloud.desc"),
      icon: <Cloud className="w-5 h-5 mb-2 text-primary" />
    },
    {
      title: t("navbar.menu_services.security.title"),
      href: "/services",
      description: t("navbar.menu_services.security.desc"),
      icon: <Lock className="w-5 h-5 mb-2 text-primary" />
    }
  ];

  const projects = [
    {
      title: t("portfolio.projects.archive.title"),
      href: "/portfolio",
      description: t("portfolio.projects.archive.desc"),
    },
    {
      title: t("portfolio.projects.smart_city.title"),
      href: "/portfolio",
      description: t("portfolio.projects.smart_city.desc"),
    },
    {
      title: t("portfolio.projects.banking.title"),
      href: "/portfolio",
      description: t("portfolio.projects.banking.desc"),
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navbar.services"), href: "/services" },
    { name: t("navbar.portfolio"), href: "/portfolio" },
    { name: t("navbar.about"), href: "/about" },
    { name: t("navbar.contact"), href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-border/40 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/home">
          <span className={`text-2xl font-display font-bold text-foreground hover:opacity-80 transition-opacity cursor-pointer ${isRtl ? 'tracking-normal' : 'tracking-tighter'}`}>
            {t("navbar.brand")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10">{t("navbar.services")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover/95 backdrop-blur-sm">
                    {services.map((service) => (
                      <ListItem
                        key={service.title}
                        title={service.title}
                        href={service.href}
                        icon={service.icon}
                      >
                        {service.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10">{t("navbar.portfolio")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 bg-popover/95 backdrop-blur-sm">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/30 p-6 no-underline outline-none focus:shadow-md"
                          href="/portfolio"
                        >
                          <Building2 className="h-6 w-6 text-primary mb-2" />
                          <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                            {t("navbar.recent_work")}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {t("navbar.recent_work_desc")}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {projects.map((project) => (
                      <ListItem
                        key={project.title}
                        title={project.title}
                        href={project.href}
                      >
                        {project.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-muted-foreground hover:text-accent focus:text-accent")}>
                    {t("navbar.about")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-muted-foreground hover:text-accent focus:text-accent")}>
                    {t("navbar.contact")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/contact">
            <span className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer inline-block">
              {t("navbar.book_consultation")}
            </span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden shadow-lg"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span
                    className="text-lg font-medium text-foreground hover:text-accent cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span
                  className="bg-primary text-primary-foreground px-5 py-3 rounded-md text-center font-medium hover:bg-primary/90 transition-colors cursor-pointer inline-block"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navbar.book_consultation")}
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"