"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listingTitle, type Listing } from "@/data/rentals";
import { ServiceScene } from "@/components/art/scenes";
import { useLang } from "@/components/lang-provider";
import { money, moneyBig } from "@/lib/format";
import { useListingText } from "./parts";
import { imageKey } from "@/config/images";

/** Compact rows for matching rentals/property — used by the search modal and the services search. */
export function ListingMiniList({ items, onNavigate }: { items: Listing[]; onNavigate?: () => void }) {
  const { t, lang } = useLang();
  const { where } = useListingText();
  if (!items.length) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((l) => (
        <li key={l.id}>
          <Link href={`/rentals/${l.kind}/${l.id}`} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-pale">
            <span className="h-12 w-16 shrink-0 overflow-hidden rounded-lg"><ServiceScene category={l.scene} seed={l.id} photo={imageKey.listing(l.id)} /></span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-ink">{t(listingTitle(l))}</span><span className="block truncate text-xs text-muted">{where(l)} · {l.kind === "rooms" ? `${money(l.price, lang)} ${t("/ month", "/ महिना")}` : moneyBig(l.price, lang)} · {t("Demo", "डेमो")}</span></span>
            <ArrowRight className="h-4 w-4 text-brand opacity-0 transition group-hover:opacity-100" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
