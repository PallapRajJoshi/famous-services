import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Badge } from "@/components/ui/badge";
import { NotifyForm } from "@/components/forms/notify-form";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { DISTRICTS } from "@/data/content";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Service areas", "सेवा क्षेत्र")} — Famous Services`, description: t("Planned service areas across Kathmandu, Lalitpur and Bhaktapur.", "काठमाडौं, ललितपुर र भक्तपुरमा योजनाबद्ध सेवा क्षेत्र।") };
}

export default async function Page() {
  const { t } = await getT();
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Service areas", "सेवा क्षेत्र") }]} />} eyebrow={t("Service areas", "सेवा क्षेत्र")} title={t("Kathmandu Valley, area by area", "काठमाडौं उपत्यका, क्षेत्र-क्षेत्र गरी")} body={t("We plan to serve Kathmandu, Lalitpur and Bhaktapur. Coverage opens one area at a time — the neighbourhoods below are planned, not yet promised.", "हामी काठमाडौं, ललितपुर र भक्तपुरमा सेवा दिने योजनामा छौं। सेवा एक-एक क्षेत्र गरी खुल्छ — तलका टोल योजनामा छन्, अहिले वाचा गरिएको होइन।")} />
      <Section className="!pt-10">
        <Stagger className="grid gap-5 lg:grid-cols-3">{DISTRICTS.map((d) => (
          <StaggerItem key={d.slug} className="h-full"><Link href={`/areas/${d.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
            <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-pale text-brand transition-colors group-hover:bg-brand group-hover:text-white"><MapPin className="h-6 w-6" aria-hidden /></span><Badge tone="amber">{t("Planned", "योजनामा")}</Badge></div>
            <h2 className="mt-4 text-xl font-extrabold text-brand-deep">{t(d.name)}</h2>
            <p className="mt-1.5 text-sm text-muted">{t(d.blurb)}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">{d.neighbourhoods.slice(0, 8).map((n) => <li key={n} className="rounded-full bg-pale px-2.5 py-1 text-xs font-medium text-ink">{n}</li>)}{d.neighbourhoods.length > 8 && <li className="px-1 py-1 text-xs text-muted">+{d.neighbourhoods.length - 8}</li>}</ul>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand">{t("View area", "क्षेत्र हेर्नुहोस्")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
          </Link></StaggerItem>))}</Stagger>
      </Section>
      <Section tone="pale"><div className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"><SectionHeading title={t("Not sure if we cover you?", "तपाईंको क्षेत्रमा सेवा छ कि छैन थाहा छैन?")} body={t("You can still choose your area while booking; the team confirms feasibility. Or ask to be told when it opens.", "बुकिङका बेला पनि क्षेत्र रोज्न सकिन्छ; टोलीले सम्भाव्यता पुष्टि गर्छ। वा क्षेत्र खुल्दा जानकारी माग्नुहोस्।")} /><NotifyForm /></div></Section>
    </>
  );
}
