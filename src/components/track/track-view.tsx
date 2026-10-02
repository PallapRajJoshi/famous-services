"use client";
import * as React from "react";
import Link from "next/link";
import { CalendarClock, Headphones, MessageCircle, Pause, Phone, Play, RotateCcw, SearchX, Star, StepForward, XCircle } from "lucide-react";
import { categoryBySlug, serviceBySlug } from "@/data/catalog";
import { PROS, SLOTS, districtBySlug } from "@/data/content";
import { Container } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState, Skeleton } from "@/components/ui/states";
import { Sheet } from "@/components/ui/sheet";
import { Select, Textarea } from "@/components/ui/fields";
import { Avatar } from "@/components/cards/pro-card";
import { DateSelector, type DayOpt } from "@/components/booking/date-selector";
import { TimeSlotSelector } from "@/components/booking/time-slot-selector";
import { useLang } from "@/components/lang-provider";
import { useApp } from "@/store/app-store";
import { useAllBookings } from "@/lib/bookings";
import { dateKey, dateLong, money, parseKey } from "@/lib/format";
import { demoSlotBusy } from "@/data/content";
import { cn } from "@/lib/cn";
import { StatusTimeline, TIMELINE } from "./status-timeline";

export function statusBadge(status: number, mode: "book" | "quote") {
  if (status < 0) return { tone: "danger" as const, en: "Cancelled", ne: "रद्द" };
  if (status >= 5) return { tone: "success" as const, en: mode === "quote" ? "Closed" : "Completed", ne: mode === "quote" ? "बन्द" : "सम्पन्न" };
  if (status >= 3) return { tone: "amber" as const, en: "In progress", ne: "जारी" };
  return { tone: "brand" as const, en: "Upcoming", ne: "आगामी" };
}

/** Illustrated "on the way" strip. Not real tracking. */
function RouteStrip() {
  const { t } = useLang();
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-pale p-4">
      <svg viewBox="0 0 400 70" className="h-16 w-full" aria-hidden>
        <path d="M20 40 C 100 10, 160 65, 240 35 S 340 25, 380 40" fill="none" stroke="#C8D8F2" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 40 C 100 10, 160 65, 240 35 S 340 25, 380 40" fill="none" stroke="#1746A2" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8"><animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.2s" repeatCount="indefinite" /></path>
        <circle cx="20" cy="40" r="7" fill="#fff" stroke="#1746A2" strokeWidth="3" /><circle cx="380" cy="40" r="7" fill="#F5A623" stroke="#fff" strokeWidth="2" />
        <circle r="6" fill="#1746A2"><animateMotion dur="5s" repeatCount="indefinite" path="M20 40 C 100 10, 160 65, 240 35 S 340 25, 380 40" /></circle>
      </svg>
      <p className="mt-1 text-xs text-muted">{t("Illustration only — live location tracking is not part of this prototype.", "चित्रण मात्र — लाइभ स्थान ट्र्याकिङ यो प्रोटोटाइपमा समावेश छैन।")}</p>
    </div>
  );
}

