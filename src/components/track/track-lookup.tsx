"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { PageHero, Container } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";
import { useAllBookings } from "@/lib/bookings";
import { serviceBySlug } from "@/data/catalog";
import { dateLong, parseKey } from "@/lib/format";
import { statusBadge } from "./track-view";

export function TrackLookup() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [id, setId] = React.useState("");
  const [err, setErr] = React.useState("");
  const { all, ready } = useAllBookings();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = id.trim().toUpperCase();
    if (!/^FS-[A-Z0-9-]{3,}$/.test(v)) { setErr(t("Enter an ID like FS-DEMO-1001", "FS-DEMO-1001 जस्तो आईडी लेख्नुहोस्")); return; }
    router.push(`/track/${v}`);
  };
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Track booking", "बुकिङ ट्र्याक") }]} />} eyebrow={t("Track booking", "बुकिङ ट्र्याक")} title={t("Where is my booking?", "मेरो बुकिङ कहाँ पुग्यो?")} body={t("Enter your booking ID. In this prototype, bookings you create are found on this device.", "आफ्नो बुकिङ आईडी लेख्नुहोस्। यो प्रोटोटाइपमा तपाईंले बनाएका बुकिङ यही उपकरणमा भेटिन्छन्।")}>
        <form onSubmit={submit} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row" noValidate>
          <div className="flex-1">
            <label htmlFor="bid" className="sr-only">{t("Booking ID", "बुकिङ आईडी")}</label>
            <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
              <input id="bid" value={id} onChange={(e) => { setId(e.target.value); setErr(""); }} placeholder="FS-DEMO-1001" aria-invalid={!!err} aria-describedby={err ? "bid-err" : undefined} className="h-[52px] w-full rounded-xl border border-line bg-white pl-12 pr-4 font-mono text-base uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/70 hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" /></div>
            {err && <p id="bid-err" role="alert" className="mt-1.5 text-xs font-semibold text-danger">{err}</p>}
          </div>
          <Button type="submit" size="lg" variant="primary">{t("Track", "ट्र्याक")}</Button>
        </form>
      </PageHero>
      <Container className="py-10 sm:py-14">
        <h2 className="mb-4 text-xl font-extrabold text-brand-deep">{t("Bookings on this device", "यो उपकरणका बुकिङ")}</h2>
        {!ready ? <p className="text-sm text-muted">{t("Loading…", "लोड हुँदैछ…")}</p> : (
          <ul className="grid gap-3 md:grid-cols-2">
            {all.map((b) => { const s = serviceBySlug(b.serviceSlug); const sb = statusBadge(b.status, b.mode); return (
              <li key={b.id}><Link href={`/track/${b.id}`} className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                <div className="min-w-0"><p className="font-mono text-xs font-bold tracking-wider text-brand">{b.id}</p><p className="mt-0.5 truncate font-bold text-ink">{s ? t(s.name) : b.serviceSlug}</p><p className="text-sm text-muted">{dateLong(parseKey(b.dateKey), lang)}</p></div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">{b.demo && <Badge tone="amber">{t("Demo", "डेमो")}</Badge>}<Badge tone={sb.tone}>{t(sb.en, sb.ne)}</Badge></div>
                <ArrowRight className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
              </Link></li>
            ); })}
          </ul>
        )}
      </Container>
    </>
  );
}
