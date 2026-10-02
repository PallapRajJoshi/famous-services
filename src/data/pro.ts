import type { L } from "@/lib/i18n";

/** MOCK DATA for the professional portal demo. All figures are samples. */
export type ProJob = { id: string; serviceSlug: string; district: "kathmandu" | "lalitpur" | "bhaktapur"; area: string; dayOffset: number; slotId: string; payout: number; note: L; km: number };

export const PRO_PERSONA = { name: "Ramesh T.", role: { en: "Plumber (demo profile)", ne: "प्लम्बर (डेमो प्रोफाइल)" } as L, hue: 215, phone: "98XXXXXXXX" };

const l = (en: string, ne: string): L => ({ en, ne });
export const PRO_JOBS: ProJob[] = [
  { id: "J-1001", serviceSlug: "pipe-leakage-repair", district: "kathmandu", area: "Baneshwor", dayOffset: 1, slotId: "10-12", payout: 700, km: 3.2, note: l("Kitchen sink pipe dripping.", "भान्साको सिंकको पाइप चुहिँदै छ।") },
  { id: "J-1002", serviceSlug: "tap-faucet-repair", district: "lalitpur", area: "Pulchowk", dayOffset: 1, slotId: "14-16", payout: 450, km: 5.8, note: l("Bathroom tap loose.", "बाथरुमको धारा खुकुलो छ।") },
  { id: "J-1003", serviceSlug: "drain-unblocking", district: "kathmandu", area: "Chabahil", dayOffset: 2, slotId: "08-10", payout: 1000, km: 6.4, note: l("Floor drain blocked, slow draining.", "भुइँको ढल जाम, पानी ढिलो जान्छ।") },
  { id: "J-1004", serviceSlug: "toilet-flush-repair", district: "kathmandu", area: "Lazimpat", dayOffset: 3, slotId: "12-14", payout: 780, km: 2.1, note: l("Cistern keeps running.", "सिस्टर्न चलिरहन्छ।") },
  { id: "J-1005", serviceSlug: "bathroom-fittings", district: "lalitpur", area: "Jawalakhel", dayOffset: 4, slotId: "10-12", payout: 1300, km: 4.7, note: l("Install new shower mixer.", "नयाँ सावर मिक्सर जडान।") },
  { id: "J-1006", serviceSlug: "water-pump-tank-fitting", district: "bhaktapur", area: "Suryabinayak", dayOffset: 5, slotId: "16-18", payout: 1500, km: 11.9, note: l("Float valve replacement.", "फ्लोट भल्भ फेर्ने।") },
];

export const SAMPLE_WEEK = [1800, 0, 2400, 1200, 3100, 900, 0];
export const WEEK_DAYS = { en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], ne: ["सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि", "आइत"] };

export const PRO_VERIFY: { title: L; note: L; status: "approved" | "review" | "pending" }[] = [
  { title: l("Identity document", "परिचय कागजात"), note: l("Citizenship or ID uploaded.", "नागरिकता वा परिचयपत्र अपलोड गरिएको।"), status: "approved" },
  { title: l("Address & reference", "ठेगाना र सिफारिस"), note: l("Reference contact being checked.", "सिफारिस सम्पर्क जाँच हुँदैछ।"), status: "review" },
  { title: l("Skills & certificates", "सीप र प्रमाणपत्र"), note: l("Waiting for your certificate upload.", "तपाईंको प्रमाणपत्र अपलोड पर्खिँदै।"), status: "pending" },
  { title: l("Final approval", "अन्तिम स्वीकृति"), note: l("Happens after all checks above.", "माथिका सबै जाँचपछि हुन्छ।"), status: "pending" },
];
