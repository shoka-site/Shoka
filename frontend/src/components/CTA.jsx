'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-brand-900 border border-brand-500/20 px-6 py-20 text-center shadow-2xl backdrop-blur-sm isolate">
            {/* Animated Background Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-500/20 blur-[100px] rounded-full -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent/20 blur-[100px] rounded-full -z-10"
            />

            <div className="relative z-10 max-w-3xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-white md:text-5xl"
                >
                    جاهز لبدء رحلتك الرقمية؟
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-6 text-lg text-slate-300"
                >
                    احجز استشارة مجانية اليوم ودعنا نساعدك في تحديد الخطوات التالية لمشروعك التقني القادم.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10"
                >
                    <Link className="btn-primary text-lg px-10 py-5" href="/book-consultation">
                        احجز استشارة مجانية
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
