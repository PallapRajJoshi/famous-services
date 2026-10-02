"use client";
import * as React from "react";
import Link from "next/link";
import { BadgeCheck, BedDouble, Building2, CalendarDays, Check, Compass, Info, KeyRound, Layers, LandPlot, MapPin, Route, Ruler, Share2, ShieldCheck, Users, Wallet, Bath, Armchair, Car, Hourglass, Home, Heart } from "lucide-react";
import { AVAILABLE, CHECKLISTS, FURNISHINGS, SUITED, furnishing, kindMeta, landType, listingTitle, listingsOf, pricePerAana, propType, roomType, type Listing } from "@/data/rentals";
import { ServiceScene } from "@/components/art/scenes";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { CallButton, WhatsAppButton } from "@/components/layout/contact-actions";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { money, moneyBig, num } from "@/lib/format";
import { cn } from "@/lib/cn";
import { EnquiryForm } from "./enquiry-form";
import { FacilityList, ListingPrice, useListingText } from "./parts";
import { ListingCard, typeBadgeText } from "./listing-card";
import { RentalNav } from "./rental-nav";
import { imageKey, galleryPhotos } from "@/config/images";
import { SiteImage } from "@/components/ui/site-image";

type Row = { icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>; k: string; v: string };

function useRows(l: Listing): Row[] {
  const { t, lang, area, facing } = useListingText();
  const r: Row[] = [];
  if (l.kind === "rooms") {
    r.push({ icon: KeyRound, k: t("Room type", "कोठाको प्रकार"), v: t(roomType(l.roomType!).name) });
    r.push({ icon: Armchair, k: t("Furnishing", "फर्निचर"), v: t(furnishing(l.furnishing!).name) });
    r.push({ icon: Bath, k: t("Bathroom", "बाथरुम"), v: l.bath === "attached" ? t("Attached", "जोडिएको") : t("Shared", "साझा") });
    if (l.floor != null) r.push({ icon: Layers, k: t("Floor", "तला"), v: num(l.floor, lang) });
    if (l.sizeSqft) r.push({ icon: Ruler, k: t("Size", "आकार"), v: `${num(l.sizeSqft, lang)} ${t("sq ft", "वर्गफिट")}` });
    if (l.depositMonths) r.push({ icon: Wallet, k: t("Deposit", "धरौटी"), v: `${num(l.depositMonths, lang)} ${t(l.depositMonths === 1 ? "month’s rent" : "months’ rent", "महिनाको भाडा")}` });
    if (l.minStayMonths) r.push({ icon: Hourglass, k: t("Minimum stay", "न्यूनतम बसाइ"), v: `${num(l.minStayMonths, lang)} ${t("months", "महिना")}` });
    if (l.available) r.push({ icon: CalendarDays, k: t("Availability", "उपलब्धता"), v: t(AVAILABLE[l.available]) });
    if (l.suited?.length) r.push({ icon: Users, k: t("Suited for", "को लागि उपयुक्त"), v: l.suited.map((s) => t(SUITED[s])).join(", ") });
  } else if (l.kind === "land") {
    const a = area(l.aana!);
    r.push({ icon: LandPlot, k: t("Land type", "जग्गाको प्रकार"), v: t(landType(l.landType!).name) });
    r.push({ icon: Ruler, k: t("Area", "क्षेत्रफल"), v: a.label });
    r.push({ icon: Ruler, k: t("Area in sq ft", "वर्गफिटमा"), v: `≈ ${a.sqft}` });
    r.push({ icon: Wallet, k: t("Price per aana", "प्रति आना मूल्य"), v: moneyBig(pricePerAana(l), lang) });
    if (l.roadFt) r.push({ icon: Route, k: t("Road access", "सडक पहुँच"), v: `${num(l.roadFt, lang)} ${t("ft", "फिट")}` });
    if (l.frontFt) r.push({ icon: Ruler, k: t("Frontage", "मोहडा"), v: `${num(l.frontFt, lang)} ${t("ft", "फिट")}` });
    if (l.facing) r.push({ icon: Compass, k: t("Facing", "मुख"), v: facing(l.facing).replace(/ (facing|मुखी)$/, "") });
  } else {
    r.push({ icon: Building2, k: t("Type", "प्रकार"), v: t(propType(l.propType!).name) });
    if (l.beds) r.push({ icon: BedDouble, k: t("Bedrooms", "सुत्ने कोठा"), v: num(l.beds, lang) });
    if (l.baths) r.push({ icon: Bath, k: t("Bathrooms", "बाथरुम"), v: num(l.baths, lang) });
    if (l.builtSqft) r.push({ icon: Ruler, k: t("Built-up area", "निर्मित क्षेत्रफल"), v: `${num(l.builtSqft.toLocaleString("en-IN"), lang)} ${t("sq ft", "वर्गफिट")}` });
    if (l.landAana) r.push({ icon: LandPlot, k: t("Land area", "जग्गाको क्षेत्रफल"), v: area(l.landAana).label });
    if (l.storeys) r.push({ icon: Layers, k: l.propType === "office" ? t("Floors", "तला") : t("Storeys", "तला"), v: num(l.storeys, lang) });
    if (l.ageYears != null) r.push({ icon: Hourglass, k: t("Age", "उमेर"), v: `${num(l.ageYears, lang)} ${t("years", "वर्ष")}` });
    if (l.parkingSpots) r.push({ icon: Car, k: t("Parking", "पार्किङ"), v: num(l.parkingSpots, lang) });
    if (l.facing) r.push({ icon: Compass, k: t("Facing", "मुख"), v: facing(l.facing).replace(/ (facing|मुखी)$/, "") });
    if (l.roadFt) r.push({ icon: Route, k: t("Road access", "सडक पहुँच"), v: `${num(l.roadFt, lang)} ${t("ft", "फिट")}` });
  }
  return r;
}

