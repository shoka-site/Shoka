import { storage } from "@/lib/storage";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await storage.getServices(true);
  return <ServicesPageContent services={services} />;
}
