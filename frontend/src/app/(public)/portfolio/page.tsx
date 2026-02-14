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
      images: JSON.parse(p.images)
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <section className="min-h-screen bg-shoka-ivory">
      <div className="pt-32 pb-16 bg-shoka-ivory relative overflow-hidden">
        {/* Background Subtle Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-shoka-clay/5 rounded-full blur-[100px] -translate-y-1/3 -translate-x-1/4" />

        <div className="container-shell relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="heading-premium text-5xl md:text-6xl mb-6">
            أعمالنا <span className="text-shoka-clay">المتميزة</span>
          </h1>
          <p className="text-body-premium max-w-2xl mx-auto">
            نستعرض بفخر مجموعة من المشاريع التي ساهمت في تحويل رؤى عملائنا إلى واقع رقمي ملموس ومؤثر.
          </p>
        </div>
      </div>

      <div className="section-wrapper bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shoka-dark/5 to-transparent" />
        <div className="container-shell">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
