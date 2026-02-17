import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Brain, Database, Cloud, Lock, Building2, Globe, ArrowRight } from "lucide-react";
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
  const [location, setLocation] = useLocation();
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

  const industries = [
    { title: "Healthcare", href: "/industries", description: "Digital transformation for medical providers." },
    { title: "Finance", href: "/industries", description: "Secure, compliant financial technology solutions." },
    { title: "Retail", href: "/industries", description: "Omnichannel commerce and supply chain optimization." },
    { title: "Manufacturing", href: "/industries", description: "Industry 4.0 and smart factory solutions." },
    { title: "Education", href: "/industries", description: "EdTech platforms for modern learning." }
  ];

  const solutions = [
    { title: "Operational Efficiency", href: "/solutions", description: "Reduce costs and streamline workflows." },
    { title: "Revenue Growth", href: "/solutions", description: "Digital channels to unlock new revenue streams." },
    { title: "Customer Experience", href: "/solutions", description: "Engage users with personalized experiences." },
    { title: "Risk Management", href: "/solutions", description: "Protect your business with advanced security." }
  ];

  const aboutSections = [
    { title: "Our Team", href: "/about" },
    { title: "Clients", href: "/about" },
    { title: "Events", href: "/about" },
    { title: "Awards", href: "/about" }
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
    { name: "Industries", href: "/industries" },
    { name: "Solutions", href: "/solutions" },
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
          <NavigationMenu className="static">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => setLocation("/services")}
                  className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10 cursor-pointer"
                >
                  {t("navbar.services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-popover/95 backdrop-blur-md border-y border-border/40 shadow-2xl">
                    <div className="container mx-auto px-6 md:px-12 py-10">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                          <h3 className="text-2xl font-display font-bold mb-4">{t("navbar.services")}</h3>
                          <p className="text-muted-foreground mb-6">Innovative digital solutions tailored to accelerate your business growth.</p>
                          <Link href="/services">
                            <span className="text-primary font-medium hover:underline cursor-pointer flex items-center gap-2">
                              View all services <ArrowRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </div>
                        <div className="col-span-3">
                          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => setLocation("/portfolio")}
                  className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10 cursor-pointer"
                >
                  {t("navbar.portfolio")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-popover/95 backdrop-blur-md border-y border-border/40 shadow-2xl">
                    <div className="container mx-auto px-6 md:px-12 py-10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <li className="col-span-1 list-none">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 no-underline outline-none focus:shadow-md transition-all hover:scale-[1.02] border border-primary/10"
                              href="/portfolio"
                            >
                              <Building2 className="h-10 w-10 text-primary mb-4" />
                              <div className="mb-3 mt-4 text-2xl font-display font-bold text-foreground">
                                {t("navbar.recent_work")}
                              </div>
                              <p className="text-base leading-relaxed text-muted-foreground">
                                {t("navbar.recent_work_desc")}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <div className="col-span-2">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => setLocation("/industries")}
                  className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10 cursor-pointer"
                >
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-popover/95 backdrop-blur-md border-y border-border/40 shadow-2xl">
                    <div className="container mx-auto px-6 md:px-12 py-10">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                          <h3 className="text-2xl font-display font-bold mb-4">Industries</h3>
                          <p className="text-muted-foreground">Specialized expertise across diverse sectors, delivering targeted results for complex challenges.</p>
                        </div>
                        <div className="col-span-3">
                          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {industries.map((item) => (
                              <ListItem key={item.title} title={item.title} href={item.href}>
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => setLocation("/solutions")}
                  className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10 cursor-pointer"
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-popover/95 backdrop-blur-md border-y border-border/40 shadow-2xl">
                    <div className="container mx-auto px-6 md:px-12 py-10">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                          <h3 className="text-2xl font-display font-bold mb-4">Solutions</h3>
                          <p className="text-muted-foreground">Strategic digital transformations designed to drive measurable business outcomes.</p>
                        </div>
                        <div className="col-span-3">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {solutions.map((item) => (
                              <ListItem key={item.title} title={item.title} href={item.href}>
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => setLocation("/about")}
                  className="bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary data-[state=open]:bg-accent/10 cursor-pointer"
                >
                  {t("navbar.about")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-popover/95 backdrop-blur-md border-y border-border/40 shadow-2xl">
                    <div className="container mx-auto px-6 md:px-12 py-10">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                          <h3 className="text-2xl font-display font-bold mb-4">Who We Are</h3>
                          <p className="text-muted-foreground">A team of experts dedicated to pushing the boundaries of what's possible in the digital realm.</p>
                        </div>
                        <div className="col-span-3">
                          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {aboutSections.map((item) => (
                              <ListItem key={item.title} title={item.title} href={item.href} className="hover:bg-accent/10">
                                {/* No description for simple list */}
                              </ListItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-muted-foreground hover:text-accent focus:text-accent data-[active]:text-primary")}>
                  {t("navbar.contact")}
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
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
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
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"