"use client";
import * as React from "react";
import Link from "next/link";
import { ConsentCheck, LegalLink } from "@/components/legal/consent";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Banknote, CalendarDays, Check, ChevronUp, CreditCard, Info, MapPin, Pencil, ShieldCheck, Smartphone, Tag, X } from "lucide-react";
import { z } from "zod";
import { categoryBySlug, detailsFor, durationLabel, isQuote, type Service } from "@/data/catalog";
import { DISTRICTS, OFFERS, PROS, SLOTS, demoSlotBusy, districtBySlug } from "@/data/content";
import { ServiceScene } from "@/components/art/scenes";
import { Container } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Stepper } from "@/components/ui/stepper";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Select, Textarea, ChoiceCard } from "@/components/ui/fields";
import { Sheet } from "@/components/ui/sheet";
import { QtyStepper } from "@/components/ui/qty";
import { Badge } from "@/components/ui/badge";
import { PriceLine } from "@/components/cards/service-card";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated, type Address, type BookingRecord } from "@/store/app-store";
import { useUi } from "@/store/ui-store";
import { computePrice, couponCheck, qtyFor } from "@/lib/pricing";
import { dateKey, dateLong, money, num, parseKey } from "@/lib/format";
import { cn } from "@/lib/cn";
import { PriceSummary } from "./price-summary";
import { DateSelector, type DayOpt } from "./date-selector";
import { TimeSlotSelector, type SlotOpt } from "./time-slot-selector";
import { MapPinPicker, type Pin } from "./map-pin";
import { PhotoUpload, type Photo } from "./photo-upload";
import { BookingDone } from "./booking-done";
import { imageKey } from "@/config/images";

type StepId = "service" | "address" | "time" | "addons" | "details" | "review" | "payment" | "done";
type Dist = "kathmandu" | "lalitpur" | "bhaktapur";
type Pay = "cash" | "digital" | "card";

const phoneRe = /^(\+977[- ]?)?9[78]\d{8}$/;

type Draft = {
  qty: number;
  savedId: string | "new";
  label: string; name: string; phone: string; district: Dist | ""; area: string; street: string; landmark: string; pin: Pin; saveAddr: boolean;
  dateKey: string; slotId: string;
  addOnIds: string[];
  notes: string; photos: Photo[]; contact: "call" | "whatsapp";
  coupon: string; applied: string | null; agree: boolean;
  payment: Pay | "";
};

