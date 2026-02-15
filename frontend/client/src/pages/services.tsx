import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Code, Server, Shield, Smartphone, Globe, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";



export default function Services() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const serviceList = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: t('services.list.web.title'),
      description: t('services.list.web.desc'),
      tags: ["React", "Next.js", "UI/UX"]
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: t('services.list.mobile.title'),
      description: t('services.list.mobile.desc'),
      tags: ["React Native", "iOS", "Android"]
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: t('services.list.backend.title'),
      description: t('services.list.backend.desc'),
      tags: ["Node.js", "Python", "Microservices"]
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: t('services.list.security.title'),
      description: t('services.list.security.desc'),
      tags: ["Pen Testing", "Compliance", "Audits"]
    },
    {
      icon: <BarChart className="w-10 h-10" />,
      title: t('services.list.data.title'),
      description: t('services.list.data.desc'),
      tags: ["Big Data", "Visualization", "BI"]
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: t('services.list.api.title'),
      description: t('services.list.api.desc'),
      tags: ["REST", "GraphQL", "Webhooks"]
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

          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('services.description')}
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
                    {t('services.learn_more')} <ArrowRight className={`mx-2 w-4 h-4 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
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