import type { Metadata } from "next";
import { BadgeCheck, CalendarDays, Smartphone, TrendingUp, Users, Wallet } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { TrustCard } from "@/components/cards/trust-card";
import { ButtonLink } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { ProRegister } from "@/components/forms/pro-register";
import { FaqSection } from "@/components/home/sections";
import { PRO_FAQS, VERIFY_STEPS } from "@/data/content";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Become a professional", "प्रोफेसनल बन्नुहोस्")} — Famous Services`, description: t("Apply, get verified and receive jobs in your area.", "आवेदन दिनुहोस्, प्रमाणित हुनुहोस् र आफ्नो क्षेत्रमा काम पाउनुहोस्।") };
}

export default async function Page() {
  const { t } = await getT();
  const perks = [
    { I: TrendingUp, h: t("Jobs come to you", "काम तपाईंकहाँ आउँछ"), b: t("Get matched to customers near you in your trade.", "आफ्नो पेशामा नजिकका ग्राहकसँग जोडिनुहोस्।") },
    { I: CalendarDays, h: t("Work your hours", "आफ्नै समयमा काम"), b: t("Choose your days, hours and areas.", "आफ्नो दिन, समय र क्षेत्र रोज्नुहोस्।") },
    { I: Wallet, h: t("Clear earnings", "स्पष्ट आम्दानी"), b: t("See each job and payout in one place. Terms will be confirmed.", "प्रत्येक काम र भुक्तानी एकै ठाउँमा हेर्नुहोस्। सर्त पुष्टि हुनेछ।") },
    { I: Smartphone, h: t("Simple on your phone", "फोनमै सरल"), b: t("Accept jobs and track your schedule on mobile.", "मोबाइलमै काम स्वीकार गर्नुहोस् र तालिका हेर्नुहोस्।") },
    { I: BadgeCheck, h: t("Fair verification", "निष्पक्ष प्रमाणीकरण"), b: t("A clear checklist, no hidden steps.", "स्पष्ट चेकलिस्ट, लुकेका चरण छैनन्।") },
    { I: Users, h: t("Individuals and teams", "व्यक्ति र टोली"), b: t("Skilled individuals and small teams can apply.", "दक्ष व्यक्ति र साना टोलीले आवेदन दिन सक्छन्।") },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Become a professional", "प्रोफेसनल बन्नुहोस्") }]} />} eyebrow={t("Become a professional", "प्रोफेसनल बन्नुहोस्")} title={t("Turn Your Skills Into Opportunities", "आफ्नो सीपलाई अवसरमा बदल्नुहोस्")} body={t("Plumbers, electricians, cleaners, carpenters, technicians and more — apply, get verified and receive jobs.", "प्लम्बर, इलेक्ट्रिसियन, सफाइकर्मी, सिकर्मी, प्राविधिक र अरू — आवेदन दिनुहोस्, प्रमाणित हुनुहोस् र काम पाउनुहोस्।")}><div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="#apply" variant="accent" size="lg">{t("Apply now", "अहिले आवेदन दिनुहोस्")}</ButtonLink><ButtonLink href="/pro" variant="outline" size="lg">{t("See the portal demo", "पोर्टल डेमो हेर्नुहोस्")}</ButtonLink></div></PageHero>
      <Section><SectionHeading eyebrow={t("Why join", "किन जोडिने")} title={t("What the platform offers", "प्लेटफर्मले के दिन्छ")} body={t("No income or job-volume promises are made here — only what the product is designed to do.", "यहाँ आम्दानी वा कामको मात्राको कुनै वाचा छैन — उत्पादनले के गर्न डिजाइन गरिएको हो त्यही मात्र।")} /><Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{perks.map(({ I, h, b }) => <StaggerItem key={h}><TrustCard icon={<I className="h-6 w-6" aria-hidden />} title={h} body={b} /></StaggerItem>)}</Stagger></Section>
      <Section tone="pale" id="verification"><SectionHeading eyebrow={t("Verification", "प्रमाणीकरण")} title={t("How verification works", "प्रमाणीकरण कसरी हुन्छ")} body={t("Everyone goes through the same steps before receiving jobs.", "काम पाउनु अघि सबैले उही चरण पार गर्छन्।")} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{VERIFY_STEPS.map((v, i) => <li key={i} className="rounded-2xl border border-line bg-white p-5 shadow-card"><span className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">{i + 1}</span><h3 className="font-bold text-ink">{t(v.title)}</h3><p className="mt-1 text-sm text-muted">{t(v.body)}</p></li>)}</ol></Section>
      <Section id="apply"><div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8"><SectionHeading title={t("Apply to join", "जोडिन आवेदन दिनुहोस्")} body={t("A seven-step demo application. Nothing is uploaded or sent.", "सात चरणको डेमो आवेदन। केही अपलोड वा पठाइँदैन।")} /><ProRegister /></div></Section>
      <FaqSection faqs={PRO_FAQS} title={t("Professional questions", "प्रोफेसनल प्रश्न")} />
    </>
  );
}
