'use client';

import Link from 'next/link';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
          }`}
      >
        <div className="container-shell flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 ${isScrolled ? 'bg-brand-600' : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}>
              S
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              SSP
              <span className={`transition-colors duration-300 ${isScrolled ? 'text-brand-400' : 'text-slate-300'}`}>latform</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {[
                ['الرئيسية', '/'],
                ['من نحن', '/about'],
                ['الخدمات', '/services'],
                ['المشاريع', '/portfolio'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="relative text-sm font-medium text-slate-200 hover:text-white transition-colors py-2 group"
                >
                  {label}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="w-px h-8 bg-white/10" />

            <Link
              href="/contact"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 group ${isScrolled
                  ? 'bg-brand-600 text-white hover:bg-brand-500'
                  : 'bg-white/10 text-white hover:bg-white hover:text-dark-bg backdrop-blur-sm border border-white/20'
                }`}
            >
              <span>تواصل معنا</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark-bg pt-24 px-4 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {[
                ['الرئيسية', '/'],
                ['من نحن', '/about'],
                ['الخدمات', '/services'],
                ['المشاريع', '/portfolio'],
                ['تواصل معنا', '/contact'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white hover:text-brand-400"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
