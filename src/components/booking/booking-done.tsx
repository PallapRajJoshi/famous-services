"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarPlus, Check, Copy, Home, MapPin, UserCheck, Wallet } from "lucide-react";
import { detailsFor, type Service } from "@/data/catalog";
import { PROS, SLOTS, districtBySlug } from "@/data/content";
import { Container } from "@/components/ui/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/cards/pro-card";
import { useLang } from "@/components/lang-provider";
import { useApp, type BookingRecord } from "@/store/app-store";
import { dateLong, money, parseKey } from "@/lib/format";

export function icsFor(rec: BookingRecord, s: Service) {
  const slot = SLOTS.find((x) => x.id === rec.slotId) ?? SLOTS[0];
  const d = parseKey(rec.dateKey);
  const p = (n: number) => String(n).padStart(2, "0");
  const stamp = (h: number) => `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(h)}0000`;
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Famous Services Prototype//EN", "BEGIN:VEVENT", `UID:${rec.id}@famous-services.demo`, `DTSTAMP:${stamp(0)}`, `DTSTART:${stamp(slot.startHour)}`, `DTEND:${stamp(slot.startHour + 2)}`, `SUMMARY:${s.name.en} (demo booking ${rec.id})`, `LOCATION:${rec.address.street}\\, ${rec.address.area}`, "DESCRIPTION:Demo booking from the Famous Services prototype. Not a real appointment.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
}

