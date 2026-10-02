import type { Metadata } from "next";
import { Info, Ticket, ShoppingBag, Percent } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { OfferCard } from "@/components/cards/offer-card";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { OFFERS } from "@/data/content";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Offers", "अफर")} — Famous Services`, description: t("Demo coupons and seasonal offers.", "डेमो कुपन र मौसमी अफर।") };
}

export default async function Page() {
  const { t } = await getT();
  const steps = [
    { I: Ticket, h: t("Copy a code", "कोड कपी गर्नुहोस्"), b: t("Tap a code to copy it, or press Apply & Book.", "कोड थिचेर कपी गर्नुहोस्, वा 'लागू गरी बुक' थिच्नुहोस्।") },
    { I: ShoppingBag, h: t("Start a booking", "बुकिङ सुरु गर्नुहोस्"), b: t("Choose a service that qualifies for the offer.", "अफरका लागि योग्य सेवा रोज्नुहोस्।") },
    { I: Percent, h: t("Apply at review", "समीक्षामा लागू गर्नुहोस्"), b: t("Enter the code in the review step to see your total change.", "समीक्षा चरणमा कोड हाल्नुहोस् र जम्मा परिवर्तन हेर्नुहोस्।") },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Offers", "अफर") }]} />} eyebrow={t("Offers", "अफर")} title={t("Coupons & seasonal offers", "कुपन तथा मौसमी अफर")} body={t("Every offer here is a demo so you can see how coupons behave. None of them are real discounts.", "यहाँका सबै अफर कुपन कसरी काम गर्छ देखाउने डेमो हुन्। कुनै पनि वास्तविक छुट होइन।")} />
      <Section className="!pt-10">
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{OFFERS.map((o) => <StaggerItem key={o.code} className="h-full"><OfferCard offer={o} /></StaggerItem>)}</Stagger>
      </Section>
      <Section tone="pale"><SectionHeading align="center" eyebrow={t("How coupons work", "कुपन कसरी काम गर्छ")} title={t("Three quick steps", "तीन छिटा चरण")} />
        <ol className="grid gap-4 md:grid-cols-3">{steps.map(({ I, h, b }, i) => <li key={i} className="rounded-2xl border border-line bg-white p-5 shadow-card"><span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-pale text-brand"><I className="h-5 w-5" aria-hidden /></span><h3 className="font-bold text-ink">{i + 1}. {h}</h3><p className="mt-1 text-sm text-muted">{b}</p></li>)}</ol>
        <p className="mt-6 flex items-start gap-2 text-sm text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{t("Real offers, expiry dates and terms will be set by the business before launch.", "वास्तविक अफर, म्याद र सर्त सुरु हुनुअघि व्यवसायले तोक्नेछ।")}</p>
      </Section>
    </>
  );
}
