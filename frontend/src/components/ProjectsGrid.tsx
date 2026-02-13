'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Box } from 'lucide-react';

import { Project } from '@/types';

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (!projects.length) {
        return (
            <div className="text-center text-slate-400 py-12">
                <Box className="mx-auto h-12 w-12 text-slate-600 mb-4" />
                <p>لا توجد مشاريع لعرضها حالياً.</p>
            </div>
        );
    }

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
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2"
        >
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    variants={item}
                    className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5 shadow-2xl transition-all duration-300 hover:border-brand-500/20 hover:shadow-brand-500/10"
                >
                    {/* Image Overlay */}
                    <div className="relative h-64 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                        <img
                            src={project.images[0] || 'https://placehold.co/800x500'}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 z-20">
                            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-brand-600/90 backdrop-blur-sm rounded-full shadow-lg">
                                {project.industry || 'Tech'}
                            </span>
                        </div>
                    </div>

                    <div className="p-6 relative z-20 -mt-12">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                            {project.description}
                        </p>

                        {project.results && (
                            <div className="mb-4 pl-4 border-l-2 border-green-500/50">
                                <p className="text-sm font-semibold text-green-400">
                                    {project.results}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs text-slate-400 bg-white/5 rounded border border-white/5"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
