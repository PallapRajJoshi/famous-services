import { ListTree } from "lucide-react";
import type { LegalDoc } from "@/data/legal";

export function LegalToc({ doc, t, label }: { doc: LegalDoc; t: (en: { en: string; ne?: string }) => string; label: string }) {
  const list = (
    <ol className="space-y-0.5 text-sm">
      {doc.sections.map((s, i) => (
        <li key={s.id}><a href={`#${s.id}`} className="flex gap-2 rounded-lg px-2.5 py-1.5 text-muted transition-colors hover:bg-pale hover:text-brand-deep"><span className="w-5 shrink-0 text-right tabular-nums text-brand/50">{i + 1}.</span><span>{t(s.h)}</span></a></li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="group rounded-xl border border-line bg-white lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 text-sm font-bold text-ink [&::-webkit-details-marker]:hidden"><ListTree className="h-4 w-4 text-brand" aria-hidden />{label}<span className="ml-auto text-xs font-medium text-muted group-open:hidden">{doc.sections.length}</span></summary>
        <nav aria-label={label} className="border-t border-line p-2">{list}</nav>
      </details>
      <nav aria-label={label} className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-line bg-white p-3 lg:block">
        <p className="px-2.5 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">{label}</p>
        {list}
      </nav>
    </>
  );
}
