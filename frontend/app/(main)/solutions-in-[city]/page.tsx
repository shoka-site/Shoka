import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, ShieldCheck, Zap } from "lucide-react";

interface Props {
  params: Promise<{ city: string }>;
}

const CITIES: Record<string, {
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  focusEn: string;
  focusAr: string;
}> = {
  baghdad: {
    nameEn: "Baghdad",
    nameAr: "بغداد",
    descEn: "Empowering Baghdad's commercial and corporate sectors with robust custom ERPs, logistics tools, and digital transformation services.",
    descAr: "تمكين القطاعات التجارية والشركات في بغداد من خلال أنظمة ERP مخصصة وقوية، وأدوات اللوجستيات، وخدمات التحول الرقمي.",
    focusEn: "Corporate & Enterprise ERPs, Retail Automations, Financial Tech.",
    focusAr: "أنظمة ERP للشركات الكبرى، أتمتة تجارة التجزئة، والتقنيات المالية.",
  },
  basra: {
    nameEn: "Basra",
    nameAr: "البصرة",
    descEn: "Specialized software solutions for Basra's energy, logistics, import/export, and industrial supply chain operations.",
    descAr: "حلول برمجية متخصصة لقطاعات الطاقة، اللوجستيات، الاستيراد والتصدير، وسلاسل الإمداد الصناعية في البصرة.",
    focusEn: "Supply Chain Software, Asset Management, Logistics & Port Integrations.",
    focusAr: "برمجيات سلاسل الإمداد، إدارة الأصول والمعدات، وتكاملات اللوجستيات والموانئ.",
  },
  erbil: {
    nameEn: "Erbil",
    nameAr: "أربيل",
    descEn: "Accelerating Erbil's rapidly growing trade hubs, hospitality networks, and real estate development enterprises.",
    descAr: "تسريع نمو المراكز التجارية، شبكات الفنادق والضيافة، وشركات التطوير العقاري المتنامية في أربيل.",
    focusEn: "SaaS Solutions, Hospitality Management, Real Estate Databases.",
    focusAr: "حلول البرمجيات الخدمية (SaaS)، إدارة الضيافة، وقواعد بيانات العقارات.",
  },
  sulaymaniyah: {
    nameEn: "Sulaymaniyah",
    nameAr: "السليمانية",
    descEn: "Custom software and secure database designs for Sulaymaniyah's manufacturing, education, and emerging startup scenes.",
    descAr: "برمجيات مخصصة وتصميم قواعد بيانات آمنة لقطاعات التصنيع، التعليم، والشركات الناشئة الصاعدة في السليمانية.",
    focusEn: "Manufacturing ERPs, Educational Platforms, Tech Startup MVPs.",
    focusAr: "أنظمة ERP للتصنيع، المنصات التعليمية، وتطوير المنتجات الأولية للشركات الناشئة.",
  },
  najaf: {
    nameEn: "Najaf",
    nameAr: "النجف",
    descEn: "Streamlining inventory management and visitor logistics platforms for Najaf's business networks.",
    descAr: "تبسيط إدارة المخازن والمستودعات ومنصات تنظيم الزوار لشبكات الأعمال والخدمات في النجف.",
    focusEn: "Inventory Systems, E-Commerce, Local Services Management.",
    focusAr: "أنظمة المخازن، التجارة الإلكترونية، وإدارة الخدمات المحلية.",
  }
};

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = CITIES[city.toLowerCase()];
  const { lang } = await getServerTranslation();

  if (!cityData) return {};

  const name = lang === "ar" ? cityData.nameAr : cityData.nameEn;

  return buildMetadata({
    titleAr: `شركة برمجيات وتطوير أنظمة ERP في ${name}`,
    titleEn: `Custom Software & ERP Development Company in ${name}`,
    descriptionAr: `حلول برمجية مخصصة وأنظمة ERP متكاملة للشركات والمؤسسات في ${name}، العراق. تواصل معنا لتطوير عملك رقمياً.`,
    descriptionEn: `Custom software engineering and ERP solutions for enterprise clients in ${name}, Iraq. Partner with Sehle for digital transformation.`,
    path: `/solutions-in-${city.toLowerCase()}`,
    keywordsAr: [`شركة برمجة في ${cityData.nameAr}`, `برمجة أنظمة ${cityData.nameAr}`, `حلول ERP ${cityData.nameAr}`],
    keywordsEn: [`software company in ${cityData.nameEn}`, `ERP solutions ${cityData.nameEn}`, `custom software ${cityData.nameEn}`],
    lang,
  });
}

