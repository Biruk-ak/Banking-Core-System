import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-teal-400/80">Digital Banking Platform</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-7xl">Banking Core System</h1>
        <p className="mt-6 max-w-xl text-lg text-slate-300">
          Savings, loans, cards, FX, investments, and compliance — one core for modern banking.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/login" className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-500">
            Sign in
          </Link>
          <Link href="/dashboard" className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-slate-500">
            Open dashboard
          </Link>
        </div>
        <p className="mt-16 text-xs text-slate-500">Owner: Biruk-ak · birukaklilu0110@gmail.com</p>
      </div>
    </div>
  );
}
