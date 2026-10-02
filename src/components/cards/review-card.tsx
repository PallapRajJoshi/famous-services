"use client";
import { Quote } from "lucide-react";
import type { Review } from "@/data/content";
import { serviceBySlug, categoryBySlug } from "@/data/catalog";
import { districtBySlug } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";

/** Demo review — clearly labelled. No star ratings are shown because no real ratings exist. */
export function ReviewCard({ review }: { review: Review }) {
  const { t } = useLang();
  const svc = serviceBySlug(review.service);
  const cat = categoryBySlug(review.category);
  const d = districtBySlug(review.district);
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <Quote className="h-6 w-6 text-brand/30" aria-hidden />
        <Badge tone="amber">{t("Demo review", "डेमो समीक्षा")}</Badge>
      </div>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">{t(review.text)}</blockquote>
      <figcaption className="mt-4 border-t border-line pt-3.5">
        <p className="text-sm font-bold text-ink">{review.who}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge tone="brand">{svc ? t(svc.name) : cat ? t(cat.name) : ""}</Badge>
          {d && <Badge tone="neutral">{t(d.name)}</Badge>}
          <Badge tone="outline">{t(review.when)}</Badge>
        </div>
      </figcaption>
    </figure>
  );
}
