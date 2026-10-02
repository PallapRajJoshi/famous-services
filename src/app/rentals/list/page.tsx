import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { ListForm } from "@/components/rentals/list-form";
import { RentalNav } from "@/components/rentals/rental-nav";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("List your property", "आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्")} — Famous Services` };
}
export default async function Page() {
  const { t } = await getT();
  return (
    <>
      <PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Rentals & Property", "भाडा तथा सम्पत्ति"), href: "/rentals" }, { label: t("List your property", "आफ्नो सम्पत्ति सूचीकृत गर्नुहोस्") }]} />}
        eyebrow={t("For owners", "घरधनीका लागि")} title={t("List your room, land or property", "आफ्नो कोठा, जग्गा वा सम्पत्ति सूचीकृत गर्नुहोस्")}
        body={t("Tell us what you have. In the live service the team checks the details with you before anything is published.", "तपाईंसँग के छ बताउनुहोस्। वास्तविक सेवामा केही प्रकाशित गर्नु अघि टोलीले तपाईंसँग विवरण जाँच्छ।")}>
        <RentalNav className="mt-6" />
      </PageHero>
      <Section className="!pt-10"><div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8"><ListForm /></div></Section>
    </>
  );
}
