import type { L } from "@/lib/i18n";

/**
 * MOCK DATA — Famous Services frontend prototype.
 * Every price below is a SAMPLE for layout purposes, not a business quote.
 * To go live: replace this file (or fetch the same shapes from your backend) — components only read these types.
 */

export type CategorySlug =
  | "plumbing" | "electrical" | "carpentry" | "painting" | "appliance-repair" | "waterproofing" | "handyman"
  | "cleaning" | "pest-control" | "movers" | "home-setup" | "beauty" | "drivers" | "home-organization" | "office-business";

export type PricingModel = "fixed" | "hourly" | "inspection" | "quote";
export type Badge = "popular" | "sameday" | "inspection" | "new" | "business";

export type Sub = { slug: string; name: L };
export type Category = {
  slug: CategorySlug;
  group: GroupSlug;
  name: L;
  tagline: L;
  description: L;
  subs: Sub[];
  related: CategorySlug[];
};

export type GroupSlug = "home-repair" | "cleaning" | "beauty" | "drivers" | "movers" | "lifestyle" | "pest" | "setup" | "commercial";
export const GROUPS: { slug: GroupSlug; name: L; blurb: L }[] = [
  { slug: "home-repair", name: { en: "Home Repair & Maintenance", ne: "घर मर्मत तथा सम्भार" }, blurb: { en: "Plumbing, electrical, carpentry, painting and more.", ne: "प्लम्बिङ, इलेक्ट्रिकल, काठको काम, रङरोगन र अरू।" } },
  { slug: "cleaning", name: { en: "Cleaning", ne: "सरसफाइ" }, blurb: { en: "Home, kitchen, bathroom, sofa, mattress and tank cleaning.", ne: "घर, भान्सा, बाथरुम, सोफा, ब्याडिङ र ट्यांकी सफाइ।" } },
  { slug: "beauty", name: { en: "Beauty & Personal Care", ne: "सौन्दर्य तथा व्यक्तिगत हेरचाह" }, blurb: { en: "Beauty, grooming and wellness at home.", ne: "घरमै सौन्दर्य, ग्रुमिङ र वेलनेस।" } },
  { slug: "drivers", name: { en: "Drivers & Transportation", ne: "चालक तथा यातायात" }, blurb: { en: "Daily, airport, outstation and corporate drivers.", ne: "दैनिक, एयरपोर्ट, बाहिरी यात्रा र कर्पोरेट चालक।" } },
  { slug: "movers", name: { en: "Movers & Relocation", ne: "सामान सार्ने तथा स्थानान्तरण" }, blurb: { en: "Household and office moving, packing and loading.", ne: "घर र कार्यालय सार्ने, प्याकिङ र लोडिङ।" } },
  { slug: "lifestyle", name: { en: "Home Organization & Lifestyle", ne: "घर व्यवस्थापन तथा जीवनशैली" }, blurb: { en: "Organization, laundry, gardening and property care.", ne: "व्यवस्थापन, लुगा धुने, बगैँचा र सम्पत्ति हेरचाह।" } },
  { slug: "pest", name: { en: "Pest Control", ne: "कीरा नियन्त्रण" }, blurb: { en: "General, cockroach, termite, mosquito, rodent and bedbug treatment.", ne: "सामान्य, काँक्राकीरा, धमिरा, लामखुट्टे, मुसा र खटमल उपचार।" } },
  { slug: "setup", name: { en: "Home Setup & Installation", ne: "घर सेटअप तथा जडान" }, blurb: { en: "Furniture, TV, appliance, curtain and smart-home setup.", ne: "फर्निचर, टिभी, उपकरण, पर्दा र स्मार्ट-होम जडान।" } },
  { slug: "commercial", name: { en: "Office & Commercial", ne: "कार्यालय तथा व्यावसायिक" }, blurb: { en: "Cleaning, maintenance and facility support for businesses.", ne: "व्यवसायका लागि सरसफाइ, मर्मत र सुविधा व्यवस्थापन।" } },
];

const s = (slug: string, en: string, ne: string): Sub => ({ slug, name: { en, ne } });

