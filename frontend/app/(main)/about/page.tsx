"use client";

import Section from "@/components/layout/Section";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, Globe, Target, Calendar, Trophy, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTeamMembers, usePlatformUpdates } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: teamMembers = [], isLoading: isLoadingTeam } = useTeamMembers();
  const { data: updates = [] } = usePlatformUpdates();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const events = updates.filter(u => u.type === 'event').slice(0, 3);
  const awards = updates.filter(u => u.type === 'achievement').slice(0, 4);

  const milestones = ["2020", "2021", "2022", "2023", "2024"];

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Immersive Hero Section - EXCLUSIVE BLACK ZONE */}
      <div className="relative h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.12)_0%,transparent_50%)] mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="outline" className="text-accent border-accent/40 bg-accent/10 px-5 py-2 text-xs backdrop-blur-md flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('about.badge', 'Our Story')}
                </Badge>
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight text-white">
              {t('about.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
              {t('about.description')}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Heritage</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-accent/50" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        {/* Horizontal separator */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* History Section */}
        <Section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">{t('about.history.badge')}</span>
            <h2 className="text-5xl font-display font-black mb-6 tracking-tight">{t('about.history.title')}</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-[4.5rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 relative">
              {milestones.map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative md:text-center group"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] md:left-1/2 md:top-[4.5rem] md:-translate-y-1/2 md:-translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-150" />
                  <div className="pl-8 md:pl-0 md:pt-24">
                    <span className="text-4xl font-display font-black text-accent/20 mb-2 block transition-colors duration-500 group-hover:text-accent">{year}</span>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{t(`about.history.milestones.${year}.title`)}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{t(`about.history.milestones.${year}.desc`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Legacy Section */}
        <Section background="muted" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-primary/5 rounded-[4rem] blur-3xl" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-background border border-border/50">
                <Image
                  src="/hero-pattern.png"
                  alt="Legacy"
                  width={800}
                  height={1000}
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-display font-black mb-8 leading-tight tracking-tight">{t('about.legacy_title')}</h2>
              <div className="space-y-6 mb-12">
                <p className="text-xl text-muted-foreground font-light leading-relaxed italic border-l-4 border-primary/20 pl-6">
                  {t('about.legacy_p1')}
                </p>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  {t('about.legacy_p2')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                {[
                  { val: "50+", label: t('about.stats.clients') },
                  { val: "12", label: t('about.stats.countries') },
                  { val: "100%", label: t('about.stats.delivery') },
                  { val: "24/7", label: t('about.stats.support') }
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <h3 className="text-5xl font-display font-black text-foreground mb-2 transition-transform duration-500 group-hover:-translate-y-1">{stat.val}</h3>
                    <div className="w-8 h-1 bg-primary/20 group-hover:w-full transition-all duration-700 rounded-full mb-3" />
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Values Section */}
        <Section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="w-10 h-10" />, title: t('about.values.precision'), desc: t('about.values.precision_desc') },
              { icon: <Globe className="w-10 h-10" />, title: t('about.values.standard'), desc: t('about.values.standard_desc') },
              { icon: <Users className="w-10 h-10" />, title: t('about.values.partnership'), desc: t('about.values.partnership_desc') },
              { icon: <Award className="w-10 h-10" />, title: t('about.values.excellence'), desc: t('about.values.excellence_desc') },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-background border border-border/50 hover:border-primary/30 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-700">
                  <CardHeader className="pb-4">
                    <div className="text-primary mb-6 p-4 bg-primary/5 w-fit rounded-2xl border border-primary/10">
                      {val.icon}
                    </div>
                    <CardTitle className="text-2xl font-display font-black tracking-tight">{val.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-light leading-relaxed">{val.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Awards Section */}
        <Section background="muted" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--accent),0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className="mb-16 text-center">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">{t('about.awards.badge')}</span>
            <h2 className="text-5xl font-display font-black tracking-tight">{t('about.awards.title')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.length > 0 ? awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-sm text-center border border-border/40 hover:border-accent/30 transition-all duration-700 group hover:-translate-y-2"
              >
                <div className="inline-flex p-5 rounded-full bg-accent/10 text-accent mb-8 transition-colors duration-700 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(var(--accent),0.3)]">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="font-black text-2xl mb-3 tracking-tight font-display">{award.title}</h3>
                <p className="text-sm text-muted-foreground font-light px-4 leading-relaxed">{award.summary}</p>
              </motion.div>
            )) : [1, 2, 3, 4].map((_, i) => (
              <div key={i} className="bg-background/50 p-10 rounded-[2.5rem] shadow-sm text-center border border-dashed border-border/60 opacity-60">
                <div className="inline-flex p-5 rounded-full bg-muted text-muted-foreground mb-8">
                  <Trophy className="w-10 h-10" />
                </div>
                <div className="h-4 w-2/3 bg-muted rounded mx-auto mb-3" />
                <div className="h-3 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </Section>

        {/* Team Section */}
        <Section className="py-24">
          <div className="mb-16 text-center">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">{t('about.team.badge')}</span>
            <h2 className="text-5xl font-display font-black tracking-tight">{t('about.team.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {!isLoadingTeam && teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="group relative overflow-hidden rounded-[2.5rem] bg-background border border-border/50 hover:border-primary/40 transition-all duration-700 h-full flex flex-col shadow-sm hover:shadow-2xl">
                  <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                  <div className="p-8 pt-0 relative -mt-20 z-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black font-display text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">{member.name}</h3>
                    <p className="text-xs font-bold text-accent mb-6 tracking-[0.2em] uppercase">{member.role}</p>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-4">{member.bio}</p>

                    <div className="mt-10 pt-6 border-t border-border/50 flex flex-col gap-3">
                      <div className="flex gap-4">
                        {member.resumeUrl && (
                          <Link href={member.resumeUrl} target="_blank" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                            Profile <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                        {member.portfolioUrl && (
                          <Link href={member.portfolioUrl} target="_blank" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                            Portfolio <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Final CTA Section */}
      <Section background="default" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-muted/20 border border-border relative overflow-hidden"
          >
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <h2 className="text-5xl font-display font-black text-foreground mb-8 tracking-tight">
              Grow with us.
            </h2>
            <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
              We're more than a platform. We are your partner in the long-term digital evolution of Iraq.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-2xl hover:shadow-primary/20">
                Contact Us
                <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
              <Link href="/news" className="inline-flex items-center gap-3 px-12 py-6 bg-background text-foreground border border-border font-black uppercase tracking-widest rounded-full hover:bg-muted transition-all">
                Latest News
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}