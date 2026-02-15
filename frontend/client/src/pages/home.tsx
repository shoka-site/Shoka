import { useState, useEffect } from "react";
import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Database, Cloud, Brain, Lock } from "lucide-react";
import { Link } from "wouter";
import heroPattern from "@/assets/hero-pattern.png";
import projectImage from "@/assets/project-1.png";
import heroMeso1 from "@/assets/hero-meso-1.png";
import heroMeso2 from "@/assets/hero-meso-2.png";
import heroMeso3 from "@/assets/hero-meso-3.png";

const services = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI & Machine Learning",
    description: "Custom algorithms that optimize operations and predict market trends."
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Systems",
    description: "Scalable architecture for processing and securing mission-critical data."
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Infrastructure",
    description: "Resilient, high-availability deployments on AWS, Azure, and GCP."
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Military-grade protection for your most valuable digital assets."
  }
];

const heroSlides = [
  {
    id: 1,
    badge: "Intelligent Digital Systems",
    title: <>Designing the <br /><span className="text-primary italic">Heritage</span> of <br />Tomorrow.</>,
    description: "Shoka blends modern AI, cloud, and data solutions with the stability and wisdom of deep roots.",
    image: heroMeso1
  },
  {
    id: 2,
    badge: "Future-Proof Architecture",
    title: <>Building <span className="text-primary italic">Resilient</span> Systems <br />for Growth.</>,
    description: "Scalable infrastructure designed to adapt and evolve with your business needs.",
    image: heroMeso2
  },
  {
    id: 3,
    badge: "AI-Driven Innovation",
    title: <>Empowering <span className="text-primary italic">Decisions</span> with <br />Data Intelligence.</>,
    description: "Transforming raw data into actionable insights through advanced machine learning models.",
    image: heroMeso3
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 md:opacity-100 pointer-events-none">
          <AnimatePresence>
            <motion.img
              key={heroSlides[currentSlide].image}
              src={heroSlides[currentSlide].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              alt="Background Pattern"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter sepia-[.2] contrast-125"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <div className="max-w-3xl min-h-[400px]"> {/* Added min-height to prevent layout shift */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide].id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium tracking-widest uppercase mb-6">
                  {heroSlides[currentSlide].badge}
                </span>

                <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[1.1] mb-8">
                  {heroSlides[currentSlide].title}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl leading-relaxed font-light">
                  {heroSlides[currentSlide].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="rounded-full text-lg h-14 px-8">
                      Book Consultation
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 bg-transparent border-primary/20 hover:bg-primary/5">
                      Explore Services
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
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
      </section>

      {/* Services Preview */}
      <Section background="muted">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-display font-bold mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground text-lg">
              We build systems that are robust, scalable, and intelligent by design.
            </p>
          </div>
          <Link href="/services">
            <a className="group flex items-center text-primary font-medium mt-6 md:mt-0">
              View All Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Project */}
      <Section className="py-0 px-0 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[500px] md:h-auto overflow-hidden">
            <img
              src={projectImage}
              alt="Featured Project"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="bg-foreground text-background p-12 md:p-24 flex flex-col justify-center">
            <span className="text-accent tracking-widest uppercase text-sm font-medium mb-4">Case Study</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              National Data Archive <br /> modernization
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Digitizing 50 years of historical records into a secure, searchable cloud database powered by AI-driven optical character recognition.
            </p>
            <ul className="space-y-4 mb-10">
              {["Cloud Migration", "AI/OCR", "Secure Access Control"].map((item) => (
                <li key={item} className="flex items-center text-white/80">
                  <Check className="w-5 h-5 text-accent mr-3" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/portfolio">
              <Button variant="outline" className="w-fit rounded-full text-white border-white/20 hover:bg-white hover:text-foreground">
                View Project Details
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Trust / CTA */}
      <Section background="default" className="text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to build something lasting?
          </h2>
          <p className="text-muted-foreground text-xl mb-10">
            Schedule a consultation with our engineering team to discuss your digital transformation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full text-lg h-16 px-10 shadow-xl shadow-primary/20">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}