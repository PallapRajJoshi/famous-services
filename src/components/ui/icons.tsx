import * as L from "lucide-react";
import type { CategorySlug } from "@/data/catalog";

type Ic = React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;

export const CATEGORY_ICONS: Record<CategorySlug | "all", Ic> = {
  all: L.LayoutGrid,
  plumbing: L.Droplets,
  electrical: L.Zap,
  carpentry: L.Hammer,
  painting: L.PaintRoller,
  "appliance-repair": L.WashingMachine,
  waterproofing: L.Umbrella,
  handyman: L.Wrench,
  cleaning: L.SprayCan,
  "pest-control": L.Bug,
  movers: L.Truck,
  "home-setup": L.Tv,
  beauty: L.Flower2,
  drivers: L.Car,
  "home-organization": L.Package,
  "office-business": L.Building2,
};

export function CategoryIcon({ slug, className, strokeWidth = 1.8 }: { slug: CategorySlug | "all"; className?: string; strokeWidth?: number }) {
  const I = CATEGORY_ICONS[slug] ?? L.LayoutGrid;
  return <I className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/** Look up any lucide icon by name (used by data-driven lists). */
export function NamedIcon({ name, className }: { name: string; className?: string }) {
  const I = (L as unknown as Record<string, Ic>)[name] ?? L.Circle;
  return <I className={className} aria-hidden />;
}
