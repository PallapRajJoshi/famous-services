import { SERVICES, CATEGORIES, categoryBySlug, type Service } from "@/data/catalog";
import type { Lang } from "./i18n";

export const pick = <T extends { en: string; ne?: string }>(x: T, lang: Lang) => (lang === "ne" && x.ne ? x.ne : x.en);

/** Simple client-side search over service and category names (EN + NE) and descriptions. */
export function searchServices(q: string, lang: Lang, limit = 8): { services: Service[]; categories: typeof CATEGORIES } {
  const query = q.trim().toLowerCase();
  if (!query) return { services: [], categories: [] };
  const terms = query.split(/\s+/);
  const scored = SERVICES.map((s) => {
    const cat = categoryBySlug(s.category);
    const hay = `${s.name.en} ${s.name.ne ?? ""} ${s.short.en} ${s.short.ne ?? ""} ${cat?.name.en ?? ""} ${cat?.name.ne ?? ""}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (s.name.en.toLowerCase().includes(t) || (s.name.ne ?? "").includes(t)) score += 3;
      else if (hay.includes(t)) score += 1;
      else return { s, score: 0 };
    }
    if (s.popular) score += 0.5;
    return { s, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  const categories = CATEGORIES.filter((c) => terms.every((t) => `${c.name.en} ${c.name.ne ?? ""}`.toLowerCase().includes(t))).slice(0, 4);
  return { services: scored.slice(0, limit).map((x) => x.s), categories };
}

export const SEARCH_SUGGESTIONS = [
  { en: "Plumbing", ne: "प्लम्बिङ", q: "plumb", href: "/services/plumbing" },
  { en: "Electrical", ne: "इलेक्ट्रिकल", q: "electric", href: "/services/electrical" },
  { en: "Home Cleaning", ne: "घर सफाइ", q: "home cleaning", href: "/services/cleaning" },
  { en: "Appliance Repair", ne: "उपकरण मर्मत", q: "appliance", href: "/services/appliance-repair" },
  { en: "AC Service", ne: "एसी सर्भिस", q: "ac", href: "/services/appliance-repair/ac-servicing" },
  { en: "Pest Control", ne: "कीरा नियन्त्रण", q: "pest", href: "/services/pest-control" },
  { en: "Movers", ne: "मुभर्स", q: "mover", href: "/services/movers" },
  { en: "Room for rent", ne: "भाडामा कोठा", q: "room", href: "/rentals/rooms" },
  { en: "Land for sale", ne: "बिक्रीमा जग्गा", q: "land", href: "/rentals/land" },
];
