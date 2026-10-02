"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, KeyRound, LandPlot, LayoutGrid, PlusCircle, Info } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

/** One section, four tabs: the same bar sits on the hub, the three listing pages and every detail page. */
export function RentalNav({ className }: { className?: string }) {
  const { t } = useLang();
  const path = usePathname();
  const tabs = [
    { href: "/rentals", label: t("Overview", "सारांश"), icon: LayoutGrid, on: path === "/rentals" },
    { href: "/rentals/rooms", label: t("Rooms for rent", "भाडामा कोठा"), icon: KeyRound, on: path.startsWith("/rentals/rooms") },
    { href: "/rentals/land", label: t("Land for sale", "बिक्रीमा जग्गा"), icon: LandPlot, on: path.startsWith("/rentals/land") },
    { href: "/rentals/property", label: t("Property for sale", "बिक्रीमा सम्पत्ति"), icon: Building2, on: path.startsWith("/rentals/property") },
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
      <nav aria-label={t("Rentals and property", "भाडा तथा सम्पत्ति")} className="no-scrollbar -mx-4 max-w-[100vw] overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-1.5 rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-line">
          {tabs.map(({ href, label, icon: I, on }) => (
            <li key={href}>
              <Link href={href} aria-current={on ? "page" : undefined} className={cn("inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm font-bold transition-colors", on ? "bg-brand text-white shadow-sm" : "text-ink hover:bg-pale")}>
                <I className="h-[18px] w-[18px]" aria-hidden />{label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/rentals/list" className="inline-flex h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-brand hover:underline"><PlusCircle className="h-[18px] w-[18px]" aria-hidden />{t("List your property", "आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्")}</Link>
    </div>
  );
}

export function DemoNote({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <p className={cn("flex items-start gap-2.5 rounded-xl border border-amber/40 bg-amber-50 px-4 py-3 text-sm text-warn", className)}>
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span><strong>{t("These are demo listings.", "यी डेमो सूची हुन्।")}</strong> {t("Locations, prices and details are samples to show how this section works — they are not real properties.", "ठाउँ, मूल्य र विवरण यो खण्ड कसरी काम गर्छ देखाउने नमुना हुन् — वास्तविक सम्पत्ति होइनन्।")}</span>
    </p>
  );
}
