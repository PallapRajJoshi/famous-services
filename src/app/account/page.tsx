import type { Metadata } from "next";
import { AccountShell } from "@/components/account/shell";

export const metadata: Metadata = { title: "My account — Famous Services", robots: { index: false } };
export default function Page() { return <AccountShell section="" />; }
