"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { NamedIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/states";
import { Avatar } from "@/components/cards/pro-card";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { cn } from "@/lib/cn";
import { ACCOUNT_SECTIONS } from "./nav";
import { SectionView } from "./sections";

export function AccountShell({ section }: { section: string }) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHydrated();
  const user = useApp((s) => s.user);
  const logout = useApp((s) => s.logout);
  const toast = useApp((s) => s.toast);
  const unread = useApp((s) => s.notifications.filter((n) => !n.read).length);
  React.useEffect(() => { if (hydrated && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`); }, [hydrated, user, router, pathname]);

  if (!hydrated || !user) return <Container className="py-10"><div className="grid gap-6 lg:grid-cols-[260px_1fr]"><Skeleton className="hidden h-96 lg:block" /><div className="space-y-4"><Skeleton className="h-14 w-64" /><Skeleton className="h-48" /><Skeleton className="h-48" /></div></div></Container>;

  const cur = ACCOUNT_SECTIONS.find((s) => s.slug === section) ?? ACCOUNT_SECTIONS[0];
  const href = (slug: string) => (slug === "track" ? "/track" : slug ? `/account/${slug}` : "/account");
  return (
    <div className="bg-pale/50">
      <Container className="py-6 sm:py-9">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("My account", "मेरो खाता"), href: cur.slug ? "/account" : undefined }, ...(cur.slug ? [{ label: t(cur.label) }] : [])]} />
        <div className="grid items-start gap-6 lg:grid-cols-[264px_1fr]">
          {/* DashboardSidebar (desktop) */}
          <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label={t("Account navigation", "खाता नेभिगेसन")}>
            <div className="rounded-2xl border border-line bg-white p-3 shadow-card">
              <div className="flex items-center gap-3 p-3"><Avatar name={user.name} hue={215} size={44} /><div className="min-w-0"><p className="truncate font-bold text-ink">{user.name}</p><p className="truncate text-xs text-muted">{user.phone}</p></div></div>
              <nav className="mt-1 space-y-0.5 border-t border-line pt-2">
                {ACCOUNT_SECTIONS.map((s) => {
                  const on = s.slug === cur.slug;
                  return (
                    <Link key={s.slug} href={href(s.slug)} aria-current={on ? "page" : undefined} className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors", on ? "bg-pale text-brand-deep" : "text-ink hover:bg-pale/70")}>
                      <NamedIcon name={s.icon} className={cn("h-[18px] w-[18px]", on ? "text-brand" : "text-muted")} />{t(s.label)}
                      {s.slug === "notifications" && unread > 0 && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-amber px-1.5 text-[11px] font-bold text-ink">{unread}</span>}
                    </Link>
                  );
                })}
              </nav>
              <button type="button" onClick={() => { logout(); toast(t("Logged out", "लगआउट भयो"), "info"); router.push("/"); }} className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-xl border-t border-line px-3 pt-2 text-sm font-semibold text-muted transition-colors hover:text-danger"><LogOut className="h-[18px] w-[18px]" aria-hidden />{t("Log out", "लगआउट")}</button>
            </div>
          </aside>

          <div className="min-w-0">
            {/* Mobile section tabs */}
            <nav className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden" aria-label={t("Account sections", "खाताका खण्ड")}>
              {ACCOUNT_SECTIONS.map((s) => {
                const on = s.slug === cur.slug;
                return <Link key={s.slug} href={href(s.slug)} aria-current={on ? "page" : undefined} className={cn("inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold transition-colors", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink")}><NamedIcon name={s.icon} className="h-4 w-4" />{t(s.label)}</Link>;
              })}
            </nav>
            <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{cur.slug ? t(cur.label) : `${t("Hello", "नमस्ते")}, ${user.name.split(" ")[0]}`}</h1>
            <SectionView section={cur.slug} />
          </div>
        </div>
      </Container>
    </div>
  );
}
