import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { ServiceScene } from "@/components/art/scenes";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { GUIDES } from "@/data/content";
import { GUIDE_CATEGORY } from "@/data/guides";
import { getT } from "@/lib/lang-server";
import { imageKey } from "@/config/images";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Guides", "मार्गदर्शन")} — Famous Services`, description: t("Short, practical home-care guides.", "छोटा, व्यावहारिक घर हेरचाह मार्गदर्शन।") };
}
export default async function Page() {
  const { t } = await getT();
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Guides", "मार्गदर्शन") }]} />} eyebrow={t("Guides", "मार्गदर्शन")} title={t("Practical home-care guides", "व्यावहारिक घर हेरचाह मार्गदर्शन")} body={t("Short checklists to help you decide what needs doing and when to call a professional.", "के गर्नुपर्छ र कहिले प्रोफेसनल बोलाउने निर्णय गर्न छोटा चेकलिस्ट।")} />
      <Section className="!pt-10"><Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{GUIDES.map((g) => (
        <StaggerItem key={g.slug} className="h-full"><Link href={`/guides/${g.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
          <div className="aspect-[16/9] overflow-hidden"><div className="h-full w-full transition-transform duration-500 group-hover:scale-105"><ServiceScene category={GUIDE_CATEGORY[g.slug] ?? "handyman"} seed={g.slug} photo={imageKey.guide(g.slug)} /></div></div>
          <div className="flex flex-1 flex-col p-5"><Badge tone="brand" className="self-start">{t(g.tag)}</Badge><h2 className="mt-2.5 text-lg font-bold leading-snug text-ink">{t(g.title)}</h2><p className="mt-1.5 text-sm text-muted">{t(g.excerpt)}</p><span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand">{t("Read guide", "मार्गदर्शन पढ्नुहोस्")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
        </Link></StaggerItem>))}</Stagger></Section>
    </>
  );
}
