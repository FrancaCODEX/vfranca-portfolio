"use client";

import type { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/cn";

/** Card com brilho e borda que seguem o cursor (estilos em globals.css → .spotlight). */
export function SpotlightCard({ className, onMouseMove, ...props }: ComponentProps<"div">) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={cn("spotlight rounded-2xl border border-border bg-surface/80 backdrop-blur-sm", className)}
      {...props}
    />
  );
}
