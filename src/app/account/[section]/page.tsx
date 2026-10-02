import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountShell } from "@/components/account/shell";
import { SECTION_SLUGS } from "@/components/account/nav";

export const metadata: Metadata = { title: "My account — Famous Services", robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!SECTION_SLUGS.includes(section) || section === "track") notFound();
  return <AccountShell section={section} />;
}
