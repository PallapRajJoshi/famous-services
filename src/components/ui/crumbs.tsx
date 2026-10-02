import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail. Labels must already be translated by the caller. */
export function Crumbs({ items, className = "mb-4" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !last ? <Link href={c.href} className="rounded px-0.5 font-medium hover:text-brand hover:underline">{c.label}</Link> : <span aria-current={last ? "page" : undefined} className={last ? "font-semibold text-ink" : ""}>{c.label}</span>}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
