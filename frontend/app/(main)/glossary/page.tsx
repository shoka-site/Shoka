import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { generateGlossarySchema } from "@/lib/schema-generator";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  return buildMetadata({
    titleAr: "قاموس المصطلحات البرمجية والتقنية",
    titleEn: "Software & Technology Glossary",
    descriptionAr: "قاموس المصطلحات التقنية والبرمجية من سهلة — شرح مبسط لمصطلحات الأعمال مثل أنظمة ERP و CRM والتحول الرقمي وتطوير البرمجيات.",
    descriptionEn: "The Sehle technology and software glossary. Learn and understand enterprise terminology like ERP, CRM, custom software development, and digital transformation.",
    path: "/glossary",
    keywordsAr: ["قاموس المصطلحات التقنية", "ما هو ERP", "التحول الرقمي العراق", "معنى CRM", "مصطلحات البرمجة"],
    keywordsEn: ["software glossary", "tech terms Iraq", "what is ERP", "CRM meaning", "digital transformation terms"],
    lang,
  });
}

const GLOSSARY_ITEMS = [
  {
    termEn: "ERP (Enterprise Resource Planning)",
    termAr: "تخطيط موارد المؤسسات (ERP)",
    defEn: "A centralized software platform that integrates all core business processes, including inventory, procurement, human resources, finance, and logistics, into a unified database.",
    defAr: "منصة برمجية مركزية تدمج جميع عمليات الأعمال الأساسية، بما في ذلك المخازن، المشتريات، الموارد البشرية، المالية، والخدمات اللوجستية، في قاعدة بيانات موحدة.",
  },
  {
    termEn: "CRM (Customer Relationship Management)",
    termAr: "إدارة علاقات العملاء (CRM)",
    defEn: "Software systems designed to manage and optimize all customer interactions, sales pipelines, client tracking, and support queries to boost revenue and retention.",
    defAr: "أنظمة برمجية مصممة لإدارة وتحسين جميع تفاعلات العملاء، ومراحل المبيعات، ومتابعة الزبائن، وطلبات الدعم لزيادة المبيعات والاحتفاظ بهم.",
  },
  {
    termEn: "Custom Software Development",
    termAr: "تطوير البرمجيات المخصصة",
    defEn: "The process of designing, building, and deploying software tailored specifically to the unique operational workflows and goals of a single business, rather than using off-the-shelf software.",
    defAr: "عملية تصميم وبناء وتشغيل برمجيات مصممة خصيصاً لتناسب سير العمل التشغيلي والأهداف الفريدة لشركة واحدة، بدلاً من استخدام البرمجيات الجاهزة.",
  },
  {
    termEn: "Digital Transformation",
    termAr: "التحول الرقمي",
    defEn: "The integration of digital technology into all areas of a business, fundamentally changing how the business operates and delivers value to its customers.",
    defAr: "دمج التقنيات الرقمية في جميع مجالات الأعمال، مما يغير بشكل جذري طريقة عمل الشركة وكيفية تقديم القيمة لعملائها.",
  },
  {
    termEn: "API Integration",
    termAr: "ربط واجهات البرمجة التطبيقية (API)",
    defEn: "The connection of two or more software applications via their Application Programming Interfaces, allowing them to exchange data seamlessly in real-time.",
    defAr: "ربط تطبيقين برمجيين أو أكثر من خلال واجهات البرمجة الخاصة بهم، مما يسمح لهم بتبادل البيانات بسلاسة وفي الوقت الفعلي.",
  },
  {
    termEn: "Offline-First Sync",
    termAr: "المزامنة دون اتصال بالإنترنت",
    defEn: "An architectural pattern where applications function fully without an active internet connection, storing data locally, and automatically syncing with the central database once connectivity is restored.",
    defAr: "نمط هندسي للبرمجيات حيث تعمل التطبيقات بشكل كامل دون الحاجة لاتصال نشط بالإنترنت، مع تخزين البيانات محلياً ومزامنتها تلقائياً مع قاعدة البيانات المركزية بمجرد استعادة الاتصال.",
  }
];

export default async function GlossaryPage() {
  const { lang } = await getServerTranslation();
  const glossarySchema = generateGlossarySchema(
    GLOSSARY_ITEMS.map((item) => ({
      term: lang === "ar" ? item.termAr : item.termEn,
      definition: lang === "ar" ? item.defAr : item.defEn,
    }))
  );

  return (
    <div className="bg-background min-h-screen text-foreground py-24 selection:bg-primary/30 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
            {lang === "ar" ? "قاموس المصطلحات البرمجية" : "Software & Tech Glossary"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {lang === "ar" 
              ? "دليلك الشامل للمصطلحات التقنية والأنظمة الرقمية لمساعدتك في اتخاذ قرارات عمل ذكية." 
              : "Your comprehensive guide to software terminology and digital systems to help you make smarter business choices."}
          </p>
        </header>

        <div className="space-y-8">
          {GLOSSARY_ITEMS.map((item, idx) => (
            <article 
              key={idx} 
              className="bg-zinc-950/40 border border-white/5 hover:border-primary/20 rounded-2xl p-6 md:p-8 transition-all hover:shadow-[0_4px_30px_rgba(194,164,92,0.05)]"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                {lang === "ar" ? item.termAr : item.termEn}
              </h2>
              {lang === "ar" ? (
                <div className="space-y-2">
                  <p className="text-white/80 leading-relaxed text-base">{item.defAr}</p>
                  <p className="text-muted-foreground text-xs font-mono">{item.termEn}: {item.defEn}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-white/80 leading-relaxed text-base">{item.defEn}</p>
                  <p className="text-muted-foreground text-xs font-mono">{item.termAr}: {item.defAr}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
