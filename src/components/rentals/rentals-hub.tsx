"use client";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Eye, FileCheck2, KeyRound, MousePointerClick, PlusCircle } from "lucide-react";
import { FURNISHINGS, KINDS, LAND_TYPES, LISTINGS, PROP_TYPES, ROOM_TYPES, RENTAL_FAQ, CHECKLISTS, listingsOf } from "@/data/rentals";
import { ServiceScene } from "@/components/art/scenes";
import { Container, Section, SectionHeading, PageHero } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { useLang } from "@/components/lang-provider";
import { money, num } from "@/lib/format";
import { typeOf } from "@/lib/rental-filters";
import { ListingCard } from "./listing-card";
import { DemoNote, RentalNav } from "./rental-nav";

function MiniCard({ href, scene, seed, title, body, meta, foot }: { href: string; scene: string; seed: string; title: string; body: string; meta?: string; foot?: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <span className="block aspect-[16/10] overflow-hidden bg-pale"><span className="block h-full w-full transition-transform duration-500 group-hover:scale-[1.05]"><ServiceScene category={scene} seed={seed} /></span></span>
      <span className="flex flex-1 flex-col p-4">
        <span className="text-base font-bold text-ink">{title}</span>
        <span className="mt-1 text-sm leading-relaxed text-muted">{body}</span>
        {meta && <span className="mt-2 text-xs font-semibold text-brand-deep">{meta}</span>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-brand">{foot}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
      </span>
    </Link>
  );
}

export function RentalsHub() {
  const { t, lang } = useLang();
  const featured = LISTINGS.filter((l) => l.featured).slice(0, 6);
  const from = (kindSlug: "rooms", type: string) => { const p = listingsOf(kindSlug).filter((l) => typeOf(l) === type).map((l) => l.price); return p.length ? Math.min(...p) : null; };
  const steps = [
    { I: MousePointerClick, h: t("Browse and shortlist", "हेर्नुहोस् र छान्नुहोस्"), b: t("Filter by type, budget and district, and save the ones you like.", "प्रकार, बजेट र जिल्लाले फिल्टर गर्नुहोस्, मन परेकालाई सुरक्षित गर्नुहोस्।") },
    { I: Eye, h: t("Request a visit", "भ्रमण अनुरोध गर्नुहोस्"), b: t("Tell us a good time and we arrange the viewing.", "उपयुक्त समय बताउनुहोस्, हामी भ्रमण मिलाउँछौँ।") },
    { I: ClipboardCheck, h: t("Visit and check", "भ्रमण र जाँच"), b: t("See it in person and go through the checklist on every listing.", "आफैँ हेर्नुहोस् र हरेक सूचीको चेकलिस्ट हेर्नुहोस्।") },
    { I: FileCheck2, h: t("Agree in writing", "लिखित सहमति"), b: t("Sign a written rental agreement, or have a lawyer review a sale deed.", "लिखित भाडा सम्झौता गर्नुहोस्, वा कानुनी सल्लाहकारले बिक्री लिखत हेरोस्।") },
  ];
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Rentals & Property", "भाडा तथा सम्पत्ति") }]} />}
        eyebrow={t("Rentals & Property", "भाडा तथा सम्पत्ति")} title={t("Find a room, a plot or a home", "कोठा, जग्गा वा घर खोज्नुहोस्")}
        body={t("Single, double, shared, studio and flat rentals — furnished or not — plus land and property for sale across Kathmandu, Lalitpur and Bhaktapur.", "सिंगल, डबल, साझा, स्टुडियो र फ्ल्याट भाडा — फर्निस्ड वा नभएका — साथै काठमाडौँ, ललितपुर र भक्तपुरमा बिक्रीमा जग्गा र सम्पत्ति।")}>
        <RentalNav className="mt-6" />
      </PageHero>

      <Section className="!py-8 sm:!py-12">
        <DemoNote className="mb-8" />
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {KINDS.map((k) => {
            const n = listingsOf(k.slug).length;
            const subs = k.slug === "rooms" ? ROOM_TYPES : k.slug === "land" ? LAND_TYPES : PROP_TYPES;
            return (
              <StaggerItem key={k.slug} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden bg-pale"><div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]"><ServiceScene category={k.scene} seed={`hub-${k.slug}`} /></div></div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand">{num(n, lang)} {t("demo listings", "डेमो सूची")}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-brand-deep"><Link href={`/rentals/${k.slug}`} className="after:absolute after:inset-0 after:content-['']">{t(k.name)}</Link></h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(k.blurb)}</p>
                    <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                      {subs.map((s) => <li key={s.slug}><Link href={`/rentals/${k.slug}?type=${s.slug}`} className="inline-flex h-8 items-center rounded-full bg-pale px-3 text-xs font-semibold text-brand-deep transition hover:bg-pale-2">{t("short" in s ? s.short : s.name)}</Link></li>)}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-brand">{t("Browse", "हेर्नुहोस्")} {t(k.name).toLowerCase()}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="pale" className="!py-10 sm:!py-14">
        <SectionHeading eyebrow={t("Rooms for rent", "भाडामा कोठा")} title={t("Find the right room type", "सही कोठाको प्रकार रोज्नुहोस्")} body={t("From a bed in a shared room to a two-bedroom flat — pick the type first, then narrow by furnishing and budget.", "साझा कोठाको बेडदेखि दुई कोठे फ्ल्याटसम्म — पहिले प्रकार रोज्नुहोस्, अनि फर्निचर र बजेटले छान्नुहोस्।")} />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {ROOM_TYPES.map((r) => { const p = from("rooms", r.slug); return (
            <StaggerItem key={r.slug} className="h-full"><MiniCard href={`/rentals/rooms?type=${r.slug}`} scene={r.scene} seed={`type-${r.slug}`} title={t(r.name)} body={t(r.desc)} meta={`${t(r.who)}${p ? ` · ${t("from", "सुरु")} ${money(p, lang)} ${t("/ mo (sample)", "/ महिना (नमुना)")}` : ""}`} foot={t("See rooms", "कोठा हेर्नुहोस्")} /></StaggerItem>
          ); })}
        </Stagger>
      </Section>

      <Section className="!py-10 sm:!py-14">
        <SectionHeading eyebrow={t("Furnishing explained", "फर्निचर बुझौँ")} title={t("Furnished, semi-furnished or unfurnished?", "फर्निस्ड, अर्ध–फर्निस्ड वा अनफर्निस्ड?")} body={t("What each label usually means. Every listing states exactly what is included — confirm it at the visit.", "हरेक शब्दको सामान्य अर्थ। हरेक सूचीमा के समावेश छ ठ्याक्कै लेखिएको हुन्छ — भ्रमणमा पुष्टि गर्नुहोस्।")} />
        <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {FURNISHINGS.map((f, i) => (
            <Reveal as="li" key={f.slug} delay={i * 0.05} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-pale text-brand"><KeyRound className="h-5 w-5" aria-hidden /></span>
              <h3 className="text-lg font-extrabold text-brand-deep">{t(f.name)}</h3>
              <p className="mt-1 text-sm text-muted">{t(f.desc)}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink">{f.items.map((x, j) => <li key={j} className="flex items-start gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{t(x)}</li>)}</ul>
              <Link href={`/rentals/rooms?furn=${f.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand hover:underline">{t("See", "हेर्नुहोस्")} {t(f.name).toLowerCase()} {t("rooms", "कोठा")}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="pale" className="!py-10 sm:!py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t("Land for sale", "बिक्रीमा जग्गा")} title={t("Residential, commercial, agricultural", "आवासीय, व्यावसायिक, कृषि")} body={t("Sized in aana and ropani, with the sq-ft equivalent beside it.", "आना र रोपनीमा, छेउमै वर्गफिट बराबरसहित।")} />
            <div className="grid gap-4 sm:grid-cols-2">{LAND_TYPES.slice(0, 2).map((x) => <MiniCard key={x.slug} href={`/rentals/land?type=${x.slug}`} scene={x.scene} seed={`lt-${x.slug}`} title={t(x.name)} body={t(x.desc)} foot={t("See plots", "जग्गा हेर्नुहोस्")} />)}</div>
            <div className="mt-4"><MiniCard href="/rentals/land?type=agricultural" scene="land-agri" seed="lt-agri" title={t(LAND_TYPES[2].name)} body={t(LAND_TYPES[2].desc)} foot={t("See plots", "जग्गा हेर्नुहोस्")} /></div>
          </div>
          <div>
            <SectionHeading eyebrow={t("Property for sale", "बिक्रीमा सम्पत्ति")} title={t("Houses, apartments, shops, offices", "घर, अपार्टमेन्ट, पसल, कार्यालय")} body={t("Built-up and land area shown separately so you can compare like with like.", "निर्मित र जग्गाको क्षेत्रफल छुट्टाछुट्टै देखाइन्छ ताकि तुलना सजिलो होस्।")} />
            <div className="grid gap-4 sm:grid-cols-2">{PROP_TYPES.map((x) => <MiniCard key={x.slug} href={`/rentals/property?type=${x.slug}`} scene={x.scene} seed={`pt-${x.slug}`} title={t(x.name)} body={t(x.desc)} foot={t("See properties", "सम्पत्ति हेर्नुहोस्")} />)}</div>
          </div>
        </div>
      </Section>

      <Section className="!py-10 sm:!py-14">
        <SectionHeading eyebrow={t("Sample listings", "नमुना सूची")} title={t("A few to start with", "सुरु गर्न केही")} body={t("Demo listings with sample prices — to show how a listing looks.", "नमुना मूल्यसहित डेमो सूची — सूची कस्तो देखिन्छ देखाउन।")} />
        <div className="grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-5">{featured.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
        <p className="mt-5 text-xs text-muted">{t("Land and property totals are shown in lakh and crore (1 lakh = 100,000 · 1 crore = 10,000,000).", "जग्गा र सम्पत्तिको जम्मा लाख र करोडमा देखाइएको छ (१ लाख = १००,००० · १ करोड = १०,०००,०००)।")}</p>
      </Section>

      <Section tone="pale" className="!py-10 sm:!py-14">
        <SectionHeading align="center" eyebrow={t("How it works", "कसरी काम गर्छ")} title={t("From browsing to moving in", "हेर्नेदेखि बस्नेसम्म")} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ I, h, b }, i) => <li key={i} className="rounded-2xl border border-line bg-white p-5 shadow-card"><span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-pale text-brand"><I className="h-5 w-5" aria-hidden /></span><h3 className="font-bold text-ink">{num(i + 1, lang)}. {h}</h3><p className="mt-1 text-sm text-muted">{b}</p></li>)}
        </ol>
      </Section>

      <Section className="!py-10 sm:!py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow={t("Be careful", "सावधानी")} title={t("Checklists before you pay", "भुक्तानी अघि चेकलिस्ट")} body={t("General guidance for renters and buyers. Not legal advice.", "भाडामा लिने र किन्ने दुवैका लागि सामान्य मार्गदर्शन। कानुनी सल्लाह होइन।")} />
            <Accordion defaultOpen={0} items={(["rooms", "land", "property"] as const).map((k) => ({ q: t(CHECKLISTS[k].title), a: <ul className="space-y-2 pb-1">{CHECKLISTS[k].items.map((x, i) => <li key={i} className="flex items-start gap-2 text-sm text-ink"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{t(x)}</li>)}</ul> }))} />
          </div>
          <div>
            <SectionHeading eyebrow={t("Good to know", "जान्न उपयोगी")} title={t("Rentals & property: common questions", "भाडा तथा सम्पत्ति: सामान्य प्रश्न")} />
            <Accordion defaultOpen={0} items={RENTAL_FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
            <div className="mt-5 rounded-xl border border-line bg-pale p-4 text-sm text-ink">
              <p className="font-bold">{t("Terms for rooms, land & property (drafts)", "कोठा, जग्गा तथा सम्पत्तिका सर्त (मस्यौदा)")}</p>
              <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/legal/rental-terms" className="font-semibold text-brand underline-offset-2 hover:underline">{t("Room rental terms", "कोठा भाडा सर्त")}</Link>
                <Link href="/legal/property-terms" className="font-semibold text-brand underline-offset-2 hover:underline">{t("Land & property terms", "जग्गा तथा सम्पत्ति सर्त")}</Link>
                <Link href="/legal/owner-terms" className="font-semibold text-brand underline-offset-2 hover:underline">{t("Owner & listing terms", "घरधनी तथा सूचीकरण सर्त")}</Link>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section data-dark className="bg-brand-deep py-12 text-white sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{t("Have a room, land or property to list?", "भाडामा दिने कोठा, जग्गा वा सम्पत्ति छ?")}</h2>
            <p className="mt-2 text-white/75">{t("Tell us what you have and where it is. In this prototype the form shows the flow — nothing is published.", "तपाईंसँग के छ र कहाँ छ बताउनुहोस्। यो प्रोटोटाइपमा फारमले प्रक्रिया देखाउँछ — केही प्रकाशित हुँदैन।")}</p>
          </div>
          <ButtonLink href="/rentals/list" variant="light" size="lg"><PlusCircle className="h-5 w-5" aria-hidden />{t("List your property", "आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्")}</ButtonLink>
        </Container>
      </section>
    </>
  );
}
