import type { Metadata } from "next";
import { RentalsHub } from "@/components/rentals/rentals-hub";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("Rentals & Property", "भाडा तथा सम्पत्ति")} — Famous Services`, description: t("Rooms for rent, land for sale and property for sale in Kathmandu Valley — demo listings.", "काठमाडौँ उपत्यकामा भाडामा कोठा, बिक्रीमा जग्गा र सम्पत्ति — डेमो सूची।") };
}
export default function Page() { return <RentalsHub />; }
