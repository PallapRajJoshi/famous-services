import type { L } from "@/lib/i18n";
import type { CategorySlug } from "./catalog";

/** MOCK DATA — replace with real business information before launch. Everything here is clearly demo content. */

const l = (en: string, ne?: string): L => ({ en, ne });

/* ───────── Site configuration ───────── */
export const SITE = {
  name: "Famous Services",
  tagline: l("One Place. Every Home Service.", "एउटै ठाउँ। घरका हरेक सेवा।"),
  /** Set these via env vars when real numbers exist. While empty, Call/WhatsApp buttons show a demo notice instead of dialing. */
  phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: "hello@your-domain.example",
  address: l("Office address — to be added", "कार्यालयको ठेगाना — थपिनेछ"),
  hours: l("Support hours — to be confirmed", "सहयोग समय — पुष्टि हुनेछ"),
  social: { facebook: "", instagram: "", tiktok: "", youtube: "" },
};

export const DEMO_NOTICE = l(
  "Prototype with demo data — prices, offers, reviews and professionals are samples.",
  "डेमो डेटासहितको प्रोटोटाइप — मूल्य, अफर, समीक्षा र प्रोफेसनल नमुना मात्र हुन्।",
);

/* ───────── Areas ───────── */
export type District = { slug: "kathmandu" | "lalitpur" | "bhaktapur"; name: L; blurb: L; neighbourhoods: string[]; faqs: { q: L; a: L }[] };
export const DISTRICTS: District[] = [
  {
    slug: "kathmandu",
    name: l("Kathmandu", "काठमाडौं"),
    blurb: l("The Valley's busiest district — from Baneshwor and Thamel to Budhanilkantha and Kalanki.", "उपत्यकाको व्यस्त जिल्ला — बानेश्वर र ठमेलदेखि बुढानीलकण्ठ र कलंकीसम्म।"),
    neighbourhoods: ["Baneshwor", "Koteshwor", "Tinkune", "Sinamangal", "Chabahil", "Boudha", "Maharajgunj", "Baluwatar", "Lazimpat", "Naxal", "Thamel", "Kalimati", "Kalanki", "Balaju", "Gongabu", "Samakhusi", "Budhanilkantha", "Tokha"],
    faqs: [
      { q: l("Do you serve every part of Kathmandu?", "के तपाईंहरू काठमाडौंका सबै ठाउँमा सेवा दिनुहुन्छ?"), a: l("Coverage is being rolled out area by area. Choose your area while booking, or use Notify Me and we will tell you when it opens.", "सेवा क्षेत्र क्रमशः विस्तार हुँदैछ। बुकिङमा आफ्नो क्षेत्र रोज्नुहोस्, वा 'मलाई जानकारी दिनुहोस्' प्रयोग गर्नुहोस्।") },
      { q: l("How is the service time decided?", "सेवा समय कसरी तय हुन्छ?"), a: l("You pick a two-hour window. The team confirms it with you after assigning a professional.", "तपाईंले दुई घण्टाको समय रोज्नुहुन्छ। प्रोफेसनल खटाएपछि टोलीले पुष्टि गर्छ।") },
    ],
  },
  {
    slug: "lalitpur",
    name: l("Lalitpur", "ललितपुर"),
    blurb: l("From Pulchowk and Jawalakhel to Imadol and Godawari.", "पुल्चोक र जावलाखेलदेखि इमाडोल र गोदावरीसम्म।"),
    neighbourhoods: ["Pulchowk", "Jawalakhel", "Kupondole", "Sanepa", "Lagankhel", "Satdobato", "Gwarko", "Imadol", "Harisiddhi", "Patan Dhoka", "Ekantakuna", "Godawari"],
    faqs: [
      { q: l("Is Patan's old core included?", "के पाटनको पुरानो क्षेत्र समावेश छ?"), a: l("Narrow lanes can affect timing and equipment. Add landmarks when booking and the team will plan accordingly.", "साँघुरा गल्लीले समय र उपकरणमा असर गर्न सक्छ। बुकिङमा ल्यान्डमार्क थप्नुहोस्, टोलीले योजना मिलाउँछ।") },
      { q: l("Can I book for a rented flat?", "के भाडाको फ्ल्याटका लागि बुक गर्न सकिन्छ?"), a: l("Yes. Share building access details in the booking notes.", "सकिन्छ। बुकिङ नोटमा भवनमा प्रवेशसम्बन्धी जानकारी दिनुहोस्।") },
    ],
  },
  {
    slug: "bhaktapur",
    name: l("Bhaktapur", "भक्तपुर"),
    blurb: l("From Suryabinayak and Thimi to Sallaghari and Lokanthali.", "सूर्यविनायक र ठिमीदेखि सल्लाघारी र लोकन्थलीसम्म।"),
    neighbourhoods: ["Suryabinayak", "Thimi", "Sallaghari", "Lokanthali", "Kamalbinayak", "Jagati", "Gundu", "Changunarayan", "Balkot"],
    faqs: [
      { q: l("Is service available in heritage areas?", "के सम्पदा क्षेत्रमा सेवा उपलब्ध छ?"), a: l("Some heritage zones have restrictions on work and vehicles. We will confirm feasibility before assigning.", "केही सम्पदा क्षेत्रमा काम र सवारीमा प्रतिबन्ध हुन सक्छ। खटाउनु अघि सम्भाव्यता पुष्टि गरिन्छ।") },
    ],
  },
];
export const districtBySlug = (s: string) => DISTRICTS.find((d) => d.slug === s);

