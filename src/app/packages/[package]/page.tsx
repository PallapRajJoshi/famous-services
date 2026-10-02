import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageView } from "@/components/content/package-view";
import { packBySlug } from "@/data/content";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ package: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = packBySlug((await params).package);
  if (!p) return {};
  const { t } = await getT();
  return { title: `${t(p.name)} — Famous Services`, description: t(p.desc) };
}
export default async function Page({ params }: P) {
  const p = packBySlug((await params).package);
  if (!p) notFound();
  return <PackageView pack={p} />;
}
