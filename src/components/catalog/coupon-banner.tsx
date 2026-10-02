"use client";
import * as React from "react";
import { Ticket, X } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { useUi } from "@/store/ui-store";
import { offerByCode } from "@/data/content";

/** Shows a coupon picked on /offers and remembers it for the booking flow (this session only). */
export function CouponBanner({ code }: { code?: string }) {
  const { t } = useLang();
  const coupon = useUi((s) => s.coupon);
  const setCoupon = useUi((s) => s.setCoupon);
  React.useEffect(() => { if (code && offerByCode(code)) setCoupon(offerByCode(code)!.code); }, [code, setCoupon]);
  if (!coupon) return null;
  return (
    <div role="status" className="mb-5 flex items-center gap-3 rounded-xl border border-amber/50 bg-amber-50 px-4 py-3 text-sm text-ink">
      <Ticket className="h-5 w-5 shrink-0 text-warn" aria-hidden />
      <p className="min-w-0 flex-1"><strong className="font-mono">{coupon}</strong> {t("will be offered at the review step of your booking (if the service qualifies).", "तपाईंको बुकिङको समीक्षा चरणमा प्रस्ताव गरिनेछ (सेवा योग्य भए)।")}</p>
      <button type="button" onClick={() => setCoupon(null)} aria-label={t("Remove coupon", "कुपन हटाउनुहोस्")} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-white hover:text-ink"><X className="h-4 w-4" aria-hidden /></button>
    </div>
  );
}