function Block({ title, icon, children, id }: { title: string; icon?: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <h2 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold text-brand-deep">{icon}{title}</h2>
      {children}
    </section>
  );
}

function LocationCard({ l }: { l: Listing }) {
  const { t, where } = useListingText();
  return (
    <div className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-[1.2fr_1fr]">
      <div className="relative min-h-[150px] bg-pale" aria-hidden>
        <svg viewBox="0 0 300 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="300" height="180" fill="#EAF1FB" />
          <path d="M-10 120C60 100 90 150 160 110S260 70 320 90" stroke="#fff" strokeWidth="16" fill="none" /><path d="M120-10C140 40 100 80 130 120S170 170 160 200" stroke="#fff" strokeWidth="12" fill="none" />
          <path d="M-10 40L320 20" stroke="#fff" strokeWidth="8" /><rect x="190" y="110" width="70" height="46" rx="8" fill="#D6E6C9" /><rect x="30" y="64" width="54" height="32" rx="6" fill="#D6E6C9" />
          <g transform="translate(140 52)"><path d="M18 0C8 0 0 8 0 18c0 14 18 32 18 32s18-18 18-32C36 8 28 0 18 0z" fill="#F5A623" /><circle cx="18" cy="18" r="7" fill="#fff" /></g>
        </svg>
      </div>
      <div className="p-4">
        <p className="flex items-start gap-2 text-[15px] font-bold text-ink"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{where(l)}</p>
        <p className="mt-2 text-sm text-muted">{t("Exact address and map pin are shared after you request a visit. This map is an illustration, not a real location.", "ठ्याक्कै ठेगाना र नक्सा पिन भ्रमण अनुरोधपछि दिइन्छ। यो नक्सा चित्रण हो, वास्तविक स्थान होइन।")}</p>
      </div>
    </div>
  );
}