/* ───────── Packages ───────── */
export type Pack = {
  slug: string;
  name: L;
  desc: L;
  art: CategorySlug;
  includes: L[];
  original: number;
  offer: number;
  duration: L;
  badge?: L;
  forWho: L;
};
export const PACKAGES: Pack[] = [
  { slug: "home-deep-cleaning", name: l("Home Deep Cleaning Package", "घर डिप क्लिनिङ प्याकेज"), desc: l("A full deep clean of rooms, kitchen and bathrooms with sofa and mattress care.", "कोठा, भान्सा र बाथरुमको पूरा डिप क्लिनिङ, सोफा र ब्याडिङ हेरचाहसहित।"), art: "cleaning", includes: [l("Home deep cleaning", "घर डिप क्लिनिङ"), l("Kitchen deep cleaning", "भान्सा डिप क्लिनिङ"), l("2 bathrooms cleaned", "२ बाथरुम सफाइ"), l("Sofa cleaning", "सोफा सफाइ"), l("Mattress cleaning", "ब्याडिङ सफाइ")], original: 13400, offer: 11500, duration: l("1 day", "१ दिन"), badge: l("Popular combo", "लोकप्रिय कम्बो"), forWho: l("2–3 bedroom homes", "२–३ बेडरुमका घर") },
  { slug: "move-in", name: l("Move-In Package", "मुभ-इन प्याकेज"), desc: l("Get a new home ready before you carry in the first box.", "पहिलो बाकस भित्र्याउनुअघि नयाँ घर तयार गर्नुहोस्।"), art: "movers", includes: [l("Deep cleaning", "डिप क्लिनिङ"), l("General pest control", "सामान्य कीरा नियन्त्रण"), l("Water tank cleaning", "पानी ट्यांकी सफाइ"), l("Electrical safety check", "इलेक्ट्रिकल सुरक्षा जाँच")], original: 14800, offer: 12900, duration: l("1–2 days", "१–२ दिन"), forWho: l("New tenants and owners", "नयाँ भाडावाल र घरधनी") },
  { slug: "move-out", name: l("Move-Out Package", "मुभ-आउट प्याकेज"), desc: l("Pack, shift and leave the old place clean for handover.", "प्याक गर्ने, सार्ने र हस्तान्तरणका लागि पुरानो ठाउँ सफा राख्ने।"), art: "movers", includes: [l("Packing & unpacking", "प्याकिङ तथा अनप्याकिङ"), l("Furniture shifting", "फर्निचर सिफ्टिङ"), l("Deep cleaning of the old home", "पुरानो घरको डिप क्लिनिङ")], original: 14500, offer: 12500, duration: l("1–2 days", "१–२ दिन"), forWho: l("Families changing homes", "घर बदल्ने परिवार") },
  { slug: "pre-festival-home-care", name: l("Pre-Festival Home Care", "चाडपर्व अघि घर हेरचाह"), desc: l("Get ready for Dashain and Tihar — cleaning, fresh walls and working lights.", "दशैँ र तिहारका लागि तयारी — सफाइ, ताजा भित्ता र चल्ने बत्ती।"), art: "painting", includes: [l("Home deep cleaning", "घर डिप क्लिनिङ"), l("Wall touch-up & patch", "भित्ता टचअप तथा प्याच"), l("Light fixture fitting (up to 4)", "बत्ती फिटिङ (४ सम्म)"), l("Sofa cleaning", "सोफा सफाइ")], original: 11000, offer: 9500, duration: l("1–2 days", "१–२ दिन"), badge: l("Seasonal", "मौसमी"), forWho: l("Festival season", "चाडपर्वको समय") },
  { slug: "monsoon-protection", name: l("Monsoon Protection Package", "वर्षा सुरक्षा प्याकेज"), desc: l("Check roofs, drains and wiring before the rains arrive.", "वर्षा आउनु अघि छानो, ढल र वायरिङ जाँच।"), art: "waterproofing", includes: [l("Roof & terrace inspection", "छानो र टेरेस निरीक्षण"), l("Drain unblocking", "ढल खोल्ने"), l("House wiring inspection", "घरको वायरिङ निरीक्षण"), l("Wall damp check", "भित्ता चिस्यान जाँच")], original: 3300, offer: 2800, duration: l("Half day", "आधा दिन"), badge: l("Seasonal", "मौसमी"), forWho: l("Before monsoon", "वर्षा अघि") },
  { slug: "new-home-setup", name: l("New Home Setup", "नयाँ घर सेटअप"), desc: l("Everything installed and ready — furniture, TV, curtains and purifier.", "सबै जडान भएर तयार — फर्निचर, टिभी, पर्दा र प्युरिफायर।"), art: "home-setup", includes: [l("Furniture assembly", "फर्निचर जोड्ने"), l("TV mounting", "टिभी माउन्टिङ"), l("Curtain installation", "पर्दा जडान"), l("Water purifier installation", "वाटर प्युरिफायर जडान")], original: 3500, offer: 2990, duration: l("Half to full day", "आधा देखि पूरा दिन"), forWho: l("New home owners", "नयाँ घरधनी") },
];
export const packBySlug = (s: string) => PACKAGES.find((p) => p.slug === s);

