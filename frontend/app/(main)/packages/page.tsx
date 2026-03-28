import { storage } from "@/lib/storage";
import { PackagesPageContent } from "@/components/packages/PackagesPageContent";

export const revalidate = 60;

export default async function PackagesPage() {
  const packages = await storage.getPackages(true);
  // Cast to include descriptionEn/Ar which are in the DB but not the Zod schema
  return <PackagesPageContent packages={packages as Parameters<typeof PackagesPageContent>[0]["packages"]} />;
}
