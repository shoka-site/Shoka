"use client";

import Section from "@/components/ui/section";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Users, Globe, Target, Linkedin, Twitter, Mail, Calendar, Milestone, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTeamMembers, usePlatformUpdates } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";

export default function About() {
  const { t, i18n } = useTranslation();
  const { data: teamMembers = [], isLoading: isLoadingTeam } = useTeamMembers();
  const { data: updates = [] } = usePlatformUpdates();

  const events = updates.filter(u => u.type === 'event').slice(0, 3);
  const awards = updates.filter(u => u.type === 'achievement').slice(0, 4);

  const isRTL = i18n.language === 'ar';

  const milestones = ["2020", "2021", "2022", "2023", "2024"];

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

      {/* History Section */}
      <Section>
        <div className="mb-12">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('about.history.badge')}</span>
          <h2 className="text-4xl font-display font-bold mb-6">{t('about.history.title')}</h2>
        </div>

        <div className="relative border-l border-muted ml-4 md:ml-0 md:border-l-0">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-muted -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {milestones.map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 md:pl-0 md:text-center"
              >
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 z-10" />
                <div className="md:pt-12">
                  <span className="text-3xl font-display font-bold text-accent mb-2 block">{year}</span>
                  <h3 className="font-bold mb-2">{t(`about.history.milestones.${year}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`about.history.milestones.${year}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="muted">
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

      {/* Events Section */}
      {events.length > 0 && (
        <Section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('about.events.badge')}</span>
              <h2 className="text-4xl font-display font-bold">{t('about.events.title')}</h2>
            </div>
            <Button variant="outline" asChild>
              <a href="/news">{t('about.events.view_all')}</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-muted hover:border-accent/50 transition-colors group">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium">{new Date(event.date).toLocaleDateString(i18n.language)}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{event.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Awards Section */}
      <Section background="muted">
        <div className="mb-12 text-center">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('about.awards.badge')}</span>
          <h2 className="text-4xl font-display font-bold">{t('about.awards.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.length > 0 ? awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl shadow-sm text-center border border-transparent hover:border-accent/20 transition-all group"
            >
              <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">{award.title}</h3>
              <p className="text-sm text-muted-foreground">{award.summary}</p>
            </motion.div>
          )) : (
            // Placeholder awards if none in database
            [1, 2, 3, 4].map((_, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl shadow-sm text-center border border-transparent opacity-50 grayscale">
                <div className="inline-flex p-4 rounded-full bg-muted text-muted-foreground mb-6">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="h-4 w-2/3 bg-muted rounded mx-auto mb-2" />
                <div className="h-3 w-full bg-muted rounded" />
              </div>
            ))
          )}
        </div>
      </Section>

      <Section>
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
      <Section background="muted">
        <div className="mb-12 text-center">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('about.team.badge')}</span>
          <h2 className="text-4xl font-display font-bold">{t('about.team.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {!isLoadingTeam && teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-2xl bg-background border border-muted hover:border-accent/30 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl">
                <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">{member.role}</p>
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">{member.bio}</p>
                  <div className="mt-8 pt-6 border-t border-muted grid grid-cols-2 gap-3">
                    {member.resumeUrl && (
                      <Button variant="outline" size="sm" asChild className="rounded-full">
                        <a href={member.resumeUrl} target="_blank" rel="noopener noreferrer">
                          Resume
                        </a>
                      </Button>
                    )}
                    {member.portfolioUrl && (
                      <Button variant="default" size="sm" asChild className="rounded-full shadow-lg shadow-primary/20">
                        <a href={member.portfolioUrl} target="_blank" rel="noopener noreferrer">
                          Portfolio
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}