export function BookingDone({ record: r, service: s }: { record: BookingRecord; service: Service }) {
  const { t, lang } = useLang();
  const user = useApp((x) => x.user);
  const toast = useApp((x) => x.toast);
  const pro = PROS.find((p) => p.id === r.proId) ?? PROS[0];
  const quote = r.mode === "quote";
  const slot = SLOTS.find((x) => x.id === r.slotId);
  const [copied, setCopied] = React.useState(false);
  const head = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => { window.scrollTo({ top: 0 }); head.current?.focus({ preventScroll: true }); }, []);
  const copy = async () => { try { await navigator.clipboard.writeText(r.id); } catch { /* clipboard unavailable */ } setCopied(true); toast(t("Booking ID copied", "बुकिङ आईडी कपी भयो"), "success"); setTimeout(() => setCopied(false), 1800); };
  const addCal = () => {
    const url = URL.createObjectURL(new Blob([icsFor(r, s)], { type: "text/calendar" }));
    const a = document.createElement("a"); a.href = url; a.download = `${r.id}.ics`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const next = [
    { i: UserCheck, h: t("Team confirms", "टोलीले पुष्टि गर्छ"), b: t("In the live service the team confirms your window and assigns a professional.", "वास्तविक सेवामा टोलीले समय पुष्टि गरी प्रोफेसनल तोक्छ।") },
    { i: MapPin, h: quote ? t("Inspection visit", "निरीक्षण भ्रमण") : t("Professional arrives", "प्रोफेसनल आउँछ"), b: quote ? t("You receive a quote and approve it before any work.", "तपाईंले कोटेसन पाउनुहुन्छ र काम अघि स्वीकृत गर्नुहुन्छ।") : t("Track the status on the tracking page (simulated here).", "ट्र्याकिङ पृष्ठमा स्थिति हेर्नुहोस् (यहाँ नक्कल)।") },
    { i: Wallet, h: quote ? t("Decide on the quote", "कोटेसनबारे निर्णय") : t("Pay after the job", "काम पछि भुक्तानी"), b: quote ? t("No work starts without your approval.", "तपाईंको स्वीकृति बिना काम सुरु हुँदैन।") : t("Payment follows the method you chose (simulated).", "तपाईंले रोजेको विधिअनुसार भुक्तानी (नक्कल)।") },
  ];
  return (
    <div className="bg-pale/50 py-8 sm:py-12">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-line bg-white p-6 text-center shadow-lift sm:p-9">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success-50">
            <svg viewBox="0 0 52 52" className="h-12 w-12" aria-hidden><circle cx="26" cy="26" r="24" fill="none" stroke="#17794B" strokeWidth="3" opacity=".25" /><path className="check-draw" d="M14 27l8 8 16-17" fill="none" stroke="#17794B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.div>
          <h1 ref={head} tabIndex={-1} className="mt-5 text-2xl font-extrabold text-brand-deep focus-quiet sm:text-3xl">{quote ? t("Quote request sent", "कोटेसन अनुरोध पठाइयो") : t("Booking confirmed", "बुकिङ पुष्टि भयो")}</h1>
          <p className="mx-auto mt-2 max-w-md text-muted">{t("This is a demo. Nobody has been notified and nothing was charged.", "यो डेमो हो। कसैलाई जानकारी गइएको छैन र केही शुल्क लागेको छैन।")}</p>
          <button type="button" onClick={copy} className="mx-auto mt-5 inline-flex h-12 items-center gap-2.5 rounded-xl border-2 border-dashed border-brand/40 bg-pale px-5 font-mono text-lg font-bold tracking-wider text-brand-deep transition hover:border-brand" aria-label={`${t("Booking ID", "बुकिङ आईडी")} ${r.id}. ${t("Copy", "कपी")}`}>
            {r.id}{copied ? <Check className="h-4 w-4 text-success" aria-hidden /> : <Copy className="h-4 w-4 opacity-60" aria-hidden />}
          </button>

          <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-left sm:grid-cols-2">
            {[
              [t("Service", "सेवा"), t(s.name)],
              [t("When", "कहिले"), `${dateLong(parseKey(r.dateKey), lang)} · ${slot?.label ?? ""}`],
              [t("Where", "कहाँ"), `${r.address.street}, ${r.address.area}, ${t(districtBySlug(r.address.district)!.name)}`],
              [quote ? t("Due now", "अहिले") : t("Total", "जम्मा"), money(r.total, lang)],
              [t("Payment", "भुक्तानी"), r.payment === "none" ? t("No payment yet", "अहिले भुक्तानी छैन") : r.payment === "cash" ? t("Cash after service", "सेवापछि नगद") : r.payment === "digital" ? t("Digital (demo)", "डिजिटल (डेमो)") : t("Demo card", "डेमो कार्ड")],
              [t("Professional", "प्रोफेसनल"), <span key="p" className="inline-flex items-center gap-2"><Avatar name={pro.name} hue={pro.hue} size={26} />{pro.name} <Badge tone="amber">{t("Demo", "डेमो")}</Badge></span>],
            ].map(([k, v], i) => <div key={i} className="bg-white p-4"><dt className="text-xs font-bold uppercase tracking-wide text-muted">{k}</dt><dd className="mt-1 text-[15px] font-semibold text-ink">{v}</dd></div>)}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href={`/track/${r.id}`} size="lg" variant="primary">{t("Track booking", "बुकिङ ट्र्याक गर्नुहोस्")}</ButtonLink>
            <Button size="lg" variant="outline" onClick={addCal}><CalendarPlus className="h-[18px] w-[18px]" aria-hidden />{t("Add to calendar", "क्यालेन्डरमा थप्नुहोस्")}</Button>
            <ButtonLink href="/" size="lg" variant="ghost"><Home className="h-[18px] w-[18px]" aria-hidden />{t("Back to home", "गृहपृष्ठ")}</ButtonLink>
          </div>
          {!user && <p className="mt-5 rounded-xl bg-pale p-3.5 text-sm text-muted">{t("Want to see this in your account?", "यो आफ्नो खातामा हेर्न चाहनुहुन्छ?")} <Link href="/login?next=/account/upcoming" className="font-bold text-brand hover:underline">{t("Log in (demo)", "लगइन (डेमो)")}</Link></p>}
        </div>

        <section aria-labelledby="next-h" className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <h2 id="next-h" className="mb-4 text-lg font-extrabold text-brand-deep">{t("What happens next", "अब के हुन्छ")}</h2>
          <ol className="grid gap-4 sm:grid-cols-3">{next.map(({ i: I, h, b }, k) => <li key={k} className="flex gap-3 sm:block"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pale text-brand"><I className="h-5 w-5" aria-hidden /></span><div className="sm:mt-3"><p className="text-[15px] font-bold text-ink">{h}</p><p className="mt-0.5 text-sm text-muted">{b}</p></div></li>)}</ol>
        </section>
        <p className="mt-4 text-center text-sm text-muted"><Link href={`/services/${s.category}`} className="font-semibold text-brand hover:underline">{t("Book another service", "अर्को सेवा बुक गर्नुहोस्")}</Link></p>
      </Container>
    </div>
  );
}
