"use client";
import * as React from "react";
import { CATEGORIES } from "@/data/catalog";
import { DISTRICTS } from "@/data/content";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Select, Textarea, ChoiceCard } from "@/components/ui/fields";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { emailRe, phoneRe } from "@/lib/validate";
import { FormSuccess, refCode } from "./form-success";

const BIZ_CATS = ["office-business", "cleaning", "electrical", "plumbing", "painting", "carpentry", "pest-control", "movers", "appliance-repair", "handyman"];

export function QuoteForm() {
  const { t } = useLang();
  const notify = useApp((s) => s.notify);
  const [f, setF] = React.useState({ company: "", person: "", phone: "", email: "", district: "", freq: "one-off", cats: [] as string[], msg: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  if (ref) return <FormSuccess title={t("Quote request saved (demo)", "कोटेसन अनुरोध सुरक्षित (डेमो)")} body={t("In the live service the team would review your request and reply with a written quote. Nothing was sent anywhere.", "वास्तविक सेवामा टोलीले अनुरोध समीक्षा गरी लिखित कोटेसन पठाउँथ्यो। कतै केही पठाइएको छैन।")} refId={ref}><ButtonLink href="/" variant="outline">{t("Back to home", "गृहपृष्ठ")}</ButtonLink></FormSuccess>;
  const toggle = (c: string) => setF((x) => ({ ...x, cats: x.cats.includes(c) ? x.cats.filter((y) => y !== c) : [...x.cats, c] }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.company.trim().length < 2) er.company = t("Enter the business name", "व्यवसायको नाम लेख्नुहोस्");
    if (f.person.trim().length < 2) er.person = t("Enter a contact person", "सम्पर्क व्यक्ति लेख्नुहोस्");
    if (!phoneRe.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (f.email && !emailRe.test(f.email)) er.email = t("Enter a valid email address", "मान्य इमेल लेख्नुहोस्");
    if (!f.district) er.district = t("Choose a district", "जिल्ला रोज्नुहोस्");
    if (!f.cats.length) er.cats = t("Choose at least one service", "कम्तीमा एउटा सेवा रोज्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    window.setTimeout(() => { const r = refCode("BIZ"); notify("Business quote request saved (demo)", `${f.company} · ${r}`); setRef(r); setBusy(false); }, 900);
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t("Business name", "व्यवसायको नाम")} value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} error={err.company} required autoComplete="organization" />
        <Input label={t("Contact person", "सम्पर्क व्यक्ति")} value={f.person} onChange={(e) => setF({ ...f, person: e.target.value })} error={err.person} required autoComplete="name" />
        <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required />
        <Input label={t("Email (optional)", "इमेल (ऐच्छिक)")} type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} autoComplete="email" />
        <Select label={t("District", "जिल्ला")} value={f.district} onChange={(e) => setF({ ...f, district: e.target.value })} error={err.district} required><option value="">{t("Select", "रोज्नुहोस्")}</option>{DISTRICTS.map((d) => <option key={d.slug} value={d.slug}>{t(d.name)}</option>)}</Select>
        <Select label={t("How often?", "कति पटक?")} value={f.freq} onChange={(e) => setF({ ...f, freq: e.target.value })}><option value="one-off">{t("One-off job", "एक पटकको काम")}</option><option value="weekly">{t("Weekly", "साप्ताहिक")}</option><option value="monthly">{t("Monthly", "मासिक")}</option><option value="custom">{t("Custom contract", "अनुकूल सम्झौता")}</option></Select>
      </div>
      <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("Services needed", "चाहिने सेवा")} <span className="text-danger" aria-hidden>*</span></legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{BIZ_CATS.map((s) => { const c = CATEGORIES.find((x) => x.slug === s)!; return <ChoiceCard key={s} type="checkbox" checked={f.cats.includes(s)} onChange={() => toggle(s)}>{t(c.name)}</ChoiceCard>; })}</div>
        {err.cats && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{err.cats}</p>}
      </fieldset>
      <Textarea label={t("Tell us about the site and the work (optional)", "साइट र कामबारे बताउनुहोस् (ऐच्छिक)")} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
      <Button type="submit" variant="accent" size="lg" loading={busy} className="w-full sm:w-auto">{t("Request a Business Quote", "व्यावसायिक कोटेसन माग्नुहोस्")}</Button>
    </form>
  );
}
