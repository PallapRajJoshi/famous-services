"use client";
import * as React from "react";
import { Bell } from "lucide-react";
import { DISTRICTS } from "@/data/content";
import { CATEGORIES } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/fields";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { phoneRe } from "@/lib/validate";
import { FormSuccess } from "./form-success";

export function NotifyForm({ district = "" }: { district?: string }) {
  const { t } = useLang();
  const notify = useApp((s) => s.notify);
  const [f, setF] = React.useState({ phone: "", district, cat: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [done, setDone] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  if (done) return <FormSuccess title={t("You are on the list (demo)", "तपाईं सूचीमा हुनुहुन्छ (डेमो)")} body={t("In the live service we would message you when your area opens. Nothing has been sent or stored outside this device.", "वास्तविक सेवामा तपाईंको क्षेत्र खुल्दा हामी सन्देश पठाउँथ्यौं। यो उपकरण बाहिर केही पठाइएको वा भण्डारण गरिएको छैन।")} />;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!phoneRe.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (!f.district) er.district = t("Choose a district", "जिल्ला रोज्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    window.setTimeout(() => { notify("Area notification saved (demo)", f.district); setDone(true); setBusy(false); }, 800);
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-4" aria-label={t("Notify me form", "सूचना फारम")}>
      <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-pale text-brand"><Bell className="h-5 w-5" aria-hidden /></span><div><h3 className="text-lg font-extrabold text-brand-deep">{t("Notify me when my area opens", "मेरो क्षेत्र खुल्दा सूचना दिनुहोस्")}</h3><p className="text-sm text-muted">{t("Leave your number and we will tell you.", "नम्बर छोड्नुहोस्, हामी जानकारी दिनेछौं।")}</p></div></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label={t("District", "जिल्ला")} value={f.district} onChange={(e) => setF({ ...f, district: e.target.value })} error={err.district} required><option value="">{t("Select", "रोज्नुहोस्")}</option>{DISTRICTS.map((d) => <option key={d.slug} value={d.slug}>{t(d.name)}</option>)}</Select>
        <Select label={t("Service you need (optional)", "चाहिएको सेवा (ऐच्छिक)")} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })}><option value="">{t("Any", "कुनै पनि")}</option>{CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{t(c.name)}</option>)}</Select>
      </div>
      <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required />
      <Button type="submit" size="lg" variant="primary" className="w-full sm:w-auto" loading={busy}>{t("Notify me", "सूचना दिनुहोस्")}</Button>
    </form>
  );
}
