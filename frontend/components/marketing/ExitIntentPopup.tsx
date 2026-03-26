"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "exit_popup_dismissed";
const DISMISS_DAYS = 7;

export default function ExitIntentPopup() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.dir() === "rtl";
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isDismissed = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      const dismissedAt = parseInt(stored, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      return daysSince < DISMISS_DAYS;
    } catch {
      return false;
    }
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    if (isDismissed()) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setOpen(true);
        trackEvent("exit_intent_shown");
      }
    };

    // Delay attaching listener to avoid firing on initial page load
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDismissed]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: "",
          message: "Lead from exit-intent popup — requesting free consultation.",
        }),
      });

      if (res.ok) {
        trackEvent("form_submit", { form_type: "exit_intent" });
        toast({
          title: t("exit_popup.success_title", "Thank you!"),
          description: t("exit_popup.success_desc", "We'll be in touch within 24 hours."),
        });
        dismiss();
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-black border border-primary/30 rounded-3xl p-8 shadow-[0_20px_60px_rgba(194,164,92,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative gradient */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />

            <div className={`text-center ${isRtl ? "text-right" : "text-left"}`}>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              <h2 className="text-2xl font-display font-black text-white mb-2">
                {t("exit_popup.title", "Wait — before you go!")}
              </h2>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                {t("exit_popup.description", "Book a free consultation and let us help you build your digital future.")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("exit_popup.name_placeholder", "Your name")}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("exit_popup.email_placeholder", "your@email.com")}
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary/80 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(194,164,92,0.25)] disabled:opacity-50"
                >
                  {submitting
                    ? t("common.loading", "Loading...")
                    : t("exit_popup.cta", "Get Free Consultation")}
                </button>
              </form>

              <button
                onClick={dismiss}
                className="mt-3 text-xs text-white/30 hover:text-white/50 transition-colors"
              >
                {t("exit_popup.dismiss", "No thanks, I'm just browsing")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
