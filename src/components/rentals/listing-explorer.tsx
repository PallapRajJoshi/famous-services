"use client";
import * as React from "react";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { DISTRICT_NAME, FACILITY, FURNISHINGS, LAND_TYPES, PROP_TYPES, ROOM_TYPES, SUITED, kindMeta, listingsOf, type Facility, type Kind, type Suited } from "@/data/rentals";
import { ServiceScene } from "@/components/art/scenes";
import { Section, PageHero } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/states";
import { Sheet } from "@/components/ui/sheet";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { useLang } from "@/components/lang-provider";
import { DEFAULT_RF, PRICE_BANDS, activeRF, applyRF, sortRF, typeOf, type RF, type RSort } from "@/lib/rental-filters";
import { num } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ListingCard } from "./listing-card";
import { DemoNote, RentalNav } from "./rental-nav";

/* ───────── small filter controls ───────── */
function Chips<T extends string>({ legend, value, options, onChange }: { legend: string; value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  const name = React.useId();
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-2.5 text-sm font-bold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.v;
          return (
            <label key={o.v} className={cn("relative inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40")}>
              <input type="radio" name={name} className="sr-only" checked={on} onChange={() => onChange(o.v)} />{o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
function Multi({ legend, options, value, onChange }: { legend: string; options: { v: Facility; label: string }[]; value: Facility[]; onChange: (v: Facility[]) => void }) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-2.5 text-sm font-bold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.v);
          return (
            <label key={o.v} className={cn("relative inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40")}>
              <input type="checkbox" className="sr-only" checked={on} onChange={() => onChange(on ? value.filter((x) => x !== o.v) : [...value, o.v])} />{o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", checked ? "border-brand bg-pale" : "border-line bg-white hover:border-brand/40")}>
      {label}
      <input type="checkbox" role="switch" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span aria-hidden className={cn("relative h-6 w-10 rounded-full transition-colors", checked ? "bg-brand" : "bg-line")}><span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", checked ? "left-[18px]" : "left-0.5")} /></span>
    </label>
  );
}

const FAC_OPTIONS: Record<Kind, Facility[]> = {
  rooms: ["wifi", "hotwater", "kitchen", "balcony", "parking", "lift"],
  land: ["water", "power", "drainage"],
  property: ["parking", "lift", "backup", "garden"],
};

function Panel({ kind, f, set }: { kind: Kind; f: RF; set: (p: Partial<RF>) => void }) {
  const { t } = useLang();
  const any = { v: "any", label: t("Any", "कुनै पनि") };
  return (
    <div className="space-y-6">
      <Chips legend={t("Budget", "बजेट")} value={f.price} onChange={(v) => set({ price: v })} options={[any, ...PRICE_BANDS[kind].map((b) => ({ v: b.v, label: t(b.label) }))]} />
      <Chips legend={t("District", "जिल्ला")} value={f.district} onChange={(v) => set({ district: v as RF["district"] })} options={[any, ...(Object.keys(DISTRICT_NAME) as (keyof typeof DISTRICT_NAME)[]).map((d) => ({ v: d as string, label: t(DISTRICT_NAME[d]) }))]} />
      {kind === "rooms" && <>
        <Chips legend={t("Suited for", "को लागि उपयुक्त")} value={f.suited} onChange={(v) => set({ suited: v as Suited | "any" })} options={[any, ...(Object.keys(SUITED) as Suited[]).map((s) => ({ v: s as string, label: t(SUITED[s]) }))]} />
        <Chips legend={t("Bathroom", "बाथरुम")} value={f.bath} onChange={(v) => set({ bath: v as RF["bath"] })} options={[any, { v: "attached", label: t("Attached only", "जोडिएको मात्र") }]} />
        <Switch label={t("Available now", "अहिले उपलब्ध")} checked={f.now} onChange={(now) => set({ now })} />
      </>}
      {kind === "land" && <>
        <Chips legend={t("Plot size", "जग्गाको आकार")} value={f.size} onChange={(v) => set({ size: v as RF["size"] })} options={[any, { v: "u4", label: t("Under 4 aana", "४ आना भन्दा कम") }, { v: "4-8", label: t("4–8 aana", "४–८ आना") }, { v: "8+", label: t("8+ aana", "८+ आना") }]} />
        <Chips legend={t("Road access", "सडक पहुँच")} value={f.road} onChange={(v) => set({ road: v as RF["road"] })} options={[any, { v: "13", label: t("13 ft or wider", "१३ फिट वा बढी") }, { v: "20", label: t("20 ft or wider", "२० फिट वा बढी") }]} />
      </>}
      {kind === "property" && <>
        <Chips legend={t("Bedrooms", "सुत्ने कोठा")} value={f.beds} onChange={(v) => set({ beds: v as RF["beds"] })} options={[any, { v: "2", label: "2" }, { v: "3", label: "3" }, { v: "4+", label: "4+" }]} />
        <Chips legend={t("Road access", "सडक पहुँच")} value={f.road} onChange={(v) => set({ road: v as RF["road"] })} options={[any, { v: "13", label: t("13 ft or wider", "१३ फिट वा बढी") }, { v: "20", label: t("20 ft or wider", "२० फिट वा बढी") }]} />
      </>}
      <Multi legend={kind === "land" ? t("Utilities nearby", "नजिकका सुविधा") : t("Facilities", "सुविधा")} value={f.facilities} onChange={(facilities) => set({ facilities })} options={FAC_OPTIONS[kind].map((x) => ({ v: x, label: t(FACILITY[x]) }))} />
    </div>
  );
}

function TypeTile({ scene, seed, name, count, on, onClick }: { scene: string; seed: string; name: string; count: number; on: boolean; onClick: () => void }) {
  const { lang } = useLang();
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      className={cn("group w-[132px] shrink-0 overflow-hidden rounded-2xl border-2 bg-white text-left transition duration-200 sm:w-[152px]", on ? "border-brand shadow-lift" : "border-line shadow-card hover:-translate-y-0.5 hover:border-brand/40")}>
      <span className="block aspect-[4/3] overflow-hidden bg-pale"><span className="block h-full w-full transition-transform duration-500 group-hover:scale-105"><ServiceScene category={scene} seed={seed} /></span></span>
      <span className={cn("flex items-center justify-between gap-1.5 px-2.5 py-2", on && "bg-brand text-white")}>
        <span className="min-w-0 truncate text-[13px] font-bold">{name}</span>
        <span className={cn("rounded-full px-1.5 py-0.5 text-[11px] font-bold", on ? "bg-white/20" : "bg-pale text-brand")}>{num(count, lang)}</span>
      </span>
    </button>
  );
}

export function ListingExplorer({ kind, initialType, initialFurn }: { kind: Kind; initialType?: string; initialFurn?: string }) {
  const { t, lang } = useLang();
  const meta = kindMeta(kind);
  const all = React.useMemo(() => listingsOf(kind), [kind]);
  const types = kind === "rooms" ? ROOM_TYPES : kind === "land" ? LAND_TYPES : PROP_TYPES;
  const [f, setF] = React.useState<RF>(() => ({
    ...DEFAULT_RF,
    type: initialType && types.some((x) => x.slug === initialType) ? initialType : null,
    furn: kind === "rooms" && FURNISHINGS.some((x) => x.slug === initialFurn) ? (initialFurn as RF["furn"]) : "any",
  }));
  const [sort, setSort] = React.useState<RSort>("recommended");
  const [sheet, setSheet] = React.useState(false);
  const set = (p: Partial<RF>) => setF((x) => ({ ...x, ...p }));
  const results = React.useMemo(() => sortRF(applyRF(kind, f), sort), [kind, f, sort]);
  const n = activeRF(kind, f);
  const extra = n + (f.type ? 1 : 0) + (f.furn !== "any" ? 1 : 0);

  React.useEffect(() => {
    const u = new URL(window.location.href);
    f.type ? u.searchParams.set("type", f.type) : u.searchParams.delete("type");
    f.furn !== "any" ? u.searchParams.set("furn", f.furn) : u.searchParams.delete("furn");
    window.history.replaceState(null, "", u.toString());
  }, [f.type, f.furn]);

  const reset = () => setF({ ...DEFAULT_RF });
  const countFor = (slug: string) => all.filter((l) => typeOf(l) === slug).length;
  const typeLabel = f.type ? t(types.find((x) => x.slug === f.type)!.name) : null;

  const chips: { key: string; label: string; clear: Partial<RF> }[] = [];
  if (typeLabel) chips.push({ key: "type", label: typeLabel, clear: { type: null } });
  if (f.furn !== "any") chips.push({ key: "furn", label: t(FURNISHINGS.find((x) => x.slug === f.furn)!.name), clear: { furn: "any" } });
  const band = PRICE_BANDS[kind].find((b) => b.v === f.price); if (band) chips.push({ key: "price", label: t(band.label), clear: { price: "any" } });
  if (f.district !== "any") chips.push({ key: "district", label: t(DISTRICT_NAME[f.district]), clear: { district: "any" } });
  if (f.suited !== "any") chips.push({ key: "suited", label: t(SUITED[f.suited]), clear: { suited: "any" } });
  if (f.bath !== "any") chips.push({ key: "bath", label: t("Attached bath", "जोडिएको बाथरुम"), clear: { bath: "any" } });
  if (f.now) chips.push({ key: "now", label: t("Available now", "अहिले उपलब्ध"), clear: { now: false } });
  if (kind === "land" && f.size !== "any") chips.push({ key: "size", label: ({ u4: t("Under 4 aana", "४ आना भन्दा कम"), "4-8": t("4–8 aana", "४–८ आना"), "8+": t("8+ aana", "८+ आना") } as Record<string, string>)[f.size], clear: { size: "any" } });
  if (kind !== "rooms" && f.road !== "any") chips.push({ key: "road", label: `${num(f.road, lang)}+ ${t("ft road", "फिट सडक")}`, clear: { road: "any" } });
  if (kind === "property" && f.beds !== "any") chips.push({ key: "beds", label: `${f.beds} ${t("bed", "कोठा")}`, clear: { beds: "any" } });
  f.facilities.forEach((x) => chips.push({ key: `f-${x}`, label: t(FACILITY[x]), clear: { facilities: f.facilities.filter((y) => y !== x) } }));

  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Rentals & Property", "भाडा तथा सम्पत्ति"), href: "/rentals" }, { label: t(meta.name) }]} />}
        eyebrow={t("Rentals & Property", "भाडा तथा सम्पत्ति")} title={t(meta.name)} body={t(meta.blurb)}>
        <RentalNav className="mt-6" />
      </PageHero>

      <Section className="!py-8 sm:!py-10">
        <DemoNote className="mb-7" />

        {/* Type tiles — the primary way to categorise */}
        <h2 className="mb-3 text-lg font-extrabold text-brand-deep">{kind === "rooms" ? t("Choose a room type", "कोठाको प्रकार रोज्नुहोस्") : kind === "land" ? t("Choose a land type", "जग्गाको प्रकार रोज्नुहोस्") : t("Choose a property type", "सम्पत्तिको प्रकार रोज्नुहोस्")}</h2>
        <div role="group" aria-label={t("Types", "प्रकार")} className="no-scrollbar -mx-4 mb-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <TypeTile scene={meta.scene} seed="all" name={t("All", "सबै")} count={all.length} on={f.type === null} onClick={() => set({ type: null })} />
          {types.map((x) => <TypeTile key={x.slug} scene={x.scene} seed={x.slug} name={t("short" in x ? x.short : x.name)} count={countFor(x.slug)} on={f.type === x.slug} onClick={() => set({ type: f.type === x.slug ? null : x.slug })} />)}
        </div>

        {/* Furnishing — second axis for rooms */}
        {kind === "rooms" && (
          <div className="mb-6">
            <div role="group" aria-label={t("Furnishing", "फर्निचर")} className="inline-flex max-w-full flex-wrap gap-1.5 rounded-2xl bg-pale p-1.5">
              {([{ slug: "any", name: { en: "Any furnishing", ne: "कुनै पनि" } }, ...FURNISHINGS] as { slug: string; name: { en: string; ne?: string } }[]).map((x) => {
                const on = f.furn === x.slug;
                return <button key={x.slug} type="button" aria-pressed={on} onClick={() => set({ furn: x.slug as RF["furn"] })} className={cn("h-10 rounded-xl px-3.5 text-sm font-bold transition-colors sm:px-4", on ? "bg-white text-brand shadow-sm ring-1 ring-line" : "text-muted hover:text-ink")}>{t(x.name)}</button>;
              })}
            </div>
            <p className="mt-2.5 max-w-2xl text-[13px] text-muted">{f.furn === "any" ? t("Furnished = ready to move in · Semi-furnished = basic fittings only · Unfurnished = empty room with power and water.", "फर्निस्ड = तुरुन्तै बस्न मिल्ने · अर्ध–फर्निस्ड = आधारभूत सामग्री मात्र · अनफर्निस्ड = बिजुली र पानीसहित खाली कोठा।") : `${t(FURNISHINGS.find((x) => x.slug === f.furn)!.desc)} ${t("Each listing says exactly what is included.", "हरेक सूचीमा के समावेश छ ठ्याक्कै लेखिएको हुन्छ।")}`}</p>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          <aside className="hidden lg:block" aria-label={t("Filters", "फिल्टर")}>
            <div className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="mb-5 flex items-center justify-between"><h2 className="text-base font-extrabold text-brand-deep">{t("Filters", "फिल्टर")}</h2>{extra > 0 && <button type="button" onClick={reset} className="text-xs font-semibold text-brand hover:underline">{t("Reset", "रिसेट")}</button>}</div>
              <Panel kind={kind} f={f} set={set} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite"><strong className="text-ink">{num(results.length, lang)}</strong> {t(results.length === 1 ? "demo listing" : "demo listings", "डेमो सूची")}</p>
              <div className="flex items-center gap-2.5">
                <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSheet(true)} aria-haspopup="dialog"><SlidersHorizontal className="h-4 w-4" aria-hidden />{t("Filters", "फिल्टर")}{n > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] text-white">{num(n, lang)}</span>}</Button>
                <label className="flex items-center gap-2 text-sm"><span className="sr-only sm:not-sr-only text-muted">{t("Sort", "क्रम")}</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value as RSort)} className="h-10 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15">
                    <option value="recommended">{t("Recommended", "सिफारिस")}</option>
                    <option value="price-asc">{t("Price: low to high", "मूल्य: कमदेखि बढी")}</option>
                    <option value="price-desc">{t("Price: high to low", "मूल्य: बढीदेखि कम")}</option>
                  </select>
                </label>
              </div>
            </div>
            {chips.length > 0 && (
              <ul className="mb-4 flex flex-wrap items-center gap-2" aria-label={t("Active filters", "सक्रिय फिल्टर")}>
                {chips.map((c) => <li key={c.key}><button type="button" onClick={() => set(c.clear)} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-pale-2 pl-3 pr-2.5 text-xs font-semibold text-brand-deep transition hover:bg-pale">{c.label}<span aria-hidden className="text-base leading-none">×</span><span className="sr-only">{t("Remove filter", "फिल्टर हटाउनुहोस्")}</span></button></li>)}
                <li><button type="button" onClick={reset} className="h-9 px-2 text-xs font-semibold text-muted underline-offset-2 hover:text-brand hover:underline">{t("Clear all", "सबै हटाउनुहोस्")}</button></li>
              </ul>
            )}
            {results.length ? (
              <Stagger key={results.map((r) => r.id).join(",")} step={0.03} className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 xl:grid-cols-3 lg:gap-5">
                {results.map((l, i) => <StaggerItem key={l.id} className="h-full"><ListingCard listing={l} priority={i < 3} /></StaggerItem>)}
              </Stagger>
            ) : (
              <EmptyState icon={<SearchX className="h-6 w-6" aria-hidden />} title={t("No demo listings match these filters", "यी फिल्टरसँग मिल्ने डेमो सूची छैन")} body={t("Try removing a filter. In the live service you could also tell us what you are looking for.", "कुनै फिल्टर हटाउनुहोस्। वास्तविक सेवामा तपाईं के खोज्दै हुनुहुन्छ भनेर हामीलाई बताउन पनि सक्नुहुन्छ।")}
                action={<div className="flex flex-wrap justify-center gap-2.5"><Button onClick={reset}>{t("Clear filters", "फिल्टर हटाउनुहोस्")}</Button><ButtonLink href="/contact" variant="outline">{t("Tell us what you need", "के चाहिन्छ बताउनुहोस्")}</ButtonLink></div>} />
            )}
          </div>
        </div>
      </Section>

      <Sheet open={sheet} onClose={() => setSheet(false)} side="bottom" title={t("Filters", "फिल्टर")}>
        <div className="p-5"><Panel kind={kind} f={f} set={set} /></div>
        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-white p-4 pb-safe">
          <Button variant="outline" className="flex-1" onClick={reset} disabled={extra === 0}>{t("Reset", "रिसेट")}</Button>
          <Button className="flex-[2]" onClick={() => setSheet(false)}>{t("Show", "देखाउनुहोस्")} {num(results.length, lang)} {t("listings", "सूची")}</Button>
        </div>
      </Sheet>
    </>
  );
}
