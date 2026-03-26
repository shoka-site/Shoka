"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Send } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
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
    <footer className="bg-[#080808] text-white py-16 border-t border-[rgba(194,164,92,0.15)]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-display font-bold mb-2 text-white">
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-6">SHOKA</h2>
            <p className="text-white/60 max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">{t('footer.sitemap')}</h3>
            <ul className="space-y-4">
              <li><Link href="/home" className="text-white/60 hover:text-white transition-colors">{t('footer.links.home')}</Link></li>
              <li><Link href="/services" className="text-white/60 hover:text-white transition-colors">{t('footer.links.services')}</Link></li>
              <li><Link href="/projects" className="text-white/60 hover:text-white transition-colors">{t('footer.links.portfolio')}</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">{t('footer.connect')}</h3>
            <ul className="space-y-4">
              <li><a href="https://www.linkedin.com/company/shoka-global/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.linkedin')}</a></li>
              <li><a href="https://x.com/shoka_it" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.twitter')}</a></li>
              <li><a href="https://www.instagram.com/shoka.it/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.instagram')}</a></li>
              <li><a href="https://www.tiktok.com/@shoka.it" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.tiktok')}</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61578501381386" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.facebook')}</a></li>
              <li><a href="mailto:global@shoka.site" className="text-white/60 hover:text-white transition-colors">global@shoka.site</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}