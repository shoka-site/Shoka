"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Tag, ArrowRight, BookOpen, Sparkles } from "lucide-react";

interface PostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string | null;
  category: string;
  readTime?: string;
}

interface Props {
  posts: PostItem[];
  lang: "ar" | "en";
  isRtl: boolean;
}

const CATEGORIES = [
  { id: "all", labelEn: "All Topics", labelAr: "جميع المواضيع" },
  { id: "Iraqi Digital Transformation", labelEn: "Iraqi Transformation", labelAr: "التحول الرقمي العراقي" },
  { id: "Enterprise ERP", labelEn: "Enterprise ERP", labelAr: "أنظمة ERP المؤسسية" },
  { id: "Technical Architecture", labelEn: "Tech Architecture", labelAr: "الهندسة التقنية" },
];

export function BlogListClient({ posts, lang, isRtl }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Iraqi Digital Transformation" && post.category.includes("تقنية"));

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 py-12" dir={isRtl ? "rtl" : "ltr"}>
      {/* Search & Category Filter Header */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-950/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(194,164,92,0.3)]"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {isRtl ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRtl ? "ابحث عن مقال أو تقنية..." : "Search articles or topics..."}
            className="w-full bg-black/50 border border-white/10 rounded-full py-2.5 px-4 pr-10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
          />
          <Search className={`w-4 h-4 text-white/40 absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3.5" : "right-3.5"}`} />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-24 bg-zinc-950/20 border border-white/5 rounded-3xl">
          <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-4" />
          <p className="text-muted-foreground text-base">
            {isRtl ? "لم نجد مقالات تطابق خيارات البحث الحالية." : "No articles found matching your search options."}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-bold text-primary underline"
          >
            {isRtl ? "إلغاء تصفية البحث" : "Reset Filter Criteria"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-zinc-950/60 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="p-8">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {post.category}
                  </span>
                  {post.date && (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Calendar className="w-3 h-3 text-primary/70" />
                      {post.date}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-6 font-light">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="p-8 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className={`inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider hover:underline ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  <span>{isRtl ? "اقرأ المقال الكامل" : "Read Full Article"}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
