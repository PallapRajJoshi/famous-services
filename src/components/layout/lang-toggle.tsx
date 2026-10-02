"use client";
import { useLang } from "@/components/lang-provider";
import { cn } from "@/lib/cn";

export function LangToggle({ dark, className }: { dark?: boolean; className?: string }) {
  const { lang, setLang } = useLang();
  const opt = (l: "en" | "ne", label: string, aria: string) => (
    <button type="button" lang={l} aria-pressed={lang === l} aria-label={aria} onClick={() => setLang(l)}
      className={cn("h-8 min-w-[44px] rounded-full px-3 text-xs font-bold transition-colors", lang === l ? (dark ? "bg-white text-brand-deep" : "bg-brand text-white") : dark ? "text-white/80 hover:text-white" : "text-muted hover:text-brand")}>{label}</button>
  );
  return (
    <div role="group" aria-label="Language" className={cn("inline-flex items-center rounded-full p-0.5", dark ? "bg-white/10" : "bg-pale", className)}>
      {opt("en", "English", "English")}
      {opt("ne", "नेपाली", "नेपाली")}
    </div>
  );
}
