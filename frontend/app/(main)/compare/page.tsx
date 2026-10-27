import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldAlert, Award, Star } from "lucide-react";

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  return buildMetadata({
    titleAr: "مقارنة الحلول البرمجية | لماذا تختار سهلة مقارنة بالحلول الأخرى؟",
    titleEn: "Compare Software Options | Why Partner With Sehle?",
    descriptionAr: "مقارنة تفصيلية بين خدمات سهلة البرمجية والعمل مع المستقلين أو الشركات الخارجية. اكتشف مزايا الدعم المحلي والملكية الكاملة للأكواد والمزامنة دون إنترنت.",
    descriptionEn: "A detailed comparison between Sehle custom software engineering versus freelancers or offshore agencies. Discover the power of local support and 100% code ownership.",
    path: "/compare",
    keywordsAr: ["لماذا تختار سهلة", "مقارنة شركات البرمجة بالعراق", "مستقلين برمجيات العراق", "أفضل شركة برمجيات بغداد"],
    keywordsEn: ["why choose Sehle", "custom software comparison Iraq", "freelancer vs software agency Iraq"],
    lang,
  });
}

import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema-generator";

export default async function ComparePage() {
  const { lang, isRtl } = await getServerTranslation();

  const headers = {
    feature: lang === "ar" ? "الميزة / المعيار" : "Feature / Aspect",
    sehle: lang === "ar" ? "سهلة (Sehle)" : "Sehle",
    freelancers: lang === "ar" ? "المستقلون (Freelancers)" : "Freelancers",
    offshore: lang === "ar" ? "الشركات الخارجية (Offshore)" : "Offshore Agencies",
  };

  const faqs = lang === "ar" ? [
    {
      question: "لماذا تُفضل الشركات في العراق الاستعانة بسهلة بدلاً من المستقلين؟",
      answer: "توفر سهلة عقوداً قانونية ملزمة، دعماً فنياً ميدانياً مستمراً في العراق، ملكية تامة 100% للكود المصدري، وبنية تحتية تدعم مزامنة البيانات بدون إنترنت."
    },
    {
      question: "هل أحصل على الملكية الكاملة للأكواد المكتوبة لمشروعي؟",
      answer: "نعم، يتم نقل الملكية الفكرية والقانونية للأكواد المعتمدة وقواعد البيانات بالكامل لشركتك دون أي رسوم ترخيص مخفية."
    },
    {
      question: "كيف تتم عملية نقل البيانات من أنظمتنا القديمة إلى نظام سهلة؟",
      answer: "نقوم بفحص قواعد البيانات القديمة، وتنظيفها، ثم إعادة هيكلتها ونقلها بأمان تام مع إجراء اختبارات تطابق لضمان استمرارية العمليات."
    }
  ] : [
    {
      question: "Why do enterprises in Iraq choose Sehle over freelancers?",
      answer: "Sehle provides legally binding contracts, continuous physical on-ground support in Iraq, 100% full source code ownership, and robust offline-first software architectures."
    },
    {
      question: "Do I retain complete source code ownership for my project?",
      answer: "Yes, 100% legal and technical ownership of source code, configurations, and database schemas is transferred directly to your organization."
    },
    {
      question: "How does Sehle migrate existing legacy data?",
      answer: "We perform full structural audits, data cleaning, automated migration scripts, and integrity validation without operational downtime."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: lang === "ar" ? "الرئيسية" : "Home", item: "/" },
    { name: lang === "ar" ? "مقارنة الخيارات" : "Compare Options", item: "/compare/" }
  ]);

  const comparisonRows = [
    {
      feature: lang === "ar" ? "الدعم والصيانة المحلية" : "Local Support & Presence",
      sehle: true,
      freelancer: false,
      offshore: false,
      desc: lang === "ar" 
        ? "فريق محلي متواجد في العراق وتركيا للدعم الفني والزيارات الميدانية." 
        : "Local physical presence in Iraq & Turkey for on-ground support and consultation.",
    },
    {
      feature: lang === "ar" ? "ملكية الكود المصدري الكاملة" : "Full Code Ownership",
      sehle: true,
      freelancer: "partial",
      offshore: true,
      desc: lang === "ar"
        ? "تحصل على الملكية القانونية والفنية الكاملة لجميع الأكواد وقواعد البيانات."
        : "Complete legal and technical ownership of your source code and database schemas.",
    },
    {
      feature: lang === "ar" ? "التخصيص والتحول الرقمي" : "Bespoke Customization",
      sehle: true,
      freelancer: "partial",
      offshore: "partial",
      desc: lang === "ar"
        ? "بناء النظام بالكامل ليناسب عمليات شركتك بدقة دون قيود."
        : "Fully custom development engineered to match your operational workflows exactly.",
    },
    {
      feature: lang === "ar" ? "ضمان تسليم المشروع والتسليم الآمن" : "Delivery Guarantee & Security",
      sehle: true,
      freelancer: false,
      offshore: true,
      desc: lang === "ar"
        ? "عقود قانونية وضمانات تسليم مع اختبارات أمان واختراق شاملة."
        : "Legally backed project delivery guarantees with comprehensive security testing.",
    },
    {
      feature: lang === "ar" ? "مزامنة العمل دون اتصال بالإنترنت" : "Offline-First Support",
      sehle: true,
      freelancer: false,
      offshore: "partial",
      desc: lang === "ar"
        ? "أنظمة تعمل بكفاءة حتى عند انقطاع الإنترنت وتتزامن تلقائياً."
        : "Systems function fully offline during internet disruptions and auto-sync later.",
    }
  ];

  return (
    <div className="bg-background min-h-screen text-foreground py-24 selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6">
            <Star className="w-4 h-4" />
            <span>{lang === "ar" ? "لماذا سهلة؟" : "Why Choose Sehle?"}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
            {lang === "ar" 
              ? "مقارنة الخيارات البرمجية لمشروعك" 
              : "Compare Your Software Options"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {lang === "ar"
              ? "اكتشف الفروقات الجوهرية بين بناء نظامك مع فريق سهلة الهندسي، مقارنة بالمستقلين أو الاستعانة بشركات خارجية."
              : "Analyze the critical differences between partnering with Sehle's senior engineering team versus hiring freelancers or outsourcing overseas."}
          </p>
        </header>

        {/* TL;DR Executive Summary */}
        <section className="bg-zinc-950/80 border border-primary/30 p-6 md:p-8 rounded-3xl mb-12 backdrop-blur-2xl">
          <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-3">
            {lang === "ar" ? "ملخص تنفيذي (TL;DR)" : "Executive Summary (TL;DR)"}
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {lang === "ar"
              ? "تعتبر سهلة الخيار الأمثل للشركات والمؤسسات التي تحتاج أنظمة برمجية مخصصة وعالية الأمان في العراق. بين النظر للخيارات: يوفر المستقل تكلفة بدائية أقل ولكنه يفتقد للالتزام والملكية القانونية، وتوفر الشركات الخارجية خبرات لكن دون أي فهم للبيئة التشغيلية المحلية. تدمج سهلة بين الاحترافية الهندسية العالمية، والملكية 100% للأكواد، والدعم الميداني المباشر."
              : "Sehle is the standard choice for enterprise systems in Iraq. Freelancers present low upfront fees with high abandonment and zero code guarantees; offshore agencies provide scale but suffer from zero local context. Sehle bridges both: senior engineering quality, 100% source code ownership, and direct on-ground support."}
          </p>
        </section>

        {/* Comparison Grid */}
        <div className="overflow-x-auto border border-border/60 rounded-3xl bg-zinc-950/40 backdrop-blur-xl mb-16">
          <table className="w-full text-left border-collapse min-w-[800px] text-white">
            <thead>
              <tr className="border-b border-border/60 bg-white/5">
                <th className={`p-6 text-sm font-bold uppercase tracking-wider text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}>{headers.feature}</th>
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-center text-primary">{headers.sehle}</th>
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-center text-muted-foreground">{headers.freelancers}</th>
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-center text-muted-foreground">{headers.offshore}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className={`p-6 ${isRtl ? "text-right" : "text-left"}`}>
                    <div className="font-bold text-white mb-1">{row.feature}</div>
                    <div className="text-xs text-white/50 leading-relaxed max-w-sm">{row.desc}</div>
                  </td>
                  
                  {/* Sehle status */}
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                      <Check className="w-5 h-5" />
                    </div>
                  </td>

                  {/* Freelancer status */}
                  <td className="p-6 text-center">
                    {row.freelancer === true && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-500">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    {row.freelancer === false && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500">
                        <X className="w-4 h-4" />
                      </div>
                    )}
                    {row.freelancer === "partial" && (
                      <span className="text-xs text-white/60 bg-white/5 px-2.5 py-1 rounded-full">
                        {lang === "ar" ? "محدود" : "Limited"}
                      </span>
                    )}
                  </td>

                  {/* Offshore status */}
                  <td className="p-6 text-center">
                    {row.offshore === true && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-500">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    {row.offshore === false && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500">
                        <X className="w-4 h-4" />
                      </div>
                    )}
                    {row.offshore === "partial" && (
                      <span className="text-xs text-white/60 bg-white/5 px-2.5 py-1 rounded-full">
                        {lang === "ar" ? "محدود" : "Limited"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legacy System Migration Roadmap Section */}
        <section className="mb-16 bg-zinc-950/40 border border-white/5 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            {lang === "ar" ? "خطوات الانتقال السلس من الأنظمة القديمة إلى سهلة" : "4-Step Seamless Migration to Sehle Systems"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-primary font-black text-xl mb-2">01</div>
              <h3 className="text-white font-bold text-sm mb-1">{lang === "ar" ? "تحليل البيانات" : "Data Audit"}</h3>
              <p className="text-white/50 text-xs">{lang === "ar" ? "فحص وهيكلة البيانات الحالية واستخراج القواعد الفنية." : "Structure and audit current schema and export legacy rows."}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-primary font-black text-xl mb-2">02</div>
              <h3 className="text-white font-bold text-sm mb-1">{lang === "ar" ? "التصميم المخصص" : "System Architecture"}</h3>
              <p className="text-white/50 text-xs">{lang === "ar" ? "بناء النظام بآلية العمل دون اتصال وقواعد بيانات سريعة." : "Design offline-first databases tailored to your operations."}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-primary font-black text-xl mb-2">03</div>
              <h3 className="text-white font-bold text-sm mb-1">{lang === "ar" ? "النقل والتحقق" : "Migration & Verification"}</h3>
              <p className="text-white/50 text-xs">{lang === "ar" ? "تشغيل السكريبتات التلقائية لنقل البيانات وتدقيق الصحة." : "Automated data transfer with full integrity checks."}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-primary font-black text-xl mb-2">04</div>
              <h3 className="text-white font-bold text-sm mb-1">{lang === "ar" ? "التدريب والإطلاق" : "Training & Launch"}</h3>
              <p className="text-white/50 text-xs">{lang === "ar" ? "تدريب طاقم العمل وتوفير الدعم الميداني المباشر." : "On-site team training and zero-downtime go-live."}</p>
            </div>
          </div>
        </section>

        {/* Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {lang === "ar" ? "مخاطر الخيارات الأخرى" : "Risks of Other Choices"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ar"
                ? "غالباً ما يعاني العمل مع المستقلين من عدم الالتزام بمواعيد التسليم، وغياب الدعم الفني بعد الانتهاء، بينما تفشل الشركات الخارجية في فهم بيئة ومتطلبات السوق المحلية وتفتقد للتواجد الفعلي."
                : "Hiring freelancers often results in high turnover, delivery delays, and zero post-project maintenance. Offshore agencies suffer from language/time-zone barriers and complete lack of local on-ground support."}
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-2xl">
            <Award className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {lang === "ar" ? "معايير سهلة للهندسة" : "The Sehle Engineering Standard"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ar"
                ? "نحن نلتزم بعقود قانونية واضحة، ونبني أنظمة برمجية سريعة وآمنة ومصممة للتوسع والعمل دون اتصال بالإنترنت، مع توفير تدريب متكامل ودعم محلي ومستمر لفرق عملك."
                : "We deliver contractually-backed timelines, secure infrastructures designed for offline environments, detailed API/system documentations, and continuous support to ensure your technology never stops scaling."}
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-zinc-900/60 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === "ar" ? "اختر شريكك البرمجي الموثوق" : "Choose Your Trusted Tech Partner"}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-8 max-w-xl mx-auto">
            {lang === "ar"
              ? "انضم لعشرات الشركات العراقية التي طورت عملياتها وحققت الكفاءة الرقمية الكاملة مع سهلة."
              : "Join forward-thinking businesses that optimized operations and achieved true efficiency with Sehle's custom designs."}
          </p>

          <Link 
            href="/contact/?project=Custom%20software%20consultation"
            className="inline-flex items-center gap-3 bg-primary text-black font-black uppercase tracking-widest text-xs h-14 px-8 rounded-xl hover:bg-white transition-all shadow-[0_4px_20px_rgba(194,164,92,0.25)]"
          >
            <span>{lang === "ar" ? "ابدأ مشروعك معنا الآن" : "Start Your Project Now"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

