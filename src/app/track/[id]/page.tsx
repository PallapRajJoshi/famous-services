import type { Metadata } from "next";
import { TrackView } from "@/components/track/track-view";

export const metadata: Metadata = { title: "Track booking — Famous Services", robots: { index: false } };

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TrackView id={decodeURIComponent(id)} />;
}
