'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
    return (
        <section className="relative overflow-hidden pt-10 pb-8">
            <div className="relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-2xl text-lg text-slate-400"
                    >
                        {description}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-6"
                    >
                        {children}
                    </motion.div>
                )}
            </div>

            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[100px]" />
        </section>
    );
}
