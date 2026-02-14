import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import Link from 'next/link';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token')?.value;

  if (!token || !verifyToken(token)) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider text-shoka-sand">SHOKA ADMIN</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Overview</div>

          <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all group">
            <span className="group-hover:translate-x-1 transition-transform">Dashboard</span>
          </Link>

          <div className="mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Management</div>

          <Link href="/admin/leads" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all group">
            <span className="group-hover:translate-x-1 transition-transform">Leads</span>
          </Link>

          <Link href="/admin/bookings" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all group">
             <span className="group-hover:translate-x-1 transition-transform">Bookings</span>
          </Link>

          <div className="mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Content</div>

          <Link href="/admin/services" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all group">
             <span className="group-hover:translate-x-1 transition-transform">Services</span>
          </Link>

          <Link href="/admin/projects" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all group">
             <span className="group-hover:translate-x-1 transition-transform">Projects</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
           {/* Using a client component for logout logic would be cleaner, but simple fetch works too */}
           <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-medium text-sm"
      >
        Sign Out
      </button>
    </form>
  )
}
