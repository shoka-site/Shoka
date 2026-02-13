import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Hybrid Technology Solutions Platform',
  description: 'AI, software, data, and cloud services with modern consultation booking.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        <main className="container-shell py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
