"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { getUtmData } from "@/lib/utm-tracker";
import { Gift, Users, ArrowRight, Check } from "lucide-react";

const BENEFITS = [
  { icon: "💰", en: "10% off your next project", ar: "خصم 10% على مشروعك القادم" },
  { icon: "🤝", en: "Your referral gets priority onboarding", ar: "إحالتك تحصل على أولوية في البدء" },
  { icon: "📊", en: "Track referral status in real-time", ar: "تابع حالة إحالتك في الوقت الفعلي" },
];

const HOW_IT_WORKS = [
  { step: "01", en: "Fill out the form below", ar: "أكمل النموذج أدناه" },
  { step: "02", en: "We contact your referral within 48h", ar: "نتواصل مع إحالتك خلال 48 ساعة" },
  { step: "03", en: "They sign — you both get rewarded", ar: "يوقعون — وكلاكما يحصل على مكافأة" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ReferralPageClient({ isRtl }: { isRtl: boolean }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ yourName: "", yourEmail: "", referralName: "", referralEmail: "", referralCompany: "", note: "" });

  const pick = (en: string, ar: string) => isRtl ? ar : en;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const utmData = getUtmData();
      const message = `[REFERRAL]\nReferrer: ${form.yourName} <${form.yourEmail}>\nReferred: ${form.referralName} <${form.referralEmail}>${form.referralCompany ? ` @ ${form.referralCompany}` : ""}\nNote: ${form.note || "—"}\n\n[UTM: ${JSON.stringify(utmData)}]`;

      const res = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.yourName, email: form.yourEmail, company: form.referralCompany, message }),
      });
      if (res.ok) {
        trackEvent("referral_submitted", { referrer_email: form.yourEmail });
        setSubmitted(true);
      } else {
        toast({ title: pick("Error", "خطأ"), description: pick("Please try again.", "يرجى المحاولة مرة أخرى."), variant: "destructive" });
      }
    } catch {
      toast({ title: pick("Error", "خطأ"), description: pick("Please try again.", "يرجى المحاولة مرة أخرى."), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero */}
      <div className="relative bg-black text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(194,164,92,0.14)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(#c2a45c 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
            <Gift className="w-3.5 h-3.5" />
            {pick("Referral Program", "برنامج الإحالة")}
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6"
            style={{ background: "linear-gradient(180deg,#fff 40%,#c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {pick("Grow Together", "نكبر معاً")}
          </h1>
          <p className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            {pick(
              "Know a business that needs digital transformation? Refer them and both of you win.",
              "هل تعرف شركة تحتاج إلى تحول رقمي؟ أحلها إلينا وكلاكما يكسب."
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Benefits */}
        <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {BENEFITS.map((b) => (
            <div key={b.en} className="flex items-start gap-4 p-6 rounded-2xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors">
              <span className="text-2xl">{b.icon}</span>
              <p className="font-semibold text-foreground leading-snug">{pick(b.en, b.ar)}</p>
            </div>
          ))}
        </FadeIn>

        {/* How it works */}
        <FadeIn delay={0.1} className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              {pick("How It Works", "كيف يعمل البرنامج")}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-0 max-w-3xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="flex-1 flex flex-col items-center text-center relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[60%] w-[80%] h-px bg-primary/20" />
                )}
                <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-black text-sm mb-4 relative z-10">
                  {step.step}
                </div>
                <p className="text-sm text-muted-foreground max-w-[160px] leading-relaxed">{pick(step.en, step.ar)}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.2} className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-16 bg-muted/20 border border-primary/20 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">{pick("Referral Submitted!", "تم تقديم الإحالة!")}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {pick("We'll reach out to your referral within 48 hours. Thank you!", "سنتواصل مع إحالتك خلال 48 ساعة. شكراً لك!")}
              </p>
              <Link href="/home" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                {pick("Back to Home", "العودة للرئيسية")}
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-950/80 border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-xl font-display font-bold text-white mb-1">{pick("Your Information", "معلوماتك")}</h2>
                <p className="text-white/40 text-sm">{pick("Who is making the referral?", "من يقدم الإحالة؟")}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { id: "yourName", label: { en: "Your Name", ar: "اسمك" }, required: true },
                  { id: "yourEmail", label: { en: "Your Email", ar: "بريدك الإلكتروني" }, type: "email", required: true },
                ].map(({ id, label, type = "text", required }) => (
                  <div key={id}>
                    <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{pick(label.en, label.ar)}</label>
                    <input
                      type={type}
                      required={required}
                      value={(form as Record<string, string>)[id]}
                      onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-8">
                <h3 className="text-lg font-bold text-white mb-1">{pick("Their Information", "معلومات من تحيله")}</h3>
                <p className="text-white/40 text-sm mb-5">{pick("Who are you referring?", "من تحيل إلينا؟")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { id: "referralName", label: { en: "Their Name", ar: "اسمه/اسمها" }, required: true },
                    { id: "referralEmail", label: { en: "Their Email", ar: "بريدهم الإلكتروني" }, type: "email", required: true },
                    { id: "referralCompany", label: { en: "Their Company", ar: "شركتهم" }, required: false },
                  ].map(({ id, label, type = "text", required }) => (
                    <div key={id} className={id === "referralCompany" ? "md:col-span-2" : ""}>
                      <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{pick(label.en, label.ar)}</label>
                      <input
                        type={type}
                        required={required}
                        value={(form as Record<string, string>)[id]}
                        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{pick("Add a note (optional)", "أضف ملاحظة (اختياري)")}</label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    rows={3}
                    placeholder={pick("Tell us anything helpful about this referral...", "أخبرنا بأي معلومات مفيدة عن هذه الإحالة...")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-primary/80 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(194,164,92,0.25)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? pick("Submitting...", "جارٍ الإرسال...") : pick("Submit Referral", "تقديم الإحالة")}
                {!submitting && <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />}
              </button>
              <p className="text-center text-white/25 text-xs">{pick("Your referral info is kept private and only used to make contact.", "معلومات إحالتك خاصة وتُستخدم فقط للتواصل معهم.")}</p>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
