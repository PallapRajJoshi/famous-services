import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "brand" | "success" | "warn" | "danger" | "amber" | "outline" | "dark";
const tones: Record<Tone, string> = {
  neutral: "bg-pale text-ink",
  brand: "bg-pale-2 text-brand-deep",
  success: "bg-success-50 text-success",
  warn: "bg-warn-50 text-warn",
  danger: "bg-danger-50 text-danger",
  amber: "bg-amber-50 text-warn",
  outline: "border border-line bg-white text-muted",
  dark: "bg-brand-deep text-white",
};
export function Badge({ tone = "neutral", icon, className, children }: { tone?: Tone; icon?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none", tones[tone], className)}>
      {icon}
      {children}
    </span>
  );
}
