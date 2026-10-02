import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { PackageCard } from "@/components/cards/package-card";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { FaqSection } from "@/components/home/sections";
import { PACKAGES } from "@/data/content";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Packages", "प्याकेज")} — Famous Services`, description: t("Bundled home-care packages: deep cleaning, moving, festival prep, monsoon protection and new-home setup.", "बन्डल घर हेरचाह प्याकेज: डिप क्लिनिङ, सार्ने, चाडपर्व तयारी, वर्षा सुरक्षा र नयाँ घर सेटअप।") };
}

export default async function Page() {
  const { t } = await getT();
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Packages", "प्याकेज") }]} />} eyebrow={t("Packages", "प्याकेज")} title={t("Bundle the jobs, save the hassle", "काम एकै प्याकेजमा, झन्झट कम")} body={t("Ready-made bundles for the moments that need several services at once. All package prices are samples for this prototype.", "एकै पटक धेरै सेवा चाहिने क्षणका लागि तयार प्याकेज। सबै प्याकेज मूल्य यस प्रोटोटाइपका नमुना हुन्।")} />
      <Section className="!pt-10"><Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{PACKAGES.map((p) => <StaggerItem key={p.slug} className="h-full"><PackageCard pack={p} /></StaggerItem>)}</Stagger></Section>
      <FaqSection faqs={[
        { q: { en: "Can I customise a package?", ne: "के प्याकेज आफ्नो अनुसार बनाउन सकिन्छ?" }, a: { en: "Yes. Tell the team what to add or remove when you send the request.", ne: "सकिन्छ। अनुरोध पठाउँदा के थप्ने वा हटाउने टोलीलाई बताउनुहोस्।" } },
        { q: { en: "Are package prices fixed?", ne: "के प्याकेज मूल्य निश्चित छ?" }, a: { en: "Prices shown are samples. The business confirms the final price with you before scheduling.", ne: "देखाइएको मूल्य नमुना हो। तालिका बनाउनु अघि व्यवसायले अन्तिम मूल्य पुष्टि गर्छ।" } },
      ]} />
    </>
  );
}
