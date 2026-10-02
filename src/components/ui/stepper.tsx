import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** Horizontal stepper. Mobile shows the current step label only; desktop shows all labels. */
export function Stepper({ steps, current, className, onJump }: { steps: string[]; current: number; className?: string; onJump?: (i: number) => void }) {
  return (
    <nav aria-label="Progress" className={className}>
      <div className="sm:hidden" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={current + 1} aria-valuetext={`${current + 1} / ${steps.length}: ${steps[current]}`}>
        <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${((current + 1) / steps.length) * 100}%` }} /></div>
      </div>
      <ol className="hidden items-center sm:flex">
        {steps.map((s, i) => {
          const done = i < current, active = i === current;
          return (
            <li key={s} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
              <button type="button" disabled={!done || !onJump} onClick={() => onJump?.(i)} aria-current={active ? "step" : undefined} className="group flex items-center gap-2 disabled:cursor-default">
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition-colors duration-200", done && "border-brand bg-brand text-white", active && "border-brand bg-white text-brand ring-4 ring-brand/15", !done && !active && "border-line bg-white text-muted")}>
                  {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                  <span className="sr-only">{done ? " (done)" : active ? " (current)" : ""}</span>
                </span>
                <span className={cn("hidden whitespace-nowrap text-sm font-semibold xl:block", active ? "text-brand-deep" : done ? "text-ink" : "text-muted")}>{s}</span>
              </button>
              {i < steps.length - 1 && <span aria-hidden className={cn("mx-2 h-0.5 flex-1 rounded-full transition-colors duration-300 sm:mx-3", done ? "bg-brand" : "bg-line")} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const BookingStepper = Stepper;
