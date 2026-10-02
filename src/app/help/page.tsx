import type { Metadata } from "next";
import { HelpCenter } from "@/components/content/help-center";
export const metadata: Metadata = { title: "Help Center — Famous Services", description: "Answers about booking, pricing, payments, cancellation and professional safety." };
export default function Page() { return <HelpCenter />; }
