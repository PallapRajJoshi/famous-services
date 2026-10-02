"use client";
import * as React from "react";
import Link from "next/link";
import { Check, Clock, Info, Users, X } from "lucide-react";
import type { Pack } from "@/data/content";
import { DISTRICTS, PACKAGES } from "@/data/content";
import { ServiceScene } from "@/components/art/scenes";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/fields";
import { Sheet } from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import { PackageCard } from "@/components/cards/package-card";
import { FormSuccess, refCode } from "@/components/forms/form-success";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { money, num } from "@/lib/format";
import { phoneRe } from "@/lib/validate";
import { imageKey } from "@/config/images";

function RequestForm({ pack, onDone }: { pack: Pack; onDone: () => void }) {
  const { t } = useLang();
  const notify = useApp((s) => s.notify);
  const [f, setF] = React.useState({ name: "", phone: "", district: "", date: "", notes: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const minDate = React.useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); }, []);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = t("Enter your name", "आफ्नो नाम लेख्नुहोस्");
    if (!phoneRe.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (!f.district) er.district = t("Choose a district", "जिल्ला रोज्नुहोस्");
    if (!f.date) er.date = t("Choose a preferred date", "मनपर्ने मिति रोज्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    window.setTimeout(() => { const r = refCode("PKG"); notify("Package request received (demo)", `${pack.name.en} · ${r}`); setRef(r); setBusy(false); }, 900);
  };
  if (ref) return <div className="p-5"><FormSuccess title={t("Request saved (demo)", "अनुरोध सुरक्षित (डेमो)")} body={t("In the live service the team would call to confirm scope, price and date. Nobody has been contacted.", "वास्तविक सेवामा टोलीले दायरा, मूल्य र मिति पुष्टि गर्न फोन गर्थ्यो। कसैलाई सम्पर्क गरिएको छैन।")} refId={ref}><Button onClick={onDone}>{t("Close", "बन्द गर्नुहोस्")}</Button></FormSuccess></div>;
  return (
    <form onSubmit={submit} noValidate className="space-y-4 p-5">
      <p className="text-sm text-muted">{t(pack.name)} — {money(pack.offer, "en")} ({t("sample", "नमुना")})</p>
      <Input label={t("Your name", "तपाईंको नाम")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} error={err.name} required />
      <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label={t("District", "जिल्ला")} value={f.district} onChange={(e) => setF({ ...f, district: e.target.value })} error={err.district} required><option value="">{t("Select", "रोज्नुहोस्")}</option>{DISTRICTS.map((d) => <option key={d.slug} value={d.slug}>{t(d.name)}</option>)}</Select>
        <Input label={t("Preferred date", "मनपर्ने मिति")} type="date" min={minDate} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} error={err.date} required />
      </div>
      <Textarea label={t("Anything we should know? (optional)", "हामीले जान्नुपर्ने केही? (ऐच्छिक)")} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} className="!min-h-20" />
      <Button type="submit" variant="accent" size="lg" className="w-full" loading={busy}>{t("Send package request", "प्याकेज अनुरोध पठाउनुहोस्")}</Button>
    </form>
  );
}

