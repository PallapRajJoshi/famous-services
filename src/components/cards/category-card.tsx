"use client";
import Link from "next/link";
import { startingPrice, type Category } from "@/data/catalog";
import { CategoryIcon } from "@/components/ui/icons";
import { ServiceScene } from "@/components/art/scenes";
import { useLang } from "@/components/lang-provider";
import { money } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Compact pill-card used in the horizontally scrolling category strip. */
export function CategoryChip({ category, active, onSelect, href }: { category: Category | null; active?: boolean; onSelect?: () => void; href?: string }) {
  const { t, lang } = useLang();
  const slug = category?.slug ?? "all";
  const price = category ? startingPrice(category.slug) : null;
  const label = category ? t(category.name) : t("All Services", "सबै सेवा");
  const sub = category ? (price ? `${t("From", "सुरु")} ${money(price, lang)}` : t("Quote-based", "कोटेसनमा आधारित")) : t("Browse everything", "सबै हेर्नुहोस्");
  const inner = (
    <>
      <span className={cn("grid h-14 w-14 place-items-center rounded-full transition-colors duration-200 sm:h-16 sm:w-16", active ? "bg-brand text-white" : "bg-pale text-brand group-hover:bg-pale-2")}>
        <CategoryIcon slug={slug} className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>
      <span className={cn("mt-2.5 line-clamp-1 text-[13px] sm:text-sm", active ? "font-bold text-brand-deep" : "font-semibold text-ink")}>{label}</span>
      <span className="mt-0.5 line-clamp-1 text-[11px] text-muted">{sub}</span>
      <span aria-hidden className={cn("mt-2 h-[3px] w-8 rounded-full bg-brand transition-all duration-200", active ? "opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-40")} />
    </>
  );
  const cls = "group flex w-[104px] shrink-0 flex-col items-center rounded-2xl px-1 py-2 text-center sm:w-[116px]";
  return href ? (
    <Link href={href} className={cls} aria-current={active ? "true" : undefined}>{inner}</Link>
  ) : (
    <button type="button" onClick={onSelect} aria-pressed={active} className={cls}>{inner}</button>
  );
}

/** Larger illustrated card used on /services. */
export function CategoryTile({ category }: { category: Category }) {
  const { t, lang } = useLang();
  const price = startingPrice(category.slug);
  return (
    <Link href={`/services/${category.slug}`} className="group relative flex overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="w-28 shrink-0 overflow-hidden sm:w-36"><div className="h-full w-full transition-transform duration-500 group-hover:scale-110"><ServiceScene category={category.slug} seed={category.slug} /></div></div>
      <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
        <h3 className="text-base font-bold text-ink">{t(category.name)}</h3>
        <p className="mt-1 line-clamp-2 text-[13px] text-muted">{t(category.tagline)}</p>
        <p className="mt-2 text-xs font-semibold text-brand">{price ? `${t("From", "सुरु")} ${money(price, lang)}` : t("Quote-based", "कोटेसनमा आधारित")} →</p>
      </div>
    </Link>
  );
}
