"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-foreground text-background py-16 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-6">SHOKA</h2>
            <p className="text-white/60 max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">{t('footer.sitemap')}</h3>
            <ul className="space-y-4">
              <li><Link href="/home" className="text-white/60 hover:text-white transition-colors">{t('footer.links.home')}</Link></li>
              <li><Link href="/services" className="text-white/60 hover:text-white transition-colors">{t('footer.links.services')}</Link></li>
              <li><Link href="/projects" className="text-white/60 hover:text-white transition-colors">{t('footer.links.portfolio')}</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">{t('footer.connect')}</h3>
            <ul className="space-y-4">
              <li><a href="https://www.linkedin.com/company/shoka-global/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.linkedin')}</a></li>
              <li><a href="https://x.com/shoka_it" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.twitter')}</a></li>
              <li><a href="https://www.instagram.com/shoka.it/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.instagram')}</a></li>
              <li><a href="https://www.tiktok.com/@shoka.it" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.tiktok')}</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61578501381386" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">{t('footer.social.facebook')}</a></li>
              <li><a href="mailto:global@shoka.site" className="text-white/60 hover:text-white transition-colors">global@shoka.site</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}