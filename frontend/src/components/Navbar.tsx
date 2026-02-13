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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-bg/80 backdrop-blur-lg">
      <nav className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          <span className="text-brand-400">SSP</span>latform
        </Link>
        <ul className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="transition-colors hover:text-brand-400">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          {/* Mobile menu button could go here */}
          <button className="text-white">☰</button>
        </div>
      </nav>
    </header>
  );
}
