import type { Metadata } from "next";
import { ServicesExplorer } from "@/components/catalog/services-explorer";
import { getT } from "@/lib/lang-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: `${t("All services", "सबै सेवा")} — Famous Services`, description: t("Browse plumbing, electrical, cleaning, appliance repair, pest control, movers and more.", "प्लम्बिङ, इलेक्ट्रिकल, सफाइ, उपकरण मर्मत, कीरा नियन्त्रण, मुभर्स र थप।") };
}

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ q?: string; coupon?: string }> }) {
  const sp = await searchParams;
  return <ServicesExplorer initialQ={typeof sp.q === "string" ? sp.q : ""} coupon={typeof sp.coupon === "string" ? sp.coupon : undefined} />;
}
