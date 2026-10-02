"use client";
import * as React from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/** Fade-up reveal on scroll. Respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className, y = 14, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; y?: number; as?: "div" | "li" | "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -40px 0px" }} transition={{ duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </M>
  );
}

/** Wrap a grid/list: children appear with a small stagger. */
export function Stagger({ children, className, step = 0.05 }: { children: React.ReactNode; className?: string; step?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "0px 0px -40px 0px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } } }}>
      {children}
    </motion.div>
  );
}

/** Counts up to `value` when scrolled into view. Only use with real figures (e.g. catalogue size). */
export function Counter({ value, suffix = "", format }: { value: number; suffix?: string; format?: (n: number) => string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const text = useTransform(mv, (v) => (format ? format(Math.round(v)) : String(Math.round(v))) + suffix);
  React.useEffect(() => {
    if (inView && !reduce) { const c = animate(mv, value, { duration: 0.9, ease: "easeOut" }); return () => c.stop(); }
  }, [inView, reduce, mv, value]);
  return <motion.span ref={ref}>{text}</motion.span>;
}