/* ───────── Offers / coupons ───────── */
export type Offer = {
  code: string;
  title: L;
  desc: L;
  kind: "percent" | "flat";
  value: number;
  max?: number;
  minSpend: number;
  category?: CategorySlug;
  endsInDays: number;
  terms: L[];
};
export const OFFERS: Offer[] = [
  { code: "DEMO10", title: l("10% off your first booking", "पहिलो बुकिङमा १०% छुट"), desc: l("A sample welcome offer to show how coupons work.", "कुपन कसरी काम गर्छ देखाउने नमुना स्वागत अफर।"), kind: "percent", value: 10, max: 500, minSpend: 1000, endsInDays: 30, terms: [l("Demo offer — not a real promotion", "डेमो अफर — वास्तविक प्रमोसन होइन"), l("Maximum discount Rs. 500", "अधिकतम छुट रु. ५००"), l("Minimum booking Rs. 1,000", "न्यूनतम बुकिङ रु. १,०००")] },
  { code: "WELCOME200", title: l("Rs. 200 off bookings above Rs. 1,500", "रु. १,५०० माथिको बुकिङमा रु. २०० छुट"), desc: l("A flat-amount sample coupon.", "एकमुष्ट रकमको नमुना कुपन।"), kind: "flat", value: 200, minSpend: 1500, endsInDays: 21, terms: [l("Demo offer", "डेमो अफर"), l("One use per booking", "प्रति बुकिङ एक पटक")] },
  { code: "CLEAN15", title: l("15% off cleaning services", "सफाइ सेवामा १५% छुट"), desc: l("Sample category offer for cleaning.", "सफाइका लागि नमुना श्रेणी अफर।"), kind: "percent", value: 15, max: 800, minSpend: 1500, category: "cleaning", endsInDays: 14, terms: [l("Demo offer", "डेमो अफर"), l("Applies to cleaning services only", "सफाइ सेवामा मात्र"), l("Maximum discount Rs. 800", "अधिकतम छुट रु. ८००")] },
  { code: "FESTIVE5", title: l("Festive home care — 5% off", "चाडपर्व घर हेरचाह — ५% छुट"), desc: l("Sample seasonal offer for packages.", "प्याकेजका लागि नमुना मौसमी अफर।"), kind: "percent", value: 5, max: 600, minSpend: 3000, endsInDays: 10, terms: [l("Demo offer", "डेमो अफर")] },
  { code: "TANKCARE", title: l("Water tank care — Rs. 300 off", "पानी ट्यांकी हेरचाह — रु. ३०० छुट"), desc: l("Sample offer for tank cleaning.", "ट्यांकी सफाइका लागि नमुना अफर।"), kind: "flat", value: 300, minSpend: 1800, category: "cleaning", endsInDays: 25, terms: [l("Demo offer", "डेमो अफर")] },
  { code: "BIZQUOTE", title: l("Business quote — priority review", "व्यावसायिक कोटेसन — प्राथमिकता समीक्षा"), desc: l("Sample non-price offer for business enquiries.", "व्यावसायिक सोधपुछका लागि मूल्यबिनाको नमुना अफर।"), kind: "flat", value: 0, minSpend: 0, category: "office-business", endsInDays: 45, terms: [l("Demo offer", "डेमो अफर")] },
];
export const offerByCode = (c: string) => OFFERS.find((o) => o.code.toLowerCase() === c.trim().toLowerCase());

