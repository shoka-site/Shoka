"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { trackEvent } from "@/lib/analytics";

export function ContactForm({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const project = searchParams.get('project');
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, t('contact.form.validation.name')),
    email: z.string().email(t('contact.form.validation.email')),
    company: z.string().optional(),
    message: z.string().min(10, t('contact.form.validation.message')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  useEffect(() => {
    if (project) {
      form.setValue('message', `I am interested in the following project: ${decodeURIComponent(project)}`);
    }
  }, [project, form]);

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
        trackEvent("form_submit", { form_type: "contact", has_company: !!values.company });
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
    } catch {
      toast({
        title: t('contact.form.error_title', 'Error'),
        description: t('contact.form.error_desc', 'Something went wrong. Please try again.'),
        variant: "destructive",
      });
    }
  }

  return (
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
  );
}
