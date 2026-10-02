"use client";
import * as React from "react";
import { MapPin, Check } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { DISTRICTS } from "@/data/content";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { useUi } from "@/store/ui-store";
import { cn } from "@/lib/cn";

export function useIsDesktop() {
  const [d, setD] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const f = () => setD(m.matches);
    f(); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return d;
}

export function AreaSheet() {
  const { t } = useLang();
  const open = useUi((s) => s.areaOpen);
  const setOpen = useUi((s) => s.setAreaOpen);
  const area = useApp((s) => s.area);
  const setArea = useApp((s) => s.setArea);
  const toast = useApp((s) => s.toast);
  const desktop = useIsDesktop();
  return (
    <Sheet open={open} onClose={() => setOpen(false)} side={desktop ? "center" : "bottom"} title={t("Where do you need the service?", "सेवा कहाँ चाहिन्छ?")}>
      <div className="space-y-2.5 p-5">
        <p className="text-sm text-muted">{t("Choose your district. Coverage is rolled out area by area — we confirm your exact location while booking.", "आफ्नो जिल्ला रोज्नुहोस्। सेवा क्षेत्र-क्षेत्र गरी विस्तार हुँदैछ — बुकिङमा तपाईंको ठेगाना पुष्टि गरिन्छ।")}</p>
        {DISTRICTS.map((d) => {
          const on = area === d.slug;
          return (
            <button key={d.slug} type="button" aria-pressed={on} onClick={() => { setArea(d.slug); setOpen(false); toast(t(`Area set to ${d.name.en}`, `क्षेत्र ${d.name.ne} राखियो`), "info"); }}
              className={cn("flex min-h-[60px] w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors", on ? "border-brand bg-pale" : "border-line hover:border-brand/40")}>
              <span className={cn("grid h-10 w-10 place-items-center rounded-full", on ? "bg-brand text-white" : "bg-pale text-brand")}><MapPin className="h-5 w-5" aria-hidden /></span>
              <span className="flex-1"><span className="block text-[15px] font-bold text-ink">{t(d.name)}</span><span className="block text-xs text-muted">{d.neighbourhoods.slice(0, 3).join(" · ")}</span></span>
              {on && <Check className="h-5 w-5 text-brand" aria-hidden />}
            </button>
          );
        })}
        {area && <button type="button" onClick={() => { setArea(null); setOpen(false); }} className="w-full py-2 text-center text-sm font-semibold text-muted underline-offset-2 hover:text-brand hover:underline">{t("Clear selection", "छनोट हटाउनुहोस्")}</button>}
      </div>
    </Sheet>
  );
}
