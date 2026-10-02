"use client";
import * as React from "react";
import { Check, Copy, Ticket, Timer } from "lucide-react";
import type { Offer } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { money, num } from "@/lib/format";
import { cn } from "@/lib/cn";

export function CouponChip({ code }: { code: string }) {
  const { t } = useLang();
  const toast = useApp((s) => s.toast);
  const [copied, setCopied] = React.useState(false);
  return (
    <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); } catch { /* clipboard unavailable */ } setCopied(true); toast(t(`Code ${code} copied`, `कोड ${code} कपी भयो`), "success"); setTimeout(() => setCopied(false), 1800); }}
      aria-label={t(`Copy code ${code}`, `कोड ${code} कपी गर्नुहोस्`)}
      className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-dashed border-brand/50 bg-pale px-3.5 font-mono text-sm font-bold tracking-wider text-brand-deep transition hover:border-brand hover:bg-pale-2">
      <Ticket className="h-4 w-4" aria-hidden />{code}
      {copied ? <Check className="h-4 w-4 text-success" aria-hidden /> : <Copy className="h-4 w-4 opacity-60" aria-hidden />}
    </button>
  );
}

export function OfferCard({ offer, className }: { offer: Offer; className?: string }) {
  const { t, lang } = useLang();
  const headline = offer.kind === "percent" ? `${num(offer.value, lang)}%` : offer.value > 0 ? money(offer.value, lang) : t("Priority", "प्राथमिकता");
  return (
    <article className={cn("flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:shadow-lift", className)}>
      <div className="relative flex items-center gap-4 bg-brand-deep px-5 py-5 text-white" data-dark>
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative grid h-16 min-w-[4.5rem] shrink-0 place-items-center rounded-2xl bg-amber px-3 text-center">
          <span className="whitespace-nowrap text-lg font-extrabold leading-none text-ink">{headline}</span>
          {offer.value > 0 && <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/70">{t("off", "छुट")}</span>}
        </div>
        <div className="relative min-w-0">
          <Badge tone="outline" className="mb-1.5 border-white/30 bg-white/10 text-white">{t("Demo offer", "डेमो अफर")}</Badge>
          <h3 className="text-base font-bold leading-snug">{t(offer.title)}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">{t(offer.desc)}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-warn"><Timer className="h-3.5 w-3.5" aria-hidden />{t(`Demo expiry: ${offer.endsInDays} days`, `डेमो समाप्ति: ${num(offer.endsInDays, lang)} दिन`)}</p>
        <div className="mt-4"><CouponChip code={offer.code} /></div>
        <div className="mt-4">
          <Accordion single defaultOpen={null} items={[{ q: <span className="text-sm">{t("Terms", "सर्तहरू")}</span>, a: <ul className="list-disc space-y-1 pl-5 text-sm">{offer.terms.map((x, i) => <li key={i}>{t(x)}</li>)}</ul> }]} className="rounded-xl" />
        </div>
        <div className="mt-auto pt-5">
          <ButtonLink href={`/services${offer.category ? `/${offer.category}` : ""}?coupon=${offer.code}`} variant="accent" className="w-full">{t("Apply & Book", "लागू गरी बुक गर्नुहोस्")}</ButtonLink>
        </div>
      </div>
    </article>
  );
}
