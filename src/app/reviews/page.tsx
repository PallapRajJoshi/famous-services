import type { Metadata } from "next";
import { PageHero } from "@/components/ui/section";
import { Crumbs } from "@/components/ui/crumbs";
import { ReviewsView } from "@/components/content/reviews-view";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Reviews", "समीक्षा")} — Famous Services`, description: t("Demo reviews. Real reviews appear after completed bookings.", "डेमो समीक्षा। सम्पन्न बुकिङपछि वास्तविक समीक्षा देखिन्छ।") };
}
export default async function Page() {
  const { t } = await getT();
  return (<><PageHero crumbs={<Crumbs items={[{ label: t("Home", "गृहपृष्ठ"), href: "/" }, { label: t("Reviews", "समीक्षा") }]} />} eyebrow={t("Reviews", "समीक्षा")} title={t("What customers say", "ग्राहकले के भन्छन्")} body={t("Honest feedback after real jobs — once there are real jobs. Until then these are clearly labelled samples.", "वास्तविक काम पछि इमानदार प्रतिक्रिया — वास्तविक काम भएपछि। तबसम्म यी स्पष्ट रूपमा चिनो लगाइएका नमुना हुन्।")} /><ReviewsView /></>);
}