/* ───────── Professionals (demo profiles) ───────── */
export type Pro = { id: string; name: string; role: L; category: CategorySlug; years: number; areas: string[]; langs: string[]; hue: number; bio: L };
export const PROS: Pro[] = [
  { id: "p1", name: "Ramesh T.", role: l("Plumber", "प्लम्बर"), category: "plumbing", years: 8, areas: ["Kathmandu", "Lalitpur"], langs: ["नेपाली", "English"], hue: 215, bio: l("Leak detection, fittings and bathroom work.", "चुहिने पत्ता लगाउने, फिटिङ र बाथरुमको काम।") },
  { id: "p2", name: "Sunita M.", role: l("Home cleaning specialist", "घर सफाइ विशेषज्ञ"), category: "cleaning", years: 5, areas: ["Lalitpur", "Bhaktapur"], langs: ["नेपाली", "हिन्दी"], hue: 165, bio: l("Deep cleaning and kitchen specialist.", "डिप क्लिनिङ र भान्सा विशेषज्ञ।") },
  { id: "p3", name: "Bikash K.", role: l("Electrician", "इलेक्ट्रिसियन"), category: "electrical", years: 10, areas: ["Kathmandu"], langs: ["नेपाली", "English"], hue: 38, bio: l("Wiring, fans and fault-finding.", "वायरिङ, पंखा र खराबी पत्ता लगाउने।") },
  { id: "p4", name: "Anita S.", role: l("Beauty professional", "सौन्दर्य प्रोफेसनल"), category: "beauty", years: 6, areas: ["Kathmandu", "Bhaktapur"], langs: ["नेपाली", "English"], hue: 330, bio: l("Facials, threading and bridal prep.", "फेसियल, थ्रेडिङ र दुलही तयारी।") },
  { id: "p5", name: "Prakash G.", role: l("AC & appliance technician", "एसी तथा उपकरण प्राविधिक"), category: "appliance-repair", years: 7, areas: ["Kathmandu", "Lalitpur"], langs: ["नेपाली", "English"], hue: 200, bio: l("AC servicing and washing machines.", "एसी सर्भिसिङ र वासिङ मेसिन।") },
  { id: "p6", name: "Dipesh L.", role: l("Carpenter", "सिकर्मी"), category: "carpentry", years: 9, areas: ["Bhaktapur", "Kathmandu"], langs: ["नेपाली", "नेवारी"], hue: 28, bio: l("Doors, windows and custom cabinets.", "ढोका, झ्याल र अर्डरको दराज।") },
];
/** The verification steps professionals go through (process description — not a claim about any individual). */
export const VERIFY_STEPS: { title: L; body: L }[] = [
  { title: l("Identity document check", "परिचय कागजात जाँच"), body: l("Citizenship, national ID or driving licence reviewed.", "नागरिकता, राष्ट्रिय परिचयपत्र वा चालक अनुमतिपत्र समीक्षा।") },
  { title: l("Address & reference", "ठेगाना र सिफारिस"), body: l("Address proof and a reference contact are collected.", "ठेगानाको प्रमाण र सिफारिस सम्पर्क संकलन।") },
  { title: l("Skills review", "सीप समीक्षा"), body: l("Experience and certificates reviewed for the chosen trade.", "रोजिएको पेशाका लागि अनुभव र प्रमाणपत्र समीक्षा।") },
  { title: l("Approval before work", "काम अघि स्वीकृति"), body: l("Only approved professionals can receive jobs.", "स्वीकृत प्रोफेसनलले मात्र काम पाउँछन्।") },
];

