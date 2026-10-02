"use client";
import Link from "next/link";
import { Clock, Heart, Flame } from "lucide-react";
import { categoryBySlug, durationLabel, isQuote, type Service } from "@/data/catalog";
import { ServiceScene } from "@/components/art/scenes";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { money } from "@/lib/format";
import { cn } from "@/lib/cn";
import { imageKey } from "@/config/images";

export function PriceLine({ s, size = "md" }: { s: Service; size?: "md" | "lg" }) {
  const { t, lang } = useLang();
  const big = size === "lg";
  if (isQuote(s)) {
    return <p className={cn("font-extrabold text-brand-deep", big ? "text-2xl" : "text-[15px]")}>{s.model === "inspection" ? t("Inspection Quote", "निरीक्षण कोटेसन") : t("Custom Quote", "अनुकूल कोटेसन")}</p>;
  }
  return (
    <p className="flex flex-wrap items-baseline gap-x-1.5">
      <span className={cn("text-muted", big ? "text-sm" : "text-xs")}>{t("From", "सुरु")}</span>
      <span className={cn("font-extrabold text-brand-deep", big ? "text-2xl" : "text-[17px]")}>{money(s.price ?? 0, lang)}</span>
      {s.unit && <span className="text-xs text-muted">{t(s.unit)}</span>}
    </p>
  );
}

export function AvailabilityBadge({ s }: { s: Service }) {
  const { t } = useLang();
  if (s.sameDay) return <Badge tone="success">{t("Same-day on request", "सोही दिन अनुरोधमा")}</Badge>;
  if (isQuote(s)) return <Badge tone="amber">{t("Quote first", "पहिले कोटेसन")}</Badge>;
  return <Badge tone="brand">{t("Book online", "अनलाइन बुक")}</Badge>;
}

export function ServiceCard({ service: s, priority, className }: { service: Service; priority?: boolean; className?: string }) {
  const { t } = useLang();
  const cat = categoryBySlug(s.category);
  const saved = useApp((st) => st.saved.includes(s.slug));
  const toggle = useApp((st) => st.toggleSaved);
  const toast = useApp((st) => st.toast);
  const hydrated = useHydrated();
  const dur = durationLabel(s.durationMin, s.durationMax);
  const quote = isQuote(s);
  const isSaved = hydrated && saved;

  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-pale">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
          <ServiceScene category={s.category} seed={s.slug} photo={imageKey.service(s.slug)} />
        </div>
        <div className="absolute left-2.5 top-2.5"><AvailabilityBadge s={s} /></div>
        {s.popular && <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-brand-deep px-2.5 py-1 text-[11px] font-bold text-white"><Flame className="h-3 w-3 text-amber" aria-hidden />{t("Popular", "लोकप्रिय")}</span>}
        <button type="button" aria-pressed={isSaved} aria-label={isSaved ? t("Remove from saved", "सुरक्षित सूचीबाट हटाउनुहोस्") : t("Save service", "सेवा सुरक्षित गर्नुहोस्")}
          onClick={() => { toggle(s.slug); toast(isSaved ? t("Removed from saved", "सुरक्षित सूचीबाट हटाइयो") : t("Saved to your account (demo)", "तपाईंको खातामा सुरक्षित (डेमो)"), "info"); }}
          className="absolute right-2 top-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-brand shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white">
          <Heart className={cn("h-[18px] w-[18px] transition", isSaved && "fill-danger text-danger")} aria-hidden />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand/80">{cat ? t(cat.name) : ""}</p>
        <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink sm:text-base">
          <Link href={`/services/${s.category}/${s.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4">{t(s.name)}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted sm:text-sm">{t(s.short)}</p>
        <div className="mt-auto pt-3.5">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <PriceLine s={s} />
              {!quote && <p className="mt-0.5 text-[11px] text-muted">{t("Sample price", "नमुना मूल्य")}</p>}
            </div>
            <p className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted"><Clock className="h-3.5 w-3.5" aria-hidden />{t(dur)}</p>
          </div>
          <ButtonLink href={`/book/${s.slug}`} variant="accent" size="sm" className="relative z-10 mt-3 w-full">{quote ? t("Get a Quote", "कोटेसन लिनुहोस्") : t("Book", "बुक गर्नुहोस्")}</ButtonLink>
        </div>
      </div>
    </article>
  );
}
