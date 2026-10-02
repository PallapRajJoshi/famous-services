import type { Metadata } from "next";
import { Building2, CalendarClock, ClipboardList, FileText, Headphones, Layers } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { TrustCard } from "@/components/cards/trust-card";
import { QuoteForm } from "@/components/forms/quote-form";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { ButtonLink } from "@/components/ui/button";
import { FaqSection, BusinessSection } from "@/components/home/sections";
import { BIZ_FAQS } from "@/data/content";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Business & corporate", "व्यवसाय तथा कर्पोरेट")} — Famous Services`, description: t("Office cleaning, maintenance and relocation, quoted in writing.", "कार्यालय सफाइ, मर्मत र स्थानान्तरण, लिखित कोटेसनसहित।") };
}

export default async function Page() {
  const { t } = await getT();
  const items = [
    { I: ClipboardList, h: t("Written quotes", "लिखित कोटेसन"), b: t("Scope and price in writing after a site visit.", "साइट भ्रमणपछि दायरा र मूल्य लिखित रूपमा।") },
    { I: CalendarClock, h: t("Recurring schedules", "आवर्ती तालिका"), b: t("Weekly, monthly or custom visits can be discussed.", "साप्ताहिक, मासिक वा अनुकूल भ्रमणबारे छलफल गर्न सकिन्छ।") },
    { I: Layers, h: t("Several trades, one contact", "धेरै पेशा, एउटै सम्पर्क"), b: t("Cleaning, electrical, plumbing and more through one team.", "सफाइ, इलेक्ट्रिकल, प्लम्बिङ र थप एउटै टोलीमार्फत।") },
    { I: FileText, h: t("Clear paperwork", "स्पष्ट कागजात"), b: t("Invoice formats will be confirmed by the business.", "इनभ्वाइसको ढाँचा व्यवसायले पुष्टि गर्नेछ।") },
    { I: Building2, h: t("Offices and shops", "कार्यालय र पसल"), b: t("For workplaces, clinics, shops and rental properties.", "कार्यस्थल, क्लिनिक, पसल र भाडा सम्पत्तिका लागि।") },
    { I: Headphones, h: t("A person to call", "फोन गर्ने मान्छे"), b: t("Support handled by people, not only forms.", "फारम मात्र होइन, मान्छेबाट सहयोग।") },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Business", "व्यवसाय") }]} />} eyebrow={t("Business & corporate", "व्यवसाय तथा कर्पोरेट")} title={t("One accountable partner for your workplace", "तपाईंको कार्यस्थलका लागि एउटै जिम्मेवार साझेदार")} body={t("Tell us about your site. We reply with a written quote — no obligation.", "आफ्नो साइटबारे बताउनुहोस्। हामी लिखित कोटेसनसहित जवाफ दिन्छौं — कुनै बाध्यता छैन।")}><div className="mt-6"><ButtonLink href="#quote" variant="accent" size="lg">{t("Request a Business Quote", "व्यावसायिक कोटेसन माग्नुहोस्")}</ButtonLink></div></PageHero>
      <Section><SectionHeading eyebrow={t("What you get", "तपाईंले के पाउनुहुन्छ")} title={t("Built for repeat, reliable work", "दोहोरिने भरपर्दो कामका लागि")} /><Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{items.map(({ I, h, b }) => <StaggerItem key={h}><TrustCard icon={<I className="h-6 w-6" aria-hidden />} title={h} body={b} /></StaggerItem>)}</Stagger></Section>
      <BusinessSection />
      <Section tone="pale" id="quote"><div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8"><SectionHeading title={t("Request a business quote", "व्यावसायिक कोटेसन माग्नुहोस्")} body={t("Takes about two minutes. This demo form saves nothing outside your device.", "करिब दुई मिनेट लाग्छ। यो डेमो फारमले तपाईंको उपकरण बाहिर केही सुरक्षित गर्दैन।")} /><QuoteForm /></div></Section>
      <FaqSection faqs={BIZ_FAQS} title={t("Business questions", "व्यावसायिक प्रश्न")} />
    </>
  );
}