/* ───────── Reviews (DEMO — clearly marked) ───────── */
export type Review = { id: string; who: string; service: string; category: CategorySlug; district: "kathmandu" | "lalitpur" | "bhaktapur"; when: L; text: L };
export const REVIEWS: Review[] = [
  { id: "r1", who: "Sample reviewer A", service: "pipe-leakage-repair", category: "plumbing", district: "kathmandu", when: l("Sample date", "नमुना मिति"), text: l("Sample text: Arrived within the window, explained the problem clearly and left the area clean.", "नमुना पाठ: तोकिएको समयभित्र आए, समस्या स्पष्ट बुझाए र ठाउँ सफा राखे।") },
  { id: "r2", who: "Sample reviewer B", service: "home-deep-cleaning", category: "cleaning", district: "lalitpur", when: l("Sample date", "नमुना मिति"), text: l("Sample text: The team brought their own equipment and finished before evening.", "नमुना पाठ: टोलीले आफ्नै उपकरण ल्यायो र साँझअघि सक्यो।") },
  { id: "r3", who: "Sample reviewer C", service: "fan-installation", category: "electrical", district: "kathmandu", when: l("Sample date", "नमुना मिति"), text: l("Sample text: Neat fitting and a quick function test before leaving.", "नमुना पाठ: सफा जडान र जानुअघि छिटो परीक्षण।") },
  { id: "r4", who: "Sample reviewer D", service: "sofa-cleaning", category: "cleaning", district: "bhaktapur", when: l("Sample date", "नमुना मिति"), text: l("Sample text: Stains improved a lot and the sofa dried the same day.", "नमुना पाठ: दागमा धेरै सुधार भयो र सोफा त्यही दिन सुक्यो।") },
  { id: "r5", who: "Sample reviewer E", service: "ac-servicing", category: "appliance-repair", district: "lalitpur", when: l("Sample date", "नमुना मिति"), text: l("Sample text: Clear price before starting and a tidy finish.", "नमुना पाठ: सुरु गर्नु अघि स्पष्ट मूल्य र सफा समापन।") },
  { id: "r6", who: "Sample reviewer F", service: "general-pest-control", category: "pest-control", district: "kathmandu", when: l("Sample date", "नमुना मिति"), text: l("Sample text: Explained the safety steps and how long to stay out.", "नमुना पाठ: सुरक्षा कदम र कति बेर बाहिर बस्ने बुझाए।") },
];

