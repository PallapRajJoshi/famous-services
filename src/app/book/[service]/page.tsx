import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceBySlug } from "@/data/catalog";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ service: string }>; searchParams: Promise<{ qty?: string; coupon?: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { service } = await params;
  const s = serviceBySlug(service);
  const { t } = await getT();
  return { title: s ? `${t("Book", "बुक")} ${t(s.name)} — Famous Services` : "Book", robots: { index: false } };
}

export default async function BookPage({ params, searchParams }: P) {
  const { service } = await params;
  const sp = await searchParams;
  const s = serviceBySlug(service);
  if (!s) notFound();
  const qty = Number(sp.qty);
  return <BookingFlow service={s} initialQty={Number.isFinite(qty) && qty > 0 ? qty : undefined} initialCoupon={typeof sp.coupon === "string" ? sp.coupon : undefined} />;
}
