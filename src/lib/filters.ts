import type { Service } from "@/data/catalog";
import { isQuote } from "@/data/catalog";

export type PriceF = "any" | "u1000" | "1-3k" | "3-6k" | "6k+";
export type DurF = "any" | "s1" | "1-3" | "3+";
export type TypeF = "any" | "fixed" | "quote";
export type SortKey = "recommended" | "price-asc" | "price-desc" | "duration";
export type Filters = { price: PriceF; dur: DurF; type: TypeF; same: boolean; sub: string | null };

export const DEFAULT_FILTERS: Filters = { price: "any", dur: "any", type: "any", same: false, sub: null };

export const activeCount = (f: Filters) => (f.price !== "any" ? 1 : 0) + (f.dur !== "any" ? 1 : 0) + (f.type !== "any" ? 1 : 0) + (f.same ? 1 : 0) + (f.sub ? 1 : 0);

export function applyFilters(list: Service[], f: Filters): Service[] {
  return list.filter((s) => {
    if (f.sub && s.sub !== f.sub) return false;
    if (f.same && !s.sameDay) return false;
    if (f.type === "fixed" && isQuote(s)) return false;
    if (f.type === "quote" && !isQuote(s)) return false;
    if (f.dur === "s1" && s.durationMax > 60) return false;
    if (f.dur === "1-3" && (s.durationMax <= 60 || s.durationMax > 180)) return false;
    if (f.dur === "3+" && s.durationMax <= 180) return false;
    if (f.price !== "any") {
      const p = s.price;
      if (p == null) return false;
      if (f.price === "u1000" && p >= 1000) return false;
      if (f.price === "1-3k" && (p < 1000 || p > 3000)) return false;
      if (f.price === "3-6k" && (p < 3000 || p > 6000)) return false;
      if (f.price === "6k+" && p < 6000) return false;
    }
    return true;
  });
}

export function sortServices(list: Service[], by: SortKey): Service[] {
  const a = [...list];
  const price = (s: Service) => s.price ?? Number.POSITIVE_INFINITY;
  if (by === "price-asc") a.sort((x, y) => price(x) - price(y));
  else if (by === "price-desc") a.sort((x, y) => (y.price ?? -1) - (x.price ?? -1));
  else if (by === "duration") a.sort((x, y) => x.durationMin - y.durationMin);
  else a.sort((x, y) => Number(!!y.popular) - Number(!!x.popular));
  return a;
}
