import type { L } from "@/lib/i18n";
import { nepDigits } from "./catalog";

/**
 * MOCK DATA — Rentals & Property section (frontend prototype).
 * Every listing, price, locality and detail below is a SAMPLE for layout purposes. None of these are real
 * properties or real offers. The UI marks every listing "Demo listing". Replace this file (or fetch the same
 * shapes from your backend) when real inventory exists — components only read these types.
 */

export type Kind = "rooms" | "land" | "property";
export type District = "kathmandu" | "lalitpur" | "bhaktapur";
export type RoomType = "single" | "double" | "shared" | "studio" | "flat-1bhk" | "flat-2bhk";
export type Furnishing = "furnished" | "semi" | "unfurnished";
export type LandType = "residential" | "commercial" | "agricultural";
export type PropType = "house" | "apartment" | "commercial" | "office";
export type Facing = "east" | "west" | "north" | "south";
export type Suited = "students" | "professionals" | "family";
export type Facility = "wifi" | "water" | "hotwater" | "parking" | "bikeparking" | "kitchen" | "balcony" | "lift" | "cctv" | "backup" | "laundry" | "power" | "drainage" | "garden" | "terrace";

export const KINDS: { slug: Kind; name: L; short: L; blurb: L; scene: string; verb: L }[] = [
  { slug: "rooms", name: { en: "Rooms for rent", ne: "भाडामा कोठा" }, short: { en: "Rooms", ne: "कोठा" }, blurb: { en: "Single, double, shared, studio and flats — furnished or unfurnished.", ne: "सिंगल, डबल, साझा, स्टुडियो र फ्ल्याट — फर्निस्ड वा अनफर्निस्ड।" }, scene: "room-double", verb: { en: "per month", ne: "प्रति महिना" } },
  { slug: "land", name: { en: "Land for sale", ne: "बिक्रीमा जग्गा" }, short: { en: "Land", ne: "जग्गा" }, blurb: { en: "Residential, commercial and agricultural plots, sized in aana and ropani.", ne: "आवासीय, व्यावसायिक र कृषि जग्गा — आना र रोपनीमा।" }, scene: "land-residential", verb: { en: "total", ne: "जम्मा" } },
  { slug: "property", name: { en: "Property for sale", ne: "बिक्रीमा घर–सम्पत्ति" }, short: { en: "Property", ne: "सम्पत्ति" }, blurb: { en: "Houses, apartments, shops and office space.", ne: "घर, अपार्टमेन्ट, पसल र कार्यालय स्पेस।" }, scene: "prop-house", verb: { en: "total", ne: "जम्मा" } },
];
export const isKind = (v: string): v is Kind => KINDS.some((k) => k.slug === v);
export const kindMeta = (k: Kind) => KINDS.find((x) => x.slug === k)!;

/* ───────── Taxonomies ───────── */
export const ROOM_TYPES: { slug: RoomType; name: L; short: L; desc: L; who: L; scene: string }[] = [
  { slug: "shared", name: { en: "Shared room / bed", ne: "साझा कोठा / बेड" }, short: { en: "Shared", ne: "साझा" }, desc: { en: "A bed in a room you share with others. The lowest-cost option, common for students and new arrivals.", ne: "अरूसँग साझा कोठामा एउटा बेड। सबैभन्दा कम खर्चको विकल्प, विद्यार्थी र नयाँ आउनेहरूका लागि सामान्य।" }, who: { en: "Students · short budgets", ne: "विद्यार्थी · सीमित बजेट" }, scene: "room-shared" },
  { slug: "single", name: { en: "Single room", ne: "सिंगल कोठा" }, short: { en: "Single", ne: "सिंगल" }, desc: { en: "One private room for one person. Bathroom may be attached or shared — each listing says which.", ne: "एक जनाका लागि एउटा निजी कोठा। बाथरुम जोडिएको वा साझा हुन सक्छ — हरेक सूचीमा लेखिएको हुन्छ।" }, who: { en: "Students · working people", ne: "विद्यार्थी · कार्यरत व्यक्ति" }, scene: "room-single" },
  { slug: "double", name: { en: "Double room", ne: "डबल कोठा" }, short: { en: "Double", ne: "डबल" }, desc: { en: "A larger room for two people — a couple, two friends or a parent and child.", ne: "दुई जनाका लागि ठूलो कोठा — दम्पती, साथी वा अभिभावक र बच्चा।" }, who: { en: "Couples · friends · small families", ne: "दम्पती · साथी · सानो परिवार" }, scene: "room-double" },
  { slug: "studio", name: { en: "Studio", ne: "स्टुडियो" }, short: { en: "Studio", ne: "स्टुडियो" }, desc: { en: "Room, small kitchen corner and bathroom in one private unit.", ne: "कोठा, सानो भान्सा कुना र बाथरुम — एउटै निजी एकाइमा।" }, who: { en: "Working people · couples", ne: "कार्यरत व्यक्ति · दम्पती" }, scene: "room-studio" },
  { slug: "flat-1bhk", name: { en: "1 BHK flat", ne: "१ बीएचके फ्ल्याट" }, short: { en: "1 BHK", ne: "१ बीएचके" }, desc: { en: "One bedroom, a hall and a kitchen — a complete private flat.", ne: "एउटा सुत्ने कोठा, हल र भान्सा — पूरा निजी फ्ल्याट।" }, who: { en: "Couples · small families", ne: "दम्पती · सानो परिवार" }, scene: "room-flat" },
  { slug: "flat-2bhk", name: { en: "2 BHK flat", ne: "२ बीएचके फ्ल्याट" }, short: { en: "2 BHK", ne: "२ बीएचके" }, desc: { en: "Two bedrooms, a hall and a kitchen — room for a family or shared by colleagues.", ne: "दुई सुत्ने कोठा, हल र भान्सा — परिवार वा सहकर्मीका लागि पर्याप्त।" }, who: { en: "Families · flat-shares", ne: "परिवार · साझा फ्ल्याट" }, scene: "room-flat2" },
];
export const roomType = (s: RoomType) => ROOM_TYPES.find((r) => r.slug === s)!;

