"use client";
import { dayShort, monthShort, num, dateKey } from "@/lib/format";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export type DayOpt = { key: string; date: Date; disabled: boolean; reason?: string };

/** Horizontal 7-day picker. */
export function DateSelector({ days, value, onChange }: { days: DayOpt[]; value: string; onChange: (k: string) => void }) {
  const { t, lang } = useLang();
  return (
    <div role="radiogroup" aria-label={t("Choose a date", "मिति रोज्नुहोस्")} className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-7 sm:overflow-visible sm:px-0">
      {days.map((d, i) => {
        const on = value === d.key;
        const today = i === 0;
        return (
          <button key={d.key} type="button" role="radio" aria-checked={on} disabled={d.disabled} onClick={() => onChange(d.key)} title={d.reason}
            className={cn("flex min-h-[84px] w-[74px] shrink-0 flex-col items-center justify-center rounded-2xl border px-2 py-2.5 text-center transition-colors sm:w-auto", on ? "border-brand bg-brand text-white shadow-md" : "border-line bg-white text-ink hover:border-brand/40 hover:bg-pale", d.disabled && "cursor-not-allowed opacity-45 hover:border-line hover:bg-white")}>
            <span className={cn("text-[11px] font-bold uppercase tracking-wide", on ? "text-white/80" : "text-muted")}>{today ? t("Today", "आज") : dayShort(d.date, lang)}</span>
            <span className="mt-0.5 text-2xl font-extrabold leading-none">{num(d.date.getDate(), lang)}</span>
            <span className={cn("mt-1 text-[11px] font-medium", on ? "text-white/80" : "text-muted")}>{monthShort(d.date, lang)}</span>
          </button>
        );
      })}
    </div>
  );
}

export { dateKey };
