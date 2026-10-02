"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle, X } from "lucide-react";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/cn";

export function Toaster() {
  const toasts = useApp((s) => s.toasts);
  const dismiss = useApp((s) => s.dismissToast);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex flex-col items-center gap-2 px-4 lg:bottom-6" aria-live="polite" aria-atomic="false">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = t.tone === "success" ? CheckCircle2 : t.tone === "error" ? XCircle : Info;
          return (
            <motion.div key={t.id} layout initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} role="status"
              className={cn("pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border bg-white p-3.5 pr-2 text-sm shadow-lg", t.tone === "success" ? "border-success/30" : t.tone === "error" ? "border-danger/30" : "border-brand/25")}>
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", t.tone === "success" ? "text-success" : t.tone === "error" ? "text-danger" : "text-brand")} aria-hidden />
              <p className="flex-1 font-medium text-ink">{t.msg}</p>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-pale"><X className="h-4 w-4" aria-hidden /></button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
