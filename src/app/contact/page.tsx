import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { PageHero, Section } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { CallButton, WhatsAppButton } from "@/components/layout/contact-actions";
import { SITE } from "@/data/content";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Contact", "सम्पर्क")} — Famous Services`, description: t("Call, WhatsApp or send us a message.", "फोन, ह्वाट्सएप वा सन्देश पठाउनुहोस्।") };
}

export default async function Page() {
  const { t } = await getT();
  const rows = [
    { I: Clock, h: t("Support hours", "सहयोग समय"), b: t(SITE.hours) },
    { I: Mail, h: t("Email", "इमेल"), b: SITE.email },
    { I: MapPin, h: t("Office", "कार्यालय"), b: t(SITE.address) },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Contact", "सम्पर्क") }]} />} eyebrow={t("Contact", "सम्पर्क")} title={t("Talk to a person", "मान्छेसँग कुरा गर्नुहोस्")} body={t("Call or WhatsApp to book, ask for a quote, or get help. Contact details below are placeholders until the business adds real ones.", "बुक गर्न, कोटेसन सोध्न वा सहयोगका लागि फोन वा ह्वाट्सएप गर्नुहोस्। तलका सम्पर्क विवरण व्यवसायले वास्तविक थप्नुअघि नमुना हुन्।")}><div className="mt-6 flex flex-wrap gap-3"><CallButton variant="primary" size="lg" /><WhatsAppButton variant="outline" size="lg" /></div></PageHero>
      <Section className="!pt-10"><div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <ul className="space-y-4">{rows.map(({ I, h, b }) => <li key={h} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pale text-brand"><I className="h-5 w-5" aria-hidden /></span><div><h2 className="text-sm font-bold uppercase tracking-wide text-muted">{h}</h2><p className="mt-0.5 text-[15px] font-semibold text-ink">{b}</p></div></li>)}</ul>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8"><h2 className="mb-1 text-xl font-extrabold text-brand-deep">{t("Send a message", "सन्देश पठाउनुहोस्")}</h2><p className="mb-5 text-sm text-muted">{t("Demo form — nothing is sent from this prototype.", "डेमो फारम — यो प्रोटोटाइपबाट केही पठाइँदैन।")}</p><ContactForm /></div>
      </div></Section>
    </>
  );
}
