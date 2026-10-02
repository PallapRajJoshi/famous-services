"use client";
import { Tag } from "lucide-react";
import { detailsFor, isQuote, type Service } from "@/data/catalog";
import { computePrice, qtyFor } from "@/lib/pricing";
import { money, num } from "@/lib/format";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export function PriceSummary({ service: s, qty, addOnIds, coupon, className, compact }: { service: Service; qty: number; addOnIds: string[]; coupon: string | null; className?: string; compact?: boolean }) {
  const { t, lang } = useLang();
  const d = detailsFor(s.category);
  const chosen = d.addOns.filter((a) => addOnIds.includes(a.id));
  const p = computePrice(s, { qty, addOnTotal: chosen.reduce((n, a) => n + a.price, 0), coupon });
  const q = qtyFor(s);
  const quote = isQuote(s);
  const Row = ({ l, v, strong, good }: { l: React.ReactNode; v: React.ReactNode; strong?: boolean; good?: boolean }) => (
    <div className={cn("flex items-start justify-between gap-4 text-sm", strong && "text-base font-extrabold text-brand-deep", good && "font-semibold text-success")}><dt className={cn(!strong && !good && "text-muted")}>{l}</dt><dd className="shrink-0 font-semibold tabular-nums">{v}</dd></div>
  );
  return (
    <section aria-label={t("Price summary", "मूल्य सारांश")} className={cn("rounded-2xl border border-line bg-white p-5 shadow-card", className)}>
      {!compact && <h2 className="mb-3.5 text-base font-extrabold text-brand-deep">{t("Price summary", "मूल्य सारांश")}</h2>}
      <dl className="space-y-2.5">
        {quote ? (
          <>
            <Row l={t(s.name)} v={s.model === "inspection" ? t("Quote after inspection", "निरीक्षणपछि कोटेसन") : t("Custom quote", "अनुकूल कोटेसन")} />
            <Row l={t("Visit fee (sample)", "भ्रमण शुल्क (नमुना)")} v={p.visit ? money(p.visit, lang) : t("To be confirmed", "पुष्टि हुनेछ")} />
          </>
        ) : (
          <>
            <Row l={q ? `${t(s.name)} · ${num(qty, lang)} ${t(q.label).toLowerCase()} × ${money(s.price ?? 0, lang)}` : t(s.name)} v={money(p.base, lang)} />
            {chosen.map((a) => <Row key={a.id} l={`+ ${t(a.name)}`} v={money(a.price, lang)} />)}
            {p.discount > 0 && <Row good l={<span className="inline-flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" aria-hidden />{coupon}</span>} v={`− ${money(p.discount, lang)}`} />}
          </>
        )}
      </dl>
      <div className="mt-3.5 border-t border-line pt-3.5">
        <dl><Row strong l={quote ? t("Due now", "अहिले तिर्नुपर्ने") : t("Total", "जम्मा")} v={quote && !p.visit ? money(0, lang) : money(p.total, lang)} /></dl>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">{quote ? t("The final price is quoted after inspection and needs your approval. Sample figures.", "अन्तिम मूल्य निरीक्षणपछि कोट हुन्छ र तपाईंको स्वीकृति चाहिन्छ। नमुना आँकडा।") : t("Sample prices. Spare parts, if any, are quoted separately. No payment is taken in this prototype.", "नमुना मूल्य। पार्टपुर्जा भए छुट्टै कोट हुन्छ। यो प्रोटोटाइपमा भुक्तानी लिइँदैन।")}</p>
      </div>
    </section>
  );
}
