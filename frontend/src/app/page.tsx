'use client';

import React, { useEffect, useState } from 'react';

const techIcons = [
  { label: 'Next.js', symbol: '▲', top: '12%', left: '20%', delay: '0s', tx: '30vw', ty: '38vh' },
  { label: 'Python', symbol: '🐍', top: '20%', left: '78%', delay: '0.25s', tx: '-28vw', ty: '30vh' },
  { label: 'React', symbol: '⚛️', top: '36%', left: '8%', delay: '0.4s', tx: '42vw', ty: '14vh' },
  { label: 'Node.js', symbol: '⬢', top: '58%', left: '85%', delay: '0.55s', tx: '-35vw', ty: '-8vh' },
  { label: 'Docker', symbol: '🐳', top: '72%', left: '18%', delay: '0.7s', tx: '32vw', ty: '-22vh' },
  { label: 'TypeScript', symbol: 'TS', top: '84%', left: '64%', delay: '0.9s', tx: '-14vw', ty: '-34vh' }
];

export default function HomePage() {
  const [showPortalReveal, setShowPortalReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPortalReveal(true), 5400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="welcome-scene relative isolate min-h-[75vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_42%)]" />

      {!showPortalReveal && (
        <>
          <div className="pointer-events-none absolute inset-0">
            {techIcons.map((tech) => (
              <div
                key={tech.label}
                className="tech-icon-chip"
                style={
                  {
                    top: tech.top,
                    left: tech.left,
                    animationDelay: tech.delay,
                    '--tx': tech.tx,
                    '--ty': tech.ty
                  } as React.CSSProperties
                }
              >
                <span className="text-base">{tech.symbol}</span>
                <span>{tech.label}</span>
              </div>
            ))}
          </div>

          <div
            className="user-chip"
            style={{ animationDelay: '2.2s', '--tx': '0vw', '--ty': '-42vh' } as React.CSSProperties}
          >
            <span className="text-lg">🧑‍💻</span>
            <span>You</span>
          </div>

          <div className="black-hole">
            <div className="black-hole-core" />
            <div className="black-hole-ring" />
          </div>

          <div className="relative z-10 px-6 pb-10 pt-16 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-brand-300/90">Welcome Sequence</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-5xl">
              Everything gets pulled into the <span className="heading-gradient">black hole</span>
            </h1>
          </div>
        </>
      )}

      {showPortalReveal && (
        <div className="portal-reveal">
          <div className="portal-card glass-panel max-w-2xl p-8 text-center">
            <p className="text-sm uppercase tracking-[0.45em] text-brand-300">You made it through</p>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl heading-gradient">Hybrid Technology Solutions Platform</h2>
            <p className="mt-5 text-base text-slate-200 sm:text-lg">
              Build exceptional products with AI, cloud, web, and automation experts in one universe.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