export const FURNISHINGS: { slug: Furnishing; name: L; desc: L; items: L[] }[] = [
  { slug: "furnished", name: { en: "Furnished", ne: "फर्निस्ड" }, desc: { en: "Move in with just your bags. Furniture is already there.", ne: "आफ्नो सामान मात्र लिएर बस्न मिल्छ। फर्निचर पहिल्यै छ।" }, items: [{ en: "Bed with mattress", ne: "गद्दासहित बेड" }, { en: "Wardrobe", ne: "दराज" }, { en: "Table and chair", ne: "टेबल र कुर्सी" }, { en: "Fan or heater as listed", ne: "सूचीअनुसार पंखा वा हिटर" }] },
  { slug: "semi", name: { en: "Semi-furnished", ne: "अर्ध–फर्निस्ड" }, desc: { en: "Basic fittings are in place; you bring the rest.", ne: "आधारभूत सामग्री छ; बाँकी तपाईं ल्याउनुहुन्छ।" }, items: [{ en: "Built-in wardrobe or cabinets", ne: "बिल्ट–इन दराज वा क्याबिनेट" }, { en: "Lights and fans", ne: "बत्ती र पंखा" }, { en: "Geyser / kitchen counter as listed", ne: "सूचीअनुसार ग्यिजर / भान्सा काउन्टर" }] },
  { slug: "unfurnished", name: { en: "Unfurnished", ne: "अनफर्निस्ड" }, desc: { en: "An empty room with power and water connected. Bring your own furniture.", ne: "बिजुली र पानी जोडिएको खाली कोठा। आफ्नै फर्निचर ल्याउनुहोस्।" }, items: [{ en: "Electricity and water connection", ne: "बिजुली र पानीको जडान" }, { en: "Bathroom fittings", ne: "बाथरुम सामग्री" }] },
];
export const furnishing = (s: Furnishing) => FURNISHINGS.find((f) => f.slug === s)!;

export const LAND_TYPES: { slug: LandType; name: L; desc: L; scene: string }[] = [
  { slug: "residential", name: { en: "Residential plot", ne: "आवासीय जग्गा" }, desc: { en: "Land in a residential zone for building a home.", ne: "घर बनाउन आवासीय क्षेत्रको जग्गा।" }, scene: "land-residential" },
  { slug: "commercial", name: { en: "Commercial plot", ne: "व्यावसायिक जग्गा" }, desc: { en: "Road-facing land for shops, offices or mixed use.", ne: "पसल, कार्यालय वा मिश्रित प्रयोगका लागि सडक छुने जग्गा।" }, scene: "land-commercial" },
  { slug: "agricultural", name: { en: "Agricultural land", ne: "कृषि जग्गा" }, desc: { en: "Farm or terrace land. Rules on use and building differ — check before buying.", ne: "खेती वा पाखो जग्गा। प्रयोग र निर्माणका नियम फरक हुन्छन् — किन्नु अघि जाँच्नुहोस्।" }, scene: "land-agri" },
];
export const landType = (s: LandType) => LAND_TYPES.find((r) => r.slug === s)!;

export const PROP_TYPES: { slug: PropType; name: L; desc: L; scene: string }[] = [
  { slug: "house", name: { en: "House", ne: "घर" }, desc: { en: "Independent home with its own land.", ne: "आफ्नै जग्गासहितको स्वतन्त्र घर।" }, scene: "prop-house" },
  { slug: "apartment", name: { en: "Apartment", ne: "अपार्टमेन्ट" }, desc: { en: "A flat in a multi-storey building.", ne: "बहुतले भवनको फ्ल्याट।" }, scene: "prop-apartment" },
  { slug: "commercial", name: { en: "Shop / commercial building", ne: "पसल / व्यावसायिक भवन" }, desc: { en: "Ground-floor shops and buildings for business use.", ne: "व्यवसायका लागि भुइँतले पसल र भवन।" }, scene: "prop-commercial" },
  { slug: "office", name: { en: "Office space", ne: "कार्यालय स्पेस" }, desc: { en: "Floors or units set up for offices.", ne: "कार्यालयका लागि तयार तला वा एकाइ।" }, scene: "prop-office" },
];
export const propType = (s: PropType) => PROP_TYPES.find((r) => r.slug === s)!;

