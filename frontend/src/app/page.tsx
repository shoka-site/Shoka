import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <div className="space-y-24">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
