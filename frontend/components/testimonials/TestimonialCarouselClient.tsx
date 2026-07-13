"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Building2, MapPin, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  companyAr: string;
  companyEn: string;
  cityAr: string;
  cityEn: string;
  textAr: string;
  textEn: string;
  rating: number;
  metricBadgeAr: string;
  metricBadgeEn: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    nameAr: "د. عمر الخفاجي",
    nameEn: "Dr. Omar Al-Khafaji",
    roleAr: "الرئيس التنفيذي للتكنلوجيا",
    roleEn: "Chief Executive Officer",
    companyAr: "مجموعة دجلة المستوردة",
    companyEn: "Tigris Logistics Group",
    cityAr: "بغداد",
    cityEn: "Baghdad",
    textAr: "نظام ERP المخصص من سهلة غير طريقة إدارتنا لـ 14 مخزناً عبر العراق. المزامنة دون نت حلّت مشكلة توقف البيع أثناء انقطاع الإنترنت نهائياً.",
    textEn: "Sehle's custom ERP completely transformed how we manage 14 warehouses across Iraq. The offline sync permanently resolved sales freezes during network drops.",
    rating: 5,
    metricBadgeAr: "أتمتة 14 مخزناً",
    metricBadgeEn: "14 Warehouses Unified",
  },
  {
    id: "t2",
    nameAr: "المهندس كاروان أربيلى",
    nameEn: "Eng. Karwan Erbali",
    roleAr: "مدير العمليات والبرمجيات",
    roleEn: "VP of Digital Infrastructure",
    companyAr: "شبكة شمال للتوزيع",
    companyEn: "North Distribution Network",
    cityAr: "أربيل",
    cityEn: "Erbil",
    textAr: "القدرة على إصدار الفواتير بالدينار والذولار بنفس اللحظة مع الالتزام بالضرائب جعلت عملياتنا أسرع بنسبة 40% من السابق.",
    textEn: "Simultaneous IQD and USD invoicing paired with tax compliance sped up our daily distribution pipeline by over 40%.",
    rating: 5,
    metricBadgeAr: "+40% سرعة العمليات",
    metricBadgeEn: "+40% Pipeline Speed",
  },
  {
    id: "t3",
    nameAr: "أحمد الفتلاوي",
    nameEn: "Ahmed Al-Fatlawi",
    roleAr: "مدير إدارة السلاسل",
    roleEn: "Supply Chain Director",
    companyAr: "الفرات للتجهيزات الطبية",
    companyEn: "Euphrates Medical Logistics",
    cityAr: "البصرة",
    cityEn: "Basra",
    textAr: "الدعم الفني المحلي المباشر والسرعة في التحديث جعلت منصة سهلة الشريك التقني الأنسب لتوسعنا التجاري.",
    textEn: "Direct local engineering support and fast feature deployment make Sehle the definitive tech partner for enterprise growth.",
    rating: 5,
    metricBadgeAr: "دعم محلي 24/7",
    metricBadgeEn: "24/7 Local Support",
  },
];

interface Props {
  lang: "ar" | "en";
  isRtl: boolean;
}

export function TestimonialCarouselClient({ lang, isRtl }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <div className="w-full relative my-16" dir={isRtl ? "rtl" : "ltr"}>
      <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <Quote className="w-24 h-24 text-primary/10 absolute -bottom-4 -left-4 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isRtl ? "آراء قادة المؤسسات في العراق" : "Enterprise Client Impact"}</span>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-1 mb-6 text-primary">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <p className="text-xl md:text-2xl font-display font-medium text-white leading-relaxed mb-8 italic">
            "{isRtl ? activeTestimonial.textAr : activeTestimonial.textEn}"
          </p>

          {/* Author Meta */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-start pt-6 border-t border-white/10">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold font-display text-lg">
              {(isRtl ? activeTestimonial.nameAr : activeTestimonial.nameEn).charAt(0)}
            </div>

            <div>
              <div className="font-bold text-white text-base">
                {isRtl ? activeTestimonial.nameAr : activeTestimonial.nameEn}
              </div>
              <div className="text-xs text-muted-foreground flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-0.5">
                <span>{isRtl ? activeTestimonial.roleAr : activeTestimonial.roleEn}</span>
                <span>•</span>
                <span className="text-primary font-bold">{isRtl ? activeTestimonial.companyAr : activeTestimonial.companyEn}</span>
                <span className="flex items-center gap-1 text-white/50 text-[11px]">
                  <MapPin className="w-3 h-3" />
                  {isRtl ? activeTestimonial.cityAr : activeTestimonial.cityEn}
                </span>
              </div>
            </div>

            {/* Metric Badge */}
            <div className="sm:ms-auto px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-mono font-bold">
              {isRtl ? activeTestimonial.metricBadgeAr : activeTestimonial.metricBadgeEn}
            </div>
          </div>
        </div>

        {/* Carousel Slider Controls */}
        <div className="flex items-center justify-between mt-8 pt-4">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          </button>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Next Testimonial"
          >
            <ChevronRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
