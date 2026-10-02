"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** Inline link to a draft legal document; opens in a new tab so a half-filled form is never lost. */
export function LegalLink({ slug, children, className }: { slug: string; children: React.ReactNode; className?: string }) {
  return <Link href={`/legal/${slug}`} target="_blank" rel="noopener" className={cn("font-semibold text-brand underline-offset-2 hover:underline", className)}>{children}</Link>;
}

/** Required consent checkbox used by every form that needs the person to accept terms. */
export function ConsentCheck({ id, checked, onChange, error, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
        <input type="checkbox" id={id} checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[#1746A2]" />
        <span>{children}</span>
      </label>
      {error && <p id={`${id}-err`} role="alert" className="mt-2 text-xs font-semibold text-danger">{error}</p>}
    </div>
  );
}
