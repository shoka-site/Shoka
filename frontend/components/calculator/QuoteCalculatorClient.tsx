"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Users, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  DollarSign,
  Building2,
  Smartphone,
  ShoppingCart,
  Database
} from "lucide-react";

interface Props {
  lang: "ar" | "en";
  isRtl: boolean;
}

interface SolutionType {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  basePriceUsd: number;
  baseWeeks: number;
  icon: any;
}

const SOLUTION_TYPES: SolutionType[] = [
  {
    id: "erp",
    titleEn: "Custom Enterprise ERP",
    titleAr: "نظام ERP مؤسسي مخصص",
    descEn: "Full-scale resource planning, inventory, accounting & operations.",
    descAr: "تخطيط شامل للموارد والمخازن والمالية والعمليات التشغيلية.",
    basePriceUsd: 2500,
    baseWeeks: 4,
    icon: Building2,
  },
  {
    id: "pos",
    titleEn: "Multi-Warehouse POS & Stock",
    titleAr: "نظام مبيعات ومخازن متعددة",
    descEn: "Real-time point-of-sale with offline sync and stock tracking.",
    descAr: "نقاط بيع فورية مع مزامنة دون إنترنت وتتبع للمخزون.",
    basePriceUsd: 1800,
    baseWeeks: 3,
    icon: Database,
  },
  {
    id: "mobile",
    titleEn: "Custom Mobile App (iOS/Android)",
    titleAr: "تطبيق هاتف مخصص (آيفون وأندرويد)",
    descEn: "Native performance mobile application with API backend.",
    descAr: "تطبيق هاتف عالي الأداء مع لوحة تحكم وواجهات برمجة.",
    basePriceUsd: 2000,
    baseWeeks: 4,
    icon: Smartphone,
  },
  {
    id: "ecommerce",
    titleEn: "B2B / B2C E-Commerce System",
    titleAr: "منصة تجارة إلكترونية متكاملة",
    descEn: "Digital storefront, automated ordering, and payment integrations.",
    descAr: "متجر رقمي مع أتمتة الطلبات وتكامل وسائل الدفع.",
    basePriceUsd: 1500,
    baseWeeks: 3,
    icon: ShoppingCart,
  },
];

interface ScaleOption {
  id: string;
  labelEn: string;
  labelAr: string;
  multiplier: number;
}

const SCALES: ScaleOption[] = [
  { id: "small", labelEn: "1 – 10 Active Users", labelAr: "1 – 10 مستخدمين", multiplier: 1.0 },
  { id: "medium", labelEn: "11 – 50 Active Users", labelAr: "11 – 50 مستخدم", multiplier: 1.35 },
  { id: "enterprise", labelEn: "50+ Active Users (Enterprise)", labelAr: "أكثر من 50 مستخدم (مؤسسي)", multiplier: 1.7 },
];

interface FeatureOption {
  id: string;
  titleEn: string;
  titleAr: string;
  priceUsd: number;
  addWeeks: number;
}

const MODULE_OPTIONS: FeatureOption[] = [
  { id: "offline", titleEn: "Offline-First State Sync", titleAr: "المزامنة والعمل دون اتصال بالإنترنت", priceUsd: 800, addWeeks: 1 },
  { id: "tax", titleEn: "Iraqi Tax & Multi-Currency Accounting", titleAr: "المحاسبة والضرائب المتعددة العملات (د.ع / $)", priceUsd: 600, addWeeks: 1 },
  { id: "hr", titleEn: "HR, Payroll & Attendance", titleAr: "الموارد البشرية والرواتب والبصمة", priceUsd: 700, addWeeks: 1 },
  { id: "whatsapp", titleEn: "Automated WhatsApp / SMS Gateway", titleAr: "أتمتة إشعارات واتساب والرسائل القصيرة", priceUsd: 400, addWeeks: 0.5 },
  { id: "reports", titleEn: "AI Analytics & Executive Dashboards", titleAr: "تحليلات الذكاء الاصطناعي ولوحات الإدارة", priceUsd: 500, addWeeks: 0.5 },
];

import { LeadCaptureModal } from "./LeadCaptureModal";

