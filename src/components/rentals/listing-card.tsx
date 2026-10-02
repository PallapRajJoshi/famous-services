"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { furnishing, landType, listingTitle, propType, roomType, type Listing } from "@/data/rentals";
import { ServiceScene } from "@/components/art/scenes";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { useApp, useHydrated } from "@/store/app-store";
import { ListingPrice, useFacts, useListingText } from "./parts";
import { cn } from "@/lib/cn";
import { imageKey } from "@/config/images";

export function typeBadgeText(l: Listing) {
  return l.kind === "rooms" ? roomType(l.roomType!).short : l.kind === "land" ? landType(l.landType!).name : propType(l.propType!).name;
}

export function SaveListing({ id, className }: { id: string; className?: string }) {
  const { t } = useListingText();
  const saved = useApp((s) => s.savedListings.includes(id));
  const toggle = useApp((s) => s.toggleSavedListing);
  const toast = useApp((s) => s.toast);
  const hydrated = useHydrated();
  const on = hydrated && saved;
  return (
    <button type="button" aria-pressed={on} aria-label={on ? t("Remove from saved", "सुरक्षित सूचीबाट हटाउनुहोस्") : t("Save listing", "सूची सुरक्षित गर्नुहोस्")}
      onClick={() => { toggle(id); toast(on ? t("Removed from saved", "सुरक्षित सूचीबाट हटाइयो") : t("Saved to your account (demo)", "तपाईंको खातामा सुरक्षित (डेमो)"), "info"); }}
      className={cn("grid h-10 w-10 place-items-center rounded-full bg-white/95 text-brand shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white", className)}>
      <Heart className={cn("h-[18px] w-[18px] transition", on && "fill-danger text-danger")} aria-hidden />
    </button>
  );
}

export function ListingCard({ listing: l, priority }: { listing: Listing; priority?: boolean }) {
  const { t, where } = useListingText();
  const facts = useFacts(l);
  const title = t(listingTitle(l));
  void priority;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-pale">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"><ServiceScene category={l.scene} seed={l.id} photo={imageKey.listing(l.id)} /></div>
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          <Badge tone="brand">{t(typeBadgeText(l))}</Badge>
          {l.kind === "rooms" && <Badge tone={l.furnishing === "furnished" ? "success" : "outline"}>{t(furnishing(l.furnishing!).name)}</Badge>}
        </div>
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-brand-deep/90 px-2.5 py-1 text-[11px] font-bold text-white">{t("Demo listing", "डेमो सूची")}</span>
        <SaveListing id={l.id} className="absolute right-2 top-2 z-10" />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand/80">{where(l)}</p>
        <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink sm:text-base">
          <Link href={`/rentals/${l.kind}/${l.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4">{title}</Link>
        </h3>
        <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 text-[13px] text-muted">
          {facts.map(({ icon: I, text }) => <li key={text} className="inline-flex items-center gap-1.5"><I className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />{text}</li>)}
        </ul>
        <div className="mt-auto pt-3.5">
          <ListingPrice l={l} />
          <ButtonLink href={`/rentals/${l.kind}/${l.id}`} variant="outline" size="sm" className="relative z-10 mt-3 w-full" tabIndex={-1} aria-hidden>{t("View details", "विवरण हेर्नुहोस्")}</ButtonLink>
        </div>
      </div>
    </article>
  );
}
