import PageHeader from '@/components/PageHeader';
import ServicesGrid from '@/components/ServicesGrid';

async function getServices() {
  try {
    const res = await fetch('http://localhost:4000/api/services', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
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
