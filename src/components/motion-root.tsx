"use client";
import { MotionConfig } from "framer-motion";

/** Makes every framer-motion animation honour the user's reduced-motion setting. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
