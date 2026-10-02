"use client";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function QtyStepper({ value, min, max, onChange, label, className }: { value: number; min: number; max: number; onChange: (n: number) => void; label: string; className?: string }) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center rounded-xl border border-line bg-white", className)}>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`− ${label}`} className="grid h-11 w-11 place-items-center rounded-l-xl text-brand transition hover:bg-pale disabled:opacity-40"><Minus className="h-4 w-4" aria-hidden /></button>
      <output aria-live="polite" className="min-w-12 text-center text-base font-bold text-ink">{value}</output>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`+ ${label}`} className="grid h-11 w-11 place-items-center rounded-r-xl text-brand transition hover:bg-pale disabled:opacity-40"><Plus className="h-4 w-4" aria-hidden /></button>
    </div>
  );
}
