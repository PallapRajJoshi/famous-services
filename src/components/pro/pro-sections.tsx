"use client";
import * as React from "react";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Check, CheckCircle2, Clock, Inbox, MapPin, Navigation, Undo2, Wallet, X } from "lucide-react";
import { serviceBySlug } from "@/data/catalog";
import { DISTRICTS, PRO_FAQS, SLOTS, districtBySlug } from "@/data/content";
import { PRO_JOBS, PRO_PERSONA, PRO_VERIFY, SAMPLE_WEEK, WEEK_DAYS, type ProJob } from "@/data/pro";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea } from "@/components/ui/fields";
import { Accordion } from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/states";
import { Avatar } from "@/components/cards/pro-card";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { dateKey, dateLong, money, num } from "@/lib/format";
import { cn } from "@/lib/cn";

const Card = ({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) => (
  <section className={cn("rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6", className)}>
    {(title || action) && <div className="mb-4 flex items-center justify-between gap-3">{title && <h2 className="text-lg font-extrabold text-brand-deep">{title}</h2>}{action}</div>}
    {children}
  </section>
);
const jobDate = (j: ProJob) => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate() + j.dayOffset); };

function JobCard({ job, state }: { job: ProJob; state?: "accepted" | "rejected" | "done" }) {
  const { t, lang } = useLang();
  const { setProJob, toast, notify } = useApp();
  const s = serviceBySlug(job.serviceSlug);
  const slot = SLOTS.find((x) => x.id === job.slotId);
  return (
    <li className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5"><span className="font-mono text-[11px] font-bold tracking-wider text-brand">{job.id}</span><Badge tone="amber">{t("Demo job", "डेमो काम")}</Badge>{state === "done" && <Badge tone="success">{t("Done", "सकियो")}</Badge>}{state === "accepted" && <Badge tone="brand">{t("Accepted", "स्वीकृत")}</Badge>}{state === "rejected" && <Badge tone="neutral">{t("Rejected", "अस्वीकृत")}</Badge>}</div>
          <h3 className="mt-1 text-base font-bold text-ink">{s ? t(s.name) : job.serviceSlug}</h3>
          <p className="text-sm text-muted">{t(job.note)}</p>
        </div>
        <div className="text-right"><p className="text-xs text-muted">{t("Estimated payout (sample)", "अनुमानित भुक्तानी (नमुना)")}</p><p className="text-xl font-extrabold text-brand-deep">{money(job.payout, lang)}</p></div>
      </div>
      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink">
        <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-brand" aria-hidden /><dt className="sr-only">{t("Date", "मिति")}</dt><dd>{dateLong(jobDate(job), lang)}</dd></div>
        <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand" aria-hidden /><dt className="sr-only">{t("Time", "समय")}</dt><dd>{slot?.label}</dd></div>
        <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand" aria-hidden /><dt className="sr-only">{t("Area", "क्षेत्र")}</dt><dd>{job.area}, {t(districtBySlug(job.district)!.name)}</dd></div>
        <div className="flex items-center gap-1.5"><Navigation className="h-4 w-4 text-brand" aria-hidden /><dt className="sr-only">{t("Distance", "दूरी")}</dt><dd>{num(job.km, lang)} km</dd></div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {!state && <>
          <Button variant="primary" size="sm" onClick={() => { setProJob(job.id, "accepted"); notify("Job accepted (demo)", job.id); toast(t(`${job.id} accepted (demo)`, `${job.id} स्वीकार गरियो (डेमो)`), "success"); }}><Check className="h-4 w-4" aria-hidden />{t("Accept", "स्वीकार")}</Button>
          <Button variant="outline" size="sm" onClick={() => { setProJob(job.id, "rejected"); toast(t(`${job.id} rejected`, `${job.id} अस्वीकार गरियो`), "info"); }}><X className="h-4 w-4" aria-hidden />{t("Reject", "अस्वीकार")}</Button>
        </>}
        {state === "accepted" && <Button variant="accent" size="sm" onClick={() => { setProJob(job.id, "done"); toast(t("Marked as done (demo)", "सकियो भनी जनाइयो (डेमो)"), "success"); }}><CheckCircle2 className="h-4 w-4" aria-hidden />{t("Mark as done", "सकियो जनाउनुहोस्")}</Button>}
        {(state === "rejected" || state === "accepted") && <Button variant="ghost" size="sm" onClick={() => { useApp.setState((st) => { const n = { ...st.proJobs }; delete n[job.id]; return { proJobs: n }; }); }}><Undo2 className="h-4 w-4" aria-hidden />{t("Undo", "पूर्ववत्")}</Button>}
      </div>
    </li>
  );
}

