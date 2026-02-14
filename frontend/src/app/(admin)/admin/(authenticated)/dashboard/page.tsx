import { createDatabase } from '@/lib/db';
import { Users, Calendar, Briefcase, Server } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
  const db = await createDatabase();
  const leads = await db.get('SELECT COUNT(*) as count FROM leads');
  const bookings = await db.get('SELECT COUNT(*) as count FROM bookings');
  const services = await db.get('SELECT COUNT(*) as count FROM services');
  const projects = await db.get('SELECT COUNT(*) as count FROM projects');

  return {
    leads: leads.count,
    bookings: bookings.count,
    services: services.count,
    projects: projects.count,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={stats.leads}
          icon={<Users className="w-8 h-8 text-indigo-500" />}
          bg="bg-indigo-50"
        />
        <StatCard
          title="Total Bookings"
          value={stats.bookings}
          icon={<Calendar className="w-8 h-8 text-emerald-500" />}
          bg="bg-emerald-50"
        />
        <StatCard
          title="Services"
          value={stats.services}
          icon={<Briefcase className="w-8 h-8 text-amber-500" />}
          bg="bg-amber-50"
        />
        <StatCard
          title="Projects"
          value={stats.projects}
          icon={<Server className="w-8 h-8 text-rose-500" />}
          bg="bg-rose-50"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg }: { title: string, value: number, icon: React.ReactNode, bg: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:-translate-y-1">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${bg}`}>
        {icon}
      </div>
    </div>
  );
}
