"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { getUtmData } from "@/lib/utm-tracker";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollPopupProps {
  /** Trigger mode:
   *  - "scroll"  → appears after scrolling `scrollThreshold`% of the page
   *  - "timeout" → appears after `delayMs` milliseconds
   */
  mode: "scroll" | "timeout";
  /** Scroll depth (0–100) to trigger on. Only used when mode="scroll". Default: 60 */
  scrollThreshold?: number;
  /** Milliseconds before popup appears. Only used when mode="timeout". Default: 45000 */
  delayMs?: number;
  /** Storage key for frequency capping — must be unique per popup instance */
  storageKey: string;
  /** Days before the popup shows again after being dismissed */
  suppressDays?: number;
  /** Headline text (en / ar) */
  title: { en: string; ar: string };
  /** Sub-copy text (en / ar) */
  description: { en: string; ar: string };
  /** CTA button label (en / ar) */
  cta: { en: string; ar: string };
  /** Dismiss text */
  dismissLabel?: { en: string; ar: string };
  /** GA4 event name fired when popup is shown */
  showEvent?: string;
  /** GA4 event name fired on form submission */
  submitEvent?: string;
  /** Form type tag included in the GA4 form_submit event */
  formType?: string;
}

export default function ScrollTriggerPopup({
  mode,
  scrollThreshold = 60,
  delayMs = 45000,
  storageKey,
  suppressDays = 7,
  title,
  description,
  cta,
  dismissLabel,
  showEvent = "scroll_popup_shown",
  submitEvent = "form_submit",
  formType = "scroll_popup",
}: ScrollPopupProps) {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.dir() === "rtl";

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isSuppressed = useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return false;
      const ts = parseInt(stored, 10);
      return (Date.now() - ts) / (1000 * 60 * 60 * 24) < suppressDays;
    } catch {
      return false;
    }
  }, [storageKey, suppressDays]);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(storageKey, Date.now().toString());
    } catch {
      /* localStorage unavailable */
    }
  }, [storageKey]);

  // ── Trigger logic ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isSuppressed()) return;
    let triggered = false;

    if (mode === "scroll") {
      const handleScroll = () => {
        if (triggered) return;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;
        const pct = Math.round(
          ((window.scrollY || document.documentElement.scrollTop) / scrollHeight) * 100
        );
        if (pct >= scrollThreshold) {
          triggered = true;
          setOpen(true);
          trackEvent(showEvent);
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (mode === "timeout") {
      const timer = setTimeout(() => {
        triggered = true;
        setOpen(true);
        trackEvent(showEvent);
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [isSuppressed, mode, scrollThreshold, delayMs, showEvent]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSubmitting(true);

    try {
      const utmData = getUtmData();
      const utmString =
        Object.keys(utmData).length > 0
          ? `\n\n[UTM: ${JSON.stringify(utmData)}]`
          : "";

      const res = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: "",
          message: `Lead from ${formType} popup.${utmString}`,
        }),
      });

      if (res.ok) {
        trackEvent(submitEvent, { form_type: formType });
        toast({
          title: isRtl ? "شكراً لك!" : "Thank you!",
          description: isRtl
            ? "سنتواصل معك خلال 24 ساعة."
            : "We'll be in touch within 24 hours.",
        });
        dismiss();
      }
    } catch {
      /* silently fail */
    } finally {
      setSubmitting(false);
    }
  }

  const pick = (en: string, ar: string) => (isRtl ? ar : en);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-md bg-black border border-primary/30 rounded-3xl p-8 shadow-[0_24px_80px_rgba(194,164,92,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/25 rounded-full blur-[56px] pointer-events-none" />

            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className={isRtl ? "text-right" : "text-left"}>
              <h2 className="text-xl font-display font-black text-white mb-2">
                {pick(title.en, title.ar)}
              </h2>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                {pick(description.en, description.ar)}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isRtl ? "اسمك الكريم" : "Your name"}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRtl ? "بريدك الإلكتروني" : "your@email.com"}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary/80 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(194,164,92,0.25)] disabled:opacity-50 flex items-center justify-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  {submitting
                    ? (isRtl ? "جارٍ الإرسال..." : "Sending...")
                    : pick(cta.en, cta.ar)}
                  {!submitting && <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />}
                </button>
              </form>

              <button
                onClick={dismiss}
                className="mt-3 text-xs text-white/30 hover:text-white/50 transition-colors w-full text-center"
              >
                {dismissLabel
                  ? pick(dismissLabel.en, dismissLabel.ar)
                  : isRtl
                  ? "لا شكراً، سأتصفح لوحدي"
                  : "No thanks, I'm just browsing"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
