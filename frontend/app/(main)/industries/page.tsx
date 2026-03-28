import { storage } from "@/lib/storage";
import { IndustriesPageContent } from "@/components/industries/IndustriesPageContent";

export const revalidate = 60;

export default async function IndustriesPage() {
  const industries = await storage.getIndustries(true);
  return <IndustriesPageContent industries={industries} />;
}
