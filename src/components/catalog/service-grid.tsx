"use client";
import type { Service } from "@/data/catalog";
import { ServiceCard } from "@/components/cards/service-card";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/cn";

/** Consistent responsive grid of ServiceCards. `cols` controls the widest layout. */
export function ServiceGrid({ services, cols = 4, className }: { services: Service[]; cols?: 3 | 4; className?: string }) {
  return (
    <Stagger key={services.map((s) => s.slug).join(",")} step={0.03} className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5", cols === 3 ? "md:grid-cols-3" : "md:grid-cols-3 xl:grid-cols-4", className)}>
      {services.map((s, i) => <StaggerItem key={s.slug} className="h-full"><ServiceCard service={s} priority={i < 4} /></StaggerItem>)}
    </Stagger>
  );
}
