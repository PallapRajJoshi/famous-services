import type { Metadata } from "next";
import { Eye, HandHeart, Scale, ShieldCheck } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { TrustCard } from "@/components/cards/trust-card";
import { ButtonLink } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { ContactCta } from "@/components/home/sections";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("About", "हाम्रोबारे")} — Famous Services`, description: t("One place for every home service in Kathmandu Valley.", "काठमाडौं उपत्यकामा घरका हरेक सेवाका लागि एउटै ठाउँ।") };
}

export default async function Page() {
  const { t } = await getT();
  const values = [
    { I: Eye, h: t("Clarity first", "पहिले स्पष्टता"), b: t("Who comes, what it costs and when — shown before you commit.", "को आउँछ, कति लाग्छ र कहिले — प्रतिबद्ध हुनुअघि नै देखाइन्छ।") },
    { I: ShieldCheck, h: t("Verified, not assumed", "अनुमान होइन, प्रमाणित"), b: t("Professionals are reviewed before they receive jobs.", "प्रोफेसनलले काम पाउनु अघि समीक्षा गरिन्छ।") },
    { I: Scale, h: t("Fair for both sides", "दुवै पक्षका लागि निष्पक्ष"), b: t("Customers get honest quotes; professionals get clear terms.", "ग्राहकले इमानदार कोटेसन पाउँछन्; प्रोफेसनलले स्पष्ट सर्त पाउँछन्।") },
    { I: HandHeart, h: t("Made for Nepal", "नेपालका लागि बनाइएको"), b: t("English and नेपाली, mobile-first, and built around how homes here work.", "अंग्रेजी र नेपाली, मोबाइल-प्रथम, र यहाँका घरहरू कसरी चल्छन् त्यसैअनुसार।") },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("About", "हाम्रोबारे") }]} />} eyebrow={t("About Famous Services", "Famous Services बारे")} title={t("One place. Every home service.", "एउटै ठाउँ। घरका हरेक सेवा।")} body={t("Famous Services is being built to make everyday home help in Kathmandu, Lalitpur and Bhaktapur simpler: find a service, see the price, pick a time and get a reviewed professional at your door.", "Famous Services काठमाडौं, ललितपुर र भक्तपुरमा दैनिक घरेलु सहयोग सजिलो बनाउन तयार हुँदैछ: सेवा खोज्नुहोस्, मूल्य हेर्नुहोस्, समय रोज्नुहोस् र समीक्षा गरिएको प्रोफेसनल ढोकामै पाउनुहोस्।")} />
      <Section><div className="grid gap-10 lg:grid-cols-2"><div><SectionHeading eyebrow={t("Why we exist", "हामी किन छौं")} title={t("Finding trustworthy help should not be hard", "भरपर्दो सहयोग खोज्न गाह्रो हुनु हुँदैन")} /><div className="space-y-4 text-base leading-relaxed text-muted"><p>{t("Today, many households rely on word of mouth to find a plumber or cleaner, with no clear price and no way to follow up if something goes wrong.", "आज धेरै घरपरिवार प्लम्बर वा सफाइकर्मी खोज्न मुखैमुख सुनाइमा भर पर्छन्, स्पष्ट मूल्य हुँदैन र केही बिग्रिए फलो-अप गर्ने उपाय हुँदैन।")}</p><p>{t("We want to change that with a simple, honest booking experience backed by real people.", "हामी वास्तविक मान्छेको सहयोगसहित सरल, इमानदार बुकिङ अनुभवले यो बदल्न चाहन्छौं।")}</p></div></div>
        <div className="rounded-2xl border border-amber/40 bg-amber-50 p-6"><h3 className="text-lg font-extrabold text-ink">{t("About this prototype", "यो प्रोटोटाइपबारे")}</h3><p className="mt-2 text-sm leading-relaxed text-ink">{t("You are looking at a frontend prototype. The prices, offers, reviews and professional profiles are samples. We do not claim customer numbers, ratings, or service coverage that do not yet exist.", "तपाईं फ्रन्टएन्ड प्रोटोटाइप हेर्दै हुनुहुन्छ। मूल्य, अफर, समीक्षा र प्रोफेसनल प्रोफाइल नमुना हुन्। अहिले अस्तित्वमा नरहेका ग्राहक संख्या, रेटिङ वा सेवा क्षेत्रको दाबी हामी गर्दैनौं।")}</p></div></div></Section>
      <Section tone="pale"><SectionHeading align="center" eyebrow={t("What we stand for", "हामी केमा विश्वास गर्छौं")} title={t("Four principles", "चार सिद्धान्त")} /><Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ I, h, b }) => <StaggerItem key={h}><TrustCard icon={<I className="h-6 w-6" aria-hidden />} title={h} body={b} /></StaggerItem>)}</Stagger></Section>
      <Section><div className="rounded-3xl bg-pale p-8 text-center sm:p-12"><h2 className="text-2xl font-extrabold text-brand-deep sm:text-3xl">{t("Team and company details", "टोली र कम्पनी विवरण")}</h2><p className="mx-auto mt-3 max-w-xl text-muted">{t("Company registration, team and office details will be added here by the business. They are intentionally left blank rather than invented.", "कम्पनी दर्ता, टोली र कार्यालय विवरण व्यवसायले यहाँ थप्नेछ। बनावटी राख्नुभन्दा जानाजानी खाली छोडिएको हो।")}</p><div className="mt-6 flex flex-wrap justify-center gap-3"><ButtonLink href="/services" variant="accent" size="lg">{t("Book a Service", "सेवा बुक गर्नुहोस्")}</ButtonLink><ButtonLink href="/become-a-professional" variant="outline" size="lg">{t("Become a professional", "प्रोफेसनल बन्नुहोस्")}</ButtonLink></div></div></Section>
      <ContactCta />
    </>
  );
}
