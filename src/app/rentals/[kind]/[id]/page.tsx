import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isKind, listingById, listingTitle } from "@/data/rentals";
import { ListingDetail } from "@/components/rentals/listing-detail";
import { getT } from "@/lib/lang-server";

type P = { params: Promise<{ kind: string; id: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { kind, id } = await params;
  const l = listingById(id);
  if (!l || l.kind !== kind) return {};
  const { t } = await getT();
  return { title: `${t(listingTitle(l))} — Famous Services`, description: t(l.note) };
}

export default async function Page({ params }: P) {
  const { kind, id } = await params;
  const l = listingById(id);
  if (!isKind(kind) || !l || l.kind !== kind) notFound();
  return <ListingDetail listing={l} />;
}
