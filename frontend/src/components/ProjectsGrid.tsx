'use client';

import { ArrowRight, Box } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (!projects.length) {
        return (
            <div className="text-center py-20 bg-shoka-sand/5 rounded-3xl border border-shoka-sand/20">
                <Box className="mx-auto h-16 w-16 text-shoka-clay/50 mb-6" />
                <h3 className="heading-premium text-2xl mb-2">لا توجد مشاريع حالياً</h3>
                <p className="text-body-premium">سنقوم بإضافة مشاريعنا المميزة قريباً.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-10 md:grid-cols-2">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-shoka-dark/5 shadow-soft hover:shadow-premium transition-all duration-500"
                >
                    {/* Image Section */}
                    <div className="relative h-72 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <img
                            src={project.images[0] || 'https://placehold.co/800x500'}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 z-20">
                            <span className="inline-block px-4 py-1.5 text-xs font-bold text-shoka-ivory bg-shoka-clay/90 backdrop-blur-md rounded-full shadow-lg">
                                {project.industry || 'Technlogy'}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 relative">
                        {/* Title & Desc */}
                        <div className="mb-6">
                            <h3 className="heading-premium text-2xl mb-3 group-hover:text-shoka-clay transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-body-premium text-base line-clamp-3 mb-6">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.slice(0, 4).map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-xs font-medium text-shoka-dark/70 bg-shoka-sand/10 rounded-full border border-shoka-sand/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Results / Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-shoka-dark/5">
                            {project.results ? (
                                <div className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                                    {project.results}
                                </div>
                            ) : <span />}

                            <Link
                                href={`/portfolio/${project.id}`}
                                className="inline-flex items-center gap-2 text-shoka-clay font-bold text-sm hover:gap-3 transition-all"
                            >
                                عرض المشروع <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
