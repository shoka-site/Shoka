import Link from 'next/link';

const links = [
  ['الرئيسية', '/'],
  ['من نحن', '/about'],
  ['الخدمات', '/services'],
  ['المشاريع', '/portfolio'],
  ['تواصل', '/contact'],
  ['احجز استشارة', '/book-consultation']
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-brand-900">
          Software Service Platform
        </Link>
        <ul className="hidden gap-5 text-sm font-medium text-slate-700 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-brand-700">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
