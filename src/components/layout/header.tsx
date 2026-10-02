"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MapPin, Menu, Search, User, PackageSearch, Briefcase, KeyRound } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/section";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { CategoryIcon } from "@/components/ui/icons";
import { CATEGORIES, STRIP_ORDER, categoryBySlug } from "@/data/catalog";
import { DISTRICTS, SITE } from "@/data/content";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { useUi } from "@/store/ui-store";
import { LangToggle } from "./lang-toggle";
import { CallButton, WhatsAppButton } from "./contact-actions";
import { MAIN_LINKS } from "./nav-data";
import { cn } from "@/lib/cn";

function useAreaLabel() {
  const { t } = useLang();
  const area = useApp((s) => s.area);
  const h = useHydrated();
  const d = h && area ? DISTRICTS.find((x) => x.slug === area) : null;
  return d ? t(d.name) : t("Select area", "क्षेत्र रोज्नुहोस्");
}

function ServicesMenu() {
  const { t } = useLang();
  const pathname = usePathname();
  return (
    <Popover label={t("Services menu", "सेवा मेनु")} panelClassName="w-[720px] p-5"
      trigger={({ open, toggle, id }) => (
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls={id} className={cn("inline-flex h-11 items-center gap-1.5 rounded-xl px-3.5 text-[15px] font-semibold transition-colors hover:bg-pale", pathname.startsWith("/services") ? "text-brand" : "text-ink")}>
          {t("Services", "सेवाहरू")}<ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      )}>
      {(close) => (
        <div>
          <ul className="grid grid-cols-3 gap-1">
            {STRIP_ORDER.map((slug) => { const c = categoryBySlug(slug)!; return (
              <li key={slug}>
                <Link href={`/services/${slug}`} onClick={close} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-pale">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-pale text-brand"><CategoryIcon slug={slug} className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block truncate text-sm font-bold text-ink">{t(c.name)}</span><span className="block truncate text-xs text-muted">{t(c.tagline).split(/[.,।]/)[0]}</span></span>
                </Link>
              </li>
            ); })}
          </ul>
          <Link href="/rentals" onClick={close} className="mt-3 flex items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:bg-pale">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand text-white"><KeyRound className="h-5 w-5" aria-hidden /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-ink">{t("Rentals & Property", "भाडा तथा सम्पत्ति")}</span><span className="block truncate text-xs text-muted">{t("Rooms for rent · Land for sale · Property for sale", "भाडामा कोठा · बिक्रीमा जग्गा · बिक्रीमा सम्पत्ति")}</span></span>
            <span className="text-sm font-bold text-brand">{t("Browse →", "हेर्नुहोस् →")}</span>
          </Link>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-pale px-4 py-3">
            <p className="text-sm text-muted">{CATEGORIES.length} {t("categories · sample prices shown", "श्रेणी · नमुना मूल्य देखाइएको")}</p>
            <Link href="/services" onClick={close} className="text-sm font-bold text-brand hover:underline">{t("View all services →", "सबै सेवा हेर्नुहोस् →")}</Link>
          </div>
        </div>
      )}
    </Popover>
  );
}

