import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-6">SHOKA</h2>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Designing Intelligent Digital Systems. Blending heritage with modern digital excellence to build the future of technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">Sitemap</h3>
            <ul className="space-y-4">
              <li><Link href="/home"><a className="text-white/60 hover:text-white transition-colors">Home</a></Link></li>
              <li><Link href="/services"><a className="text-white/60 hover:text-white transition-colors">Services</a></Link></li>
              <li><Link href="/portfolio"><a className="text-white/60 hover:text-white transition-colors">Portfolio</a></Link></li>
              <li><Link href="/contact"><a className="text-white/60 hover:text-white transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-accent">Connect</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="mailto:hello@shoka.com" className="text-white/60 hover:text-white transition-colors">hello@shoka.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Shoka Systems. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}