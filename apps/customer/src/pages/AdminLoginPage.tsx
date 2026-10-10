export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-xl space-y-6" aria-labelledby="admin-login-title">
      <div>
        <p className="text-sm font-medium text-brand-700">Restricted workspace</p>
        <h1 id="admin-login-title" className="mt-2 text-3xl font-semibold tracking-tight">Admin Access</h1>
        <p className="mt-3 leading-7 text-ink-600">Operations access is available only to invited staff after identity configuration, role verification and MFA enrollment.</p>
      </div>
      <div role="status" className="rounded-card border border-divider bg-surface p-6">
        <span className="inline-flex rounded-full bg-attention-50 px-3 py-1 text-sm font-medium text-attention-800">Not enabled for this pilot</span>
        <h2 className="mt-4 text-xl font-semibold">Staff sign-in is not connected</h2>
        <p className="mt-2 leading-6 text-ink-600">No account can be created here and no operational record is displayed. Contact the StayRelay administrator through the approved support channel when access is enabled.</p>
      </div>
    </section>
  );
}
