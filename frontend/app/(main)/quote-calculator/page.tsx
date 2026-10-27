import { getServerTranslation } from "@/lib/server-i18n";
import { Metadata } from "next";
import { QuoteCalculatorClient } from "@/components/calculator/QuoteCalculatorClient";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getServerTranslation();

  return buildMetadata({
    titleAr: "حاسبة تكلفة الأنظمة والبرمجيات | احسب تقدير مشروعك",
    titleEn: "Software & ERP Scope Calculator | Estimate Your Project Cost",
    descriptionAr: "احسب التكلفة المبدئية والمدة الزمنية لتطوير نظامك المؤسسي أو تطبيقك الرقمي مع حاسبة سهلة التفاعلية.",
    descriptionEn: "Calculate the estimated scope, budget, and deployment timeline for your custom software or ERP system in Iraq using Sehle's calculator.",
    path: "/quote-calculator",
    keywordsAr: ["حاسبة تكلفة البرمجة", "تكلفة نظام ERP العراق", "تكلفة تطوير تطبيق هاتف", "سعر برنامج المحاسبة"],
    keywordsEn: ["software cost calculator Iraq", "ERP price estimation", "custom mobile app development cost"],
    lang,
  });
}

import { TestimonialCarouselClient } from "@/components/testimonials/TestimonialCarouselClient";

export default async function QuoteCalculatorPage() {
  const { isRtl } = await getServerTranslation();

  return (
    <div>
      <QuoteCalculatorClient isRtl={isRtl} />
      <div className="container mx-auto px-6 max-w-5xl pb-16">
        <TestimonialCarouselClient isRtl={isRtl} />
      </div>
    </div>
  );
}
