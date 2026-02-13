import PageHeader from '@/components/PageHeader';
import ProjectsGrid from '@/components/ProjectsGrid';

async function getProjects() {
  try {
    const res = await fetch('http://localhost:4000/api/projects', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-12">
      <PageHeader
        title="معرض الأعمال"
        description="نماذج من المشاريع التي قمنا بتنفيذها والنتائج التي حققناها لعملائنا."
      />

      <ProjectsGrid projects={projects} />
    </div>
  );
}
