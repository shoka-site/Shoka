import { storage } from "@/lib/storage";
import { NewsPageContent } from "@/components/news/NewsPageContent";

export const revalidate = 60;

export default async function NewsPage() {
  const updates = await storage.getPlatformUpdates(true);
  return <NewsPageContent updates={updates} />;
}
