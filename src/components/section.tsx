import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, eyebrow, title, children, className }: Props) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-6xl px-5 py-20 sm:py-28", className)}>
      <Reveal>
        <div className="mb-12 sm:mb-16">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span>{index}</span>
            <span className="h-px w-10 bg-accent/50" />
            <span>{eyebrow}</span>
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
        </div>
        {children}
      </Reveal>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-surface-2/70 px-2 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
