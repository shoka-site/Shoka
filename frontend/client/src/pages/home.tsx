import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code, Database, Cloud, ArrowRight, Star, Target, Zap, Layers, Cpu, Lock, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Section from "@/components/layout/Section";
import {
  useHeroSlides,
  useStats,
  useServices,
  useProjects,
  useTestimonials,
  useWhyShokaPoints,
  useProcessSteps,
  useInsightTopics,
} from "@/hooks/use-content";

// Icon mapping
const iconMap: Record<string, any> = {
  Brain, Code, Database, Cloud, Target, Zap, Layers, Cpu, Lock
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  // Fetch all data from API
  const { data: heroSlides = [], isLoading: loadingHero } = useHeroSlides();
  const { data: stats = [], isLoading: loadingStats } = useStats();
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: projects = [], isLoading: loadingProjects } = useProjects(true);
  const { data: testimonials = [], isLoading: loadingTestimonials } = useTestimonials();
  const { data: whyShokaPoints = [], isLoading: loadingWhyShoka } = useWhyShokaPoints();
  const { data: processSteps = [], isLoading: loadingProcess } = useProcessSteps();
  const { data: insightTopics = [], isLoading: loadingInsights } = useInsightTopics();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loadingHero) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-muted-foreground">{t('loading')}</div>
      </div>
    );
  }

  const currentHeroSlide = heroSlides[currentSlide];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      {currentHeroSlide && (
        <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 md:opacity-100 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentHeroSlide.id}
                src={currentHeroSlide.imageUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter sepia-[.2] contrast-125"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background"></div>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
            <div className="max-w-4xl min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide.id}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium tracking-widest uppercase mb-6">
                    {currentHeroSlide.badge}
                  </span>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[1.1] mb-8">
                    {currentHeroSlide.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light">
                    {currentHeroSlide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                        {t('book_consultation')}
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 bg-transparent border-primary/20 hover:bg-primary/5">
                        {t('explore_services')}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2 mt-12">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/20"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-primary rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* STATS SECTION */}
      {!loadingStats && stats.length > 0 && (
        <Section background="default" className="py-16 border-y border-border/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* VALUE PROPOSITION */}
      <Section background="muted" className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
            {t('value_proposition')}
          </p>
        </motion.div>
      </Section>

      {/* SERVICES */}
      {!loadingServices && services.length > 0 && (
        <Section background="default">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t('core_capabilities')}</h2>
            </motion.div>
            <Link href="/services">
              <span className={`group flex items-center text-primary font-medium mt-6 md:mt-0 hover:underline cursor-pointer`}>
                {t('view_all_services')}
                <ArrowRight className={`mx-2 w-4 h-4 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Brain;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-muted/50 p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-2xl hover:bg-muted/70 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <Link href="/services">
                    <span className="text-primary text-sm font-medium hover:underline inline-flex items-center cursor-pointer">
                      {t('home.services.learn_more')}
                      <ArrowRight className={`w-4 h-4 ${isRtl ? 'mr-1 rotate-180' : 'ml-1'}`} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Section>
      )}

      {/* TESTIMONIALS */}
      {!loadingTestimonials && testimonials.length > 0 && (
        <Section background="muted">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
              {t('home.trust.title')}
            </h2>

            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonials[currentTestimonial]?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-border"
                >
                  {testimonials[currentTestimonial] && (
                    <>
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-foreground/80 mb-8 italic leading-relaxed">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{testimonials[currentTestimonial].author}</div>
                        <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? "w-8 bg-primary" : "w-2 bg-primary/20"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Section>
      )}

      {/* PROJECTS */}
      {!loadingProjects && projects.length > 0 && (
        <Section background="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent tracking-widest uppercase text-sm font-medium">{t('home.projects.subtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t('home.projects.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-accent text-sm font-medium mb-2 block">{project.category}</span>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* WHY SHOKA */}
      {!loadingWhyShoka && whyShokaPoints.length > 0 && (
        <Section background="muted">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">{t('home.why_shoka.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyShokaPoints.map((point, index) => {
              const Icon = iconMap[point.iconName] || Target;
              return (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Section>
      )}

      {/* PROCESS */}
      {!loadingProcess && processSteps.length > 0 && (
        <Section background="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent tracking-widest uppercase text-sm font-medium">{t('home.process.subtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t('home.process.title')}</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-6 relative z-10">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* INSIGHTS */}
      {!loadingInsights && insightTopics.length > 0 && (
        <Section background="muted">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent tracking-widest uppercase text-sm font-medium">{t('home.insights.subtitle')}</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t('home.insights.title')}</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-background/50 p-8 rounded-2xl border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-display font-bold mb-3 line-clamp-2">{topic.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{topic.description}</p>
                <span className="text-sm text-accent">{topic.readTime}</span>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section background="default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-12 md:p-20 rounded-3xl"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-lg shadow-primary/30">
              {t('home.cta.button')}
            </Button>
          </Link>
        </motion.div>
      </Section>
    </div>
  );
}