export function TrackView({ id }: { id: string }) {
  const { t, lang } = useLang();
  const { all, update, ready } = useAllBookings();
  const toast = useApp((s) => s.toast);
  const notify = useApp((s) => s.notify);
  const addReview = useApp((s) => s.addReview);
  const myReview = useApp((s) => s.myReviews.find((r) => r.bookingId === id));
  const rec = all.find((b) => b.id.toLowerCase() === id.toLowerCase());
  const [auto, setAuto] = React.useState(false);
  const [sheet, setSheet] = React.useState<null | "resched" | "cancel" | "review">(null);

  React.useEffect(() => {
    if (!auto || !rec || rec.status < 0 || rec.status >= 5) { if (auto && rec && rec.status >= 5) setAuto(false); return; }
    const h = window.setTimeout(() => update(rec.id, { status: rec.status + 1 }), 3200);
    return () => window.clearTimeout(h);
  }, [auto, rec, update]);

  if (!ready) return <Container className="py-10"><Skeleton className="mb-4 h-10 w-60" /><div className="grid gap-5 lg:grid-cols-[1fr_380px]"><Skeleton className="h-96" /><Skeleton className="h-96" /></div></Container>;
  if (!rec) {
    return (
      <Container className="py-14"><EmptyState icon={<SearchX className="h-6 w-6" aria-hidden />} title={t("We could not find that booking", "त्यो बुकिङ भेटिएन")} body={t("Bookings in this prototype live only on the device where they were made. Check the ID, or try the sample FS-DEMO-1001.", "यो प्रोटोटाइपमा बुकिङ बनाइएको उपकरणमै रहन्छ। आईडी जाँच्नुहोस्, वा नमुना FS-DEMO-1001 प्रयास गर्नुहोस्।")} action={<div className="flex flex-wrap justify-center gap-2.5"><ButtonLink href="/track/FS-DEMO-1001">{t("Open sample booking", "नमुना बुकिङ खोल्नुहोस्")}</ButtonLink><ButtonLink href="/track" variant="outline">{t("Try another ID", "अर्को आईडी")}</ButtonLink></div>} /></Container>
    );
  }
  const s = serviceBySlug(rec.serviceSlug);
  const cat = s ? categoryBySlug(s.category) : null;
  const pro = PROS.find((p) => p.id === rec.proId) ?? PROS[0];
  const sb = statusBadge(rec.status, rec.mode);
  const cancelled = rec.status < 0;
  const slot = SLOTS.find((x) => x.id === rec.slotId);
  const canChange = !cancelled && rec.status < 3;

  return (
    <div className="bg-pale/50">
      <Container className="py-6 sm:py-9">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Track booking", "बुकिङ ट्र्याक"), href: "/track" }, { label: rec.id }]} />
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-sm font-bold tracking-wider text-brand">{rec.id}</p>
            <h1 className="mt-1 text-2xl font-extrabold text-brand-deep sm:text-3xl">{s ? t(s.name) : rec.serviceSlug}</h1>
            <p className="mt-1 text-sm text-muted">{cat ? t(cat.name) : ""} · {dateLong(parseKey(rec.dateKey), lang)} · {slot?.label}</p>
          </div>
          <div className="flex items-center gap-2">{rec.demo && <Badge tone="amber">{t("Demo booking", "डेमो बुकिङ")}</Badge>}<Badge tone={sb.tone} className="!px-3.5 !py-1.5 !text-sm">{t(sb.en, sb.ne)}</Badge></div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7" aria-labelledby="st-h">
              <h2 id="st-h" className="mb-5 text-lg font-extrabold text-brand-deep">{t("Status", "स्थिति")}</h2>
              {cancelled ? (
                <div className="flex items-start gap-3 rounded-xl bg-danger-50 p-4 text-danger"><XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><div><p className="font-bold">{t("This booking was cancelled", "यो बुकिङ रद्द गरियो")}</p><p className="text-sm">{t("Demo only — no fee was charged.", "डेमो मात्र — कुनै शुल्क लागेन।")}</p></div></div>
              ) : <StatusTimeline mode={rec.mode} current={rec.status} />}
              {rec.status === 3 && rec.mode === "book" && <RouteStrip />}
            </section>

            {!cancelled && (
              <section className="rounded-2xl border border-dashed border-brand/40 bg-white p-5" aria-labelledby="demo-h">
                <h2 id="demo-h" className="text-sm font-bold uppercase tracking-wide text-brand">{t("Demo controls", "डेमो नियन्त्रण")}</h2>
                <p className="mt-1 text-sm text-muted">{t("Status changes are simulated so you can see each stage. In the live service the team and professional update this.", "प्रत्येक चरण हेर्न स्थिति परिवर्तन नक्कल गरिएको हो। वास्तविक सेवामा टोली र प्रोफेसनलले यो अपडेट गर्छन्।")}</p>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  <Button size="sm" variant={auto ? "primary" : "soft"} onClick={() => setAuto(!auto)} disabled={rec.status >= 5}>{auto ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}{auto ? t("Pause simulation", "नक्कल रोक्नुहोस्") : t("Play simulation", "नक्कल चलाउनुहोस्")}</Button>
                  <Button size="sm" variant="soft" onClick={() => { update(rec.id, { status: Math.min(5, rec.status + 1) }); }} disabled={rec.status >= 5}><StepForward className="h-4 w-4" aria-hidden />{t("Next step", "अर्को चरण")}</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setAuto(false); update(rec.id, { status: 0 }); }} disabled={rec.status === 0}><RotateCcw className="h-4 w-4" aria-hidden />{t("Restart", "फेरि सुरु")}</Button>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            {!cancelled && rec.status >= 2 && (
              <section className="rounded-2xl border border-line bg-white p-5 shadow-card" aria-labelledby="pro-h">
                <h2 id="pro-h" className="mb-3 text-base font-extrabold text-brand-deep">{t("Your professional", "तपाईंको प्रोफेसनल")}</h2>
                <div className="flex items-center gap-3.5"><Avatar name={pro.name} hue={pro.hue} size={56} /><div><p className="font-bold text-ink">{pro.name}</p><p className="text-sm text-muted">{t(pro.role)}</p><Badge tone="amber" className="mt-1">{t("Demo profile", "डेमो प्रोफाइल")}</Badge></div></div>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <Button variant="outline" size="sm" onClick={() => toast(t("Demo: calling is not connected in this prototype.", "डेमो: यो प्रोटोटाइपमा कल जोडिएको छैन।"), "info")}><Phone className="h-4 w-4" aria-hidden />{t("Call", "फोन")}</Button>
                  <Button variant="outline" size="sm" onClick={() => toast(t("Demo: chat is not connected in this prototype.", "डेमो: यो प्रोटोटाइपमा च्याट जोडिएको छैन।"), "info")}><MessageCircle className="h-4 w-4" aria-hidden />{t("Message", "सन्देश")}</Button>
                </div>
              </section>
            )}
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card" aria-labelledby="bd-h">
              <h2 id="bd-h" className="mb-3 text-base font-extrabold text-brand-deep">{t("Booking details", "बुकिङ विवरण")}</h2>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-xs font-bold uppercase tracking-wide text-muted">{t("Address", "ठेगाना")}</dt><dd className="mt-0.5 text-ink">{rec.address.street}, {rec.address.area}, {t(districtBySlug(rec.address.district)!.name)}</dd></div>
                <div><dt className="text-xs font-bold uppercase tracking-wide text-muted">{rec.mode === "quote" ? t("Due now", "अहिले") : t("Total", "जम्मा")}</dt><dd className="mt-0.5 text-lg font-extrabold text-brand-deep">{money(rec.total, lang)}</dd></div>
                <div><dt className="text-xs font-bold uppercase tracking-wide text-muted">{t("Payment", "भुक्तानी")}</dt><dd className="mt-0.5 text-ink">{rec.payment === "none" ? "—" : rec.payment === "cash" ? t("Cash after service", "सेवापछि नगद") : rec.payment === "digital" ? t("Digital (demo)", "डिजिटल (डेमो)") : t("Demo card", "डेमो कार्ड")}</dd></div>
                {rec.notes && <div><dt className="text-xs font-bold uppercase tracking-wide text-muted">{t("Notes", "टिप्पणी")}</dt><dd className="mt-0.5 text-ink">{rec.notes}</dd></div>}
              </dl>
              <div className="mt-5 space-y-2.5 border-t border-line pt-4">
                {canChange && <Button variant="outline" className="w-full" onClick={() => setSheet("resched")}><CalendarClock className="h-4 w-4" aria-hidden />{t("Reschedule", "समय परिवर्तन")}</Button>}
                {canChange && <Button variant="ghost" className="w-full text-danger hover:bg-danger-50" onClick={() => setSheet("cancel")}><XCircle className="h-4 w-4" aria-hidden />{t("Cancel booking", "बुकिङ रद्द गर्नुहोस्")}</Button>}
                {rec.status >= 5 && <Button variant="accent" className="w-full" onClick={() => setSheet("review")}><Star className="h-4 w-4" aria-hidden />{myReview ? t("Edit your review", "समीक्षा सम्पादन") : t("Leave a review", "समीक्षा दिनुहोस्")}</Button>}
                <ButtonLink href="/help" variant="soft" className="w-full"><Headphones className="h-4 w-4" aria-hidden />{t("Get help", "सहायता")}</ButtonLink>
              </div>
            </section>
          </aside>
        </div>
      </Container>

      <RescheduleSheet open={sheet === "resched"} onClose={() => setSheet(null)} sameDay={!!s?.sameDay} onSave={(k, sl) => { update(rec.id, { dateKey: k, slotId: sl }); notify("Booking rescheduled (demo)", rec.id); toast(t("Booking rescheduled (demo)", "बुकिङको समय परिवर्तन भयो (डेमो)"), "success"); setSheet(null); }} />
      <CancelSheet open={sheet === "cancel"} onClose={() => setSheet(null)} onConfirm={() => { update(rec.id, { status: -1 }); setAuto(false); notify("Booking cancelled (demo)", rec.id); toast(t("Booking cancelled (demo)", "बुकिङ रद्द भयो (डेमो)"), "info"); setSheet(null); }} />
      <ReviewSheet open={sheet === "review"} onClose={() => setSheet(null)} initial={myReview} onSave={(rating, text) => { addReview({ bookingId: rec.id, rating, text, at: Date.now() }); toast(t("Thanks! Review saved on this device (demo).", "धन्यवाद! समीक्षा यही उपकरणमा सुरक्षित (डेमो)।"), "success"); setSheet(null); }} />
    </div>
  );
}

