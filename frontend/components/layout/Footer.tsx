"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Send } from "lucide-react";

interface FooterProps {
  lang: "en" | "ar";
}

export default function Footer({ lang }: FooterProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          company: "",
          message: "Newsletter signup from footer.",
        }),
      });
      if (res.ok) {
        trackEvent("form_submit", { form_type: "newsletter" });
        toast({
          title: t("footer.newsletter.success", "Subscribed!"),
          description: t("footer.newsletter.success_desc", "You'll hear from us soon."),
        });
        setEmail("");
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-[#080808] text-white py-12 pb-32 md:py-16 md:pb-16 border-t border-[rgba(194,164,92,0.15)]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-base font-display font-bold mb-2 text-white">
              {t("footer.newsletter.title", "Stay in the loop")}
            </h3>
            <p className="text-white/50 text-sm mb-4">
              {t("footer.newsletter.description", "Get updates on our latest projects and insights.")}
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder", "your@email.com")}
                aria-label={t("footer.newsletter.input_label", "Email address for newsletter")}
                className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-12 px-6 bg-primary text-black font-bold text-sm rounded-xl hover:bg-primary/80 active:scale-95 transition-all shadow-[0_5px_15px_rgba(194,164,92,0.2)] disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t("footer.newsletter.button", "Subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1: Brand & Contact Info */}
          <div>
            <h2 className="text-xl font-display font-bold mb-4 text-white">Sehle | سهلة</h2>
            <p className="text-white/60 leading-relaxed text-xs md:text-sm mb-4">
              {t('footer.desc')}
            </p>
            <div className="text-xs text-white/40 space-y-1">
              <p>{lang === "ar" ? "البريد الإلكتروني:" : "Email:"} <a href="mailto:sehle.iq@gmail.com" className="text-primary hover:underline">sehle.iq@gmail.com</a></p>
              <p>{lang === "ar" ? "المقر الرئيسي:" : "Headquarters:"} Kızılay, Ankara, TR | Operations: Iraq</p>
            </div>
          </div>

          {/* Col 2: Core Solutions & Packages */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{lang === "ar" ? "الأنظمة والحلول" : "Solutions & Products"}</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><Link href="/services/" className="text-white/60 hover:text-white transition-colors">{t('footer.links.services')}</Link></li>
              <li><Link href="/packages/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "باقات الحلول" : "Packages"}</Link></li>
              <li><Link href="/industries/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "القطاعات المستهدفة" : "Industries"}</Link></li>
              <li><Link href="/projects/" className="text-white/60 hover:text-white transition-colors">{t('footer.links.portfolio')}</Link></li>
              <li><Link href="/quote-calculator/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "حاسبة تكلفة المشروع" : "Quote Calculator"}</Link></li>
            </ul>
          </div>

          {/* Col 3: Comparison & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{lang === "ar" ? "المقارنات والريادة" : "Compare & Learn"}</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><Link href="/compare/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "مقارنة الخيارات البرمجية" : "Compare Options"}</Link></li>
              <li><Link href="/glossary/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "قاموس المصطلحات" : "Technical Glossary"}</Link></li>
              <li><Link href="/blog/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "المدونة التقنية" : "Engineering Blog"}</Link></li>
              <li><Link href="/social-kit/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "حقيبة النشر والإعلام" : "Social Kit"}</Link></li>
              <li><Link href="/refer/" className="text-white/60 hover:text-white transition-colors">{lang === "ar" ? "برنامج الشراكة والإحالة" : "Referral Program"}</Link></li>
            </ul>
          </div>

          {/* Col 4: Social Platforms & Channels */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{lang === "ar" ? "وسائل التواصل الاجتماعي" : "Follow & Connect"}</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><a href="https://www.linkedin.com/company/sehle/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.linkedin')}</a></li>
              <li><a href="https://x.com/sehle_it" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.twitter')}</a></li>
              <li><a href="https://www.instagram.com/sehle.it/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.instagram')}</a></li>
              <li><a href="https://www.tiktok.com/@sehle.it" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.tiktok')}</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61575488387547" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.facebook')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}