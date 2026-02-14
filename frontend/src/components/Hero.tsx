'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-dark-bg px-8">
            {/* Abstract Fluid Background (DataArt Style) */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-1/2 -right-1/4 w-[150vh] h-[150vh] bg-gradient-to-br from-brand-600/30 via-accent/20 to-transparent rounded-full blur-[100px] opacity-60"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        x: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-1/2 -left-1/4 w-[120vh] h-[120vh] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-transparent rounded-full blur-[120px] opacity-50"
                />
            </div>

            <div className="container-shell relative z-10 w-full max-w-[1920px] mx-auto grid lg:grid-cols-12 gap-12 items-center h-full">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 lg:pr-12 text-right"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-8">
                        نصمم <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-400 to-white">
                            المستقبل التقني
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl ml-auto mb-12 font-light">
                        منصة شاملة تجمع بين هندسة البرمجيات المتقدمة وحلول الذكاء الاصطناعي لتمكين المؤسسات من بناء غدٍ أفضل.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-end">
                        <Link
                            href="/services"
                            className="bg-brand-600 hover:bg-brand-500 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-2 group"
                        >
                            <span>اكتشف خدماتنا</span>
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/portfolio"
                            className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                        >
                            معرض الأعمال
                        </Link>
                    </div>
                </motion.div>

                {/* Empty Space / Visual Balance (DataArt keeps one side open for the graphic) */}
                <div className="lg:col-span-5 h-full min-h-[400px]"></div>
            </div>

            {/* Bottom Controls / Pagination (DataArt Style) */}
            <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between pointer-events-none">
                {/* Pagination Controls */}
                <div className="flex items-center gap-2 pointer-events-auto">
                    <button className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-white/50 text-sm font-mono">01</span>
                    <div className="w-32 h-px bg-white/20 overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                            className="w-full h-full bg-brand-400"
                        />
                    </div>
                    <span className="text-white/50 text-sm font-mono">04</span>
                </div>
            </div>
        </section>
    );
}
