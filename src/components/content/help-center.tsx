"use client";
import * as React from "react";
import { Search, SearchX } from "lucide-react";
import { HELP_TOPICS } from "@/data/content";
import { Container, Section, SectionHeading, PageHero } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Accordion } from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/states";
import { NamedIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import { CallButton, WhatsAppButton } from "@/components/layout/contact-actions";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export function HelpCenter() {
  const { t, lang } = useLang();
  const [q, setQ] = React.useState("");
  const [topic, setTopic] = React.useState<string>("all");
  const term = q.trim().toLowerCase();
  const topics = HELP_TOPICS.map((tp) => ({ ...tp, items: tp.items.filter((i) => (topic === "all" || topic === tp.id) && (!term || `${i.q.en} ${i.a.en} ${i.q.ne ?? ""} ${i.a.ne ?? ""}`.toLowerCase().includes(term))) })).filter((tp) => tp.items.length);
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Help Center", "सहायता केन्द्र") }]} />} eyebrow={t("Help Center", "सहायता केन्द्र")} title={t("How can we help?", "हामी कसरी मद्दत गरौं?")} body={t("Search answers about booking, pricing, payments, cancellation and safety.", "बुकिङ, मूल्य, भुक्तानी, रद्द र सुरक्षाबारे जवाफ खोज्नुहोस्।")}>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-6 max-w-xl"><label htmlFor="help-q" className="sr-only">{t("Search help", "सहायता खोज्नुहोस्")}</label><Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden /><input id="help-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Search e.g. cancel, payment, safety…", "खोज्नुहोस् जस्तै: रद्द, भुक्तानी, सुरक्षा…")} className="h-[52px] w-full rounded-xl border border-line bg-white pl-12 pr-4 text-base shadow-sm placeholder:text-muted/70 hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" /></form>
      </PageHero>
      <Section className="!pt-8">
        <div className="no-scrollbar -mx-4 mb-8 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label={t("Topics", "विषयहरू")}>
          {[{ id: "all", title: { en: "All topics", ne: "सबै विषय" }, icon: "LayoutGrid" }, ...HELP_TOPICS].map((tp) => <button key={tp.id} type="button" aria-pressed={topic === tp.id} onClick={() => setTopic(tp.id)} className={cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors", topic === tp.id ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40")}><NamedIcon name={tp.icon} className="h-4 w-4" />{t(tp.title)}</button>)}
        </div>
        {topics.length ? <div className="grid gap-8 lg:grid-cols-2">{topics.map((tp) => <section key={tp.id} aria-labelledby={`h-${tp.id}`}><h2 id={`h-${tp.id}`} className="mb-3 flex items-center gap-2.5 text-lg font-extrabold text-brand-deep"><span className="grid h-9 w-9 place-items-center rounded-lg bg-pale text-brand"><NamedIcon name={tp.icon} className="h-5 w-5" /></span>{t(tp.title)}</h2><Accordion single={false} defaultOpen={term ? 0 : null} items={tp.items.map((i) => ({ q: t(i.q), a: t(i.a) }))} /></section>)}</div>
          : <EmptyState icon={<SearchX className="h-6 w-6" aria-hidden />} title={t("No answers found", "जवाफ भेटिएन")} body={t("Try a different word, or contact us below.", "अर्को शब्द प्रयास गर्नुहोस्, वा तल सम्पर्क गर्नुहोस्।")} action={<ButtonLink href="#complaint" variant="primary">{t("Contact us", "सम्पर्क गर्नुहोस्")}</ButtonLink>} />}
      </Section>
      <Section tone="pale" id="complaint"><div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]"><div><SectionHeading title={t("Still need help?", "अझै सहयोग चाहियो?")} body={t("Reach the team directly, or file a complaint about a booking.", "टोलीलाई सिधै सम्पर्क गर्नुहोस्, वा बुकिङबारे गुनासो दर्ता गर्नुहोस्।")} /><div className="flex flex-wrap gap-3"><CallButton variant="primary" /><WhatsAppButton variant="outline" /></div></div>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8"><h3 className="mb-4 text-lg font-extrabold text-brand-deep">{t("Complaint form", "गुनासो फारम")}</h3><ContactForm kind="complaint" /></div></div></Section>
    </>
  );
}
