"use client";
import * as React from "react";
import Link from "next/link";
import { BadgeCheck, CalendarCheck, Check, Clock, Heart, Info, Share2, ShieldCheck, UserCheck, X as XIcon, ClipboardCheck, Wrench, Package } from "lucide-react";
import { categoryBySlug, detailsFor, durationLabel, isQuote, servicesIn, type Service } from "@/data/catalog";
import { REVIEWS, VERIFY_STEPS } from "@/data/content";
import { ServiceScene } from "@/components/art/scenes";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { QtyStepper } from "@/components/ui/qty";
import { EmptyState } from "@/components/ui/states";
import { Reveal } from "@/components/ui/motion";
import { PriceLine, AvailabilityBadge } from "@/components/cards/service-card";
import { ReviewCard } from "@/components/cards/review-card";
import { CallButton, WhatsAppButton } from "@/components/layout/contact-actions";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { computePrice, qtyFor } from "@/lib/pricing";
import { money, num } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ServiceGrid } from "./service-grid";
import { AreaButton } from "./area-button";
import { CouponBanner } from "./coupon-banner";
import { imageKey, galleryPhotos } from "@/config/images";
import { SiteImage } from "@/components/ui/site-image";

function useSaveShare(s: Service) {
  const { t } = useLang();
  const saved = useApp((st) => st.saved.includes(s.slug));
  const toggle = useApp((st) => st.toggleSaved);
  const toast = useApp((st) => st.toast);
  const hydrated = useHydrated();
  const isSaved = hydrated && saved;
  return {
    isSaved,
    save: () => { toggle(s.slug); toast(isSaved ? t("Removed from saved", "सुरक्षित सूचीबाट हटाइयो") : t("Saved to your account (demo)", "तपाईंको खातामा सुरक्षित (डेमो)"), "info"); },
    share: async () => {
      const url = window.location.href;
      try {
        if (navigator.share) { await navigator.share({ title: t(s.name), url }); return; }
        await navigator.clipboard.writeText(url);
        toast(t("Link copied", "लिङ्क कपी भयो"), "success");
      } catch { /* user cancelled or clipboard unavailable */ }
    },
  };
}

function BookingPanel({ s, qty, setQty, coupon }: { s: Service; qty: number; setQty: (n: number) => void; coupon?: string }) {
  const { t, lang } = useLang();
  const q = qtyFor(s);
  const quote = isQuote(s);
  const p = computePrice(s, { qty });
  const { isSaved, save, share } = useSaveShare(s);
  const href = `/book/${s.slug}${q ? `?qty=${qty}` : ""}`;
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-lift">
      <PriceLine s={s} size="lg" />
      <p className="mt-1 text-xs text-muted">{quote ? t("Final price confirmed after the professional inspects. You approve it before work starts.", "प्रोफेसनलले निरीक्षण गरेपछि अन्तिम मूल्य पुष्टि हुन्छ। काम सुरु हुनुअघि तपाईंले स्वीकृत गर्नुहुन्छ।") : t("Sample price for this prototype.", "यस प्रोटोटाइपको नमुना मूल्य।")}</p>

      <dl className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm">
        <div className="flex items-center justify-between gap-3"><dt className="inline-flex items-center gap-1.5 text-muted"><Clock className="h-4 w-4" aria-hidden />{t("Duration", "अवधि")}</dt><dd className="font-semibold text-ink">{t(durationLabel(s.durationMin, s.durationMax))}</dd></div>
        {quote && s.visitFee ? <div className="flex items-center justify-between gap-3"><dt className="text-muted">{t("Visit fee (sample)", "भ्रमण शुल्क (नमुना)")}</dt><dd className="font-semibold text-ink">{money(s.visitFee, lang)}</dd></div> : null}
        <div className="flex items-center justify-between gap-3"><dt className="text-muted">{t("Availability", "उपलब्धता")}</dt><dd><AvailabilityBadge s={s} /></dd></div>
      </dl>

      {q && (
        <div className="mt-4 rounded-xl bg-pale p-3.5">
          <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-ink">{t(q.label)}</span><QtyStepper value={qty} min={q.min} max={q.max} onChange={setQty} label={t(q.label)} /></div>
          <p className="mt-2.5 flex items-center justify-between text-sm"><span className="text-muted">{t("Estimate", "अनुमान")}</span><strong className="text-lg text-brand-deep">{money(p.base, lang)}</strong></p>
        </div>
      )}

      <div className="mt-5 space-y-2.5">
        <ButtonLink href={href} variant="accent" size="lg" className="w-full">{quote ? t("Get a Quote", "कोटेसन लिनुहोस्") : t("Book Now", "अहिले बुक गर्नुहोस्")}</ButtonLink>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="outline" size="sm" onClick={save} aria-pressed={isSaved}><Heart className={cn("h-4 w-4", isSaved && "fill-danger text-danger")} aria-hidden />{isSaved ? t("Saved", "सुरक्षित") : t("Save", "सुरक्षित गर्नुहोस्")}</Button>
          <Button variant="outline" size="sm" onClick={share}><Share2 className="h-4 w-4" aria-hidden />{t("Share", "सेयर")}</Button>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-4">
        <p className="mr-auto text-xs text-muted">{t("Questions?", "प्रश्न छ?")}</p>
        <CallButton size="sm" />
        <WhatsAppButton size="sm" />
      </div>
      {coupon && <p className="mt-3 text-center text-xs font-semibold text-warn">{t(`Coupon ${coupon} will be offered at review.`, `कुपन ${coupon} समीक्षा चरणमा प्रस्ताव गरिनेछ।`)}</p>}
    </div>
  );
}

