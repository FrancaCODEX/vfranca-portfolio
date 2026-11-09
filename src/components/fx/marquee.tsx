import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; className?: string; duration?: string; gap?: string; reverse?: boolean };

/** Faixa infinita. O conteúdo é duplicado para o loop ficar contínuo. */
export function Marquee({ children, className, duration = "40s", gap = "1rem", reverse }: Props) {
  const style = { "--marquee-duration": duration, "--marquee-gap": gap } as CSSProperties;
  return (
    <div className={cn("group mask-fade-x flex overflow-hidden", className)} style={style}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center gap-(--marquee-gap) group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
        <div aria-hidden="true" className="flex items-center gap-(--marquee-gap)">
          {children}
        </div>
      </div>
    </div>
  );
}