function RescheduleSheet({ open, onClose, onSave, sameDay }: { open: boolean; onClose: () => void; onSave: (k: string, slot: string) => void; sameDay: boolean }) {
  const { t } = useLang();
  const [days, setDays] = React.useState<DayOpt[]>([]);
  const [k, setK] = React.useState("");
  const [sl, setSl] = React.useState("");
  React.useEffect(() => {
    if (!open) return;
    const n = new Date();
    const list = Array.from({ length: 7 }, (_, i) => { const dt = new Date(n.getFullYear(), n.getMonth(), n.getDate() + i); return { key: dateKey(dt), date: dt, disabled: i === 0 && !sameDay } as DayOpt; });
    setDays(list); setK(list.find((x) => !x.disabled)?.key ?? ""); setSl("");
  }, [open, sameDay]);
  const slots = SLOTS.map((x) => ({ id: x.id, label: x.label, disabled: !k || demoSlotBusy(k, x.id), why: "busy" as const }));
  return (
    <Sheet open={open} onClose={onClose} side="bottom" title={t("Reschedule", "समय परिवर्तन")}>
      <div className="space-y-5 p-5"><DateSelector days={days} value={k} onChange={(x) => { setK(x); setSl(""); }} /><TimeSlotSelector slots={slots} value={sl} onChange={setSl} />
        <Button className="w-full" size="lg" disabled={!k || !sl} onClick={() => onSave(k, sl)}>{t("Save new time", "नयाँ समय सुरक्षित गर्नुहोस्")}</Button></div>
    </Sheet>
  );
}