export function BookingFlow({ service: s, initialQty, initialCoupon }: { service: Service; initialQty?: number; initialCoupon?: string }) {
  const { t, lang } = useLang();
  const cat = categoryBySlug(s.category)!;
  const d = detailsFor(s.category);
  const quote = isQuote(s);
  const q = qtyFor(s);
  const hydrated = useHydrated();
  const { user, addresses, area, saveAddress, addBooking, notify, toast } = useApp();
  const uiCoupon = useUi((x) => x.coupon);

  const ids: StepId[] = quote ? ["service", "address", "time", "details", "review", "done"] : ["service", "address", "time", "addons", "details", "review", "payment", "done"];
  const labels: Record<StepId, string> = {
    service: t("Service", "सेवा"), address: t("Address", "ठेगाना"), time: t("Date & time", "मिति र समय"), addons: t("Add-ons", "थप सेवा"), details: t("Details", "विवरण"),
    review: t("Review", "समीक्षा"), payment: t("Payment", "भुक्तानी"), done: t("Confirmed", "पुष्टि"),
  };
  const [step, setStep] = React.useState(0);
  const cur = ids[step];

  const [draft, setDraft] = React.useState<Draft>(() => ({
    qty: Math.min(q?.max ?? 1, Math.max(q?.min ?? 1, initialQty ?? q?.def ?? 1)),
    savedId: "new", label: "Home", name: "", phone: "", district: "", area: "", street: "", landmark: "", pin: null, saveAddr: true,
    dateKey: "", slotId: "", addOnIds: [], notes: "", photos: [], contact: "call",
    coupon: "", applied: null, agree: false, payment: "",
  }));
  const set = (patch: Partial<Draft>) => setDraft((x) => ({ ...x, ...patch }));
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [processing, setProcessing] = React.useState(false);
  const [payOpen, setPayOpen] = React.useState(false);
  const [priceOpen, setPriceOpen] = React.useState(false);
  const [record, setRecord] = React.useState<BookingRecord | null>(null);
  const [couponMsg, setCouponMsg] = React.useState<string | null>(null);
  const heading = React.useRef<HTMLHeadingElement>(null);

  /* Prefill from the persisted store once it has loaded. */
  const prefilled = React.useRef(false);
  React.useEffect(() => {
    if (!hydrated || prefilled.current) return;
    prefilled.current = true;
    setDraft((x) => ({
      ...x,
      name: x.name || user?.name || "", phone: x.phone || user?.phone || "",
      district: x.district || (area ?? ""),
      savedId: addresses.length ? addresses[0].id : "new",
      coupon: initialCoupon || uiCoupon || "",
      applied: (initialCoupon || uiCoupon) && !quote ? (initialCoupon || uiCoupon)!.toUpperCase() : null,
    }));
  }, [hydrated, user, area, addresses, initialCoupon, uiCoupon, quote]);

  /* Date options are built on the client so "today" matches the visitor's clock. */
  const [days, setDays] = React.useState<DayOpt[] | null>(null);
  const [now, setNow] = React.useState<Date | null>(null);
  React.useEffect(() => {
    const n = new Date();
    setNow(n);
    const earliest = (day: number) => SLOTS.some((sl) => (day > 0 ? true : sl.startHour >= n.getHours() + 3));
    const list: DayOpt[] = Array.from({ length: 7 }, (_, i) => {
      const dt = new Date(n.getFullYear(), n.getMonth(), n.getDate() + i);
      const disabled = i === 0 && (!s.sameDay || !earliest(0));
      return { key: dateKey(dt), date: dt, disabled, reason: disabled ? (s.sameDay ? "No windows left today" : "Needs advance booking") : undefined };
    });
    setDays(list);
    setDraft((x) => (x.dateKey ? x : { ...x, dateKey: list.find((l) => !l.disabled)?.key ?? "" }));
  }, [s.sameDay]);

  const slots: SlotOpt[] = React.useMemo(() => {
    if (!draft.dateKey || !now) return [];
    const isToday = draft.dateKey === dateKey(now);
    return SLOTS.map((sl) => {
      const past = isToday && sl.startHour < now.getHours() + 3;
      const busy = demoSlotBusy(draft.dateKey, sl.id);
      return { id: sl.id, label: sl.label, disabled: past || busy, why: past ? "past" : busy ? "busy" : undefined } as SlotOpt;
    });
  }, [draft.dateKey, now]);
  React.useEffect(() => { if (draft.slotId && slots.length && slots.find((x) => x.id === draft.slotId)?.disabled) set({ slotId: "" }); }, [slots, draft.slotId]);

  const chosenAddons = d.addOns.filter((a) => draft.addOnIds.includes(a.id));
  const price = computePrice(s, { qty: draft.qty, addOnTotal: chosenAddons.reduce((n, a) => n + a.price, 0), coupon: draft.applied });
  const couponStatus = draft.applied ? couponCheck(draft.applied, s, price.subtotal) : null;

  /* ───── validation per step ───── */
  const addrSchema = z.object({
    name: z.string().trim().min(2, t("Enter the contact name", "सम्पर्क नाम लेख्नुहोस्")),
    phone: z.string().trim().regex(phoneRe, t("Enter a valid Nepal mobile number, e.g. 98XXXXXXXX", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्, जस्तै ९८XXXXXXXX")),
    district: z.string().min(1, t("Choose a district", "जिल्ला रोज्नुहोस्")),
    area: z.string().trim().min(1, t("Choose or enter your area", "आफ्नो क्षेत्र रोज्नुहोस् वा लेख्नुहोस्")),
    street: z.string().trim().min(3, t("Add a street, house or building", "सडक, घर वा भवन थप्नुहोस्")),
  });
  const savedAddr = addresses.find((a) => a.id === draft.savedId);
  const useSaved = hydrated && draft.savedId !== "new" && !!savedAddr;

  const validate = (id: StepId): boolean => {
    const e: Record<string, string> = {};
    if (id === "address" && !useSaved) {
      const r = addrSchema.safeParse(draft);
      if (!r.success) r.error.issues.forEach((i) => { e[String(i.path[0])] = i.message; });
    }
    if (id === "time") {
      if (!draft.dateKey) e.dateKey = t("Choose a date", "मिति रोज्नुहोस्");
      if (!draft.slotId) e.slotId = t("Choose a time window", "समय रोज्नुहोस्");
    }
    if (id === "review" && !draft.agree) e.agree = t("Please accept the booking terms to continue", "जारी राख्न बुकिङ सर्त स्वीकार गर्नुहोस्");
    if (id === "payment" && !draft.payment) e.payment = t("Choose how you would like to pay", "भुक्तानी कसरी गर्ने रोज्नुहोस्");
    setErrors(e);
    if (Object.keys(e).length) { toast(t("Please check the highlighted fields.", "कृपया चिनो लगाइएका ठाउँ जाँच्नुहोस्।"), "error"); return false; }
    return true;
  };

  const go = (n: number) => { setStep(n); setErrors({}); };
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); heading.current?.focus({ preventScroll: true }); }, [step]);

  const next = () => { if (validate(cur)) go(Math.min(ids.length - 1, step + 1)); };
  const back = () => go(Math.max(0, step - 1));

  /* ───── coupons ───── */
  const applyCoupon = () => {
    const code = draft.coupon.trim();
    if (!code) { setCouponMsg(t("Enter a code first.", "पहिले कोड लेख्नुहोस्।")); return; }
    const r = couponCheck(code, s, price.subtotal);
    if (r.ok) { set({ applied: r.offer.code, coupon: r.offer.code }); setCouponMsg(null); toast(t(`${r.offer.code} applied`, `${r.offer.code} लागू भयो`), "success"); return; }
    const o = OFFERS.find((x) => x.code.toLowerCase() === code.toLowerCase());
    const msg = r.reason === "unknown" ? t("That code is not valid in this demo. Try DEMO10.", "यो कोड यस डेमोमा मान्य छैन। DEMO10 प्रयास गर्नुहोस्।")
      : r.reason === "min" ? t(`Spend at least ${money(o?.minSpend ?? 0, "en")} to use this code.`, `यो कोड प्रयोग गर्न कम्तीमा ${money(o?.minSpend ?? 0, "ne")} खर्च गर्नुहोस्।`)
      : r.reason === "category" ? t(`This code is only for ${categoryBySlug(o?.category ?? "")?.name.en ?? "another category"}.`, "यो कोड अर्कै श्रेणीका लागि मात्र हो।")
      : t("Coupons do not apply to quote-based services.", "कोटेसनमा आधारित सेवामा कुपन लागू हुँदैन।");
    setCouponMsg(msg);
  };

  /* ───── confirm ───── */
  const buildAddress = (): Address => {
    if (useSaved && savedAddr) return savedAddr;
    return { id: `a${Date.now()}`, label: draft.label, name: draft.name.trim(), phone: draft.phone.trim(), district: draft.district as Dist, area: draft.area.trim(), street: draft.street.trim(), landmark: draft.landmark.trim(), pin: draft.pin };
  };
  const finish = () => {
    setProcessing(true);
    window.setTimeout(() => {
      const address = buildAddress();
      if (!useSaved && draft.saveAddr) saveAddress(address);
      const id = `FS-${Date.now().toString(36).slice(-5).toUpperCase()}`;
      const rec: BookingRecord = {
        id, serviceSlug: s.slug, mode: quote ? "quote" : "book", qty: draft.qty, addOnIds: draft.addOnIds, dateKey: draft.dateKey, slotId: draft.slotId, address,
        notes: draft.notes.trim(), photoCount: draft.photos.length, coupon: price.discount > 0 ? draft.applied : null, payment: quote ? "none" : (draft.payment || "cash") as Pay,
        total: price.total, status: 0, proId: (PROS.find((p) => p.category === s.category) ?? PROS[0]).id, createdAt: Date.now(), demo: true,
      };
      addBooking(rec);
      notify(quote ? "Quote request received (demo)" : "Booking received (demo)", `${s.name.en} · ${id}`);
      setRecord(rec);
      setProcessing(false);
      setPayOpen(false);
      go(ids.length - 1);
    }, 1100);
  };
  const submit = () => {
    if (!validate(cur)) return;
    if (!quote && draft.payment === "digital") setPayOpen(true); else finish();
  };

  const isLast = cur === "review" ? quote : cur === "payment";
  const ctaLabel = cur === "review" ? (quote ? t("Send quote request", "कोटेसन अनुरोध पठाउनुहोस्") : t("Continue to payment", "भुक्तानीमा जानुहोस्")) : cur === "payment" ? t("Confirm booking", "बुकिङ पुष्टि गर्नुहोस्") : t("Continue", "जारी राख्नुहोस्");
  const finalCta = isLast || (cur === "payment");
  const onCta = finalCta ? submit : next;

  const reviewRows: { label: string; value: React.ReactNode; to: number }[] = [
    { label: t("Service", "सेवा"), value: <>{t(s.name)}{q && <span className="text-muted"> · {num(draft.qty, lang)} {t(q.label).toLowerCase()}</span>}</>, to: 0 },
    { label: t("Address", "ठेगाना"), value: (() => { const a = useSaved && savedAddr ? savedAddr : { name: draft.name, phone: draft.phone, district: draft.district as Dist, area: draft.area, street: draft.street, landmark: draft.landmark }; return <>{a.name} · {a.phone}<br /><span className="text-muted">{a.street}, {a.area}, {a.district ? t(districtBySlug(a.district)!.name) : ""}{a.landmark ? ` (${a.landmark})` : ""}</span></>; })(), to: 1 },
    { label: t("Date & time", "मिति र समय"), value: draft.dateKey ? <>{dateLong(parseKey(draft.dateKey), lang)}<br /><span className="text-muted">{SLOTS.find((x) => x.id === draft.slotId)?.label}</span></> : "—", to: 2 },
    ...(!quote ? [{ label: t("Add-ons", "थप सेवा"), value: chosenAddons.length ? chosenAddons.map((a) => t(a.name)).join(", ") : <span className="text-muted">{t("None", "छैन")}</span>, to: 3 }] : []),
    { label: t("Details", "विवरण"), value: <>{draft.notes.trim() || <span className="text-muted">{t("No notes", "टिप्पणी छैन")}</span>}<br /><span className="text-muted">{num(draft.photos.length, lang)} {t("photo(s)", "तस्बिर")} · {draft.contact === "call" ? t("Prefers a call", "फोन रुचाउँछ") : t("Prefers WhatsApp", "ह्वाट्सएप रुचाउँछ")}</span></>, to: quote ? 3 : 4 },
  ];

  if (cur === "done" && record) return <BookingDone record={record} service={s} />;

  const currentDistrict = draft.district ? districtBySlug(draft.district) : null;

  return (
    <div className="bg-pale/50">
      <Container className="pb-32 pt-5 sm:pt-7 lg:pb-12">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t(cat.name), href: `/services/${cat.slug}` }, { label: t(s.name), href: `/services/${cat.slug}/${s.slug}` }, { label: quote ? t("Get a quote", "कोटेसन") : t("Book", "बुक") }]} />
        <div className="mb-6 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
          <Stepper steps={ids.map((i) => labels[i])} current={step} onJump={(i) => i < step && go(i)} />
          <p className="mt-3 text-sm text-muted xl:hidden" aria-live="polite">{t("Step", "चरण")} {num(step + 1, lang)} {t("of", "/")} {num(ids.length, lang)}: <strong className="text-ink">{labels[cur]}</strong></p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={cur} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }} className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
                <h1 ref={heading} tabIndex={-1} className="text-xl font-extrabold text-brand-deep focus-quiet sm:text-2xl">
                  {cur === "service" && (quote ? t("Confirm the service you need quoted", "कोटेसन चाहिने सेवा पुष्टि गर्नुहोस्") : t("Confirm your service", "आफ्नो सेवा पुष्टि गर्नुहोस्"))}
                  {cur === "address" && t("Where should the professional come?", "प्रोफेसनल कहाँ आउनुपर्छ?")}
                  {cur === "time" && t("Pick a date and time window", "मिति र समय रोज्नुहोस्")}
                  {cur === "addons" && t("Add anything extra?", "थप केही चाहिन्छ?")}
                  {cur === "details" && t("Tell us about the job", "कामबारे बताउनुहोस्")}
                  {cur === "review" && t("Review your booking", "आफ्नो बुकिङ समीक्षा गर्नुहोस्")}
                  {cur === "payment" && t("How would you like to pay?", "भुक्तानी कसरी गर्ने?")}
                </h1>

                {/* 1 — Service */}
                {cur === "service" && (
                  <div className="mt-5 space-y-5">
                    <div className="flex gap-4 rounded-2xl bg-pale p-3.5 sm:p-4">
                      <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36"><ServiceScene category={s.category} seed={s.slug} photo={imageKey.service(s.slug)} /></div>
                      <div className="min-w-0">
                        <Badge tone="brand">{t(cat.name)}</Badge>
                        <h2 className="mt-1.5 text-base font-bold text-ink sm:text-lg">{t(s.name)}</h2>
                        <p className="mt-0.5 line-clamp-2 text-sm text-muted">{t(s.short)}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1"><PriceLine s={s} /><span className="text-xs text-muted">{t(durationLabel(s.durationMin, s.durationMax))}</span></div>
                      </div>
                    </div>
                    {q && (
                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4">
                        <div><p className="text-sm font-bold text-ink">{t(q.label)}</p><p className="text-xs text-muted">{t("Billed per unit at the sample rate.", "नमुना दरमा प्रति एकाइ बिल।")}</p></div>
                        <QtyStepper value={draft.qty} min={q.min} max={q.max} onChange={(n) => set({ qty: n })} label={t(q.label)} />
                      </div>
                    )}
                    {quote && <div className="flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-ink"><Info className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden /><p>{t("This service is quoted after the professional inspects. You will receive a quote and decide whether to go ahead. Nothing is charged for the request itself.", "यो सेवाको कोटेसन प्रोफेसनलले निरीक्षण गरेपछि दिइन्छ। तपाईंले कोटेसन पाएर अगाडि बढ्ने कि नबढ्ने निर्णय गर्नुहुन्छ। अनुरोधको लागि केही शुल्क लाग्दैन।")}</p></div>}
                    <p className="text-sm text-muted">{t("Wrong service?", "गलत सेवा?")} <Link href={`/services/${cat.slug}`} className="font-semibold text-brand hover:underline">{t("Choose another", "अर्को रोज्नुहोस्")}</Link></p>
                  </div>
                )}

                {/* 2 — Address */}
                {cur === "address" && (
                  <div className="mt-5 space-y-5">
                    {hydrated && addresses.length > 0 && (
                      <fieldset className="space-y-2.5"><legend className="mb-1 text-sm font-bold text-ink">{t("Saved addresses", "सुरक्षित ठेगाना")}</legend>
                        {addresses.map((a) => <ChoiceCard key={a.id} name="addr" checked={draft.savedId === a.id} onChange={() => set({ savedId: a.id })}><span className="block font-bold text-ink">{a.label} · {a.name}</span><span className="block text-muted">{a.street}, {a.area}, {t(districtBySlug(a.district)!.name)}</span></ChoiceCard>)}
                        <ChoiceCard name="addr" checked={draft.savedId === "new"} onChange={() => set({ savedId: "new" })}><span className="font-bold text-ink">{t("Use a new address", "नयाँ ठेगाना प्रयोग गर्नुहोस्")}</span></ChoiceCard>
                      </fieldset>
                    )}
                    {!useSaved && (
                      <>
                        <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("Label", "लेबल")}</legend>
                          <div className="flex gap-2">{[["Home", "घर"], ["Office", "कार्यालय"], ["Other", "अन्य"]].map(([en, ne]) => <button key={en} type="button" aria-pressed={draft.label === en} onClick={() => set({ label: en })} className={cn("h-10 rounded-full border px-4 text-sm font-semibold transition-colors", draft.label === en ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40")}>{t(en, ne)}</button>)}</div>
                        </fieldset>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input label={t("Contact name", "सम्पर्क नाम")} required autoComplete="name" value={draft.name} onChange={(e) => set({ name: e.target.value })} error={errors.name} />
                          <Input label={t("Mobile number", "मोबाइल नम्बर")} required type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" value={draft.phone} onChange={(e) => set({ phone: e.target.value })} error={errors.phone} />
                          <Select label={t("District", "जिल्ला")} required value={draft.district} onChange={(e) => set({ district: e.target.value as Dist, area: "" })} error={errors.district}>
                            <option value="">{t("Select district", "जिल्ला रोज्नुहोस्")}</option>
                            {DISTRICTS.map((x) => <option key={x.slug} value={x.slug}>{t(x.name)}</option>)}
                          </Select>
                          <Select label={t("Area / neighbourhood", "क्षेत्र / टोल")} required value={draft.area} onChange={(e) => set({ area: e.target.value })} error={errors.area} disabled={!currentDistrict}>
                            <option value="">{currentDistrict ? t("Select area", "क्षेत्र रोज्नुहोस्") : t("Choose district first", "पहिले जिल्ला रोज्नुहोस्")}</option>
                            {currentDistrict?.neighbourhoods.map((n) => <option key={n} value={n}>{n}</option>)}
                            {currentDistrict && <option value="Other area">{t("Other area", "अन्य क्षेत्र")}</option>}
                          </Select>
                        </div>
                        <Input label={t("Street / house / building", "सडक / घर / भवन")} required autoComplete="street-address" value={draft.street} onChange={(e) => set({ street: e.target.value })} error={errors.street} hint={t("e.g. House 24, near the blue gate", "जस्तै: घर नं. २४, निलो गेट नजिक")} />
                        <Input label={t("Landmark (optional)", "ल्यान्डमार्क (ऐच्छिक)")} value={draft.landmark} onChange={(e) => set({ landmark: e.target.value })} />
                        <MapPinPicker value={draft.pin} onChange={(pin) => set({ pin })} />
                        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-ink"><input type="checkbox" checked={draft.saveAddr} onChange={(e) => set({ saveAddr: e.target.checked })} className="h-5 w-5 rounded border-line accent-[#1746A2]" />{t("Save this address for next time (on this device)", "अर्को पटकका लागि यो ठेगाना सुरक्षित गर्नुहोस् (यही उपकरणमा)")}</label>
                      </>
                    )}
                  </div>
                )}

                {/* 3 — Date & time */}
                {cur === "time" && (
                  <div className="mt-5 space-y-6">
                    {days && now ? (
                      <>
                        <div>
                          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><CalendarDays className="h-4 w-4 text-brand" aria-hidden />{t("Next 7 days", "अर्को ७ दिन")}</h2>
                          <DateSelector days={days} value={draft.dateKey} onChange={(k) => set({ dateKey: k, slotId: "" })} />
                          {!s.sameDay && <p className="mt-2.5 text-xs text-muted">{t("Today is unavailable because this service needs advance booking.", "यो सेवामा अग्रिम बुकिङ चाहिने भएकाले आज उपलब्ध छैन।")}</p>}
                          {errors.dateKey && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{errors.dateKey}</p>}
                        </div>
                        <div>
                          <h2 className="mb-3 text-sm font-bold text-ink">{t("Time window", "समय")}{draft.dateKey && <span className="font-medium text-muted"> · {dateLong(parseKey(draft.dateKey), lang)}</span>}</h2>
                          <TimeSlotSelector slots={slots} value={draft.slotId} onChange={(id) => set({ slotId: id })} />
                          {errors.slotId && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{errors.slotId}</p>}
                          <p className="mt-3 flex items-start gap-2 text-xs text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{t("Availability here is simulated for the demo. In the live service, the team confirms the window after assigning a professional.", "यहाँको उपलब्धता डेमोका लागि नक्कल हो। वास्तविक सेवामा प्रोफेसनल तोकेपछि टोलीले समय पुष्टि गर्नेछ।")}</p>
                        </div>
                      </>
                    ) : <div className="grid gap-3 sm:grid-cols-7" aria-busy><div className="col-span-full h-24 animate-pulse rounded-2xl bg-pale-2/70" /></div>}
                  </div>
                )}

                {/* 4 — Add-ons */}
                {cur === "addons" && (
                  <div className="mt-5 space-y-3">
                    <p className="text-sm text-muted">{t("Optional. The total updates as you choose.", "ऐच्छिक। छनोट गर्दै जाँदा जम्मा परिवर्तन हुन्छ।")}</p>
                    {d.addOns.map((a) => (
                      <ChoiceCard key={a.id} type="checkbox" checked={draft.addOnIds.includes(a.id)} onChange={() => set({ addOnIds: draft.addOnIds.includes(a.id) ? draft.addOnIds.filter((x) => x !== a.id) : [...draft.addOnIds, a.id] })}>
                        <span className="flex items-center justify-between gap-3"><span className="font-semibold text-ink">{t(a.name)}</span><span className="font-bold text-brand-deep">+ {money(a.price, lang)}</span></span>
                      </ChoiceCard>
                    ))}
                  </div>
                )}

                {/* 5 — Details */}
                {cur === "details" && (
                  <div className="mt-5 space-y-6">
                    <Textarea label={t("Describe the problem or what you need", "समस्या वा चाहिएको कुरा बताउनुहोस्")} value={draft.notes} onChange={(e) => set({ notes: e.target.value })} maxLength={500} hint={`${num(draft.notes.length, lang)}/${num(500, lang)}`} placeholder={t("e.g. The pipe under the kitchen sink leaks when the tap is on.", "जस्तै: धारा खोल्दा भान्साको सिंकमुनिको पाइप चुहिन्छ।")} />
                    <PhotoUpload photos={draft.photos} onChange={(photos) => set({ photos })} />
                    <fieldset><legend className="mb-2 text-sm font-semibold text-ink">{t("How should the professional reach you?", "प्रोफेसनलले कसरी सम्पर्क गरोस्?")}</legend>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <ChoiceCard name="contact" checked={draft.contact === "call"} onChange={() => set({ contact: "call" })}>{t("Phone call", "फोन कल")}</ChoiceCard>
                        <ChoiceCard name="contact" checked={draft.contact === "whatsapp"} onChange={() => set({ contact: "whatsapp" })}>WhatsApp</ChoiceCard>
                      </div>
                    </fieldset>
                    <div className="rounded-xl bg-pale p-4"><p className="mb-1.5 text-sm font-bold text-ink">{t("How to prepare", "तयारी कसरी गर्ने")}</p><ul className="list-disc space-y-1 pl-5 text-sm text-muted">{d.prep.map((x, i) => <li key={i}>{t(x)}</li>)}</ul></div>
                  </div>
                )}

                {/* 6 — Review */}
                {cur === "review" && (
                  <div className="mt-5 space-y-5">
                    <dl className="divide-y divide-line rounded-2xl border border-line">
                      {reviewRows.map((r) => (
                        <div key={r.label} className="flex items-start justify-between gap-3 p-4">
                          <div className="min-w-0"><dt className="text-xs font-bold uppercase tracking-wide text-muted">{r.label}</dt><dd className="mt-1 text-[15px] text-ink">{r.value}</dd></div>
                          <button type="button" onClick={() => go(r.to)} className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg px-2.5 text-sm font-semibold text-brand hover:bg-pale"><Pencil className="h-3.5 w-3.5" aria-hidden />{t("Edit", "सम्पादन")}<span className="sr-only"> {r.label}</span></button>
                        </div>
                      ))}
                    </dl>
                    {!quote && (
                      <div>
                        <label htmlFor="coupon" className="mb-1.5 block text-sm font-semibold text-ink">{t("Coupon code", "कुपन कोड")}</label>
                        {draft.applied && couponStatus?.ok ? (
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-success/40 bg-success-50 px-4 py-3"><p className="inline-flex items-center gap-2 text-sm font-bold text-success"><Tag className="h-4 w-4" aria-hidden />{draft.applied} — {t("saves", "बचत")} {money(price.discount, lang)}</p><button type="button" onClick={() => { set({ applied: null, coupon: "" }); setCouponMsg(null); }} className="text-sm font-semibold text-ink underline-offset-2 hover:underline">{t("Remove", "हटाउनुहोस्")}</button></div>
                        ) : (
                          <>
                            <div className="flex gap-2.5">
                              <input id="coupon" value={draft.coupon} onChange={(e) => set({ coupon: e.target.value.toUpperCase() })} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } }} placeholder="DEMO10" className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-white px-3.5 font-mono text-[15px] uppercase tracking-wider placeholder:text-muted/60 hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" />
                              <Button variant="outline" size="lg" onClick={applyCoupon}>{t("Apply", "लागू")}</Button>
                            </div>
                            {(couponMsg || (draft.applied && couponStatus && !couponStatus.ok)) && <p role="alert" className="mt-2 text-xs font-semibold text-danger">{couponMsg ?? t("This code no longer applies to your current total.", "यो कोड अहिलेको जम्मामा लागू हुँदैन।")}</p>}
                            <p className="mt-2 text-xs text-muted">{t("Demo codes:", "डेमो कोड:")} {OFFERS.slice(0, 3).map((o) => o.code).join(", ")}</p>
                          </>
                        )}
                      </div>
                    )}
                    <ConsentCheck id="agree" checked={draft.agree} onChange={(v) => set({ agree: v })} error={errors.agree}>
                      {t("I have read the", "मैले")} <LegalLink slug="service-terms">{t("service booking terms", "सेवा बुकिङ सर्त")}</LegalLink>{", "}<LegalLink slug="cancellation">{t("cancellation & refunds", "रद्द तथा फिर्ता")}</LegalLink>{t(" and ", " र ")}<LegalLink slug="privacy">{t("privacy policy", "गोपनीयता नीति")}</LegalLink> {t("(all drafts), and I understand this is a demo.", "(सबै मस्यौदा) पढेको छु, र यो डेमो हो भन्ने बुझेको छु।")}
                    </ConsentCheck>
                  </div>
                )}

                {/* 7 — Payment */}
                {cur === "payment" && (
                  <div className="mt-5 space-y-3">
                    <fieldset className="space-y-3"><legend className="sr-only">{t("Payment method", "भुक्तानी विधि")}</legend>
                      <ChoiceCard name="pay" checked={draft.payment === "cash"} onChange={() => set({ payment: "cash" })}><span className="flex items-start gap-3"><Banknote className="mt-0.5 h-5 w-5 text-brand" aria-hidden /><span><span className="block font-bold text-ink">{t("Cash After Service", "सेवापछि नगद")}</span><span className="block text-muted">{t("Pay the professional once you are happy with the work.", "काम चित्त बुझेपछि प्रोफेसनललाई तिर्नुहोस्।")}</span></span></span></ChoiceCard>
                      <ChoiceCard name="pay" checked={draft.payment === "digital"} onChange={() => set({ payment: "digital" })}><span className="flex items-start gap-3"><Smartphone className="mt-0.5 h-5 w-5 text-brand" aria-hidden /><span><span className="block font-bold text-ink">{t("Digital Payment", "डिजिटल भुक्तानी")} <Badge tone="amber" className="ml-1">{t("Demo", "डेमो")}</Badge></span><span className="block text-muted">{t("Opens a simulated payment screen. No wallet or bank is contacted.", "नक्कल भुक्तानी स्क्रिन खुल्छ। कुनै वालेट वा बैंकसँग सम्पर्क हुँदैन।")}</span></span></span></ChoiceCard>
                      <ChoiceCard name="pay" checked={draft.payment === "card"} onChange={() => set({ payment: "card" })}><span className="flex items-start gap-3"><CreditCard className="mt-0.5 h-5 w-5 text-brand" aria-hidden /><span><span className="block font-bold text-ink">{t("Demo Card", "डेमो कार्ड")} <Badge tone="amber" className="ml-1">{t("Demo", "डेमो")}</Badge></span><span className="block text-muted">{t("A sample card for testing the screen. Nothing is charged.", "स्क्रिन जाँच्न नमुना कार्ड। केही शुल्क लाग्दैन।")}</span></span></span></ChoiceCard>
                    </fieldset>
                    {errors.payment && <p role="alert" className="text-xs font-semibold text-danger">{errors.payment}</p>}
                    {draft.payment === "card" && (
                      <div className="animate-[pop_.2s_ease-out] rounded-2xl bg-gradient-to-br from-brand-deep to-brand p-5 text-white shadow-lift" data-dark>
                        <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-white/70">{t("Demo card", "डेमो कार्ड")}</span><CreditCard className="h-6 w-6 text-amber" aria-hidden /></div>
                        <p className="mt-6 font-mono text-lg tracking-[0.2em]" aria-label="Demo card number ending 4242">•••• •••• •••• 4242</p>
                        <div className="mt-4 flex items-end justify-between text-xs text-white/80"><div><p className="uppercase tracking-wide opacity-70">{t("Name", "नाम")}</p><p className="mt-0.5 font-semibold text-white">DEMO CUSTOMER</p></div><div><p className="uppercase tracking-wide opacity-70">{t("Expires", "म्याद")}</p><p className="mt-0.5 font-semibold text-white">12/30</p></div></div>
                        <p className="mt-4 text-[11px] text-white/70">{t("Read-only sample. Never enter a real card number in a prototype.", "पढ्न मात्र मिल्ने नमुना। प्रोटोटाइपमा कहिल्यै वास्तविक कार्ड नम्बर नलेख्नुहोस्।")}</p>
                      </div>
                    )}
                    <p className="flex items-start gap-2 pt-1 text-xs text-muted"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t("No real payment is taken anywhere in this prototype.", "यो प्रोटोटाइपमा कहीं पनि वास्तविक भुक्तानी लिइँदैन।")}</p>
                  </div>
                )}

                {/* Controls */}
                <div className="mt-7 hidden items-center justify-between gap-3 border-t border-line pt-5 lg:flex">
                  <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" aria-hidden />{t("Back", "पछाडि")}</Button>
                  <Button variant={finalCta ? "accent" : "primary"} size="lg" onClick={onCta} loading={processing}>{ctaLabel}{!finalCta && <ArrowRight className="h-4 w-4" aria-hidden />}</Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="hidden space-y-4 lg:sticky lg:top-28 lg:block" aria-label={t("Booking summary", "बुकिङ सारांश")}>
            <PriceSummary service={s} qty={draft.qty} addOnIds={draft.addOnIds} coupon={draft.applied} />
            {step >= 2 && draft.dateKey && (
              <div className="rounded-2xl border border-line bg-white p-5 shadow-card text-sm">
                <p className="mb-2 flex items-center gap-2 font-bold text-ink"><CalendarDays className="h-4 w-4 text-brand" aria-hidden />{dateLong(parseKey(draft.dateKey), lang)}</p>
                {draft.slotId && <p className="text-muted">{SLOTS.find((x) => x.id === draft.slotId)?.label}</p>}
                {(useSaved ? savedAddr?.area : draft.area) && <p className="mt-2 flex items-start gap-2 text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{useSaved ? savedAddr?.area : draft.area}</p>}
              </div>
            )}
            <p className="flex items-start gap-2 rounded-xl bg-white/70 p-3.5 text-xs text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{t("Prototype: everything stays on your device.", "प्रोटोटाइप: सबै कुरा तपाईंको उपकरणमै रहन्छ।")}</p>
          </aside>
        </div>
      </Container>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-4 pb-safe pt-2.5 shadow-bar lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3 pb-2.5">
          <button type="button" onClick={() => setPriceOpen(true)} aria-haspopup="dialog" className="min-w-0 flex-1 text-left">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-muted">{quote ? t("Due now", "अहिले") : t("Total", "जम्मा")}<ChevronUp className="h-3.5 w-3.5" aria-hidden /></span>
            <span className="block truncate text-lg font-extrabold leading-tight text-brand-deep">{money(price.total, lang)}</span>
          </button>
          {step > 0 && <Button variant="outline" size="md" onClick={back} aria-label={t("Back", "पछाडि")} className="px-3.5"><ArrowLeft className="h-4 w-4" aria-hidden /></Button>}
          <Button variant={finalCta ? "accent" : "primary"} size="md" onClick={onCta} loading={processing} className="min-w-[8.5rem]">{ctaLabel}</Button>
        </div>
      </div>

      <Sheet open={priceOpen} onClose={() => setPriceOpen(false)} side="bottom" title={t("Price details", "मूल्य विवरण")}>
        <div className="p-4"><PriceSummary service={s} qty={draft.qty} addOnIds={draft.addOnIds} coupon={draft.applied} compact className="border-0 p-1 shadow-none" /></div>
      </Sheet>

      {/* Simulated digital payment screen */}
      <Sheet open={payOpen} onClose={() => !processing && setPayOpen(false)} side="center" title={t("Demo payment", "डेमो भुक्तानी")}>
        <div className="space-y-4 p-5">
          <div className="rounded-xl bg-amber-50 p-3.5 text-sm text-ink"><strong>{t("Simulated screen.", "नक्कल स्क्रिन।")}</strong> {t("No money moves and no provider is contacted.", "कुनै रकम सर्दैन र कुनै प्रदायकसँग सम्पर्क हुँदैन।")}</div>
          <div className="flex items-center justify-between rounded-xl border border-line p-4"><span className="text-sm text-muted">{t("Amount", "रकम")}</span><span className="text-2xl font-extrabold text-brand-deep">{money(price.total, lang)}</span></div>
          <div className="grid grid-cols-2 gap-3"><Button variant="outline" onClick={() => setPayOpen(false)} disabled={processing}>{t("Cancel", "रद्द")}</Button><Button variant="accent" onClick={finish} loading={processing}>{t("Approve (demo)", "स्वीकृत (डेमो)")}</Button></div>
        </div>
      </Sheet>
    </div>
  );
}
