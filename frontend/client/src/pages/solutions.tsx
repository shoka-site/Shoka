import Section from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TrendingUp, Zap, Users, ShieldCheck } from "lucide-react";

export default function Solutions() {
    const { t } = useTranslation();

    const solutions = [
        {
            title: "Operational Efficiency",
            description: "Reduce costs and streamline workflows through automated systems and optimized processes.",
            icon: <Zap className="w-10 h-10" />,
        },
        {
            title: "Revenue Growth",
            description: "Digital channels and data-driven insights to unlock new revenue streams and opportunities.",
            icon: <TrendingUp className="w-10 h-10" />,
        },
        {
            title: "Customer Experience",
            description: "Engage users with personalized, intuitive digital experiences across all touchpoints.",
            icon: <Users className="w-10 h-10" />,
        },
        {
            title: "Risk Management",
            description: "Protect your business with advanced security, compliance, and proactive monitoring.",
            icon: <ShieldCheck className="w-10 h-10" />,
        }
    ];

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
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                                <CardHeader>
                                    <div className="text-primary mb-4 p-3 bg-primary/5 w-fit rounded-xl">
                                        {solution.icon}
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
                    ))}
                </div>
            </Section>
        </div>
    );
}
