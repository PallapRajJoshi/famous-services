"use client";
import * as React from "react";
import { listingTitle, type Listing } from "@/data/rentals";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/fields";
import { FormSuccess, refCode } from "@/components/forms/form-success";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { phoneRe } from "@/lib/validate";
import { ConsentCheck, LegalLink } from "@/components/legal/consent";

/** Simulated visit request: validated, saved on this device only, nothing is sent. */
export function EnquiryForm({ listing: l, onDone }: { listing: Listing; onDone?: () => void }) {
  const { t } = useLang();
  const user = useApp((s) => s.user);
  const addEnquiry = useApp((s) => s.addEnquiry);
  const notify = useApp((s) => s.notify);
  const title = t(listingTitle(l));
  const [f, setF] = React.useState({ name: user?.name && user.name !== "Demo Customer" ? user.name : "", phone: user?.phone ?? "", when: "weekday-am", people: "1", movein: "", intent: "visit", msg: "", agree: false });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  if (ref) {
    return (
      <div className="p-5">
        <FormSuccess title={t("Visit request saved (demo)", "भ्रमण अनुरोध सुरक्षित (डेमो)")} body={t("In the live service the team would call you to arrange a viewing. Nothing was sent anywhere — this request is kept on your device only.", "वास्तविक सेवामा टोलीले भ्रमण मिलाउन फोन गर्थ्यो। कतै केही पठाइएको छैन — यो अनुरोध तपाईंको उपकरणमा मात्र रहन्छ।")} refId={ref}>
          <ButtonLink href="/account/rentals" variant="outline">{t("View my requests", "मेरा अनुरोध हेर्नुहोस्")}</ButtonLink>
          <Button variant="soft" onClick={onDone}>{t("Keep browsing", "हेरिरहनुहोस्")}</Button>
        </FormSuccess>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = t("Enter your name", "आफ्नो नाम लेख्नुहोस्");
    if (!phoneRe.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (!f.agree) er.agree = t("Please accept the terms to continue", "जारी राख्न सर्त स्वीकार गर्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    window.setTimeout(() => {
      const r = refCode("RQ");
      const whenLabel = ({ "weekday-am": t("Weekday morning", "हप्ताको दिन बिहान"), "weekday-pm": t("Weekday afternoon", "हप्ताको दिन दिउँसो"), weekend: t("Weekend", "सप्ताहान्त"), any: t("Any time", "जुनसुकै बेला") } as Record<string, string>)[f.when];
      addEnquiry({ id: r, listingId: l.id, listingTitle: title, kind: l.kind, name: f.name.trim(), phone: f.phone.trim(), when: whenLabel, message: f.msg.trim(), at: Date.now() });
      notify("Visit request saved (demo)", `${title} · ${r}`);
      setRef(r); setBusy(false);
    }, 900);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4 p-5">
      <p className="rounded-xl bg-pale p-3.5 text-sm text-ink"><span className="block text-[11px] font-bold uppercase tracking-wider text-brand">{t("Request about", "अनुरोध")}</span>{title}</p>
      <Input label={t("Your name", "तपाईंको नाम")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} error={err.name} required autoComplete="name" data-autofocus />
      <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required autoComplete="tel" />
      <Select label={t("Best time for a visit", "भ्रमणका लागि उपयुक्त समय")} value={f.when} onChange={(e) => setF({ ...f, when: e.target.value })}>
        <option value="weekday-am">{t("Weekday morning", "हप्ताको दिन बिहान")}</option><option value="weekday-pm">{t("Weekday afternoon", "हप्ताको दिन दिउँसो")}</option><option value="weekend">{t("Weekend", "सप्ताहान्त")}</option><option value="any">{t("Any time", "जुनसुकै बेला")}</option>
      </Select>
      {l.kind === "rooms" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("Move-in date (optional)", "बस्ने मिति (ऐच्छिक)")} type="date" value={f.movein} onChange={(e) => setF({ ...f, movein: e.target.value })} />
          <Select label={t("People staying", "बस्ने मानिस")} value={f.people} onChange={(e) => setF({ ...f, people: e.target.value })}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4+</option></Select>
        </div>
      ) : (
        <Select label={t("I would like to", "म चाहन्छु")} value={f.intent} onChange={(e) => setF({ ...f, intent: e.target.value })}>
          <option value="visit">{t("Visit the site", "साइट हेर्न")}</option><option value="price">{t("Discuss the price", "मूल्यबारे कुरा गर्न")}</option><option value="docs">{t("Check the documents", "कागजात जाँच्न")}</option>
        </Select>
      )}
      <Textarea label={t("Message (optional)", "सन्देश (ऐच्छिक)")} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
      <ConsentCheck id="enq-agree" checked={f.agree} onChange={(v) => setF({ ...f, agree: v })} error={err.agree}>
        {t("I have read the", "मैले")} <LegalLink slug={l.kind === "rooms" ? "rental-terms" : "property-terms"}>{l.kind === "rooms" ? t("rental terms", "भाडा सर्त") : t("property sale terms", "सम्पत्ति बिक्री सर्त")}</LegalLink> {t("and", "र")} <LegalLink slug="privacy">{t("privacy policy", "गोपनीयता नीति")}</LegalLink> {t("(drafts), and agree that my details may be shared with the owner or agent for this listing.", "(मस्यौदा) पढेको छु, र यस सूचीका लागि मेरो विवरण घरधनी वा एजेन्टसँग साझा हुन सक्छ भन्नेमा सहमत छु।")}
      </ConsentCheck>
      <Button type="submit" variant="accent" size="lg" loading={busy} className="w-full">{t("Request a visit", "भ्रमण अनुरोध गर्नुहोस्")}</Button>
      <p className="text-center text-xs text-muted">{t("Demo only — saved on this device, nothing is sent. No payment is taken.", "डेमो मात्र — यही उपकरणमा सुरक्षित, केही पठाइँदैन। कुनै भुक्तानी लिइँदैन।")}</p>
    </form>
  );
}
