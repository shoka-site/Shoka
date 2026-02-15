import Section from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Users, Globe, Target } from "lucide-react";
import heroPattern from "@/assets/hero-pattern.png";

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      <Section background="pattern" className="pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">Who We Are</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Heritage & Future</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Shoka is a global technology consultancy rooted in the rich history of innovation. 
            We believe that true intelligence comes from understanding where we come from while looking boldly ahead.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl transform -rotate-2"></div>
            <img 
              src={heroPattern} 
              alt="Office" 
              className="rounded-2xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">A Legacy of Innovation</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Founded in Baghdad with a global vision, Shoka represents the bridge between the cradle of civilization and the digital frontier. Our name reflects our commitment to structure, growth, and resilience.
            </p>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              We don't just write code; we architect systems that stand the test of time. Our team consists of world-class engineers, data scientists, and designers who share a passion for excellence.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">50+</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Enterprise Clients</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">12</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Countries Served</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">100%</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Project Delivery</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-primary mb-2">24/7</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Support & Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="muted">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Target className="w-8 h-8" />, title: "Precision", desc: "We measure twice and cut once. Every line of code serves a purpose." },
            { icon: <Globe className="w-8 h-8" />, title: "Global Standard", desc: "International best practices applied to local challenges." },
            { icon: <Users className="w-8 h-8" />, title: "Partnership", desc: "We are not vendors; we are your strategic technology partners." },
            { icon: <Award className="w-8 h-8" />, title: "Excellence", desc: "Mediocrity has no place here. We aim for the exceptional." },
          ].map((val, i) => (
            <Card key={i} className="bg-background border-none shadow-sm">
              <CardHeader>
                <div className="text-primary mb-2">{val.icon}</div>
                <CardTitle>{val.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{val.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}