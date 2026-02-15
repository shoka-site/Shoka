import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Code, Server, Shield, Smartphone, Globe, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const serviceList = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Web & Digital Platforms",
    description: "High-performance web applications built on Next.js and modern frameworks. We prioritize speed, accessibility, and aesthetic excellence.",
    tags: ["React", "Next.js", "UI/UX"]
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Mobile Solutions",
    description: "Native and cross-platform mobile apps that provide seamless user experiences across iOS and Android ecosystems.",
    tags: ["React Native", "iOS", "Android"]
  },
  {
    icon: <Server className="w-10 h-10" />,
    title: "Backend Architecture",
    description: "Robust server-side systems designed to handle high concurrency and complex data processing requirements.",
    tags: ["Node.js", "Python", "Microservices"]
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Cybersecurity Audits",
    description: "Comprehensive security assessments to identify vulnerabilities and strengthen your digital infrastructure against threats.",
    tags: ["Pen Testing", "Compliance", "Audits"]
  },
  {
    icon: <BarChart className="w-10 h-10" />,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights through custom dashboards and predictive modeling.",
    tags: ["Big Data", "Visualization", "BI"]
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "API Integration",
    description: "Seamlessly connect your systems with third-party services to automate workflows and extend functionality.",
    tags: ["REST", "GraphQL", "Webhooks"]
  }
];

export default function Services() {
  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern" className="pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We deliver end-to-end technology solutions tailored to your organization's unique challenges. 
            From architectural strategy to pixel-perfect execution.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
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
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-display">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-primary hover:text-primary/80 group">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}