import { storage } from "@/lib/storage";
import { NewsPageContent } from "@/components/news/NewsPageContent";
import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  const title = lang === "ar"
    ? "إنجازاتنا | أحدث الأخبار والفعاليات"
    : "Our Achievements | Latest News & Events";

  const description = lang === "ar"
    ? "تابع آخر أخبار شركة سهلة، إنجازاتنا البرمجية، مشاركتنا في الفعاليات التقنية، وتحديثات منصتنا الرقمية في العراق."
    : "Follow Sehle's latest news, software achievements, participation in tech events, and digital platform updates in Iraq.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
  };
}

export const revalidate = 60;

export default async function NewsPage() {
  const updates = await storage.getPlatformUpdates(true);
  return <NewsPageContent updates={updates} />;
}