/* ───────── Guides ───────── */
export const GUIDES: { slug: string; title: L; excerpt: L; tips: L[]; tag: L }[] = [
  { slug: "monsoon-ready", title: l("Get your home monsoon-ready", "घरलाई वर्षाका लागि तयार पार्नुहोस्"), excerpt: l("A short checklist to catch leaks and blocked drains early.", "चुहिने र ढल जाम छिटो पत्ता लगाउने छोटो सूची।"), tag: l("Seasonal", "मौसमी"), tips: [l("Clear terrace and balcony drains", "टेरेस र बार्दलीका ढल सफा गर्नुहोस्"), l("Look for damp patches after the first heavy rain", "पहिलो ठूलो वर्षापछि चिस्यान खोज्नुहोस्"), l("Check outdoor sockets and wiring for moisture", "बाहिरका सकेट र वायरिङमा चिस्यान जाँच्नुहोस्")] },
  { slug: "dashain-cleaning", title: l("A practical Dashain cleaning plan", "दशैँ सफाइको व्यावहारिक योजना"), excerpt: l("Spread the work over a week so nothing is left to the last day.", "काम हप्ताभर बाँडेर अन्तिम दिनको हतार नपार्नुहोस्।"), tag: l("Seasonal", "मौसमी"), tips: [l("Start with storage and wardrobes", "भण्डार र वार्डरोबबाट सुरु गर्नुहोस्"), l("Book deep cleaning early — festival weeks fill up", "डिप क्लिनिङ अगाडि नै बुक गर्नुहोस्"), l("Leave sofas and mattresses for a sunny day", "सोफा र ब्याडिङ घाम लागेको दिन गर्नुहोस्")] },
  { slug: "when-to-call-electrician", title: l("When to call an electrician", "कहिले इलेक्ट्रिसियन बोलाउने"), excerpt: l("Warning signs you should never ignore.", "कहिल्यै बेवास्ता नगर्नुपर्ने चेतावनी संकेत।"), tag: l("Safety", "सुरक्षा"), tips: [l("Burning smell near switches or sockets", "स्विच वा सकेट नजिक जलेको गन्ध"), l("Breakers that trip repeatedly", "बारम्बार ट्रिप हुने ब्रेकर"), l("Warm plates or flickering lights", "तातो प्लेट वा झिलिमिली बत्ती")] },
  { slug: "tank-cleaning", title: l("How often should you clean a water tank?", "पानी ट्यांकी कति पटक सफा गर्ने?"), excerpt: l("Simple guidance on tank hygiene.", "ट्यांकी सरसफाइबारे सरल मार्गदर्शन।"), tag: l("Hygiene", "सरसफाइ"), tips: [l("Many households clean tanks a couple of times a year", "धेरै घरले वर्षमा केही पटक ट्यांकी सफा गर्छन्"), l("Clean sooner if water smells or has sediment", "पानीमा गन्ध वा तलछट भए छिटो सफा गर्नुहोस्")] },
  { slug: "choose-painter", title: l("Questions to ask before painting", "रङरोगन अघि सोध्नुपर्ने प्रश्न"), excerpt: l("Surface prep matters more than the paint brand.", "रङको ब्रान्डभन्दा सतह तयारी महत्त्वपूर्ण।"), tag: l("Guide", "मार्गदर्शन"), tips: [l("What prep is included?", "कस्तो तयारी समावेश छ?"), l("How many coats and how long to dry?", "कति कोट र सुक्न कति समय?"), l("Who covers and protects furniture?", "फर्निचर कसले छोप्ने?")] },
  { slug: "moving-day", title: l("A calm moving-day checklist", "शान्त मुभिङ-डे चेकलिस्ट"), excerpt: l("Label, photograph and pack in the right order.", "सही क्रममा लेबल, फोटो र प्याकिङ।"), tag: l("Guide", "मार्गदर्शन"), tips: [l("Photograph electronics wiring before unplugging", "इलेक्ट्रोनिक्स जोडिएको फोटो खिच्नुहोस्"), l("Pack one 'first night' box", "'पहिलो रात' बाकस अलग प्याक गर्नुहोस्")] },
];

/* ───────── FAQs ───────── */
export const HOME_FAQS: { q: L; a: L }[] = [
  { q: l("How does booking work?", "बुकिङ कसरी हुन्छ?"), a: l("Choose a service, pick your area, date and time window, then confirm. In this prototype everything is simulated on your device.", "सेवा रोज्नुहोस्, क्षेत्र, मिति र समय छान्नुहोस्, अनि पुष्टि गर्नुहोस्। यो प्रोटोटाइपमा सबै तपाईंको डिभाइसमै सिमुलेट हुन्छ।") },
  { q: l("Are the prices final?", "के मूल्य अन्तिम हुन्?"), a: l("Prices shown are samples. For inspection-based work you receive a quote before work starts.", "देखाइएको मूल्य नमुना हो। निरीक्षणमा आधारित कामका लागि काम सुरु हुनु अघि कोटेसन दिइन्छ।") },
  { q: l("Who are the professionals?", "प्रोफेसनलहरू को हुन्?"), a: l("Independent professionals who apply, submit documents and are reviewed before they can receive jobs.", "आवेदन दिने, कागजात बुझाउने र काम पाउनु अघि समीक्षा हुने स्वतन्त्र प्रोफेसनल।") },
  { q: l("Can I cancel or reschedule?", "के रद्द वा समय परिवर्तन गर्न सकिन्छ?"), a: l("Yes, from your booking page. Free-change timing will be confirmed by the business.", "सकिन्छ, बुकिङ पृष्ठबाट। निःशुल्क परिवर्तनको समय व्यवसायले पुष्टि गर्नेछ।") },
  { q: l("What payment options are there?", "भुक्तानीका विकल्प के छन्?"), a: l("The prototype shows cash after service, digital payment and a demo card. No real payment is processed.", "प्रोटोटाइपमा सेवापछि नगद, डिजिटल भुक्तानी र डेमो कार्ड देखाइएको छ। वास्तविक भुक्तानी प्रशोधन हुँदैन।") },
  { q: l("Which areas do you cover?", "कुन क्षेत्रमा सेवा दिनुहुन्छ?"), a: l("Kathmandu, Lalitpur and Bhaktapur are the planned areas. Coverage opens area by area — use Notify Me for yours.", "काठमाडौं, ललितपुर र भक्तपुर योजनाबद्ध क्षेत्र हुन्। क्षेत्र-क्षेत्र गरी खुल्छ — आफ्नो क्षेत्रका लागि 'जानकारी दिनुहोस्' प्रयोग गर्नुहोस्।") },
  { q: l("What is the service guarantee?", "सेवा ग्यारेन्टी के हो?"), a: l("Guarantee terms are being finalised and will be published before launch.", "ग्यारेन्टीका सर्त अन्तिम रूप दिइँदैछ र सुरु हुनुअघि प्रकाशित हुनेछ।") },
];

