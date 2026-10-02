"use client";
import * as React from "react";
import { Search, SearchX, X } from "lucide-react";
import { CATEGORIES, GROUPS, SERVICES, popularServices } from "@/data/catalog";
import { CategoryTile } from "@/components/cards/category-card";
import { Container, Section, SectionHeading, PageHero } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { EmptyState } from "@/components/ui/states";
import { Button, ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { useLang } from "@/components/lang-provider";
import { ServiceGrid } from "./service-grid";
import { AreaButton } from "./area-button";
import { CouponBanner } from "./coupon-banner";
import { SEARCH_SUGGESTIONS, searchServices } from "@/lib/utils";
import { num } from "@/lib/format";
import { searchListings } from "@/lib/rental-filters";
import { ListingMiniList } from "@/components/rentals/search-results";
import { RentalsBand } from "@/components/rentals/rentals-band";

export function ServicesExplorer({ initialQ = "", coupon }: { initialQ?: string; coupon?: string }) {
  const { t, lang } = useLang();
  const [q, setQ] = React.useState(initialQ);
  const res = React.useMemo(() => searchServices(q, lang, 40), [q, lang]);
  const homes = React.useMemo(() => searchListings(q, 4), [q]);
  const searching = q.trim().length > 0;
  React.useEffect(() => {
    const u = new URL(window.location.href);
    if (q.trim()) u.searchParams.set("q", q.trim()); else u.searchParams.delete("q");
    window.history.replaceState(null, "", u.toString());
  }, [q]);

  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Services", "सेवाहरू") }]} />} eyebrow={t("Service catalogue", "सेवा क्याटलग")} title={t("Every home service, in one place", "घरका हरेक सेवा, एउटै ठाउँमा")} body={t(`${num(CATEGORIES.length, "en")} categories and ${num(SERVICES.length, "en")} services in this prototype. Prices are samples.`, `यस प्रोटोटाइपमा ${num(CATEGORIES.length, "ne")} श्रेणी र ${num(SERVICES.length, "ne")} सेवा। मूल्य नमुना हुन्।`)}>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor="svc-q" className="sr-only">{t("Search services", "सेवा खोज्नुहोस्")}</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
            <input id="svc-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Search e.g. tap, AC, deep cleaning…", "खोज्नुहोस् जस्तै: धारा, एसी, डिप क्लिनिङ…")} className="h-[52px] w-full rounded-xl border border-line bg-white pl-12 pr-11 text-base text-ink shadow-sm placeholder:text-muted/70 hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" />
            {q && <button type="button" onClick={() => setQ("")} aria-label={t("Clear search", "खोज हटाउनुहोस्")} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-pale hover:text-ink"><X className="h-4 w-4" aria-hidden /></button>}
          </div>
          <AreaButton className="h-[52px]" />
        </form>
        {!searching && <ul className="mt-4 flex flex-wrap gap-2" aria-label={t("Suggestions", "सुझावहरू")}>{SEARCH_SUGGESTIONS.slice(0, 6).map((s) => <li key={s.q}><button type="button" onClick={() => setQ(lang === "ne" ? s.ne : s.en)} className="h-9 rounded-full bg-white px-3.5 text-[13px] font-semibold text-brand-deep ring-1 ring-line transition hover:bg-pale">{lang === "ne" ? s.ne : s.en}</button></li>)}</ul>}
      </PageHero>

      <Section className="!py-8 sm:!py-12">
        <CouponBanner code={coupon} />
        {searching ? (
          <div aria-live="polite">
            <h2 className="mb-5 text-xl font-extrabold text-brand-deep">{num(res.services.length + homes.length, lang)} {t(res.services.length + homes.length === 1 ? "result for" : "results for", "नतिजा:")} “{q.trim()}”</h2>
            {res.categories.length > 0 && <div className="mb-8 grid gap-3 sm:grid-cols-2">{res.categories.map((c) => <CategoryTile key={c.slug} category={c} />)}</div>}
            {homes.length > 0 && <div className="mb-8"><h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">{t("Rentals & Property", "भाडा तथा सम्पत्ति")}</h3><ListingMiniList items={homes} /></div>}
            {res.services.length ? <ServiceGrid services={res.services} /> : homes.length ? null : (
              <EmptyState icon={<SearchX className="h-6 w-6" aria-hidden />} title={t("We could not find that service", "त्यो सेवा भेटिएन")} body={t("Try a simpler word, browse the categories below, or tell us what you need.", "सरल शब्द प्रयोग गर्नुहोस्, तलका श्रेणी हेर्नुहोस्, वा के चाहिन्छ भन्नुहोस्।")} action={<div className="flex flex-wrap justify-center gap-2.5"><Button onClick={() => setQ("")}>{t("Browse categories", "श्रेणी हेर्नुहोस्")}</Button><ButtonLink href="/contact" variant="outline">{t("Ask us", "हामीलाई सोध्नुहोस्")}</ButtonLink></div>} />
            )}
          </div>
        ) : (
          <>
            <RentalsBand variant="strip" />
            <div className="space-y-12">
              {GROUPS.map((g) => {
                const cats = CATEGORIES.filter((c) => c.group === g.slug);
                if (!cats.length) return null;
                return (
                  <section key={g.slug} aria-labelledby={`g-${g.slug}`}>
                    <Reveal>
                      <h2 id={`g-${g.slug}`} className="text-xl font-extrabold text-brand-deep sm:text-2xl">{t(g.name)}</h2>
                      <p className="mt-1 text-sm text-muted">{t(g.blurb)}</p>
                    </Reveal>
                    <Stagger className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{cats.map((c) => <StaggerItem key={c.slug}><CategoryTile category={c} /></StaggerItem>)}</Stagger>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </Section>

      {!searching && (
        <Section tone="pale" className="!py-10 sm:!py-14">
          <SectionHeading eyebrow={t("Popular right now", "हाल लोकप्रिय")} title={t("Popular services", "लोकप्रिय सेवाहरू")} body={t("Starter picks while real booking data builds up. Prices are samples.", "वास्तविक बुकिङ डेटा बन्दै जाँदा सुरुवाती छनोट। मूल्य नमुना हुन्।")} />
          <ServiceGrid services={popularServices().slice(0, 8)} />
        </Section>
      )}
    </>
  );
}
