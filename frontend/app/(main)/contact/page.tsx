"use client";

import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();

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
          title: t('contact.form.success_title'),
          description: t('contact.form.success_desc'),
        });
        form.reset();
      } else {
        toast({
          title: t('contact.form.error_title'),
          description: t('contact.form.error_desc'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('contact.form.error_title'),
        description: t('contact.form.error_desc'),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">{t('contact.subtitle')}</span>
            <h1 className="text-5xl font-display font-bold mb-8">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground mb-12">
              {t('contact.description')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-display">{t('contact.email_us')}</h3>
                  <p className="text-muted-foreground">hello@shoka.com</p>
                  <p className="text-muted-foreground">careers@shoka.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-display">{t('contact.call_us')}</h3>
                  <p className="text-muted-foreground">+964 770 123 4567</p>
                  <p className="text-muted-foreground">{t('contact.mon_fri')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-display">{t('contact.visit_us')}</h3>
                  <p className="text-muted-foreground">{t('contact.address.line1')}</p>
                  <p className="text-muted-foreground">{t('contact.address.line2')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 shadow-xl border-border/60">
            <h2 className="text-2xl font-display font-bold mb-6">{t('contact.form.title')}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.form.placeholders.name')} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.placeholders.email')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.company')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.placeholders.company')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('contact.form.message')}
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full rounded-full">
                  {t('contact.form.submit')}
                </Button>
              </form>
            </Form>
          </Card>

        </div>
      </Section>
    </div>
  );
}
