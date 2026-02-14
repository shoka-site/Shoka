import PageHeader from '@/components/PageHeader';
import ProjectsGrid from '@/components/ProjectsGrid';

import { createDatabase } from '@/lib/db';

import { Project } from '@/types';

export const dynamic = 'force-dynamic';

async function getProjects(): Promise<Project[]> {
  try {
    const db = await createDatabase();
    const projects = await db.all('SELECT * FROM projects ORDER BY created_at DESC');
    return projects.map((p) => ({
      ...p,
      technologies: JSON.parse(p.technologies),
      images: p.images ? JSON.parse(p.images) : []
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <section className="section-alt min-h-screen">
      <div className="container-shell">
        <PageHeader
          title="معرض الأعمال"
          description="نماذج من المشاريع التي قمنا بتنفيذها والنتائج التي حققناها لعملائنا."
        />

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
