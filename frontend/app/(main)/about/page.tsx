"use client";

import Section from "@/components/ui/section";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Users, Globe, Target, Linkedin, Twitter, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTeamMembers } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";

export default function About() {
  const { t } = useTranslation();
  const { data: teamMembers = [], isLoading: isLoadingTeam } = useTeamMembers();

  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern" className="pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >

          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('about.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl transform -rotate-2"></div>
            <Image
              src="/hero-pattern.png"
              alt="Office"
              width={800}
              height={1000}
              className="rounded-2xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div>
            <h2 className="text-3xl font-display font-bold mb-6">{t('about.legacy_title')}</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {t('about.legacy_p1')}
            </p>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              {t('about.legacy_p2')}
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">50+</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{t('about.stats.clients')}</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">12</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{t('about.stats.countries')}</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">100%</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{t('about.stats.delivery')}</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">24/7</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{t('about.stats.support')}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="muted">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Target className="w-8 h-8" />, title: t('about.values.precision'), desc: t('about.values.precision_desc') },
            { icon: <Globe className="w-8 h-8" />, title: t('about.values.standard'), desc: t('about.values.standard_desc') },
            { icon: <Users className="w-8 h-8" />, title: t('about.values.partnership'), desc: t('about.values.partnership_desc') },
            { icon: <Award className="w-8 h-8" />, title: t('about.values.excellence'), desc: t('about.values.excellence_desc') },
          ].map((val, i) => (
            <Card key={i} className="bg-background border-none shadow-sm">
              <CardHeader>
                <div className="text-primary mb-2">{val.icon}</div>
                <CardTitle>{val.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{val.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section>
        <div className="mb-12 text-center">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('about.team.badge')}</span>
          <h2 className="text-4xl font-display font-bold">{t('about.team.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {!isLoadingTeam && teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-xl bg-muted/30 h-full flex flex-col">
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-display">{member.name}</h3>
                  <p className="text-sm text-accent mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{member.bio}</p>
                  {member.description && (
                    <p className="text-xs text-muted-foreground italic mb-4 line-clamp-2">{member.description}</p>
                  )}
                  {member.resumeUrl && (
                    <div className="mt-auto">
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <a href={member.resumeUrl} target="_blank" rel="noopener noreferrer">
                          {t('about.team.view_resume') || 'View Resume'}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}