export const DISTRICT_NAME: Record<District, L> = {
  kathmandu: { en: "Kathmandu", ne: "काठमाडौँ" },
  lalitpur: { en: "Lalitpur", ne: "ललितपुर" },
  bhaktapur: { en: "Bhaktapur", ne: "भक्तपुर" },
};

export const FACILITY: Record<Facility, L> = {
  wifi: { en: "Wi-Fi", ne: "वाइफाइ" }, water: { en: "Water supply", ne: "पानी आपूर्ति" }, hotwater: { en: "Hot water", ne: "तातो पानी" },
  parking: { en: "Car parking", ne: "कार पार्किङ" }, bikeparking: { en: "Bike parking", ne: "बाइक पार्किङ" }, kitchen: { en: "Kitchen", ne: "भान्सा" },
  balcony: { en: "Balcony", ne: "बालकनी" }, lift: { en: "Lift", ne: "लिफ्ट" }, cctv: { en: "CCTV", ne: "सीसीटीभी" }, backup: { en: "Power backup", ne: "बिजुली ब्याकअप" },
  laundry: { en: "Laundry space", ne: "लुगा धुने ठाउँ" }, power: { en: "Electricity nearby", ne: "नजिकै बिजुली" }, drainage: { en: "Drainage", ne: "ढल निकास" },
  garden: { en: "Garden", ne: "बगैँचा" }, terrace: { en: "Terrace", ne: "छत" },
};

export const SUITED: Record<Suited, L> = {
  students: { en: "Students", ne: "विद्यार्थी" }, professionals: { en: "Working people", ne: "कार्यरत व्यक्ति" }, family: { en: "Families", ne: "परिवार" },
};

const LOC: Record<string, L> = {
  baneshwor: { en: "Baneshwor", ne: "बानेश्वर" }, koteshwor: { en: "Koteshwor", ne: "कोटेश्वर" }, chabahil: { en: "Chabahil", ne: "चाबहिल" },
  maharajgunj: { en: "Maharajgunj", ne: "महाराजगञ्ज" }, budhanilkantha: { en: "Budhanilkantha", ne: "बुढानीलकण्ठ" }, tokha: { en: "Tokha", ne: "टोखा" }, kalanki: { en: "Kalanki", ne: "कलंकी" },
  kupondol: { en: "Kupondol", ne: "कुपण्डोल" }, jawalakhel: { en: "Jawalakhel", ne: "जावलाखेल" }, imadol: { en: "Imadol", ne: "इमाडोल" }, satdobato: { en: "Satdobato", ne: "सातदोबाटो" }, godawari: { en: "Godawari", ne: "गोदावरी" }, bhaisepati: { en: "Bhaisepati", ne: "भैंसेपाटी" },
  thimi: { en: "Thimi", ne: "ठिमी" }, kausaltar: { en: "Kausaltar", ne: "कौशलटार" }, suryabinayak: { en: "Suryabinayak", ne: "सूर्यविनायक" }, changunarayan: { en: "Changunarayan", ne: "चाँगुनारायण" }, sipadol: { en: "Sipadol", ne: "सिपाडोल" },
};

export type Available = "now" | "15d" | "next-month";
export type Listing = {
  id: string;
  kind: Kind;
  district: District;
  locality: L;
  price: number; // rooms: per month · land/property: total
  negotiable?: boolean;
  featured?: boolean;
  note: L;
  scene: string;
  // rooms
  roomType?: RoomType; furnishing?: Furnishing; bath?: "attached" | "shared"; floor?: number; sizeSqft?: number;
  depositMonths?: number; minStayMonths?: number; available?: Available; suited?: Suited[]; includes?: L[];
  // land
  landType?: LandType; aana?: number; roadFt?: number; facing?: Facing; frontFt?: number;
  // property
  propType?: PropType; beds?: number; baths?: number; storeys?: number; builtSqft?: number; landAana?: number; ageYears?: number; parkingSpots?: number;
  facilities: Facility[];
};

const R = (id: string, d: District, loc: string, o: Omit<Listing, "id" | "kind" | "district" | "locality" | "scene"> & { scene?: string }): Listing => ({
  id, kind: "rooms", district: d, locality: LOC[loc], scene: o.scene ?? roomType(o.roomType!).scene, ...o,
});
const LD = (id: string, d: District, loc: string, o: Omit<Listing, "id" | "kind" | "district" | "locality" | "scene">): Listing => ({
  id, kind: "land", district: d, locality: LOC[loc], scene: landType(o.landType!).scene, ...o,
});
const PR = (id: string, d: District, loc: string, o: Omit<Listing, "id" | "kind" | "district" | "locality" | "scene">): Listing => ({
  id, kind: "property", district: d, locality: LOC[loc], scene: propType(o.propType!).scene, ...o,
});

