"use client";
import * as React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/section";
import { STRIP_ORDER, categoryBySlug } from "@/data/catalog";
import { DISTRICTS, SITE, DEMO_NOTICE } from "@/data/content";
import { useLang } from "@/components/lang-provider";
import { LangToggle } from "./lang-toggle";
import { CallButton, WhatsAppButton } from "./contact-actions";

function Social({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  const cls = "grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20";
  const svg = <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>{svg}</a> : <span role="img" aria-label={`${label} (not set up yet)`} title={`${label} — not set up yet`} className={`${cls} opacity-45`}>{svg}</span>;
}

const SOCIAL = [
  { key: "facebook", label: "Facebook", icon: <path d="M14 21v-8h2.6l.4-3H14V8.3c0-.9.3-1.5 1.6-1.5H17V4.1C16.7 4.1 15.800 4 14.800 4 12.600 4 11 5.300 11 7.800V10H8.500v3H11v8z" /> },
  { key: "instagram", label: "Instagram", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" /></> },
  { key: "tiktok", label: "TikTok", icon: <path d="M15.500 3v10.200a4.300 4.300 0 1 1-4.300-4.300M15.500 3c.4 2.400 2 3.900 4.500 4.100" /> },
  { key: "youtube", label: "YouTube", icon: <><rect x="2.500" y="5" width="19" height="14" rx="4" /><path d="M10 9.500v5l4.500-2.500z" fill="currentColor" /></> },
] as const;

export function Footer() {
  const { t } = useLang();
  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    { title: t("Services", "सेवाहरू"), links: [...STRIP_ORDER.slice(0, 8).map((s) => ({ href: `/services/${s}`, label: t(categoryBySlug(s)!.name) })), { href: "/services", label: t("All services", "सबै सेवा") }] },
    { title: t("Rentals & Property", "भाडा तथा सम्पत्ति"), links: [{ href: "/rentals/rooms", label: t("Rooms for rent", "भाडामा कोठा") }, { href: "/rentals/land", label: t("Land for sale", "बिक्रीमा जग्गा") }, { href: "/rentals/property", label: t("Property for sale", "बिक्रीमा सम्पत्ति") }, { href: "/rentals/list", label: t("List your property", "आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्") }] },
    { title: t("Company", "कम्पनी"), links: [{ href: "/about", label: t("About us", "हाम्रोबारे") }, { href: "/how-it-works", label: t("How it works", "कसरी काम गर्छ") }, { href: "/packages", label: t("Packages", "प्याकेज") }, { href: "/offers", label: t("Offers", "अफर") }, { href: "/reviews", label: t("Reviews", "समीक्षा") }, { href: "/guides", label: t("Guides", "मार्गदर्शन") }] },
    { title: t("Areas", "क्षेत्र"), links: [...DISTRICTS.map((d) => ({ href: `/areas/${d.slug}`, label: t(d.name) })), { href: "/areas", label: t("All areas", "सबै क्षेत्र") }] },
    { title: t("Business", "व्यवसाय"), links: [{ href: "/business", label: t("Business & corporate", "व्यवसाय तथा कर्पोरेट") }, { href: "/business#quote", label: t("Request a business quote", "व्यावसायिक कोटेसन माग्नुहोस्") }, { href: "/services/office-business", label: t("Office services", "कार्यालय सेवा") }] },
    { title: t("Professionals", "प्रोफेसनल"), links: [{ href: "/become-a-professional", label: t("Become a professional", "प्रोफेसनल बन्नुहोस्") }, { href: "/pro", label: t("Professional portal (demo)", "प्रोफेसनल पोर्टल (डेमो)") }, { href: "/become-a-professional#verification", label: t("Verification process", "प्रमाणीकरण प्रक्रिया") }] },
    { title: t("Help", "सहायता"), links: [{ href: "/help", label: t("Help center", "सहायता केन्द्र") }, { href: "/track", label: t("Track booking", "बुकिङ ट्र्याक") }, { href: "/contact", label: t("Contact us", "सम्पर्क") }, { href: "/account/support", label: t("Support tickets", "सहयोग टिकट") }] },
    { title: t("Legal (drafts)", "कानुनी (मस्यौदा)"), links: [{ href: "/legal/terms", label: t("Terms of use", "प्रयोगका सर्त") }, { href: "/legal/service-terms", label: t("Service booking terms", "सेवा बुकिङ सर्त") }, { href: "/legal/rental-terms", label: t("Room rental terms", "कोठा भाडा सर्त") }, { href: "/legal/property-terms", label: t("Land & property terms", "जग्गा तथा सम्पत्ति सर्त") }, { href: "/legal/privacy", label: t("Privacy policy", "गोपनीयता नीति") }, { href: "/legal/cancellation", label: t("Cancellation & refunds", "रद्द तथा फिर्ता") }, { href: "/legal/guarantee", label: t("Service guarantee", "सेवा ग्यारेन्टी") }, { href: "/legal", label: t("All terms & policies", "सबै सर्त तथा नीति") }] },
  ];
  return (
    <footer className="mt-auto bg-brand-deep text-white" data-dark>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_3fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{t(SITE.tagline)} {t("Trusted home and professional services for Kathmandu, Lalitpur and Bhaktapur.", "काठमाडौं, ललितपुर र भक्तपुरका लागि भरपर्दो घरेलु तथा व्यावसायिक सेवा।")}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              <li className="flex items-start gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{SITE.email}</li>
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{t(SITE.address)}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2"><CallButton variant="outlineLight" size="sm" /><WhatsAppButton variant="outlineLight" size="sm" /></div>
            <div className="mt-5 flex gap-2.5">{SOCIAL.map((s) => <Social key={s.key} label={s.label} href={SITE.social[s.key]}>{s.icon}</Social>)}</div>
          </div>
          <nav aria-label={t("Footer", "फुटर")} className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber">{c.title}</h2>
                <ul className="mt-3.5 space-y-2">
                  {c.links.map((l) => <li key={l.href + l.label}><Link href={l.href} className="inline-block py-0.5 text-sm text-white/75 transition hover:text-white hover:underline">{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} {SITE.name}. {t("Frontend prototype.", "फ्रन्टएन्ड प्रोटोटाइप।")}</p>
            <p className="mt-1 max-w-xl">{t(DEMO_NOTICE)}</p>
          </div>
          <LangToggle dark />
        </div>
      </Container>
    </footer>
  );
}
