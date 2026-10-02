import type { Metadata } from "next";
import { TrackLookup } from "@/components/track/track-lookup";

export const metadata: Metadata = { title: "Track booking — Famous Services", description: "Look up the status of a booking (demo)." };
export default function Page() { return <TrackLookup />; }
