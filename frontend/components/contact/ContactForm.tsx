"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check, Briefcase, Handshake, LifeBuoy } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { trackEvent } from "@/lib/analytics";
import { getUtmData } from "@/lib/utm-tracker";
import { motion, AnimatePresence } from "framer-motion";

type InquiryType = "project" | "partnership" | "support";

export function ContactForm({ isRtl }: { isRtl: boolean }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const project = searchParams.get('project');
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [inquiryType, setInquiryType] = useState<InquiryType>("project");

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
      const utmData = getUtmData();
      const utmString = Object.keys(utmData).length > 0 
        ? `\n\n[UTM: ${JSON.stringify(utmData)}]` 
        : "";

      const response = await fetch('/api/admin/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          message: `[${inquiryType.toUpperCase()}] ${values.message}${utmString}`
        }),
      });

      if (response.ok) {
        trackEvent("form_submit", { form_type: "contact", inquiry_type: inquiryType, has_company: !!values.company });
        toast({
          title: t('contact.form.success_title', 'Success!'),
          description: t('contact.form.success_desc', 'Your message has been sent successfully.'),
        });
        form.reset();
        setStep(1);
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

  const handleNextStep = async () => {
    const isValid = await form.trigger(["name", "email"]);
    if (isValid) {
      setStep(2);
      trackEvent("contact_step_completed", { step: 1 });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10 w-full">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 1 ? 'bg-primary text-black' : 'bg-white/10 text-white/50'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : "1"}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              {t('contact.form.step1_label', 'Your Info')}
            </span>
          </div>
          
          <div className="flex-1 h-[2px] bg-white/10 mx-4 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
              style={{ width: step > 1 ? "100%" : "0%" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === 2 ? 'bg-primary text-black' : 'bg-white/10 text-white/50'
            }`}>
              2
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              {t('contact.form.step2_label', 'Project Info')}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* ── Inquiry Type Selector — Form CRO §12 ── */}
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
                  {isRtl ? "نوع الاستفسار" : "Inquiry Type"}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "project" as InquiryType, icon: Briefcase, en: "Project", ar: "مشروع" },
                    { id: "partnership" as InquiryType, icon: Handshake, en: "Partnership", ar: "شراكة" },
                    { id: "support" as InquiryType, icon: LifeBuoy, en: "Support", ar: "دعم" },
                  ]).map(({ id, icon: Icon, en, ar }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setInquiryType(id);
                        // Pre-fill message placeholder based on type
                        if (!form.getValues("message") || form.getValues("message").startsWith("I") || form.getValues("message").startsWith("أ")) {
                          const msgs: Record<InquiryType, string> = {
                            project: isRtl ? "أود مناقشة مشروع برمجي جديد يتعلق بـ..." : "I would like to discuss a new software project regarding...",
                            partnership: isRtl ? "مهتم بإمكانية الشراكة التجارية مع سهلة في مجال..." : "I am interested in a business partnership with Sehle in the area of...",
                            support: isRtl ? "أحتاج إلى دعم تقني يتعلق بـ..." : "I need technical support related to...",
                          };
                          form.setValue("message", msgs[id]);
                        }
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        inquiryType === id
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-white/10 bg-white/3 text-white/40 hover:border-white/20 hover:text-white/70"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {isRtl ? ar : en}
                    </button>
                  ))}
                </div>
              </div>
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

              <Button 
                type="button" 
                onClick={handleNextStep}
                size="lg" 
                className={`w-full h-16 rounded-xl bg-primary text-black hover:bg-white font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(194,164,92,0.3)] flex items-center justify-center gap-3 text-sm mt-8 ${isRtl ? 'flex-row-reverse' : ''}`}
              >
                {t('contact.form.next_step', 'Next Step')}
                <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
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

              <div className="flex gap-4 mt-8">
                <Button 
                  type="button" 
                  onClick={() => setStep(1)}
                  variant="outline"
                  size="lg" 
                  className={`w-1/3 h-16 rounded-xl border border-white/10 text-white bg-transparent hover:bg-white/5 font-bold flex items-center justify-center gap-2 text-sm`}
                >
                  <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  {t('contact.form.back', 'Back')}
                </Button>
                <div className="flex-1 flex flex-col gap-1.5">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className={`w-full h-16 rounded-xl bg-primary text-black hover:bg-white font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(194,164,92,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    {t('contact.form.submit', 'Send Message')}
                    <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                  </Button>
                  {/* Social proof near submit — Form CRO §12 */}
                  <p className="text-center text-white/25 text-[10px] tracking-wide">
                    {isRtl ? "انضم إلى 20+ شركة تثق في سهلة" : "Join 20+ companies that trust Sehle"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
}