export function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const hydrated = useHydrated();
  const user = useApp((s) => s.user);
  const areaLabel = useAreaLabel();
  const setSearch = useUi((s) => s.setSearch);
  const setMenu = useUi((s) => s.setMenu);
  const setArea = useUi((s) => s.setAreaOpen);
  const loggedIn = hydrated && !!user;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* utility row — desktop only */}
      <div className="hidden bg-brand-deep text-white lg:block" data-dark>
        <Container className="flex h-10 items-center justify-between text-[13px]">
          <p className="font-medium text-white/80">{t(SITE.tagline)}</p>
          <nav aria-label={t("Utility", "उपयोगी")} className="flex items-center gap-1">
            <Link href="/track" className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 font-semibold text-white/90 transition hover:bg-white/10"><PackageSearch className="h-4 w-4" aria-hidden />{t("Track Booking", "बुकिङ ट्र्याक")}</Link>
            <Link href="/become-a-professional" className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 font-semibold text-white/90 transition hover:bg-white/10"><Briefcase className="h-4 w-4" aria-hidden />{t("Become a Professional", "प्रोफेसनल बन्नुहोस्")}</Link>
            <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
            <CallButton variant="ghost" size="sm" className="h-8 px-2.5 text-[13px] text-white/90 hover:bg-white/10 hover:text-white" />
            <WhatsAppButton variant="ghost" size="sm" className="h-8 px-2.5 text-[13px] text-white/90 hover:bg-white/10 hover:text-white" />
            <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
            <LangToggle dark />
          </nav>
        </Container>
      </div>

      {/* main row */}
      <Container className="flex h-16 items-center gap-2 lg:h-[72px] lg:gap-3">
        <Link href="/" aria-label="Famous Services — home" className="mr-1 shrink-0 rounded-lg lg:mr-3"><Logo /></Link>

        <nav aria-label={t("Main", "मुख्य")} className="hidden items-center gap-0.5 lg:flex">
          <ServicesMenu />
          {MAIN_LINKS.map((l, i) => (
            <Link key={l.href} href={l.href} className={cn("h-11 items-center rounded-xl px-3.5 text-[15px] font-semibold transition-colors hover:bg-pale", i === 0 ? "hidden lg:inline-flex" : i < 2 ? "hidden xl:inline-flex" : "hidden 2xl:inline-flex", pathname.startsWith(l.href) ? "text-brand" : "text-ink")}>{t(l.label)}</Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:gap-2">
          {/* desktop search field */}
          <button type="button" onClick={() => setSearch(true)} className="hidden h-11 w-[200px] items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 text-sm text-muted transition hover:border-brand/40 xl:flex" aria-label={t("Search services", "सेवा खोज्नुहोस्")}>
            <Search className="h-4 w-4 text-brand" aria-hidden /><span className="flex-1 whitespace-nowrap text-left">{t("Search services…", "सेवा खोज्नुहोस्…")}</span><kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] font-semibold text-muted">Ctrl K</kbd>
          </button>
          <button type="button" onClick={() => setSearch(true)} aria-label={t("Search services", "सेवा खोज्नुहोस्")} className="grid h-11 w-11 place-items-center rounded-xl text-brand transition hover:bg-pale xl:hidden"><Search className="h-5 w-5" aria-hidden /></button>

          <button type="button" onClick={() => setArea(true)} aria-label={`${t("Service area", "सेवा क्षेत्र")}: ${areaLabel}`} className="flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-sm font-semibold text-ink transition hover:bg-pale sm:border sm:border-line">
            <MapPin className="h-[18px] w-[18px] shrink-0 text-brand" aria-hidden />
            <span className="hidden max-w-[110px] truncate min-[480px]:inline">{areaLabel}</span>
            <ChevronDown className="hidden h-4 w-4 text-muted sm:block" aria-hidden />
          </button>

          <Link href={loggedIn ? "/account" : "/login"} className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-xl px-3 text-[15px] font-semibold text-ink transition hover:bg-pale lg:inline-flex"><User className="h-[18px] w-[18px] text-brand" aria-hidden />{loggedIn ? t("Account", "मेरो खाता") : t("Login", "लगइन")}</Link>
          <ButtonLink href="/services" variant="accent" className="hidden lg:inline-flex">{t("Book a Service", "सेवा बुक गर्नुहोस्")}</ButtonLink>

          <button type="button" onClick={() => setMenu(true)} aria-label={t("Open menu", "मेनु खोल्नुहोस्")} className={cn(buttonClasses({ variant: "ghost", size: "icon" }), "lg:hidden")}><Menu className="h-6 w-6" aria-hidden /></button>
        </div>
      </Container>
    </header>
  );
}
