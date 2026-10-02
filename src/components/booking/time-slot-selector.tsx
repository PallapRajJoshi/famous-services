"use client";
import { Check } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export type SlotOpt = { id: string; label: string; disabled: boolean; why?: "busy" | "past" };

export function TimeSlotSelector({ slots, value, onChange }: { slots: SlotOpt[]; value: string; onChange: (id: string) => void }) {
  const { t } = useLang();
  return (
    <div role="radiogroup" aria-label={t("Choose a time window", "समय रोज्नुहोस्")} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {slots.map((s) => {
        const on = value === s.id;
        return (
          <button key={s.id} type="button" role="radio" aria-checked={on} disabled={s.disabled} onClick={() => onChange(s.id)}
            className={cn("relative flex min-h-[52px] flex-col items-center justify-center rounded-xl border px-2 py-2 text-sm font-semibold transition-colors", on ? "border-brand bg-brand text-white shadow-md" : "border-line bg-white text-ink hover:border-brand/40 hover:bg-pale", s.disabled && "cursor-not-allowed bg-pale/60 text-muted opacity-60 hover:border-line hover:bg-pale/60")}>
            {on && <Check className="absolute right-2 top-2 h-3.5 w-3.5" aria-hidden />}
            <span className={s.disabled ? "line-through" : ""}>{s.label}</span>
            {s.disabled && <span className="text-[10px] font-medium no-underline">{s.why === "past" ? t("Too soon", "धेरै चाँडो") : t("Fully booked (demo)", "भरिएको (डेमो)")}</span>}
          </button>
        );
      })}
    </div>
  );
}
