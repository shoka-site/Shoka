"use client";

import Section from "@/components/layout/Section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const formSchema = z.object({
    name: z.string().min(2, t('contact.form.validation.name')),
    email: z.string().email(t('contact.form.validation.email')),
    company: z.string().optional(),
    message: z.string().min(10, t('contact.form.validation.message')),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/admin/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: t('contact.form.success_title', 'Success!'),
          description: t('contact.form.success_desc', 'Your message has been sent successfully.'),
        });
        form.reset();
      } else {
        toast({
          title: t('contact.form.error_title', 'Error'),
          description: t('contact.form.error_desc', 'Something went wrong. Please try again.'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('contact.form.error_title', 'Error'),
        description: t('contact.form.error_desc', 'Something went wrong. Please try again.'),
        variant: "destructive",
      });
    }
  }

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], ["0%", "40%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Immersive Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex flex-col justify-center overflow-hidden bg-black text-white pt-24 border-b border-border/10">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0 origin-top bg-gradient-to-br from-black via-zinc-900 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,164,92,0.12)_0%,transparent_50%)] mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        <div className="absolute top-32 left-0 w-full z-20 pointer-events-none">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-auto"
            >
              <Link href="/home" className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                <div className={`p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors ${isRtl ? 'rotate-180' : ''}`}>
                  <ArrowLeft className="w-4 h-4" />
                </div>
                {isRtl ? "العودة إلى الصفحة الرئيسية" : "Back to the home page"}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
          >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {t('contact.subtitle', 'Get in Touch')}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-white">
              {t('contact.title', 'Let\'s create something extraordinary together.')}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-8"></div>
          </motion.div>
        </div>
      </div>

      <div className="relative -mt-16 md:-mt-24 z-20 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 max-w-7xl mx-auto">
            
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />

                <h3 className="text-2xl font-display font-bold mb-8 text-foreground">
                   {isRtl ? 'معلومات التواصل' : 'Contact Information'}
                </h3>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.email_us')}</h4>
                      <p className="text-foreground font-medium text-lg">hello@shoka.com</p>
                      <p className="text-foreground font-medium text-lg">careers@shoka.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.call_us')}</h4>
                      <p className="text-foreground font-medium text-lg">+90 543 106 1211</p>
                      <p className="text-sm text-muted-foreground mt-1">{t('contact.mon_fri')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('contact.visit_us')}</h4>
                      <p className="text-foreground font-medium text-lg">{t('contact.address.line1')}</p>
                      <p className="text-foreground font-medium text-lg">{t('contact.address.line2')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="mb-10 text-center lg:text-start">
                   <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                     {t('contact.form.title', 'Send a direct message')}
                   </h2>
                   <p className="text-white/60 text-lg">
                     {t('contact.description', 'Fill out the form below and our team will get back to you within 24 hours.')}
                   </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10 w-full">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80 font-bold uppercase text-xs tracking-widest">{t('contact.form.name')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('contact.form.placeholders.name')} 
                              className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary rounded-xl px-5 transition-all outline-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80 font-bold uppercase text-xs tracking-widest">{t('contact.form.email')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t('contact.form.placeholders.email')} 
                                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary rounded-xl px-5 transition-all outline-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80 font-bold uppercase text-xs tracking-widest">{t('contact.form.company')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t('contact.form.placeholders.company')} 
                                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary rounded-xl px-5 transition-all outline-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80 font-bold uppercase text-xs tracking-widest">{t('contact.form.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('contact.form.placeholders.message', 'Tell us about your project...')}
                              className="min-h-[160px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary rounded-xl p-5 transition-all outline-none resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className={`w-full h-16 rounded-xl bg-primary text-black hover:bg-white font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(194,164,92,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 text-sm mt-8 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      {t('contact.form.submit', 'Send Message')}
                      <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
