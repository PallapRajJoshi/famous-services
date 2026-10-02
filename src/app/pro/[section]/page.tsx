import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProShell } from "@/components/pro/pro-shell";
import { PRO_SLUGS } from "@/components/pro/nav";

export const metadata: Metadata = { title: "Professional portal — Famous Services", robots: { index: false } };
export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!PRO_SLUGS.includes(section)) notFound();
  return <ProShell section={section} />;
}
