import type { L } from "@/lib/i18n";

/**
 * DRAFT LEGAL TEXT — Famous Services prototype.
 * These documents are a structured first draft written for this business (home services + rentals + land/property).
 * They are NOT legal advice and are not in force. Anything wrapped in ⟦ ⟧ is a decision or fact only the business can
 * supply (fees, periods, legal names…) and is highlighted on screen. A qualified Nepali lawyer must review and finalise
 * every document before launch. English is the full text; Nepali is provided for titles, headings and key points.
 */

export type Block = string | string[] | { table: { head: string[]; rows: string[][] } };
export type Section = { id: string; h: L; b: Block[] };
export type LegalDoc = {
  slug: string;
  icon: string; // lucide icon name
  title: L;
  short: L;      // one line for cards
  who: L;        // who it applies to
  intro: L;
  key: { en: string; ne: string }[]; // plain-language key points
  sections: Section[];
  related: string[];
};

export const DRAFT_VERSION = "Draft v0.1 · prepared 1 Oct 2026 · not in force";

export const LEGAL_DOCS: LegalDoc[] = [
  /* ───────────────────────── 1. General terms ───────────────────────── */
  {
    slug: "terms", icon: "ScrollText",
    title: { en: "Terms of use", ne: "प्रयोगका सर्त" },
    short: { en: "The general rules for using Famous Services — apply to everything on the site.", ne: "फेमस सर्भिसेज प्रयोग गर्ने सामान्य नियम — साइटका सबै कुरामा लागू हुन्छ।" },
    who: { en: "Everyone using the website", ne: "वेबसाइट प्रयोग गर्ने सबै" },
    intro: { en: "These terms explain how you may use Famous Services — to book home services, to browse rooms for rent, and to look at land and property for sale. Some parts of the site have their own extra terms, listed at the end.", ne: "यी सर्तले घरेलु सेवा बुक गर्न, भाडामा कोठा हेर्न, र बिक्रीमा जग्गा तथा सम्पत्ति हेर्न फेमस सर्भिसेज कसरी प्रयोग गर्न सकिन्छ भन्ने बताउँछन्। साइटका केही भागका आफ्नै थप सर्त छन्, अन्त्यमा सूचीबद्ध।" },
    key: [
      { en: "You must be 18 or older and use a real Nepal mobile number.", ne: "तपाईं १८ वर्ष वा माथिको हुनुपर्छ र वास्तविक नेपाली मोबाइल नम्बर प्रयोग गर्नुपर्छ।" },
      { en: "Famous Services connects you with professionals and property owners; the work or the deal itself is between you and them.", ne: "फेमस सर्भिसेजले तपाईंलाई प्रोफेसनल र सम्पत्ति धनीसँग जोड्छ; काम वा सम्झौता तपाईं र उहाँहरूबीच हुन्छ।" },
      { en: "Prices shown are what applies at booking; extra work needs your approval first.", ne: "देखाइएको मूल्य बुकिङका बेला लागू हुन्छ; थप कामका लागि पहिले तपाईंको स्वीकृति चाहिन्छ।" },
      { en: "Please never pay money for a room, land or property before seeing it and checking the documents.", ne: "कोठा, जग्गा वा सम्पत्ति हेरी कागजात जाँच नगरी कृपया कहिल्यै पैसा नदिनुहोस्।" },
    ],
    related: ["service-terms", "rental-terms", "property-terms", "privacy", "cancellation"],
    sections: [
      { id: "about", h: { en: "About these terms", ne: "यी सर्तबारे" }, b: [
        "“Famous Services”, “we”, “us” and “our” mean ⟦legal business name and registration / PAN number⟧, operating in Kathmandu Valley (Kathmandu, Lalitpur and Bhaktapur). “You” means anyone using the website or booking through it.",
        "By creating an account, making a booking, sending a request or otherwise using the site, you agree to these terms and to any document linked from them that applies to what you are doing. If you do not agree, please do not use the site.",
      ] },
      { id: "what-we-offer", h: { en: "What we offer", ne: "हामी के दिन्छौँ" }, b: [
        "Famous Services is a platform with three parts:",
        [
          "Home services — plumbing, electrical, carpentry, painting, appliance repair, waterproofing, handyman work, cleaning, pest control, movers, home setup, beauty at home, drivers, home organisation and business services, booked online (see the Service booking terms).",
          "Rooms for rent — shared beds, single and double rooms, studios and flats, furnished, semi-furnished or unfurnished (see the Rental terms).",
          "Land and property for sale — plots, houses, apartments, shops and offices (see the Property sale terms).",
        ],
      ] },
      { id: "our-role", h: { en: "Our role", ne: "हाम्रो भूमिका" }, b: [
        "For home services, we connect customers with professionals who have gone through our review process ⟦confirm: whether professionals are your employees, independent contractors or partner businesses⟧. The professional carries out the work; we handle booking, scheduling, support and (where offered) payment collection.",
        "For rooms, land and property, we present details supplied by owners and arrange visits ⟦confirm: whether Famous Services is the owner / head-lessor, a broker or an introducer, and whether any brokerage or service fee applies⟧. Unless a signed written agreement says otherwise, we are not a party to a rental or sale contract between an owner and a tenant or buyer.",
        "Nothing on the site is legal, financial, valuation or engineering advice.",
      ] },
      { id: "accounts", h: { en: "Accounts and eligibility", ne: "खाता र योग्यता" }, b: [
        [
          "You must be at least 18 years old and able to enter a binding contract.",
          "You log in with a Nepal mobile number and a one-time code. Keep the code private; you are responsible for activity on your account.",
          "Give accurate details (name, mobile number, address). Tell us if they change.",
          "We may suspend or close accounts that give false information, misuse the service or put others at risk.",
        ],
      ] },
      { id: "acceptable-use", h: { en: "Acceptable use", ne: "स्वीकार्य प्रयोग" }, b: [
        "You agree not to:",
        [
          "make false, prank or duplicate bookings or requests;",
          "harass, threaten or discriminate against professionals, owners, tenants, buyers or our staff;",
          "post false listings, fake reviews, or content you do not have the right to share;",
          "collect other people’s contact details for any purpose other than the booking, visit or deal in question;",
          "copy, scrape or interfere with the site, or try to get around its security;",
          "use the site for anything illegal, or to take payments or advance fees away from the site’s process.",
        ],
      ] },
      { id: "prices", h: { en: "Prices, taxes and payment", ne: "मूल्य, कर र भुक्तानी" }, b: [
        "Prices are in Nepali rupees (Rs.). The price shown at booking is the price for the scope described. Inspection-based services are quoted after the professional has seen the job. Taxes: ⟦confirm: whether prices include VAT and how invoices are issued⟧.",
        "Payment methods, when and how you pay, and the rules on refunds are set out in the Service booking terms and the Cancellation & refunds policy. We never ask you to pay by sending money to a personal account unless we have told you so in writing.",
      ] },
      { id: "your-content", h: { en: "Content you submit", ne: "तपाईंले पठाउने सामग्री" }, b: [
        "Reviews, photos, messages and listing details you submit remain yours, but you give us permission to display, store and use them to run the site. You promise you have the right to share them and that they are true. We may remove content that breaks these terms or the law.",
        "Reviews should come from real, completed jobs and be honest. Reviews must not be bought, traded or written for you by the professional or owner concerned.",
      ] },
      { id: "ip", h: { en: "Our content", ne: "हाम्रो सामग्री" }, b: [
        "The site’s design, text, logos and illustrations belong to ⟦business name⟧ or its licensors. You may use the site for its intended purpose but may not copy or reuse our content without permission.",
      ] },
      { id: "liability", h: { en: "Limits of responsibility", ne: "जिम्मेवारीको सीमा" }, b: [
        "We work to keep information on the site accurate, but listing details, availability and prices can change and some are supplied by third parties. Information is provided as it is.",
        "To the extent the law allows, we are not responsible for indirect or consequential losses, or for decisions you make about a rental or purchase based on a listing. Nothing in these terms limits liability that cannot lawfully be limited, including for fraud, or any rights you have as a consumer under the laws of Nepal.",
        "Where we are responsible for a loss in connection with a home service, our liability is as described in the Service booking terms ⟦confirm: any monetary cap⟧.",
      ] },
      { id: "suspension", h: { en: "Suspension and ending", ne: "निलम्बन र अन्त्य" }, b: [
        "You may stop using the site and delete your account at any time (contact us). We may suspend or end access for breach of these terms, safety concerns, or legal reasons. Rights and duties that should reasonably survive (for example payment and liability) continue after that.",
      ] },
      { id: "changes", h: { en: "Changes to these terms", ne: "सर्तमा परिवर्तन" }, b: [
        "We may update these terms. The version date appears at the top of each document. Bookings you have already made stay under the terms that applied when you made them; for anything new, continued use means you accept the updated terms.",
      ] },
      { id: "disputes", h: { en: "Complaints and disputes", ne: "गुनासो र विवाद" }, b: [
        "If something goes wrong, contact us first through Help → Complaint or Contact so we can try to put it right. We aim to reply within ⟦confirm: response time, e.g. 2 working days⟧.",
        "These terms are governed by the laws of Nepal. Courts at ⟦confirm: e.g. Kathmandu⟧ have jurisdiction, without taking away any consumer protection you have by law.",
      ] },
      { id: "contact", h: { en: "Contact", ne: "सम्पर्क" }, b: [
        "⟦Business name⟧ · ⟦registered address⟧ · ⟦support phone⟧ · ⟦support email⟧ · ⟦support hours⟧.",
        "Extra terms that apply to specific parts of the site: Service booking terms, Rental terms (rooms), Property sale terms (land and property), Terms for owners and listers, Terms for professionals, Cancellation & refunds, Service guarantee, Privacy policy.",
      ] },
    ],
  },

  /* ───────────────────────── 2. Service booking terms ───────────────────────── */
  {
    slug: "service-terms", icon: "Wrench",
    title: { en: "Service booking terms", ne: "सेवा बुकिङ सर्त" },
    short: { en: "How booking, quotes, extra work, payment and claims work for home services.", ne: "घरेलु सेवाका बुकिङ, कोटेसन, थप काम, भुक्तानी र दाबी कसरी हुन्छन्।" },
    who: { en: "Customers booking home services", ne: "घरेलु सेवा बुक गर्ने ग्राहक" },
    intro: { en: "These terms apply when you book a home service such as plumbing, electrical work, cleaning, pest control, moving or beauty at home.", ne: "प्लम्बिङ, इलेक्ट्रिकल, सफाइ, कीरा नियन्त्रण, सार्ने काम वा घरमै ब्युटी जस्ता घरेलु सेवा बुक गर्दा यी सर्त लागू हुन्छन्।" },
    key: [
      { en: "Fixed-price services cover the scope listed. Inspection services get a written quote before work starts.", ne: "तोकिएको मूल्यका सेवाले सूचीमा लेखिएको दायरा समेट्छन्। निरीक्षण सेवामा काम सुरु हुनुअघि लिखित कोटेसन दिइन्छ।" },
      { en: "No extra work or material is charged unless you approve it first.", ne: "तपाईंले पहिले स्वीकृत नगरेसम्म थप काम वा सामग्रीको शुल्क लाग्दैन।" },
      { en: "Someone aged 18+ should be present, with safe access to the work area.", ne: "१८+ उमेरको व्यक्ति उपस्थित हुनुपर्छ र काम गर्ने ठाउँमा सुरक्षित पहुँच हुनुपर्छ।" },
      { en: "Report damage or problems quickly, with photos, so we can act.", ne: "क्षति वा समस्या फोटोसहित चाँडै जानकारी दिनुहोस् ताकि हामी कारबाही गर्न सकौँ।" },
    ],
    related: ["cancellation", "guarantee", "terms", "privacy"],
    sections: [
      { id: "booking", h: { en: "Making a booking", ne: "बुकिङ गर्ने" }, b: [
        "You choose a service, your address, a date and a time window, add any add-ons and details, and confirm. A booking is accepted when you see the confirmation screen and booking ID. We may contact you to confirm details.",
        [
          "Time windows are arrival windows (for example two hours), not exact times.",
          "Same-day booking is only available for services marked so and subject to ⟦confirm: minimum lead time, e.g. 3 hours⟧ and availability.",
          "You must give a correct address, landmark and contact number. If the address is wrong or unreachable the booking may be treated as a missed visit.",
        ],
      ] },
      { id: "pricing-types", h: { en: "Fixed price and inspection quotes", ne: "तोकिएको मूल्य र निरीक्षण कोटेसन" }, b: [
        "Fixed-price (and per-hour) services are charged at the price shown for the scope described on the service page. Prices shown in this prototype are samples; the live prices will be set by the business.",
        "Inspection-based services are quoted after the professional has seen the job. A visit / inspection fee of ⟦confirm: amount or “free”, and whether it is credited if you proceed⟧ may apply. You will receive a written quote and no work starts until you accept it. Quotes are valid for ⟦confirm: e.g. 7 days⟧.",
      ] },
      { id: "extras", h: { en: "Extra work and materials", ne: "थप काम र सामग्री" }, b: [
        [
          "If the professional finds extra work is needed, they must tell you the reason and the price and get your approval before starting it.",
          "Spare parts and materials are not included unless the service says so. Their price is shown to you before you approve.",
          "You may supply your own materials. We cannot guarantee work that depends on materials you supplied, and the service guarantee does not cover faults in them.",
          "Do not pay the professional for extra work that has not been recorded through us ⟦confirm: your policy on cash paid directly⟧.",
        ],
      ] },
      { id: "customer-duties", h: { en: "What we need from you", ne: "हामीलाई तपाईंबाट के चाहिन्छ" }, b: [
        [
          "An adult (18+) must be present, or you must arrange safe access and tell us.",
          "Clear the work area, and put away valuables, documents and cash. Secure pets and keep children away from tools and chemicals.",
          "Make sure electricity, water and any access (lift, parking, gate) needed for the job are available.",
          "Tell us about hazards: damp or live wiring, asbestos, gas smells, structural cracks, pests, allergies, or anyone ill in the home.",
          "Treat the professional respectfully. We may stop work if behaviour is abusive or unsafe.",
        ],
      ] },
      { id: "professional-duties", h: { en: "What professionals must do", ne: "प्रोफेसनलले के गर्नुपर्छ" }, b: [
        [
          "Arrive within the booked window, carry identification, and be courteous.",
          "Use appropriate tools and safety equipment, and keep the work area as tidy as practical.",
          "Do only the work agreed, explain any extra work and price before starting, and not ask for tips or off-platform payment.",
          "Not photograph your home or belongings except to record the job (for example before/after photos).",
        ],
      ] },
      { id: "safety", h: { en: "Safety and work we may refuse", ne: "सुरक्षा र हामीले अस्वीकार गर्न सक्ने काम" }, b: [
        "Professionals may stop or decline work that is unsafe — for example live high-voltage work without isolation, gas installations or repairs outside their licence, structural work, working at unsafe heights, or where there is a health hazard. In that case we will explain, and charge only what the Cancellation & refunds policy allows.",
      ] },
      { id: "delays", h: { en: "Delays and missed visits", ne: "ढिलाइ र छुटेको भ्रमण" }, b: [
        [
          "If the professional is more than ⟦confirm: e.g. 30 minutes⟧ late without notice, you may reschedule or cancel at no charge.",
          "If nobody is available at the address within ⟦confirm: e.g. 15 minutes⟧ of arrival, the visit may be treated as missed and the fee in the Cancellation & refunds policy may apply.",
          "Weather, traffic, power cuts, strikes (bandh) and similar events may cause delays; we will tell you as soon as we can.",
        ],
      ] },
      { id: "payment", h: { en: "Payment", ne: "भुक्तानी" }, b: [
        "Payment is due when the job is complete and you have confirmed it, unless the booking says otherwise. Payment options may include cash after service and digital payment ⟦confirm: which digital methods are supported⟧. You will receive a receipt or invoice.",
        "If you believe a charge is wrong, tell us within ⟦confirm: e.g. 24 hours⟧ of completion, before the professional leaves if possible.",
      ] },
      { id: "completion", h: { en: "Completion and sign-off", ne: "काम सम्पन्न र पुष्टि" }, b: [
        "When the work is done, check it with the professional before they leave. Confirming completion in the app or to the professional means you accept the work as complete, without ending your rights under the Service guarantee or the law.",
      ] },
      { id: "damage", h: { en: "Damage and claims", ne: "क्षति र दाबी" }, b: [
        "If something is damaged or goes wrong because of the work, tell us as soon as possible and within ⟦confirm: e.g. 48 hours⟧, with photos and the booking ID. We will review it fairly and may involve the professional. Where the professional or we are at fault, we will arrange repair, replacement or compensation for the proven, reasonable cost ⟦confirm: maximum amount and any insurance⟧.",
        "We are not responsible for pre-existing faults, normal wear, damage caused by hidden defects that could not reasonably be seen, or items left unsecured after we asked you to put them away.",
      ] },
      { id: "category-notes", h: { en: "Notes for specific services", ne: "विशेष सेवाका लागि टिप्पणी" }, b: [
        [
          "Cleaning: you tell us about delicate surfaces. Stains and old damage may not be fully removable and results are not guaranteed.",
          "Pest control: tell us about children, pets, pregnancy, allergies and food storage. Follow the re-entry and ventilation time you are given. A follow-up visit may be needed and results can take days.",
          "Movers: list your items honestly. Cash, jewellery, important documents and hazardous goods are not carried. Ask for packing of fragile goods; ⟦confirm: how loss or breakage is valued⟧.",
          "Beauty at home: tell the professional about allergies and skin conditions. They may decline a treatment that is unsafe. Please provide a clean, well-lit space.",
          "Drivers: a valid licence and vehicle papers are your responsibility if you provide the vehicle. Fines and tolls follow what was agreed at booking.",
          "Electrical, plumbing, waterproofing and appliance repair: diagnosis may show the part or unit is not worth repairing; we will tell you before you spend more.",
          "Business and corporate work may be covered by a separate written agreement.",
        ],
      ] },
    ],
  },

  /* ───────────────────────── 3. Rental terms ───────────────────────── */
  {
    slug: "rental-terms", icon: "KeyRound",
    title: { en: "Rental terms (rooms)", ne: "भाडा सर्त (कोठा)" },
    short: { en: "Rules for renting rooms and flats — visits, deposits, agreements and responsibilities.", ne: "कोठा र फ्ल्याट भाडामा लिने नियम — भ्रमण, धरौटी, सम्झौता र जिम्मेवारी।" },
    who: { en: "People renting a room, studio or flat, and owners renting them out", ne: "कोठा, स्टुडियो वा फ्ल्याट भाडामा लिने र दिने" },
    intro: { en: "These terms apply to rooms for rent shown on Famous Services — shared beds, single and double rooms, studios, and 1 or 2 BHK flats, whether furnished, semi-furnished or unfurnished.", ne: "फेमस सर्भिसेजमा देखाइएका भाडाका कोठा — साझा बेड, सिंगल र डबल कोठा, स्टुडियो, १ वा २ बीएचके फ्ल्याट, फर्निस्ड, अर्ध–फर्निस्ड वा अनफर्निस्ड — मा यी सर्त लागू हुन्छन्।" },
    key: [
      { en: "A visit request is not a booking. See the room in person first.", ne: "भ्रमण अनुरोध बुकिङ होइन। पहिले कोठा आफैँ हेर्नुहोस्।" },
      { en: "Insist on a written rental agreement and a receipt for every payment, including the deposit.", ne: "लिखित भाडा सम्झौता र धरौटीसहित हरेक भुक्तानीको रसिद अनिवार्य माग्नुहोस्।" },
      { en: "The listing describes the room; the signed agreement decides what you actually get.", ne: "सूचीले कोठाको वर्णन गर्छ; वास्तवमा के पाउने भन्ने हस्ताक्षर गरिएको सम्झौताले तय गर्छ।" },
      { en: "Furnished, semi-furnished and unfurnished have a set meaning — check the inventory.", ne: "फर्निस्ड, अर्ध–फर्निस्ड र अनफर्निस्डको निश्चित अर्थ छ — सामानको सूची जाँच्नुहोस्।" },
    ],
    related: ["owner-terms", "terms", "privacy", "cancellation"],
    sections: [
      { id: "scope", h: { en: "What these terms cover", ne: "यी सर्तले के समेट्छन्" }, b: [
        "These terms cover the way rooms are listed, how you can ask to see them, and the basic expectations of tenants and owners. The agreement you sign with the owner (or with ⟦confirm: Famous Services, if it is the landlord⟧) is the contract for the tenancy. If that agreement and these terms differ, the signed agreement applies for the tenancy itself.",
      ] },
      { id: "role", h: { en: "Our role", ne: "हाम्रो भूमिका" }, b: [
        "We show listings supplied by owners, arrange visits, and may help the parties communicate. ⟦Confirm: whether Famous Services charges tenants or owners any fee, how much, and when⟧. We do not guarantee that a room will suit you, remain available, or that an owner will accept you as tenant.",
      ] },
      { id: "listing-info", h: { en: "Room types and furnishing", ne: "कोठाको प्रकार र फर्निचर" }, b: [
        "Listings use these labels:",
        [
          "Shared room / bed — a bed in a room used by more than one person.",
          "Single room — a private room for one person. Double room — a larger private room for two.",
          "Studio — a room with a small kitchen area and bathroom as one private unit.",
          "1 BHK / 2 BHK flat — a private flat with one or two bedrooms, a hall and a kitchen.",
          "Furnished — furniture such as bed, mattress, wardrobe and table is provided. Semi-furnished — basic fittings only (for example built-in wardrobe, lights, fans, geyser). Unfurnished — an empty room with electricity and water connected.",
        ],
        "Each listing lists what is included. Ask for an inventory (with the condition of each item) to be written into the agreement. Photos, areas, floors and availability dates are supplied by owners and may be out of date, so confirm them at the visit.",
      ] },
      { id: "visits", h: { en: "Visits and requests", ne: "भ्रमण र अनुरोध" }, b: [
        [
          "Sending a “Request a visit” form does not reserve a room and creates no obligation for you or the owner.",
          "Visits are arranged at reasonable times. Bring a valid ID. You may be asked to bring a friend or family member; for your safety, tell someone where you are going.",
          "Do not pay any rent, deposit or “booking” money before you have seen the room and the owner’s identity is clear.",
        ],
      ] },
      { id: "money", h: { en: "Rent, deposit and other charges", ne: "भाडा, धरौटी र अन्य शुल्क" }, b: [
        [
          "Monthly rent, the deposit (shown as a number of months’ rent) and the minimum stay on the listing are the owner’s terms and should be repeated in the agreement.",
          "Rent is normally paid in advance ⟦confirm: monthly or other⟧. Ask what date it is due and how late payment is treated.",
          "Electricity, water, internet, waste collection, parking and building maintenance may be charged separately. Ask how each is measured and shared before you sign.",
          "The deposit is security for unpaid rent or bills and damage beyond normal wear. It should be returned within the time written in the agreement ⟦confirm: typical period⟧, with a written list of any deductions.",
          "Get a signed receipt for every payment. Prefer bank or digital transfer to cash where possible.",
        ],
      ] },
      { id: "agreement", h: { en: "Written rental agreement", ne: "लिखित भाडा सम्झौता" }, b: [
        "Insist on a written agreement signed by both sides before you move in. It should name the parties, identify the exact room or flat, and state: rent and due date, deposit and return, length of stay, notice period, who pays which bills, house rules (guests, noise, cooking, pets, smoking), the furniture inventory, and the owner’s right to enter (with notice). Registration or other formalities may be required by law ⟦confirm with your lawyer⟧.",
      ] },
      { id: "tenant", h: { en: "Tenant responsibilities", ne: "भाडामा लिनेको जिम्मेवारी" }, b: [
        [
          "Pay rent and bills on time and keep the room clean and in good condition.",
          "Use the room only as agreed; do not sublet or let others live there without written permission.",
          "Follow the house rules, respect neighbours and other tenants, and keep fire exits and shared areas clear.",
          "Report damage, leaks, electrical faults or safety problems promptly.",
          "Do not carry out illegal activity, store dangerous goods, or alter the room without permission.",
          "Return keys and leave the room in the agreed condition when you move out.",
        ],
      ] },
      { id: "owner", h: { en: "Owner responsibilities", ne: "घरधनीको जिम्मेवारी" }, b: [
        [
          "Provide a safe, habitable room that matches the listing, with the water and electricity stated.",
          "Give reasonable notice before entering, except in an emergency.",
          "Keep tenants’ personal details private and use them only for the tenancy.",
          "Return the deposit as agreed, and not lock out the tenant, remove belongings or cut utilities as a way of settling a dispute.",
          "Not refuse tenants on grounds that are unlawful.",
        ],
      ] },
      { id: "ending", h: { en: "Notice and moving out", ne: "सूचना र छोड्ने" }, b: [
        "Either side must give the notice period written in the agreement ⟦confirm: typical period, e.g. one month⟧. Do a move-out check together, compare it with the inventory, and agree the deposit return in writing.",
      ] },
      { id: "safety", h: { en: "Safety", ne: "सुरक्षा" }, b: [
        "Check exits, wiring, gas cylinders, railings and water supply during your visit. Kathmandu Valley is in an earthquake zone: ask about the building’s age and construction, and notice cracks, damp and obvious structural problems. Famous Services does not inspect buildings.",
      ] },
      { id: "disputes", h: { en: "Disagreements", ne: "मतभेद" }, b: [
        "Talk to the other party first. You may tell us if a listing was misleading; we may help the parties talk, update or remove the listing, but we are not a court and cannot decide a tenancy dispute. You keep your legal rights and remedies.",
      ] },
    ],
  },

  /* ───────────────────────── 4. Property sale terms ───────────────────────── */
  {
    slug: "property-terms", icon: "LandPlot",
    title: { en: "Land & property sale terms", ne: "जग्गा तथा सम्पत्ति बिक्री सर्त" },
    short: { en: "What to expect, and what you must check yourself, when buying land, houses, apartments, shops or offices.", ne: "जग्गा, घर, अपार्टमेन्ट, पसल वा कार्यालय किन्दा के अपेक्षा गर्ने र आफैँ के जाँच्ने।" },
    who: { en: "People buying land or property, and sellers", ne: "जग्गा वा सम्पत्ति किन्ने र बेच्ने" },
    intro: { en: "Land and property listings on Famous Services are for information and introductions. Buying property is a major legal and financial step — these terms explain our limits and the checks you should make.", ne: "फेमस सर्भिसेजका जग्गा तथा सम्पत्तिका सूची जानकारी र परिचयका लागि हुन्। सम्पत्ति किन्नु ठूलो कानुनी र आर्थिक कदम हो — यी सर्तले हाम्रो सीमा र तपाईंले गर्नुपर्ने जाँच बताउँछन्।" },
    key: [
      { en: "A listing is information, not a contract, an offer you can accept, or a valuation.", ne: "सूची जानकारी हो — सम्झौता, स्वीकार गर्न मिल्ने प्रस्ताव वा मूल्याङ्कन होइन।" },
      { en: "Verify the lalpurja, survey map, tax records, boundaries, road access and building papers yourself, with a lawyer and an engineer.", ne: "लालपुर्जा, नापी नक्सा, कर अभिलेख, चारकिल्ला, सडक पहुँच र भवनका कागजात वकिल र इन्जिनियरसँग आफैँ जाँच्नुहोस्।" },
      { en: "Do not pay a booking amount (baina) or any money before checking documents and seeing the property.", ne: "कागजात जाँच र सम्पत्ति हेर्नु अघि बैना वा कुनै रकम नबुझाउनुहोस्।" },
      { en: "Ownership transfers only through the official process — not through this website.", ne: "स्वामित्व आधिकारिक प्रक्रियाबाट मात्र सर्छ — यो वेबसाइटबाट होइन।" },
    ],
    related: ["owner-terms", "terms", "privacy"],
    sections: [
      { id: "scope", h: { en: "What these terms cover", ne: "यी सर्तले के समेट्छन्" }, b: [
        "These terms apply to land (residential, commercial, agricultural) and property (houses, apartments, shops, commercial buildings and office space) shown for sale. They apply together with the Terms of use.",
      ] },
      { id: "role", h: { en: "Our role", ne: "हाम्रो भूमिका" }, b: [
        "We show details supplied by sellers and arrange visits and introductions ⟦confirm: whether Famous Services acts as broker, agent or only an introducer; what commission or fee, if any, applies; and who pays it⟧. A commission is payable only if agreed in writing before you proceed.",
        "We are not your lawyer, engineer, valuer or financial adviser, and we do not hold purchase money ⟦confirm⟧.",
      ] },
      { id: "information", h: { en: "Listing information", ne: "सूचीको जानकारी" }, b: [
        [
          "Area is shown in ropani and aana (the units used in Kathmandu Valley) with a square-foot equivalent. 1 ropani = 16 aana, and 1 aana is about 342 sq ft. Conversions are approximate; the legal area is the one on the lalpurja and survey map.",
          "Prices are asking prices set by sellers, may be negotiable where stated, and can change. They are not valuations.",
          "Photos, maps, road widths, facing, built-up area, number of floors and age are provided by sellers and may be illustrative or out of date. Illustrations in this prototype are not pictures of real property.",
        ],
      ] },
      { id: "due-diligence", h: { en: "Checks you must make", ne: "तपाईंले गर्नुपर्ने जाँच" }, b: [
        "Before agreeing to buy, you should, with suitable professionals:",
        [
          "Confirm the seller is the registered owner (or holds written authority) by checking the lalpurja and the seller’s identity.",
          "Compare the survey (napi) map with the plot on the ground and walk the boundary (charkilla).",
          "Check the land revenue (malpot) and tax records and search for mortgage, charge, dispute, court case or co-owner claims.",
          "Confirm road access and right of way, its width and whether it is public or private.",
          "Ask the municipality about the zone, permitted use, setbacks and building rules, and whether the plot is affected by any road expansion, river, high-tension line or protected area.",
          "For built property: building permit, approved drawings, completion certificate, property-tax and utility clearance, and a structural and earthquake-safety inspection by an engineer.",
          "For apartments and shared buildings: ownership of shared areas, maintenance charges, parking rights and the developer’s or association’s documents.",
          "Have a lawyer review the sale deed and any agreement before you sign or pay.",
        ],
      ] },
      { id: "visits", h: { en: "Visits, offers and negotiation", ne: "भ्रमण, प्रस्ताव र मोलमोलाइ" }, b: [
        "A visit request creates no obligation. Price discussions and offers are between you and the seller. Nothing said by us or shown on the site is a binding offer or acceptance — a sale exists only when the proper written agreements are signed by the buyer and seller.",
      ] },
      { id: "payments", h: { en: "Payments and fraud prevention", ne: "भुक्तानी र ठगी रोकथाम" }, b: [
        [
          "Do not pay a booking amount (baina), advance, “token” or fee to anyone before documents are verified and you have a written receipt naming the payer, payee, amount and purpose.",
          "Use bank transfer or cheque where possible and pay the seller, not an individual claiming to act for them, unless authority is documented.",
          "Be careful of pressure to pay quickly, prices far below the market, sellers who will not meet in person, or documents that cannot be verified.",
          "Tell us about a suspicious listing so we can review it. We may remove listings and accounts.",
        ],
      ] },
      { id: "transfer", h: { en: "Transfer of ownership and taxes", ne: "स्वामित्व हस्तान्तरण र कर" }, b: [
        "Ownership passes only when the transfer is completed with the authorities as required by law. Registration fees, taxes and other charges are payable as the law requires and are not part of the listing price unless stated. We cannot promise that a transfer, approval, building permit or loan will be granted.",
      ] },
      { id: "seller", h: { en: "Sellers’ promises", ne: "बिक्रेताका प्रतिबद्धता" }, b: [
        "If you list property, you confirm that you have the legal right to sell, that the information and documents you give are true and complete, and that you will tell buyers about mortgages, disputes, co-owners and other claims you know of. See the Terms for owners and listers.",
      ] },
      { id: "limits", h: { en: "Limits of responsibility", ne: "जिम्मेवारीको सीमा" }, b: [
        "We do not promise that any property will increase in value, be approved for a particular use, or be free of defects. To the extent the law allows, we are not responsible for loss caused by decisions made on the basis of a listing, or by the acts of sellers, buyers or third parties. Nothing here limits liability that cannot lawfully be limited.",
      ] },
    ],
  },

  /* ───────────────────────── 5. Owner / lister terms ───────────────────────── */
  {
    slug: "owner-terms", icon: "PlusCircle",
    title: { en: "Terms for owners & listers", ne: "घरधनी र सूचीकर्ताका सर्त" },
    short: { en: "For anyone listing a room, land or property: accuracy, documents, fees and conduct.", ne: "कोठा, जग्गा वा सम्पत्ति सूचीकृत गर्ने सबैका लागि: सत्यता, कागजात, शुल्क र आचरण।" },
    who: { en: "Owners, landlords, sellers and authorised agents", ne: "घरधनी, जग्गाधनी, बिक्रेता र अधिकारप्राप्त एजेन्ट" },
    intro: { en: "These terms apply when you submit a room, land or property to be listed on Famous Services.", ne: "कोठा, जग्गा वा सम्पत्ति फेमस सर्भिसेजमा सूचीकृत गर्न पठाउँदा यी सर्त लागू हुन्छन्।" },
    key: [
      { en: "List only what you own or are authorised in writing to list.", ne: "आफ्नो स्वामित्वको वा लिखित अधिकार पाएको सम्पत्ति मात्र सूचीकृत गर्नुहोस्।" },
      { en: "Be accurate and keep availability up to date. Use real photos.", ne: "सही जानकारी दिनुहोस् र उपलब्धता अद्यावधिक राख्नुहोस्। वास्तविक फोटो प्रयोग गर्नुहोस्।" },
      { en: "We may check, edit, refuse or remove a listing.", ne: "हामी सूची जाँच, सम्पादन, अस्वीकार वा हटाउन सक्छौँ।" },
      { en: "Never collect money from visitors before they have seen the property.", ne: "भ्रमणकर्ताले सम्पत्ति नहेरी पैसा नलिनुहोस्।" },
    ],
    related: ["rental-terms", "property-terms", "terms", "privacy"],
    sections: [
      { id: "who", h: { en: "Who may list", ne: "को सूचीकृत गर्न सक्छ" }, b: [
        "You may list a room, land or property only if you are the owner, or have the owner’s written authority to rent or sell it. We may ask for proof of identity and ownership or authority (for example a copy of the lalpurja, or the owner’s consent) before publishing.",
      ] },
      { id: "accuracy", h: { en: "Accurate listings", ne: "सही सूची" }, b: [
        [
          "Describe the room, land or property truthfully: type, size, location, price, furnishing and what is included, road access, facing, age, and defects you know of.",
          "Use photos that show the real property and that you have the right to use. Do not add misleading edits, or photos of other properties.",
          "Mention mortgages, disputes, co-owners, tenancy in place, or restrictions that affect rent or sale.",
          "Keep price and availability up to date, and mark the listing as rented or sold within ⟦confirm: e.g. 48 hours⟧.",
        ],
      ] },
      { id: "review", h: { en: "Review and publication", ne: "समीक्षा र प्रकाशन" }, b: [
        "We may review, ask for changes to, refuse, pause or remove any listing at our discretion, including if it appears false, duplicated, unsafe, unlawful, or disputed. We do not promise that a listing will be published, how long it will stay, how many enquiries it will receive, or that it will lead to a rental or sale.",
      ] },
      { id: "fees", h: { en: "Fees", ne: "शुल्क" }, b: [
        "⟦Confirm: listing fee, commission or service charge, if any — amount, who pays, and when⟧. Any fee will be shown to you and agreed in writing before it applies. There is no fee in this prototype.",
      ] },
      { id: "enquiries", h: { en: "Dealing with enquiries and visits", ne: "सोधपुछ र भ्रमण" }, b: [
        [
          "Respond to visit arrangements promptly and show the property at the agreed time.",
          "Use visitors’ details only to arrange the visit and the deal in question.",
          "Do not ask visitors to pay a deposit, booking amount or fee before they have seen the property and you have shown who you are.",
          "Treat everyone fairly and lawfully. Listings may not state conditions that are unlawfully discriminatory.",
        ],
      ] },
      { id: "rooms", h: { en: "Extra rules for rooms", ne: "कोठाका लागि थप नियम" }, b: [
        [
          "The room must be safe and habitable, with the water, electricity and facilities you list.",
          "Provide a written agreement and receipts, and respect the tenant’s privacy and notice rules.",
          "Handle tenants’ ID copies and personal details securely.",
        ],
      ] },
      { id: "land", h: { en: "Extra rules for land and property", ne: "जग्गा तथा सम्पत्तिका लागि थप नियम" }, b: [
        [
          "Give the area in the units on your ownership documents, and tell buyers about any difference.",
          "Be ready to show original documents to a serious buyer and their lawyer.",
          "Do not list property that is in dispute, mortgaged without disclosure, or that you have already agreed to sell to someone else.",
        ],
      ] },
      { id: "responsibility", h: { en: "Your responsibility", ne: "तपाईंको जिम्मेवारी" }, b: [
        "You are responsible for the information you give and for your dealings with tenants and buyers. If a claim arises because information you gave was false or misleading, you are responsible for it ⟦confirm: indemnity wording with your lawyer⟧.",
      ] },
      { id: "data", h: { en: "Your details", ne: "तपाईंको विवरण" }, b: [
        "We share your name and phone number with people who ask to visit, and with our team, as needed to arrange viewings. See the Privacy policy.",
      ] },
    ],
  },

  /* ───────────────────────── 6. Professional terms ───────────────────────── */
  {
    slug: "pro-terms", icon: "HardHat",
    title: { en: "Terms for professionals", ne: "प्रोफेसनलका सर्त" },
    short: { en: "For tradespeople and service providers who join to take jobs — verification, conduct, pay and standards.", ne: "काम लिन जोडिने सीपयुक्त व्यक्ति र सेवा प्रदायकका लागि — प्रमाणीकरण, आचरण, भुक्तानी र स्तर।" },
    who: { en: "Plumbers, electricians, cleaners, drivers, beauticians and other professionals", ne: "प्लम्बर, इलेक्ट्रिसियन, सफाइकर्मी, चालक, ब्युटिसियन र अन्य प्रोफेसनल" },
    intro: { en: "These terms apply if you apply to join Famous Services as a professional, and while you take jobs through it.", ne: "तपाईंले प्रोफेसनलका रूपमा फेमस सर्भिसेजमा जोडिन आवेदन दिँदा र यसमार्फत काम लिँदा यी सर्त लागू हुन्छन्।" },
    key: [
      { en: "We verify your identity and skills before approving you.", ne: "स्वीकृत गर्नुअघि हामी तपाईंको पहिचान र सीप प्रमाणित गर्छौँ।" },
      { en: "You work safely and politely, and only charge what the customer has approved.", ne: "तपाईं सुरक्षित र शिष्टसँग काम गर्नुहुन्छ, र ग्राहकले स्वीकृत गरेको रकम मात्र लिनुहुन्छ।" },
      { en: "Fix defective work under the guarantee at your own cost.", ne: "ग्यारेन्टी अन्तर्गत त्रुटिपूर्ण काम आफ्नै खर्चमा मर्मत गर्नुहोस्।" },
      { en: "Commission and payout details are shown before you accept the terms.", ne: "कमिसन र भुक्तानीको विवरण सर्त स्वीकार गर्नुअघि देखाइन्छ।" },
    ],
    related: ["service-terms", "guarantee", "privacy", "terms"],
    sections: [
      { id: "eligibility", h: { en: "Eligibility and verification", ne: "योग्यता र प्रमाणीकरण" }, b: [
        "You must be at least 18, entitled to work in Nepal, and able to do the trades you apply for. We may ask for identity documents, proof of address, proof of skills or training, references, and ⟦confirm: any background or police check⟧. Approval is at our discretion and may be refused, limited to certain services or areas, or withdrawn.",
      ] },
      { id: "status", h: { en: "Your status", ne: "तपाईंको हैसियत" }, b: [
        "⟦Confirm: independent professional / partner / employee.⟧ Unless a separate written contract says otherwise, you are not our employee. You are responsible for your own tools, transport, safety equipment, taxes and any licences or insurance your work needs.",
      ] },
      { id: "jobs", h: { en: "Taking jobs", ne: "काम लिने" }, b: [
        [
          "You choose which requests to accept. Once you accept, you must attend within the window, or tell us and the customer as early as possible.",
          "Repeated no-shows, late arrivals or last-minute cancellations lower your standing and may lead to suspension ⟦confirm: any penalty⟧.",
          "Keep your availability and service areas accurate.",
        ],
      ] },
      { id: "conduct", h: { en: "Conduct and safety", ne: "आचरण र सुरक्षा" }, b: [
        [
          "Carry ID, arrive in suitable clothing, and be polite and respectful to customers and their families.",
          "Use safe methods and protective equipment. Do not work under the influence of alcohol or drugs, and do not smoke in customers’ homes.",
          "Refuse work you are not qualified or equipped to do safely, and explain why.",
          "Respect privacy: take photos only to record the job; do not share customers’ details or images.",
          "Leave the work area clean; handle waste and chemicals responsibly.",
          "Never harass, threaten or discriminate against anyone.",
        ],
      ] },
      { id: "pricing", h: { en: "Prices, commission and payout", ne: "मूल्य, कमिसन र भुक्तानी" }, b: [
        "Customers pay the price shown or the quote they approve. Famous Services keeps a commission of ⟦confirm: percentage or amount⟧ and pays you the balance ⟦confirm: payout schedule and method⟧. You must not charge extra for work the customer has not approved, ask for tips, or take payment for platform jobs outside the platform ⟦confirm: your policy⟧.",
      ] },
      { id: "quality", h: { en: "Quality and guarantee", ne: "गुणस्तर र ग्यारेन्टी" }, b: [
        "If work you did is found defective within the guarantee period in the Service guarantee, you must return and put it right at no extra charge to the customer, or we may arrange another professional and recover the reasonable cost ⟦confirm⟧.",
      ] },
      { id: "reviews", h: { en: "Ratings and reviews", ne: "रेटिङ र समीक्षा" }, b: [
        "Customer reviews help others choose. Do not ask for, pay for or write reviews on your own behalf. Low ratings or complaints may lead to coaching, a pause or removal.",
      ] },
      { id: "liability", h: { en: "Damage and liability", ne: "क्षति र जिम्मेवारी" }, b: [
        "You are responsible for loss or damage caused by your negligence or breach. ⟦Confirm: insurance and how claims are handled.⟧ We may investigate claims and share relevant details with the customer.",
      ] },
      { id: "confidential", h: { en: "Customer information", ne: "ग्राहकको जानकारी" }, b: [
        "Use customers’ names, addresses and phone numbers only to carry out the booking. Do not keep, sell or share them, or use them to solicit work outside the platform ⟦confirm⟧.",
      ] },
      { id: "ending", h: { en: "Suspension and ending", ne: "निलम्बन र अन्त्य" }, b: [
        "We may suspend or end your access for safety concerns, misconduct, poor quality, false documents or breach of these terms. You may stop at any time after completing jobs you have accepted.",
      ] },
    ],
  },

  /* ───────────────────────── 7. Cancellation & refunds ───────────────────────── */
  {
    slug: "cancellation", icon: "Undo2",
    title: { en: "Cancellation & refunds", ne: "रद्द तथा फिर्ता" },
    short: { en: "When you can cancel or reschedule, what it costs, and how refunds work.", ne: "कहिले रद्द वा समय परिवर्तन गर्न सकिन्छ, कति लाग्छ, र फिर्ता कसरी हुन्छ।" },
    who: { en: "Customers, and professionals who cancel", ne: "ग्राहक, र रद्द गर्ने प्रोफेसनल" },
    intro: { en: "This policy covers cancelling or rescheduling home-service bookings, and what happens to visits and deposits for rooms and property. The time limits and fees below are proposed defaults for the business to confirm.", ne: "यो नीतिले घरेलु सेवा बुकिङ रद्द वा समय परिवर्तन, र कोठा तथा सम्पत्तिका भ्रमण र धरौटीमा के हुन्छ भन्ने समेट्छ। तलका समय सीमा र शुल्क व्यवसायले पुष्टि गर्नुपर्ने प्रस्तावित सुरुवाती मान हुन्।" },
    key: [
      { en: "Cancel early and it is free; late cancellation or a missed visit may carry a fee.", ne: "चाँडै रद्द गरे निःशुल्क; ढिलो रद्द वा छुटेको भ्रमणमा शुल्क लाग्न सक्छ।" },
      { en: "If we or the professional cancel, you get a full refund and priority rebooking.", ne: "हामी वा प्रोफेसनले रद्द गरे तपाईंले पूर्ण फिर्ता र प्राथमिकतामा पुनः बुकिङ पाउनुहुन्छ।" },
      { en: "Visit requests for rooms and property are free to cancel.", ne: "कोठा तथा सम्पत्तिका भ्रमण अनुरोध निःशुल्क रद्द गर्न सकिन्छ।" },
      { en: "Rent, deposits and property payments are governed by the agreement between you and the owner.", ne: "भाडा, धरौटी र सम्पत्तिको भुक्तानी तपाईं र घरधनीबीचको सम्झौताले तय गर्छ।" },
    ],
    related: ["service-terms", "guarantee", "rental-terms", "property-terms"],
    sections: [
      { id: "customer", h: { en: "If you cancel a home service", ne: "तपाईंले घरेलु सेवा रद्द गर्दा" }, b: [
        { table: { head: ["When you cancel", "What applies"], rows: [
          ["More than ⟦24 hours⟧ before the start of the booked window", "Free. Full refund of anything paid."],
          ["Between ⟦24 hours and 2 hours⟧ before", "⟦Cancellation fee: amount or %⟧; the rest is refunded."],
          ["Less than ⟦2 hours⟧ before, or after the professional is on the way", "⟦Visit fee⟧ applies; the rest is refunded."],
          ["You are not available when the professional arrives (missed visit)", "⟦Visit fee⟧ applies; you may rebook."],
        ] } },
        "Cancel or reschedule from Track booking. Free rescheduling is available until ⟦6 hours⟧ before the window, subject to availability.",
      ] },
      { id: "inspection", h: { en: "Inspection and quote-based services", ne: "निरीक्षण र कोटेसनमा आधारित सेवा" }, b: [
        "If you decline the quote after an inspection, ⟦the inspection fee / no fee⟧ applies. If you accept, the fee is ⟦credited / not credited⟧ to the job. If the professional cannot do the work safely, we charge only what we are entitled to under the Service booking terms.",
      ] },
      { id: "we-cancel", h: { en: "If we or the professional cancel", ne: "हामी वा प्रोफेसनले रद्द गर्दा" }, b: [
        "If the booking is cancelled by us or by the professional, or no professional can be assigned, you get a full refund of anything paid and priority when rebooking. We will tell you as early as we can.",
      ] },
      { id: "after-start", h: { en: "After work has started", ne: "काम सुरु भएपछि" }, b: [
        "If you stop a job part-way, you pay for work done and materials used, as recorded with your approval. If the work is not satisfactory, see the Service guarantee.",
      ] },
      { id: "refunds", h: { en: "How refunds are paid", ne: "फिर्ता कसरी हुन्छ" }, b: [
        [
          "Cash payments after service: nothing is paid in advance, so there is nothing to refund unless you overpaid.",
          "Digital payments: refunded to the same method within ⟦confirm: e.g. 3–7 working days⟧ after approval.",
          "Packages and prepaid bundles: ⟦confirm: refund of unused portion, expiry, and any fee⟧.",
          "Coupons and offers used on a cancelled booking: ⟦confirm: whether they are restored⟧.",
        ],
      ] },
      { id: "rooms", h: { en: "Rooms for rent", ne: "भाडाका कोठा" }, b: [
        "A visit request can be cancelled at any time at no cost. Rent, deposits, notice and refunds on a tenancy are governed by the written rental agreement. Famous Services does not hold deposits ⟦confirm⟧.",
      ] },
      { id: "property", h: { en: "Land and property", ne: "जग्गा तथा सम्पत्ति" }, b: [
        "A visit request can be cancelled at any time at no cost. Any booking amount (baina) or payment is between buyer and seller under their written agreement; Famous Services does not take or refund purchase money ⟦confirm⟧.",
      ] },
      { id: "disputes", h: { en: "If you disagree", ne: "तपाईं असहमत हुनुभयो भने" }, b: [
        "Raise it through Help → Complaint within ⟦confirm: e.g. 7 days⟧ with your booking ID. We will review it and reply within ⟦confirm: e.g. 2 working days⟧.",
      ] },
    ],
  },

  /* ───────────────────────── 8. Service guarantee ───────────────────────── */
  {
    slug: "guarantee", icon: "ShieldCheck",
    title: { en: "Service guarantee", ne: "सेवा ग्यारेन्टी" },
    short: { en: "What we put right if home-service work is not done properly, and how to claim.", ne: "घरेलु सेवाको काम ठीकसँग नभए हामी के सच्याउँछौँ, र दाबी कसरी गर्ने।" },
    who: { en: "Customers of completed home-service bookings", ne: "सम्पन्न घरेलु सेवा बुकिङका ग्राहक" },
    intro: { en: "No guarantee is in force in this prototype. The draft below shows the kind of guarantee Famous Services could offer; the periods are proposals for the business to confirm.", ne: "यो प्रोटोटाइपमा कुनै ग्यारेन्टी लागू छैन। तलको मस्यौदाले फेमस सर्भिसेजले दिन सक्ने ग्यारेन्टीको प्रकार देखाउँछ; अवधि व्यवसायले पुष्टि गर्ने प्रस्ताव हुन्।" },
    key: [
      { en: "If covered work is faulty, we send a professional to put it right at no cost.", ne: "समेटिएको काम त्रुटिपूर्ण भए हामी निःशुल्क सच्याउन प्रोफेसन पठाउँछौँ।" },
      { en: "Claim within the guarantee period, with your booking ID and photos.", ne: "ग्यारेन्टी अवधिभित्र बुकिङ आईडी र फोटोसहित दाबी गर्नुहोस्।" },
      { en: "Misuse, new faults and customer-supplied parts are not covered.", ne: "दुरुपयोग, नयाँ खराबी र ग्राहकले ल्याएका पार्टपुर्जा समेटिँदैनन्।" },
      { en: "Rooms, land and property listings are information only and carry no service guarantee.", ne: "कोठा, जग्गा र सम्पत्तिका सूची जानकारी मात्र हुन् र सेवा ग्यारेन्टी हुँदैन।" },
    ],
    related: ["service-terms", "cancellation", "pro-terms"],
    sections: [
      { id: "what", h: { en: "What the guarantee covers", ne: "ग्यारेन्टीले के समेट्छ" }, b: [
        "If workmanship on a completed home-service booking is defective or incomplete, we will arrange for the work to be redone or put right at no extra charge, within these periods ⟦confirm all periods⟧:",
        { table: { head: ["Type of work", "Guarantee period"], rows: [
          ["Repairs and installations (plumbing, electrical, carpentry, appliance)", "⟦e.g. 7 days⟧ for the repaired part or fitting"],
          ["Painting and waterproofing", "⟦e.g. 30 days⟧ for peeling, bubbling or seepage from the treated area"],
          ["Cleaning", "⟦e.g. 48 hours⟧ to report missed areas"],
          ["Pest control", "⟦e.g. one free follow-up within 30 days⟧ if pests return in the treated area"],
          ["Movers, drivers, beauty at home", "Report problems within ⟦e.g. 24 hours⟧; see the Service booking terms for damage claims"],
        ] } },
      ] },
      { id: "remedy", h: { en: "What we will do", ne: "हामी के गर्छौँ" }, b: [
        "We may send the original or another professional to redo or repair the work. If that cannot put it right, we may refund all or part of the price paid for the affected work. Where the work damaged your property, see Damage and claims in the Service booking terms.",
      ] },
      { id: "not-covered", h: { en: "What is not covered", ne: "के समेटिँदैन" }, b: [
        [
          "New faults, or faults in parts the professional did not work on.",
          "Damage from misuse, accident, abnormal conditions, floods or earthquakes, or work by someone else afterwards.",
          "Parts or materials supplied by you, or that you chose against the professional’s advice.",
          "Normal wear, expected fading or ageing, or results that were described as not guaranteed.",
          "Work you asked to be done in a way the professional advised against.",
          "Rooms for rent, land and property listings, which are information only (see their own terms).",
        ],
      ] },
      { id: "claim", h: { en: "How to claim", ne: "दाबी कसरी गर्ने" }, b: [
        [
          "Open Track booking → your booking, or Help → Complaint, within the guarantee period.",
          "Give the booking ID, a description and clear photos or a short video.",
          "We will reply within ⟦confirm: e.g. 1 working day⟧ and arrange a visit ⟦confirm: within e.g. 48 hours⟧.",
        ],
      ] },
      { id: "verified", h: { en: "What “reviewed” professionals means", ne: "“समीक्षा गरिएका” प्रोफेसनको अर्थ" }, b: [
        "Professionals go through the checks described in the verification process before accepting jobs. Verification reduces risk but does not guarantee the outcome of any job.",
      ] },
      { id: "rights", h: { en: "Your legal rights", ne: "तपाईंका कानुनी अधिकार" }, b: [
        "This guarantee is in addition to, and does not reduce, any rights you have as a consumer under the laws of Nepal.",
      ] },
    ],
  },

  /* ───────────────────────── 9. Privacy ───────────────────────── */
  {
    slug: "privacy", icon: "Lock",
    title: { en: "Privacy policy", ne: "गोपनीयता नीति" },
    short: { en: "What personal information we collect, why, who sees it, and your choices.", ne: "हामी कुन व्यक्तिगत जानकारी किन संकलन गर्छौँ, कसले देख्छ, र तपाईंका विकल्प।" },
    who: { en: "Everyone who uses the website", ne: "वेबसाइट प्रयोग गर्ने सबै" },
    intro: { en: "This policy explains how Famous Services handles personal information when it runs as a live service. In this prototype, everything you enter stays in your own browser and nothing is sent to a server.", ne: "यो नीतिले फेमस सर्भिसेजले वास्तविक सेवाका रूपमा चल्दा व्यक्तिगत जानकारी कसरी सम्हाल्छ भन्ने बताउँछ। यो प्रोटोटाइपमा तपाईंले हालेका सबै कुरा तपाईंकै ब्राउजरमा रहन्छन् र कुनै सर्भरमा पठाइँदैन।" },
    key: [
      { en: "We collect only what we need to run bookings, visits and listings.", ne: "बुकिङ, भ्रमण र सूची चलाउन चाहिने जानकारी मात्र संकलन गर्छौँ।" },
      { en: "Your professional sees your name, address and job details — owners see your name and phone for a visit.", ne: "प्रोफेसनले तपाईंको नाम, ठेगाना र कामको विवरण देख्छन् — घरधनीले भ्रमणका लागि नाम र फोन देख्छन्।" },
      { en: "We do not sell your personal information.", ne: "हामी तपाईंको व्यक्तिगत जानकारी बेच्दैनौँ।" },
      { en: "You can ask to see, correct or delete your information.", ne: "तपाईं आफ्नो जानकारी हेर्न, सच्याउन वा मेटाउन अनुरोध गर्न सक्नुहुन्छ।" },
    ],
    related: ["terms", "owner-terms", "pro-terms"],
    sections: [
      { id: "who", h: { en: "Who we are", ne: "हामी को हौँ" }, b: [
        "⟦Legal business name⟧ (“Famous Services”) is responsible for personal information collected through this site. Contact: ⟦privacy contact email and address⟧.",
      ] },
      { id: "prototype", h: { en: "This prototype", ne: "यो प्रोटोटाइप" }, b: [
        "This prototype keeps demo data (login state, bookings, saved items, addresses, visit requests, language) only in your browser’s local storage and a language cookie (fs_lang). It has no server, so nothing is transmitted, sold or shared. You can clear it from Account → Settings or by clearing site data.",
      ] },
      { id: "collect", h: { en: "What we collect (live service)", ne: "हामी के संकलन गर्छौँ (वास्तविक सेवा)" }, b: [
        [
          "Account details: mobile number, name, optional email, and your login code activity.",
          "Booking details: service chosen, date and time, addresses, landmark and map pin, notes, photos you upload, add-ons, coupon used and payment method.",
          "Rental and property activity: visit requests, saved listings, messages, and — for owners — the listing details, photos and ownership documents you provide.",
          "Professional applicants: identity and address documents, trade proof and references.",
          "Support and reviews: complaints, messages and reviews.",
          "Technical data: device and browser type, pages viewed, and approximate location from your IP address, to keep the site secure and working.",
        ],
      ] },
      { id: "why", h: { en: "Why we use it", ne: "किन प्रयोग गर्छौँ" }, b: [
        [
          "To provide the service: confirm and manage bookings, assign professionals, arrange visits, process payments and provide support.",
          "To keep people safe: verify professionals and owners, detect fraud and enforce our terms.",
          "To communicate: confirmations, reminders, updates and — if you agree — offers. You can opt out of marketing at any time.",
          "To improve the site, and to meet legal and tax obligations.",
        ],
      ] },
      { id: "sharing", h: { en: "Who sees it", ne: "कसले देख्छ" }, b: [
        [
          "The professional assigned to your job sees your name, phone, address and job details.",
          "An owner or seller sees your name, phone and preferred time when you request a visit.",
          "Payment, SMS or messaging, map and hosting providers handle data for us under their own commitments ⟦confirm providers⟧.",
          "Authorities, courts or others where the law requires, or to protect rights and safety.",
          "We do not sell personal information ⟦confirm⟧.",
        ],
      ] },
      { id: "retention", h: { en: "How long we keep it", ne: "कति समय राख्छौँ" }, b: [
        "We keep information only as long as needed for the purposes above and as the law requires ⟦confirm: retention periods — for example booking records, documents of rejected applicants, deleted accounts⟧.",
      ] },
      { id: "rights", h: { en: "Your choices and rights", ne: "तपाईंका विकल्प र अधिकार" }, b: [
        "You can ask us to show you the information we hold, correct it, or delete it (unless we must keep it by law), and you can withdraw consent or opt out of marketing. Contact ⟦privacy contact⟧. You may also have rights under Nepali privacy law.",
      ] },
      { id: "security", h: { en: "Security", ne: "सुरक्षा" }, b: [
        "We use reasonable technical and organisational measures to protect your information. No online service is completely secure, so please protect your login code and tell us if you suspect misuse.",
      ] },
      { id: "children", h: { en: "Children", ne: "बालबालिका" }, b: [
        "The service is for adults (18+). We do not knowingly collect information from children.",
      ] },
      { id: "cookies", h: { en: "Cookies and similar storage", ne: "कुकी र यस्तै भण्डारण" }, b: [
        "We use a language cookie and local storage to remember your choices. If analytics or advertising tools are added in the live service, we will list them here ⟦confirm⟧.",
      ] },
      { id: "changes", h: { en: "Changes", ne: "परिवर्तन" }, b: [
        "We may update this policy and will show the new date at the top.",
      ] },
    ],
  },
];

export const legalDoc = (slug: string) => LEGAL_DOCS.find((d) => d.slug === slug);

/** Count of ⟦ ⟧ items a document still needs the business to confirm. */
export function confirmCount(d: LegalDoc): number {
  const text = JSON.stringify(d.sections);
  return (text.match(/⟦/g) ?? []).length;
}
