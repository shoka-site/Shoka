"use client";

import Section from "@/components/ui/section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Brain, Code, Database, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useServices } from "@/hooks/use-content";

import { serviceCategories } from "@/lib/data/services";

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: services = [], isLoading } = useServices();

  return (
    <div className="pt-24 min-h-screen bg-background">
      <Section background="pattern" className="pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('navbar.services')}</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('services.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('services.description')}
          </p>
        </motion.div>
      </Section>

      {isLoading ? (
        <div className="py-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {(() => {
            // Group services dynamically by their type property from the database
            const groupedServices = services.reduce((acc, service) => {
              const category = service.type || "Other Services";
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(service);
              return acc;
            }, {} as Record<string, typeof services>);

            // Render each unique string category found inside the Database as its own section
            return Object.entries(groupedServices).map(([categoryName, categoryServices], catIndex) => {

              // We optionally try to assign an icon block to the category using fuzzy matching from our template set.
              // Otherwise we fall back to a generic Cloud icon
              const matchedStaticCategory = serviceCategories.find(c =>
                c.title === categoryName ||
                t(c.title).toLowerCase() === categoryName.toLowerCase() ||
                categoryName.toLowerCase().includes(t(c.title).toLowerCase())
              );

              const CategoryIcon = matchedStaticCategory ? matchedStaticCategory.icon : Cloud;

              return (
                <Section key={categoryName} className={catIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                  <div className="flex items-center gap-4 mb-12">
                    <div className={`p-3 rounded-2xl bg-white shadow-sm border border-border/40 text-primary`}>
                      <CategoryIcon className="w-8 h-8" />
                    </div>
                    <div>
                      {/* For translation fallback: If this happens to be a translation key string in the database, translate it. Otherwise display the raw DB text */}
                      <h2 className="text-3xl font-display font-bold">{categoryName.includes('.') ? t(categoryName) : categoryName}</h2>
                      <div className="w-12 h-1 bg-primary mt-3 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={`/services/${service.id}`} className="block h-full group">
                          <Card className="h-full border-border/60 group-hover:border-primary/40 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.03)] transition-all duration-500 flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <CardHeader className="relative z-10 pb-4">
                              <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors flex items-start justify-between">
                                {service.title}
                                <ArrowRight className={`w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isRtl ? 'rotate-180 translate-x-4 group-hover:-translate-x-0' : ''}`} />
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col relative z-10">
                              <CardDescription className="text-base text-muted-foreground mb-6 line-clamp-3 flex-grow">
                                {service.description}
                              </CardDescription>

                              <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-primary transition-transform">
                                {t('services.learn_more')}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </Section>
              );
            });
          })()}
        </>
      )}
    </div>
  );
}