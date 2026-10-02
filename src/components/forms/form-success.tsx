"use client";
import * as React from "react";
import { CheckCircle2 } from "lucide-react";

export function FormSuccess({ title, body, refId, children }: { title: string; body: string; refId?: string; children?: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="focus-quiet rounded-2xl border border-success/30 bg-success-50 p-6 text-center sm:p-8">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-success shadow-sm"><CheckCircle2 className="h-8 w-8" aria-hidden /></span>
      <h3 className="mt-4 text-xl font-extrabold text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-muted">{body}</p>
      {refId && <p className="mx-auto mt-4 inline-block rounded-xl border-2 border-dashed border-success/40 bg-white px-4 py-2 font-mono text-sm font-bold tracking-wider text-ink">{refId}</p>}
      {children && <div className="mt-5 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
export const refCode = (p: string) => `${p}-${Date.now().toString(36).slice(-5).toUpperCase()}`;
