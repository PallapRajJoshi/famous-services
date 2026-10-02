"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccItem = { id?: string; q: React.ReactNode; a: React.ReactNode };

/** Accessible accordion (button + region, aria-expanded) with animated height. */
export function Accordion({ items, single = true, className, defaultOpen = 0 }: { items: AccItem[]; single?: boolean; className?: string; defaultOpen?: number | null }) {
  const [open, setOpen] = React.useState<Set<number>>(new Set(defaultOpen === null ? [] : [defaultOpen]));
  const base = React.useId();
  const toggle = (i: number) => setOpen((prev) => {
    const next = new Set(single ? [] : prev);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white", className)}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i}>
            <h3>
              <button type="button" id={`${base}-b${i}`} aria-expanded={isOpen} aria-controls={`${base}-p${i}`} onClick={() => toggle(i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[15px] font-semibold text-ink transition-colors hover:bg-pale/60 sm:px-5">
                <span>{it.q}</span>
                <ChevronDown aria-hidden className={cn("h-5 w-5 shrink-0 text-brand transition-transform duration-200", isOpen && "rotate-180")} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="px-4 pb-4 text-[15px] leading-relaxed text-muted sm:px-5">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
