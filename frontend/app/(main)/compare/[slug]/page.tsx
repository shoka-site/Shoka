import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldCheck, Cpu } from "lucide-react";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-generator";

interface Props {
  params: Promise<{ slug: string }>;
}

const COMPARISONS: Record<string, {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  targetEn: string;
  targetAr: string;
  prosSehleAr: string[];
  prosSehleEn: string[];
  consOtherAr: string[];
  consOtherEn: string[];
}> = {
  "sehle-vs-freelancers": {
    titleEn: "Sehle vs Freelancers — Custom Software Engineering Comparison",
    titleAr: "سهلة مقابل المستقلين — مقارنة هندسة البرمجيات والتطوير في العراق",
    descEn: "Why enterprise systems in Iraq require dedicated engineering teams with 100% legal ownership, offline databases, and continuous SLA support.",
    descAr: "لماذا تتطلب أنظمة الشركات والمؤسسات في العراق فريقاً هندسياً متكاملاً يوفر الملكية القانونية، قواعد البيانات بدون اتصال، والدعم الفني المستمر.",
    targetEn: "Freelance Developers",
    targetAr: "المطورون المستقلون",
    prosSehleAr: [
      "فريق هندسي متخصص بعقود قانونية وضمانات تسليم.",
      "ملكية 100% للكود المصدري المكتوب دون رسوم ترخيص.",
      "دعم فني ميداني مباشر في بغداد وأربيل وأنحاء العراق.",
      "أنظمة تعمل بكفاءة حتى عند انقطاع الشبكة (Offline-First)."
    ],
    prosSehleEn: [
      "Full engineering team with SLA guarantees and legal contracts.",
      "100% source code legal and technical ownership.",
      "On-ground technical support team across Iraq.",
      "Offline-first operational capability during network cuts."
    ],
    consOtherAr: [
      "مخاطر اختفاء المستقل بعد تسليم الكود وتوقف الدعم الفني.",
      "غياب العقود المؤسسية الملزمة وضمانات حماية البيانات الحساسة.",
      "صعوبة التوسع أو بناء أنظمة معقدة تعمل بدون اتصال بالإنترنت."
    ],
    consOtherEn: [
      "High developer turnover risk and lack of long-term post-launch maintenance.",
      "Absence of enterprise NDAs, data privacy compliance, and legally backed SLAs.",
      "Inability to design robust offline synchronization architectures for field operations."
    ]
  },
  "sehle-vs-offshore-agencies": {
    titleEn: "Sehle vs Offshore Agencies — Iraqi Market Software Development",
    titleAr: "سهلة مقابل الشركات الخارجية — تطوير البرمجيات والأنظمة في العراق",
    descEn: "A breakdown of local context, physical SLA presence, and tailored enterprise architectures vs outsourcing overseas.",
    descAr: "تحليل لمزايا المعرفة بالمحلية والزيارات الميدانية والدعم المباشر مقارنة بالاستعانة بشركات خارجية خارج البلاد.",
    targetEn: "Offshore Outsourcing Agencies",
    targetAr: "شركات التطوير البرمجي الخارجية",
    prosSehleAr: [
      "تواجد ميداني حقيقي وزيارات فنية لمواقع شركتك.",
      "فهم عميق لمتطلبات وتحديات السوق والعمليات العراقية.",
      "تواصل سلس باللغة العربية مع توثيق تقني متكامل.",
      "تطوير أنظمة متوافقة مع البنية التحتية والشبكية المحلية."
    ],
    prosSehleEn: [
      "Physical presence with on-ground visits to client facilities.",
      "Deep understanding of Iraqi market dynamics and operational bottlenecks.",
      "Seamless bilingual communication and comprehensive documentation.",
      "Architectures fine-tuned for local internet stability constraints."
    ],
    consOtherAr: [
      "صعوبات التواصل وفوارق التوقيت واختلاف اللغات.",
      "غياب الدعم الفني الميداني عند حدوث أي طوارئ في الموقع.",
      "ارتفاع تكاليف التعديل والتخصيص المستمر."
    ],
    consOtherEn: [
      "Time-zone lag, cultural communication barriers, and delay cycles.",
      "Zero physical emergency response capability for local infrastructure failures.",
      "Rigid change request pricing models and escalating hidden overheads."
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(COMPARISONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = COMPARISONS[slug];
  const { lang } = await getServerTranslation();

  if (!comp) return {};

  return buildMetadata({
    titleAr: comp.titleAr,
    titleEn: comp.titleEn,
    descriptionAr: comp.descAr,
    descriptionEn: comp.descEn,
    path: `/compare/${slug}/`,
    lang,
  });
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params;
  const comp = COMPARISONS[slug];
  const { lang } = await getServerTranslation();

  if (!comp) notFound();

  const isAr = lang === "ar";
  const title = isAr ? comp.titleAr : comp.titleEn;
  const desc = isAr ? comp.descAr : comp.descEn;

  const pros = isAr ? comp.prosSehleAr : comp.prosSehleEn;
  const cons = isAr ? comp.consOtherAr : comp.consOtherEn;

  const breadcrumbs = generateBreadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", item: "/" },
    { name: isAr ? "مقارنة الخيارات" : "Compare Options", item: "/compare/" },
    { name: title, item: `/compare/${slug}/` }
  ]);

  const faqs = generateFAQSchema([
    {
      question: isAr ? `ما هي الميزة الأساسية لسهلة مقارنة بـ ${comp.targetAr}؟` : `What is Sehle's main edge over ${comp.targetEn}?`,
      answer: pros[0]
    },
    {
      question: isAr ? "هل يمكننا جدولة حجز استشارة تقنية لمعاينة التفاصيل؟" : "Can we schedule a consultation to inspect technical specifications?",
      answer: isAr ? "نعم، يمكنك حجز استشارة مجانية مع الفريق الهندسي لمناقشة احتياجاتك." : "Yes, you can schedule a free consultation with our engineering team directly."
    }
  ]);

  return (
    <div className="bg-background min-h-screen text-foreground py-24 selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqs) }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <Link href="/compare/" className="hover:text-primary transition-colors">
            {isAr ? "المقارنات" : "Compare"}
          </Link>
          <span>/</span>
          <span className="text-white">{isAr ? comp.targetAr : comp.targetEn}</span>
        </nav>

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6">
            <Cpu className="w-4 h-4" />
            <span>Sehle vs {isAr ? comp.targetAr : comp.targetEn}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            {desc}
          </p>
        </header>

        {/* Breakdown comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Sehle Column */}
          <div className="bg-zinc-950/60 border border-primary/40 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span>{isAr ? "مزية الشراكة مع سهلة" : "Sehle Advantage"}</span>
            </h2>
            <ul className="space-y-4">
              {pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white/90 leading-relaxed">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternative Column */}
          <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white/70 mb-6 flex items-center gap-2">
              <X className="w-6 h-6 text-red-400" />
              <span>{isAr ? `تحديات العمل مع ${comp.targetAr}` : `Challenges with ${comp.targetEn}`}</span>
            </h2>
            <ul className="space-y-4">
              {cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <X className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-zinc-900/60 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isAr ? "جاهز لبناء نظامك بمواصفات هندسية متكاملة؟" : "Ready to Engineer Your System With Professional Guarantees?"}
          </h2>
          <p className="text-white/60 text-sm mb-8">
            {isAr ? "تواصل معنا اليوم لحجز استشارة تقنية وفنية لبناء برمجياتك بأعلى معايير الجودة والأمان." : "Book a consultation with Sehle's software architects to discuss your custom project specifications."}
          </p>

          <Link
            href={`/contact/?project=${encodeURIComponent(title)}`}
            className="inline-flex items-center gap-3 bg-primary text-black font-black uppercase tracking-widest text-xs h-14 px-8 rounded-xl hover:bg-white transition-all shadow-[0_4px_20px_rgba(194,164,92,0.25)]"
          >
            <span>{isAr ? "اطلب استشارة مجانية" : "Book Consultation"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
