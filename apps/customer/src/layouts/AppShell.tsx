import { NavLink, Outlet } from 'react-router';

const navigation = [
  { to: '/', label: 'Find a stay', end: true },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/passport', label: 'Reservation Passport' },
];

export function AppShell() {
  return (
    <div className="min-h-screen bg-canvas text-ink-900">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="border-b border-divider bg-surface">
        <div className="mx-auto flex min-h-16 max-w-content items-center justify-between gap-6 px-4 md:min-h-[72px] md:px-6 xl:px-0">
          <NavLink to="/" className="flex items-center gap-3 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 font-editorial text-xl text-white">s</span>
            <span className="text-lg font-semibold tracking-tight">StayRelay</span>
          </NavLink>
          <nav aria-label="Main navigation" className="hidden items-center gap-1 overflow-x-auto md:flex">
            {navigation.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `whitespace-nowrap rounded-control px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-canvas hover:text-ink-900'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="/admin/login" className="hidden rounded-control px-3 py-2 text-sm font-medium text-ink-600 hover:bg-canvas hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 md:inline-flex">Admin Access</a>
            <details className="relative md:hidden">
              <summary className="min-h-11 cursor-pointer rounded-control border border-divider px-3 py-2 text-sm font-semibold text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">Menu</summary>
              <nav aria-label="Mobile navigation" className="absolute right-0 z-40 mt-2 grid min-w-52 gap-1 rounded-card border border-divider bg-surface p-2 shadow-overlay">
                {navigation.map(({ to, label }) => <a key={to} href={to} className="rounded-control px-3 py-3 text-sm text-ink-900 hover:bg-canvas">{label}</a>)}
                <a href="/admin/login" className="rounded-control px-3 py-3 text-sm text-ink-900 hover:bg-canvas">Admin Access</a>
              </nav>
            </details>
            <span className="hidden text-sm text-ink-600 xl:inline">Quiet hospitality, precise transactions</span>
          </div>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-content px-4 py-8 md:px-6 md:py-12 xl:px-0">
        <Outlet />
      </main>
      <footer className="border-t border-divider bg-surface">
        <div className="mx-auto max-w-content px-4 py-5 text-xs text-ink-600 md:px-6 xl:px-0">
          StayRelay shows reservation status only when confirmed by its services.
        </div>
      </footer>
    </div>
  );
}
