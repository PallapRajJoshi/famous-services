import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-xl bg-pale-2/70", className)} />;
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
      <Loader2 className="h-7 w-7 animate-spin text-brand" aria-hidden />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function EmptyState({ icon, title, body, action, className }: { icon?: React.ReactNode; title: string; body?: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center rounded-2xl border border-dashed border-line bg-pale/50 px-6 py-12 text-center", className)}>
      {icon && <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-white text-brand shadow-sm">{icon}</div>}
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {body && <p className="mt-1.5 max-w-sm text-sm text-muted">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
