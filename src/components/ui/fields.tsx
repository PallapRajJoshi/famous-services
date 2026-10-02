"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Common = { label: string; hint?: string; error?: string; required?: boolean; className?: string; wrapperClassName?: string };
const control = "w-full rounded-xl border bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-colors duration-150 hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 disabled:bg-pale disabled:text-muted";

function Shell({ id, label, hint, error, required, wrapperClassName, children }: Common & { id: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-1.5", wrapperClassName)}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-danger" aria-hidden> *</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="text-xs font-semibold text-danger">{error}</p>}
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, Common & React.InputHTMLAttributes<HTMLInputElement>>(function Input({ label, hint, error, required, className, wrapperClassName, ...rest }, ref) {
  const id = React.useId();
  return (
    <Shell id={id} {...{ label, hint, error, required, wrapperClassName }}>
      <input ref={ref} id={id} required={required} aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} className={cn(control, "h-12", error ? "border-danger" : "border-line", className)} {...rest} />
    </Shell>
  );
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ label, hint, error, required, className, wrapperClassName, ...rest }, ref) {
  const id = React.useId();
  return (
    <Shell id={id} {...{ label, hint, error, required, wrapperClassName }}>
      <textarea ref={ref} id={id} required={required} aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} className={cn(control, "min-h-28 py-3", error ? "border-danger" : "border-line", className)} {...rest} />
    </Shell>
  );
});

export const Select = React.forwardRef<HTMLSelectElement, Common & React.SelectHTMLAttributes<HTMLSelectElement>>(function Select({ label, hint, error, required, className, wrapperClassName, children, ...rest }, ref) {
  const id = React.useId();
  return (
    <Shell id={id} {...{ label, hint, error, required, wrapperClassName }}>
      <div className="relative">
        <select ref={ref} id={id} required={required} aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} className={cn(control, "h-12 appearance-none pr-10", error ? "border-danger" : "border-line", className)} {...rest}>
          {children}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"><path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </Shell>
  );
});

/** Big tappable radio/checkbox card used in booking steps and filters. */
export function ChoiceCard({ type = "radio", checked, onChange, name, children, className, disabled }: { type?: "radio" | "checkbox"; checked: boolean; onChange: () => void; name?: string; children: React.ReactNode; className?: string; disabled?: boolean }) {
  return (
    <label className={cn("group relative flex min-h-[52px] cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", checked ? "border-brand bg-pale" : "border-line bg-white hover:border-brand/40", disabled && "pointer-events-none opacity-55", className)}>
      <input type={type} name={name} checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" />
      <span aria-hidden className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-2 transition-colors", type === "radio" ? "rounded-full" : "rounded-md", checked ? "border-brand bg-brand" : "border-line bg-white")}>
        {checked && (type === "radio" ? <span className="h-2 w-2 rounded-full bg-white" /> : <svg viewBox="0 0 12 12" className="h-3 w-3 text-white"><path d="M2.5 6.5l2.2 2.2L9.5 3.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
      </span>
      <span className="min-w-0 flex-1 text-sm">{children}</span>
    </label>
  );
}
