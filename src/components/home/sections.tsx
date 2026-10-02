"use client";
import * as React from "react";
import Link from "next/link";
import { BadgeCheck, CalendarCheck, CalendarDays, ClipboardCheck, Headphones, MapPin, Receipt, Search, ShieldCheck, Smartphone, Star, Wallet, Wrench, Building2, ArrowRight, TrendingUp, UserCheck, Lightbulb, SprayCan, Truck, Hammer } from "lucide-react";
import { Section, SectionHeading, Container } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem, Counter } from "@/components/ui/motion";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { TrustCard } from "@/components/cards/trust-card";
import { PackageCard } from "@/components/cards/package-card";
import { OfferCard } from "@/components/cards/offer-card";
import { ProfessionalCard } from "@/components/cards/pro-card";
import { ReviewCard } from "@/components/cards/review-card";
import { ServiceScene } from "@/components/art/scenes";
import { useLang } from "@/components/lang-provider";
import { DISTRICTS, HOME_FAQS, OFFERS, PACKAGES, PROS, REVIEWS, VERIFY_STEPS } from "@/data/content";
import { CATEGORIES, SERVICES } from "@/data/catalog";
import { num } from "@/lib/format";
import { CallButton, WhatsAppButton } from "@/components/layout/contact-actions";
import { ArrowLink } from "./hero";

/* ───────── Catalogue facts strip (real counts from the data, not marketing numbers) ───────── */
export function FactsStrip() {
  const { t, lang } = useLang();
  const f = [
    { v: DISTRICTS.length, l: t("districts planned", "जिल्ला योजनामा") },
    { v: CATEGORIES.length, l: t("service categories", "सेवा श्रेणी") },
    { v: SERVICES.length, l: t("services in the catalogue", "क्याटलगमा सेवा") },
    { v: 6, l: t("two-hour booking windows", "दुई घण्टाका बुकिङ समय") },
  ];
  return (
    <div className="border-y border-line bg-white">
      <Container className="grid grid-cols-2 gap-y-5 py-6 md:grid-cols-4">
        {f.map((x) => (
          <div key={x.l} className="text-center">
            <p className="text-3xl font-extrabold text-brand-deep sm:text-4xl"><Counter value={x.v} format={(n) => num(n, lang)} /></p>
            <p className="mt-1 text-xs font-medium text-muted sm:text-sm">{x.l}</p>
          </div>
        ))}
      </Container>
      <p className="border-t border-line bg-pale/60 py-2 text-center text-[11px] text-muted">{t("Catalogue counts of this prototype — not customer or booking statistics.", "यो प्रोटोटाइपको क्याटलग गणना — ग्राहक वा बुकिङ तथ्याङ्क होइन।")}</p>
    </div>
  );
}

/* ───────── 6. Packages & seasonal offers ───────── */
export function PackagesOffers() {
  const { t } = useLang();
  return (
    <Section tone="pale" labelledBy="po-h">
      <SectionHeading id="po-h" eyebrow={t("Packages & offers", "प्याकेज तथा अफर")} title={t("Bundle and save on home care", "घर हेरचाह प्याकेजमा बचत गर्नुहोस्")} body={t("Sample packages and demo coupons show how bundles and offers will look.", "नमुना प्याकेज र डेमो कुपनले बन्डल र अफर कस्ता देखिन्छन् भन्ने देखाउँछन्।")} action={<ArrowLink href="/packages">{t("All packages", "सबै प्याकेज")}</ArrowLink>} />
      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.slice(0, 3).map((p) => <StaggerItem key={p.slug}><PackageCard pack={p} /></StaggerItem>)}
      </Stagger>
      <div className="mt-10 flex items-end justify-between gap-4">
        <h3 className="text-xl font-extrabold text-brand-deep">{t("Seasonal offers", "मौसमी अफर")}</h3>
        <ArrowLink href="/offers">{t("All offers", "सबै अफर")}</ArrowLink>
      </div>
      <Stagger className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {OFFERS.slice(0, 3).map((o) => <StaggerItem key={o.code}><OfferCard offer={o} /></StaggerItem>)}
      </Stagger>
    </Section>
  );
}

