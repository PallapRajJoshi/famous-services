import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceBySlug } from "@/data/catalog";
import { ServiceDetail } from "@/components/catalog/service-detail";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ category: string; service: string }>; searchParams: Promise<{ coupon?: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { service } = await params;
  const s = serviceBySlug(service);
  if (!s) return {};
  const { t } = await getT();
  return { title: `${t(s.name)} — Famous Services`, description: t(s.short) };
}

export default async function ServicePage({ params, searchParams }: P) {
  const { category, service } = await params;
  const { coupon } = await searchParams;
  const s = serviceBySlug(service);
  if (!s || s.category !== category) notFound();
  return <ServiceDetail service={s} coupon={typeof coupon === "string" ? coupon : undefined} />;
}