export function ListingDetail({ listing: l }: { listing: Listing }) {
  const { t, lang } = useLang();
  const meta = kindMeta(l.kind);
  const title = t(listingTitle(l));
  const rows = useRows(l);
  const { where } = useListingText();
  const [shot, setShot] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const seeds = [l.id, `${l.id}-b`, `${l.id}-c`, `${l.id}-d`];
  const photos = galleryPhotos(imageKey.listing(l.id), imageKey.rental(l.scene)); // your own photos: public/images/listings/<id>.jpg, <id>-2.jpg ...
  const saved = useApp((s) => s.savedListings.includes(l.id));
  const toggle = useApp((s) => s.toggleSavedListing);
  const toast = useApp((s) => s.toast);
  const hydrated = useHydrated();
  const isSaved = hydrated && saved;
  const save = () => { toggle(l.id); toast(isSaved ? t("Removed from saved", "सुरक्षित सूचीबाट हटाइयो") : t("Saved to your account (demo)", "तपाईंको खातामा सुरक्षित (डेमो)"), "info"); };
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try { if (navigator.share) { await navigator.share({ title, url }); return; } await navigator.clipboard.writeText(url); toast(t("Link copied", "लिङ्क कपी भयो"), "success"); } catch { toast(t("Could not share from here", "यहाँबाट सेयर गर्न सकिएन"), "info"); }
  };
  const related = listingsOf(l.kind).filter((x) => x.id !== l.id).sort((a, b) => Number(b.district === l.district) - Number(a.district === l.district) || Number((b.roomType ?? b.landType ?? b.propType) === (l.roomType ?? l.landType ?? l.propType)) - Number((a.roomType ?? a.landType ?? a.propType) === (l.roomType ?? l.landType ?? l.propType))).slice(0, 3);
  const checklist = CHECKLISTS[l.kind];
  const included = l.kind === "rooms" ? (l.includes ?? furnishing(l.furnishing!).items) : null;
  const upfront = l.kind === "rooms" ? l.price + (l.depositMonths ?? 0) * l.price : 0;

  return (
    <>
      <Container className="pt-5 sm:pt-7">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Rentals & Property", "भाडा तथा सम्पत्ति"), href: "/rentals" }, { label: t(meta.name), href: `/rentals/${l.kind}` }, { label: title }]} className="mb-4" />
        <RentalNav className="mb-6" />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10 xl:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-6">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-pale shadow-card ring-1 ring-line sm:aspect-[16/10]">
                <div key={shot} className="h-full w-full animate-[pop_.25s_ease-out]">{photos.length ? <SiteImage src={photos[Math.min(shot, photos.length - 1)]} alt={title} priority sizes="(min-width:1024px) 640px, 100vw" /> : <ServiceScene category={l.scene} seed={seeds[shot]} label={title} illustration />}</div>
                {!photos.length && <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-muted backdrop-blur">{t("Illustration — photos appear with real listings", "चित्रण — वास्तविक सूचीमा फोटो आउँछन्")}</span>}
              </div>
              {(photos.length === 0 || photos.length > 1) && <div className="mt-3 grid grid-cols-4 gap-2.5" role="group" aria-label={t("Gallery", "ग्यालरी")}>
                {(photos.length ? photos : seeds).map((sd, i) => (
                  <button key={sd} type="button" onClick={() => setShot(i)} aria-pressed={shot === i} aria-label={`${t("Image", "तस्बिर")} ${num(i + 1, lang)}`} className={cn("aspect-[4/3] overflow-hidden rounded-xl ring-2 transition", shot === i ? "ring-brand" : "opacity-80 ring-transparent hover:opacity-100")}>
                    {photos.length ? <SiteImage src={sd} /> : <ServiceScene category={l.scene} seed={sd} illustration />}
                  </button>
                ))}
              </div>}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{t(typeBadgeText(l))}</Badge>
                {l.kind === "rooms" && <Badge tone={l.furnishing === "furnished" ? "success" : "outline"}>{t(furnishing(l.furnishing!).name)}</Badge>}
                <Badge tone="dark">{t("Demo listing", "डेमो सूची")}</Badge>
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{title}</h1>
                <div className="flex gap-1.5 lg:hidden">
                  <button type="button" onClick={save} aria-pressed={isSaved} aria-label={t("Save listing", "सूची सुरक्षित गर्नुहोस्")} className="grid h-11 w-11 place-items-center rounded-full border border-line text-brand hover:bg-pale"><Heart className={cn("h-5 w-5", isSaved && "fill-danger text-danger")} aria-hidden /></button>
                  <button type="button" onClick={share} aria-label={t("Share", "सेयर")} className="grid h-11 w-11 place-items-center rounded-full border border-line text-brand hover:bg-pale"><Share2 className="h-5 w-5" aria-hidden /></button>
                </div>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-muted"><MapPin className="h-4 w-4 text-brand" aria-hidden />{where(l)}</p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink">{t(l.note)}</p>
              <div className="mt-4 lg:hidden"><ListingPrice l={l} size="lg" /></div>
            </div>

            <Block title={t("At a glance", "एक नजरमा")} icon={<Home className="h-5 w-5 text-brand" aria-hidden />}>
              <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {rows.map(({ icon: I, k, v }) => (
                  <div key={k} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pale text-brand"><I className="h-[18px] w-[18px]" aria-hidden /></span>
                    <div className="min-w-0"><dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt><dd className="text-[15px] font-bold text-ink">{v}</dd></div>
                  </div>
                ))}
              </dl>
            </Block>

            {included && (
              <Block title={t("What’s included", "के समावेश छ")} icon={<Check className="h-5 w-5 text-success" aria-hidden />}>
                <p className="mb-3 text-sm text-muted">{t(furnishing(l.furnishing!).desc)}</p>
                <ul className="space-y-2.5">{included.map((x, i) => <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />{t(x)}</li>)}</ul>
                <p className="mt-4 flex items-start gap-2 text-xs text-muted"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />{t("Confirm every item at the visit — what is included is set by the owner.", "भ्रमणमा हरेक सामग्री पुष्टि गर्नुहोस् — के समावेश छ भन्ने घरधनीले तोक्छन्।")}</p>
              </Block>
            )}

            {l.facilities.length > 0 && <Block title={l.kind === "land" ? t("Utilities nearby", "नजिकका सुविधा") : t("Facilities", "सुविधा")}><FacilityList items={l.facilities} /></Block>}

            <Block title={t("Location", "स्थान")} icon={<MapPin className="h-5 w-5 text-brand" aria-hidden />}><LocationCard l={l} /></Block>

            <Block title={t(checklist.title)} icon={<ShieldCheck className="h-5 w-5 text-brand" aria-hidden />} id="checklist">
              <ul className="space-y-3">{checklist.items.map((x, i) => <li key={i} className="flex items-start gap-3 text-[15px] text-ink"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pale-2 text-[11px] font-bold text-brand">{num(i + 1, lang)}</span>{t(x)}</li>)}</ul>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-pale p-3 text-xs text-muted"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />{t("General guidance only, not legal advice. Check the details with the relevant office or a licensed professional.", "सामान्य मार्गदर्शन मात्र, कानुनी सल्लाह होइन। सम्बन्धित कार्यालय वा इजाजतप्राप्त पेसाकर्मीसँग विवरण जाँच गर्नुहोस्।")}</p>
              <p className="mt-3 text-sm text-muted">{t("Read the", "पढ्नुहोस्")} <Link href={l.kind === "rooms" ? "/legal/rental-terms" : "/legal/property-terms"} className="font-semibold text-brand underline-offset-2 hover:underline">{l.kind === "rooms" ? t("room rental terms (draft)", "कोठा भाडा सर्त (मस्यौदा)") : t("land & property sale terms (draft)", "जग्गा तथा सम्पत्ति बिक्री सर्त (मस्यौदा)")}</Link> {t("for how Famous Services works, what it does and does not do, and fees.", "फेमस सर्भिसेजले कसरी काम गर्छ, के गर्छ र के गर्दैन, र शुल्कबारे।")}</p>
            </Block>
          </div>

          {/* Desktop sticky panel */}
          <aside className="hidden lg:block" aria-label={t("Request a visit", "भ्रमण अनुरोध")}>
            <div className="sticky top-28 space-y-3">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-lift">
                <ListingPrice l={l} size="lg" />
                {l.kind === "rooms" && (
                  <dl className="mt-4 space-y-2 rounded-xl bg-pale p-3.5 text-sm">
                    <div className="flex justify-between gap-3"><dt className="text-muted">{t("First month’s rent", "पहिलो महिनाको भाडा")}</dt><dd className="font-semibold text-ink">{money(l.price, lang)}</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-muted">{t("Deposit", "धरौटी")} ({num(l.depositMonths ?? 0, lang)} {t("mo", "महिना")})</dt><dd className="font-semibold text-ink">{money((l.depositMonths ?? 0) * l.price, lang)}</dd></div>
                    <div className="flex justify-between gap-3 border-t border-line pt-2"><dt className="font-bold text-ink">{t("Upfront (estimate)", "सुरुमा (अनुमान)")}</dt><dd className="font-extrabold text-brand-deep">{money(upfront, lang)}</dd></div>
                  </dl>
                )}
                <Button variant="accent" size="lg" className="mt-4 w-full" onClick={() => setOpen(true)} aria-haspopup="dialog">{t("Request a visit", "भ्रमण अनुरोध गर्नुहोस्")}</Button>
                <div className="mt-3 grid grid-cols-2 gap-2.5"><CallButton /><WhatsAppButton /></div>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <button type="button" onClick={save} aria-pressed={isSaved} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-brand hover:bg-pale"><Heart className={cn("h-[18px] w-[18px]", isSaved && "fill-danger text-danger")} aria-hidden />{isSaved ? t("Saved", "सुरक्षित") : t("Save", "सुरक्षित गर्नुहोस्")}</button>
                  <button type="button" onClick={share} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-sm font-semibold text-brand hover:bg-pale"><Share2 className="h-[18px] w-[18px]" aria-hidden />{t("Share", "सेयर")}</button>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-pale p-3.5 text-xs text-muted"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{t("Prototype: this is a demo listing. No request is sent and no payment is taken.", "प्रोटोटाइप: यो डेमो सूची हो। कुनै अनुरोध पठाइँदैन र भुक्तानी लिइँदैन।")}</div>
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <Section tone="pale" className="mt-12 !py-10 sm:!py-14">
          <SectionHeading eyebrow={t("More like this", "यस्तै अरू")} title={t("Other demo listings", "अन्य डेमो सूची")} action={<Link href={`/rentals/${l.kind}`} className="text-sm font-bold text-brand hover:underline">{t("View all", "सबै हेर्नुहोस्")} →</Link>} />
          <div className="grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-5">{related.map((r) => <ListingCard key={r.id} listing={r} />)}</div>
        </Section>
      )}

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-safe pt-3 shadow-bar backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3 pb-3">
          <div className="min-w-0 flex-1"><ListingPrice l={l} /></div>
          <Button variant="accent" size="md" className="shrink-0" onClick={() => setOpen(true)} aria-haspopup="dialog">{t("Request a visit", "भ्रमण अनुरोध")}</Button>
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} side="right" title={t("Request a visit", "भ्रमण अनुरोध गर्नुहोस्")}>
        <EnquiryForm listing={l} onDone={() => setOpen(false)} />
      </Sheet>
    </>
  );
}
