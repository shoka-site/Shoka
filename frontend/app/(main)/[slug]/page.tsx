import { serviceRepository } from "@/lib/repositories/services";
import { industryRepository } from "@/lib/repositories/industries";
import { getServerTranslation } from "@/lib/server-i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Building } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const [services, industries] = await Promise.all([
    serviceRepository.getServices(true),
    industryRepository.getIndustries(true)
  ]);

  const params: { slug: string }[] = [];
  for (const s of services) {
    for (const i of industries) {
      params.push({
        slug: `${slugify(s.titleEn)}-for-${slugify(i.titleEn)}`
      });
    }
  }
  return params;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function findMatch(slug: string) {
  const parts = slug.split("-for-");
  if (parts.length !== 2) return null;

  const [serviceSlug, industrySlug] = parts;

  const [services, industries] = await Promise.all([
    serviceRepository.getServices(true),
    industryRepository.getIndustries(true)
  ]);

  const service = services.find(s => slugify(s.titleEn) === serviceSlug);
  const industry = industries.find(i => slugify(i.titleEn) === industrySlug);

  if (!service || !industry) return null;

  return { service, industry };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const match = await findMatch(slug);
  if (!match) return {};

  const { service, industry } = match;
  const { lang } = await getServerTranslation();

  const serviceTitle = lang === "ar" ? service.titleAr : service.titleEn;
  const industryTitle = lang === "ar" ? industry.titleAr : industry.titleEn;

  const title = lang === "ar"
    ? `تطوير ${serviceTitle} لقطاع ${industryTitle} في العراق | سهلة`
    : `Custom ${serviceTitle} for ${industryTitle} in Iraq | Sehle`;

  const description = lang === "ar"
    ? `برمجيات ${serviceTitle} مخصصة ومصممة لشركات ومؤسسات قطاع ${industryTitle} في العراق. أنظمة ذكية، آمنة وموثوقة.`
    : `Tailored ${serviceTitle} systems engineered specifically for the ${industryTitle} industry in Iraq. Secure, scalable and reliable.`;

  return {
    title,
    description,
    keywords: [
      `${service.titleEn} for ${industry.titleEn}`,
      `Iraq ${industry.titleEn} software`,
      `${serviceTitle} لقطاع ${industryTitle}`,
      `برمجة أنظمة ${industryTitle}`
    ],
    alternates: {
      canonical: `https://www.sehle.site/${slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.sehle.site/${slug}/`,
    }
  };
}

import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema-generator";
import { SITE_URL } from "@/lib/seo";

