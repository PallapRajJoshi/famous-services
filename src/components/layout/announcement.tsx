"use client";
import { X } from "lucide-react";
import { DEMO_NOTICE } from "@/data/content";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";

export function AnnouncementBar() {
  const { t } = useLang();
  const hidden = useApp((s) => s.announcementHidden);
  const hide = useApp((s) => s.hideAnnouncement);
  const hydrated = useHydrated();
  if (hydrated && hidden) return null;
  return (
    <div className="relative bg-amber-50 text-warn">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-10 py-2 text-center text-xs font-semibold sm:text-[13px]">
        <span>{t(DEMO_NOTICE)}</span>
      </div>
      <button type="button" onClick={hide} aria-label={t("Dismiss notice", "सूचना हटाउनुहोस्")} className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full hover:bg-amber/20"><X className="h-4 w-4" aria-hidden /></button>
    </div>
  );
}