export function QuoteCalculatorClient({ lang, isRtl }: Props) {
  const [step, setStep] = useState<number>(1);
  const [selectedSolution, setSelectedSolution] = useState<string>("erp");
  const [selectedScale, setSelectedScale] = useState<string>("small");
  const [selectedModules, setSelectedModules] = useState<string[]>(["offline", "tax"]);
  const [currency, setCurrency] = useState<"USD" | "IQD">("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const solutionObj = SOLUTION_TYPES.find((s) => s.id === selectedSolution) || SOLUTION_TYPES[0];
  const scaleObj = SCALES.find((s) => s.id === selectedScale) || SCALES[0];

  // Calculate price estimate
  const modulesPrice = selectedModules.reduce((sum, modId) => {
    const mod = MODULE_OPTIONS.find((m) => m.id === modId);
    return sum + (mod ? mod.priceUsd : 0);
  }, 0);

  const rawPriceUsd = Math.round((solutionObj.basePriceUsd + modulesPrice) * scaleObj.multiplier);
  const minPriceUsd = Math.round(rawPriceUsd * 0.9);
  const maxPriceUsd = Math.round(rawPriceUsd * 1.15);

  const IQD_RATE = 1500;
  const minPriceIqd = (minPriceUsd * IQD_RATE).toLocaleString();
  const maxPriceIqd = (maxPriceUsd * IQD_RATE).toLocaleString();

  // Calculate timeline
  const modulesWeeks = selectedModules.reduce((sum, modId) => {
    const mod = MODULE_OPTIONS.find((m) => m.id === modId);
    return sum + (mod ? mod.addWeeks : 0);
  }, 0);
  const totalWeeksMin = Math.round(solutionObj.baseWeeks + modulesWeeks);
  const totalWeeksMax = totalWeeksMin + 2;

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const contactScope = encodeURIComponent(
    `Estimate: ${solutionObj.titleEn} (${scaleObj.labelEn}) with modules: ${selectedModules.join(", ")}. Est: $${minPriceUsd}-$${maxPriceUsd}`
  );

  return (
    <div className="bg-background min-h-screen text-foreground py-24 selection:bg-primary/30 selection:text-primary relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Dynamic Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
              <Calculator className="w-4 h-4" />
              <span>{isRtl ? "حاسبة التكلفة والمدى الزمني" : "Interactive Scope & Budget Estimator"}</span>
            </div>

            {/* Currency Selector Toggle */}
            <div className="inline-flex items-center bg-black/60 border border-white/10 rounded-full p-1 text-xs font-bold">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-full transition-all ${currency === "USD" ? "bg-primary text-black font-extrabold" : "text-white/60 hover:text-white"}`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("IQD")}
                className={`px-3 py-1 rounded-full transition-all ${currency === "IQD" ? "bg-primary text-black font-extrabold" : "text-white/60 hover:text-white"}`}
              >
                IQD (د.ع)
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
            {isRtl ? "احسب تكلفة نظامك الرقمي مجاناً" : "Estimate Your Custom Software Cost"}
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {isRtl
              ? "حدد نوع الحل والوحدات المطلوبة للحصول على تقدير فوري للتكلفة والجدول الزمني لمشروعك البرمجي في العراق."
              : "Select your required system modules to generate an instant budget and timeline estimation tailored to your operations."}
          </p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          {[
            { stepNum: 1, label: isRtl ? "نوع النظام" : "Solution" },
            { stepNum: 2, label: isRtl ? "حجم العمليات" : "Scale" },
            { stepNum: 3, label: isRtl ? "الوحدات" : "Modules" },
            { stepNum: 4, label: isRtl ? "النتيجة" : "Estimate" },
          ].map((s) => {
            const isActive = step >= s.stepNum;
            const isCurrent = step === s.stepNum;
            return (
              <button
                key={s.stepNum}
                onClick={() => setStep(s.stepNum)}
                className={`relative z-10 flex flex-col items-center gap-2 transition-all group focus:outline-none`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg ${
                    isCurrent
                      ? "bg-primary text-black scale-110 ring-4 ring-primary/20"
                      : isActive
                      ? "bg-primary/20 border border-primary text-primary"
                      : "bg-zinc-900 border border-white/10 text-white/40"
                  }`}
                >
                  {s.stepNum}
                </div>
                <span className={`text-xs font-medium ${isCurrent ? "text-primary font-bold" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Card Body */}
        <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl mb-12">
          {/* Step 1: Solution Type */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <span>{isRtl ? "1. اختر نوع الحل البرمجي المطلوب:" : "1. Select Required Solution Type:"}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SOLUTION_TYPES.map((sol) => {
                  const Icon = sol.icon;
                  const isSelected = selectedSolution === sol.id;
                  return (
                    <div
                      key={sol.id}
                      onClick={() => setSelectedSolution(sol.id)}
                      className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-[0_0_30px_rgba(194,164,92,0.15)] ring-1 ring-primary"
                          : "bg-zinc-900/40 border-white/5 hover:border-white/20 hover:bg-zinc-900/80"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${isSelected ? "bg-primary text-black" : "bg-white/5 text-primary"}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg mb-1">{isRtl ? sol.titleAr : sol.titleEn}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{isRtl ? sol.descAr : sol.descEn}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Scale & Active Users */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>{isRtl ? "2. حدد عدد مستخدمي النظام وحجم العمليات:" : "2. Select Operation Scale & Active Users:"}</span>
              </h2>

              <div className="space-y-4">
                {SCALES.map((scale) => {
                  const isSelected = selectedScale === scale.id;
                  return (
                    <div
                      key={scale.id}
                      onClick={() => setSelectedScale(scale.id)}
                      className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-primary/10 border-primary ring-1 ring-primary"
                          : "bg-zinc-900/40 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="font-bold text-white text-base">
                        {isRtl ? scale.labelAr : scale.labelEn}
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary text-black" : "border-white/20"}`}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Modules & Features */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <span>{isRtl ? "3. حدد الوحدات البرمجية المتقدمة:" : "3. Choose Advanced Operational Modules:"}</span>
              </h2>

              <div className="space-y-3">
                {MODULE_OPTIONS.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-primary/10 border-primary"
                          : "bg-zinc-900/40 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white text-sm mb-0.5">{isRtl ? mod.titleAr : mod.titleEn}</div>
                        <div className="text-xs text-primary font-mono">+${mod.priceUsd} USD</div>
                      </div>

                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${isChecked ? "bg-primary border-primary text-black" : "border-white/20 bg-black/40"}`}>
                        {isChecked && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Final Output Estimate */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center pb-6 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? "التقدير المستهدف المبدئي" : "Estimated Development Budget"}</span>
                </div>

                <div className="text-4xl md:text-5xl font-black text-white font-mono mb-2">
                  {currency === "USD" ? (
                    `$${minPriceUsd.toLocaleString()} – $${maxPriceUsd.toLocaleString()} USD`
                  ) : (
                    `${minPriceIqd} – ${maxPriceIqd} د.ع`
                  )}
                </div>

                <div className="text-sm text-primary/80 font-mono">
                  {currency === "USD" ? `≈ ${minPriceIqd} – ${maxPriceIqd} IQD` : `≈ $${minPriceUsd.toLocaleString()} – $${maxPriceUsd.toLocaleString()} USD`}
                </div>
              </div>

              {/* Summary details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{isRtl ? "المدة الزمنية المتوقعة" : "Estimated Timeline"}</div>
                    <div className="text-lg font-bold text-white">{totalWeeksMin} – {totalWeeksMax} {isRtl ? "أسابيع" : "Weeks"}</div>
                  </div>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{isRtl ? "ضمان التسليم والملكية" : "Delivery Standard"}</div>
                    <div className="text-sm font-bold text-white">{isRtl ? "ملكية 100% ودعم محلي" : "100% Code Ownership & Local Support"}</div>
                  </div>
                </div>
              </div>

              {/* Next CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-black font-black uppercase tracking-widest text-xs h-14 px-8 rounded-xl hover:bg-white transition-all shadow-[0_4px_25px_rgba(194,164,92,0.3)]"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>{isRtl ? "احصل على المواصفات الرسمية مجاناً" : "Request Official Proposal Spec"}</span>
                </button>

                <Link
                  href={`/contact?scope=${contactScope}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 text-white font-bold text-xs uppercase tracking-wider h-14 px-8 rounded-xl hover:bg-white/10 transition-all"
                >
                  <span>{isRtl ? "حجز استشارة هاتفية" : "Book Phone Consultation"}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              <span>{isRtl ? "السابق" : "Previous"}</span>
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 bg-primary text-black font-bold text-xs uppercase tracking-wider h-11 px-6 rounded-xl hover:bg-white transition-all"
              >
                <span>{isRtl ? "التالي" : "Next Step"}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <button
                onClick={() => setStep(1)}
                className="text-xs text-muted-foreground hover:text-white underline font-mono"
              >
                {isRtl ? "إعادة الحساب" : "Recalculate"}
              </button>
            )}
          </div>
        </div>

        {/* Lead Capture Modal */}
        <LeadCaptureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          lang={lang}
          isRtl={isRtl}
          estimateSummary={{
            solutionTitle: isRtl ? solutionObj.titleAr : solutionObj.titleEn,
            scaleLabel: isRtl ? scaleObj.labelAr : scaleObj.labelEn,
            estimatedUsd: `$${minPriceUsd.toLocaleString()} – $${maxPriceUsd.toLocaleString()}`,
            estimatedIqd: `${minPriceIqd} – ${maxPriceIqd} IQD`,
            modulesCount: selectedModules.length,
          }}
        />
      </div>
    </div>
  );
}
