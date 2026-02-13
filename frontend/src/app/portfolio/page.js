async function getProjects() {
  const res = await fetch('http://localhost:4000/api/projects', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-900">المشاريع ودراسات الحالة</h1>
      <div className="space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="card">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{project.description}</p>
            <p className="mt-3 text-sm">التقنيات: {project.technologies.join('، ')}</p>
            {project.results && <p className="mt-2 text-sm font-semibold text-emerald-700">النتيجة: {project.results}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
