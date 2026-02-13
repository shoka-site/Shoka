'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, Database, Globe, Cpu } from 'lucide-react';

import { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
    'AI Solutions': <Cpu size={32} />,
    'Automation': <Zap size={32} />,
    'Product Engineering': <Layers size={32} />,
    'Data & Analytics': <Database size={32} />,
    'Cloud Infrastructure': <Globe size={32} />
};

import { Service } from '@/types';

interface ServicesGridProps {
    services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
            {services.map((service, idx) => (
                <motion.div
                    key={service.id || idx}
                    variants={item}
                    className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-glow"
                >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 group-hover:text-brand-300 transition-colors shadow-inner border border-white/5">
                        {icons[service.category] || <Layers size={32} />}
                    </div>

                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-500">
                        {service.category}
                    </div>

                    <h2 className="mb-3 text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                        {service.title}
                    </h2>

                    <p className="mb-6 text-sm leading-relaxed text-slate-400">
                        {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto border-t border-white/5 pt-4">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">التسعير</span>
                            <span className="font-medium text-brand-300 bg-brand-500/10 px-2 py-1 rounded">
                                {service.pricing_model || 'حسب الطلب'}
                            </span>
                        </div>
                    </div>

                    {/* Hover Shine Effect */}
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:animate-shine" />
                </motion.div>
            ))}
        </motion.div>
    );
}
