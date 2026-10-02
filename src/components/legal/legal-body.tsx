import * as React from "react";
import type { Block, LegalDoc } from "@/data/legal";

/** Renders text with ⟦…⟧ items highlighted as amber "to be confirmed" marks, shown as […]. */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/(⟦[^⟧]*⟧)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("⟦") ? (
          <mark key={i} className="rounded bg-amber-50 px-1 py-px font-medium text-warn ring-1 ring-amber/50 [box-decoration-break:clone]" title="To be confirmed by the business">[{p.slice(1, -1)}]</mark>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === "string") return <p className="text-[15px] leading-relaxed text-ink/85"><Marked text={b} /></p>;
  if (Array.isArray(b)) {
    return (
      <ul className="space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink/85 [&>li]:list-disc [&>li]:marker:text-brand/60">
        {b.map((x, i) => <li key={i}><Marked text={x} /></li>)}
      </ul>
    );
  }
  return (
    <div className="-mx-1 overflow-x-auto px-1" tabIndex={0} role="region" aria-label="Table">
      <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
        <thead><tr>{b.table.head.map((h, i) => <th key={i} scope="col" className="border-b-2 border-brand/20 bg-pale px-3 py-2 text-xs font-bold uppercase tracking-wide text-brand-deep">{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map((r, i) => <tr key={i} className="align-top">{r.map((c, j) => <td key={j} className={j === 0 ? "border-b border-line px-3 py-2.5 font-semibold text-ink" : "border-b border-line px-3 py-2.5 text-ink/85"}><Marked text={c} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function LegalBody({ doc, t }: { doc: LegalDoc; t: (en: string | { en: string; ne?: string }) => string }) {
  return (
    <div className="space-y-9">
      {doc.sections.map((s, i) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
          <h2 id={`${s.id}-h`} className="mb-3 flex gap-2.5 text-lg font-extrabold leading-snug text-brand-deep sm:text-xl"><span className="text-brand/50" aria-hidden>{i + 1}.</span><span>{t(s.h)}</span></h2>
          <div className="space-y-3">{s.b.map((b, j) => <BlockView key={j} b={b} />)}</div>
        </section>
      ))}
    </div>
  );
}
