"use client";

import { useState } from "react";
import { Copy, Check, Calendar, Share2, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TEMPLATES = [
  {
    category: "Project Showcase (LinkedIn/Facebook)",
    en: {
      title: "Fintech App Delivery",
      body: "🚀 Iraq's financial sector is shifting. We just helped digitize a major payroll flow, cutting payment times from 5 days to 2 minutes.\n\nHere is how we did it:\n1. Replaced manual bank spreadsheets with direct API integrations.\n2. Built double-entry ledger audits for absolute security.\n3. Implemented a zero-latency UI that runs on slow 3G networks.\n\nManual processes cost Iraq's businesses 62% more time than necessary. Let's change that.\n\n👉 Learn more at: www.sehle.site",
    },
    ar: {
      title: "عرض مشروع تقني مالي",
      body: "🚀 قطاع التكنولوجيا المالية في العراق يتغير بسرعة. انتهينا مؤخراً من رقمنة نظام رواتب ضخم، مما قلل وقت معالجة المدفوعات من 5 أيام إلى دقيقتين فقط.\n\nإليك كيف حققنا ذلك:\n1. استبدال كشوفات البنك اليدوية بروابط واجهات برمجية مباشرة (APIs).\n2. بناء نظام تدقيق مالي مزدوج لضمان أعلى مستويات الأمان.\n3. تطوير واجهة مستخدم سريعة جداً تعمل بكفاءة حتى على شبكات الجيل الثالث الضعيفة.\n\nالعمليات اليدوية تكلف الشركات العراقية 62% من وقتها هدراً. دعونا نغير هذا اليوم.\n\n👉 اعرف المزيد من خلال: www.sehle.site",
    }
  },
  {
    category: "Thought Leadership (LinkedIn/X)",
    en: {
      title: "Why Templates Cost More",
      body: "💡 Unpopular opinion: Reskinned templates cost Iraqi businesses more in the long run than custom software upfront.\n\nWhy?\n- Templates bloat your site, dropping SEO performance.\n- They lack custom API integrations, leading to manual work.\n- Fixing bugs in third-party code takes 3x longer than writing clean code once.\n\nAt Sehle, we design custom systems built for your exact business metrics. No reskins, no shortcut code.\n\nDo you agree? Let's discuss in the comments.",
    },
    ar: {
      title: "لماذا القوالب الجاهزة مكلفة",
      body: "💡 رأي قد لا يعجب الجميع: القوالب الجاهزة المستوردة تكلف الشركات العراقية في المدى الطويل أضعاف قيمة البرمجيات المخصصة والمبنية من الصفر.\n\nلماذا؟\n- القوالب تبطئ موقعك، مما يضر بترتيب السيو (SEO).\n- تفتقر للربط المخصص مع الأنظمة المحلية، مما يجبرك على العمل اليدوي.\n- إصلاح المشاكل البرمجية في كود خارجي يستغرق 3 أضعاف كتابة كود نظيف منذ البداية.\n\nفي سهلة، نصمم أنظمة مخصصة لتطابق مقاييس عملك بالضبط. بدون قوالب جاهزة أو حلول مختصرة.\n\nهل توافقنا الرأي؟ شاركنا في التعليقات.",
    }
  },
  {
    category: "Reciprocity / Value Lead (X/Instagram)",
    en: {
      title: "Digital Audit Guide",
      body: "📊 Is your digital infrastructure ready to scale in 2026?\n\nBefore you hire developers, run this quick 3-step audit:\n1. Uptime: Are you monitoring your servers, or do you wait for customers to tell you when it is down?\n2. Database: Do you paginate search results, or is your server load-spiking on every query?\n3. Security: Are your user credentials properly hashed, or stored in plaintext?\n\nWe provide complete technical audits for free during our initial consultation call.\n\n📅 Book your free session: www.sehle.site/contact",
    },
    ar: {
      title: "دليل التدقيق الرقمي",
      body: "📊 هل بنيتك التحتية الرقمية جاهزة للتوسع في عام 2026؟\n\nقبل أن توظف مبرمجين، قم بإجراء هذا التدقيق السريع المكون من 3 خطوات:\n1. استقرار النظام: هل تراقب خوادمك باستمرار، أم تنتظر حتى يبلغك العملاء بتعطل الموقع؟\n2. قاعدة البيانات: هل تقوم بتقسيم نتائج البحث (Pagination)، أم أن خادمك يواجه ضغطاً مع كل استعلام؟\n3. الأمان: هل كلمات مرور المستخدمين مشفرة بشكل صحيح، أم مخزنة كنصوص واضحة؟\n\nنحن نقدم تدقيقاً تقنياً كاملاً مجاناً خلال مكالمة الاستشارة الأولى.\n\n📅 احجز جلستك المجانية: www.sehle.site/contact",
    }
  }
];

const SCHEDULE = [
  { day: "Monday", en: "Product / Project Case Study (Value & Proof)", ar: "دراسة حالة منتج / مشروع (فائدة وإثبات)" },
  { day: "Wednesday", en: "Educational Thread / Practical Tips (Authority)", ar: "منشور تعليمي / نصائح عملية (سلطة معرفية)" },
  { day: "Friday", en: "Interactive Poll / Question to Audience (Engagement)", ar: "استطلاع رأي تفاعلي / سؤال للجمهور (تفاعل)" }
];

export function SocialKitClient({ isRtl }: { isRtl: boolean }) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const pick = (en: string, ar: string) => (isRtl ? ar : en);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: pick("Copied!", "تم النسخ!"),
      description: pick("Template copied to clipboard.", "تم نسخ القالب للحافظة."),
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-24" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Share2 className="w-3.5 h-3.5" />
            {pick("Social Media Content Kit", "حقيبة المحتوى الاجتماعي")}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-6"
            style={{ background: "linear-gradient(180deg,var(--foreground) 40%,var(--primary) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {pick("Grow Your Social Presence", "ابنِ حضورك الرقمي")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {pick(
              "Access ready-to-use templates and strategies designed to showcase authority, build trust, and drive traffic to the Sehle platform.",
              "احصل على قوالب واستراتيجيات جاهزة للاستخدام مصممة لإظهار الخبرة وبناء الثقة وتوجيه المتابعين نحو منصة سهلة."
            )}
          </p>
        </div>

        {/* Cadence & Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Cadence */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {pick("Weekly Posting Schedule", "جدول النشر الأسبوعي")}
            </h2>
            <div className="space-y-4">
              {SCHEDULE.map((s, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-muted/40 border border-border/50">
                  <div className="bg-primary/15 border border-primary/30 text-primary text-xs font-black px-3 py-1 rounded-md min-w-[90px] text-center">
                    {s.day}
                  </div>
                  <p className="text-sm text-muted-foreground leading-normal">{pick(s.en, s.ar)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {pick("Editorial Strategy", "الاستراتيجية التحريرية")}
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">1. {pick("Focus on Outcomes", "التركيز على النتائج:")}</strong>{" "}
                {pick("Never list raw tech stack without explaining the business metric (e.g. 62% cost reduction).", "تجنب ذكر لغات البرمجة مجردة دون إرفاق النتيجة العائدة على الشركة (مثل خفض التكاليف بنسبة 62%).")}
              </p>
              <p>
                <strong className="text-foreground">2. {pick("Iraqi Context", "السياق المحلي:")}</strong>{" "}
                {pick("Highlight solutions to local challenges like slow internet, manual spreadsheet operations, and cash handling.", "سلط الضوء على حلول التحديات المحلية كضعف سرعة الاتصال بالإنترنت، والعمليات الحسابية اليدوية، وتدفقات النقد.")}
              </p>
              <p>
                <strong className="text-foreground">3. {pick("Educate First", "التعليم أولاً:")}</strong>{" "}
                {pick("Provide free guidelines, audit frameworks, and industry lessons to build maximum trust before asking for consultations.", "قدم إرشادات تدقيق مجانية ونصائح للمهتمين لبناء جسر متين من الثقة قبل طلب عقد استشارة.")}
              </p>
            </div>
          </div>
        </div>

        {/* Content Templates */}
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            {pick("Copy-Paste Content Templates", "قوالب منشورات جاهزة للنسخ")}
          </h2>
          <div className="space-y-8">
            {TEMPLATES.map((tmpl, idx) => {
              const bodyText = isRtl ? tmpl.ar.body : tmpl.en.body;
              const titleText = isRtl ? tmpl.ar.title : tmpl.en.title;
              return (
                <div key={idx} className="bg-card border border-border rounded-3xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        {tmpl.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">{titleText}</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bodyText, idx)}
                      className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-primary/20 text-foreground hover:text-primary border border-border transition-colors text-xs font-bold"
                    >
                      {copiedId === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          {pick("Copied!", "تم النسخ!")}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {pick("Copy Post Text", "نسخ نص المنشور")}
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-2xl p-6 text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap">
                    {bodyText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
