import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldAlert, Award, Star } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "مقارنة الحلول البرمجية | لماذا تختار سهلة؟"
    : "Compare Solutions | Why Choose Sehle?";

  const description = lang === "ar"
    ? "مقارنة تفصيلية بين خدمات سهلة البرمجية والعمل مع المستقلين أو الشركات الخارجية. اكتشف مزايا الدعم المحلي والملكية الكاملة للأكواد."
    : "A detailed comparison between Sehle custom software development and hiring freelancers or offshore agencies. Discover the benefits of local support and complete code ownership.";

  return {
    title,
    description,
    keywords: ["why choose Sehle", "custom software comparison Iraq", "مستقلين برمجيات العراق", "أفضل شركة برمجيات بغداد"],
    openGraph: {
      title,
      description,
      url: "https://www.sehle.site/compare",
    }
  };
}

export default async function ComparePage() {
  const { lang, isRtl } = await getServerTranslation();

  const headers = {
    feature: lang === "ar" ? "الميزة / المعيار" : "Feature / Aspect",
    sehle: lang === "ar" ? "سهلة (Sehle)" : "Sehle",
    freelancers: lang === "ar" ? "المستقلون (Freelancers)" : "Freelancers",
    offshore: lang === "ar" ? "الشركات الخارجية (Offshore)" : "Offshore Agencies",
  };

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
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <header className="text-center mb-16">
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
            href="/contact?project=Custom%20software%20consultation"
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
