import * as React from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({ id, className, children, tone = "white", labelledBy }: { id?: string; className?: string; children: React.ReactNode; tone?: "white" | "pale" | "deep"; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} {...(tone === "deep" ? { "data-dark": "" } : {})} className={cn("py-12 sm:py-16 lg:py-20", tone === "pale" && "bg-pale", tone === "deep" && "bg-brand-deep text-white", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ id, eyebrow, title, body, action, align = "left", dark }: { id?: string; eyebrow?: string; title: string; body?: string; action?: React.ReactNode; align?: "left" | "center"; dark?: boolean }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center")}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("mb-2 text-xs font-bold uppercase tracking-[0.14em]", dark ? "text-amber" : "text-brand")}>{eyebrow}</p>}
        <h2 id={id} className={cn("text-2xl font-extrabold tracking-tight sm:text-3xl", dark ? "text-white" : "text-brand-deep")}>{title}</h2>
        {body && <p className={cn("mt-2.5 text-base leading-relaxed", dark ? "text-white/75" : "text-muted")}>{body}</p>}
      </div>
      {action}
    </div>
  );
}

/** Page header band used on inner pages. */
export function PageHero({ eyebrow, title, body, children, crumbs }: { eyebrow?: string; title: string; body?: string; children?: React.ReactNode; crumbs?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-pale">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative py-10 sm:py-14">
        {crumbs}
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">{title}</h1>
        {body && <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{body}</p>}
        {children}
      </Container>
    </div>
  );
}
