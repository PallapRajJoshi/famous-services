import type { Metadata } from "next";
import { ProShell } from "@/components/pro/pro-shell";

export const metadata: Metadata = { title: "Professional portal — Famous Services", robots: { index: false } };
export default function Page() { return <ProShell section="" />; }