export const CATEGORIES: Category[] = [
  { slug: "plumbing", group: "home-repair", name: { en: "Plumbing", ne: "प्लम्बिङ" }, tagline: { en: "Leaks, taps, drains and fittings fixed properly.", ne: "चुहिने, धारा, ढल र फिटिङ्स ठीकसँग मर्मत।" }, description: { en: "Book a plumber for leaking pipes, dripping taps, blocked drains, toilet repairs and bathroom fittings. Sample pricing shown — final quote is confirmed before work starts.", ne: "पाइप चुहिने, धारा, ढल जाम, शौचालय मर्मत र बाथरुम फिटिङ्सका लागि प्लम्बर बुक गर्नुहोस्। देखाइएको मूल्य नमुना हो — काम सुरु हुनु अघि अन्तिम मूल्य पुष्टि हुन्छ।" }, subs: [s("leaks", "Leaks & pipes", "चुहिने र पाइप"), s("taps", "Taps & fittings", "धारा र फिटिङ्स"), s("drains", "Drains & toilets", "ढल र शौचालय"), s("pumps", "Pumps & tanks", "पम्प र ट्यांकी")], related: ["waterproofing", "handyman", "cleaning"] },
  { slug: "electrical", group: "home-repair", name: { en: "Electrical", ne: "इलेक्ट्रिकल" }, tagline: { en: "Safe wiring, fans, lights and fault finding.", ne: "सुरक्षित वायरिङ, पंखा, बत्ती र खराबी पत्ता लगाउने।" }, description: { en: "Electricians for troubleshooting, fan and light installation, switches, sockets and distribution-board work.", ne: "खराबी पत्ता लगाउने, पंखा र बत्ती जडान, स्विच, सकेट र डिबी बोर्डका लागि इलेक्ट्रिसियन।" }, subs: [s("repair", "Repairs", "मर्मत"), s("install", "Installation", "जडान"), s("inspection", "Inspection", "निरीक्षण")], related: ["home-setup", "handyman", "appliance-repair"] },
  { slug: "carpentry", group: "home-repair", name: { en: "Carpentry", ne: "काठको काम" }, tagline: { en: "Doors, windows, furniture and cabinets.", ne: "ढोका, झ्याल, फर्निचर र दराज।" }, description: { en: "Carpenters for door and lock repair, furniture fixes, windows and made-to-measure cabinets.", ne: "ढोका र ताल्चा मर्मत, फर्निचर, झ्याल र नापअनुसारको दराजका लागि सिकर्मी।" }, subs: [s("repair", "Repairs", "मर्मत"), s("custom", "Custom work", "अर्डर अनुसार")], related: ["painting", "home-setup", "handyman"] },
  { slug: "painting", group: "home-repair", name: { en: "Painting", ne: "रङरोगन" }, tagline: { en: "Fresh walls, clean finish, tidy workers.", ne: "नयाँ भित्ता, सफा फिनिस, व्यवस्थित काम।" }, description: { en: "Interior, exterior and touch-up painting. Painting is quoted after a site visit based on area and surface condition.", ne: "भित्री, बाहिरी र टचअप रङरोगन। क्षेत्रफल र सतहको अवस्था हेरेर साइट भ्रमणपछि मूल्य दिइन्छ।" }, subs: [s("interior", "Interior", "भित्री"), s("exterior", "Exterior", "बाहिरी"), s("polish", "Wood & metal", "काठ र फलाम")], related: ["waterproofing", "carpentry", "cleaning"] },
  { slug: "appliance-repair", group: "home-repair", name: { en: "Appliance Repair", ne: "उपकरण मर्मत" }, tagline: { en: "Washing machines, fridges, ACs and more.", ne: "वासिङ मेसिन, फ्रिज, एसी र अरू।" }, description: { en: "Technicians for home appliance servicing and repair. Most repairs need an inspection first, then a clear quote.", ne: "घरेलु उपकरणको सर्भिसिङ र मर्मतका लागि प्राविधिक। धेरैजसो मर्मतमा पहिले निरीक्षण, अनि स्पष्ट मूल्य।" }, subs: [s("ac", "AC", "एसी"), s("laundry", "Washing machine", "वासिङ मेसिन"), s("kitchen", "Kitchen appliances", "भान्सा उपकरण")], related: ["electrical", "home-setup", "handyman"] },
  { slug: "waterproofing", group: "home-repair", name: { en: "Waterproofing", ne: "वाटरप्रुफिङ" }, tagline: { en: "Stop leaks and damp before monsoon.", ne: "वर्षायाम अगावै चुहिने र चिस्यान रोक्नुहोस्।" }, description: { en: "Roof, bathroom and wall waterproofing. Always quoted after inspection because every surface is different.", ne: "छानो, बाथरुम र भित्ताको वाटरप्रुफिङ। हरेक सतह फरक भएकाले निरीक्षणपछि मात्र मूल्य।" }, subs: [s("roof", "Roof & terrace", "छानो र टेरेस"), s("wet", "Bathroom & tank", "बाथरुम र ट्यांकी"), s("walls", "Walls & damp", "भित्ता र चिस्यान")], related: ["painting", "plumbing", "handyman"] },
  { slug: "handyman", group: "home-repair", name: { en: "Handyman", ne: "ह्यान्डीम्यान" }, tagline: { en: "Small jobs done in one visit.", ne: "साना काम एकै भ्रमणमा।" }, description: { en: "One skilled person for the small jobs around the house — pay by the hour or bundle a few fixes.", ne: "घरका साना कामका लागि एक दक्ष व्यक्ति — घण्टाको हिसाबले वा केही काम एकैसाथ।" }, subs: [s("hourly", "By the hour", "घण्टाको हिसाबले"), s("bundle", "Bundles", "प्याकेज")], related: ["carpentry", "home-setup", "electrical"] },
  { slug: "cleaning", group: "cleaning", name: { en: "Cleaning", ne: "सरसफाइ" }, tagline: { en: "A cleaner home, without the hassle.", ne: "झन्झट बिनाको सफा घर।" }, description: { en: "From regular home cleaning to deep cleans, kitchens, bathrooms, sofas, mattresses and water tanks.", ne: "नियमित सफाइदेखि डिप क्लिनिङ, भान्सा, बाथरुम, सोफा, ब्याडिङ र पानी ट्यांकीसम्म।" }, subs: [s("home-cleaning", "Home Cleaning", "घर सफाइ"), s("deep-cleaning", "Deep Cleaning", "डिप क्लिनिङ"), s("bathroom-cleaning", "Bathroom", "बाथरुम"), s("kitchen-cleaning", "Kitchen", "भान्सा"), s("sofa-cleaning", "Sofa", "सोफा"), s("mattress-cleaning", "Mattress", "ब्याडिङ"), s("water-tank-cleaning", "Water Tank", "पानी ट्यांकी")], related: ["pest-control", "home-organization", "movers"] },
  { slug: "pest-control", group: "pest", name: { en: "Pest Control", ne: "कीरा नियन्त्रण" }, tagline: { en: "Targeted treatment for every pest.", ne: "हरेक कीराका लागि लक्षित उपचार।" }, description: { en: "General pest control and targeted treatments. Safety information and re-entry time are shared before every treatment.", ne: "सामान्य कीरा नियन्त्रण र लक्षित उपचार। हरेक उपचारअघि सुरक्षा जानकारी र पुनः प्रवेश समय बताइन्छ।" }, subs: [s("general", "General", "सामान्य"), s("cockroach", "Cockroach", "काँक्राकीरा"), s("termite", "Termite", "धमिरा"), s("mosquito", "Mosquito", "लामखुट्टे"), s("rodent", "Rodent", "मुसा"), s("bedbug", "Bedbug", "खटमल")], related: ["cleaning", "home-organization", "waterproofing"] },
  { slug: "movers", group: "movers", name: { en: "Movers", ne: "मुभर्स" }, tagline: { en: "Careful moving, packing and shifting.", ne: "सावधानीपूर्वक सार्ने, प्याकिङ र सिफ्टिङ।" }, description: { en: "Household and office moving, furniture shifting, packing and loading help. Moves are quoted by volume, floors and distance.", ne: "घर र कार्यालय सार्ने, फर्निचर सिफ्टिङ, प्याकिङ र लोडिङ सहयोग। मूल्य सामानको मात्रा, तला र दूरी हेरेर।" }, subs: [s("household", "Household moving", "घर सार्ने"), s("office", "Office moving", "कार्यालय सार्ने"), s("furniture", "Furniture shifting", "फर्निचर सिफ्टिङ"), s("packing", "Packing & unpacking", "प्याकिङ"), s("loading", "Loading & unloading", "लोडिङ")], related: ["cleaning", "home-setup", "home-organization"] },
  { slug: "home-setup", group: "setup", name: { en: "Home Setup", ne: "घर सेटअप" }, tagline: { en: "Installed neatly, the first time.", ne: "पहिलो पटकमै सफासँग जडान।" }, description: { en: "Furniture assembly, TV mounting, appliance, curtain, water-purifier and smart-home installation.", ne: "फर्निचर जोड्ने, टिभी माउन्टिङ, उपकरण, पर्दा, वाटर प्युरिफायर र स्मार्ट-होम जडान।" }, subs: [s("furniture", "Furniture", "फर्निचर"), s("tv", "TV mounting", "टिभी माउन्टिङ"), s("appliance", "Appliances", "उपकरण"), s("curtain", "Curtains", "पर्दा"), s("purifier", "Water purifier", "वाटर प्युरिफायर"), s("smart", "Smart home", "स्मार्ट होम")], related: ["electrical", "carpentry", "handyman"] },
  { slug: "beauty", group: "beauty", name: { en: "Beauty at Home", ne: "घरमै सौन्दर्य" }, tagline: { en: "Salon-style care at your doorstep.", ne: "तपाईंको ढोकामै सैलुन-स्तरको सेवा।" }, description: { en: "Beauty, grooming and wellness appointments at home. Professionals are introduced and verified before assignment.", ne: "घरमै सौन्दर्य, ग्रुमिङ र वेलनेस सेवा। खटाउनु अघि प्रोफेसनललाई परिचय र प्रमाणीकरण गरिन्छ।" }, subs: [s("womens", "Women's Beauty", "महिला सौन्दर्य"), s("mens", "Men's Grooming", "पुरुष ग्रुमिङ"), s("massage", "Massage & Wellness", "मसाज तथा वेलनेस")], related: ["cleaning", "home-organization", "drivers"] },
  { slug: "drivers", group: "drivers", name: { en: "Drivers", ne: "चालक" }, tagline: { en: "Professional drivers when you need them.", ne: "आवश्यक पर्दा पेशेवर चालक।" }, description: { en: "Daily, airport, outstation and corporate drivers. Most driver bookings are quoted based on hours and distance.", ne: "दैनिक, एयरपोर्ट, बाहिरी यात्रा र कर्पोरेट चालक। धेरैजसो चालक बुकिङमा घण्टा र दूरी हेरेर मूल्य।" }, subs: [s("daily", "Daily Drivers", "दैनिक चालक"), s("airport", "Airport Pickup/Drop", "एयरपोर्ट पिकअप/ड्रप"), s("outstation", "Outstation", "बाहिरी यात्रा"), s("corporate", "Corporate", "कर्पोरेट")], related: ["movers", "beauty", "office-business"] },
  { slug: "home-organization", group: "lifestyle", name: { en: "Home Organization", ne: "घर व्यवस्थापन" }, tagline: { en: "Order, laundry, garden and property care.", ne: "व्यवस्था, लुगा धुने, बगैँचा र सम्पत्ति हेरचाह।" }, description: { en: "Organization, laundry, gardening and property care for busy households and owners who live away.", ne: "व्यस्त परिवार र टाढा बस्ने घरधनीका लागि व्यवस्थापन, लुगा धुने, बगैँचा र सम्पत्ति हेरचाह।" }, subs: [s("organization", "Home Organization", "घर व्यवस्थापन"), s("laundry", "Laundry", "लुगा धुने"), s("gardening", "Gardening", "बगैँचा"), s("property-care", "Property Care", "सम्पत्ति हेरचाह")], related: ["cleaning", "movers", "pest-control"] },
  { slug: "office-business", group: "commercial", name: { en: "Office & Business", ne: "कार्यालय तथा व्यवसाय" }, tagline: { en: "Facility and maintenance support for businesses.", ne: "व्यवसायका लागि सुविधा तथा मर्मत सहयोग।" }, description: { en: "Office cleaning, maintenance, commercial electrical, plumbing and painting, and facility support. Business work is quoted — request a quote.", ne: "कार्यालय सफाइ, मर्मत, व्यावसायिक इलेक्ट्रिकल, प्लम्बिङ र रङरोगन, तथा सुविधा सहयोग। व्यावसायिक कामको मूल्य कोटेसनबाट।" }, subs: [s("cleaning", "Office Cleaning", "कार्यालय सफाइ"), s("maintenance", "Maintenance", "मर्मत"), s("electrical", "Commercial Electrical", "व्यावसायिक इलेक्ट्रिकल"), s("plumbing", "Commercial Plumbing", "व्यावसायिक प्लम्बिङ"), s("painting", "Commercial Painting", "व्यावसायिक रङरोगन"), s("facility", "Facility Maintenance", "सुविधा व्यवस्थापन")], related: ["cleaning", "movers", "drivers"] },
];

