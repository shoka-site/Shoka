async function getServices() {
  const res = await fetch('http://localhost:4000/api/services', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-900">الخدمات</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="card">
            <p className="text-xs font-semibold text-brand-700">{service.category}</p>
            <h2 className="mt-1 text-xl font-bold">{service.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{service.description}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {service.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">نموذج التسعير: {service.pricing_model || 'مخصص'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