import { generateLocalBusinessCitySchema, generateBreadcrumbSchema } from "@/lib/schema-generator";
import { SITE_URL } from "@/lib/seo";

export default async function CityLocationPage({ params }: Props) {
  const { city } = await params;
  const cityData = CITIES[city.toLowerCase()];
  const { lang } = await getServerTranslation();

  if (!cityData) notFound();

  const cityName = lang === "ar" ? cityData.nameAr : cityData.nameEn;
  const focusTitle = lang === "ar" ? "التركيز التقني التشغيلي" : "Key Tech Operational Focus";
  const focusDesc = lang === "ar" ? cityData.focusAr : cityData.focusEn;

  const citySchema = generateLocalBusinessCitySchema(
    {
      nameAr: cityData.nameAr,
      nameEn: cityData.nameEn,
      descAr: cityData.descAr,
      descEn: cityData.descEn,
      url: `${SITE_URL}/solutions-in-${city.toLowerCase()}/`,
    },
    lang
  );

  const breadcrumbs = generateBreadcrumbSchema([
    { name: lang === "ar" ? "الرئيسية" : "Home", item: "/" },
    { name: lang === "ar" ? `حلولنا في ${cityName}` : `Solutions in ${cityName}`, item: `/solutions-in-${city.toLowerCase()}/` },
  ]);

  return (
    <div className="bg-background min-h-screen text-foreground py-24 selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-white">
            {lang === "ar" ? `حلولنا في ${cityName}` : `Solutions in ${cityName}`}
          </span>
        </nav>

        {/* Hero Section */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6">
            <MapPin className="w-4 h-4" />
            <span>{cityName} — {lang === "ar" ? "العراق" : "Iraq"}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-tight">
            {lang === "ar" 
              ? `تطوير البرمجيات وأنظمة ERP المخصصة في ${cityName}` 
              : `Custom Software & ERP Systems Development in ${cityName}`}
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
            {lang === "ar" ? cityData.descAr : cityData.descEn}
          </p>
        </header>

        {/* Focus Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl">
            <Building2 className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === "ar" ? "ملائمة السوق المحلي" : "Hyper-Local Suitability"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ar" 
                ? `صُممت أنظمتنا البرمجية لتتلاءم مع متطلبات شركات ومؤسسات مدينة ${cityName}.`
                : `Our architectures are designed explicitly to support business operations in ${cityName}.`}
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === "ar" ? "أمان وموثوقية عالية" : "Enterprise Security"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ar"
                ? "قواعد بيانات مشفرة ومصممة لدعم العمليات الحيوية وحماية بيانات العملاء والمبيعات."
                : "Secure database infrastructures designed to safeguard critical business transactions and customer information."}
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              {focusTitle}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {focusDesc}
            </p>
          </div>
        </section>

        {/* CTA Card */}
        <section className="bg-zinc-900/60 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === "ar" 
              ? `هل تبحث عن شريك تقني لمشروعك القادم في ${cityName}؟`
              : `Looking for a tech partner for your next project in ${cityName}?`}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-8 max-w-xl mx-auto">
            {lang === "ar"
              ? `دعنا نساعدك في بناء النظام الرقمي أو تطبيق الجوال الذي تحتاجه أعمالك في ${cityName} لتحقيق الكفاءة القصوى.`
              : `Let us design and deploy the management systems or mobile apps your company needs in ${cityName} to maximize efficiency.`}
          </p>

          <Link 
            href={`/contact/?project=Software%20solutions%20in%20${cityData.nameEn}`}
            className="inline-flex items-center gap-3 bg-primary text-black font-black uppercase tracking-widest text-xs h-14 px-8 rounded-xl hover:bg-white transition-all shadow-[0_4px_20px_rgba(194,164,92,0.25)]"
          >
            <span>{lang === "ar" ? "اطلب استشارة مجانية الآن" : "Book Free Consultation"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
