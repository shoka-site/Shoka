import Hero from '@/components/Hero';
import IdentitySection from '@/components/IdentitySection';
import Features from '@/components/Features';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <IdentitySection />
      <section className="section-alt">
        <div className="container-shell">
          <Features />
        </div>
      </section>
      <section className="section">
        <div className="container-shell">
          <CTA />
        </div>
      </section>
    </div>
  );
}
