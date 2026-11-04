"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// motion/react animations run in JS, so the prefers-reduced-motion rule in
// globals.css cannot reach them. This makes every motion component honour it.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