function useJobs() {
  const proJobs = useApp((s) => s.proJobs);
  return {
    pending: PRO_JOBS.filter((j) => !proJobs[j.id]),
    accepted: PRO_JOBS.filter((j) => proJobs[j.id] === "accepted"),
    rejected: PRO_JOBS.filter((j) => proJobs[j.id] === "rejected"),
    done: PRO_JOBS.filter((j) => proJobs[j.id] === "done"),
  };
}

function Dashboard() {
  const { t, lang } = useLang();
  const { pending, accepted, done } = useJobs();
  const online = useApp((s) => s.proOnline);
  const week = SAMPLE_WEEK.reduce((a, b) => a + b, 0) + done.reduce((n, j) => n + j.payout, 0);
  const next = [...accepted].sort((a, b) => a.dayOffset - b.dayOffset)[0];
  return (
    <div className="space-y-6">
      <p className="rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-ink">{t("Demo portal with sample jobs and figures. Accepting or rejecting changes nothing outside this device.", "नमुना काम र आँकडासहितको डेमो पोर्टल। स्वीकार वा अस्वीकार गर्दा यो उपकरण बाहिर केही परिवर्तन हुँदैन।")}</p>
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {[[Inbox, num(online ? pending.length : 0, lang), t("New requests", "नयाँ अनुरोध")], [CalendarDays, num(accepted.length, lang), t("Accepted", "स्वीकृत")], [CheckCircle2, num(done.length, lang), t("Completed", "सम्पन्न")], [Wallet, money(week, lang), t("This week (sample)", "यो हप्ता (नमुना)")]].map(([I, v, l], i) => { const Ic = I as typeof Inbox; return <div key={i} className="rounded-2xl border border-line bg-white p-4 shadow-card"><div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-pale text-brand"><Ic className="h-5 w-5" aria-hidden /></div><p className="text-xl font-extrabold text-brand-deep sm:text-2xl">{v as string}</p><p className="text-xs font-medium text-muted">{l as string}</p></div>; })}
      </div>
      {!online && <div className="rounded-xl border border-line bg-white p-4 text-sm text-muted">{t("You are offline, so no new requests are shown. Switch back online above.", "तपाईं अफलाइन हुनुहुन्छ, त्यसैले नयाँ अनुरोध देखाइँदैन। माथि फेरि अनलाइन गर्नुहोस्।")}</div>}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={t("Next job", "अर्को काम")} action={<Link href="/pro/accepted" className="text-sm font-bold text-brand hover:underline">{t("All", "सबै")}</Link>}>
          {next ? <ul><JobCard job={next} state="accepted" /></ul> : <EmptyState title={t("No accepted jobs", "स्वीकृत काम छैन")} body={t("Accept a request to see it here.", "अनुरोध स्वीकार गरेपछि यहाँ देखिन्छ।")} action={<ButtonLink href="/pro/requests" variant="primary">{t("View requests", "अनुरोध हेर्नुहोस्")}</ButtonLink>} className="!py-8" />}
        </Card>
        <Card title={t("Verification", "प्रमाणीकरण")} action={<Link href="/pro/verification" className="text-sm font-bold text-brand hover:underline">{t("Details", "विवरण")}</Link>}>
          <ul className="space-y-2.5">{PRO_VERIFY.map((v, i) => <li key={i} className="flex items-center justify-between gap-3 text-sm"><span className="font-medium text-ink">{t(v.title)}</span><VBadge s={v.status} /></li>)}</ul>
        </Card>
      </div>
    </div>
  );
}

function VBadge({ s }: { s: "approved" | "review" | "pending" }) {
  const { t } = useLang();
  return s === "approved" ? <Badge tone="success">{t("Approved", "स्वीकृत")}</Badge> : s === "review" ? <Badge tone="amber">{t("In review", "समीक्षामा")}</Badge> : <Badge tone="neutral">{t("Pending", "बाँकी")}</Badge>;
}

function Requests() {
  const { t } = useLang();
  const { pending, rejected } = useJobs();
  const online = useApp((s) => s.proOnline);
  const list = online ? pending : [];
  return (
    <div className="space-y-6">
      {!online && <EmptyState icon={<Inbox className="h-6 w-6" aria-hidden />} title={t("You are offline", "तपाईं अफलाइन हुनुहुन्छ")} body={t("Go online to see new job requests.", "नयाँ काम अनुरोध हेर्न अनलाइन हुनुहोस्।")} />}
      {online && !list.length && <EmptyState icon={<Inbox className="h-6 w-6" aria-hidden />} title={t("No new requests", "नयाँ अनुरोध छैन")} body={t("New requests appear here. Rejected ones can be restored below.", "नयाँ अनुरोध यहाँ देखिन्छ। अस्वीकृतलाई तल पुनःस्थापना गर्न सकिन्छ।")} />}
      {list.length > 0 && <ul className="space-y-4">{list.map((j) => <JobCard key={j.id} job={j} />)}</ul>}
      {rejected.length > 0 && <Card title={`${t("Rejected", "अस्वीकृत")} (${num(rejected.length, "en")})`}><ul className="space-y-4">{rejected.map((j) => <JobCard key={j.id} job={j} state="rejected" />)}</ul></Card>}
    </div>
  );
}

function Accepted() {
  const { t } = useLang();
  const { accepted, done } = useJobs();
  return (
    <div className="space-y-6">
      {accepted.length ? <ul className="space-y-4">{accepted.map((j) => <JobCard key={j.id} job={j} state="accepted" />)}</ul> : <EmptyState icon={<CheckCircle2 className="h-6 w-6" aria-hidden />} title={t("No accepted jobs", "स्वीकृत काम छैन")} action={<ButtonLink href="/pro/requests" variant="primary">{t("View requests", "अनुरोध हेर्नुहोस्")}</ButtonLink>} />}
      {done.length > 0 && <Card title={t("Completed", "सम्पन्न")}><ul className="space-y-4">{done.map((j) => <JobCard key={j.id} job={j} state="done" />)}</ul></Card>}
    </div>
  );
}

function Schedule() {
  const { t, lang } = useLang();
  const { accepted, done } = useJobs();
  const mine = [...accepted, ...done];
  const days = Array.from({ length: 7 }, (_, i) => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate() + i); });
  return (
    <div>
      <p className="mb-4 text-sm text-muted">{t("Accepted jobs for the next 7 days.", "अर्को ७ दिनका स्वीकृत काम।")}</p>
      <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {days.map((d, i) => {
          const jobs = mine.filter((j) => dateKey(jobDate(j)) === dateKey(d));
          return (
            <li key={i} className={cn("rounded-2xl border bg-white p-4 shadow-card", i === 0 ? "border-brand" : "border-line")}>
              <p className="text-sm font-bold text-brand-deep">{i === 0 ? t("Today", "आज") + " · " : ""}{dateLong(d, lang)}</p>
              {jobs.length ? <ul className="mt-3 space-y-2">{jobs.map((j) => <li key={j.id} className="rounded-xl bg-pale p-3 text-sm"><p className="font-semibold text-ink">{t(serviceBySlug(j.serviceSlug)!.name)}</p><p className="text-xs text-muted">{SLOTS.find((x) => x.id === j.slotId)?.label} · {j.area}</p></li>)}</ul> : <p className="mt-3 text-sm text-muted">{t("Free day", "खाली दिन")}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Earnings() {
  const { t, lang } = useLang();
  const { done } = useJobs();
  const extra = done.reduce((n, j) => n + j.payout, 0);
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
  const data = SAMPLE_WEEK.map((v, i) => v + (i === todayIdx ? extra : 0));
  const max = Math.max(...data, 1);
  const total = data.reduce((a, b) => a + b, 0);
  const labels = WEEK_DAYS[lang];
  return (
    <div className="space-y-6">
      <p className="rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-ink">{t("Sample figures only. Payout terms, schedule and any deductions will be confirmed by the business.", "नमुना आँकडा मात्र। भुक्तानी सर्त, तालिका र कटौती व्यवसायले पुष्टि गर्नेछ।")}</p>
      <Card title={t("This week (sample)", "यो हप्ता (नमुना)")}>
        <p className="text-3xl font-extrabold text-brand-deep">{money(total, lang)}</p>
        <div className="mt-5 flex h-44 items-end gap-2 sm:gap-4" role="img" aria-label={t("Bar chart of sample daily earnings", "नमुना दैनिक आम्दानीको बार चार्ट")}>
          {data.map((v, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[10px] font-semibold text-muted">{v ? num(v, lang) : ""}</span>
              <div className={cn("w-full max-w-10 rounded-t-lg transition-all duration-500", i === todayIdx ? "bg-amber" : "bg-brand")} style={{ height: `${Math.max(4, (v / max) * 100)}%`, opacity: v ? 1 : 0.2 }} />
              <span className="text-xs font-medium text-muted">{labels[i]}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title={t("Completed in this session", "यस सत्रमा सम्पन्न")}>
        {done.length ? <ul className="divide-y divide-line">{done.map((j) => <li key={j.id} className="flex items-center justify-between py-3 text-sm"><span className="font-semibold text-ink">{t(serviceBySlug(j.serviceSlug)!.name)} <span className="font-mono text-xs text-muted">{j.id}</span></span><span className="font-bold text-brand-deep">{money(j.payout, lang)}</span></li>)}</ul> : <p className="text-sm text-muted">{t("Mark an accepted job as done to see it here.", "स्वीकृत काम सकियो जनाएपछि यहाँ देखिन्छ।")}</p>}
      </Card>
    </div>
  );
}

function ProProfile() {
  const { t } = useLang();
  const toast = useApp((s) => s.toast);
  const [areas, setAreas] = React.useState<string[]>(["kathmandu", "lalitpur"]);
  const [bio, setBio] = React.useState("Leak detection, fittings and bathroom work.");
  const [name, setName] = React.useState(PRO_PERSONA.name);
  const [err, setErr] = React.useState("");
  const save = (e: React.FormEvent) => { e.preventDefault(); if (name.trim().length < 2) { setErr(t("Enter your name", "आफ्नो नाम लेख्नुहोस्")); return; } setErr(""); toast(t("Profile saved (demo)", "प्रोफाइल सुरक्षित (डेमो)"), "success"); };
  return (
    <Card><form onSubmit={save} noValidate className="max-w-xl space-y-5">
      <div className="flex items-center gap-4"><Avatar name={name || "R"} hue={PRO_PERSONA.hue} size={64} /><p className="text-sm text-muted">{t("Photo upload is not part of this demo.", "फोटो अपलोड यो डेमोमा छैन।")}</p></div>
      <Input label={t("Display name", "देखिने नाम")} value={name} onChange={(e) => setName(e.target.value)} error={err} required />
      <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("Areas you serve", "तपाईं सेवा दिने क्षेत्र")}</legend><div className="flex flex-wrap gap-2.5">{DISTRICTS.map((d) => { const on = areas.includes(d.slug); return <label key={d.slug} className={cn("inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink")}><input type="checkbox" className="sr-only" checked={on} onChange={() => setAreas(on ? areas.filter((x) => x !== d.slug) : [...areas, d.slug])} />{t(d.name)}</label>; })}</div></fieldset>
      <Textarea label={t("Short bio", "छोटो परिचय")} value={bio} onChange={(e) => setBio(e.target.value)} maxLength={200} />
      <Button type="submit" size="lg">{t("Save profile", "प्रोफाइल सुरक्षित गर्नुहोस्")}</Button>
    </form></Card>
  );
}

function Verification() {
  const { t } = useLang();
  const [steps, setSteps] = React.useState(PRO_VERIFY.map((v) => v.status));
  const done = steps.filter((s) => s === "approved").length;
  const advance = () => setSteps((cur) => { const i = cur.findIndex((s) => s !== "approved"); if (i < 0) return cur; const n = [...cur]; n[i] = "approved"; const j = n.findIndex((s) => s === "pending"); if (j >= 0 && n[j - 1] === "approved" && j !== i) n[j] = "review"; return n; });
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-ink">{num(done, "en")} / {num(steps.length, "en")} {t("steps approved", "चरण स्वीकृत")}</p><Badge tone="amber">{t("Demo status", "डेमो स्थिति")}</Badge></div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={done}><div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${(done / steps.length) * 100}%` }} /></div>
        <ol className="mt-5 space-y-4">{PRO_VERIFY.map((v, i) => <li key={i} className="flex items-start gap-3.5"><span className={cn("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full", steps[i] === "approved" ? "bg-success-50 text-success" : steps[i] === "review" ? "bg-amber-50 text-warn" : "bg-pale text-muted")}>{steps[i] === "approved" ? <BadgeCheck className="h-5 w-5" aria-hidden /> : <span className="text-sm font-bold">{i + 1}</span>}</span><div className="flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-bold text-ink">{t(v.title)}</p><VBadge s={steps[i]} /></div><p className="text-sm text-muted">{t(v.note)}</p></div></li>)}</ol>
        <Button className="mt-5" variant="soft" onClick={advance} disabled={done === steps.length}>{t("Simulate next approval", "अर्को स्वीकृति नक्कल गर्नुहोस्")}</Button>
      </Card>
      <p className="text-sm text-muted">{t("In the live service an admin reviews each document. Only fully approved professionals can receive jobs.", "वास्तविक सेवामा प्रशासकले प्रत्येक कागजात समीक्षा गर्छ। पूर्ण स्वीकृत प्रोफेसनलले मात्र काम पाउँछन्।")}</p>
    </div>
  );
}

function ProSupport() {
  const { t } = useLang();
  const toast = useApp((s) => s.toast);
  const [m, setM] = React.useState("");
  const [err, setErr] = React.useState("");
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title={t("Common questions", "सामान्य प्रश्न")}><Accordion items={PRO_FAQS.map((f) => ({ q: t(f.q), a: t(f.a) }))} className="border-0" /></Card>
      <Card title={t("Message the team", "टोलीलाई सन्देश")}>
        <form noValidate onSubmit={(e) => { e.preventDefault(); if (m.trim().length < 10) { setErr(t("Tell us a bit more (10+ characters)", "थोरै बढी बताउनुहोस् (१०+ अक्षर)")); return; } setErr(""); setM(""); toast(t("Saved (demo). No one has been contacted.", "सुरक्षित (डेमो)। कसैलाई सम्पर्क गरिएको छैन।"), "success"); }} className="space-y-4">
          <Textarea label={t("Your message", "तपाईंको सन्देश")} value={m} onChange={(e) => setM(e.target.value)} error={err} required />
          <Button type="submit" size="lg" className="w-full">{t("Send", "पठाउनुहोस्")}</Button>
        </form>
      </Card>
    </div>
  );
}

export function ProSectionView({ section }: { section: string }) {
  switch (section) {
    case "requests": return <Requests />;
    case "accepted": return <Accepted />;
    case "schedule": return <Schedule />;
    case "earnings": return <Earnings />;
    case "profile": return <ProProfile />;
    case "verification": return <Verification />;
    case "support": return <ProSupport />;
    default: return <Dashboard />;
  }
}
