'use client';

import { useEffect, useState } from 'react';
import { Cpu, Zap, Layers, Database, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Icon mapping
const icons: Record<string, React.ReactNode> = {
    'حلول الذكاء الاصطناعي': <Cpu size={28} />,
    'الأتمتة': <Zap size={28} />,
    'هندسة المنتجات': <Layers size={28} />,
    'البيانات والتحليلات': <Database size={28} />,
    'البنية التحتية السحابية': <Globe size={28} />
};

import { Service } from '@/types';

export default function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchServices() {
            try {
                const res = await fetch('/api/services');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-shoka-sand/10 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
                <div
                    key={service.id}
                    className="card-premium group flex flex-col justify-between"
                >
                    <div>
                        {/* Icon & Category */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-shoka-sand/20 rounded-xl text-shoka-clay group-hover:bg-shoka-clay group-hover:text-shoka-ivory transition-colors duration-300">
                                {icons[service.category] || <Layers size={28} />}
                            </div>
                            <span className="text-xs font-semibold tracking-wide text-shoka-clay/80 uppercase bg-shoka-sand/10 px-3 py-1 rounded-full">
                                {service.category}
                            </span>
                        </div>

                        {/* Content */}
                        <h3 className="heading-premium text-2xl mb-3 group-hover:text-shoka-clay transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-body-premium text-base mb-6 line-clamp-3">
                            {service.description}
                        </p>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-4 pt-4 border-t border-shoka-dark/5 flex items-center justify-between">
                        <span className="text-sm font-medium text-text-muted">
                            {service.pricing_model}
                        </span>
                        <Link
                            href={`/services/${service.id}`}
                            className="inline-flex items-center gap-2 text-shoka-clay font-bold text-sm hover:gap-3 transition-all"
                        >
                            تفاصيل الخدمة <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
