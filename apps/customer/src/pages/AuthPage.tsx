import { useLocation } from 'react-router';

const content = {
  '/sign-up': ['Create your StayRelay account', 'Account creation is not enabled until the approved identity project and consent configuration are connected.', 'Create account'],
  '/sign-in': ['Sign in to StayRelay', 'Staff and customer sign-in will use the approved identity provider. No credentials are accepted in this pilot shell.', 'Sign in'],
  '/verify-email': ['Check your email', 'Email verification will appear here after the delivery provider and identity project are connected.', 'Resend verification'],
  '/reset-password': ['Recover access', 'Password reset links will be issued only by the configured identity provider.', 'Request reset link'],
} as const;

export default function AuthPage() {
  const page = content[useLocation().pathname as keyof typeof content] ?? content['/sign-in'];
  return <section className="mx-auto max-w-md space-y-6" aria-labelledby="auth-title">
    <div><p className="text-sm font-medium text-brand-700">Secure account access</p><h1 id="auth-title" className="mt-2 text-3xl font-semibold tracking-tight">{page[0]}</h1><p className="mt-3 leading-7 text-ink-600">{page[1]}</p></div>
    <form className="rounded-card border border-divider bg-surface p-6" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-4">
        {useLocation().pathname === '/verify-email' ? <p className="rounded-control bg-canvas p-4 text-sm leading-6 text-ink-600">No message was sent. Email delivery is not enabled.</p> : <><label className="field-label">Email<input className="field-control" type="email" autoComplete="email" disabled placeholder="you@example.com" /></label>{useLocation().pathname === '/sign-up' && <label className="field-label">Password<input className="field-control" type="password" autoComplete="new-password" disabled placeholder="Identity provider not connected" /></label>}</>}
        <button type="submit" disabled className="min-h-11 w-full rounded-control bg-brand-600 px-4 py-2 font-semibold text-white opacity-60">{page[2]}</button>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-600" role="status">Not enabled for this pilot. No account, email, password or session was changed.</p>
    </form>
  </section>;
}
