export function OperationsPage() {
  return (
    <section className="mx-auto max-w-operations space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-700">Privileged workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Hotel operations</h1>
        <p className="mt-3 max-w-2xl leading-7 text-ink-600">Review evidence, policy, eligibility and capacity as separate decisions. Every change will require server-side authorization and an audit reason.</p>
      </div>
      <div role="status" className="rounded-card border border-divider bg-surface p-6 md:p-8">
        <span className="inline-flex rounded-full bg-attention-50 px-3 py-1 text-sm font-medium text-attention-800">Access control not connected</span>
        <h2 className="mt-4 text-xl font-semibold">Operations console is not enabled</h2>
        <p className="mt-2 max-w-2xl leading-6 text-ink-600">Staff sign-in, permission checks and operational data must be connected before this workspace can display reservation records or accept decisions.</p>
      </div>
    </section>
  );
}

export default OperationsPage;
