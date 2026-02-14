import '../globals.css';

export const metadata = {
  title: 'Shoka Admin',
  description: 'Administration Panel'
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