/* ───────── 7. How it works ───────── */
export function useSteps() {
  const { t } = useLang();
  return [
    { icon: Search, title: t("Choose", "छान्नुहोस्"), body: t("Pick a service and tell us your area.", "सेवा रोज्नुहोस् र आफ्नो क्षेत्र बताउनुहोस्।") },
    { icon: CalendarCheck, title: t("Book", "बुक गर्नुहोस्"), body: t("Choose a date and a two-hour time window.", "मिति र दुई घण्टाको समय छान्नुहोस्।") },
    { icon: UserCheck, title: t("Professional arrives", "प्रोफेसनल आउँछन्"), body: t("A verified professional is assigned and comes to you.", "प्रमाणित प्रोफेसन खटिन्छन् र तपाईंकहाँ आउँछन्।") },
    { icon: ClipboardCheck, title: t("Service completed", "सेवा सम्पन्न"), body: t("The work is done and you check it with them.", "काम सकिन्छ र तपाईं उनीहरूसँग जाँच्नुहुन्छ।") },
    { icon: Star, title: t("Pay & review", "भुक्तानी र समीक्षा"), body: t("Pay as chosen and leave honest feedback.", "रोजेअनुसार भुक्तानी गर्नुहोस् र इमानदार प्रतिक्रिया दिनुहोस्।") },
  ];
}
export function HowItWorks({ full }: { full?: boolean }) {
  const { t, lang } = useLang();
  const steps = useSteps();
  return (
    <Section labelledBy="how-h">
      <SectionHeading id="how-h" align="center" eyebrow={t("How it works", "कसरी काम गर्छ")} title={t("Five simple steps from problem to done", "समस्यादेखि समाधानसम्म पाँच सरल चरण")} />
      <Stagger className="relative grid gap-4 md:grid-cols-5">
        <span aria-hidden className="absolute left-[10%] right-[10%] top-9 hidden h-0.5 bg-gradient-to-r from-brand/10 via-brand/40 to-brand/10 md:block" />
        {steps.map((s, i) => (
          <StaggerItem key={s.title}>
            <div className="relative flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-card md:block md:border-0 md:bg-transparent md:p-0 md:text-center md:shadow-none">
              <div className="relative mx-0 grid h-[72px] w-[72px] shrink-0 place-items-center rounded-2xl bg-pale text-brand md:mx-auto md:mb-4 md:bg-white md:shadow-lift md:ring-4 md:ring-pale">
                <s.icon className="h-8 w-8" strokeWidth={1.7} aria-hidden />
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-amber text-xs font-extrabold text-ink">{num(i + 1, lang)}</span>
              </div>
              <div><h3 className="text-base font-bold text-ink">{s.title}</h3><p className="mt-1 text-sm text-muted">{s.body}</p></div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      {!full && <div className="mt-9 text-center"><ButtonLink href="/how-it-works" variant="outline">{t("See the full walkthrough", "पूरा विवरण हेर्नुहोस्")}</ButtonLink></div>}
    </Section>
  );
}

/* ───────── 8. Why Famous Services ───────── */
export function WhySection() {
  const { t } = useLang();
  const items = [
    { icon: BadgeCheck, title: t("Verified before they work", "काम अघि प्रमाणित"), body: t("Professionals submit ID, address proof and a photo, and are reviewed before receiving jobs.", "प्रोफेसनलले परिचय, ठेगानाको प्रमाण र फोटो बुझाउँछन् र काम पाउनु अघि समीक्षा हुन्छ।") },
    { icon: Receipt, title: t("Prices you see first", "पहिले देखिने मूल्य"), body: t("Fixed prices are shown upfront. Complex jobs get an inspection quote before work starts.", "निश्चित मूल्य अगाडि नै देखिन्छ। जटिल कामका लागि सुरु हुनु अघि निरीक्षण कोटेसन दिइन्छ।") },
    { icon: CalendarDays, title: t("You pick the time", "समय तपाईंले रोज्नुहुन्छ"), body: t("Choose a two-hour window that fits your day and reschedule if plans change.", "तपाईंको दिनअनुसार दुई घण्टाको समय रोज्नुहोस् र योजना बदलिए समय फेर्नुहोस्।") },
    { icon: Headphones, title: t("Real people to help", "सहयोग गर्ने वास्तविक मान्छे"), body: t("Call or WhatsApp the team. Dispatch is managed by people, not a black box.", "टोलीलाई फोन वा ह्वाट्सएप गर्नुहोस्। खटाउने काम मान्छेहरूले व्यवस्थापन गर्छन्।") },
    { icon: ShieldCheck, title: t("Guarantee, clearly stated", "स्पष्ट ग्यारेन्टी"), body: t("Guarantee terms will be published before launch — never vague promises.", "ग्यारेन्टीका सर्त सुरु हुनुअघि प्रकाशित हुनेछन् — अस्पष्ट वाचा होइन।") },
    { icon: Smartphone, title: t("Made for phones", "फोनका लागि बनाइएको"), body: t("Book in a few taps in English or नेपाली, even on a slow connection.", "अंग्रेजी वा नेपालीमा केही ट्यापमै बुक गर्नुहोस्, ढिलो इन्टरनेटमा पनि।") },
  ];
  return (
    <Section tone="pale" labelledBy="why-h">
      <SectionHeading id="why-h" eyebrow={t("Why Famous Services", "किन Famous Services")} title={t("Home help you can actually rely on", "साँच्चै भरोसा गर्न सकिने घरेलु सहयोग")} body={t("We focus on clarity: who comes, what it costs and when they arrive.", "हामी स्पष्टतामा ध्यान दिन्छौं: को आउँछ, कति लाग्छ र कहिले आउँछ।")} />
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((x) => <StaggerItem key={x.title}><TrustCard icon={<x.icon className="h-6 w-6" aria-hidden />} title={x.title} body={x.body} /></StaggerItem>)}
      </Stagger>
    </Section>
  );
}

/* ───────── 9. Verified professionals ───────── */
export function ProsSection() {
  const { t } = useLang();
  return (
    <Section labelledBy="pros-h">
      <SectionHeading id="pros-h" eyebrow={t("Verified professionals", "प्रमाणित प्रोफेसनल")} title={t("A careful process before anyone gets a job", "कसैले काम पाउनु अघि सावधानीपूर्ण प्रक्रिया")} body={t("This is how professionals will be reviewed. The profiles below are demo examples — not real people.", "प्रोफेसनलको समीक्षा यसरी हुनेछ। तलका प्रोफाइल डेमो उदाहरण हुन् — वास्तविक व्यक्ति होइनन्।")} action={<ArrowLink href="/become-a-professional#verification">{t("Verification process", "प्रमाणीकरण प्रक्रिया")}</ArrowLink>} />
      <ol className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {VERIFY_STEPS.map((s, i) => (
          <Reveal as="li" key={i} delay={i * 0.05} className="relative rounded-2xl border border-line bg-white p-4 shadow-card">
            <span className="mb-2 grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
            <h3 className="text-[15px] font-bold text-ink">{t(s.title)}</h3>
            <p className="mt-1 text-sm text-muted">{t(s.body)}</p>
          </Reveal>
        ))}
      </ol>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {PROS.slice(0, 3).map((p) => <StaggerItem key={p.id}><ProfessionalCard pro={p} /></StaggerItem>)}
      </Stagger>
    </Section>
  );
}

/* ───────── 10. Service areas ───────── */
export function AreasSection() {
  const { t } = useLang();
  return (
    <Section tone="pale" labelledBy="areas-h">
      <SectionHeading id="areas-h" eyebrow={t("Service areas", "सेवा क्षेत्र")} title={t("Kathmandu, Lalitpur and Bhaktapur", "काठमाडौं, ललितपुर र भक्तपुर")} body={t("Coverage is planned across the Valley and opens area by area. Tell us your area and we will notify you.", "सेवा उपत्यकाभर योजनामा छ र क्षेत्र-क्षेत्र गरी खुल्छ। आफ्नो क्षेत्र बताउनुहोस्, हामी जानकारी दिन्छौं।")} action={<ArrowLink href="/areas">{t("All areas", "सबै क्षेत्र")}</ArrowLink>} />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {DISTRICTS.map((d) => (
          <StaggerItem key={d.slug}>
            <Link href={`/areas/${d.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-pale text-brand"><MapPin className="h-5 w-5" aria-hidden /></span><h3 className="text-lg font-bold text-ink">{t(d.name)}</h3></div>
              <p className="mt-3 text-sm text-muted">{t(d.blurb)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{d.neighbourhoods.slice(0, 6).map((n) => <Badge key={n} tone="outline">{n}</Badge>)}<Badge tone="brand">+{num(d.neighbourhoods.length - 6)}</Badge></div>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand">{t("View area", "क्षेत्र हेर्नुहोस्")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ───────── 11. Reviews (demo) ───────── */
export function ReviewsSection() {
  const { t } = useLang();
  const rail = React.useRef<HTMLDivElement>(null);
  return (
    <Section labelledBy="rev-h">
      <SectionHeading id="rev-h" eyebrow={t("Customer reviews", "ग्राहक समीक्षा")} title={t("Honest reviews, once real ones exist", "वास्तविक समीक्षा आएपछि इमानदार समीक्षा")} body={t("These are clearly marked demo reviews showing the layout. Ratings and counts will appear only when real, verified reviews exist.", "यी लेआउट देखाउने डेमो समीक्षा हुन्। वास्तविक, प्रमाणित समीक्षा आएपछि मात्र रेटिङ र गणना देखिन्छ।")} action={<ArrowLink href="/reviews">{t("All reviews", "सबै समीक्षा")}</ArrowLink>} />
      <div ref={rail} className="no-scrollbar snap-x-row -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {REVIEWS.slice(0, 3).map((r) => <div key={r.id} className="w-[84%] shrink-0 sm:w-[46%] lg:w-auto"><ReviewCard review={r} /></div>)}
      </div>
    </Section>
  );
}

/* ───────── 12. Business & corporate ───────── */
export function BusinessSection() {
  const { t } = useLang();
  const items = [
    { icon: SprayCan, l: t("Office cleaning", "कार्यालय सफाइ") }, { icon: Wrench, l: t("Facility maintenance", "सुविधा मर्मत") }, { icon: Lightbulb, l: t("Commercial electrical", "व्यावसायिक इलेक्ट्रिकल") },
    { icon: Hammer, l: t("Commercial painting", "व्यावसायिक रङरोगन") }, { icon: Truck, l: t("Office relocation", "कार्यालय स्थानान्तरण") }, { icon: Building2, l: t("Corporate support", "कर्पोरेट सहयोग") },
  ];
  return (
    <Section tone="deep" labelledBy="biz-h">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-amber">{t("Business & corporate", "व्यवसाय तथा कर्पोरेट")}</p>
          <h2 id="biz-h" className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">{t("One accountable partner for your workplace", "तपाईंको कार्यस्थलका लागि एउटै जिम्मेवार साझेदार")}</h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-white/75">{t("Scheduled cleaning, multi-trade maintenance and relocation — quoted in writing, with recurring contract options.", "तालिकाबद्ध सफाइ, बहु-पेशा मर्मत र स्थानान्तरण — लिखित कोटेसन र आवर्ती सम्झौताका विकल्पसहित।")}</p>
          <div className="mt-7 flex flex-wrap gap-3"><ButtonLink href="/business#quote" variant="accent" size="lg">{t("Request a Business Quote", "व्यावसायिक कोटेसन माग्नुहोस्")}</ButtonLink><ButtonLink href="/business" variant="outlineLight" size="lg">{t("Business services", "व्यावसायिक सेवा")}</ButtonLink></div>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((x) => (
            <StaggerItem key={x.l}><div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 transition hover:bg-white/[0.12]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-amber"><x.icon className="h-5 w-5" aria-hidden /></span><span className="text-sm font-semibold text-white">{x.l}</span></div></StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ───────── 13. Become a professional ───────── */
export function JoinSection() {
  const { t } = useLang();
  const pts = [
    { icon: TrendingUp, l: t("Get booked by customers nearby", "नजिकका ग्राहकबाट बुकिङ पाउनुहोस्") },
    { icon: CalendarDays, l: t("Choose the hours you work", "काम गर्ने समय आफैं रोज्नुहोस्") },
    { icon: Wallet, l: t("Clear earnings and payout screens", "स्पष्ट आम्दानी र भुक्तानी स्क्रिन") },
  ];
  return (
    <Section labelledBy="join-h">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-pale to-white p-6 sm:p-10 lg:p-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t("Become a professional", "प्रोफेसनल बन्नुहोस्")}</p>
            <h2 id="join-h" className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl lg:text-4xl">{t("Turn Your Skills Into Opportunities", "आफ्नो सीपलाई अवसरमा बदल्नुहोस्")}</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{t("Plumbers, electricians, cleaners, carpenters, technicians and more — apply, get verified and receive jobs in your area.", "प्लम्बर, इलेक्ट्रिसियन, सफाइकर्मी, सिकर्मी, प्राविधिक र अरू — आवेदन दिनुहोस्, प्रमाणित हुनुहोस् र आफ्नो क्षेत्रमा काम पाउनुहोस्।")}</p>
            <ul className="mt-5 space-y-2.5">{pts.map((p) => <li key={p.l} className="flex items-center gap-3 text-[15px] font-medium text-ink"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand shadow-card"><p.icon className="h-[18px] w-[18px]" aria-hidden /></span>{p.l}</li>)}</ul>
            <div className="mt-7 flex flex-wrap gap-3"><ButtonLink href="/become-a-professional#apply" variant="primary" size="lg">{t("Apply now", "अहिले आवेदन दिनुहोस्")}</ButtonLink><ButtonLink href="/become-a-professional" variant="outline" size="lg">{t("Learn more", "थप जान्नुहोस्")}</ButtonLink></div>
          </Reveal>
          <div className="hidden overflow-hidden rounded-2xl shadow-lift lg:block"><div className="aspect-[4/3]"><ServiceScene category="handyman" seed="join" /></div></div>
        </div>
      </div>
    </Section>
  );
}

/* ───────── 14. FAQ ───────── */
export function FaqSection({ faqs = HOME_FAQS, title }: { faqs?: typeof HOME_FAQS; title?: string }) {
  const { t } = useLang();
  return (
    <Section tone="pale" labelledBy="faq-h">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading id="faq-h" eyebrow={t("FAQ", "बारम्बार सोधिने प्रश्न")} title={title ?? t("Questions, answered", "प्रश्नहरूको जवाफ")} body={t("Can't find what you need? Our help center and support team are one tap away.", "चाहेको भेटिएन? सहायता केन्द्र र सहयोग टोली एक ट्यापमै छन्।")} />
          <ButtonLink href="/help" variant="outline">{t("Visit help center", "सहायता केन्द्र")}</ButtonLink>
        </div>
        <Accordion items={faqs.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
      </div>
    </Section>
  );
}

/* ───────── 15. WhatsApp / contact CTA ───────── */
export function ContactCta() {
  const { t } = useLang();
  return (
    <Section labelledBy="cta-h">
      <div className="relative overflow-hidden rounded-3xl bg-brand p-7 text-white sm:p-10 lg:p-14" data-dark>
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 id="cta-h" className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("Prefer to talk? We're one message away.", "कुरा गर्न मन छ? हामी एक सन्देश टाढा छौं।")}</h2>
            <p className="mt-2.5 text-base text-white/80">{t("Call or WhatsApp the team to book, ask about a quote, or get help with an existing booking.", "बुक गर्न, कोटेसन सोध्न वा बुकिङमा सहयोग लिन टोलीलाई फोन वा ह्वाट्सएप गर्नुहोस्।")}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><WhatsAppButton variant="light" size="lg" label={t("Chat on WhatsApp", "ह्वाट्सएपमा च्याट")} className="w-full sm:w-auto" /><CallButton variant="outlineLight" size="lg" label={t("Call us", "फोन गर्नुहोस्")} className="w-full sm:w-auto" /></div>
        </div>
      </div>
    </Section>
  );
}

