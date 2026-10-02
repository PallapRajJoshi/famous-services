import { SERVICES, type Service } from "@/data/catalog";
import { offerByCode, type Offer } from "@/data/content";

export const isQuoteService = (s: Service) => s.model === "inspection" || s.model === "quote";

export type Qty = { label: { en: string; ne: string }; min: number; max: number; def: number } | null;
/** Quantity selector for per-hour / per-kg services. */
export function qtyFor(s: Service): Qty {
  if (s.model !== "hourly") return null;
  const u = s.unit?.en ?? "";
  if (u.includes("kg")) return { label: { en: "Kilograms", ne: "केजी" }, min: 3, max: 30, def: 5 };
  if (u.includes("helper")) return { label: { en: "Helper-hours", ne: "सहयोगी-घण्टा" }, min: 2, max: 24, def: 4 };
  return { label: { en: "Hours", ne: "घण्टा" }, min: 2, max: 10, def: 2 };
}

export function couponCheck(code: string, s: Service, subtotal: number): { ok: true; offer: Offer; discount: number } | { ok: false; reason: "unknown" | "min" | "category" | "quote" } {
  const offer = offerByCode(code);
  if (!offer) return { ok: false, reason: "unknown" };
  if (isQuoteService(s)) return { ok: false, reason: "quote" };
  if (offer.category && offer.category !== s.category) return { ok: false, reason: "category" };
  if (subtotal < offer.minSpend) return { ok: false, reason: "min" };
  let d = offer.kind === "percent" ? Math.round((subtotal * offer.value) / 100) : offer.value;
  if (offer.max) d = Math.min(d, offer.max);
  return { ok: true, offer, discount: Math.min(d, subtotal) };
}

export function computePrice(s: Service, opts: { qty?: number; addOnTotal?: number; coupon?: string | null }) {
  const quote = isQuoteService(s);
  const qty = s.model === "hourly" ? opts.qty ?? qtyFor(s)?.def ?? 1 : 1;
  const base = quote ? 0 : (s.price ?? 0) * qty;
  const addOns = opts.addOnTotal ?? 0;
  const subtotal = base + addOns;
  const c = opts.coupon && !quote ? couponCheck(opts.coupon, s, subtotal) : null;
  const discount = c && c.ok ? c.discount : 0;
  const visit = quote ? s.visitFee ?? 0 : 0;
  return { quote, qty, base, addOns, subtotal, discount, visit, total: quote ? visit : subtotal - discount, coupon: c };
}

export const serviceBySlugSafe = (slug: string) => SERVICES.find((s) => s.slug === slug) ?? null;
