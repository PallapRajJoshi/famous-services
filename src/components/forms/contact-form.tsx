"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/fields";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { emailRe, phoneRe } from "@/lib/validate";
import { FormSuccess, refCode } from "./form-success";

export function ContactForm({ kind = "contact" }: { kind?: "contact" | "complaint" }) {
  const { t } = useLang();
  const notify = useApp((s) => s.notify);
  const complaint = kind === "complaint";
  const [f, setF] = React.useState({ name: "", phone: "", email: "", topic: "", booking: "", msg: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  if (ref) return <FormSuccess title={complaint ? t("Complaint saved (demo)", "गुनासो सुरक्षित (डेमो)") : t("Message saved (demo)", "सन्देश सुरक्षित (डेमो)")} body={t("In the live service the team would reply to you. Nothing has been sent from this prototype.", "वास्तविक सेवामा टोलीले जवाफ दिन्थ्यो। यो प्रोटोटाइपबाट केही पठाइएको छैन।")} refId={ref} />;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = t("Enter your name", "आफ्नो नाम लेख्नुहोस्");
    if (!phoneRe.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (f.email && !emailRe.test(f.email)) er.email = t("Enter a valid email address", "मान्य इमेल लेख्नुहोस्");
    if (complaint && !f.topic) er.topic = t("Choose what this is about", "यो के बारे हो रोज्नुहोस्");
    if (f.msg.trim().length < 10) er.msg = t("Tell us a bit more (10+ characters)", "थोरै बढी बताउनुहोस् (१०+ अक्षर)");
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    window.setTimeout(() => { const r = refCode(complaint ? "CMP" : "MSG"); notify(complaint ? "Complaint saved (demo)" : "Message saved (demo)", r); setRef(r); setBusy(false); }, 800);
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t("Your name", "तपाईंको नाम")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} error={err.name} required autoComplete="name" />
        <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required autoComplete="tel" />
        <Input label={t("Email (optional)", "इमेल (ऐच्छिक)")} type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} autoComplete="email" />
        {complaint ? <Select label={t("This is about", "यो बारेमा")} value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} error={err.topic} required><option value="">{t("Select", "रोज्नुहोस्")}</option><option value="quality">{t("Quality of work", "कामको गुणस्तर")}</option><option value="late">{t("Late or missed visit", "ढिलो वा छुटेको भ्रमण")}</option><option value="price">{t("Price or billing", "मूल्य वा बिल")}</option><option value="behaviour">{t("Professional's behaviour", "प्रोफेसनलको व्यवहार")}</option><option value="other">{t("Something else", "अन्य")}</option></Select>
          : <Select label={t("Topic (optional)", "विषय (ऐच्छिक)")} value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}><option value="">{t("General", "सामान्य")}</option><option value="booking">{t("A booking", "बुकिङ")}</option><option value="quote">{t("A quote", "कोटेसन")}</option><option value="pro">{t("Becoming a professional", "प्रोफेसनल बन्ने")}</option><option value="biz">{t("Business services", "व्यावसायिक सेवा")}</option></Select>}
      </div>
      {complaint && <Input label={t("Booking ID (optional)", "बुकिङ आईडी (ऐच्छिक)")} value={f.booking} onChange={(e) => setF({ ...f, booking: e.target.value.toUpperCase() })} placeholder="FS-DEMO-1001" />}
      <Textarea label={complaint ? t("What happened?", "के भयो?") : t("Your message", "तपाईंको सन्देश")} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} error={err.msg} required />
      <Button type="submit" size="lg" variant="primary" loading={busy} className="w-full sm:w-auto">{complaint ? t("Submit complaint", "गुनासो पठाउनुहोस्") : t("Send message", "सन्देश पठाउनुहोस्")}</Button>
    </form>
  );
}
