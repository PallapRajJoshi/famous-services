"use client";
import * as React from "react";
import { ArrowLeft, ArrowRight, FileCheck2, Upload, X } from "lucide-react";
import { CATEGORIES } from "@/data/catalog";
import { DISTRICTS, VERIFY_STEPS } from "@/data/content";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Select, Textarea, ChoiceCard } from "@/components/ui/fields";
import { Stepper } from "@/components/ui/stepper";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { emailRe, phoneRe } from "@/lib/validate";
import { cn } from "@/lib/cn";
import { ConsentCheck, LegalLink } from "@/components/legal/consent";
import { FormSuccess, refCode } from "./form-success";

const TRADES = ["plumbing", "electrical", "carpentry", "painting", "appliance-repair", "waterproofing", "handyman", "cleaning", "pest-control", "movers", "home-setup", "beauty", "drivers", "home-organization"];
const DAYS = [["Mon", "सोम"], ["Tue", "मङ्गल"], ["Wed", "बुध"], ["Thu", "बिहि"], ["Fri", "शुक्र"], ["Sat", "शनि"], ["Sun", "आइत"]];
type Docs = Record<"id" | "address" | "photo" | "cert", string>;

function DocSlot({ label, hint, file, required, error, onPick }: { label: string; hint: string; file: string; required?: boolean; error?: string; onPick: (name: string) => void }) {
  const { t } = useLang();
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className={cn("flex min-h-[72px] cursor-pointer items-center gap-3.5 rounded-xl border-2 border-dashed p-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", file ? "border-success/50 bg-success-50" : error ? "border-danger bg-danger-50" : "border-line bg-pale/50 hover:border-brand/50 hover:bg-pale")}>
        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", file ? "bg-white text-success" : "bg-white text-brand")}>{file ? <FileCheck2 className="h-5 w-5" aria-hidden /> : <Upload className="h-5 w-5" aria-hidden />}</span>
        <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-ink">{label}{required && <span className="text-danger" aria-hidden> *</span>}</span><span className="block truncate text-xs text-muted">{file || hint}</span></span>
        {file && <button type="button" onClick={(e) => { e.preventDefault(); onPick(""); }} aria-label={`${t("Remove", "हटाउनुहोस्")} ${label}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-white hover:text-danger"><X className="h-4 w-4" aria-hidden /></button>}
        <input id={id} type="file" accept="image/*,.pdf" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f.name); }} />
      </label>
      {error && <p role="alert" className="mt-1.5 text-xs font-semibold text-danger">{error}</p>}
    </div>
  );
}

export function ProRegister() {
  const { t } = useLang();
  const notify = useApp((s) => s.notify);
  const labels = [t("About you", "तपाईंबारे"), t("Your trade", "तपाईंको पेशा"), t("Areas", "क्षेत्र"), t("Documents", "कागजात"), t("Availability", "उपलब्धता"), t("Review", "समीक्षा"), t("Submitted", "पेश")];
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({ name: "", phone: "", email: "", dob: "", trades: [] as string[], years: "", bio: "", areas: [] as string[], days: [] as string[], hours: "", tools: false, agree: false });
  const [docs, setDocs] = React.useState<Docs>({ id: "", address: "", photo: "", cert: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const head = React.useRef<HTMLHeadingElement>(null);
  const tog = (k: "trades" | "areas" | "days", v: string) => setF((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v] }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (f.name.trim().length < 2) e.name = t("Enter your full name", "पूरा नाम लेख्नुहोस्");
      if (!phoneRe.test(f.phone.trim())) e.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
      if (f.email && !emailRe.test(f.email)) e.email = t("Enter a valid email address", "मान्य इमेल लेख्नुहोस्");
    }
    if (step === 1) { if (!f.trades.length) e.trades = t("Choose at least one trade", "कम्तीमा एउटा पेशा रोज्नुहोस्"); if (f.years === "") e.years = t("Choose your experience", "अनुभव रोज्नुहोस्"); }
    if (step === 2 && !f.areas.length) e.areas = t("Choose at least one district", "कम्तीमा एउटा जिल्ला रोज्नुहोस्");
    if (step === 3) { if (!docs.id) e.id = t("Add an identity document", "परिचय कागजात थप्नुहोस्"); if (!docs.address) e.address = t("Add address proof", "ठेगानाको प्रमाण थप्नुहोस्"); if (!docs.photo) e.photo = t("Add a photo", "फोटो थप्नुहोस्"); }
    if (step === 4 && !f.days.length) e.days = t("Choose the days you can work", "काम गर्न सक्ने दिन रोज्नुहोस्");
    if (step === 5 && !f.agree) e.agree = t("Please confirm to submit", "पेश गर्न पुष्टि गर्नुहोस्");
    setErr(e);
    return !Object.keys(e).length;
  };
  React.useEffect(() => { if (step > 0) head.current?.focus({ preventScroll: false }); }, [step]);
  const next = () => { if (validate()) { if (step === 5) { setBusy(true); window.setTimeout(() => { const r = refCode("PRO"); notify("Professional application saved (demo)", r); setRef(r); setBusy(false); setStep(6); }, 1000); } else setStep(step + 1); } };

  if (step === 6 && ref) return <FormSuccess title={t("Application saved (demo)", "आवेदन सुरक्षित (डेमो)")} body={t("In the live service our team would review your documents and contact you. Nothing was uploaded or sent — files stay on your device.", "वास्तविक सेवामा हाम्रो टोलीले तपाईंका कागजात समीक्षा गरी सम्पर्क गर्थ्यो। केही अपलोड वा पठाइएको छैन — फाइल तपाईंकै उपकरणमा रहन्छ।")} refId={ref}><ButtonLink href="/pro" variant="primary">{t("Open the portal demo", "पोर्टल डेमो खोल्नुहोस्")}</ButtonLink></FormSuccess>;

  return (
    <div>
      <Stepper steps={labels} current={step} onJump={(i) => i < step && setStep(i)} className="mb-6" />
      <p className="mb-5 text-sm text-muted xl:hidden">{t("Step", "चरण")} {step + 1} {t("of", "/")} {labels.length - 1}: <strong className="text-ink">{labels[step]}</strong></p>
      <h3 ref={head} tabIndex={-1} className="focus-quiet mb-5 text-xl font-extrabold text-brand-deep">{labels[step]}</h3>
      <div className="space-y-5">
        {step === 0 && <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("Full name", "पूरा नाम")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} error={err.name} required autoComplete="name" />
          <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" inputMode="tel" placeholder="98XXXXXXXX" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required autoComplete="tel" />
          <Input label={t("Email (optional)", "इमेल (ऐच्छिक)")} type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} autoComplete="email" />
          <Input label={t("Date of birth (optional)", "जन्म मिति (ऐच्छिक)")} type="date" value={f.dob} onChange={(e) => setF({ ...f, dob: e.target.value })} />
        </div>}
        {step === 1 && <>
          <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("Which trades do you work in?", "तपाईं कुन पेशामा काम गर्नुहुन्छ?")} <span className="text-danger" aria-hidden>*</span></legend><div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{TRADES.map((s) => <ChoiceCard key={s} type="checkbox" checked={f.trades.includes(s)} onChange={() => tog("trades", s)}>{t(CATEGORIES.find((c) => c.slug === s)!.name)}</ChoiceCard>)}</div>{err.trades && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{err.trades}</p>}</fieldset>
          <Select label={t("Years of experience", "अनुभवका वर्ष")} value={f.years} onChange={(e) => setF({ ...f, years: e.target.value })} error={err.years} required><option value="">{t("Select", "रोज्नुहोस्")}</option><option value="0">{t("Less than 1 year", "१ वर्षभन्दा कम")}</option><option value="1">1–2</option><option value="3">3–5</option><option value="6">6–10</option><option value="11">10+</option></Select>
          <Textarea label={t("About your work (optional)", "तपाईंको कामबारे (ऐच्छिक)")} value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} className="!min-h-24" />
        </>}
        {step === 2 && <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("Where can you work?", "तपाईं कहाँ काम गर्न सक्नुहुन्छ?")} <span className="text-danger" aria-hidden>*</span></legend><div className="grid gap-2.5 sm:grid-cols-3">{DISTRICTS.map((d) => <ChoiceCard key={d.slug} type="checkbox" checked={f.areas.includes(d.slug)} onChange={() => tog("areas", d.slug)}>{t(d.name)}</ChoiceCard>)}</div>{err.areas && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{err.areas}</p>}</fieldset>}
        {step === 3 && <>
          <p className="rounded-xl bg-amber-50 p-3.5 text-sm text-ink">{t("Demo upload: files are not uploaded anywhere — only the file name is shown. Never share real ID documents with a prototype.", "डेमो अपलोड: फाइल कतै अपलोड हुँदैन — फाइलको नाम मात्र देखिन्छ। प्रोटोटाइपमा कहिल्यै वास्तविक परिचय कागजात नदिनुहोस्।")}</p>
          <DocSlot label={t("Identity document", "परिचय कागजात")} hint={t("Citizenship, national ID or driving licence", "नागरिकता, राष्ट्रिय परिचयपत्र वा चालक अनुमतिपत्र")} required file={docs.id} error={err.id} onPick={(n) => setDocs({ ...docs, id: n })} />
          <DocSlot label={t("Address proof", "ठेगानाको प्रमाण")} hint={t("Utility bill or rental agreement", "बिजुली बिल वा भाडा सम्झौता")} required file={docs.address} error={err.address} onPick={(n) => setDocs({ ...docs, address: n })} />
          <DocSlot label={t("Passport-size photo", "पासपोर्ट साइज फोटो")} hint={t("Clear, front-facing", "स्पष्ट, अगाडि हेरेको")} required file={docs.photo} error={err.photo} onPick={(n) => setDocs({ ...docs, photo: n })} />
          <DocSlot label={t("Certificates (optional)", "प्रमाणपत्र (ऐच्छिक)")} hint={t("Training or trade certificates", "तालिम वा पेशागत प्रमाणपत्र")} file={docs.cert} onPick={(n) => setDocs({ ...docs, cert: n })} />
        </>}
        {step === 4 && <>
          <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("Days you can work", "काम गर्न सक्ने दिन")} <span className="text-danger" aria-hidden>*</span></legend><div className="flex flex-wrap gap-2.5">{DAYS.map(([en, ne]) => { const on = f.days.includes(en); return <label key={en} className={cn("inline-flex h-11 min-w-16 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40")}><input type="checkbox" className="sr-only" checked={on} onChange={() => tog("days", en)} />{t(en, ne)}</label>; })}</div>{err.days && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{err.days}</p>}</fieldset>
          <Select label={t("Preferred hours (optional)", "मनपर्ने समय (ऐच्छिक)")} value={f.hours} onChange={(e) => setF({ ...f, hours: e.target.value })}><option value="">{t("Flexible", "लचिलो")}</option><option value="morning">{t("Mornings", "बिहान")}</option><option value="day">{t("Daytime", "दिउँसो")}</option><option value="evening">{t("Evenings", "साँझ")}</option></Select>
          <ChoiceCard type="checkbox" checked={f.tools} onChange={() => setF({ ...f, tools: !f.tools })}>{t("I have my own tools", "मसँग आफ्नै औजार छन्")}</ChoiceCard>
        </>}
        {step === 5 && <>
          <dl className="divide-y divide-line rounded-2xl border border-line">{[
            [t("Name", "नाम"), `${f.name} · ${f.phone}`], [t("Trades", "पेशा"), f.trades.map((s) => t(CATEGORIES.find((c) => c.slug === s)!.name)).join(", ")],
            [t("Areas", "क्षेत्र"), f.areas.map((a) => t(DISTRICTS.find((d) => d.slug === a)!.name)).join(", ")], [t("Documents", "कागजात"), [docs.id, docs.address, docs.photo, docs.cert].filter(Boolean).join(", ")], [t("Days", "दिन"), f.days.join(", ")],
          ].map(([k, v]) => <div key={k as string} className="p-4"><dt className="text-xs font-bold uppercase tracking-wide text-muted">{k}</dt><dd className="mt-1 text-[15px] text-ink">{v}</dd></div>)}</dl>
          <ol className="rounded-xl bg-pale p-4 text-sm text-muted"><li className="mb-1 font-bold text-ink">{t("What happens next in the live service", "वास्तविक सेवामा अब के हुन्छ")}</li>{VERIFY_STEPS.map((v, i) => <li key={i}>{i + 1}. {t(v.title)}</li>)}</ol>
          <ConsentCheck id="pro-agree" checked={f.agree} onChange={(v) => setF({ ...f, agree: v })} error={err.agree}>{t("I confirm the details above are true, I have read the", "माथिको विवरण सही छ, मैले")} <LegalLink slug="pro-terms">{t("professional terms", "प्रोफेसनल सर्त")}</LegalLink> {t("and", "र")} <LegalLink slug="privacy">{t("privacy policy", "गोपनीयता नीति")}</LegalLink> {t("(drafts), and I understand this is a demo.", "(मस्यौदा) पढेको छु, र यो डेमो हो भन्ने बुझेको छु।")}</ConsentCheck>
        </>}
      </div>
      <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
        <Button variant="ghost" onClick={() => { setErr({}); setStep(Math.max(0, step - 1)); }} disabled={step === 0}><ArrowLeft className="h-4 w-4" aria-hidden />{t("Back", "पछाडि")}</Button>
        <Button variant={step === 5 ? "accent" : "primary"} size="lg" onClick={next} loading={busy}>{step === 5 ? t("Submit application", "आवेदन पेश गर्नुहोस्") : t("Continue", "जारी राख्नुहोस्")}{step < 5 && <ArrowRight className="h-4 w-4" aria-hidden />}</Button>
      </div>
    </div>
  );
}