function Block({ title, icon, children, className }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={cn("rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6", className)}>
      <h2 className="mb-3.5 flex items-center gap-2.5 text-lg font-extrabold text-brand-deep">{icon}{title}</h2>
      {children}
    </Reveal>
  );
}

export function ServiceDetail({ service: s, coupon }: { service: Service; coupon?: string }) {
  const { t, lang } = useLang();
  const cat = categoryBySlug(s.category)!;
  const d = detailsFor(s.category);
  const q = qtyFor(s);
  const [qty, setQty] = React.useState(q?.def ?? 1);
  const [shot, setShot] = React.useState(0);
  const quote = isQuote(s);
  const related = servicesIn(s.category).filter((x) => x.slug !== s.slug).slice(0, 4);
  const reviews = REVIEWS.filter((r) => r.category === s.category).slice(0, 2);
  const seeds = [s.slug, `${s.slug}-b`, `${s.slug}-c`, `${s.slug}-d`];
  const photos = galleryPhotos(imageKey.service(s.slug), imageKey.category(s.category)); // your own photos: public/images/services/<slug>.jpg, <slug>-2.jpg ...
  const { isSaved, save, share } = useSaveShare(s);
  const p = computePrice(s, { qty });
  const steps = [
    { i: CalendarCheck, h: t("Choose a time", "समय रोज्नुहोस्"), b: t("Pick your address and a two-hour window.", "ठेगाना र दुई घण्टाको समय रोज्नुहोस्।") },
    { i: UserCheck, h: t("Professional confirmed", "प्रोफेसनल पुष्टि"), b: t("A reviewed professional is assigned to your job.", "समीक्षा गरिएको प्रोफेसन तपाईंको कामका लागि तोकिन्छ।") },
    { i: Wrench, h: quote ? t("Inspect, then quote", "निरीक्षण, अनि कोटेसन") : t("Service at your door", "ढोकैमा सेवा"), b: quote ? t("You approve the quote before work starts.", "काम सुरु हुनुअघि कोटेसन स्वीकृत गर्नुहोस्।") : t("The work is done and you confirm it.", "काम हुन्छ र तपाईंले पुष्टि गर्नुहुन्छ।") },
  ];

  return (
    <>
      <Container className="pt-5 sm:pt-7">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Services", "सेवाहरू"), href: "/services" }, { label: t(cat.name), href: `/services/${cat.slug}` }, { label: t(s.name) }]} className="mb-5" />
        <CouponBanner code={coupon} />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10 xl:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-6">
            {/* Gallery + headline */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-pale shadow-card ring-1 ring-line sm:aspect-[16/10]">
                <div key={shot} className="h-full w-full animate-[pop_.25s_ease-out]">{photos.length ? <SiteImage src={photos[Math.min(shot, photos.length - 1)]} alt={t(s.name)} priority sizes="(min-width:1024px) 640px, 100vw" /> : <ServiceScene category={s.category} seed={seeds[shot]} label={t(s.name)} illustration />}</div>
                {!photos.length && <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-muted backdrop-blur">{t("Illustration — real photos can be added", "चित्रण — वास्तविक फोटो थप्न सकिन्छ")}</span>}
              </div>
              {(photos.length === 0 || photos.length > 1) && <div className="mt-3 grid grid-cols-4 gap-2.5" role="group" aria-label={t("Gallery", "ग्यालरी")}>
                {(photos.length ? photos : seeds).map((sd, i) => (
                  <button key={sd} type="button" onClick={() => setShot(i)} aria-pressed={shot === i} aria-label={`${t("Image", "तस्बिर")} ${num(i + 1, lang)}`} className={cn("aspect-[4/3] overflow-hidden rounded-xl ring-2 transition", shot === i ? "ring-brand" : "opacity-80 ring-transparent hover:opacity-100")}>
                    {photos.length ? <SiteImage src={sd} /> : <ServiceScene category={s.category} seed={sd} illustration />}
                  </button>
                ))}
              </div>}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2"><Badge tone="brand">{t(cat.name)}</Badge><AvailabilityBadge s={s} />{s.popular && <Badge tone="dark">{t("Popular", "लोकप्रिय")}</Badge>}{s.isNew && <Badge tone="amber">{t("New", "नयाँ")}</Badge>}</div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{t(s.name)}</h1>
                <div className="flex gap-1.5 lg:hidden">
                  <button type="button" onClick={save} aria-pressed={isSaved} aria-label={t("Save service", "सेवा सुरक्षित गर्नुहोस्")} className="grid h-11 w-11 place-items-center rounded-full border border-line text-brand hover:bg-pale"><Heart className={cn("h-5 w-5", isSaved && "fill-danger text-danger")} aria-hidden /></button>
                  <button type="button" onClick={share} aria-label={t("Share", "सेयर")} className="grid h-11 w-11 place-items-center rounded-full border border-line text-brand hover:bg-pale"><Share2 className="h-5 w-5" aria-hidden /></button>
                </div>
              </div>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{t(s.short)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 lg:hidden"><PriceLine s={s} size="lg" /><span className="inline-flex items-center gap-1.5 text-sm text-muted"><Clock className="h-4 w-4" aria-hidden />{t(durationLabel(s.durationMin, s.durationMax))}</span></div>
              <div className="mt-4 lg:hidden"><AreaButton /></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Block title={t("What's included", "के समावेश छ")} icon={<Check className="h-5 w-5 text-success" aria-hidden />}>
                <ul className="space-y-2.5">{d.included.map((x, i) => <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t(x)}</li>)}</ul>
              </Block>
              <Block title={t("Not included", "के समावेश छैन")} icon={<XIcon className="h-5 w-5 text-danger" aria-hidden />}>
                <ul className="space-y-2.5">{d.notIncluded.map((x, i) => <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink"><XIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />{t(x)}</li>)}</ul>
              </Block>
            </div>

            {!quote && d.addOns.length > 0 && (
              <Block title={t("Optional add-ons", "ऐच्छिक थप सेवा")} icon={<Package className="h-5 w-5 text-brand" aria-hidden />}>
                <ul className="divide-y divide-line">{d.addOns.map((a) => <li key={a.id} className="flex items-center justify-between gap-3 py-2.5 text-[15px]"><span className="text-ink">{t(a.name)}</span><span className="font-bold text-brand-deep">+ {money(a.price, lang)}</span></li>)}</ul>
                <p className="mt-2 text-xs text-muted">{t("Choose add-ons while booking. Sample prices.", "बुकिङका बेला थप सेवा रोज्नुहोस्। नमुना मूल्य।")}</p>
              </Block>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <Block title={t("Parts & materials", "पार्टपुर्जा र सामग्री")} icon={<Info className="h-5 w-5 text-brand" aria-hidden />}><p className="text-[15px] leading-relaxed text-muted">{t(d.materials)}</p></Block>
              <Block title={t("How to prepare", "तयारी कसरी गर्ने")} icon={<ClipboardCheck className="h-5 w-5 text-brand" aria-hidden />}>
                <ul className="space-y-2">{d.prep.map((x, i) => <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{t(x)}</li>)}</ul>
              </Block>
            </div>

            <Block title={t("How it works", "कसरी काम गर्छ")}>
              <ol className="grid gap-4 sm:grid-cols-3">{steps.map(({ i: I, h, b }, k) => (
                <li key={k} className="flex gap-3 sm:block"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pale text-brand"><I className="h-5 w-5" aria-hidden /></span><div className="sm:mt-3"><h3 className="text-[15px] font-bold text-ink">{num(k + 1, lang)}. {h}</h3><p className="mt-0.5 text-sm text-muted">{b}</p></div></li>
              ))}</ol>
            </Block>

            <Block title={t("How professionals are verified", "प्रोफेसनल कसरी प्रमाणित हुन्छन्")} icon={<BadgeCheck className="h-5 w-5 text-brand" aria-hidden />}>
              <p className="mb-3 text-sm text-muted">{t("Our review process. Individual verification status is shown on a professional's profile once assigned.", "हाम्रो समीक्षा प्रक्रिया। तोकिएपछि प्रत्येक प्रोफेसनलको प्रोफाइलमा प्रमाणीकरण स्थिति देखिन्छ।")}</p>
              <ol className="grid gap-3 sm:grid-cols-2">{VERIFY_STEPS.map((v, i) => <li key={i} className="flex gap-3 rounded-xl bg-pale p-3.5"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">{num(i + 1, lang)}</span><div><p className="text-sm font-bold text-ink">{t(v.title)}</p><p className="text-[13px] text-muted">{t(v.body)}</p></div></li>)}</ol>
            </Block>

            <div className="grid gap-6 md:grid-cols-2">
              <Block title={t("Cancellation & changes", "रद्द तथा परिवर्तन")} icon={<CalendarCheck className="h-5 w-5 text-brand" aria-hidden />}><p className="text-[15px] leading-relaxed text-muted">{t("You can reschedule or cancel from your booking page. Exact free-change timing and any fee will be confirmed by the business before launch.", "तपाईं बुकिङ पृष्ठबाट समय परिवर्तन वा रद्द गर्न सक्नुहुन्छ। निःशुल्क परिवर्तन समय र शुल्क सुरु हुनुअघि व्यवसायले पुष्टि गर्नेछ।")}</p></Block>
              <Block title={t("Service guarantee", "सेवा ग्यारेन्टी")} icon={<ShieldCheck className="h-5 w-5 text-brand" aria-hidden />}><p className="text-[15px] leading-relaxed text-muted">{t("Guarantee terms are being finalised and will be published here before launch. Nothing is promised in this prototype.", "ग्यारेन्टीका सर्त अन्तिम रूप दिइँदैछ र सुरु हुनुअघि यहाँ प्रकाशित हुनेछ। यो प्रोटोटाइपमा केही वाचा गरिएको छैन।")}</p></Block>
            </div>

            <Block title={t("Reviews", "समीक्षा")}>
              {reviews.length ? (
                <div className="grid gap-4 sm:grid-cols-2">{reviews.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
              ) : (
                <EmptyState title={t("No reviews yet", "अहिलेसम्म समीक्षा छैन")} body={t("Reviews appear here after real bookings are completed.", "वास्तविक बुकिङ पूरा भएपछि समीक्षा यहाँ देखिन्छ।")} className="!py-8" />
              )}
              <p className="mt-3 text-xs text-muted">{t("Reviews shown here are demo samples, not customer feedback.", "यहाँ देखाइएका समीक्षा डेमो नमुना हुन्, ग्राहक प्रतिक्रिया होइन।")}</p>
            </Block>

            <Reveal>
              <h2 className="mb-3 text-lg font-extrabold text-brand-deep">{t("Frequently asked questions", "बारम्बार सोधिने प्रश्न")}</h2>
              <Accordion items={d.faqs.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
            </Reveal>
          </div>

          {/* Desktop sticky booking panel */}
          <aside className="hidden lg:block" aria-label={t("Booking", "बुकिङ")}>
            <div className="sticky top-28 space-y-3">
              <BookingPanel s={s} qty={qty} setQty={setQty} coupon={coupon} />
              <div className="flex items-start gap-2.5 rounded-xl bg-pale p-3.5 text-xs text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{t("This is a prototype. No booking is sent to anyone and no payment is taken.", "यो प्रोटोटाइप हो। कसैलाई बुकिङ पठाइँदैन र भुक्तानी लिइँदैन।")}</div>
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <Section tone="pale" className="mt-12 !py-10 sm:!py-14">
          <SectionHeading eyebrow={t("Related", "सम्बन्धित")} title={t("Other services in this category", "यही श्रेणीका अन्य सेवा")} action={<Link href={`/services/${cat.slug}`} className="text-sm font-bold text-brand hover:underline">{t("View all", "सबै हेर्नुहोस्")} →</Link>} />
          <ServiceGrid services={related} />
        </Section>
      )}

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-safe pt-3 shadow-bar backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3 pb-3">
          <div className="min-w-0 flex-1">
            {quote ? <p className="truncate text-[15px] font-extrabold text-brand-deep">{s.model === "inspection" ? t("Inspection Quote", "निरीक्षण कोटेसन") : t("Custom Quote", "अनुकूल कोटेसन")}</p> : <p className="truncate text-[15px] font-extrabold text-brand-deep"><span className="text-xs font-medium text-muted">{t("From", "सुरु")} </span>{money(q ? p.base : s.price ?? 0, lang)}</p>}
            <p className="truncate text-[11px] text-muted">{q ? `${num(qty, lang)} ${t(q.label).toLowerCase()} · ` : ""}{t("Sample price", "नमुना मूल्य")}</p>
          </div>
          {q && <QtyStepper value={qty} min={q.min} max={q.max} onChange={setQty} label={t(q.label)} className="hidden min-[400px]:inline-flex" />}
          <ButtonLink href={`/book/${s.slug}${q ? `?qty=${qty}` : ""}`} variant="accent" size="md" className="shrink-0">{quote ? t("Get a Quote", "कोटेसन") : t("Book", "बुक")}</ButtonLink>
        </div>
      </div>
    </>
  );
}
