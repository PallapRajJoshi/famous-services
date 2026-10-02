"use client";
import { BadgeCheck, MapPin, Languages } from "lucide-react";
import type { Pro } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";
import { num } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Avatar({ name, hue, size = 56, className }: { name: string; hue: number; size?: number; className?: string }) {
  const initials = name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span aria-hidden className={cn("grid shrink-0 place-items-center rounded-full font-extrabold text-white", className)} style={{ width: size, height: size, background: `linear-gradient(135deg, hsl(${hue} 65% 42%), hsl(${(hue + 25) % 360} 70% 56%))`, fontSize: size * 0.34 }}>{initials}</span>
  );
}

export function ProfessionalCard({ pro }: { pro: Pro }) {
  const { t, lang } = useLang();
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center gap-3.5">
        <Avatar name={pro.name} hue={pro.hue} size={60} />
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-ink">{pro.name}</h3>
          <p className="text-sm text-muted">{t(pro.role)}</p>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        <Badge tone="success" icon={<BadgeCheck className="h-3.5 w-3.5" aria-hidden />}>{t("Verification: demo", "प्रमाणीकरण: डेमो")}</Badge>
        <Badge tone="neutral">{num(pro.years, lang)} {t("yrs experience", "वर्ष अनुभव")}</Badge>
      </div>
      <p className="mt-3 text-sm text-muted">{t(pro.bio)}</p>
      <dl className="mt-3 space-y-1.5 text-xs text-muted">
        <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /><dt className="sr-only">{t("Areas", "क्षेत्र")}</dt><dd>{pro.areas.join(" · ")}</dd></div>
        <div className="flex items-center gap-1.5"><Languages className="h-3.5 w-3.5 shrink-0" aria-hidden /><dt className="sr-only">{t("Languages", "भाषा")}</dt><dd>{pro.langs.join(" · ")}</dd></div>
      </dl>
      <p className="mt-auto pt-4 text-[11px] font-semibold uppercase tracking-wide text-warn">{t("Demo profile — not a real person", "डेमो प्रोफाइल — वास्तविक व्यक्ति होइन")}</p>
    </article>
  );
}
