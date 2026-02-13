import Link from 'next/link';

const packages = [
  'AI Starter Package',
  'Business Automation Package',
  'Startup MVP Package',
  'Data Intelligence Dashboard',
  'Cloud Setup & Scaling Package'
];

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="card bg-gradient-to-br from-brand-900 to-brand-700 text-white">
        <p className="text-sm text-brand-100">منصة حلول تقنية وتدريب رقمي متقدم</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
          نصمم أنظمة رقمية ذكية ونقدم تعليمًا تقنيًا بمعايير الصناعة.
        </h1>
        <p className="mt-4 max-w-3xl text-brand-100">
          خبرات متكاملة في الذكاء الاصطناعي، البرمجيات، البيانات، والحوسبة السحابية عبر نموذج خدمات + تعليم.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary bg-white text-brand-900 hover:bg-slate-100" href="/services">استكشف الخدمات</Link>
          <Link className="btn-primary" href="/book-consultation">احجز استشارة</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {packages.map((item) => (
          <div key={item} className="card">
            <h3 className="text-lg font-semibold">{item}</h3>
            <p className="mt-2 text-sm text-slate-600">حل احترافي مصمم لتحقيق ROI، الكفاءة، والنمو مع تقليل المخاطر.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
