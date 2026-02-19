"use client";

import Section from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TrendingUp, Zap, Users, ShieldCheck, Database, Globe, Cloud, Smartphone } from "lucide-react";
import { useSolutions } from "@/hooks/use-content";

const iconMap: Record<string, any> = {
    TrendingUp, Zap, Users, ShieldCheck, Database, Globe, Cloud, Smartphone
};

export default function Solutions() {
    const { t } = useTranslation();
    const { data: solutions = [], isLoading } = useSolutions();

    return (
        <div className="pt-24 min-h-screen">
            <Section background="pattern" className="pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Solutions</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Strategic digital solutions designed to drive business outcomes and accelerate transformation.
                    </p>
                </motion.div>
            </Section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {!isLoading && solutions.map((solution, index) => {
                        const Icon = iconMap[solution.iconName] || Zap;
                        return (
                            <motion.div
                                key={solution.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                                    <CardHeader>
                                        <div className="text-primary mb-4 p-3 bg-primary/5 w-fit rounded-xl">
                                            <Icon className="w-10 h-10" />
                                        </div>
                                        <CardTitle className="text-2xl font-display">{solution.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-muted-foreground">
                                            {solution.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
}
