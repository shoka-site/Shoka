import { createDatabase } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getProjects() {
  const db = await createDatabase();
  const projects = await db.all('SELECT * FROM projects ORDER BY created_at DESC');
  return projects;
}

export default async function ProjectsAdminPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Projects Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
          Add New Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {projects.map((project: any) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {project.industry}
                </span>
                <span className="text-xs text-gray-400">ID: {project.id}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {JSON.parse(project.technologies).map((tech: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-900 truncate w-32" title={project.results}>
                  {project.results}
                </span>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Edit
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
             <div className="col-span-full text-center py-12 text-gray-500">
               No projects found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
