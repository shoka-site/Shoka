import Section from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Building2, Landmark, ShoppingBag, Factory, GraduationCap } from "lucide-react";

export default function Industries() {
    const { t } = useTranslation();

    const industries = [
        {
            title: "Healthcare",
            description: "Digital transformation for medical providers, implementing smart health systems and data management.",
            icon: <Building2 className="w-10 h-10" />,
        },
        {
            title: "Finance",
            description: "Secure, compliant financial technology solutions for banking, insurance, and investment firms.",
            icon: <Landmark className="w-10 h-10" />,
        },
        {
            title: "Retail",
            description: "Omnichannel commerce and supply chain optimization for modern retail experiences.",
            icon: <ShoppingBag className="w-10 h-10" />,
        },
        {
            title: "Manufacturing",
            description: "Industry 4.0 and smart factory solutions to increase production efficiency and monitoring.",
            icon: <Factory className="w-10 h-10" />,
        },
        {
            title: "Education",
            description: "EdTech platforms and digital learning environments for schools and universities.",
            icon: <GraduationCap className="w-10 h-10" />,
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
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Industries</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We provide specialized digital solutions tailored to the unique challenges and opportunities of various sectors.
                    </p>
                </motion.div>
            </Section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, index) => (
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
                                        {industry.icon}
                                    </div>
                                    <CardTitle className="text-2xl font-display">{industry.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-muted-foreground">
                                        {industry.description}
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
