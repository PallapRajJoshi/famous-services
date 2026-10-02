"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { ServiceScene } from "@/components/art/scenes";
import { CategoryIcon } from "@/components/ui/icons";
import { useLang } from "@/components/lang-provider";
import { useUi } from "@/store/ui-store";
import { categoryBySlug, isQuote } from "@/data/catalog";
import { searchServices, SEARCH_SUGGESTIONS } from "@/lib/utils";
import { money } from "@/lib/format";
import { searchListings } from "@/lib/rental-filters";
import { ListingMiniList } from "@/components/rentals/search-results";
import { useIsDesktop } from "./area-sheet";
import { imageKey } from "@/config/images";

export function SearchModal() {
  const { t, lang } = useLang();
  const router = useRouter();
  const open = useUi((s) => s.searchOpen);
  const setOpen = useUi((s) => s.setSearch);
  const [q, setQ] = React.useState("");
  const desktop = useIsDesktop();
  const res = React.useMemo(() => searchServices(q, lang, 6), [q, lang]);
  const homes = React.useMemo(() => searchListings(q, 3), [q]);
  const close = () => { setOpen(false); setQ(""); };
  const first = res.services[0];

  React.useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(true); } };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [setOpen]);

  return (
    <Sheet open={open} onClose={close} side={desktop ? "center" : "bottom"} title={t("Search services", "सेवा खोज्नुहोस्")} hideHeader className="lg:top-[12%] lg:translate-y-0 lg:max-h-[75dvh] h-[88dvh] lg:h-auto" widthClass="lg:w-[min(94vw,640px)]">
      <form role="search" onSubmit={(e) => { e.preventDefault(); close(); router.push(first ? `/services/${first.category}/${first.slug}` : homes[0] ? `/rentals/${homes[0].kind}/${homes[0].id}` : `/services?q=${encodeURIComponent(q)}`); }} className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-white px-4 py-3.5">
        <Search className="h-5 w-5 shrink-0 text-brand" aria-hidden />
        <input data-autofocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("What service do you need?", "कुन सेवा चाहिन्छ?")} aria-label={t("Search services", "सेवा खोज्नुहोस्")} className="h-11 flex-1 bg-transparent text-base text-ink placeholder:text-muted/70 focus:outline-none" />
        <button type="button" onClick={close} className="rounded-lg px-2.5 py-2 text-sm font-semibold text-muted hover:bg-pale">{t("Close", "बन्द")}</button>
      </form>
      <div className="p-4">
        {!q.trim() ? (
          <>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-muted">{t("Popular searches", "लोकप्रिय खोजी")}</p>
            <div className="flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((s) => (
                <button key={s.q} type="button" onClick={() => setQ(s.q)} className="h-10 rounded-full border border-line bg-white px-4 text-sm font-semibold text-brand-deep transition hover:border-brand hover:bg-pale">{lang === "ne" ? s.ne : s.en}</button>
              ))}
            </div>
          </>
        ) : res.services.length + res.categories.length + homes.length === 0 ? (
          <div className="py-10 text-center"><p className="font-bold text-ink">{t("No services match your search", "तपाईंको खोजीसँग मेल खाने सेवा छैन")}</p><p className="mt-1 text-sm text-muted">{t("Try a simpler word like “plumber”, “cleaning” or “AC”.", "“प्लम्बर”, “सफाइ” वा “एसी” जस्ता सरल शब्द प्रयोग गर्नुहोस्।")}</p></div>
        ) : (
          <div className="space-y-5">
            {res.categories.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">{t("Categories", "श्रेणी")}</p>
                <ul className="flex flex-wrap gap-2">
                  {res.categories.map((c) => (
                    <li key={c.slug}><Link href={`/services/${c.slug}`} onClick={close} className="inline-flex h-10 items-center gap-2 rounded-full bg-pale px-4 text-sm font-semibold text-brand-deep hover:bg-pale-2"><CategoryIcon slug={c.slug} className="h-4 w-4" />{t(c.name)}</Link></li>
                  ))}
                </ul>
              </div>
            )}
            {res.services.length > 0 && <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">{t("Services", "सेवाहरू")}</p>
              <ul className="space-y-1.5">
                {res.services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.category}/${s.slug}`} onClick={close} className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-pale">
                      <span className="h-12 w-16 shrink-0 overflow-hidden rounded-lg"><ServiceScene category={s.category} seed={s.slug} photo={imageKey.service(s.slug)} /></span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-ink">{t(s.name)}</span><span className="block truncate text-xs text-muted">{t(categoryBySlug(s.category)!.name)} · {isQuote(s) ? t("Quote", "कोटेसन") : `${t("From", "सुरु")} ${money(s.price ?? 0, lang)}`}</span></span>
                      <ArrowRight className="h-4 w-4 text-brand opacity-0 transition group-hover:opacity-100" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>}
            {homes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">{t("Rentals & Property", "भाडा तथा सम्पत्ति")}</p>
                <ListingMiniList items={homes} onNavigate={close} />
              </div>
            )}
          </div>
        )}
      </div>
    </Sheet>
  );
}
