"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Linha vertical que "se preenche" conforme o usuário rola a página. */
export function TimelineLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 50%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative pl-10 sm:pl-14">
      <div aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-px bg-border sm:left-5" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-transparent shadow-[0_0_12px_var(--accent)] sm:left-5"
      />
      {children}
    </div>
  );
}