/** Order shown in the category strip (matches the design brief). */
export const STRIP_ORDER: CategorySlug[] = ["plumbing", "electrical", "carpentry", "painting", "appliance-repair", "waterproofing", "handyman", "cleaning", "pest-control", "movers", "home-setup", "beauty", "drivers", "home-organization", "office-business"];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

/* ───────────────────────── Services ───────────────────────── */

export type AddOn = { id: string; name: L; price: number };
export type Service = {
  slug: string;
  category: CategorySlug;
  sub?: string;
  name: L;
  short: L;
  model: PricingModel;
  /** NPR. `null` for quote/inspection services. SAMPLE value. */
  price: number | null;
  unit?: L;
  /** Visit/inspection fee in NPR for inspection-based services (SAMPLE, adjustable against the job). */
  visitFee?: number;
  durationMin: number;
  durationMax: number;
  sameDay: boolean;
  popular?: boolean;
  isNew?: boolean;
  business?: boolean;
};

const DEV = "०१२३४५६७८९";
export const nepDigits = (v: string | number) => String(v).replace(/\d/g, (d) => DEV[Number(d)]);

export function durationLabel(min: number, max: number): L {
  const fmt = (m: number) => (m < 60 ? { v: m, u: "min" } : { v: +(m / 60).toFixed(1), u: "hr" });
  const a = fmt(min), b = fmt(max);
  const enU = (x: { v: number; u: string }, plural: boolean) => (x.u === "min" ? "min" : plural && x.v > 1 ? "hrs" : "hr");
  const neU = (x: { u: string }) => (x.u === "min" ? "मिनेट" : "घण्टा");
  if (min === max) return { en: `${a.v} ${enU(a, true)}`, ne: `${nepDigits(a.v)} ${neU(a)}` };
  if (a.u === b.u) return { en: `${a.v}–${b.v} ${enU(b, true)}`, ne: `${nepDigits(a.v)}–${nepDigits(b.v)} ${neU(b)}` };
  return { en: `${a.v} ${enU(a, false)}–${b.v} ${enU(b, true)}`, ne: `${nepDigits(a.v)} ${neU(a)}–${nepDigits(b.v)} ${neU(b)}` };
}

type Row = [slug: string, cat: CategorySlug, sub: string | undefined, en: string, ne: string, shortEn: string, shortNe: string, model: PricingModel, price: number | null, dur: [number, number], flags?: string, unit?: [string, string], visit?: number];

