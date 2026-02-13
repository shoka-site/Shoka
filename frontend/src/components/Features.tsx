'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Settings2, Rocket, BarChart3, CloudCog } from 'lucide-react';

const packages = [
    {
        title: 'AI Starter Package',
        desc: 'Rapid AI opportunity assessment and first implementation.',
        icon: <Bot />
    },
    {
        title: 'Business Automation',
        desc: 'Automate repetitive workflows across operations and sales.',
        icon: <Settings2 />
    },
    {
        title: 'Startup MVP Package',
        desc: 'Design and launch investor-ready MVP solutions.',
        icon: <Rocket />
    },
    {
        title: 'Data Intelligence',
        desc: 'Executive dashboards with actionable KPI visibility.',
        icon: <BarChart3 />
    },
    {
        title: 'Cloud Scaling',
        desc: 'Secure cloud foundation and scalable architecture.',
        icon: <CloudCog />
    }
];

export default function Features() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 relative">
            <div className="container-shell">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand-400 uppercase bg-brand-400/10 rounded-full">
                        Our Services
                    </div>
                    <h2 className="text-3xl font-bold md:text-5xl text-white">خدماتنا المتميزة</h2>
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        نقدم مجموعة متكاملة من الحلول التقنية المبتكرة التي تساعد في تسريع نمو أعمالك وتحقيق أهدافك الرقمية.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="glass-panel group relative overflow-hidden rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-glow"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />

                            <div className="mb-6 relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 group-hover:text-brand-300 transition-all duration-300 shadow-inner border border-white/5">
                                {pkg.icon}
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-white group-hover:text-brand-300 transition-colors relative z-10">
                                {pkg.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors">
                                {pkg.desc}
                            </p>

                            {/* Hover Light Effect */}
                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:animate-shine" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
