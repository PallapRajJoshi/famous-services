"use client";
import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";
import { KINDS, listingsOf } from "@/data/rentals";
import { ServiceScene } from "@/components/art/scenes";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { useLang } from "@/components/lang-provider";
import { num } from "@/lib/format";

/** Entry point to the Rentals & Property section. `strip` = compact (inside /services), `full` = home page band. */
export function RentalsBand({ variant = "full" }: { variant?: "full" | "strip" }) {
  const { t, lang } = useLang();
  if (variant === "strip") {
    return (
      <section aria-labelledby="rb-h" className="mb-10 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-pale to-white p-5 shadow-card sm:p-7">
        <div className="flex flex-col gap-5">
          <div className="max-w-lg">
            <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand"><KeyRound className="h-4 w-4" aria-hidden />{t("Also on Famous Services", "फेमस सर्भिसेजमा यो पनि")}</p>
            <h2 id="rb-h" className="text-xl font-extrabold text-brand-deep sm:text-2xl">{t("Rentals & Property", "भाडा तथा सम्पत्ति")}</h2>
            <p className="mt-1.5 text-sm text-muted sm:text-base">{t("Rooms for rent by type and furnishing, land for sale and property for sale — in one place.", "प्रकार र फर्निचरअनुसार भाडामा कोठा, बिक्रीमा जग्गा र सम्पत्ति — एउटै ठाउँमा।")}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {KINDS.map((k) => (
              <li key={k.slug}>
                <Link href={`/rentals/${k.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5 pr-3 transition hover:border-brand/40 hover:shadow-card">
                  <span className="h-14 w-[72px] shrink-0 overflow-hidden rounded-xl"><ServiceScene category={k.scene} seed={`band-${k.slug}`} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-bold leading-tight text-ink">{t(k.name)}</span><span className="block whitespace-nowrap text-xs text-muted">{num(listingsOf(k.slug).length, lang)} {t("demo listings", "डेमो सूची")}</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="rb-h" className="bg-pale py-12 sm:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t("Rentals & Property", "भाडा तथा सम्पत्ति")}</p>
            <h2 id="rb-h" className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{t("Looking for a room, land or a home?", "कोठा, जग्गा वा घर खोज्दै हुनुहुन्छ?")}</h2>
            <p className="mt-2.5 text-base leading-relaxed text-muted">{t("Single, double, shared, studio and flat rentals — furnished or not — plus land and property for sale across Kathmandu Valley.", "सिंगल, डबल, साझा, स्टुडियो र फ्ल्याट भाडा — फर्निस्ड वा नभएका — साथै काठमाडौँ उपत्यकामा बिक्रीमा जग्गा र सम्पत्ति।")}</p>
          </div>
          <ButtonLink href="/rentals" variant="outline">{t("Explore Rentals & Property", "भाडा तथा सम्पत्ति हेर्नुहोस्")}<ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
        </div>
        <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {KINDS.map((k, i) => (
            <Reveal as="li" key={k.slug} delay={i * 0.06} className="h-full">
              <Link href={`/rentals/${k.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
                <span className="block aspect-[16/10] overflow-hidden bg-pale"><span className="block h-full w-full transition-transform duration-500 group-hover:scale-[1.05]"><ServiceScene category={k.scene} seed={`home-${k.slug}`} /></span></span>
                <span className="block p-4 sm:p-5">
                  <span className="block text-lg font-extrabold text-brand-deep">{t(k.name)}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{t(k.blurb)}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand">{t("Browse", "हेर्नुहोस्")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
