"use client";

import { useState } from "react";
import { X, CheckCircle, Send, Building2, User, Phone, Mail, Sparkles, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: "ar" | "en";
  isRtl: boolean;
  estimateSummary: {
    solutionTitle: string;
    scaleLabel: string;
    estimatedUsd: string;
    estimatedIqd: string;
    modulesCount: number;
  };
}

export function LeadCaptureModal({ isOpen, onClose, lang, isRtl, estimateSummary }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+964");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg(isRtl ? "يرجى كتابة الاسم ورقم الهاتف على الأقل." : "Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const fullPhone = `${countryCode} ${phone.trim()}`;
    const scopeNotes = `Scope: ${estimateSummary.solutionTitle} (${estimateSummary.scaleLabel}). Modules: ${estimateSummary.modulesCount}. Est: ${estimateSummary.estimatedUsd} / ${estimateSummary.estimatedIqd}`;

    try {
      const cleanEmail = email.trim();
      const validEmail = cleanEmail && cleanEmail.includes("@")
        ? cleanEmail
        : `phone.${phone.replace(/\D/g, "") || Date.now()}@sehle-lead.iq`;

      const res = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: validEmail,
          company: company.trim() || undefined,
          message: `[QUOTE CALCULATOR - ${estimateSummary.solutionTitle}] Phone: ${fullPhone}\n${scopeNotes}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMsg(isRtl ? "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً." : "Submission failed, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir={isRtl ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-foreground"
      >
        {/* Background Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {isRtl ? "تم إرسال طلب التقدير بنجاح!" : "Proposal Request Received!"}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              {isRtl
                ? "شكراً لك. سيتواصل معك أحد مهندسي شركة سهلة خلال 24 ساعة لتزويدك بالعرض الفني الرسمي."
                : "Thank you. A senior engineer from Sehle will contact you within 24 hours with your official proposal."}
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-black font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-primary/80 transition-all shadow-lg"
            >
              {isRtl ? "إغلاق النافذة" : "Done"}
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? "عرض فني ودراسة جدوى مجانية" : "Free Audit & Official Proposal"}</span>
            </div>

            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              {isRtl ? "احصل على العرض الرسمي والمواصفات" : "Request Detailed Proposal"}
            </h3>

            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              {isRtl
                ? "أدخل بياناتك لتصلك مواصفات النظام والدراسة التفصيلية المبنية على خياراتك الحالية."
                : "Enter your contact details to receive the full technical specification breakdown."}
            </p>

            {/* Scope Summary Preview Box */}
            <div className="bg-muted/40 border border-border/50 p-4 rounded-2xl mb-6 text-xs space-y-1">
              <div className="flex items-center justify-between text-foreground font-bold">
                <span>{estimateSummary.solutionTitle}</span>
                <span className="text-primary font-mono">{estimateSummary.estimatedUsd}</span>
              </div>
              <div className="text-muted-foreground text-[11px]">{estimateSummary.scaleLabel} • {estimateSummary.modulesCount} {isRtl ? "وحدات مختارة" : "modules selected"}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5">
                  {isRtl ? "الاسم الكامل *" : "Full Name *"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isRtl ? "مثال: د. علي الحسيني" : "e.g., Ali Al-Hassani"}
                    className="w-full bg-muted/50 border border-border rounded-xl py-2.5 px-3.5 pr-10 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <User className={`w-4 h-4 text-muted-foreground/50 absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3" : "right-3"}`} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5">
                  {isRtl ? "رقم الهاتف / الواتساب *" : "Phone Number / WhatsApp *"}
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-muted/50 border border-border rounded-xl px-2 text-xs text-primary font-bold font-mono focus:outline-none"
                  >
                    <option value="+964">🇮🇶 +964 (العراق)</option>
                    <option value="+90">🇹🇷 +90 (تركيا)</option>
                    <option value="+971">🇦🇪 +971 (الإمارات)</option>
                    <option value="+1">🇺🇸 +1 (US)</option>
                  </select>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="770 123 4567"
                      className="w-full bg-muted/50 border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5">
                  {isRtl ? "اسم الشركة / المؤسسة (اختياري)" : "Company / Enterprise Name (Optional)"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={isRtl ? "مثال: مجموعة بابل للتجارة" : "e.g., Babel Logistics Ltd."}
                    className="w-full bg-muted/50 border border-border rounded-xl py-2.5 px-3.5 pr-10 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <Building2 className={`w-4 h-4 text-muted-foreground/50 absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3" : "right-3"}`} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all shadow-[0_4px_20px_rgba(194,164,92,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{isRtl ? "إرسال طلب العرض الفني" : "Submit Proposal Request"}</span>
                    <Send className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
