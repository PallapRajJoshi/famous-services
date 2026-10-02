"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useT } from "@/components/lang-provider";

type Side = "bottom" | "right" | "left" | "center";

function useLock(open: boolean) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);
}

/**
 * One accessible overlay used as Modal (center), Drawer (left/right) and bottom sheet (bottom).
 * Esc closes, focus moves inside and returns to the trigger, background scroll is locked.
 */
export function Sheet({ open, onClose, side = "center", title, children, className, hideHeader, widthClass }: { open: boolean; onClose: () => void; side?: Side; title?: string; children: React.ReactNode; className?: string; hideHeader?: boolean; widthClass?: string }) {
  const t = useT();
  const panel = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  useLock(open);

  React.useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => {
      const el = panel.current?.querySelector<HTMLElement>("[data-autofocus],input,button,a,select,textarea");
      (el ?? panel.current)?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])')).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("keydown", onKey); prevFocus?.focus?.(); };
  }, [open, onClose]);

  if (!mounted) return null;
  const variants = {
    bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
    right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
    left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
    center: { initial: { opacity: 0, scale: 0.96, y: 8 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.97 } },
  }[side];
  const pos = {
    bottom: "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-3xl",
    right: "inset-y-0 right-0 h-dvh w-[min(92vw,420px)]",
    left: "inset-y-0 left-0 h-dvh w-[min(88vw,360px)]",
    center: "left-1/2 top-1/2 max-h-[88dvh] w-[min(94vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl",
  }[side];

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div className="absolute inset-0 bg-brand-deep/55 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={onClose} aria-hidden />
          <motion.div
            ref={panel} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}
            {...variants} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute flex flex-col overflow-hidden bg-white shadow-2xl outline-none", pos, widthClass, className)}
          >
            {side === "bottom" && <span aria-hidden className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-line" />}
            {!hideHeader && (
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-3.5">
                <h2 className="text-lg font-bold text-ink">{title}</h2>
                <button type="button" onClick={onClose} aria-label={t("Close", "बन्द गर्नुहोस्")} className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-pale hover:text-ink">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            )}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
