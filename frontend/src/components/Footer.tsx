import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-shoka-dark text-shoka-ivory border-t border-shoka-ivory/10">
      <div className="container-shell py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-shoka-ivory">
                Shoka
                <span className="text-shoka-clay">.</span>
              </span>
            </Link>
            <p className="text-shoka-ivory/60 max-w-sm mb-6 leading-relaxed">
              نمزج عراقة الماضي بتكنولوجيا المستقبل لنبني أنظمة رقمية ذكية تخدم الإنسان وتدوم طويلاً.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-shoka-clay hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-shoka-sand">الشركة</h4>
            <ul className="space-y-4">
              {[
                ['من نحن', '/about'],
                ['خدماتنا', '/services'],
                ['المشاريع', '/portfolio'],
                ['الوظائف', '/careers'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-shoka-ivory/70 hover:text-shoka-clay transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-shoka-sand">تواصل معنا</h4>
            <ul className="space-y-4 text-shoka-ivory/70">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-shoka-clay" />
                <span>hello@shoka.iq</span>
              </li>
              <li>Baghdad, Al-Mansour</li>
              <li>Iraq</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-shoka-dark text-sm text-shoka-ivory/40">
          <p>© {new Date().getFullYear()} Shoka Technology Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-shoka-ivory transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-shoka-ivory transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
