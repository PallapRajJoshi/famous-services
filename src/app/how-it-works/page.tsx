import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { HowItWorks, WhySection, FaqSection } from "@/components/home/sections";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("How it works", "कसरी काम गर्छ")} — Famous Services`, description: t("From choosing a service to paying and reviewing — a clear five-step process.", "सेवा रोज्नेदेखि भुक्तानी र समीक्षासम्म — स्पष्ट पाँच चरणको प्रक्रिया।") };
}

export default async function Page() {
  const { t } = await getT();
  const topics = [
    { q: t("Before the visit", "भ्रमण अघि"), a: t("You choose the service, address and a two-hour window. Add photos and notes so the professional arrives prepared. For inspection-based jobs you will get a quote first.", "तपाईंले सेवा, ठेगाना र दुई घण्टाको समय रोज्नुहुन्छ। प्रोफेसनल तयार भएर आऊन तस्बिर र टिप्पणी थप्नुहोस्। निरीक्षणमा आधारित कामका लागि पहिले कोटेसन पाउनुहुन्छ।") },
    { q: t("On the day", "त्यस दिन"), a: t("The professional arrives in your window. They explain what they will do and show any parts before fitting. Spare parts are used only with your approval.", "प्रोफेसनल तपाईंको समयभित्र आउँछन्। उनीहरूले के गर्ने बताउँछन् र जडान अघि पार्टपुर्जा देखाउँछन्। पार्टपुर्जा तपाईंको स्वीकृतिमा मात्र प्रयोग हुन्छ।") },
    { q: t("How pricing works", "मूल्य कसरी तोकिन्छ"), a: t("Fixed and hourly services show a price upfront (sample prices in this prototype). Complex jobs show Inspection Quote — the professional inspects, sends a quote, and nothing starts until you approve.", "निश्चित र प्रति घण्टा सेवामा मूल्य अगाडि नै देखिन्छ (प्रोटोटाइपमा नमुना)। जटिल कामलाई निरीक्षण कोटेसन भनिन्छ — प्रोफेसनलले निरीक्षण गरी कोटेसन पठाउँछन् र तपाईंले स्वीकृत नगरेसम्म केही सुरु हुँदैन।") },
    { q: t("Paying", "भुक्तानी"), a: t("The prototype shows cash after service, digital payment and a demo card. No real payment is processed anywhere.", "प्रोटोटाइपमा सेवापछि नगद, डिजिटल भुक्तानी र डेमो कार्ड देखाइन्छ। कहीं पनि वास्तविक भुक्तानी प्रशोधन हुँदैन।") },
    { q: t("Changing or cancelling", "परिवर्तन वा रद्द"), a: t("Reschedule or cancel from your booking page. Exact timing and any fee will be confirmed by the business before launch.", "बुकिङ पृष्ठबाट समय परिवर्तन वा रद्द गर्नुहोस्। ठ्याक्कै समय र शुल्क सुरु हुनुअघि व्यवसायले पुष्टि गर्नेछ।") },
    { q: t("If something goes wrong", "केही बिग्रिए"), a: t("Contact support from the booking page or Help Center. Guarantee terms are being finalised and will be published before launch.", "बुकिङ पृष्ठ वा सहायता केन्द्रबाट सम्पर्क गर्नुहोस्। ग्यारेन्टीका सर्त अन्तिम रूप दिइँदैछ र सुरु हुनुअघि प्रकाशित हुनेछ।") },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("How it works", "कसरी काम गर्छ") }]} />} eyebrow={t("How it works", "कसरी काम गर्छ")} title={t("From problem to done, in plain steps", "समस्यादेखि समाधानसम्म, सरल चरणमा")} body={t("What happens before, during and after a booking — so there are no surprises.", "बुकिङ अघि, बेला र पछि के हुन्छ — कुनै अचम्म नहोस् भनेर।")}><div className="mt-6"><ButtonLink href="/services" variant="accent" size="lg">{t("Book a Service", "सेवा बुक गर्नुहोस्")}</ButtonLink></div></PageHero>
      <HowItWorks full />
      <Section tone="pale"><SectionHeading eyebrow={t("In detail", "विस्तारमा")} title={t("What to expect", "के अपेक्षा गर्ने")} /><div className="max-w-3xl"><Accordion items={topics} /></div></Section>
      <WhySection />
      <FaqSection />
    </>
  );
}
