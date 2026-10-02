import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { ServiceScene } from "@/components/art/scenes";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ServiceGrid } from "@/components/catalog/service-grid";
import { GUIDES } from "@/data/content";
import { GUIDE_CATEGORY } from "@/data/guides";
import { categoryBySlug, servicesIn } from "@/data/catalog";
import { getT } from "@/lib/lang-server";
import { imageKey } from "@/config/images";

type P = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) return {};
  const { t } = await getT();
  return { title: `${t(g.title)} — Famous Services`, description: t(g.excerpt) };
}
export default async function Page({ params }: P) {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();
  const { t } = await getT();
  const cat = categoryBySlug(GUIDE_CATEGORY[g.slug] ?? "handyman")!;
  return (
    <>
      <Container className="max-w-3xl pt-5 sm:pt-7">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Guides", "मार्गदर्शन"), href: "/guides" }, { label: t(g.title) }]} />
        <Badge tone="brand">{t(g.tag)}</Badge>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">{t(g.title)}</h1>
        <p className="mt-3 text-lg text-muted">{t(g.excerpt)}</p>
        <div className="mt-6 aspect-[16/9] overflow-hidden rounded-3xl shadow-card ring-1 ring-line"><ServiceScene category={cat.slug} seed={g.slug} photo={imageKey.guide(g.slug)} /></div>
        <h2 className="mb-4 mt-8 text-xl font-extrabold text-brand-deep">{t("Checklist", "चेकलिस्ट")}</h2>
        <ol className="space-y-3">{g.tips.map((tip, i) => <li key={i} className="flex gap-3.5 rounded-2xl border border-line bg-white p-4 shadow-card"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pale text-sm font-extrabold text-brand">{i + 1}</span><p className="pt-0.5 text-[15px] leading-relaxed text-ink">{t(tip)}</p></li>)}</ol>
        <p className="mt-6 flex items-start gap-2 rounded-xl bg-pale p-4 text-sm text-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{t("General guidance only. For anything unsafe, such as electrical faults, stop and call a qualified professional.", "सामान्य मार्गदर्शन मात्र। बिजुलीको खराबी जस्ता असुरक्षित कुरामा रोकिएर योग्य प्रोफेसनललाई बोलाउनुहोस्।")}</p>
      </Container>
      <Section tone="pale" className="mt-12"><SectionHeading eyebrow={t("Need a hand?", "सहयोग चाहियो?")} title={`${t(cat.name)} ${t("services", "सेवाहरू")}`} action={<Link href={`/services/${cat.slug}`} className="text-sm font-bold text-brand hover:underline">{t("View all", "सबै हेर्नुहोस्")} →</Link>} /><ServiceGrid services={servicesIn(cat.slug).slice(0, 4)} /></Section>
    </>
  );
}