export const LISTINGS: Listing[] = [
  /* ───── Rooms ───── */
  R("room-koteshwor-shared-bed", "kathmandu", "koteshwor", { roomType: "shared", furnishing: "semi", bath: "shared", floor: 2, sizeSqft: 150, price: 5500, depositMonths: 1, minStayMonths: 3, available: "now", suited: ["students"], facilities: ["wifi", "water", "kitchen"], includes: [{ en: "Bed and a locker", ne: "बेड र लकर" }, { en: "Shared kitchen", ne: "साझा भान्सा" }], note: { en: "A bed in a four-person room, a short walk from the main road.", ne: "चार जनाको कोठामा एउटा बेड, मुख्य सडकबाट छोटो दुरीमा।" } }),
  R("room-baneshwor-single-plain", "kathmandu", "baneshwor", { roomType: "single", furnishing: "unfurnished", bath: "shared", floor: 3, sizeSqft: 110, price: 7500, depositMonths: 2, minStayMonths: 6, available: "15d", suited: ["students", "professionals"], facilities: ["water", "bikeparking"], note: { en: "Bright top-floor room with a window onto the lane. Bring your own bed.", ne: "गल्लीतिर झ्याल भएको उज्यालो माथिल्लो तलाको कोठा। आफ्नै बेड ल्याउनुहोस्।" } }),
  R("room-kupondol-single-furnished", "lalitpur", "kupondol", { roomType: "single", furnishing: "furnished", bath: "attached", floor: 2, sizeSqft: 140, price: 12000, depositMonths: 2, minStayMonths: 6, available: "now", featured: true, suited: ["professionals"], facilities: ["wifi", "hotwater", "water", "balcony"], includes: [{ en: "Bed, mattress, wardrobe", ne: "बेड, गद्दा, दराज" }, { en: "Study table and chair", ne: "पढ्ने टेबल र कुर्सी" }, { en: "Geyser in bathroom", ne: "बाथरुममा ग्यिजर" }], note: { en: "Move-in ready single room with its own bathroom and a small balcony.", ne: "आफ्नै बाथरुम र सानो बालकनीसहित तुरुन्तै बस्न मिल्ने सिंगल कोठा।" } }),
  R("room-thimi-single-semi", "bhaktapur", "thimi", { roomType: "single", furnishing: "semi", bath: "attached", floor: 1, sizeSqft: 130, price: 8000, depositMonths: 2, minStayMonths: 6, available: "next-month", suited: ["students", "professionals"], facilities: ["water", "hotwater", "bikeparking"], includes: [{ en: "Built-in wardrobe", ne: "बिल्ट–इन दराज" }, { en: "Geyser", ne: "ग्यिजर" }], note: { en: "Quiet ground-side room with a built-in wardrobe and attached bathroom.", ne: "बिल्ट–इन दराज र जोडिएको बाथरुम भएको शान्त कोठा।" } }),
  R("room-chabahil-double-plain", "kathmandu", "chabahil", { roomType: "double", furnishing: "unfurnished", bath: "attached", floor: 1, sizeSqft: 180, price: 11000, depositMonths: 2, minStayMonths: 6, available: "now", suited: ["professionals", "family"], facilities: ["water", "hotwater", "bikeparking", "laundry"], note: { en: "Roomy double with attached bathroom and shared laundry space.", ne: "जोडिएको बाथरुम र साझा लुगा धुने ठाउँसहितको फराकिलो डबल कोठा।" } }),
  R("room-jawalakhel-double-furnished", "lalitpur", "jawalakhel", { roomType: "double", furnishing: "furnished", bath: "attached", floor: 3, sizeSqft: 200, price: 17500, depositMonths: 2, minStayMonths: 6, available: "15d", featured: true, suited: ["professionals", "family"], facilities: ["wifi", "hotwater", "water", "balcony", "bikeparking", "cctv"], includes: [{ en: "Double bed, mattress", ne: "डबल बेड, गद्दा" }, { en: "Wardrobe and dressing table", ne: "दराज र ड्रेसिङ टेबल" }, { en: "Two bedside tables", ne: "दुई सिरानी टेबल" }], note: { en: "Fully furnished double room with a balcony and building CCTV.", ne: "बालकनी र भवनमा सीसीटीभीसहितको पूर्ण फर्निस्ड डबल कोठा।" } }),
  R("room-imadol-double-semi", "lalitpur", "imadol", { roomType: "double", furnishing: "semi", bath: "attached", floor: 2, sizeSqft: 190, price: 13000, depositMonths: 2, minStayMonths: 6, available: "now", suited: ["family", "professionals"], facilities: ["water", "hotwater", "parking", "backup"], includes: [{ en: "Wardrobe", ne: "दराज" }, { en: "Geyser", ne: "ग्यिजर" }], note: { en: "Semi-furnished double room on a calm street, with car parking.", ne: "शान्त सडकमा कार पार्किङसहितको अर्ध–फर्निस्ड डबल कोठा।" } }),
  R("room-maharajgunj-studio-furnished", "kathmandu", "maharajgunj", { roomType: "studio", furnishing: "furnished", bath: "attached", floor: 4, sizeSqft: 260, price: 20000, depositMonths: 2, minStayMonths: 6, available: "next-month", suited: ["professionals"], facilities: ["wifi", "kitchen", "hotwater", "lift", "backup", "cctv"], includes: [{ en: "Bed, wardrobe, work desk", ne: "बेड, दराज, कार्य टेबल" }, { en: "Kitchenette with two-burner stove", ne: "दुई बर्नर चुल्होसहितको सानो भान्सा" }], note: { en: "Self-contained studio with kitchenette, in a building with a lift.", ne: "लिफ्ट भएको भवनमा भान्सासहितको आफैँमा पूर्ण स्टुडियो।" } }),
  R("room-kausaltar-studio-semi", "bhaktapur", "kausaltar", { roomType: "studio", furnishing: "semi", bath: "attached", floor: 2, sizeSqft: 240, price: 14500, depositMonths: 2, minStayMonths: 6, available: "now", suited: ["professionals", "family"], facilities: ["water", "kitchen", "hotwater", "bikeparking"], includes: [{ en: "Kitchen counter and sink", ne: "भान्सा काउन्टर र सिङ्क" }, { en: "Built-in wardrobe", ne: "बिल्ट–इन दराज" }], note: { en: "Studio with a fitted kitchen counter; bring a bed and appliances.", ne: "भान्सा काउन्टर जडान भएको स्टुडियो; बेड र उपकरण ल्याउनुहोस्।" } }),
  R("room-baneshwor-1bhk-furnished", "kathmandu", "baneshwor", { roomType: "flat-1bhk", furnishing: "furnished", bath: "attached", floor: 5, sizeSqft: 520, price: 30000, depositMonths: 3, minStayMonths: 12, available: "15d", featured: true, suited: ["professionals", "family"], facilities: ["wifi", "hotwater", "kitchen", "balcony", "lift", "backup", "cctv", "parking"], includes: [{ en: "Bed, wardrobe, sofa set", ne: "बेड, दराज, सोफा सेट" }, { en: "Fridge and washing machine", ne: "फ्रिज र वासिङ मेसिन" }, { en: "Modular kitchen", ne: "मोड्युलर भान्सा" }], note: { en: "Furnished 1 BHK with lift, parking and a sunny balcony.", ne: "लिफ्ट, पार्किङ र घाम लाग्ने बालकनीसहित फर्निस्ड १ बीएचके।" } }),
  R("room-satdobato-1bhk-plain", "lalitpur", "satdobato", { roomType: "flat-1bhk", furnishing: "unfurnished", bath: "attached", floor: 2, sizeSqft: 480, price: 19000, depositMonths: 3, minStayMonths: 12, available: "now", suited: ["family", "professionals"], facilities: ["water", "kitchen", "bikeparking", "balcony"], note: { en: "Unfurnished 1 BHK near the ring road with good light in every room.", ne: "रिङरोड नजिकै हरेक कोठामा राम्रो उज्यालो भएको अनफर्निस्ड १ बीएचके।" } }),
  R("room-budhanilkantha-2bhk-plain", "kathmandu", "budhanilkantha", { roomType: "flat-2bhk", furnishing: "unfurnished", bath: "attached", floor: 2, sizeSqft: 820, price: 32000, depositMonths: 3, minStayMonths: 12, available: "next-month", suited: ["family"], facilities: ["water", "parking", "kitchen", "garden", "backup"], note: { en: "Spacious unfurnished 2 BHK with a shared garden and car parking.", ne: "साझा बगैँचा र कार पार्किङसहितको फराकिलो अनफर्निस्ड २ बीएचके।" } }),
  R("room-bhaisepati-2bhk-furnished", "lalitpur", "bhaisepati", { roomType: "flat-2bhk", furnishing: "furnished", bath: "attached", floor: 3, sizeSqft: 900, price: 48000, depositMonths: 3, minStayMonths: 12, available: "15d", suited: ["family", "professionals"], facilities: ["wifi", "hotwater", "kitchen", "balcony", "lift", "parking", "backup", "cctv"], includes: [{ en: "Beds and wardrobes in both bedrooms", ne: "दुवै कोठामा बेड र दराज" }, { en: "Sofa, dining set, TV unit", ne: "सोफा, डाइनिङ सेट, टिभी युनिट" }, { en: "Fridge, washing machine, geyser", ne: "फ्रिज, वासिङ मेसिन, ग्यिजर" }], note: { en: "Fully furnished 2 BHK in a gated block with lift and backup power.", ne: "लिफ्ट र बिजुली ब्याकअपसहित गेटबन्द ब्लकमा पूर्ण फर्निस्ड २ बीएचके।" } }),

  /* ───── Land ───── */
  LD("land-changunarayan-4-aana", "bhaktapur", "changunarayan", { landType: "residential", aana: 4, price: 7200000, negotiable: true, roadFt: 13, facing: "east", frontFt: 24, facilities: ["power", "water"], note: { en: "Regular-shaped plot on a motorable lane with a clear view to the east.", ne: "मोटर चल्ने गल्लीमा पूर्वतिर खुला दृश्य भएको सुडौल जग्गा।" } }),
  LD("land-godawari-6-aana", "lalitpur", "godawari", { landType: "residential", aana: 6, price: 15000000, featured: true, roadFt: 20, facing: "south", frontFt: 30, facilities: ["power", "water", "drainage"], note: { en: "South-facing plot on a 20 ft road, in a quiet and green neighbourhood.", ne: "शान्त र हरियो छिमेकमा २० फिट सडकमा दक्षिणमुखी जग्गा।" } }),
  LD("land-tokha-8-aana", "kathmandu", "tokha", { landType: "residential", aana: 8, price: 23200000, roadFt: 20, facing: "east", frontFt: 36, facilities: ["power", "water", "drainage"], note: { en: "Large plot suited to one big home or two smaller ones.", ne: "एउटा ठूलो वा दुईवटा सानो घरका लागि उपयुक्त ठूलो जग्गा।" } }),
  LD("land-kalanki-5-aana-commercial", "kathmandu", "kalanki", { landType: "commercial", aana: 5, price: 30000000, negotiable: true, roadFt: 40, facing: "north", frontFt: 28, facilities: ["power", "water", "drainage"], note: { en: "Highway-facing frontage suited to shops or offices.", ne: "पसल वा कार्यालयका लागि उपयुक्त राजमार्ग छुने मोहडा।" } }),
  LD("land-imadol-3-5-aana", "lalitpur", "imadol", { landType: "residential", aana: 3.5, price: 14700000, roadFt: 16, facing: "west", frontFt: 20, facilities: ["power", "water"], note: { en: "Compact plot, good for a single family home close to the main road.", ne: "मुख्य सडक नजिकै एकल परिवारको घरका लागि उपयुक्त सानो जग्गा।" } }),
  LD("land-sipadol-2-ropani", "bhaktapur", "sipadol", { landType: "agricultural", aana: 32, price: 16000000, roadFt: 10, facing: "south", facilities: ["water"], note: { en: "Two ropani of terraced farmland with a seasonal water source.", ne: "मौसमी पानीको स्रोतसहित दुई रोपनी पाखो खेतीयोग्य जग्गा।" } }),

  /* ───── Property ───── */
  PR("prop-budhanilkantha-house", "kathmandu", "budhanilkantha", { propType: "house", beds: 4, baths: 3, storeys: 3, builtSqft: 2400, landAana: 4, ageYears: 6, parkingSpots: 2, price: 42000000, negotiable: true, featured: true, facing: "south", roadFt: 20, facilities: ["parking", "garden", "terrace", "backup", "water"], note: { en: "Family home on its own plot with a garden, terrace and two parking spots.", ne: "बगैँचा, छत र दुई पार्किङसहित आफ्नै जग्गामा परिवारको घर।" } }),
  PR("prop-suryabinayak-house", "bhaktapur", "suryabinayak", { propType: "house", beds: 3, baths: 2, storeys: 3, builtSqft: 1600, landAana: 3, ageYears: 10, parkingSpots: 1, price: 21500000, facing: "east", roadFt: 16, facilities: ["parking", "terrace", "water"], note: { en: "Traditional-style three-storey home with a rooftop terrace.", ne: "छतमा टेरेससहितको परम्परागत शैलीको तीन तले घर।" } }),
  PR("prop-jawalakhel-apartment", "lalitpur", "jawalakhel", { propType: "apartment", beds: 3, baths: 2, builtSqft: 1350, ageYears: 4, parkingSpots: 1, price: 18500000, facing: "south", facilities: ["lift", "parking", "backup", "cctv", "balcony"], note: { en: "Fourth-floor apartment with lift, covered parking and building security.", ne: "लिफ्ट, छाना भएको पार्किङ र भवन सुरक्षासहित चौथो तलाको अपार्टमेन्ट।" } }),
  PR("prop-baneshwor-apartment", "kathmandu", "baneshwor", { propType: "apartment", beds: 2, baths: 2, builtSqft: 950, ageYears: 8, parkingSpots: 1, price: 12800000, negotiable: true, facing: "east", facilities: ["lift", "parking", "backup", "balcony"], note: { en: "Well-kept two-bedroom apartment close to shops and schools.", ne: "पसल र विद्यालय नजिकै राम्रोसँग राखिएको दुई कोठे अपार्टमेन्ट।" } }),
  PR("prop-chabahil-commercial", "kathmandu", "chabahil", { propType: "commercial", storeys: 4, builtSqft: 4800, landAana: 5, ageYears: 12, parkingSpots: 3, price: 52000000, roadFt: 30, facing: "north", facilities: ["parking", "lift", "backup", "water"], note: { en: "Four-storey building with ground-floor shop frontage and upper-floor space.", ne: "भुइँतलामा पसल मोहडा र माथिल्ला तलामा स्पेस भएको चार तले भवन।" } }),
  PR("prop-kupondol-shop", "lalitpur", "kupondol", { propType: "commercial", builtSqft: 420, ageYears: 9, price: 9500000, roadFt: 30, facing: "west", facilities: ["power", "water"], note: { en: "Ground-floor shop space on a busy road with good foot traffic.", ne: "व्यस्त सडकमा राम्रो आवागमन भएको भुइँतले पसल स्पेस।" } }),
  PR("prop-maharajgunj-office", "kathmandu", "maharajgunj", { propType: "office", builtSqft: 1100, storeys: 1, ageYears: 5, parkingSpots: 2, price: 14000000, negotiable: true, facing: "east", facilities: ["lift", "parking", "backup", "wifi", "cctv"], note: { en: "Second-floor office space with lift access and backup power.", ne: "लिफ्ट र बिजुली ब्याकअपसहित दोस्रो तलाको कार्यालय स्पेस।" } }),
];

