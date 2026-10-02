"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

/** Minimal accessible disclosure popover: closes on outside click, Esc and focus leaving. */
export function Popover({ trigger, children, align = "left", panelClassName, label }: { trigger: (p: { open: boolean; toggle: () => void; id: string }) => React.ReactNode; children: (close: () => void) => React.ReactNode; align?: "left" | "right" | "center"; panelClassName?: string; label?: string }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId();
  React.useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [open]);
  return (
    <div ref={ref} className="relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      {trigger({ open, toggle: () => setOpen((o) => !o), id })}
      {open && (
        <div id={id} role="region" aria-label={label} className={cn("absolute top-full z-50 mt-2 animate-[pop_.16s_ease-out] rounded-2xl border border-line bg-white shadow-lift", align === "left" && "left-0", align === "right" && "right-0", align === "center" && "left-1/2 -translate-x-1/2", panelClassName)}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}
