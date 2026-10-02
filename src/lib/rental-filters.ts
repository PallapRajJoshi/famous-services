import type { L } from "@/lib/i18n";
import { DISTRICT_NAME, FURNISHINGS, LAND_TYPES, PROP_TYPES, ROOM_TYPES, LISTINGS, listingTitle, type District, type Facility, type Furnishing, type Kind, type Listing, type Suited } from "@/data/rentals";

export type RF = {
  type: string | null;          // room type / land type / property type slug
  furn: Furnishing | "any";
  price: string;                // band id, "any" for none
  district: District | "any";
  suited: Suited | "any";
  bath: "any" | "attached";
  now: boolean;                 // rooms: available now
  size: "any" | "u4" | "4-8" | "8+";   // land
  road: "any" | "13" | "20";    // land + property
  beds: "any" | "2" | "3" | "4+";      // property
  facilities: Facility[];
};
export const DEFAULT_RF: RF = { type: null, furn: "any", price: "any", district: "any", suited: "any", bath: "any", now: false, size: "any", road: "any", beds: "any", facilities: [] };

export type Band = { v: string; min: number; max: number; label: L };
const k = (n: number) => n;
export const PRICE_BANDS: Record<Kind, Band[]> = {
  rooms: [
    { v: "u8", min: 0, max: k(8000), label: { en: "Under Rs. 8,000", ne: "रु. ८,००० भन्दा कम" } },
    { v: "8-15", min: 8000, max: 15000, label: { en: "Rs. 8,000–15,000", ne: "रु. ८,०००–१५,०००" } },
    { v: "15-30", min: 15000, max: 30000, label: { en: "Rs. 15,000–30,000", ne: "रु. १५,०००–३०,०००" } },
    { v: "30+", min: 30000, max: Infinity, label: { en: "Rs. 30,000+", ne: "रु. ३०,०००+" } },
  ],
  land: [
    { v: "u1c", min: 0, max: 1e7, label: { en: "Under Rs. 1 Crore", ne: "रु. १ करोड भन्दा कम" } },
    { v: "1-2c", min: 1e7, max: 2e7, label: { en: "Rs. 1–2 Crore", ne: "रु. १–२ करोड" } },
    { v: "2c+", min: 2e7, max: Infinity, label: { en: "Rs. 2 Crore+", ne: "रु. २ करोड+" } },
  ],
  property: [
    { v: "u1.5c", min: 0, max: 1.5e7, label: { en: "Under Rs. 1.5 Crore", ne: "रु. १.५ करोड भन्दा कम" } },
    { v: "1.5-3c", min: 1.5e7, max: 3e7, label: { en: "Rs. 1.5–3 Crore", ne: "रु. १.५–३ करोड" } },
    { v: "3c+", min: 3e7, max: Infinity, label: { en: "Rs. 3 Crore+", ne: "रु. ३ करोड+" } },
  ],
};

export function typeOf(l: Listing): string { return (l.roomType ?? l.landType ?? l.propType) as string; }

export function applyRF(kind: Kind, f: RF, list: Listing[] = LISTINGS): Listing[] {
  const band = PRICE_BANDS[kind].find((b) => b.v === f.price);
  return list.filter((l) => {
    if (l.kind !== kind) return false;
    if (f.type && typeOf(l) !== f.type) return false;
    if (f.district !== "any" && l.district !== f.district) return false;
    if (band && !(l.price >= band.min && l.price < band.max)) return false;
    if (f.facilities.length && !f.facilities.every((x) => l.facilities.includes(x))) return false;
    if (kind === "rooms") {
      if (f.furn !== "any" && l.furnishing !== f.furn) return false;
      if (f.suited !== "any" && !l.suited?.includes(f.suited)) return false;
      if (f.bath === "attached" && l.bath !== "attached") return false;
      if (f.now && l.available !== "now") return false;
    }
    if (kind === "land") {
      const a = l.aana ?? 0;
      if (f.size === "u4" && !(a < 4)) return false;
      if (f.size === "4-8" && !(a >= 4 && a < 8)) return false;
      if (f.size === "8+" && !(a >= 8)) return false;
    }
    if (kind !== "rooms" && f.road !== "any") {
      if ((l.roadFt ?? 0) < Number(f.road)) return false;
    }
    if (kind === "property" && f.beds !== "any") {
      const b = l.beds ?? 0;
      if (f.beds === "2" && b !== 2) return false;
      if (f.beds === "3" && b !== 3) return false;
      if (f.beds === "4+" && b < 4) return false;
    }
    return true;
  });
}

export type RSort = "recommended" | "price-asc" | "price-desc";
export function sortRF(list: Listing[], s: RSort): Listing[] {
  const a = [...list];
  if (s === "price-asc") a.sort((x, y) => x.price - y.price);
  else if (s === "price-desc") a.sort((x, y) => y.price - x.price);
  else a.sort((x, y) => Number(!!y.featured) - Number(!!x.featured));
  return a;
}

/** Number of active filters other than the type tile and the furnishing segment (those are always visible). */
export function activeRF(kind: Kind, f: RF): number {
  let n = 0;
  if (f.price !== "any") n++;
  if (f.district !== "any") n++;
  if (f.facilities.length) n += f.facilities.length;
  if (kind === "rooms") { if (f.suited !== "any") n++; if (f.bath !== "any") n++; if (f.now) n++; }
  if (kind === "land" && f.size !== "any") n++;
  if (kind !== "rooms" && f.road !== "any") n++;
  if (kind === "property" && f.beds !== "any") n++;
  return n;
}

const KIND_WORDS: Record<Kind, string> = {
  rooms: "room rooms rent rental flat flats apartment bhk studio kotha kotha bhada कोठा भाडा फ्ल्याट",
  land: "land plot plots sale buy aana ropani jagga जग्गा आना रोपनी बिक्री",
  property: "property house home apartment shop office building sale buy ghar घर पसल कार्यालय सम्पत्ति बिक्री",
};
/** Plain keyword search over the demo listings (EN + NE). */
export function searchListings(q: string, limit = 3): Listing[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const terms = query.split(/\s+/);
  const hay = (l: Listing) => {
    const tt = listingTitle(l);
    const type = l.roomType ? ROOM_TYPES.find((x) => x.slug === l.roomType)?.name : l.landType ? LAND_TYPES.find((x) => x.slug === l.landType)?.name : PROP_TYPES.find((x) => x.slug === l.propType)?.name;
    const fur = l.furnishing ? FURNISHINGS.find((x) => x.slug === l.furnishing)?.name : undefined;
    return `${tt.en} ${tt.ne ?? ""} ${l.locality.en} ${l.locality.ne ?? ""} ${DISTRICT_NAME[l.district].en} ${DISTRICT_NAME[l.district].ne ?? ""} ${type?.en ?? ""} ${type?.ne ?? ""} ${fur?.en ?? ""} ${fur?.ne ?? ""} ${KIND_WORDS[l.kind]}`.toLowerCase();
  };
  return LISTINGS.filter((l) => { const h = hay(l); return terms.every((x) => h.includes(x)); }).slice(0, limit);
}
