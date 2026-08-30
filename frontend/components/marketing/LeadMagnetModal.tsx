"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { getUtmData } from "@/lib/utm-tracker";
import { X, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { generateGuidePdf } from "@/lib/generateGuidePdf";

export default function LeadMagnetModal() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRtl = i18n.dir() === "rtl";
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const triggerDownload = async () => {
    try {
      await generateGuidePdf({ name: name || "Valued Partner", email: email || "partner@sehle.iq", isRtl });
    } catch (e) {
      console.error("PDF Download failed", e);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setSubmitting(true);
    try {
      const utmData = getUtmData();
      const utmString = Object.keys(utmData).length > 0 
        ? `\n\n[UTM: ${JSON.stringify(utmData)}]` 
        : "";

      const res = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: "Lead Magnet Download",
          message: `Requested Digital Transformation Checklist (PDF).${utmString}`,
        }),
      });

      if (res.ok) {
        trackEvent("lead_magnet_download", { asset: "digital_transformation_checklist_pdf" });
        toast({
          title: t("lead_magnet.success_title", "Success!"),
          description: t("lead_magnet.success_desc", "Your PDF guide is downloading now."),
        });
        await triggerDownload();
        setOpen(false);
      } else {
        await triggerDownload();
        setOpen(false);
      }
    } catch {
      // fallback to trigger download even if server call fails
      await triggerDownload();
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Sticky Badge Button */}
      <div className={`fixed bottom-24 ${isRtl ? "left-6" : "right-6"} z-40 hidden sm:block`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-full shadow-[0_10px_35px_rgba(194,164,92,0.35)] border border-primary/20 hover:bg-white transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>{langOption(isRtl, "دليل التحول الرقمي", "Free Digital Guide")}</span>
        </motion.button>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-background border border-border rounded-3xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className={`text-center ${isRtl ? "text-right" : "text-left"}`}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Download className="w-6 h-6" />
                  </div>
                </div>

                <h2 className="text-2xl font-display font-black text-foreground mb-2">
                  {langOption(isRtl, "احصل على دليل التحول الرقمي مجاناً", "Get Free Digital Transformation Checklist")}
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {langOption(isRtl, "أدخل معلوماتك لتحميل قائمة الخطوات الأساسية لتحديث وتطوير أنظمة شركتك رقمياً.", "Download the checklist on how to transition your manual operations into integrated custom software.")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={langOption(isRtl, "الاسم الكريم", "Your name")}
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={langOption(isRtl, "بريدك الإلكتروني", "your@email.com")}
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary/80 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(194,164,92,0.25)] disabled:opacity-50"
                  >
                    {submitting
                      ? t("common.loading", "Loading...")
                      : langOption(isRtl, "تحميل الدليل الآن", "Download Guide Now")}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function langOption(isRtl: boolean, ar: string, en: string) {
  return isRtl ? ar : en;
}
