import PageHeader from '@/components/PageHeader';
import ServicesGrid from '@/components/ServicesGrid';

import { createDatabase } from '@/lib/db';

import { Service } from '@/types';

export const dynamic = 'force-dynamic';

async function getServices(): Promise<Service[]> {
  try {
    const db = await createDatabase();
    const services = await db.all('SELECT * FROM services ORDER BY created_at DESC');
    return services.map((s) => ({ ...s, features: JSON.parse(s.features) }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-12">
      <PageHeader
        title="الخدمات والحلول"
        description="استكشف مجموعتنا المتكاملة من الخدمات التقنية المصممة لتعزيز أعمالك."
      />

      <ServicesGrid services={services} />
    </div>
  );
}
