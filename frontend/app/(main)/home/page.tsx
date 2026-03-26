import { storage } from "@/lib/storage";
import { getServerTranslation } from "@/lib/server-i18n";
import { Suspense } from "react";
import { HeroUpdatesClient, ScrollProgressBar } from "@/components/home/HomeClientComponents";
import { WhyUsBanner, PhilosophySection, ProcessSection, ResultsSection, OutcomesSection } from "@/components/home/HomeStaticSections";
import { ServicesSectionClient, ProjectsSectionClient, PackagesSectionClient, TestimonialsSectionClient } from "@/components/home/HomeDataSections";

// Revalidation time for ISR
export const revalidate = 60;

export default async function Home() {
  const { lang } = await getServerTranslation();
  const isRtl = lang === "ar";

  // Fetch raw data on the server — client components handle picking the right language field
  const rawUpdates = await storage.getPlatformUpdates(true);
  const rawServices = await storage.getServices(true);
  const rawProjects = await storage.getProjects(true, true);
  const rawPackages = await storage.getPackages(true);
  const rawTestimonials = await storage.getTestimonials(true);

  return (
    <div className="w-full">
      <ScrollProgressBar />

      {/* Hero Section — client component, localizes data reactively */}
      <HeroUpdatesClient items={rawUpdates} isRtl={isRtl} />

      {/* Why Us Banner — client component, fully reactive */}
      <WhyUsBanner />

      {/* Services — client component receives raw data, picks language field reactively */}
      <ServicesSectionClient services={rawServices} />

      {/* Projects */}
      <ProjectsSectionClient projects={rawProjects} />

      {/* Packages */}
      <PackagesSectionClient packages={rawPackages} />

      {/* Philosophy (Why Shoka) — client component, fully reactive */}
      <PhilosophySection />

      {/* Process (How We Work) — client component, fully reactive */}
      <ProcessSection />

      {/* Testimonials — client component receives raw data, picks language field reactively */}
      <TestimonialsSectionClient testimonials={rawTestimonials} />

      {/* Results (Our Impact) — client component, fully reactive */}
      <ResultsSection />

      {/* Outcomes CTA — client component, fully reactive */}
      <OutcomesSection />
    </div>
  );
}
