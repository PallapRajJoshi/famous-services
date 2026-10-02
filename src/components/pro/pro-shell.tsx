"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck, Wallet, ClipboardCheck, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { NamedIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/states";
import { Avatar } from "@/components/cards/pro-card";
import { OtpLogin } from "@/components/auth/otp-login";
import { useLang } from "@/components/lang-provider";
import { useApp, useHydrated } from "@/store/app-store";
import { PRO_PERSONA } from "@/data/pro";
import { cn } from "@/lib/cn";
import { PRO_SECTIONS } from "./nav";
import { ProSectionView } from "./pro-sections";

function ProGate() {
  const { t } = useLang();
  return (
    <div className="bg-pale/60 py-10 sm:py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t("Professional portal (demo)", "प्रोफेसनल पोर्टल (डेमो)")}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">{t("Manage your jobs in one place", "आफ्ना काम एकै ठाउँमा व्यवस्थापन गर्नुहोस्")}</h1>
          <p className="mt-3 max-w-md text-base text-muted">{t("See job requests, accept the ones that suit you, check your schedule and follow your verification. Everything here uses sample data.", "काम अनुरोध हेर्नुहोस्, उपयुक्त काम स्वीकार गर्नुहोस्, तालिका र प्रमाणीकरण हेर्नुहोस्। यहाँ सबै नमुना डेटा हो।")}</p>
          <ul className="mt-6 space-y-3">{[[ClipboardCheck, t("Accept or reject job requests", "काम अनुरोध स्वीकार वा अस्वीकार")], [Wallet, t("See sample earnings screens", "नमुना आम्दानी स्क्रिन हेर्नुहोस्")], [BadgeCheck, t("Follow your verification steps", "प्रमाणीकरण चरण हेर्नुहोस्")]].map(([I, l], i) => { const Ic = I as typeof ShieldCheck; return <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-ink"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand shadow-sm"><Ic className="h-5 w-5" aria-hidden /></span>{l as string}</li>; })}</ul>
          <p className="mt-6 text-sm text-muted">{t("Not a professional yet?", "प्रोफेसनल बनिसक्नुभएको छैन?")} <Link href="/become-a-professional" className="font-bold text-brand hover:underline">{t("Apply to join", "जोडिन आवेदन दिनुहोस्")}</Link></p>
        </div>
        <div className="mx-auto w-full max-w-md"><OtpLogin mode="pro" asH2 title={t("Professional login", "प्रोफेसनल लगइन")} subtitle={t("Use your registered mobile number.", "दर्ता गरेको मोबाइल नम्बर प्रयोग गर्नुहोस्।")} /></div>
      </Container>
    </div>
  );
}

export function ProShell({ section }: { section: string }) {
  const { t } = useLang();
  const router = useRouter();
  const hydrated = useHydrated();
  const authed = useApp((s) => s.proAuthed);
  const logout = useApp((s) => s.proLogout);
  const online = useApp((s) => s.proOnline);
  const setOnline = useApp((s) => s.setProOnline);
  const toast = useApp((s) => s.toast);

  if (!hydrated) return <Container className="py-10"><div className="grid gap-6 lg:grid-cols-[264px_1fr]"><Skeleton className="hidden h-96 lg:block" /><Skeleton className="h-96" /></div></Container>;
  if (!authed) return <ProGate />;
  const cur = PRO_SECTIONS.find((s) => s.slug === section) ?? PRO_SECTIONS[0];
  const href = (slug: string) => (slug ? `/pro/${slug}` : "/pro");
  return (
    <div className="bg-pale/50">
      <Container className="py-6 sm:py-9">
        <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Professional portal", "प्रोफेसनल पोर्टल"), href: cur.slug ? "/pro" : undefined }, ...(cur.slug ? [{ label: t(cur.label) }] : [])]} />
        <div className="grid items-start gap-6 lg:grid-cols-[264px_1fr]">
          <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label={t("Portal navigation", "पोर्टल नेभिगेसन")}>
            <div className="rounded-2xl border border-line bg-white p-3 shadow-card">
              <div className="flex items-center gap-3 p-3"><Avatar name={PRO_PERSONA.name} hue={PRO_PERSONA.hue} size={44} /><div className="min-w-0"><p className="truncate font-bold text-ink">{PRO_PERSONA.name}</p><p className="truncate text-xs text-muted">{t(PRO_PERSONA.role)}</p></div></div>
              <nav className="mt-1 space-y-0.5 border-t border-line pt-2">
                {PRO_SECTIONS.map((s) => { const on = s.slug === cur.slug; return <Link key={s.slug} href={href(s.slug)} aria-current={on ? "page" : undefined} className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors", on ? "bg-pale text-brand-deep" : "text-ink hover:bg-pale/70")}><NamedIcon name={s.icon} className={cn("h-[18px] w-[18px]", on ? "text-brand" : "text-muted")} />{t(s.label)}</Link>; })}
              </nav>
              <button type="button" onClick={() => { logout(); toast(t("Logged out", "लगआउट भयो"), "info"); router.push("/pro"); }} className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-xl border-t border-line px-3 pt-2 text-sm font-semibold text-muted transition-colors hover:text-danger"><LogOut className="h-[18px] w-[18px]" aria-hidden />{t("Log out", "लगआउट")}</button>
            </div>
          </aside>
          <div className="min-w-0">
            <nav className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden" aria-label={t("Portal sections", "पोर्टलका खण्ड")}>
              {PRO_SECTIONS.map((s) => { const on = s.slug === cur.slug; return <Link key={s.slug} href={href(s.slug)} aria-current={on ? "page" : undefined} className={cn("inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold", on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink")}><NamedIcon name={s.icon} className="h-4 w-4" />{t(s.label)}</Link>; })}
            </nav>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-brand-deep sm:text-3xl">{t(cur.label)}</h1>
              <label className={cn("inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border px-4 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand", online ? "border-success/40 bg-success-50 text-success" : "border-line bg-white text-muted")}>
                <input type="checkbox" role="switch" className="sr-only" checked={online} onChange={(e) => { setOnline(e.target.checked); toast(e.target.checked ? t("You are online (demo)", "तपाईं अनलाइन हुनुहुन्छ (डेमो)") : t("You are offline (demo)", "तपाईं अफलाइन हुनुहुन्छ (डेमो)"), "info"); }} />
                <span aria-hidden className={cn("h-2.5 w-2.5 rounded-full", online ? "bg-success" : "bg-muted")} />{online ? t("Online — accepting jobs", "अनलाइन — काम स्वीकार्दै") : t("Offline", "अफलाइन")}
              </label>
            </div>
            <ProSectionView section={cur.slug} />
          </div>
        </div>
      </Container>
    </div>
  );
}
