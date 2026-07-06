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

export default async function BlogPage() {
  const { lang } = await getServerTranslation();
  const isRtl = lang === "ar";

  // Reuse platform-updates as blog posts (the existing data model)
  const rawUpdates = await storage.getPlatformUpdates(true);
  const posts = rawUpdates.map((u) => ({
    id: u.id,
    title: lang === "ar" ? (u.titleAr || u.titleEn) : u.titleEn,
    excerpt: lang === "ar" ? (u.summaryAr || u.summaryEn) : u.summaryEn,
    date: u.date ? new Date(u.date).toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US", {
      year: "numeric", month: "long", day: "numeric"
    }) : null,
    category: u.type || (lang === "ar" ? "تقنية" : "Tech"),
  }));

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
        <div className="relative bg-black text-white pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(194,164,92,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-4">
              {isRtl ? "◆◆◆ المدونة ◆◆◆" : "◆◆◆ BLOG ◆◆◆"}
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6"
              style={{ background: "linear-gradient(180deg,#fff 40%,#c2a45c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {isRtl ? "رؤى التحول الرقمي" : "Digital Insights"}
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              {isRtl
                ? "أفكار وتجارب عملية من فريق سهلة حول تقنية المعلومات والحلول البرمجية في العراق."
                : "Practical ideas and experiences from the Sehle team on IT and software solutions in Iraq."}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-20">
          {posts.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-muted-foreground text-lg">
                {isRtl ? "لا توجد مقالات حتى الآن. تابعنا قريباً." : "No posts yet. Check back soon."}
              </p>
              <Link href="/home" className="mt-8 inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                {isRtl ? "العودة للرئيسية" : "Back to Home"}
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="group bg-background border border-border/60 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      {post.date && (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    )}
                    <Link
                      href="/news"
                      className={`inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      {isRtl ? "اقرأ المزيد" : "Read more"}
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Editorial pillars section */}
          <div className="mt-24 pt-16 border-t border-border">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3">
                {isRtl ? "محاور المحتوى" : "Content Pillars"}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
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
                <div key={pillar.en} className="bg-muted/20 border border-border/50 rounded-2xl p-6 text-center hover:border-primary/30 transition-colors">
                  <div className="text-3xl mb-3">{pillar.icon}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{isRtl ? pillar.ar : pillar.en}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{isRtl ? pillar.desc.ar : pillar.desc.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
