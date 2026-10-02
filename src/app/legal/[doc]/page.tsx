import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Info, Languages } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { NamedIcon } from "@/components/ui/icons";
import { LegalBody } from "@/components/legal/legal-body";
import { LegalToc } from "@/components/legal/legal-toc";
import { DRAFT_VERSION, LEGAL_DOCS, confirmCount, legalDoc } from "@/data/legal";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ doc: string }> };
export function generateStaticParams() { return LEGAL_DOCS.map((d) => ({ doc: d.slug })); }
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const d = legalDoc((await params).doc);
  if (!d) return {};
  const { t } = await getT();
  return { title: `${t(d.title)} (draft) — Famous Services`, description: t(d.short), robots: { index: false } };
}

export default async function Page({ params }: P) {
  const d = legalDoc((await params).doc);
  if (!d) notFound();
  const { t, lang } = await getT();
  const n = confirmCount(d);
  const related = d.related.map(legalDoc).filter((x): x is NonNullable<typeof x> => !!x);
  return (
    <>
      <div className="border-b border-line bg-pale">
        <Container className="py-8 sm:py-12">
          <Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Terms & policies", "सर्त तथा नीति"), href: "/legal" }, { label: t(d.title) }]} />
          <div className="flex items-start gap-4">
            <span className="mt-1 hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-line sm:grid"><NamedIcon name={d.icon} className="h-6 w-6" /></span>
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">{t(d.title)}</h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{t(d.short)}</p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <Badge tone="amber">{t("Draft", "मस्यौदा")}</Badge>
                <Badge tone="outline">{DRAFT_VERSION}</Badge>
                <Badge tone="brand" className="!rounded-xl !py-1.5 !leading-snug">{t("Applies to: ", "लागू: ")}{t(d.who)}</Badge>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8 sm:py-12">
        <div role="note" className="mb-6 flex gap-3 rounded-xl border border-amber/50 bg-amber-50 p-4 text-sm text-ink">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden />
          <div>
            <p><strong>{t("Draft — not legal advice.", "मस्यौदा — कानुनी सल्लाह होइन।")}</strong> {t("This is a first draft written for the business. It is not in force and must be reviewed and finalised by a qualified Nepali lawyer before launch. This prototype is a demo, so nothing here binds anyone yet.", "यो व्यवसायका लागि तयार पारिएको पहिलो मस्यौदा हो। यो लागू छैन र सुरु हुनुअघि योग्य नेपाली कानुन व्यवसायीबाट समीक्षा तथा अन्तिम रूप दिइनुपर्छ। यो प्रोटोटाइप डेमो भएकाले यहाँका कुनै कुरा अहिले कसैलाई बाध्यकारी छैनन्।")}</p>
            {n > 0 && <p className="mt-1.5 text-muted">{t(`${n} item${n === 1 ? "" : "s"} in this document are marked `, `यस कागजातका ${n} वटा विषय `)}<mark className="rounded bg-white px-1 font-medium text-warn ring-1 ring-amber/50">[{t("like this", "यसरी")}]</mark>{t(" — decisions or facts only the business can supply.", " चिह्नित छन् — जुन व्यवसायले मात्र दिन सक्ने निर्णय वा तथ्य हुन्।")}</p>}
          </div>
        </div>

        {lang === "ne" && (
          <div role="note" className="mb-6 flex gap-3 rounded-xl border border-line bg-white p-4 text-sm text-muted">
            <Languages className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
            <p>नेपालीमा शीर्षक, परिचय र मुख्य बुँदा मात्र उपलब्ध छन्। पूर्ण पाठ अहिले अङ्ग्रेजीमा छ र कानुनी समीक्षापछि नेपालीमा अनुवाद गरिनेछ।</p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:order-first"><LegalToc doc={d} t={t} label={t("On this page", "यस पृष्ठमा")} /></aside>
          <article className="min-w-0 max-w-3xl">
            <p className="text-base leading-relaxed text-ink/85">{t(d.intro)}</p>

            <section aria-labelledby="key-h" className="mt-6 rounded-2xl border border-brand/20 bg-pale p-5 sm:p-6">
              <h2 id="key-h" className="flex items-center gap-2 text-base font-extrabold text-brand-deep"><Info className="h-4.5 w-4.5 text-brand" aria-hidden />{t("The short version", "छोटकरीमा")}</h2>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink/90">
                {d.key.map((k, i) => <li key={i} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden /><span>{t(k.en, k.ne)}</span></li>)}
              </ul>
              <p className="mt-3 text-xs text-muted">{t("This summary is a convenience. The full text below is what applies.", "यो सारांश सुविधाका लागि हो। तलको पूर्ण पाठ नै लागू हुन्छ।")}</p>
            </section>

            <div className="mt-10"><LegalBody doc={d} t={t} /></div>

            {related.length > 0 && (
              <section aria-labelledby="rel-h" className="mt-12 border-t border-line pt-8">
                <h2 id="rel-h" className="text-lg font-extrabold text-brand-deep">{t("Related documents", "सम्बन्धित कागजात")}</h2>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug}><Link href={`/legal/${r.slug}`} className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-white p-3 transition-colors hover:border-brand/40 hover:bg-pale"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pale-2 text-brand"><NamedIcon name={r.icon} className="h-4.5 w-4.5" /></span><span className="text-sm font-bold text-ink">{t(r.title)}</span></Link></li>
                  ))}
                </ul>
              </section>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/legal" variant="outline">{t("All terms & policies", "सबै सर्त तथा नीति")}</ButtonLink>
              <ButtonLink href="/contact" variant="soft">{t("Questions? Contact us", "प्रश्न छ? सम्पर्क गर्नुहोस्")}</ButtonLink>
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
