import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration, useRouteError } from 'react-router';
import { AppShell } from './layouts/AppShell';
import '@stayrelay/ui/styles.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F5F7FA" />
        <meta name="description" content="StayRelay — a hotel reservation transfer marketplace in development." />
        <title>StayRelay — Quiet hospitality, precise transactions</title>
        <Meta /><Links />
      </head>
      <body>{children}<ScrollRestoration /><Scripts /></body>
    </html>
  );
}

export function HydrateFallback() {
  return <main className="mx-auto max-w-content p-8" role="status">Loading StayRelay…</main>;
}

export default function Root() { return <AppShell />; }

export function ErrorBoundary() {
  const error = useRouteError();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="mx-auto max-w-content p-8">
      <h1 className="text-3xl font-semibold">{missing ? 'Page not found' : 'This page could not load'}</h1>
      <p className="mt-4">{missing ? 'Check the address or return to the marketplace.' : 'Please try again. No reservation or payment state has changed.'}</p>
      <a className="mt-6 inline-block rounded-control bg-brand-600 px-4 py-3 text-white" href="/">Return to StayRelay</a>
    </main>
  );
}
