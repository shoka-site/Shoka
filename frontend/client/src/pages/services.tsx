
import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { serviceCategories } from "@/lib/data/services";

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern" className="pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">{t('services.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('services.description')}
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col">
                <CardHeader>
                  <div className="text-primary mb-4 p-3 bg-primary/5 w-fit rounded-xl">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-display">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-muted-foreground mb-6">
                    {category.description}
                  </CardDescription>
                  <ul className="grid grid-cols-1 gap-2">
                    {category.items.map(item => (
                      <li key={item.name} className="flex items-center text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-primary hover:text-primary/80 group mt-auto">
                    {t('services.learn_more')} <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
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