// flags: p = popular, s = same-day request, n = new, b = business
const ROWS: Row[] = [
  // Plumbing
  ["pipe-leakage-repair", "plumbing", "leaks", "Pipe Leakage Repair", "पाइप चुहिने मर्मत", "Find and fix leaking pipes and joints.", "चुहिने पाइप र जोर्नी पत्ता लगाएर मर्मत।", "fixed", 800, [60, 120], "ps"],
  ["tap-faucet-repair", "plumbing", "taps", "Tap & Faucet Repair", "धारा तथा ट्याप मर्मत", "Repair or replace dripping and loose taps.", "थोपा चुहिने र खुकुलो धारा मर्मत वा फेर्ने।", "fixed", 500, [45, 60], "ps"],
  ["toilet-flush-repair", "plumbing", "drains", "Toilet & Flush Repair", "शौचालय र फ्लस मर्मत", "Fix running cisterns, weak flush and loose seats.", "फ्लस ट्यांकी, कमजोर फ्लस र खुकुलो सिट मर्मत।", "fixed", 900, [45, 90], "s"],
  ["drain-unblocking", "plumbing", "drains", "Drain Unblocking", "ढल खोल्ने सेवा", "Clear blocked sinks, floor drains and pipes.", "जाम भएको सिंक, भुइँ ढल र पाइप खोल्ने।", "fixed", 1200, [60, 120], "s"],
  ["water-pump-tank-fitting", "plumbing", "pumps", "Water Pump & Tank Fitting", "वाटर पम्प र ट्यांकी जडान", "Install or repair pumps, tanks and float valves.", "पम्प, ट्यांकी र फ्लोट भल्भ जडान वा मर्मत।", "inspection", null, [90, 180], undefined, undefined, 300],
  ["bathroom-fittings", "plumbing", "taps", "Bathroom Fittings Installation", "बाथरुम फिटिङ्स जडान", "Showers, mixers, basins and accessories fitted.", "सावर, मिक्सर, बेसिन र सामानहरू जडान।", "fixed", 1500, [90, 180]],
  // Electrical
  ["electrical-troubleshooting", "electrical", "repair", "Electrical Troubleshooting", "इलेक्ट्रिकल खराबी पत्ता लगाउने", "Trace faults, tripping and power issues safely.", "खराबी, ट्रिप र बिजुली समस्या सुरक्षित रूपमा पत्ता लगाउने।", "fixed", 600, [45, 90], "ps"],
  ["fan-installation", "electrical", "install", "Fan Installation", "पंखा जडान", "Ceiling and wall fan fitting with regulator.", "सिलिङ र वाल फ्यान रेगुलेटरसहित जडान।", "fixed", 700, [45, 75], "ps"],
  ["switch-socket-repair", "electrical", "repair", "Switch & Socket Repair", "स्विच र सकेट मर्मत", "Replace damaged switches, sockets and plates.", "बिग्रिएका स्विच, सकेट र प्लेट फेर्ने।", "fixed", 400, [30, 60], "s"],
  ["light-fixture-installation", "electrical", "install", "Light Fixture Installation", "बत्ती फिटिङ जडान", "Install lights, chandeliers and LED strips.", "बत्ती, झाड्फानुस र एलईडी स्ट्रिप जडान।", "fixed", 500, [30, 90]],
  ["db-mcb-repair", "electrical", "repair", "MCB & DB Box Repair", "एमसीबी र डिबी बक्स मर्मत", "Inspect and repair breakers and distribution boxes.", "ब्रेकर र डिबी बक्स निरीक्षण तथा मर्मत।", "inspection", null, [60, 150], undefined, undefined, 300],
  ["house-wiring-inspection", "electrical", "inspection", "House Wiring Inspection", "घरको वायरिङ निरीक्षण", "Safety check of wiring, earthing and load.", "वायरिङ, अर्थिङ र लोडको सुरक्षा जाँच।", "inspection", null, [60, 120], "n", undefined, 400],
  ["inverter-ups-installation", "electrical", "install", "Inverter & UPS Installation", "इन्भर्टर र यूपीएस जडान", "Fit and test inverter or UPS backup.", "इन्भर्टर वा यूपीएस ब्याकअप जडान र परीक्षण।", "fixed", 1800, [90, 180]],
  // Carpentry
  ["door-lock-repair", "carpentry", "repair", "Door & Lock Repair", "ढोका र ताल्चा मर्मत", "Fix sticking doors, hinges, handles and locks.", "अड्कने ढोका, काँटी, ह्यान्डल र ताल्चा मर्मत।", "fixed", 700, [45, 90], "s"],
  ["furniture-repair", "carpentry", "repair", "Furniture Repair", "फर्निचर मर्मत", "Repair chairs, tables, beds and drawers.", "कुर्सी, टेबल, खाट र दराज मर्मत।", "fixed", 900, [60, 150]],
  ["window-frame-repair", "carpentry", "repair", "Window & Frame Repair", "झ्याल र फ्रेम मर्मत", "Fix window frames, latches and glass fittings.", "झ्यालको फ्रेम, कुण्डी र सिसा फिटिङ मर्मत।", "fixed", 800, [60, 120]],
  ["cabinet-wardrobe-work", "carpentry", "custom", "Cabinet & Wardrobe Work", "दराज र वार्डरोब काम", "Made-to-measure cabinets and wardrobes.", "नापअनुसार दराज र वार्डरोब बनाउने।", "inspection", null, [240, 960], undefined, undefined, 500],
  // Painting
  ["interior-room-painting", "painting", "interior", "Interior Room Painting", "भित्री कोठा रङरोगन", "Full-room painting with surface preparation.", "सतह तयारीसहित पूरा कोठा रङरोगन।", "inspection", null, [480, 1440], "p", undefined, 0],
  ["wall-touch-up", "painting", "interior", "Wall Touch-Up & Patch", "भित्ता टचअप तथा प्याच", "Patch cracks and touch up marks and stains.", "चिरा भर्ने र दाग-धब्बा टचअप।", "fixed", 2500, [120, 300]],
  ["exterior-painting", "painting", "exterior", "Exterior Painting", "बाहिरी रङरोगन", "Weather-ready exterior walls and boundaries.", "मौसम सहने बाहिरी भित्ता र पर्खाल।", "inspection", null, [720, 2880], undefined, undefined, 0],
  ["wood-metal-polish", "painting", "polish", "Wood & Metal Polishing", "काठ र फलाम पालिस", "Polish doors, grills and furniture.", "ढोका, ग्रिल र फर्निचर पालिस।", "inspection", null, [180, 600], undefined, undefined, 0],
  // Appliance repair
  ["ac-servicing", "appliance-repair", "ac", "AC Servicing", "एसी सर्भिसिङ", "Cleaning and performance check for split ACs.", "स्प्लिट एसीको सफाइ र कार्यक्षमता जाँच।", "fixed", 1500, [60, 90], "ps"],
  ["ac-repair-gas", "appliance-repair", "ac", "AC Repair & Gas Refill", "एसी मर्मत र ग्यास", "Diagnose cooling issues and refill gas if needed.", "चिसो नहुने समस्या पत्ता लगाउने र आवश्यक परे ग्यास भर्ने।", "inspection", null, [60, 150], undefined, undefined, 400],
  ["washing-machine-repair", "appliance-repair", "laundry", "Washing Machine Repair", "वासिङ मेसिन मर्मत", "Fix drum, drain, spin and power issues.", "ड्रम, ड्रेन, स्पिन र पावर समस्या मर्मत।", "inspection", null, [60, 150], "s", undefined, 400],
  ["refrigerator-repair", "appliance-repair", "kitchen", "Refrigerator Repair", "फ्रिज मर्मत", "Cooling, noise and leak diagnosis and repair.", "चिसो, आवाज र चुहिने समस्याको निदान र मर्मत।", "inspection", null, [60, 150], undefined, undefined, 400],
  ["microwave-oven-repair", "appliance-repair", "kitchen", "Microwave & Oven Repair", "माइक्रोवेभ तथा ओभन मर्मत", "Repair heating and control faults.", "तातो नहुने र कन्ट्रोल खराबी मर्मत।", "inspection", null, [45, 120], undefined, undefined, 300],
  ["geyser-repair", "appliance-repair", "kitchen", "Geyser Repair & Service", "गिजर मर्मत तथा सर्भिस", "Descale, fix heating elements and thermostats.", "स्केल सफा, हिटिङ एलिमेन्ट र थर्मोस्ट्याट मर्मत।", "fixed", 1200, [60, 120]],
  // Waterproofing
  ["roof-terrace-waterproofing", "waterproofing", "roof", "Roof & Terrace Waterproofing", "छानो र टेरेस वाटरप्रुफिङ", "Stop roof leaks with coatings and sealing.", "कोटिङ र सिलिङले छानो चुहिने रोक्ने।", "inspection", null, [480, 2880], "p", undefined, 0],
  ["bathroom-waterproofing", "waterproofing", "wet", "Bathroom Waterproofing", "बाथरुम वाटरप्रुफिङ", "Seal bathroom floors and walls against seepage.", "बाथरुमको भुइँ र भित्तामा चिस्यान रोक्ने।", "inspection", null, [480, 1440], undefined, undefined, 0],
  ["wall-seepage-damp", "waterproofing", "walls", "Wall Seepage & Damp Treatment", "भित्ता चिस्यान उपचार", "Treat damp patches and peeling paint.", "चिस्यान र रङ उप्किने समस्याको उपचार।", "inspection", null, [240, 960], undefined, undefined, 0],
  ["water-tank-waterproofing", "waterproofing", "wet", "Water Tank Waterproofing", "पानी ट्यांकी वाटरप्रुफिङ", "Seal underground and rooftop water tanks.", "भूमिगत र छानोको पानी ट्यांकी सिल गर्ने।", "inspection", null, [480, 1440], undefined, undefined, 0],
  // Handyman
  ["handyman-hourly", "handyman", "hourly", "Handyman — Per Hour", "ह्यान्डीम्यान — घण्टाको हिसाबले", "A skilled helper for odd jobs, billed hourly.", "साना काममा दक्ष सहयोगी, घण्टाको हिसाबले।", "hourly", 600, [120, 240], "ps", ["per hour", "प्रति घण्टा"]],
  ["small-fixes-bundle", "handyman", "bundle", "Small Fixes Bundle (3 tasks)", "साना मर्मत प्याकेज (३ काम)", "Bundle three small jobs in one visit.", "तीन वटा साना काम एकै भ्रमणमा।", "fixed", 1500, [90, 180]],
  ["doorbell-fixture-fitting", "handyman", "bundle", "Doorbell & Small Fixture Fitting", "डोरबेल र साना सामान जडान", "Doorbells, hooks, shelves and mirrors fitted.", "डोरबेल, हुक, सेल्फ र ऐना जडान।", "fixed", 600, [30, 90]],
  // Cleaning
  ["home-cleaning", "cleaning", "home-cleaning", "Home Cleaning", "घर सफाइ", "Regular cleaning of rooms, floors and surfaces.", "कोठा, भुइँ र सतहहरूको नियमित सफाइ।", "fixed", 2500, [180, 300], "s"],
  ["home-deep-cleaning", "cleaning", "deep-cleaning", "Home Deep Cleaning", "घर डिप क्लिनिङ", "Top-to-bottom deep clean with scrubbing.", "माथिदेखि तलसम्म घोटेर गहिरो सफाइ।", "fixed", 6500, [300, 600], "p"],
  ["bathroom-cleaning", "cleaning", "bathroom-cleaning", "Bathroom Cleaning", "बाथरुम सफाइ", "Descaling, tiles, fittings and sanitaryware.", "स्केल, टायल, फिटिङ र सेनिटरीवेयर सफाइ।", "fixed", 900, [45, 90], "s"],
  ["kitchen-cleaning", "cleaning", "kitchen-cleaning", "Kitchen Deep Cleaning", "भान्सा डिप क्लिनिङ", "Degrease hob, chimney, cabinets and tiles.", "चुल्हो, चिम्नी, दराज र टायलबाट चिल्लो हटाउने।", "fixed", 1800, [120, 240]],
  ["sofa-cleaning", "cleaning", "sofa-cleaning", "Sofa Cleaning", "सोफा सफाइ", "Shampoo and vacuum cleaning for fabric sofas.", "कपडाको सोफाको सम्पु र भ्याकुम सफाइ।", "fixed", 1500, [60, 120], "p"],
  ["mattress-cleaning", "cleaning", "mattress-cleaning", "Mattress Cleaning", "ब्याडिङ सफाइ", "Deep vacuum and stain treatment.", "गहिरो भ्याकुम र दाग उपचार।", "fixed", 1200, [45, 90]],
  ["water-tank-cleaning", "cleaning", "water-tank-cleaning", "Water Tank Cleaning", "पानी ट्यांकी सफाइ", "Drain, scrub and sanitize storage tanks.", "ट्यांकी खाली गरी घोटेर सेनिटाइज।", "fixed", 2000, [90, 180]],
  // Beauty
  ["womens-beauty-home", "beauty", "womens", "Women's Beauty at Home", "घरमै महिला सौन्दर्य सेवा", "Facials, threading, manicure and more at home.", "घरमै फेसियल, थ्रेडिङ, म्यानिक्योर र अरू।", "fixed", 1800, [60, 180], undefined],
  ["mens-grooming-home", "beauty", "mens", "Men's Haircut & Grooming", "पुरुष हेयरकट तथा ग्रुमिङ", "Haircut, shave and grooming at home.", "घरमै हेयरकट, सेभ र ग्रुमिङ।", "fixed", 700, [30, 60]],
  ["massage-wellness-home", "beauty", "massage", "Massage & Wellness", "मसाज तथा वेलनेस", "Relaxing massage by a trained therapist.", "तालिम प्राप्त थेरापिस्टबाट आरामदायी मसाज।", "fixed", 2500, [60, 90]],
  // Drivers
  ["daily-driver", "drivers", "daily", "Daily Driver", "दैनिक चालक", "A driver for your car, daily or monthly.", "तपाईंको गाडीका लागि दैनिक वा मासिक चालक।", "quote", null, [480, 600]],
  ["airport-pickup-drop", "drivers", "airport", "Airport Pickup / Drop", "एयरपोर्ट पिकअप / ड्रप", "Scheduled transfers to and from the airport.", "एयरपोर्टसम्म तथा बाट तोकिएको समयमा ट्रान्सफर।", "fixed", 1200, [45, 90], "s"],
  ["outstation-driver", "drivers", "outstation", "Outstation Driver", "बाहिरी यात्रा चालक", "Experienced drivers for trips outside the Valley.", "उपत्यका बाहिरको यात्राका लागि अनुभवी चालक।", "quote", null, [480, 1440]],
  ["corporate-driver", "drivers", "corporate", "Corporate Driver", "कर्पोरेट चालक", "Chauffeurs for executives and company vehicles.", "कार्यकारी तथा कम्पनी सवारीका लागि चालक।", "quote", null, [480, 600], "b"],
  // Movers
  ["household-moving", "movers", "household", "Household Moving", "घर सार्ने सेवा", "Pack, load, transport and unload your home.", "घरको सामान प्याक, लोड, ढुवानी र अनलोड।", "inspection", null, [240, 720], "p", undefined, 0],
  ["office-moving", "movers", "office", "Office Moving", "कार्यालय सार्ने सेवा", "Planned office relocation with minimal downtime.", "कम समय बन्द हुने गरी योजनाबद्ध कार्यालय स्थानान्तरण।", "quote", null, [360, 1440], "b"],
  ["furniture-shifting", "movers", "furniture", "Furniture Shifting", "फर्निचर सिफ्टिङ", "Move heavy furniture within or between buildings.", "भारी फर्निचर घरभित्र वा भवनबीच सार्ने।", "fixed", 3500, [120, 300]],
  ["packing-unpacking", "movers", "packing", "Packing & Unpacking", "प्याकिङ तथा अनप्याकिङ", "Careful packing with proper materials.", "उपयुक्त सामग्रीसहित सावधानीपूर्वक प्याकिङ।", "fixed", 4500, [180, 480]],
  ["loading-unloading", "movers", "loading", "Loading & Unloading Help", "लोडिङ तथा अनलोडिङ सहयोग", "Trained helpers for loading and unloading.", "लोडिङ र अनलोडिङका लागि तालिम प्राप्त सहयोगी।", "hourly", 800, [120, 240], undefined, ["per helper / hour", "प्रति सहयोगी / घण्टा"]],
  // Home organization
  ["home-organization", "home-organization", "organization", "Home Organization", "घर व्यवस्थापन", "Declutter and organize wardrobes and storage.", "वार्डरोब र भण्डारण व्यवस्थित गर्ने।", "fixed", 3500, [180, 420]],
  ["laundry-service", "home-organization", "laundry", "Laundry Service", "लुगा धुने सेवा", "Wash, dry and fold with doorstep pickup.", "ढोकाबाटै लिएर धुने, सुकाउने र तह लगाउने।", "hourly", 150, [1440, 2880], undefined, ["per kg", "प्रति केजी"]],
  ["gardening", "home-organization", "gardening", "Gardening", "बगैँचा हेरचाह", "Trimming, planting and garden clean-up.", "छाँट्ने, रोप्ने र बगैँचा सफाइ।", "fixed", 1500, [120, 240]],
  ["property-care", "home-organization", "property-care", "Property Care", "सम्पत्ति हेरचाह", "Periodic checks for homes whose owners are away.", "मालिक टाढा रहेका घरको आवधिक निरीक्षण।", "quote", null, [60, 120]],
  // Pest
  ["general-pest-control", "pest-control", "general", "General Pest Control", "सामान्य कीरा नियन्त्रण", "Whole-home treatment for common household pests.", "घरमा देखिने सामान्य कीराका लागि पूरा घर उपचार।", "fixed", 3500, [90, 180], "p"],
  ["cockroach-treatment", "pest-control", "cockroach", "Cockroach Treatment", "काँक्राकीरा उपचार", "Gel and spray treatment for kitchens and drains.", "भान्सा र ढलका लागि जेल र स्प्रे उपचार।", "fixed", 2500, [60, 120], "s"],
  ["termite-treatment", "pest-control", "termite", "Termite Treatment", "धमिरा उपचार", "Inspection and treatment for wood and walls.", "काठ र भित्ताका लागि निरीक्षण तथा उपचार।", "inspection", null, [120, 360], undefined, undefined, 0],
  ["mosquito-control", "pest-control", "mosquito", "Mosquito Control", "लामखुट्टे नियन्त्रण", "Fogging and breeding-site treatment.", "फगिङ र प्रजनन स्थल उपचार।", "fixed", 2000, [60, 120]],
  ["rodent-control", "pest-control", "rodent", "Rodent Control", "मुसा नियन्त्रण", "Inspection, baiting and entry-point sealing advice.", "निरीक्षण, चारो र प्रवेशद्वार बन्द गर्ने सल्लाह।", "fixed", 2500, [60, 120]],
  ["bedbug-treatment", "pest-control", "bedbug", "Bedbug Treatment", "खटमल उपचार", "Targeted treatment for beds and soft furnishings.", "ओछ्यान र नरम फर्निसिङका लागि लक्षित उपचार।", "fixed", 3000, [90, 180]],
  // Home setup
  ["furniture-assembly", "home-setup", "furniture", "Furniture Assembly", "फर्निचर जोड्ने सेवा", "Assemble beds, wardrobes, desks and shelves.", "खाट, वार्डरोब, डेस्क र सेल्फ जोड्ने।", "fixed", 800, [60, 180], "p"],
  ["tv-mounting", "home-setup", "tv", "TV Mounting", "टिभी माउन्टिङ", "Wall-mount your TV neatly with cable tidy.", "केबल मिलाएर टिभी भित्तामा जडान।", "fixed", 1200, [45, 90], "p"],
  ["appliance-installation", "home-setup", "appliance", "Appliance Installation", "उपकरण जडान", "Install washing machines, geysers and more.", "वासिङ मेसिन, गिजर र अरू जडान।", "fixed", 900, [45, 120]],
  ["curtain-installation", "home-setup", "curtain", "Curtain & Blind Installation", "पर्दा तथा ब्लाइन्ड जडान", "Rods, tracks and blinds fitted straight.", "रड, ट्र्याक र ब्लाइन्ड सिधा जडान।", "fixed", 700, [45, 120]],
  ["water-purifier-installation", "home-setup", "purifier", "Water Purifier Installation", "वाटर प्युरिफायर जडान", "Install and test your water purifier.", "वाटर प्युरिफायर जडान र परीक्षण।", "fixed", 800, [45, 90]],
  ["smart-home-setup", "home-setup", "smart", "Smart Home Setup", "स्मार्ट होम सेटअप", "Smart switches, cameras and hubs configured.", "स्मार्ट स्विच, क्यामेरा र हब कन्फिगर।", "inspection", null, [90, 240], "n", undefined, 300],
  // Office & commercial (quote-based)
  ["office-cleaning", "office-business", "cleaning", "Office Cleaning", "कार्यालय सफाइ", "Scheduled cleaning for offices and shops.", "कार्यालय र पसलका लागि तालिकाबद्ध सफाइ।", "quote", null, [120, 480], "b"],
  ["office-maintenance", "office-business", "maintenance", "Office Maintenance", "कार्यालय मर्मत", "General repair and upkeep for workplaces.", "कार्यस्थलका लागि सामान्य मर्मत र सम्भार।", "quote", null, [120, 480], "b"],
  ["commercial-electrical", "office-business", "electrical", "Commercial Electrical", "व्यावसायिक इलेक्ट्रिकल", "Wiring, panels and fault-finding for businesses.", "व्यवसायका लागि वायरिङ, प्यानल र खराबी पत्ता लगाउने।", "quote", null, [120, 480], "b"],
  ["commercial-plumbing", "office-business", "plumbing", "Commercial Plumbing", "व्यावसायिक प्लम्बिङ", "Plumbing repair and maintenance for premises.", "परिसरका लागि प्लम्बिङ मर्मत र सम्भार।", "quote", null, [120, 480], "b"],
  ["commercial-painting", "office-business", "painting", "Commercial Painting", "व्यावसायिक रङरोगन", "Planned painting with minimal disruption.", "कम अवरोधसहित योजनाबद्ध रङरोगन।", "quote", null, [480, 2880], "b"],
  ["facility-maintenance", "office-business", "facility", "Facility Maintenance Contract", "सुविधा मर्मत सम्झौता", "Recurring multi-trade maintenance contracts.", "आवर्ती बहु-प्रकारका मर्मत सम्झौता।", "quote", null, [120, 480], "b"],
];

