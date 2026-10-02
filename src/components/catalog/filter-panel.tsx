"use client";
import * as React from "react";
import { useLang } from "@/components/lang-provider";
import { DEFAULT_FILTERS, activeCount, type Filters } from "@/lib/filters";
import { cn } from "@/lib/cn";

function Group<T extends string>({ legend, value, options, onChange, disabled, note }: { legend: string; value: T; options: { v: T; label: string }[]; onChange: (v: T) => void; disabled?: boolean; note?: string }) {
  const name = React.useId();
  return (
    <fieldset disabled={disabled} className="min-w-0 border-0 p-0">
      <legend className="mb-2.5 text-sm font-bold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.v;
          return (
            <label key={o.v} className={cn("relative inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40", disabled && "cursor-not-allowed opacity-50")}>
              <input type="radio" name={name} className="sr-only" checked={on} onChange={() => onChange(o.v)} disabled={disabled} />
              {o.label}
            </label>
          );
        })}
      </div>
      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
    </fieldset>
  );
}

export function FilterPanel({ filters, onChange, subs }: { filters: Filters; onChange: (f: Filters) => void; subs?: { slug: string; label: string }[] }) {
  const { t, lang } = useLang();
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...filters, [k]: v });
  const k = (en: string, ne: string) => (lang === "ne" ? ne : en);
  return (
    <div className="space-y-6">
      {subs && subs.length > 1 && (
        <Group legend={t("Type of work", "कामको प्रकार")} value={filters.sub ?? "all"} onChange={(v) => set("sub", v === "all" ? null : v)} options={[{ v: "all", label: t("All", "सबै") }, ...subs.map((s) => ({ v: s.slug, label: s.label }))]} />
      )}
      <Group legend={t("Price", "मूल्य")} value={filters.price} onChange={(v) => set("price", v)} options={[
        { v: "any", label: t("Any", "कुनै पनि") }, { v: "u1000", label: k("Under Rs. 1,000", "रु. १,००० भन्दा कम") }, { v: "1-3k", label: k("Rs. 1,000–3,000", "रु. १,०००–३,०००") },
        { v: "3-6k", label: k("Rs. 3,000–6,000", "रु. ३,०००–६,०००") }, { v: "6k+", label: k("Rs. 6,000+", "रु. ६,०००+") }]} note={filters.price !== "any" ? t("Quote-based services are hidden while a price filter is on.", "मूल्य फिल्टर चालु हुँदा कोटेसनमा आधारित सेवा लुकाइन्छ।") : undefined} />
      <Group legend={t("Pricing type", "मूल्य प्रकार")} value={filters.type} onChange={(v) => set("type", v)} options={[{ v: "any", label: t("Any", "कुनै पनि") }, { v: "fixed", label: t("Fixed / hourly price", "तोकिएको / प्रति घण्टा") }, { v: "quote", label: t("Inspection quote", "निरीक्षण कोटेसन") }]} />
      <Group legend={t("Duration", "अवधि")} value={filters.dur} onChange={(v) => set("dur", v)} options={[{ v: "any", label: t("Any", "कुनै पनि") }, { v: "s1", label: k("Up to 1 hr", "१ घण्टासम्म") }, { v: "1-3", label: k("1–3 hrs", "१–३ घण्टा") }, { v: "3+", label: k("3+ hrs", "३+ घण्टा") }]} />
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="mb-2.5 text-sm font-bold text-ink">{t("Availability", "उपलब्धता")}</legend>
        <label className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", filters.same ? "border-brand bg-pale" : "border-line bg-white hover:border-brand/40")}>
          {t("Same-day on request", "सोही दिन अनुरोधमा")}
          <input type="checkbox" role="switch" className="sr-only" checked={filters.same} onChange={(e) => set("same", e.target.checked)} />
          <span aria-hidden className={cn("relative h-6 w-10 rounded-full transition-colors", filters.same ? "bg-brand" : "bg-line")}><span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", filters.same ? "left-[18px]" : "left-0.5")} /></span>
        </label>
      </fieldset>
      <Group legend={t("Rating", "रेटिङ")} value={"any" as string} onChange={() => {}} disabled options={[{ v: "any", label: t("Any", "कुनै पनि") }, { v: "4", label: "4+" }]} note={t("Rating filter turns on once real customer reviews exist. This prototype shows no ratings.", "वास्तविक ग्राहक समीक्षा भएपछि रेटिङ फिल्टर खुल्छ। यो प्रोटोटाइपमा रेटिङ देखाइँदैन।")} />
    </div>
  );
}

export function ActiveChips({ filters, onChange, subLabel }: { filters: Filters; onChange: (f: Filters) => void; subLabel?: (slug: string) => string }) {
  const { t, lang } = useLang();
  const chips: { key: string; label: string; clear: Partial<Filters> }[] = [];
  const P: Record<string, [string, string]> = { u1000: ["Under Rs. 1,000", "रु. १,००० भन्दा कम"], "1-3k": ["Rs. 1,000–3,000", "रु. १,०००–३,०००"], "3-6k": ["Rs. 3,000–6,000", "रु. ३,०००–६,०००"], "6k+": ["Rs. 6,000+", "रु. ६,०००+"] };
  const D: Record<string, [string, string]> = { s1: ["Up to 1 hr", "१ घण्टासम्म"], "1-3": ["1–3 hrs", "१–३ घण्टा"], "3+": ["3+ hrs", "३+ घण्टा"] };
  if (filters.sub && subLabel) chips.push({ key: "sub", label: subLabel(filters.sub), clear: { sub: null } });
  if (filters.price !== "any") chips.push({ key: "price", label: P[filters.price][lang === "ne" ? 1 : 0], clear: { price: "any" } });
  if (filters.type !== "any") chips.push({ key: "type", label: filters.type === "fixed" ? t("Fixed / hourly", "तोकिएको / प्रति घण्टा") : t("Inspection quote", "निरीक्षण कोटेसन"), clear: { type: "any" } });
  if (filters.dur !== "any") chips.push({ key: "dur", label: D[filters.dur][lang === "ne" ? 1 : 0], clear: { dur: "any" } });
  if (filters.same) chips.push({ key: "same", label: t("Same-day", "सोही दिन"), clear: { same: false } });
  if (!chips.length) return null;
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label={t("Active filters", "सक्रिय फिल्टर")}>
      {chips.map((c) => (
        <li key={c.key}><button type="button" onClick={() => onChange({ ...filters, ...c.clear })} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-pale-2 pl-3 pr-2.5 text-xs font-semibold text-brand-deep transition hover:bg-pale">{c.label}<span aria-hidden className="text-base leading-none">×</span><span className="sr-only">{t("Remove filter", "फिल्टर हटाउनुहोस्")}</span></button></li>
      ))}
      <li><button type="button" onClick={() => onChange(DEFAULT_FILTERS)} className="h-9 px-2 text-xs font-semibold text-muted underline-offset-2 hover:text-brand hover:underline">{t("Clear all", "सबै हटाउनुहोस्")}</button></li>
    </ul>
  );
}

export { activeCount };
