"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, CalendarCheck, User } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export function MobileBottomNav() {
  const { t } = useLang();
  const pathname = usePathname();
  const items = [
    { href: "/", label: t("Home", "गृहपृष्ठ"), icon: Home, match: (p: string) => p === "/" },
    { href: "/services", label: t("Categories", "श्रेणी"), icon: LayoutGrid, match: (p: string) => p.startsWith("/services") },
    { href: "/account/bookings", label: t("Bookings", "बुकिङ"), icon: CalendarCheck, match: (p: string) => p.startsWith("/account/bookings") || p.startsWith("/track") },
    { href: "/account", label: t("Account", "खाता"), icon: User, match: (p: string) => p === "/account" || (p.startsWith("/account/") && !p.startsWith("/account/bookings")) || p.startsWith("/login") },
  ];
  return (
    <nav aria-label={t("Bottom navigation", "तलको नेभिगेसन")} className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 shadow-bar backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((it) => {
          const active = it.match(pathname);
          const Icon = it.icon;
          return (
            <li key={it.href}>
              <Link href={it.href} aria-current={active ? "page" : undefined} className={cn("relative flex min-h-[58px] flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors", active ? "text-brand" : "text-muted")}>
                {active && <span aria-hidden className="absolute top-0 h-[3px] w-8 rounded-b-full bg-brand" />}
                <Icon className={cn("h-[22px] w-[22px] transition-transform", active && "scale-110")} strokeWidth={active ? 2.3 : 1.9} aria-hidden />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