export const listingById = (id: string) => LISTINGS.find((l) => l.id === id);
export const listingsOf = (kind: Kind) => LISTINGS.filter((l) => l.kind === kind);

/* ───────── helpers ───────── */
export const SQFT_PER_AANA = 342.25;
export const AANA_PER_ROPANI = 16;

/** "2 ropani", "1 ropani 2 aana", "3.5 aana" — plus the sq-ft equivalent. */
export function landSize(aana: number): { ropani: number; aana: number; sqft: number } {
  const ropani = Math.floor(aana / AANA_PER_ROPANI);
  const rest = Math.round((aana - ropani * AANA_PER_ROPANI) * 100) / 100;
  return { ropani, aana: rest, sqft: Math.round(aana * SQFT_PER_AANA) };
}
export const pricePerAana = (l: Listing) => (l.aana ? Math.round(l.price / l.aana) : 0);

export const AVAILABLE: Record<Available, L> = {
  now: { en: "Available now", ne: "अहिले उपलब्ध" },
  "15d": { en: "Within 15 days", ne: "१५ दिनभित्र" },
  "next-month": { en: "From next month", ne: "अर्को महिनादेखि" },
};

const lc = (v: string) => v.replace(/^[A-Z](?![A-Z])/, (c) => c.toLowerCase());
export type TitleParts = { en: string; ne: string };
export function listingTitle(l: Listing): L {
  const loc = l.locality;
  if (l.kind === "rooms") {
    const rt = roomType(l.roomType!).name; const f = furnishing(l.furnishing!).name;
    return { en: `${f.en} ${lc(rt.en)} in ${loc.en}`, ne: `${loc.ne} मा ${f.ne} ${rt.ne}` };
  }
  if (l.kind === "land") {
    const lt = landType(l.landType!).name; const s = landSize(l.aana!);
    const size = s.ropani ? { en: `${s.ropani} ropani${s.aana ? ` ${s.aana} aana` : ""}`, ne: `${nepDigits(s.ropani)} रोपनी${s.aana ? ` ${nepDigits(s.aana)} आना` : ""}` } : { en: `${s.aana} aana`, ne: `${nepDigits(s.aana)} आना` };
    return { en: `${size.en} ${lc(lt.en)}, ${loc.en}`, ne: `${loc.ne}, ${size.ne} ${lt.ne}` };
  }
  const pt = propType(l.propType!).name;
  const extra = l.propType === "house" || l.propType === "apartment" ? { en: `${l.beds}-bedroom `, ne: `${nepDigits(l.beds ?? 0)} कोठे ` } : { en: "", ne: "" };
  return { en: `${extra.en}${lc(pt.en)} in ${loc.en}`.replace(/^./, (c) => c.toUpperCase()), ne: `${loc.ne} मा ${extra.ne}${pt.ne}` };
}

