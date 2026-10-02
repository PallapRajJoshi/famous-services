"use client";
import Link from "next/link";
import { Check, Clock, ArrowRight } from "lucide-react";
import type { Pack } from "@/data/content";
import { ServiceScene } from "@/components/art/scenes";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { useLang } from "@/components/lang-provider";
import { money, num } from "@/lib/format";
import { imageKey } from "@/config/images";

export function PackageCard({ pack, compact }: { pack: Pack; compact?: boolean }) {
  const { t, lang } = useLang();
  const savings = pack.original - pack.offer;
  const pct = Math.round((savings / pack.original) * 100);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]"><ServiceScene category={pack.art} seed={pack.slug} photo={imageKey.package(pack.slug)} /></div>
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          <Badge tone="success">{t("Save", "बचत")} {num(pct, lang)}%</Badge>
          {pack.badge && <Badge tone="dark">{t(pack.badge)}</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold leading-snug text-ink"><Link href={`/packages/${pack.slug}`} className="after:absolute after:inset-0 after:content-['']">{t(pack.name)}</Link></h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(pack.desc)}</p>
        {!compact && (
          <ul className="mt-3.5 space-y-1.5">
            {pack.includes.slice(0, 4).map((i, k) => (
              <li key={k} className="flex items-start gap-2 text-[13px] text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t(i)}</li>
            ))}
            {pack.includes.length > 4 && <li className="pl-6 text-xs text-muted">+ {num(pack.includes.length - 4, lang)} {t("more", "थप")}</li>}
          </ul>
        )}
        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-muted line-through">{money(pack.original, lang)}</p>
              <p className="text-2xl font-extrabold leading-none text-brand-deep">{money(pack.offer, lang)}</p>
              <p className="mt-1 text-xs font-semibold text-success">{t("You save", "तपाईंले बचाउनुहुन्छ")} {money(savings, lang)}</p>
            </div>
            <p className="inline-flex items-center gap-1 text-xs font-medium text-muted"><Clock className="h-3.5 w-3.5" aria-hidden />{t(pack.duration)}</p>
          </div>
          <p className="mt-1.5 text-[11px] text-muted">{t("Sample package price", "नमुना प्याकेज मूल्य")}</p>
          <ButtonLink href={`/packages/${pack.slug}`} variant="primary" size="sm" className="relative z-10 mt-3 w-full">{t("View Package", "प्याकेज हेर्नुहोस्")}<ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
        </div>
      </div>
    </article>
  );
}