function CancelSheet({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  const { t } = useLang();
  return (
    <Sheet open={open} onClose={onClose} side="center" title={t("Cancel this booking?", "यो बुकिङ रद्द गर्ने?")}>
      <div className="space-y-4 p-5">
        <Select label={t("Reason (optional)", "कारण (ऐच्छिक)")} defaultValue=""><option value="">{t("Choose a reason", "कारण रोज्नुहोस्")}</option><option>{t("Change of plans", "योजना परिवर्तन")}</option><option>{t("Booked by mistake", "गल्तीले बुक भयो")}</option><option>{t("Found another option", "अर्को विकल्प भेटियो")}</option></Select>
        <p className="text-xs text-muted">{t("Cancellation terms are still to be confirmed by the business. Demo only.", "रद्दका सर्त व्यवसायले पुष्टि गर्न बाँकी छ। डेमो मात्र।")}</p>
        <div className="grid grid-cols-2 gap-3"><Button variant="outline" onClick={onClose}>{t("Keep booking", "बुकिङ राख्नुहोस्")}</Button><Button variant="danger" onClick={onConfirm}>{t("Cancel booking", "रद्द गर्नुहोस्")}</Button></div>
      </div>
    </Sheet>
  );
}

function ReviewSheet({ open, onClose, onSave, initial }: { open: boolean; onClose: () => void; onSave: (rating: number, text: string) => void; initial?: { rating: number; text: string } }) {
  const { t } = useLang();
  const [r, setR] = React.useState(5);
  const [txt, setTxt] = React.useState("");
  React.useEffect(() => { if (open) { setR(initial?.rating ?? 5); setTxt(initial?.text ?? ""); } }, [open, initial]);
  return (
    <Sheet open={open} onClose={onClose} side="center" title={t("How was the service?", "सेवा कस्तो रह्यो?")}>
      <div className="space-y-4 p-5">
        <div role="radiogroup" aria-label={t("Rating", "रेटिङ")} className="flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={r === n} aria-label={`${n}`} onClick={() => setR(n)} className="grid h-12 w-12 place-items-center rounded-full transition hover:scale-110"><Star className={cn("h-8 w-8 transition-colors", n <= r ? "fill-amber text-amber" : "text-line")} aria-hidden /></button>)}
        </div>
        <Textarea label={t("Comment (optional)", "टिप्पणी (ऐच्छिक)")} value={txt} onChange={(e) => setTxt(e.target.value)} maxLength={300} />
        <p className="text-xs text-muted">{t("Saved only on this device. It does not appear in public reviews.", "यही उपकरणमा मात्र सुरक्षित हुन्छ। सार्वजनिक समीक्षामा देखिँदैन।")}</p>
        <Button className="w-full" size="lg" variant="accent" onClick={() => onSave(r, txt.trim())}>{t("Save review", "समीक्षा सुरक्षित गर्नुहोस्")}</Button>
      </div>
    </Sheet>
  );
}
export { TIMELINE };