/** What a buyer/renter should verify. Generic guidance, not legal advice. */
export const CHECKLISTS: Record<Kind, { title: L; items: L[] }> = {
  rooms: {
    title: { en: "Before you pay or move in", ne: "भुक्तानी गर्नु वा बस्नु अघि" },
    items: [
      { en: "Visit in person and see the exact room you will get.", ne: "आफैँ गएर आफूले पाउने कोठा हेर्नुहोस्।" },
      { en: "Ask for a written rental agreement with rent, deposit, notice period and house rules.", ne: "भाडा, धरौटी, सूचना अवधि र नियमसहितको लिखित सम्झौता माग्नुहोस्।" },
      { en: "Get a receipt for the deposit and agree how it is returned.", ne: "धरौटीको रसिद लिनुहोस् र फिर्ता कसरी हुने तय गर्नुहोस्।" },
      { en: "Check water supply, damp, wiring and how electricity and water bills are shared.", ne: "पानी आपूर्ति, ओसिलोपन, वायरिङ र बिजुली–पानी बिल कसरी बाँडिने जाँच्नुहोस्।" },
      { en: "Confirm who the owner or caretaker is before handing over money.", ne: "पैसा दिनु अघि घरधनी वा रेखदेख गर्ने व्यक्ति को हो पुष्टि गर्नुहोस्।" },
    ],
  },
  land: {
    title: { en: "Documents and checks for buying land", ne: "जग्गा किन्दा कागजात र जाँच" },
    items: [
      { en: "Lalpurja (ownership certificate): confirm the seller’s name and the plot number match.", ne: "लालपुर्जा: बिक्रेताको नाम र कित्ता नम्बर मिल्छ कि पुष्टि गर्नुहोस्।" },
      { en: "Napi naksa (survey map): compare plot shape and area with what is on the ground.", ne: "नापी नक्सा: जग्गाको आकार र क्षेत्रफल स्थलगत अवस्थासँग तुलना गर्नुहोस्।" },
      { en: "Check the land revenue (malpot) record for dues, mortgage or disputes.", ne: "बाँकी, धितो वा विवाद छ कि मालपोत अभिलेखमा जाँच्नुहोस्।" },
      { en: "Walk the boundary (charkilla) and confirm road access and its width.", ne: "चारकिल्ला हिँडेर हेर्नुहोस् र सडक पहुँच तथा चौडाइ पुष्टि गर्नुहोस्।" },
      { en: "Ask the municipality which zone the plot is in and what you may build.", ne: "जग्गा कुन क्षेत्रमा पर्छ र के बनाउन मिल्छ भनेर नगरपालिकामा सोध्नुहोस्।" },
      { en: "Have a lawyer review the sale deed before you pay a booking amount.", ne: "बैना दिनु अघि कानुनी सल्लाहकारले बिक्री लिखत हेरोस्।" },
    ],
  },
  property: {
    title: { en: "Documents and checks for buying property", ne: "सम्पत्ति किन्दा कागजात र जाँच" },
    items: [
      { en: "Lalpurja and the seller’s identity: confirm the owner is the person selling.", ne: "लालपुर्जा र बिक्रेताको पहिचान: मालिक नै बेच्दैछ कि पुष्टि गर्नुहोस्।" },
      { en: "Building permit, approved map and completion certificate for the building.", ne: "भवनको निर्माण अनुमति, स्वीकृत नक्सा र निर्माण सम्पन्न प्रमाणपत्र।" },
      { en: "Property tax and utility bills should be cleared up to date.", ne: "सम्पत्ति कर र उपयोगिता बिल हालसम्म चुक्ता भएको हुनुपर्छ।" },
      { en: "Ask an engineer to inspect the structure — earthquake safety matters in Kathmandu Valley.", ne: "इन्जिनियरबाट संरचना जाँच गराउनुहोस् — काठमाडौँ उपत्यकामा भूकम्प सुरक्षा महत्त्वपूर्ण छ।" },
      { en: "For apartments, ask about shared-area ownership, maintenance fees and parking rights.", ne: "अपार्टमेन्टमा साझा क्षेत्रको स्वामित्व, मर्मत शुल्क र पार्किङ अधिकारबारे सोध्नुहोस्।" },
      { en: "Have a lawyer review the sale deed before you pay a booking amount.", ne: "बैना दिनु अघि कानुनी सल्लाहकारले बिक्री लिखत हेरोस्।" },
    ],
  },
};

