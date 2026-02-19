"use client";

import Section from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Building2, Factory, Landmark, Stethoscope, GraduationCap, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIndustries } from "@/hooks/use-content";

const iconMap: Record<string, any> = {
    Building2, Factory, Landmark, Stethoscope, GraduationCap, Plane
};

export default function Industries() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const { data: industries = [], isLoading } = useIndustries();

    return (
        <div className="pt-24 min-h-screen">
            <Section background="pattern" className="pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Industries</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We provide specialized digital solutions tailored to the unique challenges and opportunities of various sectors.
                    </p>
                </motion.div>
            </Section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!isLoading && industries.map((industry, index) => {
                        const Icon = iconMap[industry.iconName] || Building2;
                        return (
                            <motion.div
                                key={industry.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                            <Icon className="w-16 h-16 text-primary/40" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                                        <div className="absolute bottom-4 left-6 text-primary p-2 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <CardHeader className="pt-2">
                                        <CardTitle className="text-2xl font-display mt-2">{industry.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <CardDescription className="text-base text-muted-foreground mb-6">
                                            {industry.description}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" className="p-0 hover:bg-transparent text-primary hover:text-primary/80 group mt-auto">
                                            Learn more <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
}
