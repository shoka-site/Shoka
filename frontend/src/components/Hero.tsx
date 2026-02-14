'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-shoka-ivory overflow-hidden">

            {/* Background Texture & Patterns */}
            <div className="absolute inset-0 opacity-40 bg-heritage-pattern" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-shoka-sand/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-shoka-clay/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />

            <div className="container-shell relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right order-2 lg:order-1"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-shoka-sand/20 border border-shoka-sand/30 text-shoka-clay text-sm font-medium mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-shoka-clay animate-pulse" />
                        منصة الحلول التقنية المتقدمة
                    </motion.div>

                    {/* Headline */}
                    <h1 className="heading-premium text-5xl md:text-7xl mb-8">
                        بناء الأنظمة <br />
                        <span className="text-shoka-clay">الرقمية الذكية</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-body-premium mb-10 max-w-lg ml-auto">
                        نجمع بين عمق التراث العراقي وحداثة التكنولوجيا الرقمية. نقدم حلول الذكاء الاصطناعي، البرمجيات، والبيانات للمؤسسات الطموحة.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-end">
                        <Link href="/contact" className="btn-secondary group">
                            <span>احجز استشارة</span>
                        </Link>
                        <Link href="/services" className="btn-primary group">
                            <span>استكشف خدماتنا</span>
                            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        </Link>
                    </div>
                </motion.div>

                {/* Visual Side - Abstract Heritage/Future Geometry */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative order-1 lg:order-2 h-[500px] flex items-center justify-center"
                >
                    {/* Abstract Composition */}
                    <div className="relative w-full max-w-md aspect-square">
                        {/* Main Image Frame (Placeholder for Architectural/Tech Visual) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-shoka-sand to-shoka-ivory rounded-2xl overflow-hidden shadow-premium border border-white/50">
                            {/* Simulate 'Architecture' or 'System' via CSS shapes or placeholder image */}
                            <div className="absolute inset-0 bg-[url('/architectural-pattern.svg')] opacity-20 mix-blend-multiply" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 border border-shoka-dark/10 rounded-xl" />
                                <div className="absolute w-1/2 h-1/2 bg-shoka-clay/10 backdrop-blur-sm rounded-lg border border-shoka-clay/20 shadow-lg" />
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-8 -right-8 w-24 h-24 bg-white rounded-xl shadow-soft flex items-center justify-center p-4 border border-shoka-sand/20"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-shoka-dark">98%</div>
                                <div className="text-[10px] text-text-muted">دقة النظام</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -left-6 bg-shoka-dark text-shoka-ivory rounded-xl shadow-premium p-5 max-w-[180px]"
                        >
                            <div className="text-xs text-shoka-sand mb-1">الحالة</div>
                            <div className="text-sm font-medium">أنظمة ذكية قيد العمل</div>
                            <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-shoka-gold" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-shoka-clay/50"
            >
                <span className="text-xs tracking-widest uppercase">تصفح</span>
                <div className="w-px h-12 bg-gradient-to-b from-shoka-clay/50 to-transparent" />
            </motion.div>
        </section>
    );
}