export const PRO_FAQS: { q: L; a: L }[] = [
  { q: l("Who can join?", "को जोडिन सक्छ?"), a: l("Skilled individuals and small teams with relevant experience in a listed trade.", "सूचीबद्ध पेशामा सम्बन्धित अनुभव भएका दक्ष व्यक्ति र साना टोली।") },
  { q: l("What documents do I need?", "कुन कागजात चाहिन्छ?"), a: l("An ID (citizenship, national ID or driving licence), address proof and a photo. Certificates help.", "परिचय (नागरिकता, राष्ट्रिय परिचयपत्र वा चालक अनुमतिपत्र), ठेगानाको प्रमाण र फोटो। प्रमाणपत्रले सहयोग गर्छ।") },
  { q: l("How do I get paid?", "भुक्तानी कसरी पाइन्छ?"), a: l("Payout terms will be confirmed by the business. The earnings screens here use sample figures.", "भुक्तानी सर्त व्यवसायले पुष्टि गर्नेछ। यहाँका आम्दानी स्क्रिनमा नमुना अङ्क छन्।") },
  { q: l("Is there a joining fee?", "के सदस्यता शुल्क छ?"), a: l("To be confirmed by the business. This prototype shows none.", "व्यवसायले पुष्टि गर्नेछ। यो प्रोटोटाइपमा केही देखाइएको छैन।") },
];

export const BIZ_FAQS: { q: L; a: L }[] = [
  { q: l("How are business jobs priced?", "व्यावसायिक कामको मूल्य कसरी तोकिन्छ?"), a: l("By site visit and scope. You receive a written quote.", "साइट भ्रमण र कामको दायराअनुसार। लिखित कोटेसन दिइन्छ।") },
  { q: l("Can we sign a recurring contract?", "के आवर्ती सम्झौता गर्न सकिन्छ?"), a: l("Yes — weekly, monthly or custom schedules can be discussed in the quote request.", "सकिन्छ — साप्ताहिक, मासिक वा अनुकूल तालिका कोटेसन अनुरोधमा छलफल हुन सक्छ।") },
];