export const RENTAL_FAQ: { q: L; a: L }[] = [
  { q: { en: "Are these real listings?", ne: "के यी वास्तविक सूची हुन्?" }, a: { en: "No. This is a prototype. Every listing, price and locality is a sample so you can see how the section works. Real, verified listings will replace them before launch.", ne: "होइन। यो प्रोटोटाइप हो। यो खण्ड कसरी काम गर्छ देखाउन हरेक सूची, मूल्य र ठाउँ नमुना हुन्। सुरु हुनुअघि वास्तविक र प्रमाणित सूचीले यिनलाई प्रतिस्थापन गर्नेछ।" } },
  { q: { en: "What is the difference between furnished, semi-furnished and unfurnished?", ne: "फर्निस्ड, अर्ध–फर्निस्ड र अनफर्निस्डमा के फरक छ?" }, a: { en: "Furnished rooms come with furniture so you can move in with your bags. Semi-furnished rooms have basic fittings such as a wardrobe and geyser. Unfurnished rooms are empty with power and water connected. Each listing states what is included — confirm it at the visit.", ne: "फर्निस्ड कोठामा फर्निचर हुन्छ, सामान मात्र लिएर बस्न मिल्छ। अर्ध–फर्निस्डमा दराज र ग्यिजर जस्ता आधारभूत सामग्री हुन्छन्। अनफर्निस्ड खाली कोठा हुन्छ, बिजुली र पानी जोडिएको। हरेक सूचीमा के समावेश छ लेखिएको हुन्छ — भ्रमणमा पुष्टि गर्नुहोस्।" } },
  { q: { en: "How is land area shown?", ne: "जग्गाको क्षेत्रफल कसरी देखाइन्छ?" }, a: { en: "In aana and ropani, the units used in Kathmandu Valley. 1 ropani = 16 aana, and 1 aana is about 342 sq ft. We also show the sq-ft equivalent. Always confirm the exact area on the lalpurja and survey map.", ne: "आना र रोपनीमा, जुन काठमाडौँ उपत्यकामा प्रयोग हुने एकाइ हुन्। १ रोपनी = १६ आना, र १ आना लगभग ३४२ वर्गफिट। हामी वर्गफिट बराबर पनि देखाउँछौँ। सही क्षेत्रफल लालपुर्जा र नापी नक्सामा पक्का गर्नुहोस्।" } },
  { q: { en: "What happens when I request a visit?", ne: "भ्रमण अनुरोध गर्दा के हुन्छ?" }, a: { en: "In this prototype the request is saved on your device only and nothing is sent. In the live service the team would contact you to arrange a viewing.", ne: "यो प्रोटोटाइपमा अनुरोध तपाईंको उपकरणमा मात्र सुरक्षित हुन्छ, कतै पठाइँदैन। वास्तविक सेवामा टोलीले तपाईंलाई सम्पर्क गरी भ्रमण मिलाउँथ्यो।" } },
  { q: { en: "Can I list my own room, land or property?", ne: "के म आफ्नो कोठा, जग्गा वा सम्पत्ति सूचीकृत गर्न सक्छु?" }, a: { en: "Yes — use “List your property”. In this prototype the form only shows the flow; nothing is published.", ne: "सक्नुहुन्छ — “आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्” प्रयोग गर्नुहोस्। यो प्रोटोटाइपमा फारमले प्रक्रिया मात्र देखाउँछ; केही प्रकाशित हुँदैन।" } },
];
