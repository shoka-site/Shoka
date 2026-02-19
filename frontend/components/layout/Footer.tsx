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
              <li><Link href="/portfolio" className="text-white/60 hover:text-white transition-colors">{t('footer.links.portfolio')}</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">{t('footer.connect')}</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">{t('footer.social.linkedin')}</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">{t('footer.social.twitter')}</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">{t('footer.social.instagram')}</a></li>
              <li><a href="mailto:hello@shoka.com" className="text-white/60 hover:text-white transition-colors">hello@shoka.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} {t('footer.copyright')} {t('footer.rights')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}