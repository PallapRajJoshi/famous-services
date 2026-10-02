import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { NotifyForm } from "@/components/forms/notify-form";
import { ServiceGrid } from "@/components/catalog/service-grid";
import { DISTRICTS, districtBySlug } from "@/data/content";
import { popularServices } from "@/data/catalog";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ district: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const d = districtBySlug((await params).district);
  if (!d) return {};
  const { t } = await getT();
  return { title: `${t("Home services in", "घरेलु सेवा")} ${t(d.name)} — Famous Services`, description: t(d.blurb) };
}
export default async function Page({ params }: P) {
  const { district } = await params;
  const d = districtBySlug(district);
  if (!d) notFound();
  const { t } = await getT();
  const others = DISTRICTS.filter((x) => x.slug !== d.slug);
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Service areas", "सेवा क्षेत्र"), href: "/areas" }, { label: t(d.name) }]} />} eyebrow={t("Service area", "सेवा क्षेत्र")} title={`${t("Home services in", "घरेलु सेवा:")} ${t(d.name)}`} body={t(d.blurb)}>
        <div className="mt-5 flex flex-wrap items-center gap-3"><Badge tone="amber">{t("Coverage being confirmed", "सेवा क्षेत्र पुष्टि हुँदैछ")}</Badge><ButtonLink href="/services" variant="accent">{t("Book a Service", "सेवा बुक गर्नुहोस्")}</ButtonLink></div>
      </PageHero>
      <Section className="!pb-6 !pt-10"><SectionHeading eyebrow={t("Neighbourhoods", "टोलहरू")} title={t("Planned neighbourhoods", "योजनाबद्ध टोलहरू")} body={t("Not a promise of coverage — the team confirms your exact location when you book.", "सेवा क्षेत्रको वाचा होइन — बुकिङका बेला टोलीले तपाईंको ठ्याक्कै स्थान पुष्टि गर्छ।")} />
        <ul className="flex flex-wrap gap-2.5">{d.neighbourhoods.map((n) => <li key={n} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm">{n}</li>)}</ul></Section>
      <Section className="!pt-10"><SectionHeading eyebrow={t("Popular", "लोकप्रिय")} title={t("Popular services to start with", "सुरु गर्न लोकप्रिय सेवा")} /><ServiceGrid services={popularServices().slice(0, 4)} /></Section>
      <Section tone="pale"><div className="grid gap-10 lg:grid-cols-2"><div><SectionHeading title={`${t(d.name)}: ${t("questions", "प्रश्न")}`} /><Accordion items={d.faqs.map((f) => ({ q: t(f.q), a: t(f.a) }))} /></div><div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"><NotifyForm district={d.slug} /></div></div>
        <p className="mt-8 text-sm text-muted">{t("Other areas:", "अन्य क्षेत्र:")} {others.map((o, i) => <span key={o.slug}>{i > 0 && " · "}<a href={`/areas/${o.slug}`} className="font-semibold text-brand hover:underline">{t(o.name)}</a></span>)}</p></Section>
    </>
  );
}
