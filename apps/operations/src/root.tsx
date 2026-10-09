import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration, useRouteError } from 'react-router';
import '@stayrelay/ui/styles.css';

export function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><head>
    <meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#F5F7FA" />
    <meta name="description" content="StayRelay operations workspace in development." />
    <title>Operations | StayRelay</title><Meta /><Links />
  </head><body>{children}<ScrollRestoration /><Scripts /></body></html>;
}

export function HydrateFallback() {
  return <main className="mx-auto max-w-operations p-8" role="status">Loading StayRelay operations…</main>;
}

export default function OperationsRoot() {
  return <div className="min-h-screen bg-canvas text-ink-900">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="border-b border-divider bg-surface">
      <div className="mx-auto flex min-h-16 max-w-operations items-center gap-4 px-4 md:px-6">
        <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 font-editorial text-xl text-white">s</span>
        <span className="font-semibold">StayRelay</span>
        <span className="ml-auto text-sm font-medium text-ink-600">Operations</span>
      </div>
    </header>
    <main id="main-content" className="mx-auto max-w-operations px-4 py-10 md:px-6">
      <p className="text-sm font-medium text-brand-700">Privileged workspace</p>
      <h1 className="mt-3 font-editorial text-4xl">Hotel operations</h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink-600">Reservation verification, arrival exceptions and financial controls will appear after operator access is established.</p>
      <section className="mt-8 rounded-card border border-divider bg-surface p-6 md:p-8" aria-labelledby="access-title">
        <p className="inline-flex rounded-full bg-attention-50 px-3 py-1 text-sm font-medium text-attention-800">Access unavailable</p>
        <h2 id="access-title" className="mt-4 text-xl font-semibold">Operations console is disabled</h2>
        <p className="mt-2 max-w-2xl leading-6 text-ink-600">Operator sign-in and permission checks are not connected. No reservation or financial records can be viewed or changed here.</p>
      </section>
    </main>
  </div>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return <main className="mx-auto max-w-operations p-8">
    <h1 className="text-3xl font-semibold">{missing ? 'Page not found' : 'Operations is unavailable'}</h1>
    <p className="mt-4">No operational record was changed.</p>
  </main>;
}
