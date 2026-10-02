"use client";
import { ChevronDown, MapPin } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { useUi } from "@/store/ui-store";
import { districtBySlug } from "@/data/content";
import { cn } from "@/lib/cn";

/** Inline area selector — opens the shared area sheet. */
export function AreaButton({ className }: { className?: string }) {
  const { t } = useLang();
  const area = useApp((s) => s.area);
  const hydrated = useHydrated();
  const setOpen = useUi((s) => s.setAreaOpen);
  const d = hydrated && area ? districtBySlug(area) : null;
  return (
    <button type="button" onClick={() => setOpen(true)} className={cn("inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand/40 hover:bg-pale", className)}>
      <MapPin className="h-4 w-4 text-brand" aria-hidden />
      <span className="max-w-[10rem] truncate">{d ? t(d.name) : t("Choose your area", "आफ्नो क्षेत्र रोज्नुहोस्")}</span>
      <ChevronDown className="h-4 w-4 text-muted" aria-hidden />
    </button>
  );
}
