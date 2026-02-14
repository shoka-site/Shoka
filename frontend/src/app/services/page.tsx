import PageHeader from '@/components/PageHeader';
import ServicesGrid from '@/components/ServicesGrid';

import { createDatabase } from '@/lib/db';

import { Service } from '@/types';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return (
    <section className="min-h-screen bg-shoka-ivory">
      <div className="pt-32 pb-16 bg-shoka-ivory relative overflow-hidden">
        {/* Background Subtle Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-shoka-sand/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-shell relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="heading-premium text-5xl md:text-6xl mb-6">
            حلول تقنية <span className="text-shoka-clay">مبنية للنمو</span>
          </h1>
          <p className="text-body-premium max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات الرقمية المصممة لتمكين المؤسسات من التحول الرقمي الحقيقي، من الذكاء الاصطناعي إلى البنية السحابية.
          </p>
        </div>
      </div>

      <div className="section-wrapper bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shoka-dark/5 to-transparent" />
        <div className="container-shell">
          <ServicesGrid />
        </div>
      </div>
    </section>
  );
}
