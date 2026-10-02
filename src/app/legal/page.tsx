import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Container, PageHero } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Badge } from "@/components/ui/badge";
import { NamedIcon } from "@/components/ui/icons";
import { DRAFT_VERSION, LEGAL_DOCS, confirmCount } from "@/data/legal";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Terms & policies (draft)", "सर्त तथा नीति (मस्यौदा)")} — Famous Services`, robots: { index: false } };
}

const GROUPS: { h: { en: string; ne: string }; slugs: string[] }[] = [
  { h: { en: "For everyone", ne: "सबैका लागि" }, slugs: ["terms", "privacy"] },
  { h: { en: "Home services", ne: "घरेलु सेवा" }, slugs: ["service-terms", "cancellation", "guarantee"] },
  { h: { en: "Rooms, land & property", ne: "कोठा, जग्गा तथा सम्पत्ति" }, slugs: ["rental-terms", "property-terms", "owner-terms"] },
  { h: { en: "For professionals", ne: "प्रोफेसनलका लागि" }, slugs: ["pro-terms"] },
];

export default async function Page() {
  const { t } = await getT();
  return (
    <>
      <PageHero
        crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Terms & policies", "सर्त तथा नीति") }]} />}
        eyebrow={t("Legal", "कानुनी")}
        title={t("Terms & policies", "सर्त तथा नीति")}
        body={t("The rules for booking home services, renting rooms, and buying land or property through Famous Services — one document for each part of the business.", "फेमस सर्भिसेजमार्फत घरेलु सेवा बुक गर्न, कोठा भाडामा लिन, र जग्गा वा सम्पत्ति किन्न नियमहरू — व्यवसायको प्रत्येक भागका लागि एक कागजात।")}
      />
      <Container className="py-10 sm:py-14">
        <div role="note" className="mb-8 flex gap-3 rounded-xl border border-amber/50 bg-amber-50 p-4 text-sm text-ink">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden />
          <p><strong>{t("Drafts, not in force.", "मस्यौदा, लागू छैन।")}</strong> {t(`${DRAFT_VERSION}. These are first drafts for the business to complete (items in [brackets]) and for a qualified Nepali lawyer to review before launch. They are not legal advice.`, `${DRAFT_VERSION}। यी व्यवसायले पूरा गर्ने (कोष्ठकभित्रका विषय) र सुरु हुनुअघि योग्य नेपाली कानुन व्यवसायीले समीक्षा गर्ने पहिलो मस्यौदा हुन्। यी कानुनी सल्लाह होइनन्।`)}</p>
        </div>
        <div className="space-y-10">
          {GROUPS.map((g) => (
            <section key={g.h.en} aria-labelledby={`g-${g.slugs[0]}`}>
              <h2 id={`g-${g.slugs[0]}`} className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t(g.h.en, g.h.ne)}</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.slugs.map((s) => {
                  const d = LEGAL_DOCS.find((x) => x.slug === s)!;
                  const n = confirmCount(d);
                  return (
                    <li key={s}>
                      <Link href={`/legal/${d.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-pale-2 text-brand"><NamedIcon name={d.icon} className="h-5 w-5" /></span>
                        <h3 className="mt-3.5 text-lg font-extrabold text-brand-deep">{t(d.title)}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(d.short)}</p>
                        <p className="mt-3 text-xs text-muted"><span className="font-semibold text-ink">{t("Applies to: ", "लागू: ")}</span>{t(d.who)}</p>
                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                          <Badge tone="amber">{t("Draft v0.1", "मस्यौदा v0.1")}</Badge>
                          {n > 0 && <Badge tone="outline">{t(`${n} to confirm`, `${n} पुष्टि गर्न बाँकी`)}</Badge>}
                          <span className="ml-auto inline-flex items-center gap-1 text-sm font-bold text-brand group-hover:gap-1.5">{t("Read", "पढ्नुहोस्")}<ArrowRight className="h-4 w-4" aria-hidden /></span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
