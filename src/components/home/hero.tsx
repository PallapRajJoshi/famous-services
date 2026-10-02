"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, MapPin, Receipt, Search, ShieldCheck, Timer, ArrowRight } from "lucide-react";
import { HeroScene, ServiceScene } from "@/components/art/scenes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { DISTRICTS } from "@/data/content";
import { categoryBySlug, isQuote } from "@/data/catalog";
import { searchServices, SEARCH_SUGGESTIONS } from "@/lib/utils";
import { money } from "@/lib/format";
import { cn } from "@/lib/cn";
import { imageKey } from "@/config/images";

function HeroSearch() {
  const { t, lang } = useLang();
  const router = useRouter();
  const area = useApp((s) => s.area);
  const setArea = useApp((s) => s.setArea);
  const hydrated = useHydrated();
  const [q, setQ] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();
  const res = React.useMemo(() => searchServices(q, lang, 5), [q, lang]);
  const open = focus && q.trim().length > 0;

  React.useEffect(() => {
    const down = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) setFocus(false); };
    document.addEventListener("mousedown", down);
    return () => document.removeEventListener("mousedown", down);
  }, []);

  const go = (e?: React.FormEvent) => {
    e?.preventDefault();
    const pick = active >= 0 ? res.services[active] : null;
    if (pick) return router.push(`/services/${pick.category}/${pick.slug}`);
    router.push(q.trim() ? `/services?q=${encodeURIComponent(q.trim())}` : "/services");
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, res.services.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Escape") setFocus(false);
  };

  return (
    <div>
      <form onSubmit={go} role="search" aria-label={t("Search services", "सेवा खोज्नुहोस्")} className="rounded-2xl border border-line bg-white p-2.5 shadow-lift sm:p-3">
        <div className="grid gap-2.5 md:grid-cols-[1fr_auto]">
          <div ref={boxRef} className="relative md:col-span-2">
            <label htmlFor="hero-q" className="sr-only">{t("What service do you need?", "तपाईंलाई कुन सेवा चाहिन्छ?")}</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" aria-hidden />
            <input id="hero-q" role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined} autoComplete="off"
              value={q} onChange={(e) => { setQ(e.target.value); setActive(-1); }} onFocus={() => setFocus(true)} onKeyDown={onKey}
              placeholder={t("What service do you need?", "तपाईंलाई कुन सेवा चाहिन्छ?")}
              className="h-[52px] w-full rounded-xl border border-line bg-white pl-11 pr-3 text-base text-ink placeholder:text-muted/70 transition hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" />
            {open && (
              <ul id={listId} role="listbox" aria-label={t("Suggestions", "सुझावहरू")} className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-lift">
                {res.services.length === 0 && <li className="px-3 py-4 text-sm text-muted">{t("No match — try “plumber” or “cleaning”.", "मेल खाएन — “प्लम्बर” वा “सफाइ” प्रयोग गर्नुहोस्।")}</li>}
                {res.services.map((s, i) => (
                  <li key={s.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                    <Link href={`/services/${s.category}/${s.slug}`} className={cn("flex items-center gap-3 rounded-lg p-2 text-left", i === active ? "bg-pale" : "hover:bg-pale")}>
                      <span className="h-11 w-14 shrink-0 overflow-hidden rounded-md"><ServiceScene category={s.category} seed={s.slug} photo={imageKey.service(s.slug)} /></span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-ink">{t(s.name)}</span><span className="block truncate text-xs text-muted">{t(categoryBySlug(s.category)!.name)} · {isQuote(s) ? t("Quote", "कोटेसन") : `${t("From", "सुरु")} ${money(s.price ?? 0, lang)}`}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative min-w-0">
            <label htmlFor="hero-area" className="sr-only">{t("Where do you need the service?", "सेवा कहाँ चाहिन्छ?")}</label>
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" aria-hidden />
            <select id="hero-area" value={hydrated ? area ?? "" : ""} onChange={(e) => setArea((e.target.value || null) as never)}
              className="h-[52px] w-full appearance-none rounded-xl border border-line bg-white pl-11 pr-9 text-base text-ink transition hover:border-brand/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15">
              <option value="">{t("Where do you need the service?", "सेवा कहाँ चाहिन्छ?")}</option>
              {DISTRICTS.map((d) => <option key={d.slug} value={d.slug}>{t(d.name)}</option>)}
            </select>
            <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"><path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <Button type="submit" variant="accent" size="lg" className="w-full md:w-auto">{t("Search Services", "सेवा खोज्नुहोस्")}</Button>
        </div>
      </form>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-muted">{t("Popular:", "लोकप्रिय:")}</span>
        {SEARCH_SUGGESTIONS.map((s) => (
          <Link key={s.q} href={s.href} className="inline-flex h-9 items-center rounded-full border border-line bg-white px-3.5 text-[13px] font-semibold text-brand-deep transition hover:-translate-y-0.5 hover:border-brand hover:bg-pale">{lang === "ne" ? s.ne : s.en}</Link>
        ))}
      </div>
    </div>
  );
}

function FloatCard({ icon, title, sub, className, delay = 0 }: { icon: React.ReactNode; title: string; sub: string; className?: string; delay?: number }) {
  return (
    <div style={{ animation: `float-y 5.5s ease-in-out ${delay}s infinite` }} className={cn("absolute flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 pr-4 shadow-lift backdrop-blur", className)}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pale text-brand">{icon}</span>
      <span className="leading-tight"><span className="block text-[13px] font-bold text-ink">{title}</span><span className="block text-[11px] text-muted">{sub}</span></span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const trust = [
    { icon: <BadgeCheck className="h-5 w-5" aria-hidden />, title: t("Verified Professionals", "प्रमाणित प्रोफेसनल"), sub: t("ID & document review", "परिचय र कागजात समीक्षा") },
    { icon: <Receipt className="h-5 w-5" aria-hidden />, title: t("Transparent Pricing", "पारदर्शी मूल्य"), sub: t("Price or quote first", "पहिले मूल्य वा कोटेसन") },
    { icon: <Timer className="h-5 w-5" aria-hidden />, title: t("Same-Day Availability", "सोही दिन उपलब्धता"), sub: t("On request, where available", "उपलब्ध भएमा अनुरोधमा") },
    { icon: <ShieldCheck className="h-5 w-5" aria-hidden />, title: t("Service Guarantee", "सेवा ग्यारेन्टी"), sub: t("Terms published at launch", "सर्त सुरुवातमा प्रकाशित") },
  ];
  return (
    <section aria-labelledby="hero-h" className="relative overflow-hidden bg-gradient-to-b from-pale via-pale/60 to-white">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
      <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-xs font-bold text-brand shadow-sm"><span className="h-2 w-2 rounded-full bg-amber" aria-hidden />{t("One Place. Every Home Service.", "एउटै ठाउँ। घरका हरेक सेवा।")}</p>
          <h1 id="hero-h" className="mt-4 text-[2.15rem] font-extrabold leading-[1.12] tracking-tight text-brand-deep sm:text-5xl lg:text-[3.4rem]">{t("Trusted Home Services, Right at Your Door.", "भरपर्दो घरेलु सेवा, तपाईंको ढोकैमा।")}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t("Book trusted professionals for plumbing, electrical, cleaning, repairs and more across Kathmandu Valley.", "काठमाडौं उपत्यकाभर प्लम्बिङ, इलेक्ट्रिकल, सफाइ, मर्मत र अरू सेवाका लागि भरपर्दो प्रोफेसनल बुक गर्नुहोस्।")}</p>
          <div className="mt-7"><HeroSearch /></div>
          <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 lg:hidden">
            {trust.map((x) => (
              <li key={x.title} className="flex items-center gap-2.5 rounded-xl border border-line bg-white p-2.5 shadow-card">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pale text-brand">{x.icon}</span>
                <span className="leading-tight"><span className="block text-[12.5px] font-bold text-ink">{x.title}</span><span className="block text-[11px] text-muted">{x.sub}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-[560/520] w-full max-w-[540px]">
            <HeroScene className="drop-shadow-xl" />
            <FloatCard icon={trust[0].icon} title={trust[0].title} sub={trust[0].sub} className="-left-6 top-[14%]" />
            <FloatCard icon={trust[1].icon} title={trust[1].title} sub={trust[1].sub} className="-right-4 top-[30%]" delay={0.8} />
            <FloatCard icon={trust[2].icon} title={trust[2].title} sub={trust[2].sub} className="-left-8 bottom-[24%]" delay={1.6} />
            <FloatCard icon={trust[3].icon} title={trust[3].title} sub={trust[3].sub} className="right-0 bottom-[8%]" delay={2.4} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></Link>;
}
