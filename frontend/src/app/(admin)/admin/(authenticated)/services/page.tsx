import { createDatabase } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getServices() {
  const db = await createDatabase();
  const services = await db.all('SELECT * FROM services ORDER BY created_at DESC');
  return services;
}

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Services Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
          Add New Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {services.map((service: any) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {service.category}
                </span>
                <span className="text-xs text-gray-400">ID: {service.id}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">{service.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-900">{service.pricing_model}</span>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Edit
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
             <div className="col-span-full text-center py-12 text-gray-500">
               No services found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
