import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type Props = {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, title, children, className }: Props) {
  return (
    <section id={id} className={cn("mx-auto max-w-5xl px-5 py-20 sm:py-24", className)}>
      <Reveal>
        <h2 className="mb-10 flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="font-mono text-sm font-normal text-accent">{index}.</span>
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
