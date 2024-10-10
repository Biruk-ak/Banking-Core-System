import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Banking Core System',
  description: 'Digital banking platform by Biruk-ak — savings, loans, cards, FX, compliance, and more.',
  authors: [{ name: 'Biruk-ak', url: 'mailto:birukaklilu0110@gmail.com' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
