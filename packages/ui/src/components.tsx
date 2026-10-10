import type { ButtonHTMLAttributes, ChangeEventHandler, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-cloud text-slate',
  brand: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-900',
  danger: 'bg-red-100 text-red-800',
};

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex min-h-11 items-center justify-center rounded-standard bg-relay px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-relay focus-visible:ring-offset-2 ${className}`} {...props} />;
}

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{children}</span>;
}

export function Card({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={`rounded-standard border border-slate-200 bg-white p-5 shadow-sm ${className}`} {...props} />;
}

export function Stack({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col gap-4 ${className}`} {...props} />;
}

export function Grid({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`grid gap-4 ${className}`} {...props} />;
}

export function Divider() { return <hr className="border-0 border-t border-slate-200" />; }

export function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-standard bg-slate-200 ${className}`} />;
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return <div className="rounded-standard border border-dashed border-slate-300 bg-cloud p-6 text-center"><h2 className="text-lg font-semibold text-ink-900">{title}</h2><p className="mt-2 text-sm leading-6 text-slate">{children}</p></div>;
}

export function ErrorState({ title = 'Something went wrong', children }: { title?: string; children: ReactNode }) {
  return <div role="alert" className="rounded-standard border border-red-200 bg-red-50 p-6 text-red-800"><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm leading-6">{children}</p></div>;
}

export function Label({ className = '', ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`block text-sm font-medium text-ink-900 ${className}`} {...props} />;
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-sm leading-5 text-slate">{children}</p>;
}

export function ErrorMessage({ children }: { children?: ReactNode }) {
  return children ? <p role="alert" className="mt-1 text-sm leading-5 text-risk">{children}</p> : null;
}

const controlClass = 'mt-1 min-h-11 w-full rounded-standard border border-slate-300 bg-white px-3 py-2 text-ink-900 placeholder:text-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-relay focus-visible:ring-offset-2';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${controlClass} ${props.className ?? ''}`} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${controlClass} ${props.className ?? ''}`} {...props} />;
}

export function Checkbox({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  return <label className="flex min-h-11 items-center gap-3 text-sm text-ink-900"><input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-relay focus:ring-relay" {...props} />{label}</label>;
}

export function Radio({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  return <label className="flex min-h-11 items-center gap-3 text-sm text-ink-900"><input type="radio" className="h-5 w-5 border-slate-300 text-relay focus:ring-relay" {...props} />{label}</label>;
}

export function FileInput({ onChange, ...props }: InputHTMLAttributes<HTMLInputElement> & { onChange?: ChangeEventHandler<HTMLInputElement> }) {
  return <input type="file" className={`${controlClass} file:mr-3 file:rounded-full file:border-0 file:bg-blue-100 file:px-3 file:py-1 file:font-semibold file:text-blue-800 ${props.className ?? ''}`} onChange={onChange} {...props} />;
}
