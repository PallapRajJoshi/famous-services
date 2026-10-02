"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut, User } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { useUi } from "@/store/ui-store";
import { LangToggle } from "./lang-toggle";
import { CallButton, WhatsAppButton } from "./contact-actions";
import { MENU_LINKS } from "./nav-data";
import { cn } from "@/lib/cn";

export function MobileMenu() {
  const { t } = useLang();
  const open = useUi((s) => s.menuOpen);
  const setOpen = useUi((s) => s.setMenu);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const user = useApp((s) => s.user);
  const logout = useApp((s) => s.logout);
  const toast = useApp((s) => s.toast);
  const loggedIn = hydrated && !!user;
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onClose={close} side="right" title={t("Menu", "मेनु")} hideHeader>
      <div className="flex min-h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <Logo />
          <button type="button" onClick={close} aria-label={t("Close menu", "मेनु बन्द गर्नुहोस्")} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-pale"><span aria-hidden className="text-2xl leading-none">×</span></button>
        </div>
        <div className="space-y-2 p-4">
          {loggedIn ? (
            <div className="flex items-center gap-3 rounded-2xl bg-pale p-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white"><User className="h-5 w-5" aria-hidden /></span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink">{user?.name}</p><p className="text-xs text-muted">{user?.phone}</p></div>
              <Link href="/account" onClick={close} className="text-sm font-bold text-brand">{t("Open", "खोल्नुहोस्")}</Link>
            </div>
          ) : (
            <ButtonLink href="/login" onClick={close} variant="outline" className="w-full"><User className="h-[18px] w-[18px]" aria-hidden />{t("Login with phone (demo)", "फोनबाट लगइन (डेमो)")}</ButtonLink>
          )}
          <ButtonLink href="/track" onClick={close} variant="soft" className="w-full">{t("Track Booking", "बुकिङ ट्र्याक")}</ButtonLink>
        </div>
        <nav aria-label={t("Menu links", "मेनु लिङ्क")} className="px-2">
          <ul>
            {MENU_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} aria-current={pathname === l.href ? "page" : undefined} className={cn("flex min-h-[52px] items-center justify-between rounded-xl px-3 text-[15px] font-semibold transition-colors hover:bg-pale", pathname === l.href ? "text-brand" : "text-ink")}>{t(l.label)}<ChevronRight className="h-4 w-4 text-muted" aria-hidden /></Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-3 border-t border-line p-4">
          <div className="flex items-center justify-between"><span className="text-sm font-semibold text-ink">{t("Language", "भाषा")}</span><LangToggle /></div>
          <div className="grid grid-cols-2 gap-2"><CallButton size="md" /><WhatsAppButton size="md" /></div>
          {loggedIn && <button type="button" onClick={() => { logout(); close(); toast(t("Logged out (demo)", "लगआउट भयो (डेमो)"), "info"); }} className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-muted hover:text-danger"><LogOut className="h-4 w-4" aria-hidden />{t("Log out", "लगआउट")}</button>}
        </div>
      </div>
    </Sheet>
  );
}
