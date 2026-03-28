import { storage } from "@/lib/storage";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const revalidate = 60;

export default async function AboutPage() {
  const [teamMembers, updates] = await Promise.all([
    storage.getTeamMembers(true),
    storage.getPlatformUpdates(true),
  ]);
  return <AboutPageContent teamMembers={teamMembers} updates={updates} />;
}
