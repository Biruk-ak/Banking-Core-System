'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/transfers', label: 'Transfers' },
  { href: '/cards', label: 'Cards' },
  { href: '/products/savings', label: 'Products' },
  { href: '/features/ai-assistant', label: 'AI' },
  { href: '/merchant', label: 'Merchant' },
  { href: '/admin', label: 'Admin' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === '/login' || pathname === '/';

  return (
    <div className="min-h-screen">
      {!hideNav && (
        <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <Link href="/dashboard" className="text-sm font-semibold tracking-wide text-teal-400">
              Banking Core System
            </Link>
            <nav className="flex gap-4 text-sm text-slate-300">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname.startsWith(item.href) ? 'text-teal-300' : 'hover:text-white'}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      )}
      <main className={hideNav ? '' : 'mx-auto max-w-7xl px-4 py-8'}>{children}</main>
    </div>
  );
}
