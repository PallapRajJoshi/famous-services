"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, SearchX, SlidersHorizontal, Wallet } from "lucide-react";
import { categoryBySlug, servicesIn, startingPrice, type CategorySlug } from "@/data/catalog";
import { PACKAGES } from "@/data/content";
import { detailsFor } from "@/data/catalog";
import { ServiceScene } from "@/components/art/scenes";
import { CategoryTile } from "@/components/cards/category-card";
import { PackageCard } from "@/components/cards/package-card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Accordion } from "@/components/ui/accordion";
import { Button, ButtonLink } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { EmptyState } from "@/components/ui/states";
import { Reveal } from "@/components/ui/motion";
import { useLang } from "@/components/lang-provider";
import { AreaButton } from "./area-button";
import { ServiceGrid } from "./service-grid";
import { FilterPanel, ActiveChips } from "./filter-panel";
import { CouponBanner } from "./coupon-banner";
import { DEFAULT_FILTERS, activeCount, applyFilters, sortServices, type Filters, type SortKey } from "@/lib/filters";
import { money, num } from "@/lib/format";
import { cn } from "@/lib/cn";

export function CategoryView({ slug, coupon }: { slug: CategorySlug; coupon?: string }) {
  const { t, lang } = useLang();
  const cat = categoryBySlug(slug)!;
  const all = React.useMemo(() => servicesIn(slug), [slug]);
  const [filters, setFilters] = React.useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>("recommended");
  const [sheet, setSheet] = React.useState(false);
  const results = React.useMemo(() => sortServices(applyFilters(all, filters), sort), [all, filters, sort]);
  const n = activeCount(filters);
  const price = startingPrice(slug);
  const packs = PACKAGES.filter((p) => p.art === slug);
  const subLabel = (s: string) => { const x = cat.subs.find((y) => y.slug === s); return x ? t(x.name) : s; };
  const subs = cat.subs.map((s) => ({ slug: s.slug, label: t(s.name) }));
  const faqs = detailsFor(slug).faqs;

  return (
    <>
      {/* Hero banner */}
      <div className="relative overflow-hidden border-b border-line bg-pale">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative grid items-center gap-6 py-8 sm:py-10 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px]">
          <div>
            <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Services", "सेवाहरू"), href: "/services" }, { label: t(cat.name) }]} />
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">{t(cat.name)}</h1>
            <p className="mt-2 max-w-xl text-base text-muted sm:text-lg">{t(cat.description)}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {[
                { i: BadgeCheck, l: t("Professionals reviewed before jobs", "काम अघि प्रोफेसनल समीक्षा") },
                { i: ClipboardCheck, l: t("Quote before inspection work", "निरीक्षण कामअघि कोटेसन") },
                { i: Wallet, l: t("Cash after service option", "सेवापछि नगद विकल्प") },
              ].map(({ i: I, l }) => <li key={l} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-deep shadow-sm ring-1 ring-line"><I className="h-4 w-4 text-brand" aria-hidden />{l}</li>)}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <AreaButton />
              <p className="text-sm text-muted">{price ? <>{t("From", "सुरु")} <strong className="text-brand-deep">{money(price, lang)}</strong> · {t("sample prices", "नमुना मूल्य")}</> : t("Quote-based services", "कोटेसनमा आधारित सेवा")}</p>
            </div>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-lift ring-1 ring-line md:block"><ServiceScene category={slug} seed={`${slug}-hero`} /></div>
        </Container>
      </div>

      <Section className="!py-8 sm:!py-10">
        <CouponBanner code={coupon} />

        {/* Subcategories */}
        {cat.subs.length > 1 && (
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-extrabold text-brand-deep">{t("Choose a type of work", "कामको प्रकार रोज्नुहोस्")}</h2>
            <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {cat.subs.map((s) => {
                const on = filters.sub === s.slug;
                const count = all.filter((x) => x.sub === s.slug).length;
                return (
                  <button key={s.slug} type="button" aria-pressed={on} onClick={() => setFilters({ ...filters, sub: on ? null : s.slug })}
                    className={cn("flex min-h-12 shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-left text-sm font-semibold transition-colors", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40 hover:bg-pale")}>
                    {t(s.name)}<span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", on ? "bg-white/20" : "bg-pale text-brand")}>{num(count, lang)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block" aria-label={t("Filters", "फिल्टर")}>
            <div className="sticky top-28 rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="mb-5 flex items-center justify-between"><h2 className="text-base font-extrabold text-brand-deep">{t("Filters", "फिल्टर")}</h2>{n > 0 && <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)} className="text-xs font-semibold text-brand hover:underline">{t("Reset", "रिसेट")}</button>}</div>
              <FilterPanel filters={filters} onChange={setFilters} subs={subs} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite"><strong className="text-ink">{num(results.length, lang)}</strong> {t(results.length === 1 ? "service" : "services", "सेवा")}</p>
              <div className="flex items-center gap-2.5">
                <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSheet(true)} aria-haspopup="dialog"><SlidersHorizontal className="h-4 w-4" aria-hidden />{t("Filters", "फिल्टर")}{n > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] text-white">{num(n, lang)}</span>}</Button>
                <label className="flex items-center gap-2 text-sm"><span className="sr-only sm:not-sr-only text-muted">{t("Sort", "क्रम")}</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-10 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15">
                    <option value="recommended">{t("Recommended", "सिफारिस")}</option>
                    <option value="price-asc">{t("Price: low to high", "मूल्य: कमदेखि बढी")}</option>
                    <option value="price-desc">{t("Price: high to low", "मूल्य: बढीदेखि कम")}</option>
                    <option value="duration">{t("Shortest first", "छोटो अवधि पहिले")}</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mb-4"><ActiveChips filters={filters} onChange={setFilters} subLabel={subLabel} /></div>
            {results.length ? <ServiceGrid services={results} cols={3} /> : (
              <EmptyState icon={<SearchX className="h-6 w-6" aria-hidden />} title={t("No services match these filters", "यी फिल्टरसँग मिल्ने सेवा छैन")} body={t("Try removing a filter, or send us a request and we will help you find the right service.", "कुनै फिल्टर हटाउनुहोस्, वा अनुरोध पठाउनुहोस् र हामी उपयुक्त सेवा खोज्न मद्दत गर्छौं।")}
                action={<div className="flex flex-wrap justify-center gap-2.5"><Button onClick={() => setFilters(DEFAULT_FILTERS)}>{t("Clear filters", "फिल्टर हटाउनुहोस्")}</Button><ButtonLink href="/contact" variant="outline">{t("Contact us", "सम्पर्क गर्नुहोस्")}</ButtonLink></div>} />
            )}
          </div>
        </div>
      </Section>

      {packs.length > 0 && (
        <Section tone="pale" className="!py-10 sm:!py-12">
          <SectionHeading eyebrow={t("Bundles", "प्याकेज")} title={t(`${cat.name.en} packages`, `${cat.name.ne ?? cat.name.en} प्याकेज`)} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{packs.map((p) => <PackageCard key={p.slug} pack={p} />)}</div>
        </Section>
      )}

      <Section className="!py-10 sm:!py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow={t("Good to know", "जान्न उपयोगी")} title={t(`${cat.name.en}: common questions`, `${cat.name.ne ?? cat.name.en}: सामान्य प्रश्न`)} />
            <Accordion items={faqs.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
          </div>
          <div>
            <SectionHeading eyebrow={t("Related", "सम्बन्धित")} title={t("You may also need", "तपाईंलाई यी पनि चाहिन सक्छ")} />
            <div className="grid gap-3">{cat.related.slice(0, 3).map((r) => <Reveal key={r}><CategoryTile category={categoryBySlug(r)!} /></Reveal>)}</div>
            <Link href="/services" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">{t("Browse all categories", "सबै श्रेणी हेर्नुहोस्")}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      </Section>

      {/* Mobile filter bottom sheet */}
      <Sheet open={sheet} onClose={() => setSheet(false)} side="bottom" title={t("Filters", "फिल्टर")}>
        <div className="p-5"><FilterPanel filters={filters} onChange={setFilters} subs={subs} /></div>
        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-white p-4 pb-safe">
          <Button variant="outline" className="flex-1" onClick={() => setFilters(DEFAULT_FILTERS)} disabled={n === 0}>{t("Reset", "रिसेट")}</Button>
          <Button className="flex-[2]" onClick={() => setSheet(false)}>{t("Show", "देखाउनुहोस्")} {num(results.length, lang)} {t("services", "सेवा")}</Button>
        </div>
      </Sheet>
    </>
  );
}
