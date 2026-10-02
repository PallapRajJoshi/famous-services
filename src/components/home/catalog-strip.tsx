"use client";
import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { CategoryChip } from "@/components/cards/category-card";
import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/states";
import { ButtonLink } from "@/components/ui/button";
import { useLang } from "@/components/lang-provider";
import { CATEGORIES, SERVICES, STRIP_ORDER, categoryBySlug, type CategorySlug } from "@/data/catalog";
import { cn } from "@/lib/cn";

/** Sections 4 + 5: scrolling category strip that filters the popular-services grid below it. */
export function CatalogStrip() {
  const { t } = useLang();
  const [active, setActive] = React.useState<CategorySlug | "all">("all");
  const rail = React.useRef<HTMLDivElement>(null);
  const [edge, setEdge] = React.useState({ l: false, r: true });

  const update = React.useCallback(() => {
    const el = rail.current; if (!el) return;
    setEdge({ l: el.scrollLeft > 8, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 });
  }, []);
  React.useEffect(() => { update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, [update]);
  const scrollBy = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.max(240, (rail.current?.clientWidth ?? 600) * 0.7), behavior: "smooth" });

  const list = React.useMemo(() => {
    if (active === "all") return SERVICES.filter((s) => s.popular).slice(0, 8);
    return SERVICES.filter((s) => s.category === active).slice(0, 8);
  }, [active]);
  const cat = active === "all" ? null : categoryBySlug(active);

  return (
    <>
      <section aria-labelledby="cat-h" className="border-b border-line bg-white py-6 sm:py-8">
        <Container>
          <div className="mb-3 flex items-end justify-between gap-4">
            <h2 id="cat-h" className="text-xl font-extrabold text-brand-deep sm:text-2xl">{t("Browse by category", "श्रेणी अनुसार हेर्नुहोस्")}</h2>
            <div className="hidden gap-2 lg:flex">
              <button type="button" onClick={() => scrollBy(-1)} disabled={!edge.l} aria-label={t("Scroll categories left", "श्रेणी बायाँ सार्नुहोस्")} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-brand transition hover:bg-pale disabled:opacity-35"><ChevronLeft className="h-5 w-5" aria-hidden /></button>
              <button type="button" onClick={() => scrollBy(1)} disabled={!edge.r} aria-label={t("Scroll categories right", "श्रेणी दायाँ सार्नुहोस्")} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-brand transition hover:bg-pale disabled:opacity-35"><ChevronRight className="h-5 w-5" aria-hidden /></button>
            </div>
          </div>
          <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
            <div ref={rail} onScroll={update} role="group" aria-label={t("Service categories", "सेवा श्रेणी")} className="no-scrollbar snap-x-row flex gap-1 overflow-x-auto px-4 pb-1 sm:px-6 lg:px-0">
              <CategoryChip category={null} active={active === "all"} onSelect={() => setActive("all")} />
              {STRIP_ORDER.map((slug) => <CategoryChip key={slug} category={categoryBySlug(slug)!} active={active === slug} onSelect={() => setActive(slug)} />)}
            </div>
            <span aria-hidden className={cn("pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent transition-opacity", edge.r ? "opacity-100" : "opacity-0")} />
            <span aria-hidden className={cn("pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent transition-opacity", edge.l ? "opacity-100" : "opacity-0")} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="pop-h" className="bg-white py-10 sm:py-14">
        <Container>
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand">{cat ? t(cat.name) : t("Popular right now", "हाल लोकप्रिय")}</p>
              <h2 id="pop-h" className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{cat ? `${t(cat.name)} ${t("services", "सेवाहरू")}` : t("Popular services to start with", "सुरु गर्न लोकप्रिय सेवा")}</h2>
              <p className="mt-2 text-sm text-muted">{t("Starter picks. Ordering will follow real booking activity once the service is live. Prices are samples.", "सुरुवाती छनोट। सेवा सुरु भएपछि वास्तविक बुकिङका आधारमा क्रम मिल्नेछ। मूल्य नमुना हुन्।")}</p>
            </div>
            <Link href={active === "all" ? "/services" : `/services/${active}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand hover:underline">{active === "all" ? t("View all services", "सबै सेवा हेर्नुहोस्") : t("View all in this category", "यो श्रेणीका सबै हेर्नुहोस्")} →</Link>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {list.length === 0 ? <div className="col-span-full"><EmptyState icon={<SearchX className="h-6 w-6" aria-hidden />} title={t("No services here yet", "यहाँ अहिले सेवा छैन")} action={<ButtonLink href="/services" variant="outline">{t("Browse all", "सबै हेर्नुहोस्")}</ButtonLink>} /></div> : list.map((s, i) => <ServiceCard key={s.slug} service={s} priority={i < 4} />)}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}

export { CATEGORIES };