export type HelpTopic = { id: string; title: L; icon: string; items: { q: L; a: L }[] };
export const HELP_TOPICS: HelpTopic[] = [
  { id: "booking", title: l("Booking help", "बुकिङ सहायता"), icon: "CalendarDays", items: [
    { q: l("How do I book a service?", "सेवा कसरी बुक गर्ने?"), a: l("Open a service, choose Book, then follow the steps: address, date and time, add-ons, details, review and payment.", "सेवा खोल्नुहोस्, बुक रोज्नुहोस् र चरणहरू पछ्याउनुहोस्: ठेगाना, मिति र समय, एड-अन, विवरण, समीक्षा र भुक्तानी।") },
    { q: l("Can I book for someone else?", "अरूका लागि बुक गर्न सकिन्छ?"), a: l("Yes. Enter their address and a phone number that can be reached on the day.", "सकिन्छ। उनीहरूको ठेगाना र त्यसदिन सम्पर्क हुने फोन नम्बर राख्नुहोस्।") },
  ] },
  { id: "pricing", title: l("Pricing", "मूल्य"), icon: "Receipt", items: [
    { q: l("Why do some services show Inspection Quote?", "कुनै सेवामा किन निरीक्षण कोटेसन देखिन्छ?"), a: l("The cost depends on what the professional finds. You get a quote before work starts.", "लागत प्रोफेसनलले के भेट्टाउँछन् भन्नेमा निर्भर गर्छ। काम सुरु अघि कोटेसन दिइन्छ।") },
    { q: l("Are spare parts included?", "के पार्टपुर्जा समावेश छन्?"), a: l("Generally no — they are quoted separately and used only with your approval.", "सामान्यतः छैनन् — छुट्टै मूल्यमा र तपाईंको स्वीकृतिमा मात्र प्रयोग।") },
  ] },
  { id: "cancellation", title: l("Cancellation", "रद्द"), icon: "Undo2", items: [
    { q: l("How do I cancel?", "कसरी रद्द गर्ने?"), a: l("Open the booking from Track or your account and choose Cancel (simulated here).", "ट्र्याक वा खाताबाट बुकिङ खोलेर रद्द रोज्नुहोस् (यहाँ सिमुलेट)।") },
    { q: l("Is there a cancellation fee?", "के रद्द शुल्क छ?"), a: l("Cancellation terms are to be confirmed by the business.", "रद्दका सर्त व्यवसायले पुष्टि गर्नेछ।") },
  ] },
  { id: "payments", title: l("Payments", "भुक्तानी"), icon: "CreditCard", items: [
    { q: l("Can I pay after the service?", "सेवापछि भुक्तानी गर्न सकिन्छ?"), a: l("Cash after service is one of the options shown.", "सेवापछि नगद देखाइएका विकल्पमध्ये एक हो।") },
    { q: l("Is any real payment taken here?", "के यहाँ वास्तविक भुक्तानी लिइन्छ?"), a: l("No. This is a prototype. Payment screens are simulations.", "लिइँदैन। यो प्रोटोटाइप हो। भुक्तानी स्क्रिन सिमुलेसन हुन्।") },
  ] },
  { id: "guarantee", title: l("Service guarantee", "सेवा ग्यारेन्टी"), icon: "ShieldCheck", items: [
    { q: l("What does the guarantee cover?", "ग्यारेन्टीले के समेट्छ?"), a: l("Terms are being finalised and will be published before launch.", "सर्तहरू अन्तिम रूप दिइँदैछ र सुरु हुनुअघि प्रकाशित हुनेछ।") },
  ] },
  { id: "safety", title: l("Professional safety", "प्रोफेसनल सुरक्षा"), icon: "BadgeCheck", items: [
    { q: l("How are professionals checked?", "प्रोफेसनलको जाँच कसरी हुन्छ?"), a: l("They submit ID, address proof and a photo, and are reviewed before receiving jobs.", "उनीहरूले परिचय, ठेगानाको प्रमाण र फोटो बुझाउँछन् र काम पाउनु अघि समीक्षा हुन्छ।") },
    { q: l("What should I do if I feel unsafe?", "असुरक्षित महसुस भए के गर्ने?"), a: l("Ask the professional to stop, contact support and, if needed, local emergency services.", "प्रोफेसनललाई रोक्न भन्नुहोस्, सहयोगमा सम्पर्क गर्नुहोस् र आवश्यक परे स्थानीय आपत्कालीन सेवा।") },
  ] },
];

/* ───────── Booking time slots (2-hour windows) ───────── */
export const SLOTS = [
  { id: "08-10", label: "8:00 – 10:00 AM", startHour: 8 },
  { id: "10-12", label: "10:00 AM – 12:00 PM", startHour: 10 },
  { id: "12-14", label: "12:00 – 2:00 PM", startHour: 12 },
  { id: "14-16", label: "2:00 – 4:00 PM", startHour: 14 },
  { id: "16-18", label: "4:00 – 6:00 PM", startHour: 16 },
  { id: "18-20", label: "6:00 – 8:00 PM", startHour: 18 },
];

/** Which slots look "busy" in the demo — deterministic from the date so it never flickers. */
export function demoSlotBusy(dateKey: string, slotId: string): boolean {
  let h = 7;
  for (const ch of dateKey + slotId) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
  return h % 5 === 0;
}
