'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Cpu, Database, Cloud } from 'lucide-react';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 -z-20 bg-dark-bg">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container-shell grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-right lg:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300 backdrop-blur-md mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                        </span>
                        المنصة الذكية الأولى للحلول التقنية
                    </motion.div>

                    <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl lg:leading-[1.1] text-white">
                        نصمم <span className="heading-gradient">المستقبل الرقمي</span>
                        <br />
                        بذكاء اصطناعي
                    </h1>

                    <p className="mt-6 text-lg text-slate-400 md:text-xl leading-relaxed max-w-lg ml-auto">
                        نحول الأفكار المعقدة إلى برمجيات قوية. منصة متكاملة تجمع بين تطوير الأنظمة المتطورة والتدريب التقني المتقدم لتمكين جيل جديد من المبتكرين.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 justify-end">
                        <Link className="btn-secondary group" href="/contact">
                            تواصل معنا
                        </Link>
                        <Link className="btn-primary group" href="/services">
                            <span>استكشف خدماتنا</span>
                            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        </Link>
                    </div>

                    {/* Mini Tech Stack Indicators */}
                    <div className="mt-12 flex gap-6 justify-end text-slate-500">
                        <motion.div whileHover={{ y: -5, color: '#38bdf8' }} className="flex flex-col items-center gap-2 transition-colors">
                            <Code2 size={24} />
                            <span className="text-xs">DevOps</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, color: '#a855f7' }} className="flex flex-col items-center gap-2 transition-colors">
                            <Cpu size={24} />
                            <span className="text-xs">AI Models</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, color: '#22c55e' }} className="flex flex-col items-center gap-2 transition-colors">
                            <Database size={24} />
                            <span className="text-xs">Big Data</span>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, color: '#f59e0b' }} className="flex flex-col items-center gap-2 transition-colors">
                            <Cloud size={24} />
                            <span className="text-xs">Cloud</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Abstract UI Representation */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative lg:h-[600px] w-full flex items-center justify-center lg:order-2"
                >
                    <div className="relative w-full aspect-square max-w-[500px]">
                        {/* Main Orb */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-tr from-brand-600/30 to-accent/30 rounded-full blur-3xl"
                        />

                        {/* Floating Cards Mockup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute inset-10 glass-panel rounded-2xl border border-white/10 p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl"
                        >
                            {/* Fake Terminal Header */}
                            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <div className="mr-auto text-xs font-mono text-slate-500">server_status.jsx</div>
                            </div>

                            {/* Fake Code Lines */}
                            <div className="space-y-3 font-mono text-xs">
                                <div className="flex gap-4">
                                    <span className="text-slate-600">01</span>
                                    <span className="text-brand-400">import</span> <span className="text-white">Brain</span> <span className="text-brand-400">from</span> <span className="text-green-400">'@ai/core'</span>;
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600">02</span>
                                    <span className="text-brand-400">const</span> <span className="text-yellow-200">initializePlatform</span> = <span className="text-brand-400">async</span> () ={">"} {"{"}
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600">03</span>
                                    <span className="ml-4 text-white">await <span className="text-blue-400">Brain.connect</span>();</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600">04</span>
                                    <span className="ml-4 text-white">return <span className="text-accent">"System Online"</span>;</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600">05</span>
                                    <span className="text-white">{"}"}</span>
                                </div>
                            </div>

                            {/* Animated Graph Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 h-32 bg-slate-900/50 rounded-lg overflow-hidden border border-white/5">
                                <div className="flex items-end justify-between h-full px-2 pb-0 pt-4 gap-1">
                                    {[40, 70, 45, 90, 65, 85, 95, 60, 75, 50].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                                            className="w-full bg-gradient-to-t from-brand-600 to-brand-400/50 rounded-t-sm opacity-80"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Badge 1 */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 bg-slate-800 p-4 rounded-xl border border-white/10 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                    <Cpu size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">System Load</div>
                                    <div className="text-sm font-bold text-white">Optimized</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Badge 2 */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-8 -left-8 bg-slate-800 p-4 rounded-xl border border-white/10 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                                    <Database size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">Data Processed</div>
                                    <div className="text-sm font-bold text-white">1.2 TB/s</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
