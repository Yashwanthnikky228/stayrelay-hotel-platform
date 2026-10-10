import { useLocation } from 'react-router';

const labels: Record<string, [string, string]> = {
  '/': ['Operations overview', 'Queue counts and financial metrics will appear only from server-confirmed data.'],
  '/admin/login': ['Operations sign-in', 'Invited staff sign-in and MFA are not connected. No self-registration is available.'],
  '/review': ['Review queue', 'Evidence and reservation review requires authenticated operator access.'],
  '/catalogue': ['Property catalogue', 'Verified properties and media require server-owned catalogue data.'],
  '/access': ['User access', 'Role grants, suspensions and session revocation require administrator authorization.'],
  '/audit': ['Audit trail', 'Audit entries will be visible only after the append-only audit service is connected.'],
  '/settings': ['Feature flags and settings', 'Settings changes require server authorization, environment labels and an audit reason.'],
};

export default function OperationsPage() {
  const [title, intro] = labels[useLocation().pathname] ?? labels['/'];
  return <section className="space-y-6"><div><p className="text-sm font-medium text-brand-700">Protected operations workspace</p><h1 className="mt-2 font-editorial text-4xl text-ink-900">{title}</h1><p className="mt-4 max-w-2xl leading-7 text-ink-600">{intro}</p></div><div role="status" className="rounded-card border border-divider bg-surface p-6 md:p-8"><span className="inline-flex rounded-full bg-attention-50 px-3 py-1 text-sm font-medium text-attention-800">Access unavailable</span><h2 className="mt-4 text-xl font-semibold text-ink-900">No operational data loaded</h2><p className="mt-2 max-w-2xl leading-6 text-ink-600">The console is intentionally fail-closed. No reservation, evidence, financial record, role, feature flag or audit entry was read or changed.</p></div></section>;
}
