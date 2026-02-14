'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'من نحن', href: '/about' },
    { label: 'الخدمات', href: '/services' },
    { label: 'المشاريع', href: '/portfolio' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-shoka-ivory/95 backdrop-blur-md shadow-soft py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container-shell flex items-center justify-between">
          {/* Logo - Heritage x Future Concept */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-all duration-300 ${isScrolled ? 'bg-shoka-dark text-shoka-ivory' : 'bg-shoka-dark text-shoka-ivory'
              }`}>
              S
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-shoka-dark' : 'text-shoka-dark'
              }`}>
              Shoka
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-base font-medium transition-colors py-2 group ${pathname === link.href ? 'text-shoka-clay' : 'text-text-primary hover:text-shoka-clay'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 right-0 h-0.5 bg-shoka-clay transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </nav>

            <div className={`w-px h-8 ${isScrolled ? 'bg-shoka-dark/10' : 'bg-shoka-dark/10'}`} />

            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-shoka-clay text-white hover:bg-shoka-dark hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>تواصل معنا</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden relative z-50 p-2 transition-colors ${isScrolled ? 'text-shoka-dark' : 'text-shoka-dark'}`}
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
            className="fixed inset-0 z-40 bg-shoka-ivory pt-28 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-shoka-dark hover:text-shoka-clay transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-shoka-clay hover:text-shoka-dark transition-colors"
              >
                تواصل معنا
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
