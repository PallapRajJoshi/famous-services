import * as React from "react";
import { cn } from "@/lib/cn";

export function TrustCard({ icon, title, body, className }: { icon: React.ReactNode; title: string; body: string; className?: string }) {
  return (
    <div className={cn("group h-full rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-6", className)}>
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-pale text-brand transition-colors group-hover:bg-brand group-hover:text-white">{icon}</div>
      <h3 className="text-base font-bold text-ink sm:text-lg">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
