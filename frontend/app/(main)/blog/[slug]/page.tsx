import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, ArrowRight, Share2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const updates = await storage.getPlatformUpdates(true);
  const post = updates.find((u) => slugify(u.titleEn || u.id) === slug || u.id === slug);
  const { lang } = await getServerTranslation();

  if (!post) {
    return {
      title: lang === "ar" ? "المقال غير موجود | سهلة" : "Post Not Found | Sehle",
    };
  }

  const titleAr = post.titleAr || post.titleEn;
  const titleEn = post.titleEn;
  const descAr = post.summaryAr || post.summaryEn;
  const descEn = post.summaryEn;

  return buildMetadata({
    titleAr: `${titleAr} | مدونة سهلة`,
    titleEn: `${titleEn} | Sehle Blog`,
    descriptionAr: descAr ? descAr.substring(0, 160) : "",
    descriptionEn: descEn ? descEn.substring(0, 160) : "",
    path: `/blog/${slug}`,
    keywordsAr: ["مقالات برمجية", "التحول الرقمي بالعراق", post.type || "تقنية"],
    keywordsEn: ["Sehle engineering blog", "Iraqi tech insights", post.type || "Technology"],
    lang,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const updates = await storage.getPlatformUpdates(true);
  const post = updates.find((u) => slugify(u.titleEn || u.id) === slug || u.id === slug);
  const { lang, isRtl } = await getServerTranslation();

  if (!post) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center py-32 text-center" dir={isRtl ? "rtl" : "ltr"}>
        <div className="container mx-auto px-6 max-w-lg">
          <h1 className="text-4xl font-display font-bold mb-4">{isRtl ? "المقال غير موجود" : "Article Not Found"}</h1>
          <p className="text-muted-foreground text-sm mb-8">{isRtl ? "يبدو أن المقال الذي تبحث عنه غير متوفر أو تم نقله." : "The article you are looking for is unavailable or has been moved."}</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider underline">
            <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            <span>{isRtl ? "العودة للمدونة" : "Back to All Articles"}</span>
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === "ar" ? (post.titleAr || post.titleEn) : post.titleEn;
  const summary = lang === "ar" ? (post.summaryAr || post.summaryEn) : post.summaryEn;
  const content = summary;
  const dateFormatted = post.date
    ? new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const SITE_URL = "https://www.sehle.site";
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": summary,
    "url": `${SITE_URL}/blog/${slug}`,
    "datePublished": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "فريق سهلة الهندسي | Sehle Engineering Team",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "سهلة | Sehle",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/og-image.png`,
      },
    },
    "articleSection": post.type || "Technology",
    "inLanguage": lang === "ar" ? "ar-IQ" : "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <article className="bg-background min-h-screen text-foreground pb-24" dir={isRtl ? "rtl" : "ltr"}>
        {/* Header */}
        <header className="relative bg-black text-white pt-32 pb-20 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(194,164,92,0.15)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-8 uppercase tracking-widest"
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              <span>{isRtl ? "العودة لجميع المقالات" : "Back to Blog Library"}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                {post.type || (isRtl ? "تقنية" : "Engineering")}
              </span>
              {dateFormatted && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Calendar className="w-3.5 h-3.5 text-primary/70" />
                  {dateFormatted}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mb-6 leading-[1.15]">
              {title}
            </h1>

            {summary && (
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl">
                {summary}
              </p>
            )}
          </div>
        </header>

        {/* Content Body */}
        <main className="container mx-auto px-6 max-w-3xl py-16">
          <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground font-light leading-relaxed">
            {content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-8">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author & Handoff Footer */}
          <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-950/40 p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                S
              </div>
              <div>
                <div className="font-bold text-white text-sm">{isRtl ? "فريق سهلة الهندسي" : "Sehle Engineering Team"}</div>
                <div className="text-xs text-muted-foreground">{isRtl ? "خبراء الأنظمة والتحول الرقمي" : "Custom Software & Enterprise Systems"}</div>
              </div>
            </div>

            <Link
              href="/quote-calculator"
              className="inline-flex items-center gap-2 bg-primary text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-white transition-all shadow-lg"
            >
              <span>{isRtl ? "احسب تكلفة نظامك" : "Estimate System Cost"}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </main>
      </article>
    </>
  );
}