export function PackageView({ pack }: { pack: Pack }) {
  const { t, lang } = useLang();
  const [open, setOpen] = React.useState(false);
  const savings = pack.original - pack.offer;
  const pct = Math.round((savings / pack.original) * 100);
  const others = PACKAGES.filter((p) => p.slug !== pack.slug).slice(0, 3);
  const cta = <Button variant="accent" size="lg" className="w-full" onClick={() => setOpen(true)}>{t("Request this package", "यो प्याकेज माग्नुहोस्")}</Button>;
  return (
    <>
      <Container className="pt-5 sm:pt-7">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Packages", "प्याकेज"), href: "/packages" }, { label: t(pack.name) }]} />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
          <div className="min-w-0 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-card ring-1 ring-line"><ServiceScene category={pack.art} seed={pack.slug} label={t(pack.name)} photo={imageKey.package(pack.slug)} /><span className="absolute left-3 top-3 flex gap-1.5"><Badge tone="success">{t("Save", "बचत")} {num(pct, lang)}%</Badge>{pack.badge && <Badge tone="dark">{t(pack.badge)}</Badge>}</span></div>
            <div><h1 className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{t(pack.name)}</h1><p className="mt-2 max-w-2xl text-base text-muted">{t(pack.desc)}</p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink"><span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand" aria-hidden />{t(pack.duration)}</span><span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-brand" aria-hidden />{t(pack.forWho)}</span></p></div>
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"><h2 className="mb-3.5 text-lg font-extrabold text-brand-deep">{t("What's in this package", "यो प्याकेजमा के छ")}</h2><ul className="grid gap-2.5 sm:grid-cols-2">{pack.includes.map((i, k) => <li key={k} className="flex items-start gap-2.5 text-[15px] text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t(i)}</li>)}</ul></section>
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"><h2 className="mb-3.5 text-lg font-extrabold text-brand-deep">{t("Not included", "समावेश छैन")}</h2><ul className="space-y-2.5">{[t("Spare parts and materials unless listed", "सूचीमा नभएका पार्टपुर्जा र सामग्री"), t("Structural repairs", "संरचनात्मक मर्मत"), t("Work outside the listed scope", "सूचीबाहिरको काम")].map((x) => <li key={x} className="flex items-start gap-2.5 text-[15px] text-ink"><X className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />{x}</li>)}</ul></section>
            <Accordion items={[
              { q: t("How does ordering a package work?", "प्याकेज कसरी मगाउने?"), a: t("Send a request. The team confirms scope, price and dates with you before anything is scheduled. In this prototype the request is saved on your device only.", "अनुरोध पठाउनुहोस्। केही तय हुनुअघि टोलीले दायरा, मूल्य र मिति पुष्टि गर्छ। यो प्रोटोटाइपमा अनुरोध तपाईंकै उपकरणमा सुरक्षित हुन्छ।") },
              { q: t("Is the package price final?", "के प्याकेज मूल्य अन्तिम हो?"), a: t("No. It is a sample price for this prototype and will be confirmed by the business.", "होइन। यो प्रोटोटाइपको नमुना मूल्य हो र व्यवसायले पुष्टि गर्नेछ।") },
            ]} defaultOpen={null} />
          </div>
          <aside className="hidden lg:block"><div className="sticky top-28 space-y-3 rounded-2xl border border-line bg-white p-5 shadow-lift">
            <p className="text-sm text-muted line-through">{money(pack.original, lang)}</p><p className="text-3xl font-extrabold text-brand-deep">{money(pack.offer, lang)}</p><p className="text-sm font-semibold text-success">{t("You save", "तपाईंले बचाउनुहुन्छ")} {money(savings, lang)}</p>
            <p className="flex items-start gap-2 text-xs text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{t("Sample package price", "नमुना प्याकेज मूल्य")}</p>{cta}</div></aside>
        </div>
      </Container>
      <Section tone="pale" className="mt-12 !py-10 sm:!py-14"><SectionHeading eyebrow={t("More bundles", "थप प्याकेज")} title={t("Other packages", "अन्य प्याकेज")} action={<Link href="/packages" className="text-sm font-bold text-brand hover:underline">{t("All packages", "सबै प्याकेज")} →</Link>} /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{others.map((p) => <PackageCard key={p.slug} pack={p} compact />)}</div></Section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-safe pt-3 shadow-bar backdrop-blur lg:hidden"><div className="mx-auto flex max-w-xl items-center gap-3 pb-3"><div className="min-w-0 flex-1"><p className="truncate text-lg font-extrabold leading-tight text-brand-deep">{money(pack.offer, lang)}</p><p className="truncate text-[11px] text-muted"><span className="line-through">{money(pack.original, lang)}</span> · {t("sample", "नमुना")}</p></div><Button variant="accent" onClick={() => setOpen(true)} className="shrink-0">{t("Request", "माग्नुहोस्")}</Button></div></div>
      <Sheet open={open} onClose={() => setOpen(false)} side="center" title={t("Request this package", "यो प्याकेज माग्नुहोस्")}><RequestForm pack={pack} onDone={() => setOpen(false)} /></Sheet>
    </>
  );
}
