import Section from "@/components/layout/Section";
import Link from "next/link";
import { History, Zap, Rocket, ArrowRight } from "lucide-react";
import { storage } from "@/lib/storage";
import { transformForLanguage } from "@/lib/api-utils";
import { getServerTranslation } from "@/lib/server-i18n";
import { ProjectsHero, ProjectCard, FadeInSection } from "@/components/projects/ProjectsClientComponents";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

export default async function Projects() {
    const { t, isRtl, lang } = await getServerTranslation();

    return (
        <div className="bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
            <ProjectsHero isRtl={isRtl} />

            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <Suspense fallback={<Section className="py-24 flex items-center justify-center">Loading Projects...</Section>}>
                    <ProjectsList isRtl={isRtl} lang={lang} />
                </Suspense>
            </div>

            {/* CTA Section */}
            <Section background="default" className="py-24 border-t border-border">
                <div className="container mx-auto px-6 text-center">
                    <FadeInSection className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-muted/20 border border-border relative overflow-hidden">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
                            {t('portfolio.projects.cta.title')}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light">
                            {t('portfolio.projects.cta.description')}
                        </p>
                        <Link href="/contact" className={`inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-foreground text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-primary/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            {t('portfolio.projects.cta.button')}
                            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                    </FadeInSection>
                </div>
            </Section>
        </div>
    );
}

async function ProjectsList({ isRtl, lang }: { isRtl: boolean; lang: any }) {
    const rawProjects = await storage.getProjects(true, true);
    const projects = transformForLanguage(rawProjects, lang);

    const { t } = await getServerTranslation(lang);

    const categories = [
        { key: "past", label: t("portfolio.projects.categories.made"), icon: History, color: "text-emerald-500", badge: t("portfolio.projects.status.made") },
        { key: "current", label: t("portfolio.projects.categories.making"), icon: Zap, color: "text-amber-500", badge: t("portfolio.projects.status.making") },
        { key: "future", label: t("portfolio.projects.categories.will_make"), icon: Rocket, color: "text-sky-500", badge: t("portfolio.projects.status.will_make") },
    ];

    if (!projects || projects.length === 0) {
        return (
            <Section className="py-24 text-center">
                <p className="text-muted-foreground">{t("portfolio.projects.no_projects") || "No projects found."}</p>
            </Section>
        );
    }

    return (
        <>
            {categories.map((category, catIndex) => {
                const categoryProjects = projects.filter((p: any) => p.status === category.key);
                if (categoryProjects.length === 0) return null;

                return (
                    <Section
                        key={category.key}
                        background={catIndex % 2 === 1 ? "muted" : "default"}
                        className="py-24 relative overflow-hidden"
                    >
                        <div className="container mx-auto">
                            <FadeInSection className="flex items-center gap-6 mb-16">
                                <div className={`p-4 rounded-2xl bg-background border border-border shadow-xl ${category.color} flex items-center justify-center`}>
                                    <category.icon className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-display font-bold text-foreground tracking-tight">
                                        {category.label}
                                    </h2>
                                    <Badge variant="outline" className={`${category.color} border-current border-opacity-20 mt-2 font-bold uppercase tracking-wider px-3`}>
                                        {category.badge}
                                    </Badge>
                                </div>
                            </FadeInSection>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {categoryProjects.map((project: any, index: number) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        isRtl={isRtl}
                                    />
                                ))}
                            </div>
                        </div>
                    </Section>
                );
            })}
        </>
    );
}
