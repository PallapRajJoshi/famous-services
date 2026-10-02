"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Bell, KeyRound, CalendarClock, CreditCard, Download, Heart, History, MapPin, Plus, Receipt, Star, Trash2, Undo2 } from "lucide-react";
import { categoryBySlug, detailsFor, serviceBySlug } from "@/data/catalog";
import { DISTRICTS, OFFERS, SLOTS, districtBySlug } from "@/data/content";
import { ServiceScene } from "@/components/art/scenes";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Select, Textarea } from "@/components/ui/fields";
import { Sheet } from "@/components/ui/sheet";
import { EmptyState } from "@/components/ui/states";
import { Reveal } from "@/components/ui/motion";
import { OfferCard } from "@/components/cards/offer-card";
import { ServiceGrid } from "@/components/catalog/service-grid";
import { ListingCard } from "@/components/rentals/listing-card";
import { listingById } from "@/data/rentals";
import { statusBadge } from "@/components/track/track-view";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated, type Address, type BookingRecord } from "@/store/app-store";
import { useAllBookings } from "@/lib/bookings";
import { computePrice } from "@/lib/pricing";
import { dateLong, money, num, parseKey } from "@/lib/format";
import { cn } from "@/lib/cn";
import { imageKey } from "@/config/images";

const Card = ({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) => (
  <section className={cn("rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6", className)}>
    {(title || action) && <div className="mb-4 flex items-center justify-between gap-3">{title && <h2 className="text-lg font-extrabold text-brand-deep">{title}</h2>}{action}</div>}
    {children}
  </section>
);

function BookingRow({ b }: { b: BookingRecord }) {
  const { t, lang } = useLang();
  const s = serviceBySlug(b.serviceSlug);
  const sb = statusBadge(b.status, b.mode);
  const slot = SLOTS.find((x) => x.id === b.slotId);
  return (
    <li>
      <Link href={`/track/${b.id}`} className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:gap-4 sm:p-4">
        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl sm:h-[72px] sm:w-24">{s && <ServiceScene category={s.category} seed={s.slug} photo={imageKey.service(s.slug)} />}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5"><span className="font-mono text-[11px] font-bold tracking-wider text-brand">{b.id}</span>{b.demo && <Badge tone="amber">{t("Demo", "डेमो")}</Badge>}</div>
          <p className="truncate text-[15px] font-bold text-ink">{s ? t(s.name) : b.serviceSlug}</p>
          <p className="truncate text-xs text-muted">{dateLong(parseKey(b.dateKey), lang)} · {slot?.label}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5"><Badge tone={sb.tone}>{t(sb.en, sb.ne)}</Badge><span className="text-sm font-bold text-brand-deep">{money(b.total, lang)}</span></div>
        <ArrowRight className="hidden h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1 sm:block" aria-hidden />
      </Link>
    </li>
  );
}

function Stat({ icon, v, l }: { icon: React.ReactNode; v: string; l: string }) {
  return <div className="rounded-2xl border border-line bg-white p-4 shadow-card"><div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-pale text-brand">{icon}</div><p className="text-2xl font-extrabold text-brand-deep">{v}</p><p className="text-xs font-medium text-muted">{l}</p></div>;
}

/* ───────────── Overview ───────────── */
function Overview() {
  const { t, lang } = useLang();
  const { all } = useAllBookings();
  const saved = useApp((s) => s.saved);
  const savedListings = useApp((s) => s.savedListings);
  const notifs = useApp((s) => s.notifications);
  const upcoming = all.filter((b) => b.status >= 0 && b.status < 5);
  const next = upcoming[0];
  const unread = notifs.filter((n) => !n.read).length;
  return (
    <div className="space-y-6">
      <p className="-mt-3 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-ink">{t("Demo account. Bookings marked Demo are samples so the screens are not empty.", "डेमो खाता। डेमो चिनो भएका बुकिङ स्क्रिन खाली नदेखियोस् भनेर राखिएका नमुना हुन्।")}</p>
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <Stat icon={<CalendarClock className="h-5 w-5" aria-hidden />} v={num(upcoming.length, lang)} l={t("Upcoming", "आगामी")} />
        <Stat icon={<History className="h-5 w-5" aria-hidden />} v={num(all.filter((b) => b.status >= 5).length, lang)} l={t("Completed", "सम्पन्न")} />
        <Stat icon={<Heart className="h-5 w-5" aria-hidden />} v={num(saved.length + savedListings.length, lang)} l={t("Saved items", "सुरक्षित वस्तु")} />
        <Stat icon={<Bell className="h-5 w-5" aria-hidden />} v={num(unread, lang)} l={t("Unread alerts", "नपढिएका सूचना")} />
      </div>
      <Card title={t("Next booking", "अर्को बुकिङ")} action={<Link href="/account/upcoming" className="text-sm font-bold text-brand hover:underline">{t("View all", "सबै हेर्नुहोस्")}</Link>}>
        {next ? <ul><BookingRow b={next} /></ul> : <EmptyState title={t("No upcoming bookings", "आगामी बुकिङ छैन")} body={t("Book a service and it will show up here.", "सेवा बुक गर्नुहोस् र यहाँ देखिन्छ।")} action={<ButtonLink href="/services" variant="accent">{t("Book a Service", "सेवा बुक गर्नुहोस्")}</ButtonLink>} className="!py-8" />}
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={t("Quick actions", "छिटो काम")}>
          <div className="grid grid-cols-2 gap-3">
            {[["/services", t("Book a service", "सेवा बुक"), "accent"], ["/track", t("Track booking", "ट्र्याक"), "soft"], ["/rentals", t("Rentals & property", "भाडा तथा सम्पत्ति"), "soft"], ["/offers", t("See offers", "अफर हेर्नुहोस्"), "soft"], ["/account/support", t("Get support", "सहयोग"), "soft"]].map(([h, l, v]) => <ButtonLink key={h} href={h} variant={v as "accent" | "soft"} className="w-full">{l}</ButtonLink>)}
          </div>
        </Card>
        <Card title={t("Recent notifications", "हालका सूचना")} action={<Link href="/account/notifications" className="text-sm font-bold text-brand hover:underline">{t("All", "सबै")}</Link>}>
          <ul className="space-y-3">{notifs.slice(0, 3).map((n) => <li key={n.id} className="flex gap-3"><span aria-hidden className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-line" : "bg-amber")} /><div><p className="text-sm font-semibold text-ink">{n.title}</p><p className="text-xs text-muted">{n.body}</p></div></li>)}</ul>
        </Card>
      </div>
    </div>
  );
}

/* ───────────── Bookings lists ───────────── */
function Bookings({ kind }: { kind: "upcoming" | "history" }) {
  const { t } = useLang();
  const { all, ready } = useAllBookings();
  const list = all.filter((b) => (kind === "upcoming" ? b.status >= 0 && b.status < 5 : b.status >= 5 || b.status < 0));
  if (!ready) return <p className="text-sm text-muted">{t("Loading…", "लोड हुँदैछ…")}</p>;
  if (!list.length) return <EmptyState icon={kind === "upcoming" ? <CalendarClock className="h-6 w-6" aria-hidden /> : <History className="h-6 w-6" aria-hidden />} title={kind === "upcoming" ? t("Nothing scheduled", "केही तय छैन") : t("No past bookings yet", "अहिलेसम्म पुराना बुकिङ छैन")} body={t("When you book a service it will appear here.", "सेवा बुक गरेपछि यहाँ देखिन्छ।")} action={<ButtonLink href="/services" variant="accent">{t("Browse services", "सेवा हेर्नुहोस्")}</ButtonLink>} />;
  return <ul className="space-y-3">{list.map((b) => <Reveal key={b.id} as="li" className="list-none"><ul><BookingRow b={b} /></ul></Reveal>)}</ul>;
}

/* ───────────── Profile ───────────── */
function Profile() {
  const { t } = useLang();
  const { user, updateUser, toast } = useApp();
  const [name, setName] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [err, setErr] = React.useState<{ name?: string; email?: string }>({});
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof err = {};
    if (name.trim().length < 2) er.name = t("Enter your name", "आफ्नो नाम लेख्नुहोस्");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) er.email = t("Enter a valid email address", "मान्य इमेल लेख्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    updateUser({ name: name.trim(), email: email.trim() });
    toast(t("Profile saved (on this device)", "प्रोफाइल सुरक्षित (यही उपकरणमा)"), "success");
  };
  return (
    <Card><form onSubmit={save} noValidate className="max-w-xl space-y-4">
      <Input label={t("Full name", "पूरा नाम")} value={name} onChange={(e) => setName(e.target.value)} error={err.name} required />
      <Input label={t("Mobile number", "मोबाइल नम्बर")} value={user?.phone ?? ""} readOnly hint={t("Your login number cannot be changed in the demo.", "डेमोमा लगइन नम्बर परिवर्तन गर्न मिल्दैन।")} />
      <Input label={t("Email (optional)", "इमेल (ऐच्छिक)")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={err.email} />
      <Button type="submit" size="lg">{t("Save changes", "परिवर्तन सुरक्षित गर्नुहोस्")}</Button>
    </form></Card>
  );
}

/* ───────────── Addresses ───────────── */
function Addresses() {
  const { t } = useLang();
  const { addresses, saveAddress, removeAddress, toast } = useApp();
  const [open, setOpen] = React.useState(false);
  const [f, setF] = React.useState({ label: "Home", name: "", phone: "", district: "" as "" | "kathmandu" | "lalitpur" | "bhaktapur", area: "", street: "", landmark: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const d = f.district ? districtBySlug(f.district) : null;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = t("Enter the contact name", "सम्पर्क नाम लेख्नुहोस्");
    if (!/^(\+977[- ]?)?9[78]\d{8}$/.test(f.phone.trim())) er.phone = t("Enter a valid Nepal mobile number", "मान्य नेपाली मोबाइल नम्बर लेख्नुहोस्");
    if (!f.district) er.district = t("Choose a district", "जिल्ला रोज्नुहोस्");
    if (!f.area) er.area = t("Choose an area", "क्षेत्र रोज्नुहोस्");
    if (f.street.trim().length < 3) er.street = t("Add a street or house", "सडक वा घर थप्नुहोस्");
    setErr(er);
    if (Object.keys(er).length) return;
    const a: Address = { id: `a${Date.now()}`, label: f.label, name: f.name.trim(), phone: f.phone.trim(), district: f.district as Address["district"], area: f.area, street: f.street.trim(), landmark: f.landmark.trim(), pin: null };
    saveAddress(a); setOpen(false); toast(t("Address saved", "ठेगाना सुरक्षित भयो"), "success");
    setF({ ...f, name: "", phone: "", area: "", street: "", landmark: "" });
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" aria-hidden />{t("Add address", "ठेगाना थप्नुहोस्")}</Button></div>
      {addresses.length === 0 ? <EmptyState icon={<MapPin className="h-6 w-6" aria-hidden />} title={t("No saved addresses", "सुरक्षित ठेगाना छैन")} body={t("Add one now, or save an address while booking.", "अहिले थप्नुहोस्, वा बुकिङका बेला सुरक्षित गर्नुहोस्।")} /> : (
        <ul className="grid gap-4 md:grid-cols-2">{addresses.map((a) => (
          <li key={a.id} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-start justify-between gap-3"><div><Badge tone="brand">{a.label}</Badge><p className="mt-2 font-bold text-ink">{a.name}</p><p className="text-sm text-muted">{a.phone}</p></div>
              <button type="button" onClick={() => { removeAddress(a.id); toast(t("Address removed", "ठेगाना हटाइयो"), "info"); }} aria-label={`${t("Remove address", "ठेगाना हटाउनुहोस्")}: ${a.street}`} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-danger-50 hover:text-danger"><Trash2 className="h-[18px] w-[18px]" aria-hidden /></button></div>
            <p className="mt-3 flex items-start gap-2 text-sm text-ink"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{a.street}, {a.area}, {t(districtBySlug(a.district)!.name)}{a.landmark ? ` (${a.landmark})` : ""}</p>
          </li>))}</ul>
      )}
      <Sheet open={open} onClose={() => setOpen(false)} side="center" title={t("Add address", "ठेगाना थप्नुहोस्")}>
        <form onSubmit={submit} noValidate className="space-y-4 p-5">
          <Select label={t("Label", "लेबल")} value={f.label} onChange={(e) => setF({ ...f, label: e.target.value })}><option>Home</option><option>Office</option><option>Other</option></Select>
          <Input label={t("Contact name", "सम्पर्क नाम")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} error={err.name} required />
          <Input label={t("Mobile number", "मोबाइल नम्बर")} type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} error={err.phone} required placeholder="98XXXXXXXX" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label={t("District", "जिल्ला")} value={f.district} onChange={(e) => setF({ ...f, district: e.target.value as typeof f.district, area: "" })} error={err.district} required><option value="">{t("Select", "रोज्नुहोस्")}</option>{DISTRICTS.map((x) => <option key={x.slug} value={x.slug}>{t(x.name)}</option>)}</Select>
            <Select label={t("Area", "क्षेत्र")} value={f.area} onChange={(e) => setF({ ...f, area: e.target.value })} error={err.area} required disabled={!d}><option value="">{t("Select", "रोज्नुहोस्")}</option>{d?.neighbourhoods.map((n) => <option key={n}>{n}</option>)}<option>Other area</option></Select>
          </div>
          <Input label={t("Street / house / building", "सडक / घर / भवन")} value={f.street} onChange={(e) => setF({ ...f, street: e.target.value })} error={err.street} required />
          <Input label={t("Landmark (optional)", "ल्यान्डमार्क (ऐच्छिक)")} value={f.landmark} onChange={(e) => setF({ ...f, landmark: e.target.value })} />
          <Button type="submit" size="lg" className="w-full">{t("Save address", "ठेगाना सुरक्षित गर्नुहोस्")}</Button>
        </form>
      </Sheet>
    </div>
  );
}

/* ───────────── Saved ───────────── */
function Saved() {
  const { t } = useLang();
  const saved = useApp((s) => s.saved);
  const savedListings = useApp((s) => s.savedListings);
  const hydrated = useHydrated();
  const list = saved.map((x) => serviceBySlug(x)).filter((x): x is NonNullable<typeof x> => !!x);
  const props = savedListings.map((x) => listingById(x)).filter((x): x is NonNullable<typeof x> => !!x);
  if (!hydrated) return <p className="text-sm text-muted">{t("Loading…", "लोड हुँदैछ…")}</p>;
  if (!list.length && !props.length) return <EmptyState icon={<Heart className="h-6 w-6" aria-hidden />} title={t("Nothing saved yet", "अहिलेसम्म केही सुरक्षित छैन")} body={t("Tap the heart on any service or listing to keep it here.", "कुनै सेवा वा सूचीमा मुटु चिन्ह थिचेर यहाँ राख्नुहोस्।")} action={<div className="flex flex-wrap justify-center gap-2.5"><ButtonLink href="/services">{t("Browse services", "सेवा हेर्नुहोस्")}</ButtonLink><ButtonLink href="/rentals" variant="outline">{t("Rentals & property", "भाडा तथा सम्पत्ति")}</ButtonLink></div>} />;
  return (
    <div className="space-y-8">
      {list.length > 0 && <div><h2 className="mb-4 text-lg font-extrabold text-brand-deep">{t("Services", "सेवाहरू")}</h2><ServiceGrid services={list} cols={3} /></div>}
      {props.length > 0 && <div><h2 className="mb-4 text-lg font-extrabold text-brand-deep">{t("Rentals & property", "भाडा तथा सम्पत्ति")}</h2><div className="grid gap-4 min-[520px]:grid-cols-2 xl:grid-cols-3">{props.map((l) => <ListingCard key={l.id} listing={l} />)}</div></div>}
    </div>
  );
}

/* ───────────── Rental requests ───────────── */
function RentalRequests() {
  const { t, lang } = useLang();
  const list = useApp((s) => s.enquiries);
  const hydrated = useHydrated();
  if (!hydrated) return <p className="text-sm text-muted">{t("Loading…", "लोड हुँदैछ…")}</p>;
  if (!list.length) return <EmptyState icon={<KeyRound className="h-6 w-6" aria-hidden />} title={t("No rental requests yet", "अहिलेसम्म भाडा अनुरोध छैन")} body={t("Request a visit on any listing, or list your own, and it will show up here.", "कुनै सूचीमा भ्रमण अनुरोध गर्नुहोस्, वा आफ्नै सूचीकृत गर्नुहोस्, यहाँ देखिन्छ।")} action={<div className="flex flex-wrap justify-center gap-2.5"><ButtonLink href="/rentals">{t("Browse listings", "सूची हेर्नुहोस्")}</ButtonLink><ButtonLink href="/rentals/list" variant="outline">{t("List your property", "आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्")}</ButtonLink></div>} />;
  return (
    <ul className="space-y-3">
      {list.map((e) => {
        const l = e.listingId !== "owner" ? listingById(e.listingId) : null;
        return (
          <Reveal key={e.id} as="li" className="list-none">
            <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-xs font-bold text-brand">{e.id}</span><Badge tone={e.kind === "owner" ? "brand" : "success"}>{e.kind === "owner" ? t("Owner listing request", "घरधनीको सूचीकरण अनुरोध") : t("Visit request", "भ्रमण अनुरोध")} · {t("Saved (demo)", "सुरक्षित (डेमो)")}</Badge></div>
              <p className="mt-2 text-[15px] font-bold text-ink">{l ? <Link href={`/rentals/${l.kind}/${l.id}`} className="hover:text-brand hover:underline">{e.listingTitle}</Link> : e.listingTitle}</p>
              <p className="mt-1 text-sm text-muted">{e.kind === "owner" ? "" : `${t("Preferred time", "उपयुक्त समय")}: ${e.when} · `}{dateLong(new Date(e.at), lang)}</p>
              {e.message && <p className="mt-2 rounded-lg bg-pale p-3 text-sm text-ink">{e.message}</p>}
              <p className="mt-2 text-[11px] text-muted">{t("Kept on this device only — nothing was sent.", "यही उपकरणमा मात्र रहन्छ — केही पठाइएको छैन।")}</p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}

/* ───────────── Coupons ───────────── */
function Coupons() {
  const { t } = useLang();
  return <div><p className="mb-5 text-sm text-muted">{t("Demo coupons. They show how codes work at the review step of a booking.", "डेमो कुपन। बुकिङको समीक्षा चरणमा कोडले कसरी काम गर्छ देखाउँछन्।")}</p><div className="grid gap-5 md:grid-cols-2">{OFFERS.map((o) => <OfferCard key={o.code} offer={o} />)}</div></div>;
}

/* ───────────── Payments ───────────── */
function Payments() {
  const { t, lang } = useLang();
  const { all } = useAllBookings();
  const [card, setCard] = React.useState(true);
  const toast = useApp((s) => s.toast);
  const paid = all.filter((b) => b.payment !== "none" && b.status >= 0);
  return (
    <div className="space-y-6">
      <Card title={t("Payment methods", "भुक्तानी विधि")}>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-xl border border-line p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-pale text-brand"><Receipt className="h-5 w-5" aria-hidden /></span><div className="flex-1"><p className="font-bold text-ink">{t("Cash After Service", "सेवापछि नगद")}</p><p className="text-xs text-muted">{t("Default option", "पूर्वनिर्धारित विकल्प")}</p></div><Badge tone="success">{t("Default", "पूर्वनिर्धारित")}</Badge></li>
          {card && <li className="flex items-center gap-3 rounded-xl border border-line p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-pale text-brand"><CreditCard className="h-5 w-5" aria-hidden /></span><div className="flex-1"><p className="font-bold text-ink">{t("Demo card", "डेमो कार्ड")} •••• 4242</p><p className="text-xs text-muted">{t("Sample only. Nothing is stored or charged.", "नमुना मात्र। केही भण्डारण वा शुल्क लाग्दैन।")}</p></div><Button variant="ghost" size="sm" onClick={() => { setCard(false); toast(t("Demo card removed", "डेमो कार्ड हटाइयो"), "info"); }}>{t("Remove", "हटाउनुहोस्")}</Button></li>}
        </ul>
        {!card && <Button variant="outline" className="mt-3" onClick={() => setCard(true)}><Plus className="h-4 w-4" aria-hidden />{t("Add demo card", "डेमो कार्ड थप्नुहोस्")}</Button>}
      </Card>
      <Card title={t("Payment history", "भुक्तानी इतिहास")}>
        {paid.length ? <ul className="divide-y divide-line">{paid.map((b) => { const s = serviceBySlug(b.serviceSlug); return <li key={b.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{s ? t(s.name) : b.serviceSlug}</p><p className="font-mono text-[11px] text-muted">{b.id} · {b.payment === "cash" ? t("Cash", "नगद") : b.payment === "digital" ? t("Digital (demo)", "डिजिटल (डेमो)") : t("Demo card", "डेमो कार्ड")}</p></div><div className="text-right"><p className="font-bold text-brand-deep">{money(b.total, lang)}</p><Badge tone={b.status >= 5 ? "success" : "warn"}>{b.status >= 5 ? t("Settled (demo)", "भुक्तानी भयो (डेमो)") : t("Pending", "बाँकी")}</Badge></div></li>; })}</ul> : <p className="text-sm text-muted">{t("No payments yet.", "अहिलेसम्म भुक्तानी छैन।")}</p>}
      </Card>
    </div>
  );
}

/* ───────────── Invoices ───────────── */
function invoiceHtml(b: BookingRecord, name: string) {
  const s = serviceBySlug(b.serviceSlug);
  const d = detailsFor(s?.category ?? "handyman");
  const p = s ? computePrice(s, { qty: b.qty, addOnTotal: d.addOns.filter((a) => b.addOnIds.includes(a.id)).reduce((n, a) => n + a.price, 0), coupon: b.coupon }) : null;
  return `<!doctype html><meta charset="utf-8"><title>Demo invoice ${b.id}</title><body style="font-family:system-ui;max-width:640px;margin:40px auto;padding:0 20px;color:#1A2433"><h1 style="color:#1746A2">Famous Services</h1><p style="background:#FFF4DC;padding:10px;border-radius:8px"><b>DEMO INVOICE</b> — sample document from a prototype. Not a tax invoice.</p><h2>${b.id}</h2><p>Customer: ${name}<br>Service: ${s?.name.en ?? b.serviceSlug}<br>Date: ${b.dateKey}</p><table style="width:100%;border-collapse:collapse"><tr><td>Service</td><td style="text-align:right">Rs. ${p?.base ?? 0}</td></tr><tr><td>Add-ons</td><td style="text-align:right">Rs. ${p?.addOns ?? 0}</td></tr><tr><td>Discount</td><td style="text-align:right">- Rs. ${p?.discount ?? 0}</td></tr><tr style="font-weight:700;border-top:2px solid #1746A2"><td>Total (sample)</td><td style="text-align:right">Rs. ${b.total}</td></tr></table></body>`;
}
function Invoices() {
  const { t, lang } = useLang();
  const { all } = useAllBookings();
  const user = useApp((s) => s.user);
  const toast = useApp((s) => s.toast);
  const list = all.filter((b) => b.status >= 5 && b.mode === "book");
  const dl = (b: BookingRecord) => {
    const url = URL.createObjectURL(new Blob([invoiceHtml(b, user?.name ?? "Customer")], { type: "text/html" }));
    const a = document.createElement("a"); a.href = url; a.download = `demo-invoice-${b.id}.html`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(t("Demo invoice downloaded", "डेमो इनभ्वाइस डाउनलोड भयो"), "success");
  };
  if (!list.length) return <EmptyState icon={<Receipt className="h-6 w-6" aria-hidden />} title={t("No invoices yet", "अहिलेसम्म इनभ्वाइस छैन")} body={t("Invoices appear after a booking is completed. Tip: open a booking and press Next step to complete it.", "बुकिङ सम्पन्न भएपछि इनभ्वाइस देखिन्छ। सुझाव: बुकिङ खोलेर 'अर्को चरण' थिचेर सम्पन्न गर्नुहोस्।")} />;
  return <ul className="space-y-3">{list.map((b) => { const s = serviceBySlug(b.serviceSlug); return <li key={b.id} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-card"><div className="min-w-0"><p className="font-mono text-[11px] font-bold tracking-wider text-brand">{b.id}</p><p className="truncate font-bold text-ink">{s ? t(s.name) : b.serviceSlug}</p><p className="text-xs text-muted">{dateLong(parseKey(b.dateKey), lang)} · {money(b.total, lang)}</p></div><Button variant="outline" size="sm" onClick={() => dl(b)}><Download className="h-4 w-4" aria-hidden />{t("Download", "डाउनलोड")}</Button></li>; })}</ul>;
}

/* ───────────── Reviews ───────────── */
function Reviews() {
  const { t, lang } = useLang();
  const mine = useApp((s) => s.myReviews);
  const { all } = useAllBookings();
  const pending = all.filter((b) => b.status >= 5 && !mine.some((r) => r.bookingId === b.id));
  return (
    <div className="space-y-6">
      <Card title={t("Waiting for your review", "तपाईंको समीक्षा पर्खिँदै")}>
        {pending.length ? <ul className="space-y-3">{pending.map((b) => { const s = serviceBySlug(b.serviceSlug); return <li key={b.id} className="flex items-center justify-between gap-3"><span className="min-w-0 truncate text-sm font-semibold text-ink">{s ? t(s.name) : b.serviceSlug} <span className="font-mono text-xs text-muted">{b.id}</span></span><ButtonLink href={`/track/${b.id}`} size="sm" variant="accent"><Star className="h-4 w-4" aria-hidden />{t("Review", "समीक्षा")}</ButtonLink></li>; })}</ul> : <p className="text-sm text-muted">{t("Nothing to review right now.", "अहिले समीक्षा गर्नुपर्ने केही छैन।")}</p>}
      </Card>
      <Card title={t("Your reviews", "तपाईंका समीक्षा")}>
        {mine.length ? <ul className="space-y-4">{mine.map((r) => <li key={r.bookingId} className="rounded-xl bg-pale p-4"><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-brand">{r.bookingId}</span><span className="flex" aria-label={`${r.rating}/5`}>{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={cn("h-4 w-4", n <= r.rating ? "fill-amber text-amber" : "text-line")} aria-hidden />)}</span></div>{r.text && <p className="mt-2 text-sm text-ink">{r.text}</p>}<p className="mt-1 text-[11px] text-muted">{t("Saved on this device only", "यही उपकरणमा मात्र सुरक्षित")} · {dateLong(new Date(r.at), lang)}</p></li>)}</ul> : <p className="text-sm text-muted">{t("You have not written any reviews yet.", "तपाईंले अहिलेसम्म समीक्षा लेख्नुभएको छैन।")}</p>}
      </Card>
    </div>
  );
}

/* ───────────── Refunds ───────────── */
function Refunds() {
  const { t } = useLang();
  const { all } = useAllBookings();
  const cancelled = all.filter((b) => b.status < 0);
  return (
    <div className="space-y-6">
      <Card title={t("Refund requests", "फिर्ता अनुरोध")}>
        {cancelled.length ? <ul className="divide-y divide-line">{cancelled.map((b) => { const s = serviceBySlug(b.serviceSlug); return <li key={b.id} className="flex items-center justify-between gap-3 py-3"><span className="min-w-0 truncate text-sm font-semibold text-ink">{s ? t(s.name) : b.serviceSlug} <span className="font-mono text-xs text-muted">{b.id}</span></span><Badge tone="neutral">{b.payment === "cash" || b.payment === "none" ? t("Nothing to refund", "फिर्ता गर्न केही छैन") : t("Refund review (demo)", "फिर्ता समीक्षा (डेमो)")}</Badge></li>; })}</ul> : <EmptyState icon={<Undo2 className="h-6 w-6" aria-hidden />} title={t("No refunds", "फिर्ता छैन")} body={t("If you cancel a booking that you paid for online, the refund status will appear here.", "अनलाइन भुक्तानी गरेको बुकिङ रद्द गरे फिर्ताको स्थिति यहाँ देखिन्छ।")} className="!py-8" />}
      </Card>
      <p className="rounded-xl bg-pale p-4 text-sm text-muted">{t("Refund rules and timing are still to be confirmed by the business and are not promised in this prototype.", "फिर्ताका नियम र समय व्यवसायले पुष्टि गर्न बाँकी छ र यो प्रोटोटाइपमा वाचा गरिएको छैन।")}</p>
    </div>
  );
}

/* ───────────── Support ───────────── */
function Support() {
  const { t, lang } = useLang();
  const { tickets, addTicket, toast, notify } = useApp();
  const { all } = useAllBookings();
  const [f, setF] = React.useState({ subject: "", message: "", bookingId: "" });
  const [err, setErr] = React.useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.subject.trim().length < 3) er.subject = t("Add a short subject", "छोटो विषय थप्नुहोस्");
    if (f.message.trim().length < 10) er.message = t("Tell us a bit more (10+ characters)", "थोरै बढी बताउनुहोस् (१०+ अक्षर)");
    setErr(er);
    if (Object.keys(er).length) return;
    addTicket({ id: `T-${Date.now().toString(36).slice(-4).toUpperCase()}`, subject: f.subject.trim(), message: f.message.trim(), at: Date.now(), bookingId: f.bookingId || undefined });
    notify("Support request received (demo)", f.subject.trim());
    toast(t("Request saved (demo). No one has been contacted.", "अनुरोध सुरक्षित (डेमो)। कसैलाई सम्पर्क गरिएको छैन।"), "success");
    setF({ subject: "", message: "", bookingId: "" });
  };
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title={t("Contact support", "सहयोगमा सम्पर्क")}>
        <form onSubmit={submit} noValidate className="space-y-4">
          <Select label={t("Related booking (optional)", "सम्बन्धित बुकिङ (ऐच्छिक)")} value={f.bookingId} onChange={(e) => setF({ ...f, bookingId: e.target.value })}><option value="">{t("None", "छैन")}</option>{all.map((b) => <option key={b.id} value={b.id}>{b.id}</option>)}</Select>
          <Input label={t("Subject", "विषय")} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} error={err.subject} required />
          <Textarea label={t("Message", "सन्देश")} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} error={err.message} required />
          <Button type="submit" size="lg" className="w-full">{t("Send request", "अनुरोध पठाउनुहोस्")}</Button>
        </form>
      </Card>
      <Card title={t("Your requests", "तपाईंका अनुरोध")}>
        {tickets.length ? <ul className="space-y-3">{tickets.map((x) => <li key={x.id} className="rounded-xl bg-pale p-4"><div className="flex items-center justify-between gap-2"><p className="font-bold text-ink">{x.subject}</p><Badge tone="amber">{t("Demo", "डेमो")}</Badge></div><p className="mt-1 line-clamp-2 text-sm text-muted">{x.message}</p><p className="mt-1 font-mono text-[11px] text-muted">{x.id} · {dateLong(new Date(x.at), lang)}</p></li>)}</ul> : <p className="text-sm text-muted">{t("No requests yet.", "अहिलेसम्म अनुरोध छैन।")} <Link href="/help" className="font-semibold text-brand hover:underline">{t("Visit the Help Center", "सहायता केन्द्र हेर्नुहोस्")}</Link></p>}
      </Card>
    </div>
  );
}

/* ───────────── Notifications ───────────── */
function Notifications() {
  const { t } = useLang();
  const { notifications, markAllRead } = useApp();
  const unread = notifications.some((n) => !n.read);
  return (
    <div>
      <div className="mb-4 flex justify-end"><Button variant="outline" size="sm" onClick={markAllRead} disabled={!unread}>{t("Mark all as read", "सबै पढिएको जनाउनुहोस्")}</Button></div>
      <ul className="space-y-3">{notifications.map((n) => <li key={n.id} className={cn("flex gap-3.5 rounded-2xl border p-4", n.read ? "border-line bg-white" : "border-amber/40 bg-amber-50")}><span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm"><Bell className="h-5 w-5" aria-hidden /></span><div className="min-w-0"><p className="font-bold text-ink">{n.title}{!n.read && <span className="sr-only"> ({t("unread", "नपढिएको")})</span>}</p><p className="text-sm text-muted">{n.body}</p><p className="mt-1 text-[11px] text-muted">{n.time}</p></div></li>)}</ul>
    </div>
  );
}

/* ───────────── Settings ───────────── */
function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-2.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand">
      <span><span className="block text-[15px] font-semibold text-ink">{label}</span>{hint && <span className="block text-xs text-muted">{hint}</span>}</span>
      <input type="checkbox" role="switch" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span aria-hidden className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors", checked ? "bg-brand" : "bg-line")}><span className={cn("absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all", checked ? "left-[22px]" : "left-0.5")} /></span>
    </label>
  );
}
function Settings() {
  const { t, lang, setLang } = useLang();
  const router = useRouter();
  const { logout, resetDemo, toast } = useApp();
  const [p, setP] = React.useState({ sms: true, wa: false, email: false, promo: false });
  const [confirm, setConfirm] = React.useState(false);
  return (
    <div className="space-y-6">
      <Card title={t("Notifications", "सूचना")}><div className="divide-y divide-line">
        <Toggle label={t("Booking updates by SMS", "एसएमएसमार्फत बुकिङ अपडेट")} hint={t("Demo setting — no SMS is sent.", "डेमो सेटिङ — एसएमएस पठाइँदैन।")} checked={p.sms} onChange={(v) => setP({ ...p, sms: v })} />
        <Toggle label={t("Updates on WhatsApp", "ह्वाट्सएपमा अपडेट")} checked={p.wa} onChange={(v) => setP({ ...p, wa: v })} />
        <Toggle label={t("Email receipts", "इमेल रसिद")} checked={p.email} onChange={(v) => setP({ ...p, email: v })} />
        <Toggle label={t("Offers and tips", "अफर र सुझाव")} checked={p.promo} onChange={(v) => setP({ ...p, promo: v })} />
      </div></Card>
      <Card title={t("Language", "भाषा")}>
        <div className="flex gap-2.5">{(["en", "ne"] as const).map((l) => <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={cn("h-11 rounded-xl border px-5 text-sm font-semibold transition-colors", lang === l ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40")}>{l === "en" ? "English" : "नेपाली"}</button>)}</div>
      </Card>
      <Card title={t("Account", "खाता")}>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => { logout(); router.push("/"); }}>{t("Log out", "लगआउट")}</Button>
          <Button variant="outline" onClick={() => setConfirm(true)}>{t("Reset demo data", "डेमो डेटा रिसेट")}</Button>
        </div>
        <p className="mt-3 text-xs text-muted">{t("Resetting clears every booking, address and setting saved on this device.", "रिसेट गर्दा यो उपकरणमा सुरक्षित सबै बुकिङ, ठेगाना र सेटिङ मेटिन्छ।")}</p>
      </Card>
      <Sheet open={confirm} onClose={() => setConfirm(false)} side="center" title={t("Reset demo data?", "डेमो डेटा रिसेट गर्ने?")}>
        <div className="space-y-4 p-5"><p className="text-sm text-muted">{t("This removes your demo bookings, saved items, addresses and login from this device.", "यसले तपाईंका डेमो बुकिङ, सुरक्षित वस्तु, ठेगाना र लगइन यो उपकरणबाट हटाउँछ।")}</p>
          <div className="grid grid-cols-2 gap-3"><Button variant="outline" onClick={() => setConfirm(false)}>{t("Cancel", "रद्द")}</Button><Button variant="danger" onClick={() => { resetDemo(); toast(t("Demo data cleared", "डेमो डेटा मेटियो"), "info"); router.push("/"); }}>{t("Reset", "रिसेट")}</Button></div></div>
      </Sheet>
    </div>
  );
}

export function SectionView({ section }: { section: string }) {
  switch (section) {
    case "upcoming": return <Bookings kind="upcoming" />;
    case "history": return <Bookings kind="history" />;
    case "profile": return <Profile />;
    case "addresses": return <Addresses />;
    case "saved": return <Saved />;
    case "rentals": return <RentalRequests />;
    case "coupons": return <Coupons />;
    case "payments": return <Payments />;
    case "invoices": return <Invoices />;
    case "reviews": return <Reviews />;
    case "refunds": return <Refunds />;
    case "support": return <Support />;
    case "notifications": return <Notifications />;
    case "settings": return <Settings />;
    default: return <Overview />;
  }
}
