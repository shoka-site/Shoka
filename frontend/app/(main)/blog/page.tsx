import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();
  const title = lang === "ar" ? "المدونة | رؤى التحول الرقمي في العراق" : "Blog | Digital Transformation Insights for Iraq";
  const description = lang === "ar"
    ? "اكتشف أحدث المقالات والرؤى حول التحول الرقمي وتطوير البرمجيات وتقنية المعلومات في العراق من فريق سهلة."
    : "Discover the latest articles and insights on digital transformation, software development, and IT in Iraq from the Sehle team.";
  return {
    title,
    description,
    alternates: { canonical: "https://www.sehle.site/blog/" },
    openGraph: { title, description },
  };
}

export const revalidate = 60;

import { BlogListClient } from "@/components/blog/BlogListClient";
import { slugify } from "@/lib/utils";

export default async function BlogPage() {
  const { lang, isRtl } = await getServerTranslation();

  // Reuse platform-updates as blog posts (the existing data model)
  const rawUpdates = await storage.getPlatformUpdates(true);
  const posts = rawUpdates.map((u) => {
    const title = lang === "ar" ? (u.titleAr || u.titleEn) : u.titleEn;
    return {
      id: u.id,
      slug: slugify(u.titleEn || u.id),
      title,
      excerpt: lang === "ar" ? (u.summaryAr || u.summaryEn) : u.summaryEn,
      date: u.date ? new Date(u.date).toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US", {
        year: "numeric", month: "long", day: "numeric"
      }) : null,
      category: u.type || (lang === "ar" ? "تقنية" : "Tech"),
    };
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === "ar" ? "مدونة سهلة" : "Sehle Blog",
    "url": "https://www.sehle.site/blog",
    "description": lang === "ar"
      ? "رؤى التحول الرقمي وتطوير البرمجيات في العراق"
      : "Digital transformation and software development insights for Iraq",
    "publisher": {
      "@type": "Organization",
      "name": "سهلة | Sehle",
      "url": "https://www.sehle.site",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="bg-background min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
        {/* Hero */}
        <div className="relative bg-background text-foreground border-b border-border/40 pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(194,164,92,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4">
              {isRtl ? "◆◆◆ المدونة الرئسية ◆◆◆" : "◆◆◆ INSIGHTS & ARTICLES ◆◆◆"}
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6"
              style={{ background: "linear-gradient(180deg,var(--foreground) 40%,var(--primary) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {isRtl ? "رؤى التحول الرقمي" : "Digital Transformation Insights"}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              {isRtl
                ? "أفكار ودراسات هندسية من فريق سهلة حول تقنية المعلومات والأنظمة المؤسسية في العراق."
                : "Practical engineering ideas and case studies from the Sehle team on IT & ERP solutions in Iraq."}
            </p>
          </div>
        </div>

        {/* Client Interactive Search & Filtering */}
        <BlogListClient posts={posts} lang={lang} isRtl={isRtl} />

        {/* Editorial pillars section */}
        <div className="container mx-auto px-6 pb-24 border-t border-border pt-16">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3">
              {isRtl ? "محاور المحتوى" : "Content Pillars"}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {isRtl ? "ماذا نكتب عنه" : "What We Write About"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                en: "Iraqi Digital Transformation",
                ar: "التحول الرقمي في العراق",
                desc: { en: "How Iraqi businesses are modernizing operations", ar: "كيف تحدث الشركات العراقية عملياتها" },
                icon: "🇮🇶",
              },
              {
                en: "Technical Excellence",
                ar: "التميز التقني",
                desc: { en: "Engineering best practices and architecture patterns", ar: "أفضل ممارسات الهندسة وأنماط البنية" },
                icon: "⚙️",
              },
              {
                en: "Industry Solutions",
                ar: "حلول القطاعات",
                desc: { en: "ERP, healthcare, logistics & retail software", ar: "برمجيات ERP والرعاية الصحية والخدمات" },
                icon: "🏗️",
              },
              {
                en: "Company Culture",
                ar: "ثقافة الشركة",
                desc: { en: "Behind the scenes at Sehle", ar: "من خلف الكواليس في سهلة" },
                icon: "🌟",
              },
            ].map((pillar) => (
              <div key={pillar.en} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors">
                <div className="text-3xl mb-3">{pillar.icon}</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{isRtl ? pillar.ar : pillar.en}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{isRtl ? pillar.desc.ar : pillar.desc.en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
