import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isKind, kindMeta } from "@/data/rentals";
import { ListingExplorer } from "@/components/rentals/listing-explorer";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ kind: string }>; searchParams: Promise<{ type?: string; furn?: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { kind } = await params;
  if (!isKind(kind)) return {};
  const { t } = await getT();
  const m = kindMeta(kind);
  return { title: `${t(m.name)} — Famous Services`, description: t(m.blurb) };
}

export default async function Page({ params, searchParams }: P) {
  const { kind } = await params;
  const sp = await searchParams;
  if (!isKind(kind)) notFound();
  return <ListingExplorer key={kind} kind={kind} initialType={typeof sp.type === "string" ? sp.type : undefined} initialFurn={typeof sp.furn === "string" ? sp.furn : undefined} />;
}
