import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, categoryBySlug } from "@/data/catalog";
import { CategoryView } from "@/components/catalog/category-view";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ category: string }>; searchParams: Promise<{ coupon?: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) return {};
  const { t } = await getT();
  return { title: `${t(c.name)} — Famous Services`, description: t(c.description) };
}

export default async function CategoryPage({ params, searchParams }: P) {
  const { category } = await params;
  const { coupon } = await searchParams;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) notFound();
  return <CategoryView slug={c.slug} coupon={typeof coupon === "string" ? coupon : undefined} />;
}