export default async function ServiceForIndustryPage({ params }: Props) {
  const { slug } = await params;
  const match = await findMatch(slug);

  if (!match) notFound();

  const { service, industry } = match;
  const { lang } = await getServerTranslation();

  const serviceTitle = lang === "ar" ? service.titleAr : service.titleEn;
  const industryTitle = lang === "ar" ? industry.titleAr : industry.titleEn;
  const serviceDesc = lang === "ar" ? service.descriptionAr : service.descriptionEn;
  const industryDesc = lang === "ar" ? industry.descriptionAr : industry.descriptionEn;

  const breadcrumbHome = lang === "ar" ? "الرئيسية" : "Home";
  const breadcrumbCurrent = lang === "ar" 
    ? `${serviceTitle} لقطاع ${industryTitle}` 
    : `${serviceTitle} for ${industryTitle}`;

  const serviceSchema = generateServiceSchema(
    {
      nameAr: `${serviceTitle} لقطاع ${industryTitle}`,
      nameEn: `${serviceTitle} for ${industryTitle}`,
      descriptionAr: serviceDesc,
      descriptionEn: serviceDesc,
      url: `${SITE_URL}/${slug}/`,
    },
    lang
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: breadcrumbHome, item: "/" },
    { name: serviceTitle, item: `/services/${service.id}/` },
    { name: breadcrumbCurrent, item: `/${slug}/` },
  ]);

  // Localized copy
  const sectionTitle = lang === "ar"
    ? `لماذا يحتاج قطاع ${industryTitle} في العراق إلى ${serviceTitle}؟`
    : `Why the ${industryTitle} Sector in Iraq Needs Custom ${serviceTitle}`;

  const ctaTitle = lang === "ar"
    ? `تطوير ${serviceTitle} مخصص لعملياتك`
    : `Ready to Deploy tailored ${serviceTitle}?`;

  const ctaDesc = lang === "ar"
    ? `تواصل مع مهندسي سهلة للحصول على استشارة متكاملة وتصميم نظام رقمي مخصص يلائم متطلبات قطاع ${industryTitle} بدقة.`
    : `Schedule a free consultation with our engineering team to design and build custom systems optimized for the ${industryTitle} industry.`;

  const benefits = lang === "ar" ? [
    { title: "الكفاءة التشغيلية", text: "أتمتة العمليات اليومية وتقليل الاعتماد على المعاملات الورقية." },
    { title: "دعم العمل بدون اتصال", text: "مزامنة البيانات تلقائياً لضمان استمرارية العمل عند انقطاع الشبكة." },
    { title: "أمان متقدم", text: "حماية تامة لقواعد البيانات والمعلومات الحيوية لشركتك." }
  ] : [
    { title: "Operational Efficiency", text: "Automate daily workflows and remove paper-based friction." },
    { title: "Offline-First Design", text: "Work smoothly during network cuts with automatic synchronization." },
    { title: "Enterprise Security", text: "Protect databases and sensitive trade operations with top-tier security." }
  ];

  return (
    <div className="bg-background min-h-screen text-foreground py-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {breadcrumbHome}
          </Link>
          <span>/</span>
          <span className="text-white">{breadcrumbCurrent}</span>
        </nav>

        {/* Hero */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6">
            <Cpu className="w-4 h-4" />
            <span>{serviceTitle} × {industryTitle}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-tight">
            {lang === "ar"
              ? `أنظمة ${serviceTitle} متكاملة لقطاع ${industryTitle}`
              : `Bespoke ${serviceTitle} Engineering for the ${industryTitle} Industry`}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">
                {lang === "ar" ? "حول الخدمة" : "Service Context"}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">{serviceDesc}</p>
            </div>
            <div className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">
                {lang === "ar" ? "تحديات القطاع" : "Industry Requirements"}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">{industryDesc}</p>
            </div>
          </div>
        </header>

        {/* Core Value */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">
            {sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spoke-to-Hub Related Navigation */}
        <section className="mb-16 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">
            {lang === "ar" ? "استكشف الأقسام الرئيسية المتعلقة" : "Explore Related Core Pillars"}
          </h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link 
              href={`/services/${service.id}/`}
              className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-white/80 hover:text-white hover:border-primary/50 transition-all flex items-center gap-2"
            >
              <span>{lang === "ar" ? `جميع خدمات ${serviceTitle}` : `All ${serviceTitle} Services`}</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </Link>
            <Link 
              href={`/industries/${industry.id}/`}
              className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-white/80 hover:text-white hover:border-primary/50 transition-all flex items-center gap-2"
            >
              <span>{lang === "ar" ? `حلول قطاع ${industryTitle}` : `${industryTitle} Industry Overview`}</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zinc-900/60 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl">
          <Building className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {ctaTitle}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-8 max-w-xl mx-auto">
            {ctaDesc}
          </p>

          <Link
            href={`/contact/?project=${encodeURIComponent(breadcrumbCurrent)}`}
            className="inline-flex items-center gap-3 bg-primary text-black font-black uppercase tracking-widest text-xs h-14 px-8 rounded-xl hover:bg-white transition-all shadow-[0_4px_20px_rgba(194,164,92,0.25)]"
          >
            <span>{lang === "ar" ? "اطلب استشارة مجانية الآن" : "Schedule Consultation"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