export const SERVICES: Service[] = ROWS.map(([slug, category, sub, en, ne, sEn, sNe, model, price, [dMin, dMax], flags = "", unit, visit]) => ({
  slug, category, sub,
  name: { en, ne },
  short: { en: sEn, ne: sNe },
  model, price,
  unit: unit ? { en: unit[0], ne: unit[1] } : undefined,
  visitFee: visit,
  durationMin: dMin, durationMax: dMax,
  sameDay: flags.includes("s"),
  popular: flags.includes("p"),
  isNew: flags.includes("n"),
  business: flags.includes("b"),
}));

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const servicesIn = (category: string) => SERVICES.filter((s) => s.category === category);
export const popularServices = () => SERVICES.filter((s) => s.popular);

export function startingPrice(category: CategorySlug): number | null {
  const prices = servicesIn(category).map((s) => s.price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

/* ───────────────────────── Per-category detail templates ───────────────────────── */

export type Detail = {
  included: L[];
  notIncluded: L[];
  addOns: AddOn[];
  prep: L[];
  materials: L;
  faqs: { q: L; a: L }[];
};

const l = (en: string, ne: string): L => ({ en, ne });
const ao = (id: string, en: string, ne: string, price: number): AddOn => ({ id, name: { en, ne }, price });

const COMMON_NOT: L[] = [
  l("Spare parts and materials unless stated", "तोकिएको बाहेक पार्टपुर्जा र सामग्री"),
  l("Work outside the booked scope", "बुक गरिएको दायराभन्दा बाहिरको काम"),
];

const DETAILS: Partial<Record<CategorySlug, Detail>> = {
  plumbing: {
    included: [l("Inspection of the reported problem", "रिपोर्ट गरिएको समस्याको निरीक्षण"), l("Labour for the repair", "मर्मतको श्रम"), l("Basic tools and cleanup", "आधारभूत औजार र सफाइ"), l("Clear explanation before extra work", "थप कामअघि स्पष्ट जानकारी")],
    notIncluded: [...COMMON_NOT, l("Wall or floor breaking and re-tiling", "भित्ता वा भुइँ फोड्ने र टायल फेर्ने")],
    addOns: [ao("extra-tap", "Extra tap or fitting (labour)", "थप धारा वा फिटिङ (श्रम)", 300), ao("pressure-check", "Water pressure check", "पानीको चाप जाँच", 250), ao("silicone", "Silicone sealing", "सिलिकन सिलिङ", 200)],
    prep: [l("Close the main valve if you can", "सम्भव भए मुख्य भल्भ बन्द गर्नुहोस्"), l("Clear space around the work area", "काम गर्ने ठाउँ वरिपरि खाली गर्नुहोस्"), l("Keep a phone reachable", "फोन सम्पर्कमा राख्नुहोस्")],
    materials: l("Parts are quoted separately. The professional shows the part and price first; nothing is replaced without your approval.", "पार्टपुर्जा छुट्टै मूल्यमा। प्रोफेसनलले पहिले पार्ट र मूल्य देखाउँछन्; तपाईंको स्वीकृति बिना केही फेरिँदैन।"),
    faqs: [
      { q: l("Do I need to buy parts myself?", "के मैले आफैं पार्ट किन्नुपर्छ?"), a: l("No. The professional can bring common parts and quote them before fitting. You may also provide your own.", "पर्दैन। प्रोफेसनलले सामान्य पार्ट ल्याएर जडानअघि मूल्य बताउन सक्छन्। तपाईं आफ्नै पार्ट पनि दिन सक्नुहुन्छ।") },
      { q: l("What if the problem is bigger than expected?", "समस्या अपेक्षाभन्दा ठूलो भए के हुन्छ?"), a: l("You get a revised quote first. Work continues only after you approve it.", "पहिले संशोधित मूल्य दिइन्छ। स्वीकृतिपछि मात्र काम अघि बढ्छ।") },
    ],
  },
  electrical: {
    included: [l("Safe isolation and testing", "सुरक्षित आइसोलेसन र परीक्षण"), l("Labour for the job", "कामको श्रम"), l("Basic tools and cleanup", "आधारभूत औजार र सफाइ"), l("Function check before leaving", "जानुअघि कार्य जाँच")],
    notIncluded: [...COMMON_NOT, l("Concealed wiring replacement", "भित्र लुकेको वायरिङ फेर्ने")],
    addOns: [ao("regulator", "Fan regulator", "पंखाको रेगुलेटर", 350), ao("extra-point", "Extra light/switch point", "थप बत्ती/स्विच पोइन्ट", 400), ao("earth-test", "Earthing check", "अर्थिङ जाँच", 300)],
    prep: [l("Know where the main switch is", "मुख्य स्विच कहाँ छ भनेर थाहा राख्नुहोस्"), l("Clear access to the work area", "काम गर्ने ठाउँमा पहुँच खुला राख्नुहोस्")],
    materials: l("Switches, fans, wires and fittings are quoted separately and shown before use.", "स्विच, पंखा, तार र फिटिङ छुट्टै मूल्यमा, प्रयोग अघि देखाइन्छ।"),
    faqs: [
      { q: l("Is the power switched off during work?", "काम गर्दा बिजुली बन्द हुन्छ?"), a: l("The professional isolates the circuit being worked on. Part of the home may be without power briefly.", "प्रोफेसनलले काम गरिने सर्किट आइसोलेट गर्छन्। केही समय घरको भाग बिजुली बिना हुन सक्छ।") },
    ],
  },
  cleaning: {
    included: [l("Cleaning equipment and basic supplies", "सफाइका उपकरण र आधारभूत सामग्री"), l("Trained cleaners", "तालिम प्राप्त सफाइकर्मी"), l("Waste bagged for disposal", "फोहोर झोलामा प्याक"), l("Walkthrough at the end", "अन्त्यमा जाँच भ्रमण")],
    notIncluded: [l("Moving heavy furniture", "भारी फर्निचर सार्ने"), l("Cleaning inside closed cabinets unless requested", "अनुरोध नगरेसम्म बन्द दराजभित्रको सफाइ"), l("Construction dust removal", "निर्माणको धुलो हटाउने")],
    addOns: [ao("fridge", "Inside refrigerator", "फ्रिजभित्र", 500), ao("windows", "Window cleaning", "झ्याल सफाइ", 600), ao("balcony", "Balcony cleaning", "बार्दली सफाइ", 400)],
    prep: [l("Keep valuables and fragile items aside", "बहुमूल्य र नाजुक सामान अलग राख्नुहोस्"), l("Ensure water and power are available", "पानी र बिजुली उपलब्ध राख्नुहोस्"), l("Tell us about stains or sensitive surfaces", "दाग वा संवेदनशील सतहबारे जानकारी दिनुहोस्")],
    materials: l("Standard cleaning products are included. Special chemicals are only used with your approval.", "सामान्य सफाइ सामग्री समावेश छ। विशेष रसायन तपाईंको स्वीकृतिमा मात्र प्रयोग हुन्छ।"),
    faqs: [
      { q: l("Do cleaners bring their own supplies?", "सफाइकर्मीले आफ्नै सामग्री ल्याउँछन्?"), a: l("Yes — equipment and standard supplies are included.", "ल्याउँछन् — उपकरण र सामान्य सामग्री समावेश छ।") },
      { q: l("How long will it take?", "कति समय लाग्छ?"), a: l("It depends on the size of your home. The estimate on this page is a guide; the team confirms on booking.", "घरको आकारमा निर्भर गर्छ। यहाँको अनुमान मार्गदर्शन मात्र हो; बुकिङमा टोलीले पुष्टि गर्छ।") },
    ],
  },
  "pest-control": {
    included: [l("Inspection of affected areas", "प्रभावित क्षेत्रको निरीक्षण"), l("Treatment with approved products", "स्वीकृत सामग्रीले उपचार"), l("Safety and re-entry guidance", "सुरक्षा र पुनः प्रवेश मार्गदर्शन"), l("Follow-up advice", "फलो-अप सल्लाह")],
    notIncluded: [l("Structural repairs", "संरचनात्मक मर्मत"), l("Cleaning after treatment unless booked", "बुक नगरेसम्म उपचारपछिको सफाइ")],
    addOns: [ao("followup", "Follow-up visit", "फलो-अप भ्रमण", 1200), ao("kitchen-focus", "Kitchen focus treatment", "भान्सा केन्द्रित उपचार", 600)],
    prep: [l("Cover food and utensils", "खाना र भाँडा छोप्नुहोस्"), l("Keep children and pets away during treatment", "उपचारका बेला बालबालिका र पाल्तु जनावर टाढा राख्नुहोस्"), l("Plan to stay out for the advised time", "सल्लाह गरिएको समयसम्म बाहिर बस्ने योजना बनाउनुहोस्")],
    materials: l("Treatment products are included. The product used and safety information are shared before application.", "उपचार सामग्री समावेश छ। प्रयोग हुने सामग्री र सुरक्षा जानकारी लगाउनु अघि दिइन्छ।"),
    faqs: [{ q: l("Is it safe for children and pets?", "के यो बालबालिका र पाल्तु जनावरका लागि सुरक्षित छ?"), a: l("Follow the re-entry time given before treatment. Tell the professional about children, pets or health concerns when booking.", "उपचारअघि दिइएको पुनः प्रवेश समय पालना गर्नुहोस्। बुकिङमा बालबालिका, पाल्तु जनावर वा स्वास्थ्य चिन्ताबारे जानकारी दिनुहोस्।") }],
  },
};

const GENERIC: Detail = {
  included: [l("Qualified professional", "योग्य प्रोफेसनल"), l("Labour for the booked service", "बुक गरिएको सेवाको श्रम"), l("Basic tools", "आधारभूत औजार"), l("Cleanup after the job", "काम पछि सफाइ")],
  notIncluded: COMMON_NOT,
  addOns: [ao("extra-hour", "Extra hour", "थप एक घण्टा", 600), ao("helper", "Additional helper", "थप सहयोगी", 700)],
  prep: [l("Clear access to the work area", "काम गर्ने ठाउँमा पहुँच खुला राख्नुहोस्"), l("Keep a phone reachable", "फोन सम्पर्कमा राख्नुहोस्"), l("Share photos or notes if helpful", "उपयोगी भए फोटो वा नोट पठाउनुहोस्")],
  materials: l("Materials and spare parts, if needed, are quoted separately and used only after your approval.", "आवश्यक परे सामग्री र पार्टपुर्जा छुट्टै मूल्यमा र तपाईंको स्वीकृतिपछि मात्र प्रयोग।"),
  faqs: [
    { q: l("When do I pay?", "भुक्तानी कहिले गर्ने?"), a: l("In this prototype you can choose cash after service, digital payment or a demo card. No real payment is taken.", "यो प्रोटोटाइपमा तपाईं सेवापछि नगद, डिजिटल भुक्तानी वा डेमो कार्ड रोज्न सक्नुहुन्छ। वास्तविक भुक्तानी लिइँदैन।") },
    { q: l("Can I reschedule?", "समय परिवर्तन गर्न सकिन्छ?"), a: l("Yes. Reschedule from your booking page. Free-change timing will be confirmed by the business.", "सकिन्छ। बुकिङ पृष्ठबाट समय परिवर्तन गर्नुहोस्। निःशुल्क परिवर्तनको समय व्यवसायले पुष्टि गर्नेछ।") },
  ],
};

export function detailsFor(category: CategorySlug): Detail {
  const d = DETAILS[category];
  if (!d) return GENERIC;
  return { ...GENERIC, ...d, faqs: [...d.faqs, ...GENERIC.faqs.slice(0, 1)] };
}

/** Display helpers — price text without language-specific formatting (see lib/format.ts). */
export const isQuote = (s: Service) => s.model === "inspection" || s.model === "quote";
