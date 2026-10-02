"use client";
import * as React from "react";
import { Bath, BedDouble, Bike, Cctv, Car, Compass, CookingPot, Droplets, Layers, MoveVertical, Route, Ruler, ShowerHead, Sun, BatteryCharging, WashingMachine, Wifi, Zap, Waves, Trees, Fence, type LucideIcon } from "lucide-react";
import { AVAILABLE, DISTRICT_NAME, FACILITY, landSize, pricePerAana, type Facility, type Listing } from "@/data/rentals";
import { useLang } from "@/components/lang-provider";
import { money, moneyBig, num } from "@/lib/format";

export const FACILITY_ICON: Record<Facility, LucideIcon> = {
  wifi: Wifi, water: Droplets, hotwater: ShowerHead, parking: Car, bikeparking: Bike, kitchen: CookingPot, balcony: Sun, lift: MoveVertical,
  cctv: Cctv, backup: BatteryCharging, laundry: WashingMachine, power: Zap, drainage: Waves, garden: Trees, terrace: Fence,
};

const FACING = { east: ["East", "पूर्व"], west: ["West", "पश्चिम"], north: ["North", "उत्तर"], south: ["South", "दक्षिण"] } as const;

export function useListingText() {
  const { t, lang } = useLang();
  const where = (l: Listing) => `${t(l.locality)}, ${t(DISTRICT_NAME[l.district])}`;
  const area = (aana: number) => {
    const s = landSize(aana);
    const parts: string[] = [];
    if (s.ropani) parts.push(`${num(s.ropani, lang)} ${t("ropani", "रोपनी")}`);
    if (s.aana) parts.push(`${num(s.aana, lang)} ${t("aana", "आना")}`);
    return { label: parts.join(" "), sqft: `${num(s.sqft.toLocaleString("en-IN"), lang)} ${t("sq ft", "वर्गफिट")}` };
  };
  const facing = (f?: keyof typeof FACING) => (f ? `${t(FACING[f][0], FACING[f][1])} ${t("facing", "मुखी")}` : "");
  return { t, lang, where, area, facing };
}

export type Fact = { icon: LucideIcon; text: string };
/** The 3–4 facts a person scans first, per kind. */
export function useFacts(l: Listing, max = 3): Fact[] {
  const { t, lang, area, facing } = useListingText();
  const out: Fact[] = [];
  if (l.kind === "rooms") {
    out.push({ icon: Bath, text: l.bath === "attached" ? t("Attached bath", "जोडिएको बाथरुम") : t("Shared bath", "साझा बाथरुम") });
    if (l.floor != null) out.push({ icon: Layers, text: `${t("Floor", "तला")} ${num(l.floor, lang)}` });
    if (l.sizeSqft) out.push({ icon: Ruler, text: `${num(l.sizeSqft, lang)} ${t("sq ft", "वर्गफिट")}` });
  } else if (l.kind === "land") {
    const a = area(l.aana!);
    out.push({ icon: Ruler, text: `${a.label} · ${a.sqft}` });
    if (l.roadFt) out.push({ icon: Route, text: `${num(l.roadFt, lang)} ${t("ft road", "फिट सडक")}` });
    if (l.facing) out.push({ icon: Compass, text: facing(l.facing) });
  } else {
    if (l.beds) out.push({ icon: BedDouble, text: `${num(l.beds, lang)} ${t("bed", "कोठा")}` });
    if (l.baths) out.push({ icon: Bath, text: `${num(l.baths, lang)} ${t("bath", "बाथरुम")}` });
    if (l.builtSqft) out.push({ icon: Ruler, text: `${num(l.builtSqft.toLocaleString("en-IN"), lang)} ${t("sq ft built", "वर्गफिट निर्मित")}` });
    if (out.length < 3 && l.landAana) out.push({ icon: Layers, text: `${area(l.landAana).label} ${t("land", "जग्गा")}` });
  }
  return out.slice(0, max);
}

export function ListingPrice({ l, size = "md" }: { l: Listing; size?: "md" | "lg" }) {
  const { t, lang } = useLang();
  const big = size === "lg";
  const main = l.kind === "rooms" ? money(l.price, lang) : moneyBig(l.price, lang);
  return (
    <div className="min-w-0">
      <p className="flex flex-wrap items-baseline gap-x-1.5">
        <span className={big ? "text-3xl font-extrabold text-brand-deep" : "text-[18px] font-extrabold text-brand-deep"}>{main}</span>
        {l.kind === "rooms" && <span className={big ? "text-sm text-muted" : "text-xs text-muted"}>{t("/ month", "/ महिना")}</span>}
      </p>
      <p className="mt-0.5 text-[11px] text-muted">
        {l.kind === "land" && <>{moneyBig(pricePerAana(l), lang)} {t("per aana", "प्रति आना")} · </>}
        {l.negotiable && <>{t("Negotiable", "मोलमोलाइ मिल्छ")} · </>}
        {t("Sample price", "नमुना मूल्य")}
      </p>
    </div>
  );
}

export function AvailableText({ l }: { l: Listing }) {
  const { t } = useLang();
  return l.available ? <>{t(AVAILABLE[l.available])}</> : null;
}

export function FacilityList({ items, className }: { items: Facility[]; className?: string }) {
  const { t } = useLang();
  return (
    <ul className={className ?? "grid grid-cols-2 gap-2.5 sm:grid-cols-3"}>
      {items.map((f) => { const I = FACILITY_ICON[f]; return (
        <li key={f} className="flex items-center gap-2.5 rounded-xl bg-pale px-3 py-2.5 text-sm font-semibold text-ink"><I className="h-4 w-4 shrink-0 text-brand" aria-hidden />{t(FACILITY[f])}</li>
      ); })}
    </ul>
  );
}
